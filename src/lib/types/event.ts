/**
 * Event type definitions
 *
 * These types match the Prisma Event model.
 * Your shadow will need to update components to use these types
 * instead of the ones in src/lib/data/events.ts
 */

// Database Event (from Prisma)
export interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
  date: Date; // DateTime from database
  description: string;
  isWeekendEvent: boolean;
}

// For API responses - converts Date to ISO string
export interface EventResponse {
  id: number;
  title: string;
  time: string;
  location: string;
  date: string; // ISO string for JSON
  description: string;
  isWeekendEvent: boolean;
}

// For creating/updating events
export interface CreateEventInput {
  title: string;
  time: string;
  location: string;
  date: Date | string; // Accepts both for flexibility
  description: string;
  isWeekendEvent: boolean;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number;
}
