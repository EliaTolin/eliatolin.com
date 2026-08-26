import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Emits a self-contained server bundle in .next/standalone, which is what the
  // Dockerfile ships to Coolify. Keep this on.
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  // Pin the workspace root: without it Turbopack walks up and picks a lockfile
  // outside the project.
  turbopack: {
    root: import.meta.dirname,
  },
}

export default withNextIntl(nextConfig)
