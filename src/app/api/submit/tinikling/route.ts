/**
 * API endpoint for Tinikling workshop registrations.
 * Handles validation, rate limiting, and sanitization.
 */
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
  validateRequiredFields,
  sanitizeUserInput,
  isValidEmail,
  checkRateLimit,
} from "@/lib/security";

const REQUIRED_FIELDS = ["name", "email"] as const;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_TEXT_FIELD_LENGTH = 500;

/**
 * @brief Extracts client IP address from request headers
 * @param request - The Next.js request object
 * @return The client IP address as a string
 */
function getClientIpAddress(request: NextRequest): string {
  return request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
}

/**
 * @brief Handles POST requests for Tinikling workshop registrations
 * @param request - The Next.js request object
 * @return Promise<NextResponse> JSON response with success or error
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const clientIp = getClientIpAddress(request);
    const rateLimitResult = checkRateLimit(clientIp, env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW);

    if (!rateLimitResult.isAllowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "60",
          },
        }
      );
    }

    const requestBody = await request.json();
    const validation = validateRequiredFields(requestBody, [...REQUIRED_FIELDS]);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Missing required fields", fields: validation.missingFields },
        { status: 400 }
      );
    }

    if (!isValidEmail(requestBody.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const workshopRegistration = {
      name: sanitizeUserInput(requestBody.name, MAX_NAME_LENGTH),
      email: sanitizeUserInput(requestBody.email, MAX_EMAIL_LENGTH),
      experienceLevel: requestBody.experience
        ? sanitizeUserInput(requestBody.experience, 50)
        : "beginner",
      notes: requestBody.notes ? sanitizeUserInput(requestBody.notes, MAX_TEXT_FIELD_LENGTH) : "",
    };

    // TODO: Implement data persistence (e.g., send email, write to database, or webhook)
    // For now, log the registration for demonstration purposes
    console.log("Tinikling workshop registration received:", workshopRegistration);

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": rateLimitResult.remainingRequests.toString(),
        },
      }
    );
  } catch (error) {
    // Never expose internal error details to clients
    console.error("Error processing workshop registration:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @brief Handles GET requests (not allowed for this endpoint)
 * @return Promise<NextResponse> JSON response with 405 Method Not Allowed
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
