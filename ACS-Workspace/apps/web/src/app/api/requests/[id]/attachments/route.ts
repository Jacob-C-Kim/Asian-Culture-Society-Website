import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { mediaType, fileUrl, fileHash, uploaderId } = await req.json();
  if (!fileUrl || !fileHash || !uploaderId) {
    return NextResponse.json({ error: "fileUrl, fileHash, uploaderId required" }, { status: 400 });
  }
  const created = await prisma.attachment.create({
    data: { requestId: id, mediaType, fileUrl, fileHash, uploaderId },
  });
  return NextResponse.json(created, { status: 201 });
}
