import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RequestIn } from "@/lib/validators";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.request.findUnique({
    where: { id },
    include: {
      event: true,
      committee: true,
      createdBy: true,
      items: { include: { lineItem: true } },
      mediaTypes: true,
      attachments: true,
    },
  });
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const json = await req.json();
  const parsed = RequestIn.partial().safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // Drop unused fields cleanly to avoid eslint warnings
  const { itemIds, media, ...rest } = parsed.data;
  void itemIds; // explicit no-op usage to appease no-unused-vars
  void media;

  const updated = await prisma.request.update({
    where: { id },
    data: rest,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.request.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
