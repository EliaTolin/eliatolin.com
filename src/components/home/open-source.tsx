import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Section, SectionTitle } from '@/components/home/section'

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="decoration-accent hover:text-accent-bright underline decoration-2 underline-offset-4 transition-colors"
    >
      {children}
    </a>
  )
}

export function OpenSource() {
  const t = useTranslations('openSource')

  return (
    <Section id="open-source" className="pt-30">
      <SectionTitle>{t('title')}</SectionTitle>
      <p className="text-muted-foreground mt-6 max-w-3xl text-[17px] leading-relaxed">
        {t.rich('body', {
          strong: (chunks) => (
            <strong className="text-foreground font-semibold">{chunks}</strong>
          ),
          rc: (chunks) => (
            <ExternalLink href={siteConfig.links.remoteCaching}>{chunks}</ExternalLink>
          ),
          sv: (chunks) => (
            <ExternalLink href={siteConfig.links.statusVaccini}>{chunks}</ExternalLink>
          ),
          sw: (chunks) => (
            <ExternalLink href={siteConfig.links.supawho}>{chunks}</ExternalLink>
          ),
          fm: (chunks) => (
            <ExternalLink href={siteConfig.links.flutterModena}>{chunks}</ExternalLink>
          ),
        })}
      </p>
    </Section>
  )
}
