import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---- Users ----
  const [alice, bob] = await Promise.all([
    prisma.user.upsert({
      where: { id: "user_alice" },
      update: {},
      create: { id: "user_alice", name: "Alice" },
    }),
    prisma.user.upsert({
      where: { id: "user_bob" },
      update: {},
      create: { id: "user_bob", name: "Bob" },
    }),
  ]);

  // ---- Committees ----
  const eventsCom = await prisma.committee.upsert({
    where: { name: "Events" }, // name is @unique
    update: {},
    create: { name: "Events" },
  });

  const financeCom = await prisma.committee.upsert({
    where: { name: "Finance" },
    update: {},
    create: { name: "Finance" },
  });

  // ---- Committee budgets ----
  await Promise.all([
    prisma.committeeBudget.upsert({
      where: { id: "cb_events" },
      update: {},
      create: {
        id: "cb_events",
        committeeId: eventsCom.id,
        amount: new Prisma.Decimal(5000),
      },
    }),
    prisma.committeeBudget.upsert({
      where: { id: "cb_finance" },
      update: {},
      create: {
        id: "cb_finance",
        committeeId: financeCom.id,
        amount: new Prisma.Decimal(12000),
      },
    }),
  ]);

  // ---- Event ----
  const fallFest = await prisma.event.upsert({
    where: { id: "event_fall_fest" },
    update: {},
    create: {
      id: "event_fall_fest",
      name: "Fall Fest",
      date: new Date("2025-09-20T16:00:00Z"),
      committeeId: eventsCom.id,
      createdById: alice.id,
    },
  });

  // ---- Event budget ----
  await prisma.eventBudget.upsert({
    where: { id: "eb_fall_fest" },
    update: {},
    create: {
      id: "eb_fall_fest",
      eventId: fallFest.id,
      amount: new Prisma.Decimal(3000),
    },
  });

  // ---- Line items (now require committeeId, type, price_total_cents) ----
  const [balloons, stage] = await Promise.all([
    prisma.lineItem.upsert({
      where: { id: "li_balloons" },
      update: {},
      create: {
        id: "li_balloons",
        name: "Balloons",
        eventId: fallFest.id,
        committeeId: eventsCom.id,
        type: "EXPENSE",
        price_total_cents: 0,
      },
    }),
    prisma.lineItem.upsert({
      where: { id: "li_stage" },
      update: {},
      create: {
        id: "li_stage",
        name: "Stage Rental",
        eventId: fallFest.id,
        committeeId: eventsCom.id,
        type: "EXPENSE",
        price_total_cents: 0,
      },
    }),
  ]);

  // ---- Request (+ items, media types) ----
  const req = await prisma.request.upsert({
    where: { id: "req_media_fall_fest" },
    update: {},
    create: {
      id: "req_media_fall_fest",
      type: "MEDIA",
      eventId: fallFest.id,
      committeeId: eventsCom.id,
      status: "PENDING", // RequestStatus enum allows this
      createdById: alice.id,
      notes: "Need poster + IG story",
      items: {
        create: [{ lineItemId: balloons.id }, { lineItemId: stage.id }],
      },
      mediaTypes: {
        create: [
          { type: "POSTER", status: "REQUESTED" },
          { type: "INSTAGRAM_STORY", status: "REQUESTED" },
        ],
      },
    },
    include: { items: true, mediaTypes: true },
  });

  await prisma.committeeSheet.upsert({
    where: { committeeId_year: { committeeId: eventsCom.id, year: "2025-2026" } },
    update: {
      spreadsheetId: "1AbC...xyz",
      dataSheetName: "Data",
    },
    create: {
      committeeId: eventsCom.id,
      year: "2025-2026",
      spreadsheetId: "1AbC...xyz",
      dataSheetName: "Data",
    },
  });

  console.log("Seeded successfully");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
