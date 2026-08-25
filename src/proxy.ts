import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Next.js 16 renamed Middleware to Proxy — same runtime, new filename.
export default createMiddleware(routing)

export const config = {
  // Match everything except Next internals, the API routes and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
