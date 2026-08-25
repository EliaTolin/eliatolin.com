import { defineRouting } from 'next-intl/routing'

export const locales = ['it', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'it'

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Italian lives at the root, English under /en.
  localePrefix: 'as-needed',
})

/**
 * Public path for a route in a given locale — the default locale carries no
 * prefix. Use it for canonical URLs, hreflang alternates and the sitemap;
 * for links inside the app use `Link` from `@/i18n/navigation` instead.
 */
export function localePath(locale: Locale, route = ''): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${prefix}${route}` || '/'
}
