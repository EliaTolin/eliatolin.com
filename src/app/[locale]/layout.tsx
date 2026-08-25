import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Inter, Instrument_Serif } from 'next/font/google'

import { localePath, routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/config/site'
import { ThemeScript } from '@/components/theme-script'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

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
      languages: Object.fromEntries(routing.locales.map((l) => [l, localePath(l)])),
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale,
      title: t('title'),
      description: t('description'),
      url: localePath(locale as Locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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
      className={`${inter.variable} ${display.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
