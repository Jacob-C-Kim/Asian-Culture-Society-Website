/**
 * Sentry error monitoring utility functions
 *
 * Sentry is configured in:
 * - sentry.client.config.ts (browser)
 * - sentry.server.config.ts (server)
 * - sentry.edge.config.ts (edge runtime)
 *
 * To enable in production:
 * 1. Add NEXT_PUBLIC_SENTRY_DSN to .env.local
 * 2. (Optional) Add SENTRY_ORG and SENTRY_PROJECT for source map uploads
 */

import * as Sentry from "@sentry/nextjs";

/**
 * Capture custom error with context
 * @param error - The error to capture
 * @param context - Optional context data
 * @return void
 */
export function captureError(error: Error, context?: Record<string, unknown>): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  } else {
    // Fallback to console in development or when Sentry is not configured
    console.error("[Error]", error, context);
  }
}

/**
 * Capture custom message
 * @param message - The message to capture
 * @param level - The severity level
 * @return void
 */
export function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info"
): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[${level}]`, message);
  }
}

/**
 * Set user context for error tracking
 * @param user - User information or null to clear
 * @return void
 */
export function setUser(user: { id: string; email?: string; username?: string } | null): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setUser(user);
  }
}

/**
 * Add breadcrumb for debugging
 * @param message - The breadcrumb message
 * @param data - Optional breadcrumb data
 * @return void
 */
export function addBreadcrumb(message: string, data?: Record<string, unknown>): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message,
      data,
      level: "info",
    });
  }
}
