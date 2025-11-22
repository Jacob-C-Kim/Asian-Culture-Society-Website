/**
 * Event Service Layer
 *
 * This file contains service functions for event CRUD operations using Prisma.
 * All functions are currently stubbed and need to be implemented.
 *
 * WHAT IS A SERVICE LAYER?
 * -----------------------
 * A service layer is a design pattern that separates business logic from API routes.
 * Instead of putting database queries directly in API routes, we put them here.
 * This makes the code:
 * - More testable (you can test service functions independently)
 * - More reusable (multiple API routes can use the same service function)
 * - Easier to maintain (all database logic is in one place)
 * - Easier to understand (API routes just call services, services handle the database)
 *
 * HOW IT WORKS:
 * - API routes (in src/app/api/events/) receive HTTP requests
 * - API routes call service functions (this file) to get/save data
 * - Service functions use Prisma to talk to the database
 * - Service functions return data to API routes
 * - API routes format the response and send it back to the client
 *
 * PRISMA BASICS:
 * - Prisma is an ORM (Object-Relational Mapping) tool
 * - It lets you write database queries using JavaScript/TypeScript instead of SQL
 * - The `prisma` object is imported from @/lib/db/prisma (it's a singleton pattern)
 * - Prisma models are defined in prisma/schema.prisma
 * - After running migrations, Prisma generates types based on your schema
 *
 * COMMON PRISMA METHODS:
 * - findMany(): Get multiple records (returns array)
 * - findUnique(): Get one record by unique field (returns one or null)
 * - create(): Create a new record
 * - update(): Update an existing record
 * - delete(): Delete a record
 *
 * TODO: Implement each function following the detailed comments and JSDoc documentation.
 * Reference: https://www.prisma.io/docs/concepts/components/prisma-client
 */

// TODO: Import prisma when implementing service functions
// import { prisma } from "@/lib/db/prisma";
import type { Event, CreateEventInput, UpdateEventInput } from "@/lib/types/event";

/**
 * @brief Retrieves all events from the database, optionally sorted by date
 *
 * @param sortByDate - If true, events are sorted by date in ascending order (earliest first).
 *                     If false, events are returned in database order (typically by ID).
 *                     Defaults to true.
 *
 * @returns Promise that resolves to an array of Event objects.
 *          Returns an empty array if no events exist.
 *
 * @throws May throw Prisma errors if database connection fails.
 *         Your shadow should wrap in try-catch and handle gracefully.
 *
 * @example
 * ```typescript
 * // Get all events sorted by date
 * const events = await getAllEvents(true)
 *
 * // Get all events in database order
 * const events = await getAllEvents(false)
 * ```
 *
 * Implementation hint:
 * ```typescript
 * const events = await prisma.event.findMany({
 *   orderBy: sortByDate ? { date: 'asc' } : undefined
 * })
 * return events
 * ```
 */
export async function getAllEvents(_sortByDate = true): Promise<Event[]> {
  // TODO: Implement using prisma.event.findMany()
  //
  // WHY THIS FUNCTION EXISTS:
  // This is a simple "get all" function. It's useful for:
  // - Displaying all events on a page
  // - Getting events to filter/search on the frontend
  // - Admin pages that need to show all events
  //
  // HOW TO IMPLEMENT:
  // 1. Use prisma.event.findMany() to get all events
  //    - "event" comes from the model name in schema.prisma (model Event)
  //    - Prisma automatically pluralizes and lowercases: Event -> event
  //
  // 2. If sortByDate is true, add orderBy: { date: 'asc' }
  //    - 'asc' means ascending (earliest first: Jan 1, Jan 2, Jan 3...)
  //    - 'desc' would be descending (latest first: Jan 3, Jan 2, Jan 1...)
  //    - We use conditional logic: sortByDate ? { date: 'asc' } : undefined
  //    - If sortByDate is false, we don't pass orderBy (database default order)
  //
  // 3. Return the events array
  //    - Prisma returns an array of Event objects
  //    - Each Event has all fields from the schema (id, title, time, location, date, etc.)
  //
  // 4. Wrap in try-catch for error handling
  //    - Database operations can fail (connection issues, etc.)
  //    - Try-catch prevents the entire app from crashing
  //    - You can log the error and re-throw it, or return an empty array
  //
  // EXAMPLE IMPLEMENTATION:
  // try {
  //   const events = await prisma.event.findMany({
  //     orderBy: sortByDate ? { date: 'asc' } : undefined
  //   })
  //   return events
  // } catch (error) {
  //   console.error('Error fetching events:', error)
  //   throw error // Re-throw so API route can handle it
  // }

  throw new Error("Not implemented");
}

