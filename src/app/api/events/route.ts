/**
 * Events API Route
 *
 * This file handles GET (list all events) and POST (create event) requests.
 * All handlers are currently stubbed and need to be implemented.
 *
 * WHAT IS AN API ROUTE?
 * --------------------
 * API routes in Next.js are server-side endpoints that handle HTTP requests.
 * They run on the server (not in the browser), so they can:
 * - Access databases securely (database credentials never go to the browser)
 * - Perform server-side validation
 * - Handle authentication/authorization
 * - Return JSON data to the frontend
 *
 * HOW IT WORKS:
 * 1. Client (browser) makes HTTP request: GET /api/events or POST /api/events
 * 2. Next.js routes the request to this file
 * 3. The appropriate handler (GET or POST) runs
 * 4. Handler validates input, calls service functions, formats response
 * 5. Handler returns JSON response to client
 *
 * THE FLOW:
 * Client → API Route (this file) → Service Layer → Database
 * Client ← API Route (this file) ← Service Layer ← Database
 *
 * WHY WE USE SERVICE LAYER:
 * - API routes should be thin - they just handle HTTP concerns
 * - Business logic (database queries) goes in service layer
 * - This separation makes code testable and maintainable
 *
 * TODO: Implement the GET and POST handlers following the detailed comments.
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 */

import { NextRequest, NextResponse } from "next/server";
// TODO: Import your event service functions
// import { getAllEvents, createEvent } from '@/lib/services/eventService'
// TODO: Import validators
// import { createEventSchema } from '@/lib/validators/events'

/**
 * @brief Handles GET requests to retrieve all events
 *
 * @param request - Next.js request object containing query parameters
 *
 * @returns NextResponse with JSON containing:
 *          - On success (200): { events: EventResponse[] }
 *          - On error (500): { error: string }
 *
 * Query parameters:
 * - sortByDate: 'true' | 'false' (optional, default: 'true')
 *               If 'true', events are sorted by date ascending.
 *               If 'false' or not provided, events are returned in database order.
 *
 * @example
 * ```bash
 * # Get all events sorted by date
 * GET /api/events?sortByDate=true
 *
 * # Get all events in database order
 * GET /api/events?sortByDate=false
 * ```
 *
 * Implementation steps:
 * 1. Extract sortByDate from query params (default to true)
 * 2. Call getAllEvents(sortByDate) from service
 * 3. Convert Date objects to ISO strings for JSON response
 * 4. Return events array in response
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    // TODO: Extract query params
    //
    // WHAT ARE QUERY PARAMETERS?
    // Query parameters are optional values in the URL after the "?".
    // Example: /api/events?sortByDate=true&limit=10
    // - sortByDate=true is a query parameter
    // - limit=10 is another query parameter
    //
    // HOW TO EXTRACT THEM:
    // 1. Get searchParams from request.url
    //    - request.url is the full URL (e.g., "http://localhost:3000/api/events?sortByDate=true")
    //    - new URL() parses the URL
    //    - .searchParams gives us access to query parameters
    //
    // 2. Extract sortByDate parameter (string 'true' or 'false')
    //    - searchParams.get('sortByDate') returns the value as a string
    //    - Returns null if the parameter doesn't exist
    //
    // 3. Convert to boolean (default to true if not provided)
    //    - We check !== 'false' because:
    //      - If parameter is 'false', we want false
    //      - If parameter is 'true' or missing, we want true
    //    - This gives us a sensible default (sort by date)
    //
    // Example:
    // const { searchParams } = new URL(request.url)
    // const sortByDate = searchParams.get('sortByDate') !== 'false'

    // TODO: Call service function
    // const events = await getAllEvents(sortByDate)
    //
    // WHY WE CALL SERVICE LAYER:
    // The service layer handles all database logic.
    // The API route just orchestrates: get params → call service → format response.
    // This keeps concerns separated and makes testing easier.

    // TODO: Convert Date objects to ISO strings for JSON
    //
    // WHY WE NEED TO CONVERT DATES:
    // - Prisma returns Date objects from the database
    // - JSON.stringify() cannot serialize Date objects (they become empty objects)
    // - We need to convert Date to string for JSON responses
    // - ISO string format: "2025-08-29T17:00:00.000Z" (standard format)
    //
    // HOW TO CONVERT:
    // - Use .toISOString() method on Date objects
    // - This converts: Date → "2025-08-29T17:00:00.000Z"
    //
    // Example:
    // const eventsResponse = events.map(event => ({
    //   ...event, // Spread all other fields (id, title, time, location, etc.)
    //   date: event.date.toISOString(), // Override date with ISO string
    // }))

    // TODO: Return success response
    //
    // HTTP STATUS CODES:
    // - 200: OK (success)
    // - 201: Created (successful creation)
    // - 400: Bad Request (client error - invalid input)
    // - 404: Not Found (resource doesn't exist)
    // - 500: Internal Server Error (server error)
    //
    // NextResponse.json() creates a JSON response:
    // - First arg: The data to send (must be JSON-serializable)
    // - Second arg: Options including status code
    //
    // return NextResponse.json({ events: eventsResponse }, { status: 200 })

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    // ERROR HANDLING:
    // Always wrap database operations in try-catch.
    // If something goes wrong (database down, network issue, etc.):
    // 1. Log the error for debugging (console.error)
    // 2. Return a generic error message to client (don't expose internal details)
    // 3. Use 500 status code (server error)
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @brief Handles POST requests to create a new event
 *
 * @param request - Next.js request object containing the event data in the body
 *
 * @returns NextResponse with JSON containing:
 *          - On success (201): { event: EventResponse }
 *          - On validation error (400): { error: string, details: ValidationError[] }
 *          - On server error (500): { error: string }
 *
 * Request body should match CreateEventInput:
 * ```typescript
 * {
 *   title: string        // Required, 1-200 chars
 *   time: string         // Required, 1-100 chars (e.g., "5:00 PM - 7:00 PM")
 *   location: string     // Required, 1-200 chars
 *   date: string         // Required, ISO date string (e.g., "2025-08-29T17:00:00Z")
 *   description: string  // Required, 1-5000 chars
 *   isWeekendEvent: boolean // Optional, defaults to false
 * }
 * ```
 *
 * @example
 * ```bash
 * POST /api/events
 * Content-Type: application/json
 *
 * {
 *   "title": "First GBM",
 *   "time": "5:00 PM - 7:00 PM",
 *   "location": "Bamboo Room",
 *   "date": "2025-08-29T17:00:00Z",
 *   "description": "Kick off the semester with our first general body meeting...",
 *   "isWeekendEvent": false
 * }
 * ```
 *
 * Implementation steps:
 * 1. Parse request body as JSON
 * 2. Validate using createEventSchema.safeParse()
 * 3. If validation fails, return 400 with error details
 * 4. Call createEvent() from service with validated data
 * 5. Convert Date to ISO string in response
 * 6. Return created event with 201 status
 */
