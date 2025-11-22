/**
 * EXAMPLE FILE - Reference implementation for events API route
 *
 * Your shadow should create src/app/api/events/route.ts following this pattern.
 * Reference: src/app/api/submit/mentor/route.ts for similar structure
 */

import { NextRequest, NextResponse } from "next/server";
// TODO: Import your event service functions
// import { getAllEvents, createEvent } from '@/lib/services/eventService'
// TODO: Import validators
// import { createEventSchema } from '@/lib/validators/events'

/**
 * GET /api/events
 * Returns all events, optionally sorted by date
 *
 * Query params:
 * - sortByDate: 'true' | 'false' (default: 'true')
 *
 * Example: GET /api/events?sortByDate=true
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // TODO: Extract query params
    // const { searchParams } = new URL(request.url)
    // const sortByDate = searchParams.get('sortByDate') !== 'false'

    // TODO: Call service function
    // const events = await getAllEvents(sortByDate)

    // TODO: Convert Date objects to ISO strings for JSON
    // const eventsResponse = events.map(event => ({
    //   ...event,
    //   date: event.date.toISOString(),
    // }))

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/events
 * Creates a new event
 *
 * Request body should match CreateEventInput
 * Example:
 * {
 *   "title": "First GBM",
 *   "time": "5:00 PM - 7:00 PM",
 *   "location": "Bamboo Room",
 *   "date": "2025-08-29T17:00:00Z",
 *   "description": "Kick off the semester...",
 *   "isWeekendEvent": false
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // TODO: Parse and validate request body
    // const body = await request.json()
    // const validation = createEventSchema.safeParse(body)
    // if (!validation.success) {
    //   return NextResponse.json(
    //     { error: 'Invalid event data', details: validation.error.errors },
    //     { status: 400 }
    //   )
    // }

    // TODO: Call service function
    // const event = await createEvent(validation.data)

    // TODO: Return created event with ISO date strings
    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
