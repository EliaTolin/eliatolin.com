import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/locale-switcher'

const navItems = [
  { href: '#story', key: 'story' },
  { href: '#projects', key: 'projects' },
  { href: '#business', key: 'business' },
  { href: '#contact', key: 'contact' },
] as const

export function SiteHeader() {
  const t = useTranslations('nav')

  return (
    <header className="px-gutter mx-auto flex w-full max-w-5xl items-center justify-between pt-6">
      <Link href="/" className="font-display text-lg font-bold no-underline">
        et<span className="text-accent">.</span>
      </Link>
      <nav
        aria-label="Main"
        className="flex items-center gap-5 text-sm font-medium sm:gap-7"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-muted-foreground hover:text-foreground hidden no-underline transition-colors sm:inline"
          >
            {t(item.key)}
          </a>
        ))}
        <LocaleSwitcher />
      </nav>
    </header>
  )
}
