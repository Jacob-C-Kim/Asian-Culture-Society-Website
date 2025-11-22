/**
 * EXAMPLE FILE - Reference implementation for individual event API route
 *
 * Your shadow should create src/app/api/events/[id]/route.ts following this pattern.
 */

import { NextRequest, NextResponse } from "next/server";
// TODO: Import your event service functions
// import { getEventById, updateEvent, deleteEvent } from '@/lib/services/eventService'
// TODO: Import validators
// import { updateEventSchema } from '@/lib/validators/events'

/**
 * GET /api/events/[id]
 * Returns a single event by ID
 *
 * @param request - Next.js request object
 * @param params - Route parameters containing the event id
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // TODO: Extract and validate ID from params
    // const { id } = await params
    // const eventId = parseInt(id, 10)
    // if (isNaN(eventId)) {
    //   return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
    // }

    // TODO: Call service function
    // const event = await getEventById(eventId)
    // if (!event) {
    //   return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    // }

    // TODO: Convert Date to ISO string
    // return NextResponse.json({
    //   ...event,
    //   date: event.date.toISOString(),
    // })

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/events/[id]
 * Updates an existing event
 *
 * Request body should match UpdateEventInput (all fields optional except id)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // TODO: Extract and validate ID
    // const { id } = await params
    // const eventId = parseInt(id, 10)

    // TODO: Parse and validate request body
    // const body = await request.json()
    // const validation = updateEventSchema.safeParse({ ...body, id: eventId })
    // if (!validation.success) {
    //   return NextResponse.json(
    //     { error: 'Invalid event data', details: validation.error.errors },
    //     { status: 400 }
    //   )
    // }

    // TODO: Call service function
    // const event = await updateEvent(validation.data)
    // if (!event) {
    //   return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    // }

    // TODO: Return updated event
    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/events/[id]
 * Deletes an event
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // TODO: Extract and validate ID
    // const { id } = await params
    // const eventId = parseInt(id, 10)

    // TODO: Call service function
    // const deleted = await deleteEvent(eventId)
    // if (!deleted) {
    //   return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    // }

    // TODO: Return success response
    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
