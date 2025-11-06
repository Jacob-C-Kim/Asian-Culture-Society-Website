/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers following OWASP recommendations
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - Allow embedding in CampusGroups iframes
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
              "style-src 'self' 'unsafe-inline'", // Required for Tailwind
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'self' https://campusgroups.rit.edu https://*.campusgroups.com https://*.rit.edu",
            ].join('; ')
          },
          // X-Frame-Options for older browsers
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enable XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          // HSTS (Strict Transport Security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      },
      // API routes specific headers
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },

  // Redirect root to home
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home'
      }
    ]
  },

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true,

  // Strict mode for better error detection
  reactStrictMode: true,

  // Enable standalone output for Docker
  output: 'standalone',

  // Temporarily disable ESLint during builds to test asset changes
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
