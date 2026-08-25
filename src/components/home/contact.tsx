import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Section } from '@/components/home/section'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <Section id="contact" className="pt-32 pb-4">
      <div className="border-t pt-16 text-center">
        <h2 className="font-display text-[2.3rem] font-extrabold tracking-tight sm:text-[2.75rem]">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-[17px]">
          {t('text')}
        </p>
        <div className="mt-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="bg-accent text-background inline-block rounded-full px-8 py-3.5 text-base font-bold no-underline transition-opacity hover:opacity-90"
          >
            {t('cta')}
          </a>
        </div>
        <p className="text-muted-foreground mt-5 text-sm">{siteConfig.email}</p>
        <div className="mt-4 flex justify-center gap-6 text-sm font-medium">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="decoration-accent hover:text-accent-bright underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="decoration-accent hover:text-accent-bright underline underline-offset-4"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  )
}
