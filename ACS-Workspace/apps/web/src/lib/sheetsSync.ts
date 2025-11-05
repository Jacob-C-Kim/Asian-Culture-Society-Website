import { sheetsClient } from './google';
import { sanitizeRow, rowKey, priceToCents, CleanRow, RawCell } from './parseSheet';
import { prisma } from './prisma';

type SheetConfig = {
  committeeId: string;
  spreadsheetId: string;
  dataSheetName?: string; // default 'Data'
};

type ItemStatus = 'APPROVED' | 'PENDING' | 'DENIED' | 'NA';

function toItemStatus(s: string | null | undefined): ItemStatus {
  const t = (s ?? '').trim().toLowerCase();
  if (t === 'approved') return 'APPROVED';
  if (t === 'pending') return 'PENDING';
  if (t === 'denied' || t === 'rejected') return 'DENIED';
  return 'NA'; // covers N/A, empty, etc.
}

export async function fetchDataRows(cfg: SheetConfig): Promise<CleanRow[]> {
  const sheets = sheetsClient();
  const range = `${cfg.dataSheetName ?? 'Data'}!A:Z`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: cfg.spreadsheetId,
    range,
    valueRenderOption: 'UNFORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING',
  });

  const values: (string | number | boolean | null)[][] = res.data.values ?? [];
  if (values.length === 0) return [];

  const headers = values[0].map(String);
  const rows = values.slice(1);

  const records: CleanRow[] = [];
  for (const r of rows) {
    const raw: Record<string, RawCell> = {};
    headers.forEach((h, i) => {
      raw[h] = (i < r.length ? (r[i] as RawCell) : null);
    });
    try {
      const clean = sanitizeRow(raw);
      records.push(clean);
    } catch {
      // skip invalid rows
      continue;
    }
  }
  return records;
}

export async function upsertLineItems(committeeId: string, rows: CleanRow[]) {
  let usedExpenseCents = 0;
  let usedRevenueCents = 0;

  for (const r of rows) {
    const key = rowKey(r);
    const qty = r.Qty ?? 1;
    const totalCents = priceToCents(r.Price);

    if (r.Used) {
      if (r.Type === 'EXPENSE') usedExpenseCents += totalCents;
      else usedRevenueCents += totalCents;
    }

    // If you've added @@unique([sheetRowKey]) you can switch this back to upsert
    const existing = await prisma.lineItem.findFirst({
      where: { sheetRowKey: key },
      select: { id: true },
    });

    const data = {
      committeeId,
      type: r.Type as 'EXPENSE' | 'REVENUE',
      used: r.Used,
      name: r.Item,
      qty,
      price_total_cents: totalCents,
      price_unit_opt_cents: r['Price/Unit'] ? priceToCents(r['Price/Unit']!) : null,
      vendor: r.Vendor ?? null,
      online: r.Online,
      link_opt: r.Link ?? null,
      notes_opt: r.Notes ?? null,
      status: toItemStatus(r.Status),
      reason_opt: r.Reason ?? null,
      event_text_opt: r.Event ?? null,
      source: 'SHEETS' as const,
      sheetRowKey: key,
    };

    if (existing) {
      await prisma.lineItem.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.lineItem.create({ data });
    }
  }

  return {
    usedExpenseCents,
    usedRevenueCents,
    netCents: usedExpenseCents - usedRevenueCents,
  };
}

/** Sync one committee from its CommitteeSheet record */
export async function syncCommitteeSheet(committeeSheetId: number) {
  const cfg = await prisma.committeeSheet.findUnique({
    where: { id: committeeSheetId },
  });
  if (!cfg) throw new Error('CommitteeSheet not found');

  const rows = await fetchDataRows({
    committeeId: cfg.committeeId,
    spreadsheetId: cfg.spreadsheetId,
    dataSheetName: cfg.dataSheetName ?? 'Data',
  });

  const totals = await upsertLineItems(cfg.committeeId, rows);

  await prisma.committeeSheet.update({
    where: { id: cfg.id },
    data: { lastSyncAt: new Date() },
  });

  return { committeeId: cfg.committeeId, ...totals, rowCount: rows.length };
}

/** Sync all configured CommitteeSheet rows for a given academic year */
export async function syncAll(year?: string) {
  const list = await prisma.committeeSheet.findMany({
    where: year ? { year } : undefined,
    select: { id: true },
  });
  const out: Array<Awaited<ReturnType<typeof syncCommitteeSheet>>> = [];
  for (const cs of list) {
    out.push(await syncCommitteeSheet(cs.id));
  }
  return out;
}
