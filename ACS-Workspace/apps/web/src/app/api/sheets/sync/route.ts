import { NextRequest, NextResponse } from 'next/server';
import { syncAll, syncCommitteeSheet } from '@/lib/sheetsSync';

function ok(req: NextRequest) {
  const hdr = req.headers.get('x-api-key');
  return hdr && process.env.SHEETS_SYNC_API_KEY && hdr === process.env.SHEETS_SYNC_API_KEY;
}

export async function POST(req: NextRequest) {
  if (!ok(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { committeeSheetId, year } = body || {};

  const result = committeeSheetId ? await syncCommitteeSheet(committeeSheetId) : await syncAll(year);
  return NextResponse.json({ ok: true, result });
}