/**
 * @brief Retrieves all events that occur on a specific date
 *
 * @param date - The date to filter events by. Only events on this exact date
 *               (ignoring time) will be returned.
 *
 * @returns Promise that resolves to an array of Event objects that occur on the given date.
 *          Returns an empty array if no events exist for that date.
 *
 * @throws May throw Prisma errors if database connection fails.
 *
 * @example
 * ```typescript
 * const today = new Date()
 * const todaysEvents = await getEventsByDate(today)
 * ```
 *
 * Implementation hint:
 * ```typescript
 * // Create start and end of day boundaries
 * const startOfDay = new Date(date)
 * startOfDay.setHours(0, 0, 0, 0)
 * const endOfDay = new Date(date)
 * endOfDay.setHours(23, 59, 59, 999)
 *
 * const events = await prisma.event.findMany({
 *   where: {
 *     date: {
 *       gte: startOfDay,  // greater than or equal to start of day
 *       lte: endOfDay     // less than or equal to end of day
 *     }
 *   },
 *   orderBy: { date: 'asc' } // Optional: sort by time within the day
 * })
 * return events
 * ```
 */
export async function getEventsByDate(_date: Date): Promise<Event[]> {
  // TODO: Implement date filtering
  //
  // WHY WE NEED START/END OF DAY:
  // The database stores full date+time (e.g., "2025-08-29 17:00:00")
  // But we want to find ALL events on a specific day, regardless of time.
  // So we create a "range" from 00:00:00 to 23:59:59 of that day.
  // This way, an event at 9am, 2pm, or 7pm on Aug 29 will all be found.
  //
  // HOW DATE FILTERING WORKS:
  // 1. Create start and end of day boundaries from the input date
  //    - startOfDay: Set hours to 00:00:00.000 (beginning of the day)
  //    - endOfDay: Set hours to 23:59:59.999 (end of the day)
  //    - This creates a 24-hour window for that specific day
  //
  // 2. Use prisma.event.findMany() with a where clause
  //    - The where clause filters which records to return
  //    - We use date range filtering with gte (>=) and lte (<=)
  //
  // 3. Filter where date is between startOfDay and endOfDay
  //    - gte: "greater than or equal to" (date >= startOfDay)
  //    - lte: "less than or equal to" (date <= endOfDay)
  //    - Together: startOfDay <= date <= endOfDay
  //
  // 4. Optionally sort by date (time) ascending
  //    - This orders events by time within the day (9am before 2pm before 7pm)
  //
  // 5. Return the events array
  //
  // EXAMPLE IMPLEMENTATION:
  // const startOfDay = new Date(date)
  // startOfDay.setHours(0, 0, 0, 0) // Set to 00:00:00.000
  //
  // const endOfDay = new Date(date)
  // endOfDay.setHours(23, 59, 59, 999) // Set to 23:59:59.999
  //
  // const events = await prisma.event.findMany({
  //   where: {
  //     date: {
  //       gte: startOfDay, // date >= startOfDay
  //       lte: endOfDay     // date <= endOfDay
  //     }
  //   },
  //   orderBy: { date: 'asc' } // Sort by time within the day
  // })
  // return events

  throw new Error("Not implemented");
}

/**
 * @brief Retrieves all events marked as weekend events
 *
 * @returns Promise that resolves to an array of Event objects where isWeekendEvent is true.
 *          Returns an empty array if no weekend events exist.
 *
 * @throws May throw Prisma errors if database connection fails.
 *
 * @example
 * ```typescript
 * const weekendEvents = await getWeekendEvents()
 * ```
 *
 * Implementation hint:
 * ```typescript
 * const events = await prisma.event.findMany({
 *   where: {
 *     isWeekendEvent: true
 *   },
 *   orderBy: { date: 'asc' } // Optional: sort by date
 * })
 * return events
 * ```
 */
