import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EventBudgetIn } from "@/lib/validators";

export async function GET() {
  const data = await prisma.eventBudget.findMany({ include: { event: true } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = EventBudgetIn.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.eventBudget.create({
    data: { eventId: parsed.data.eventId, amount: parsed.data.amount },
  });
  return NextResponse.json(created, { status: 201 });
}
