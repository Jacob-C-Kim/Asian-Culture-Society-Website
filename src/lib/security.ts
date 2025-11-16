/**
 * Security utilities for input validation and sanitization.
 * All inputs from users should pass through these validators.
 */

const RFC_5322_MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
  // RFC 5322 specifies 254 chars max for email addresses
  return EMAIL_PATTERN.test(email) && email.length <= RFC_5322_MAX_EMAIL_LENGTH;
};

export const sanitizeUserInput = (userInput: string, maxLength: number = 500): string => {
  if (typeof userInput !== "string") {
    throw new Error("Input must be a string");
  }

  // Strip angle brackets to prevent basic XSS via HTML injection
  // More sophisticated XSS prevention should be done at render time
  return userInput.trim().slice(0, maxLength).replace(/[<>]/g, "");
};

type ValidationResult = {
  isValid: boolean;
  missingFields: string[];
};

export const validateRequiredFields = (
  formData: Record<string, unknown>,
  requiredFieldNames: string[]
): ValidationResult => {
  const missingFields: string[] = [];

  for (const fieldName of requiredFieldNames) {
    const fieldValue = formData[fieldName];
    const isEmpty = !fieldValue || (typeof fieldValue === "string" && !fieldValue.trim());

    if (isEmpty) {
      missingFields.push(fieldName);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

/**
 * Simple in-memory rate limiter.
 * Limitation: Resets on server restart and doesn't work across multiple instances.
 * For production with multiple servers, use Redis or a similar shared store.
 */
type RateLimitRecord = {
  requestCount: number;
  windowExpiresAt: number;
};

const clientRateLimitRecords = new Map<string, RateLimitRecord>();

type RateLimitResult = {
  isAllowed: boolean;
  remainingRequests: number;
};

export const checkRateLimit = (
  clientIdentifier: string,
  maxRequestsPerWindow: number,
  windowDurationMs: number
): RateLimitResult => {
  const currentTime = Date.now();
  const existingRecord = clientRateLimitRecords.get(clientIdentifier);

  // No record or window expired - start fresh window
  if (!existingRecord || currentTime > existingRecord.windowExpiresAt) {
    clientRateLimitRecords.set(clientIdentifier, {
      requestCount: 1,
      windowExpiresAt: currentTime + windowDurationMs,
    });
    return {
      isAllowed: true,
      remainingRequests: maxRequestsPerWindow - 1,
    };
  }

  // Rate limit exceeded
  if (existingRecord.requestCount >= maxRequestsPerWindow) {
    return {
      isAllowed: false,
      remainingRequests: 0,
    };
  }

  // Increment and allow
  existingRecord.requestCount++;
  return {
    isAllowed: true,
    remainingRequests: maxRequestsPerWindow - existingRecord.requestCount,
  };
};

export const cleanupExpiredRateLimitRecords = (): void => {
  const currentTime = Date.now();
  for (const [clientId, record] of clientRateLimitRecords.entries()) {
    if (currentTime > record.windowExpiresAt) {
      clientRateLimitRecords.delete(clientId);
    }
  }
};
