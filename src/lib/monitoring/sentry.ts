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
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  } else {
    // Fallback to console in development or when Sentry is not configured
    console.error("[Error]", error, context);
  }
}

/**
 * Capture custom message
 */
export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[${level}]`, message);
  }
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email?: string; username?: string } | null) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setUser(user);
  }
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, unknown>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message,
      data,
      level: "info",
    });
  }
}
