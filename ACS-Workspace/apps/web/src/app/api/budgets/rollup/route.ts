import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Totals = { expense: number; revenue: number; net: number };

export async function GET() {
  const used = await prisma.lineItem.groupBy({
    by: ['committeeId', 'type'],      // <- no 'used'
    where: { used: true },
    _sum: { price_total_cents: true },
  });

  // committeeId is a string (cuid)
  const map = new Map<string, Totals>();

  for (const r of used) {
    const entry = map.get(r.committeeId) ?? { expense: 0, revenue: 0, net: 0 };
    const sum = r._sum.price_total_cents ?? 0;
    if (r.type === 'EXPENSE') entry.expense += sum;
    else entry.revenue += sum;
    entry.net = entry.expense - entry.revenue;
    map.set(r.committeeId, entry);
  }

  return NextResponse.json(Object.fromEntries(map));
}
