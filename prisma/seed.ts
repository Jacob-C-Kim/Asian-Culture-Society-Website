/**
 * Database Seed Script
 *
 * This script migrates events from src/lib/data/events.ts to the database.
 * All functionality is currently stubbed and needs to be implemented.
 *
 * TODO: Implement event migration following the detailed comments.
 * Run with: npx prisma db seed
 *
 * Reference:
 * - Prisma seeding: https://www.prisma.io/docs/guides/database/seed-database
 * - See src/lib/data/events.ts for the events structure
 */

// TODO: Uncomment after running `npx prisma generate`
// import { PrismaClient } from "@prisma/client";
// TODO: Import events from src/lib/data/events.ts
// import { events } from '../src/lib/data/events'

// TODO: Uncomment after uncommenting PrismaClient import
// const prisma = new PrismaClient();

/**
 * @brief Checks if a date falls on a weekend (Saturday or Sunday)
 *
 * @param date - The date to check
 *
 * @returns true if the date is Saturday (6) or Sunday (0), false otherwise
 *
 * @example
 * ```typescript
 * const saturday = new Date('2025-08-30') // Saturday
 * isWeekend(saturday) // true
 *
 * const monday = new Date('2025-08-25') // Monday
 * isWeekend(monday) // false
 * ```
 */
// TODO: Implement isWeekend helper function
// function isWeekend(date: Date): boolean {
//   const day = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//   return day === 0 || day === 6
// }

/**
 * @brief Main seed function
 *
 * Migrates events from the static events.ts file to the database.
 * Determines isWeekendEvent for each event and inserts them using createMany.
 *
 * Implementation steps:
 * 1. Import events array from src/lib/data/events.ts
 * 2. Map each event to the database format:
 *    - Use event.title, event.time, event.location, event.description
 *    - Use event.dateObject for the date field (convert to Date if needed)
 *    - Call isWeekend(event.dateObject) to determine isWeekendEvent
 * 3. Use prisma.event.createMany() with skipDuplicates: true
 * 4. Log success message with count of events seeded
 *
 * @example
 * ```typescript
 * const eventsToSeed = events.map((event) => ({
 *   title: event.title,
 *   time: event.time,
 *   location: event.location,
 *   date: event.dateObject, // Should already be a Date object
 *   description: event.description,
 *   isWeekendEvent: isWeekend(event.dateObject),
 * }))
 *
 * const result = await prisma.event.createMany({
 *   data: eventsToSeed,
 *   skipDuplicates: true, // Prevents errors if events already exist
 * })
 *
 * console.log(`✅ Seeded ${result.count} events`)
 * ```
 */
async function main() {
  console.log("🌱 Seeding database...");

  // TODO: Implement event migration
  // Steps:
  // 1. Import events from src/lib/data/events.ts (see import at top)
  // 2. Map events to database format
  // 3. Use createMany to insert
  // 4. Log the result
  //
  // Example:
  // const eventsToSeed = events.map((event) => {
  //   // Ensure dateObject is a Date
  //   const eventDate = event.dateObject instanceof Date
  //     ? event.dateObject
  //     : new Date(event.dateObject)
  //
  //   return {
  //     title: event.title,
  //     time: event.time,
  //     location: event.location,
  //     date: eventDate,
  //     description: event.description,
  //     isWeekendEvent: isWeekend(eventDate),
  //   }
  // })
  //
  // const result = await prisma.event.createMany({
  //   data: eventsToSeed,
  //   skipDuplicates: true, // Important: prevents errors on re-seeding
  // })
  //
  // console.log(`✅ Seeded ${result.count} events`)

  console.log("✅ Seeding completed");
}

main().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
// TODO: Uncomment after uncommenting prisma variable
// .finally(async () => {
//   await prisma.$disconnect();
// });