export async function POST(_request: NextRequest): Promise<NextResponse> {
  try {
    // TODO: Parse and validate request body
    //
    // WHY WE VALIDATE:
    // Never trust data from the client! Always validate:
    // - Malicious users might send bad data
    // - Frontend bugs might send incomplete data
    // - Network issues might corrupt data
    // Validation prevents:
    // - Database errors (invalid data types, missing required fields)
    // - Security issues (SQL injection, XSS attacks)
    // - Bad user experience (clear error messages)
    //
    // HOW VALIDATION WORKS:
    // 1. Parse JSON from request body
    //    - request.json() reads the HTTP request body
    //    - It's async because reading from network takes time
    //    - Returns a JavaScript object
    //
    // 2. Use createEventSchema.safeParse() to validate
    //    - Zod schema (from @/lib/validators/events) defines valid data shape
    //    - safeParse() returns { success: true, data } or { success: false, error }
    //    - It doesn't throw - it returns a result object
    //
    // 3. If validation fails, return 400 with error details
    //    - 400 = Bad Request (client sent invalid data)
    //    - Include error details so frontend can show specific field errors
    //    - Example: "title is required", "date must be a valid date"
    //
    // Example:
    // const body = await request.json()
    // const validation = createEventSchema.safeParse(body)
    // if (!validation.success) {
    //   return NextResponse.json(
    //     {
    //       error: 'Invalid event data',
    //       details: validation.error.errors // Array of validation errors
    //     },
    //     { status: 400 }
    //   )
    // }

    // TODO: Call service function
    // const event = await createEvent(validation.data)
    //
    // WHY validation.data:
    // After validation succeeds, validation.data contains:
    // - Only the fields that passed validation
    // - Properly typed (TypeScript knows the types)
    // - Coerced values (strings converted to dates, etc.)
    // This is safe to pass to the database.

    // TODO: Convert Date to ISO string and return
    // const eventResponse = {
    //   ...event,
    //   date: event.date.toISOString()
    // }
    // return NextResponse.json({ event: eventResponse }, { status: 201 })
    //
    // WHY STATUS 201:
    // - 200 = OK (general success)
    // - 201 = Created (specifically for successful creation)
    // - More semantic and follows REST conventions
    // - Some tools/clients use this to know a new resource was created

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    // ERROR HANDLING:
    // This catch block handles:
    // - Service layer errors (database connection, validation failures)
    // - Unexpected errors (network issues, etc.)
    // We log the full error for debugging but return a generic message to client.
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
