import createNextIntlPlugin from 'next-intl/plugin'
import withSimpleAnalytics from '@simpleanalytics/next/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/**
 * Security headers applied to every response.
 *
 * These live here rather than in `proxy.ts` on purpose: the site is fully
 * static-prerendered (`x-nextjs-prerender: 1`), and a per-request CSP nonce
 * would force dynamic rendering and throw that away. Static headers keep the
 * prerender intact.
 *
 * `script-src`/`style-src` need `'unsafe-inline'`: Next injects an inline
 * bootstrap script, and `json-ld.tsx` renders inline JSON-LD. The directive
 * still blocks every off-origin script, which is the attack this actually
 * defends against.
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  // Emits a self-contained server bundle in .next/standalone, which is what the
  // Dockerfile ships to Coolify. Keep this on.
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    // Next's default is ['image/webp'] only. AVIF first, WebP as the fallback.
    formats: ['image/avif', 'image/webp'],
  },
  headers() {
    return Promise.resolve([{ source: '/:path*', headers: securityHeaders }])
  },
  // Pin the workspace root: without it Turbopack walks up and picks a lockfile
  // outside the project.
  turbopack: {
    root: import.meta.dirname,
  },
}

// Simple Analytics proxies its script and event queue through this origin
// (/proxy.js, /auto-events.js, /simple/*), so no third-party host has to be
// allowed in the CSP above and adblockers do not break tracking.
// Needs SIMPLE_ANALYTICS_HOSTNAME at build time or the plugin disables itself.
export default withNextIntl(withSimpleAnalytics(nextConfig))
