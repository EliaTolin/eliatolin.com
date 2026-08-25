import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'

const year = new Date().getFullYear()

export function SiteFooter() {
  const t = useTranslations('footer')

  return (
    <footer className="px-gutter mx-auto mt-18 w-full max-w-5xl pb-8">
      <div className="text-faint-foreground flex items-center justify-between border-t pt-5 text-[13px]">
        <span>{t('copyright', { year })}</span>
        <a
          href={siteConfig.links.repository}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-muted-foreground no-underline transition-colors"
        >
          {t('openSource')}
        </a>
      </div>
    </footer>
  )
}
