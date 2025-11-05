import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { lineItemId } = await req.json();
  if (!lineItemId) return NextResponse.json({ error: "lineItemId required" }, { status: 400 });
  const created = await prisma.requestItem.create({ data: { requestId: id, lineItemId } });
  return NextResponse.json(created, { status: 201 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { lineItemId } = await req.json();
  if (!lineItemId) return NextResponse.json({ error: "lineItemId required" }, { status: 400 });
  await prisma.requestItem.delete({ where: { requestId_lineItemId: { requestId: id, lineItemId } } });
  return NextResponse.json({ ok: true });
}
