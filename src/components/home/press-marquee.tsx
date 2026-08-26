import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { logoDevUrl, pressOutlets, pressWordmarks } from '@/config/press'
import { cn } from '@/lib/utils'

function OutletRow({
  outlets,
  ariaHidden,
}: {
  outlets: readonly (typeof pressOutlets)[number][]
  ariaHidden?: boolean
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-16 pr-16">
      {outlets.map((outlet) => (
        <a
          key={outlet.domain}
          href={outlet.href}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={ariaHidden ? -1 : undefined}
          className="flex items-center gap-3.5 no-underline opacity-55 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
        >
          <Image
            src={logoDevUrl(outlet.domain)}
            alt=""
            width={36}
            height={36}
            unoptimized
            className="size-9 rounded-lg"
          />
          <span className="font-display text-base font-bold whitespace-nowrap">
            {outlet.name}
          </span>
        </a>
      ))}
    </div>
  )
}

function MarqueeRow({
  outlets,
  reverse,
}: {
  outlets: readonly (typeof pressOutlets)[number][]
  reverse?: boolean
}) {
  return (
    <div className="marquee">
      <div className={cn('marquee-track', reverse && 'marquee-track-reverse')}>
        <OutletRow outlets={outlets} />
        <OutletRow outlets={outlets} ariaHidden />
      </div>
    </div>
  )
}

export function PressMarquee() {
  const t = useTranslations('press')
  // Two rows with staggered order and opposite directions.
  const half = Math.ceil(pressOutlets.length / 2)
  const rowB = [...pressOutlets.slice(half), ...pressOutlets.slice(0, half)]

  return (
    <section aria-label={t('title')} className="mt-28">
      <p className="text-faint-foreground mb-7 text-center text-xs font-semibold tracking-[0.14em] uppercase">
        {t('title')}
      </p>
      <div className="flex flex-col gap-6">
        <MarqueeRow outlets={pressOutlets} />
        <MarqueeRow outlets={rowB} reverse />
      </div>
    </section>
  )
}

function WordmarkRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-20 pr-20">
      {pressWordmarks.map((outlet) => (
        <a
          key={outlet.src}
          href={outlet.href}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={ariaHidden ? -1 : undefined}
          className="opacity-50 transition duration-300 hover:opacity-100"
        >
          {/* brightness(0) invert(1) renders every wordmark solid white. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static assets, several SVG with intrinsic sizing */}
          <img
            src={outlet.src}
            alt={outlet.name}
            className="h-7 w-auto brightness-0 invert"
          />
        </a>
      ))}
    </div>
  )
}

/** Variant B: monochrome wordmarks only, single row. */
export function PressWordmarks() {
  return (
    <section aria-label="Press" className="mt-16">
      <div className="marquee">
        <div className="marquee-track">
          <WordmarkRow />
          <WordmarkRow ariaHidden />
        </div>
      </div>
    </section>
  )
}
