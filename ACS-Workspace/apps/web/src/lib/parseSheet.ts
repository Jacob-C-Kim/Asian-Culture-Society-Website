import crypto from 'crypto';
import { z } from 'zod';

export type RawCell = string | number | boolean | null;
export type RawRow = Record<string, RawCell>;

export const Allowed = z.object({
  Used: z.union([z.literal(true), z.literal(false)]).catch(false),
  Type: z.enum(['EXPENSE', 'REVENUE']),
  Item: z.string().trim().min(1),
  Qty: z.coerce.number().int().nonnegative().catch(1),
  Price: z.coerce.number().nonnegative().catch(0),
  'Price/Unit': z.coerce.number().nonnegative().optional().nullable(),
  Vendor: z.string().trim().optional().nullable(),
  Online: z.union([z.literal(true), z.literal(false)]).catch(false),
  Link: z.string().trim().url().optional().nullable(),
  Notes: z.string().trim().optional().nullable(),
  Status: z.enum(['N/A', 'Pending', 'Approved', 'Denied']).catch('N/A'),
  Reason: z.string().trim().optional().nullable(),
  Event: z.string().trim().optional().nullable(),
  '% of Budget': z.coerce.number().optional().nullable(),
});

export type CleanRow = z.infer<typeof Allowed>;

export function sanitizeRow(row: RawRow): CleanRow {
  const on = toBool(row['Online']);
  const link: string | null =
    typeof row['Link'] === 'string' ? row['Link'] : row['Link'] == null ? null : String(row['Link']);

  const base = Allowed.parse({
    ...row,
    Online: on,
    Link: on ? (link || '') : null, // force empty to fail if missing
  });

  if (base.Online && !base.Link) {
    throw new Error('Online=TRUE requires Link.');
  }
  return base;
}

export function toBool(v: unknown): boolean {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const s = v.toLowerCase().trim();
    return s === 'true' || s === 'yes' || s === 'y' || s === '1' || s === '✓';
  }
  if (typeof v === 'number') return v !== 0;
  return false;
}

export function priceToCents(n: number): number {
  return Math.round(n * 100);
}

export function rowKey(clean: CleanRow): string {
  // Stable hash over the fields that uniquely identify a row in Data
  const payload = JSON.stringify({
    Used: clean.Used,
    Type: clean.Type,
    Item: clean.Item,
    Qty: clean.Qty,
    Price: clean.Price,
    Vendor: clean.Vendor ?? '',
    Event: clean.Event ?? '',
    Link: clean.Link ?? '',
    Notes: clean.Notes ?? '',
  });
  return crypto.createHash('sha256').update(payload).digest('hex');
}
