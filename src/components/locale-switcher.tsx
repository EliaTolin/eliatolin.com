'use client'

import { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const t = useTranslations('nav')
  const activeLocale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchTo(locale: Locale) {
    if (locale === activeLocale) return
    startTransition(() => {
      // `pathname` is locale-agnostic here, so the user stays on the same page.
      router.replace(pathname, { locale })
    })
  }

  return (
    <div
      role="group"
      aria-label={t('switchLanguage')}
      className={cn(
        'text-muted-foreground flex items-center gap-1 text-xs tracking-wide uppercase',
        isPending && 'opacity-60',
      )}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            lang={locale}
            aria-current={locale === activeLocale ? 'true' : undefined}
            onClick={() => switchTo(locale)}
            className={cn(
              // min-h/min-w give a 32px tap target around a 16px glyph: the bare
              // text hit area was 8x16, under the 24x24 WCAG 2.5.8 AA minimum,
              // in the header on every page.
              'hover:text-foreground inline-flex min-h-8 min-w-8 items-center justify-center rounded transition-colors',
              locale === activeLocale && 'text-foreground font-medium',
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  )
}
