'use client'

import { useTranslations } from 'next-intl'
import { THEME_STORAGE_KEY } from '@/components/theme-script'

export function ThemeToggle() {
  const t = useTranslations('nav')

  // The current theme lives on <html> as a class, put there by ThemeScript.
  // Reading it at click time keeps this component stateless: server and client
  // render identical markup, and CSS alone decides which icon is visible.
  function toggle() {
    const root = document.documentElement
    const dark = !root.classList.contains('dark')
    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for
      // this page view.
    }
  }

  return (
    <button
      type="button"
      aria-label={t('toggleTheme')}
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-full transition-colors"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="hidden size-4 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  )
}
