/**
 * EXAMPLE FILE - Reference implementation for eventService.ts
 *
 * Your shadow should create src/lib/services/eventService.ts following this pattern.
 * This file shows the structure but should NOT be imported anywhere.
 *
 * Steps for shadow:
 * 1. Copy this file to eventService.ts
 * 2. Remove the .example extension
 * 3. Implement each function using Prisma
 * 4. Add error handling
 * 5. Add JSDoc comments
 */

import { prisma } from "@/lib/db/prisma";
import type { Event, CreateEventInput, UpdateEventInput } from "@/lib/types/event";

/**
 * Get all events, optionally sorted by date
 *
 * @param sortByDate - If true, sort by date ascending (earliest first)
 * @returns Array of all events
 *
 * Example Prisma query:
 * ```typescript
 * const events = await prisma.event.findMany({
 *   orderBy: { date: 'asc' }
 * })
 * ```
 */
export async function getAllEvents(sortByDate = true): Promise<Event[]> {
  // TODO: Implement using prisma.event.findMany()
  // Hint: Use orderBy if sortByDate is true
  throw new Error("Not implemented");
}

/**
 * Get events for a specific date
 *
 * @param date - The date to filter events by
 * @returns Array of events on that date
 *
 * Example Prisma query:
 * ```typescript
 * const startOfDay = new Date(date)
 * startOfDay.setHours(0, 0, 0, 0)
 * const endOfDay = new Date(date)
 * endOfDay.setHours(23, 59, 59, 999)
 *
 * const events = await prisma.event.findMany({
 *   where: {
 *     date: {
 *       gte: startOfDay,
 *       lte: endOfDay
 *     }
 *   }
 * })
 * ```
 */
export async function getEventsByDate(date: Date): Promise<Event[]> {
  // TODO: Implement date filtering
  throw new Error("Not implemented");
}

/**
 * Get weekend events only
 *
 * @returns Array of events where isWeekendEvent is true
 */
export async function getWeekendEvents(): Promise<Event[]> {
  // TODO: Implement using where: { isWeekendEvent: true }
  throw new Error("Not implemented");
}

/**
 * Get a single event by ID
 *
 * @param id - Event ID
 * @returns Event or null if not found
 */
export async function getEventById(id: number): Promise<Event | null> {
  // TODO: Implement using prisma.event.findUnique()
  throw new Error("Not implemented");
}

/**
 * Create a new event
 *
 * @param data - Event data (without id, createdAt, updatedAt)
 * @returns Created event
 */
export async function createEvent(data: CreateEventInput): Promise<Event> {
  // TODO: Implement using prisma.event.create()
  throw new Error("Not implemented");
}

/**
 * Update an existing event
 *
 * @param data - Event data with id
 * @returns Updated event or null if not found
 */
export async function updateEvent(data: UpdateEventInput): Promise<Event | null> {
  // TODO: Implement using prisma.event.update()
  // Hint: Use findUnique first to check if exists
  throw new Error("Not implemented");
}

/**
 * Delete an event
 *
 * @param id - Event ID
 * @returns true if deleted, false if not found
 */
export async function deleteEvent(id: number): Promise<boolean> {
  // TODO: Implement using prisma.event.delete()
  // Hint: Wrap in try-catch to handle not found errors
  throw new Error("Not implemented");
}