export async function getWeekendEvents(): Promise<Event[]> {
  // TODO: Implement using where: { isWeekendEvent: true }
  // Steps:
  // 1. Use prisma.event.findMany() with where clause
  // 2. Filter where isWeekendEvent equals true
  // 3. Optionally sort by date ascending
  // 4. Return the events array
  throw new Error("Not implemented");
}

/**
 * @brief Retrieves a single event by its unique ID
 *
 * @param id - The unique identifier of the event to retrieve.
 *             Must be a positive integer.
 *
 * @returns Promise that resolves to the Event object if found, or null if not found.
 *
 * @throws May throw Prisma errors if database connection fails.
 *         May throw if id is invalid (not a number).
 *
 * @example
 * ```typescript
 * const event = await getEventById(1)
 * if (event) {
 *   console.log(event.title)
 * } else {
 *   console.log('Event not found')
 * }
 * ```
 *
 * Implementation hint:
 * ```typescript
 * const event = await prisma.event.findUnique({
 *   where: {
 *     id: id
 *   }
 * })
 * return event
 * ```
 */
export async function getEventById(_id: number): Promise<Event | null> {
  // TODO: Implement using prisma.event.findUnique()
  // Steps:
  // 1. Validate that id is a positive integer (optional but recommended)
  // 2. Use prisma.event.findUnique() with where: { id }
  // 3. Return the event (will be null if not found)
  // 4. Wrap in try-catch for error handling
  throw new Error("Not implemented");
}

/**
 * @brief Creates a new event in the database
 *
 * @param data - The event data to create. Must include:
 *               - title: string (required, 1-200 chars)
 *               - time: string (required, 1-100 chars, e.g., "5:00 PM - 7:00 PM")
 *               - location: string (required, 1-200 chars)
 *               - date: Date or ISO string (required)
 *               - description: string (required, 1-5000 chars)
 *               - isWeekendEvent: boolean (defaults to false)
 *
 * @returns Promise that resolves to the newly created Event object with its generated ID.
 *
 * @throws May throw Prisma errors if:
 *         - Database connection fails
 *         - Required fields are missing
 *         - Data validation fails
 *         - Unique constraint violation (if any exist)
 *
 * @example
 * ```typescript
 * const newEvent = await createEvent({
 *   title: "First GBM",
 *   time: "5:00 PM - 7:00 PM",
 *   location: "Bamboo Room",
 *   date: new Date("2025-08-29T17:00:00Z"),
 *   description: "Kick off the semester...",
 *   isWeekendEvent: false
 * })
 * ```
 *
 * Implementation hint:
 * ```typescript
 * // Convert date string to Date if needed
 * const eventData = {
 *   ...data,
 *   date: data.date instanceof Date ? data.date : new Date(data.date)
 * }
 *
 * const event = await prisma.event.create({
 *   data: eventData
 * })
 * return event
 * ```
 */
export async function createEvent(_data: CreateEventInput): Promise<Event> {
  // TODO: Implement using prisma.event.create()
  //
  // WHY WE CHECK DATE TYPE:
  // The CreateEventInput type allows date to be Date | string for flexibility.
  // But Prisma requires a Date object. So we need to convert strings to Date.
  // This is common because:
  // - API routes receive dates as ISO strings in JSON
  // - Frontend forms send dates as strings
  // - But Prisma needs Date objects
  //
  // HOW PRISMA.CREATE() WORKS:
  // - Takes a `data` object with the fields to create
  // - Automatically generates the `id` (auto-increment)
  // - Returns the created record with all fields (including the new id)
  // - Throws an error if required fields are missing or validation fails
  //
  // STEPS:
  // 1. Ensure date is a Date object (convert string if needed)
  //    - Check: data.date instanceof Date
  //    - If it's a string, convert: new Date(data.date)
  //    - This handles ISO strings like "2025-08-29T17:00:00Z"
  //
  // 2. Use prisma.event.create() with the data
  //    - Pass all fields from data (title, time, location, date, description, isWeekendEvent)
  //    - Prisma will validate against the schema
  //    - If validation fails, Prisma throws an error
  //
  // 3. Return the created event
  //    - The returned event includes the auto-generated id
  //    - This is useful for redirecting to the new event or showing it in the UI
  //
  // 4. Wrap in try-catch for error handling
  //    - Common errors: validation failures, database connection issues
  //    - Log the error for debugging
  //    - Re-throw so the API route can return appropriate error response
  //
  // EXAMPLE IMPLEMENTATION:
  // try {
  //   // Convert date string to Date if needed
  //   const eventData = {
  //     ...data,
  //     date: data.date instanceof Date ? data.date : new Date(data.date)
  //   }
  //
  //   const event = await prisma.event.create({
  //     data: eventData
  //   })
  //
  //   return event
  // } catch (error) {
  //   console.error('Error creating event:', error)
  //   throw error // Re-throw so API route can handle it
  // }

  throw new Error("Not implemented");
}

