import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CommitteeBudgetIn } from "@/lib/validators";

export async function GET() {
  const data = await prisma.committeeBudget.findMany({ include: { committee: true } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = CommitteeBudgetIn.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.committeeBudget.create({
    data: { committeeId: parsed.data.committeeId, amount: parsed.data.amount },
  });
  return NextResponse.json(created, { status: 201 });
}
