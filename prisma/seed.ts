/**
 * Database seed script
 *
 * TODO: Your shadow should implement this to migrate events from
 * src/lib/data/events.ts to the database
 *
 * Steps:
 * 1. Import the events array from src/lib/data/events.ts
 * 2. Determine if each event is a weekend event (check if date is Saturday or Sunday)
 * 3. Use prisma.event.createMany() to insert events
 * 4. Handle duplicates (use skipDuplicates: true)
 *
 * Helper function to check if date is weekend:
 * ```typescript
 * function isWeekend(date: Date): boolean {
 *   const day = date.getDay()
 *   return day === 0 || day === 6 // 0 = Sunday, 6 = Saturday
 * }
 * ```
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
// TODO: Import events from src/lib/data/events.ts
// import { events } from '../src/lib/data/events'

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // TODO: Implement event migration
  // Example structure:
  // const eventsToSeed = events.map((event) => ({
  //   title: event.title,
  //   time: event.time,
  //   location: event.location,
  //   date: event.dateObject, // Use dateObject from events.ts
  //   description: event.description,
  //   isWeekendEvent: isWeekend(event.dateObject), // Check if weekend
  // }))
  //
  // await prisma.event.createMany({
  //   data: eventsToSeed,
  //   skipDuplicates: true, // Skip if event with same title/date already exists
  // })

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