/**
 * @brief Updates an existing event in the database
 *
 * @param data - The event data to update. Must include:
 *               - id: number (required, the event ID to update)
 *               - Other fields are optional (only provided fields will be updated)
 *
 * @returns Promise that resolves to the updated Event object if found and updated,
 *          or null if the event with the given ID does not exist.
 *
 * @throws May throw Prisma errors if:
 *         - Database connection fails
 *         - Event with given ID doesn't exist (Prisma will throw)
 *         - Data validation fails
 *
 * @example
 * ```typescript
 * // Update only the title
 * const updated = await updateEvent({
 *   id: 1,
 *   title: "Updated Event Title"
 * })
 *
 * // Update multiple fields
 * const updated = await updateEvent({
 *   id: 1,
 *   title: "New Title",
 *   location: "New Location",
 *   isWeekendEvent: true
 * })
 * ```
 *
 * Implementation hint:
 * ```typescript
 * // First check if event exists (optional but recommended)
 * const existing = await prisma.event.findUnique({
 *   where: { id: data.id }
 * })
 * if (!existing) return null
 *
 * // Extract id and other fields
 * const { id, ...updateData } = data
 *
 * // Convert date string to Date if provided
 * if (updateData.date && typeof updateData.date === 'string') {
 *   updateData.date = new Date(updateData.date)
 * }
 *
 * const event = await prisma.event.update({
 *   where: { id },
 *   data: updateData
 * })
 * return event
 * ```
 */
export async function updateEvent(_data: UpdateEventInput): Promise<Event | null> {
  // TODO: Implement using prisma.event.update()
  //
  // WHY WE EXTRACT ID SEPARATELY:
  // The UpdateEventInput includes `id` to know which record to update.
  // But Prisma's `update()` method uses `id` in the `where` clause, not in `data`.
  // The `data` object should only contain fields that are being updated.
  // So we need to separate: { id, ...otherFields } -> where: { id }, data: { ...otherFields }
  //
  // WHY UpdateEventInput HAS OPTIONAL FIELDS:
  // In a PATCH-style update, you only send the fields you want to change.
  // For example, to only change the title:
  //   { id: 1, title: "New Title" }
  // Prisma will only update the title field, leaving other fields unchanged.
  //
  // HOW PRISMA.UPDATE() WORKS:
  // - `where`: Identifies which record to update (usually by id)
  // - `data`: Contains only the fields to update (partial update)
  // - Returns the updated record
  // - Throws P2025 error if record not found
  //
  // STEPS:
  // 1. Extract id from data
  //    - Use destructuring: const { id, ...updateData } = data
  //    - This separates id (for where clause) from other fields (for data)
  //
  // 2. Optionally check if event exists first (findUnique)
  //    - This is optional because Prisma will throw if not found anyway
  //    - But checking first lets us return null instead of throwing
  //    - This gives the API route more control over error handling
  //
  // 3. Remove id from update data (Prisma doesn't allow updating id)
  //    - Already done in step 1 with destructuring
  //    - IDs are immutable - you can't change them after creation
  //
  // 4. Convert date string to Date if provided
  //    - Only needed if date is in the updateData
  //    - Check: if (updateData.date && typeof updateData.date === 'string')
  //
  // 5. Use prisma.event.update() with where: { id } and data
  //    - where: { id } tells Prisma which record to update
  //    - data: updateData contains only fields to update
  //
  // 6. Return the updated event
  //    - Prisma returns the full updated record
  //
  // 7. Wrap in try-catch to handle "not found" errors and return null
  //    - Prisma throws P2025 error code if record not found
  //    - Catch it and return null instead of throwing
  //    - Re-throw other errors (connection issues, etc.)
  //
  // EXAMPLE IMPLEMENTATION:
  // try {
  //   // Check if event exists (optional but recommended)
  //   const existing = await prisma.event.findUnique({
  //     where: { id: data.id }
  //   })
  //   if (!existing) return null
  //
  //   // Extract id and other fields
  //   const { id, ...updateData } = data
  //
  //   // Convert date string to Date if provided
  //   if (updateData.date && typeof updateData.date === 'string') {
  //     updateData.date = new Date(updateData.date)
  //   }
  //
  //   const event = await prisma.event.update({
  //     where: { id },
  //     data: updateData
  //   })
  //
  //   return event
  // } catch (error: any) {
  //   // Prisma throws P2025 if record not found
  //   if (error.code === 'P2025') {
  //     return null
  //   }
  //   // Re-throw other errors
  //   throw error
  // }

  throw new Error("Not implemented");
}

