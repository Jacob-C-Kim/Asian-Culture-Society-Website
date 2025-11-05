import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { type, status, notes } = await req.json();
  if (!type || !status) return NextResponse.json({ error: "type and status required" }, { status: 400 });
  const created = await prisma.mediaRequestType.create({ data: { requestId: id, type, status, notes } });
  return NextResponse.json(created, { status: 201 });
}
