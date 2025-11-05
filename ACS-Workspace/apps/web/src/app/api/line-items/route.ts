// apps/web/src/app/api/line-items/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// If you want to accept a price in dollars and convert:
// import { priceToCents } from "@/lib/parseSheet";

export async function GET() {
  const data = await prisma.lineItem.findMany({ include: { event: true } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const json = await req.json();

  // Expect at least: { name: string, eventId: string }
  const { name, eventId, price /* optional dollars */, type /* optional */ } = json as {
    name: string; eventId: string; price?: number; type?: "EXPENSE" | "REVENUE";
  };

  if (!name || !eventId) {
    return NextResponse.json({ error: "name and eventId are required" }, { status: 400 });
  }

  const ev = await prisma.event.findUnique({
    where: { id: eventId },
    select: { committeeId: true },
  });
  if (!ev) {
    return NextResponse.json({ error: "event not found" }, { status: 404 });
  }

  const price_total_cents =
    typeof price === "number" && Number.isFinite(price) ? Math.round(price * 100) : 0;

  const created = await prisma.lineItem.create({
    data: {
      name,
      eventId,
      committeeId: ev.committeeId,
      type: type ?? "EXPENSE",
      price_total_cents,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
