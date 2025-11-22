/**
 * Event validation schemas using Zod
 *
 * Follows the same pattern as src/lib/validators/forms.ts
 * Your shadow should use these in API routes for validation
 */
import { z } from "zod";

// Base event schema - matches the Event model
export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  time: z.string().min(1, "Time is required").max(100, "Time format too long"),
  location: z.string().min(1, "Location is required").max(200, "Location too long"),
  date: z.coerce.date(), // Accepts ISO string or Date object
  description: z.string().min(1, "Description is required").max(5000, "Description too long"),
  isWeekendEvent: z.boolean().default(false), // Defaults to false if not provided
});

// For creating new events
export const createEventSchema = eventSchema;

// For updating events (all fields optional except id)
export const updateEventSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(200).optional(),
  time: z.string().min(1).max(100).optional(),
  location: z.string().min(1).max(200).optional(),
  date: z.coerce.date().optional(),
  description: z.string().min(1).max(5000).optional(),
  isWeekendEvent: z.boolean().optional(),
});

// Type inference (like in forms.ts)
export type EventInput = z.infer<typeof eventSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
