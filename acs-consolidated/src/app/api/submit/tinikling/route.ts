/**
 * Secure API endpoint for Tinikling sign-up submissions
 */
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { validateFormData, sanitizeString, isValidEmail, checkRateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitCheck = checkRateLimit(ip, env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW);

    if (!rateLimitCheck.allowed) {
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

    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email'];
    const validation = validateFormData(body, requiredFields);

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeString(body.name, 100),
      email: sanitizeString(body.email, 254),
      experience: body.experience ? sanitizeString(body.experience, 50) : 'beginner',
      notes: body.notes ? sanitizeString(body.notes, 500) : '',
    };

    // TODO: Store in database (Supabase integration)
    // For now, just log the submission
    console.log('Tinikling sign-up submission:', sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Tinikling sign-up submitted successfully',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
        }
      }
    );

  } catch (error) {
    console.error('Error processing Tinikling sign-up:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Reject other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}
