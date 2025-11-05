import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EventIn } from "@/lib/validators";

export async function GET() {
  const data = await prisma.event.findMany({
    include: { committee: true },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = EventIn.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { date, ...rest } = parsed.data;
  const created = await prisma.event.create({ data: { ...rest, date } });
  return NextResponse.json(created, { status: 201 });
}
