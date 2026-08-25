import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/config/site'

const year = new Date().getFullYear()

export function SiteFooter() {
  const t = useTranslations('footer')

  return (
    <footer className="border-border/70 mt-24 border-t py-10">
      <Container className="text-muted-foreground flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. {t('rights')}
        </p>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.repository}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            {t('sourceCode')}
          </a>
        </nav>
      </Container>
    </footer>
  )
}
