// Sentry integration
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Next.js telemetry
  // This prevents the telemetry warning and anonymous data collection
  // Can also be controlled via NEXT_TELEMETRY_DISABLED environment variable
  telemetry: false,

  // Security headers following OWASP recommendations
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Content Security Policy - Allow embedding in CampusGroups iframes
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
              "style-src 'self' 'unsafe-inline'", // Required for Tailwind
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'self' https://campusgroups.rit.edu https://*.campusgroups.com https://*.rit.edu",
            ].join("; "),
          },
          // X-Frame-Options for older browsers
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Enable XSS protection
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Referrer policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // HSTS (Strict Transport Security)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      // API routes specific headers
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  // Redirect root to home
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true,

  // Strict mode for better error detection
  reactStrictMode: true,

  // Enable standalone output for Docker
  output: "standalone",
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in production
  disableServerWebpackPlugin: process.env.NODE_ENV !== "production",
  disableClientWebpackPlugin: process.env.NODE_ENV !== "production",

  // Hide source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  widenClientFileUpload: true,
};

// Export with Sentry wrapper (gracefully handles when Sentry env vars are missing)
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
