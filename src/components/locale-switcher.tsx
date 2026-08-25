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
              'hover:text-foreground rounded transition-colors',
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
