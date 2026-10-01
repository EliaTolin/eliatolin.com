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
 *
 * The one third-party origin is app.cal.com, for the booking calendar embedded
 * on /call (see `booking-calendar.tsx`). The privacy page discloses it; no
 * other page loads anything from it.
 */
const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // React needs eval() in development only (callstack reconstruction).
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://app.cal.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://app.cal.com",
      'frame-src https://app.cal.com',
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

/**
 * Domain to report to Simple Analytics.
 *
 * Deliberately not dependent on a dedicated env var: the plugin silently
 * disables itself when its hostname is missing, and Coolify does not apply the
 * Dockerfile's ARG defaults — which is exactly how the first deploy shipped a
 * /proxy.js that 404'd. NEXT_PUBLIC_SITE_URL is already configured there and
 * demonstrably arrives, so derive from it and fall back to the real domain.
 * The explicit env vars still work as an override.
 */
const analyticsHostname =
  process.env.SIMPLE_ANALYTICS_HOSTNAME ||
  process.env.NEXT_PUBLIC_SIMPLE_ANALYTICS_HOSTNAME ||
  new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eliatolin.com').hostname

// Keeps local development out of the production stats.
const analyticsEnabled = analyticsHostname !== 'localhost'

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
export default withNextIntl(
  analyticsEnabled
    ? withSimpleAnalytics(nextConfig, { hostname: analyticsHostname })
    : nextConfig,
)
