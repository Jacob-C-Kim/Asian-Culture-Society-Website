/**
 * API endpoint for mentor program applications.
 * Handles validation, rate limiting, and sanitization.
 */
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import {
  validateRequiredFields,
  sanitizeUserInput,
  isValidEmail,
  checkRateLimit
} from '@/lib/security';

const REQUIRED_FIELDS = ['name', 'email', 'major', 'year'] as const;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_TEXT_FIELD_LENGTH = 500;

function getClientIpAddress(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIpAddress(request);
    const rateLimitResult = checkRateLimit(
      clientIp,
      env.RATE_LIMIT_MAX,
      env.RATE_LIMIT_WINDOW
    );

    if (!rateLimitResult.isAllowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      );
    }

    const requestBody = await request.json();
    const validation = validateRequiredFields(requestBody, [...REQUIRED_FIELDS]);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: validation.missingFields },
        { status: 400 }
      );
    }

    if (!isValidEmail(requestBody.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const mentorApplication = {
      name: sanitizeUserInput(requestBody.name, MAX_NAME_LENGTH),
      email: sanitizeUserInput(requestBody.email, MAX_EMAIL_LENGTH),
      major: sanitizeUserInput(requestBody.major, MAX_NAME_LENGTH),
      year: sanitizeUserInput(requestBody.year, 50),
      interests: requestBody.interests
        ? sanitizeUserInput(requestBody.interests, MAX_TEXT_FIELD_LENGTH)
        : '',
      availability: requestBody.availability
        ? sanitizeUserInput(requestBody.availability, MAX_TEXT_FIELD_LENGTH)
        : '',
    };

    // TODO: Persist to database when Supabase is configured
    console.log('Mentor application received:', mentorApplication);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remainingRequests.toString(),
        }
      }
    );

  } catch (error) {
    // Never expose internal error details to clients
    console.error('Error processing mentor application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}
