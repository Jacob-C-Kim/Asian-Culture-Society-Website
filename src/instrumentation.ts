/**
 * @file src/instrumentation.ts
 * @brief Next.js instrumentation file for Sentry initialization
 *
 * This file is automatically loaded by Next.js and initializes Sentry
 * for server-side error tracking and monitoring.
 */

import type { ErrorEvent, EventHint } from "@sentry/nextjs";

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization
    const { init } = await import("@sentry/nextjs");

    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      debug: false,
      enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
      beforeSend(event: ErrorEvent, _hint: EventHint): ErrorEvent | null {
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
 * @param request - The request object (Next.js RequestInfo type)
 * @param context - Additional context for the error (optional)
 */
export async function onRequestError(
  error: Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
  },
  context?: {
    routerKind?: string;
    routePath?: string;
    routeType?: string;
    severity?: "fatal" | "error" | "warning" | "info" | "debug";
    [key: string]: unknown;
  }
): Promise<void> {
  const { captureRequestError } = await import("@sentry/nextjs");
  // captureRequestError requires 3 arguments: error, request, and context
  // Provide default context if not provided, ensuring all required fields are present
  const errorContext = context
    ? {
        routerKind: context.routerKind || "app",
        routePath: context.routePath || request.path,
        routeType: context.routeType || "page",
        severity: context.severity || ("error" as const),
        ...context,
      }
    : {
        routerKind: "app",
        routePath: request.path,
        routeType: "page",
        severity: "error" as const,
      };
  captureRequestError(error, request, errorContext);
}