/**
 * @brief Deletes an event from the database by ID
 *
 * @param id - The unique identifier of the event to delete.
 *             Must be a positive integer.
 *
 * @returns Promise that resolves to true if the event was successfully deleted,
 *          or false if the event with the given ID does not exist.
 *
 * @throws May throw Prisma errors if database connection fails.
 *
 * @example
 * ```typescript
 * const deleted = await deleteEvent(1)
 * if (deleted) {
 *   console.log('Event deleted successfully')
 * } else {
 *   console.log('Event not found')
 * }
 * ```
 *
 * Implementation hint:
 * ```typescript
 * try {
 *   await prisma.event.delete({
 *     where: { id }
 *   })
 *   return true
 * } catch (error) {
 *   // Prisma throws P2025 if record not found
 *   if (error.code === 'P2025') {
 *     return false
 *   }
 *   // Re-throw other errors
 *   throw error
 * }
 * ```
 */
export async function deleteEvent(_id: number): Promise<boolean> {
  // TODO: Implement using prisma.event.delete()
  //
  // WHY WE RETURN BOOLEAN:
  // Returning true/false is clearer than throwing errors for "not found".
  // The API route can then decide:
  // - true: Return 200 OK (success)
  // - false: Return 404 Not Found (record didn't exist)
  // This is a common pattern for delete operations.
  //
  // PRISMA ERROR CODES:
  // Prisma uses specific error codes for different scenarios:
  // - P2025: Record not found (the id doesn't exist)
  // - P2002: Unique constraint violation
  // - P2003: Foreign key constraint violation
  // We check for P2025 to handle "not found" gracefully.
  //
  // HOW PRISMA.DELETE() WORKS:
  // - Takes a `where` clause to identify the record
  // - Permanently deletes the record from the database
  // - Returns the deleted record (but we don't need it)
  // - Throws P2025 error if record not found
  //
  // STEPS:
  // 1. Use prisma.event.delete() with where: { id }
  //    - This permanently deletes the event
  //    - There's no "undo" - be careful!
  //
  // 2. Wrap in try-catch
  //    - Catch Prisma errors
  //    - Handle "not found" vs other errors differently
  //
  // 3. If error code is P2025 (record not found), return false
  //    - This means the event with that id doesn't exist
  //    - Not necessarily an error - maybe it was already deleted
  //
  // 4. If deletion succeeds, return true
  //    - The record was found and deleted successfully
  //
  // 5. Re-throw any other errors
  //    - Connection issues, database errors, etc.
  //    - Let the API route handle these as 500 errors
  //
  // EXAMPLE IMPLEMENTATION:
  // try {
  //   await prisma.event.delete({
  //     where: { id }
  //   })
  //   return true // Successfully deleted
  // } catch (error: any) {
  //   // Prisma throws P2025 if record not found
  //   if (error.code === 'P2025') {
  //     return false // Not found (not an error, just doesn't exist)
  //   }
  //   // Re-throw other errors (connection issues, etc.)
  //   throw error
  // }

  throw new Error("Not implemented");
}
