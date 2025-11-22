/**
 * Individual Event API Route
 *
 * This file handles GET (get one event), PUT (update event), and DELETE (delete event) requests.
 * All handlers are currently stubbed and need to be implemented.
 *
 * TODO: Implement the GET, PUT, and DELETE handlers following the detailed comments.
 * Note: In Next.js App Router, params is a Promise, so you need to await it.
 */

import { NextRequest, NextResponse } from "next/server";
// TODO: Import your event service functions
// import { getEventById, updateEvent, deleteEvent } from '@/lib/services/eventService'
// TODO: Import validators
// import { updateEventSchema } from '@/lib/validators/events'

/**
 * @brief Handles GET requests to retrieve a single event by ID
 *
 * @param request - Next.js request object (not used in this handler)
 * @param params - Route parameters containing the event id as a string
 *
 * @returns NextResponse with JSON containing:
 *          - On success (200): { event: EventResponse }
 *          - On invalid ID (400): { error: string }
 *          - On not found (404): { error: string }
 *          - On server error (500): { error: string }
 *
 * @example
 * ```bash
 * GET /api/events/1
 * ```
 *
 * Implementation steps:
 * 1. Await params to get the id string
 * 2. Parse id to integer
 * 3. Validate id is a valid number
 * 4. Call getEventById() from service
 * 5. If not found, return 404
 * 6. Convert Date to ISO string and return event
 */
export async function GET(
  _request: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // TODO: Extract and validate ID from params
    // Steps:
    // 1. Await params (it's a Promise in Next.js App Router)
    // 2. Extract id string
    // 3. Parse to integer
    // 4. Validate it's a valid number
    // Example:
    // const { id } = await params
    // const eventId = parseInt(id, 10)
    // if (isNaN(eventId) || eventId <= 0) {
    //   return NextResponse.json(
    //     { error: 'Invalid event ID. Must be a positive integer.' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Call service function
    // const event = await getEventById(eventId)
    // if (!event) {
    //   return NextResponse.json(
    //     { error: 'Event not found' },
    //     { status: 404 }
    //   )
    // }

    // TODO: Convert Date to ISO string and return
    // const eventResponse = {
    //   ...event,
    //   date: event.date.toISOString()
    // }
    // return NextResponse.json({ event: eventResponse }, { status: 200 })

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @brief Handles PUT requests to update an existing event
 *
 * @param request - Next.js request object containing the update data in the body
 * @param params - Route parameters containing the event id as a string
 *
 * @returns NextResponse with JSON containing:
 *          - On success (200): { event: EventResponse }
 *          - On invalid ID (400): { error: string }
 *          - On validation error (400): { error: string, details: ValidationError[] }
 *          - On not found (404): { error: string }
 *          - On server error (500): { error: string }
 *
 * Request body should match UpdateEventInput (all fields optional except id):
 * ```typescript
 * {
 *   title?: string
 *   time?: string
 *   location?: string
 *   date?: string  // ISO date string
 *   description?: string
 *   isWeekendEvent?: boolean
 * }
 * ```
 *
 * @example
 * ```bash
 * PUT /api/events/1
 * Content-Type: application/json
 *
 * {
 *   "title": "Updated Event Title",
 *   "location": "New Location"
 * }
 * ```
 *
 * Implementation steps:
 * 1. Await params and extract id
 * 2. Parse and validate id
 * 3. Parse request body as JSON
 * 4. Validate using updateEventSchema (include id in validation)
 * 5. Call updateEvent() from service
 * 6. If not found, return 404
 * 7. Convert Date to ISO string and return updated event
 */
export async function PUT(
  _request: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // TODO: Extract and validate ID
    // const { id } = await params
    // const eventId = parseInt(id, 10)
    // if (isNaN(eventId) || eventId <= 0) {
    //   return NextResponse.json(
    //     { error: 'Invalid event ID' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Parse and validate request body
    // Steps:
    // 1. Parse JSON from request body
    // 2. Merge body with id for validation
    // 3. Use updateEventSchema.safeParse()
    // 4. If validation fails, return 400 with error details
    // Example:
    // const body = await request.json()
    // const validation = updateEventSchema.safeParse({ ...body, id: eventId })
    // if (!validation.success) {
    //   return NextResponse.json(
    //     {
    //       error: 'Invalid event data',
    //       details: validation.error.errors
    //     },
    //     { status: 400 }
    //   )
    // }

    // TODO: Call service function
    // const event = await updateEvent(validation.data)
    // if (!event) {
    //   return NextResponse.json(
    //     { error: 'Event not found' },
    //     { status: 404 }
    //   )
    // }

    // TODO: Convert Date to ISO string and return
    // const eventResponse = {
    //   ...event,
    //   date: event.date.toISOString()
    // }
    // return NextResponse.json({ event: eventResponse }, { status: 200 })

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @brief Handles DELETE requests to delete an event
 *
 * @param request - Next.js request object (not used in this handler)
 * @param params - Route parameters containing the event id as a string
 *
 * @returns NextResponse with JSON containing:
 *          - On success (200): { message: string }
 *          - On invalid ID (400): { error: string }
 *          - On not found (404): { error: string }
 *          - On server error (500): { error: string }
 *
 * @example
 * ```bash
 * DELETE /api/events/1
 * ```
 *
 * Implementation steps:
 * 1. Await params and extract id
 * 2. Parse and validate id
 * 3. Call deleteEvent() from service
 * 4. If not found (returns false), return 404
 * 5. Return success message with 200 status
 */
export async function DELETE(
  _request: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // TODO: Extract and validate ID
    // const { id } = await params
    // const eventId = parseInt(id, 10)
    // if (isNaN(eventId) || eventId <= 0) {
    //   return NextResponse.json(
    //     { error: 'Invalid event ID' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Call service function
    // const deleted = await deleteEvent(eventId)
    // if (!deleted) {
    //   return NextResponse.json(
    //     { error: 'Event not found' },
    //     { status: 404 }
    //   )
    // }

    // TODO: Return success response
    // return NextResponse.json(
    //   { message: 'Event deleted successfully' },
    //   { status: 200 }
    // )

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
