import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/locale-switcher'

// Sections of the home page. Linked as `/#…` so they also work from /call and
// /privacy; next-intl's Link adds the locale prefix (/en/#…) when needed.
const navItems = [
  { hash: 'story', key: 'story' },
  { hash: 'projects', key: 'projects' },
  { hash: 'business', key: 'business' },
  { hash: 'contact', key: 'contact' },
] as const

export function SiteHeader() {
  const t = useTranslations('nav')

  return (
    <header className="px-gutter mx-auto flex w-full max-w-5xl items-center justify-between pt-6">
      {/* -m cancels the layout effect of the padding: bigger tap target, same look. */}
      <Link href="/" className="font-display -m-2 p-2 text-lg font-bold no-underline">
        et<span className="text-accent">.</span>
      </Link>
      <nav
        aria-label="Main"
        className="flex items-center gap-5 text-sm font-medium sm:gap-7"
      >
        {navItems.map((item) => (
          <Link
            key={item.hash}
            href={{ pathname: '/', hash: item.hash }}
            className="text-muted-foreground hover:text-foreground hidden no-underline transition-colors sm:inline"
          >
            {t(item.key)}
          </Link>
        ))}
        <LocaleSwitcher />
      </nav>
    </header>
  )
}
