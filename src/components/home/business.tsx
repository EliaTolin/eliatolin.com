import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Section, SectionTitle } from '@/components/home/section'

function OfferCard({
  title,
  text,
  highlight,
}: {
  title: string
  text: string
  highlight: string
}) {
  return (
    <div className="bg-surface rounded-[20px] border p-7">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-3.5 text-[15px] leading-relaxed">
        {text}
        <strong className="text-foreground font-semibold">{highlight}</strong>
      </p>
    </div>
  )
}

export function Business() {
  const t = useTranslations('business')

  return (
    <Section id="business" className="pt-30">
      <SectionTitle>{t('title')}</SectionTitle>
      <p className="text-muted-foreground mt-3 max-w-2xl text-[17px]">{t('intro')}</p>
      <div className="mt-10 grid gap-4.5 md:grid-cols-2">
        <OfferCard
          title={t('dev.title')}
          text={t('dev.text')}
          highlight={t('dev.highlight')}
        />
        <OfferCard
          title={t('training.title')}
          text={t('training.text')}
          highlight={t('training.highlight')}
        />
      </div>
      <p className="text-muted-foreground mt-7 max-w-3xl text-sm leading-relaxed">
        {t('sectors')}
      </p>
      <p className="mt-6 text-base">
        {t('ctaQuestion')}{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="decoration-accent hover:text-accent-bright font-bold underline decoration-2 underline-offset-4"
        >
          {t('ctaAction')}
        </a>
      </p>
    </Section>
  )
}
