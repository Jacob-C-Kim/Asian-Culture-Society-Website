/**
 * Sentry error monitoring configuration
 *
 * To enable Sentry:
 * 1. Install: npm install @sentry/nextjs
 * 2. Run: npx @sentry/wizard@latest -i nextjs
 * 3. Add NEXT_PUBLIC_SENTRY_DSN to .env.local
 * 4. Uncomment the initialization code below
 */

export function initSentry() {
  if (typeof window === 'undefined') return; // Server-side, skip

  // Uncomment after installing @sentry/nextjs
  /*
  import * as Sentry from '@sentry/nextjs';

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Filter sensitive data
    beforeSend(event) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers.cookie;
        delete event.request.headers.authorization;
      }
      return event;
    },

    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
  */

  // Placeholder for development
  console.log('[Monitoring] Sentry monitoring placeholder (install @sentry/nextjs to enable)');
}

/**
 * Capture custom error
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production') {
    // Uncomment after installing @sentry/nextjs
    // Sentry.captureException(error, { extra: context });
    console.error('[Sentry]', error, context);
  } else {
    console.error('[Dev Error]', error, context);
  }
}

/**
 * Capture custom message
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (process.env.NODE_ENV === 'production') {
    // Uncomment after installing @sentry/nextjs
    // Sentry.captureMessage(message, level);
    console.log(`[Sentry ${level}]`, message);
  } else {
    console.log(`[Dev ${level}]`, message);
  }
}
