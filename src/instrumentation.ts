/**
 * @file src/instrumentation.ts
 * @brief Next.js instrumentation file for Sentry initialization
 *
 * This file is automatically loaded by Next.js and initializes Sentry
 * for server-side error tracking and monitoring.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization
    const { init } = await import("@sentry/nextjs");

    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      debug: false,
      enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
      beforeSend(event) {
        // Remove sensitive data from server events
        if (event.request) {
          delete event.request.cookies;
          if (event.request.headers) {
            delete event.request.headers.cookie;
            delete event.request.headers.authorization;
          }
        }
        return event;
      },
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry initialization
    const { init } = await import("@sentry/nextjs");

    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      debug: false,
      enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    });
  }
}

/**
 * @brief Captures errors from nested React Server Components
 * @param error - The error that occurred
 * @param request - The request object
 * @param context - Additional context for the error
 */
export async function onRequestError(
  error: Error,
  request: { path: string; method: string },
  context?: Record<string, unknown>
) {
  const { captureRequestError } = await import("@sentry/nextjs");
  captureRequestError(error, request, context || {});
}
