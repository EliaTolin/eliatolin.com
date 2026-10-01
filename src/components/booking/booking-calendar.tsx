'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { siteConfig } from '@/config/site'

// The site's accent (oklch(0.72 0.15 40)) in hex, which is what Cal.com accepts.
const BRAND_COLOR = '#f28058'

/**
 * Cal.com booking calendar, embedded inline.
 *
 * This is the only place the site talks to a third party: opening /call loads
 * Cal.com's script and iframe straight away. The privacy page says so — keep
 * the two in sync if this ever moves to another page.
 */
export function BookingCalendar({ notice }: { notice: string }) {
  useEffect(() => {
    void getCalApi().then((cal) => {
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': BRAND_COLOR },
          dark: { 'cal-brand': BRAND_COLOR },
        },
      })
    })
  }, [])

  return (
    <>
      <Cal
        calLink={siteConfig.booking.calLink}
        config={{ layout: 'month_view', theme: 'dark' }}
        className="min-h-[640px] w-full overflow-hidden"
      />
      <p className="text-faint-foreground mt-4 text-center text-sm text-pretty">
        {notice}{' '}
        <a
          href={siteConfig.booking.url}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-foreground underline underline-offset-4 transition-colors"
        >
          cal.com ↗
        </a>
      </p>
    </>
  )
}
