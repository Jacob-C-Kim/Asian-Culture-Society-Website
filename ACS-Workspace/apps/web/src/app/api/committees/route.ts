import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CommitteeIn } from "@/lib/validators";

export async function GET() {
  const data = await prisma.committee.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = CommitteeIn.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const created = await prisma.committee.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}
