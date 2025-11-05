import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RequestIn } from "@/lib/validators";

export async function GET() {
  const data = await prisma.request.findMany({
    include: {
      event: true,
      committee: true,
      createdBy: true,
      items: { include: { lineItem: true } },
      mediaTypes: true,
      attachments: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = RequestIn.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { itemIds = [], media = [], ...rest } = parsed.data;

  const created = await prisma.request.create({
    data: {
      ...rest,
      items: { create: itemIds.map((id) => ({ lineItemId: id })) },
      mediaTypes: { create: media.map((m) => ({ type: m.type, status: m.status, notes: m.notes })) },
    },
    include: { items: true, mediaTypes: true },
  });
  return NextResponse.json(created, { status: 201 });
}
