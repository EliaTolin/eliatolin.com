import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Bricolage_Grotesque, Onest } from 'next/font/google'

import { localePath, routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/config/site'
import { SiteHeader } from '@/components/site-header'
import { JsonLd } from '@/components/json-ld'
import { SiteFooter } from '@/components/site-footer'

import '../globals.css'

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#101013',
  colorScheme: 'dark',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    alternates: {
      canonical: localePath(locale as Locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l)])),
        'x-default': localePath(routing.defaultLocale),
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: locale === 'it' ? 'en_US' : 'it_IT',
      title: t('title'),
      description: t('description'),
      url: localePath(locale as Locale),
      images: [
        {
          url: `/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`/og-${locale}.png`],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Opts every page under this layout into static rendering.
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${onest.variable} ${bricolage.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <JsonLd locale={locale as Locale} />
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
