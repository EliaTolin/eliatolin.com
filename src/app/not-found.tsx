import Link from 'next/link'
import { defaultLocale } from '@/i18n/routing'
import './globals.css'

/**
 * Fallback for requests that never reached a locale segment (e.g. an unknown
 * top-level path). It sits outside `[locale]/layout.tsx`, so it renders its own
 * document shell and stays language-neutral.
 */
export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-sm opacity-60">404</p>
        <h1 className="text-2xl tracking-tight">Page not found</h1>
        {/* Object form: with `localePrefix: 'as-needed'` the root path is a
            proxy rewrite, so typed routes has no literal entry for it. */}
        <Link href={{ pathname: '/' }} className="text-sm underline underline-offset-4">
          Back to home
        </Link>
      </body>
    </html>
  )
}
