/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow embedding in iframes from CampusGroups
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://campusgroups.rit.edu https://*.campusgroups.com https://*.rit.edu"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://campusgroups.rit.edu'
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
  }
}

module.exports = nextConfig
