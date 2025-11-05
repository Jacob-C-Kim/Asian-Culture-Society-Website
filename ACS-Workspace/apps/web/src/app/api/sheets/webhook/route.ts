import { NextRequest, NextResponse } from 'next/server';
import { syncCommitteeSheet } from '@/lib/sheetsSync';

/**
 * Expect body: { committeeSheetId: number }
 * Secure with the same X-API-Key.
 */
export async function POST(req: NextRequest) {
  const key = req.headers.get('x-api-key');
  if (!key || key !== process.env.SHEETS_SYNC_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { committeeSheetId } = await req.json();
  if (!committeeSheetId) return NextResponse.json({ error: 'committeeSheetId required' }, { status: 400 });

  const result = await syncCommitteeSheet(committeeSheetId);
  return NextResponse.json({ ok: true, result });
}
