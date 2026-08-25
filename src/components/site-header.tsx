import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/container'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/config/site'

const navItems = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
] as const

export function SiteHeader() {
  const t = useTranslations('nav')

  return (
    <header className="border-border/70 sticky top-0 z-50 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-lg tracking-tight whitespace-nowrap">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
