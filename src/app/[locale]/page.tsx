import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/config/site'

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return <Home />
}

function Home() {
  const t = useTranslations('home')

  return (
    <Container className="py-24 sm:py-32">
      <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
        {t('eyebrow')}
      </p>

      <h1 className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
        {t('title')}
      </h1>

      <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty">
        {t('lead')}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <Link
          href="/about"
          className="border-foreground hover:bg-foreground hover:text-background inline-flex items-center rounded-full border px-5 py-2 transition-colors"
        >
          {t('primaryCta')}
        </Link>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          {t('secondaryCta')}
        </a>
      </div>
    </Container>
  )
}
