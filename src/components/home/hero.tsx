import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Section } from '@/components/home/section'

function RoleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="decoration-accent text-foreground hover:text-accent-bright underline decoration-2 underline-offset-4 transition-colors"
    >
      {children}
    </a>
  )
}

export function Hero() {
  const t = useTranslations('hero')

  return (
    <Section className="flex flex-col items-center gap-14 pt-20 sm:pt-24 lg:flex-row lg:gap-16">
      <div className="lg:flex-[1.3]">
        <p className="text-lg font-medium">
          {t('hello')}{' '}
          <span className="text-muted-foreground font-normal">— {t('title')}</span>
        </p>
        <h1 className="font-display mt-4 text-[2.6rem] leading-[1.06] font-extrabold tracking-tight text-balance sm:text-[3.6rem]">
          {t('headlineStart')}
          <span className="decoration-accent underline decoration-wavy decoration-[0.09em] underline-offset-8 [text-decoration-skip-ink:none]">
            {t('headlineHighlight')}
          </span>
          {t('headlineEnd')}
        </h1>
        <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed">
          {t.rich('roles', {
            bd: (chunks) => (
              <RoleLink href={siteConfig.links.builtdifferent}>{chunks}</RoleLink>
            ),
            er: (chunks) => <RoleLink href={siteConfig.links.ermanno}>{chunks}</RoleLink>,
            au: (chunks) => <RoleLink href={siteConfig.links.aurora}>{chunks}</RoleLink>,
            fm: (chunks) => (
              <RoleLink href={siteConfig.links.flutterModena}>{chunks}</RoleLink>
            ),
          })}
        </p>
        <p className="mt-5 max-w-xl text-lg leading-relaxed">
          {t('flagStart')}
          <strong className="text-accent-bright font-bold">{t('flagNumber')}</strong>
          {t('flagMiddle')}
          <span className="text-muted-foreground">{t('flagNote')}</span>
        </p>
        <p className="mt-10 text-base font-semibold">
          <a href="#story" className="no-underline">
            {t('scrollCue')}
          </a>
        </p>
      </div>
      <div className="w-full max-w-xs lg:max-w-none lg:flex-[0.7]">
        <Image
          src="/photos/elia.jpg"
          alt={t('photoAlt')}
          width={750}
          height={900}
          priority
          className="aspect-5/6 w-full rounded-[28px] object-cover"
        />
      </div>
    </Section>
  )
}
