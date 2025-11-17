/**
 * @file src/instrumentation-client.ts
 * @brief Next.js client-side instrumentation file for Sentry initialization
 *
 * This file is automatically loaded by Next.js for client-side Sentry
 * error tracking and monitoring. Replaces the deprecated sentry.client.config.ts.
 * Required for Turbopack compatibility.
 */

import * as Sentry from "@sentry/nextjs";
import type { ErrorEvent, EventHint } from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Filter sensitive data
  beforeSend(event: ErrorEvent, _hint: EventHint): ErrorEvent | null {
    // Remove sensitive headers
    if (event.request?.headers) {
      delete event.request.headers.cookie;
      delete event.request.headers.authorization;
    }
    return event;
  },

  // Don't send events if DSN is not configured
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});

/**
 * @brief Hook to instrument Next.js router transitions
 * @description Required by Sentry SDK to track navigation events
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
