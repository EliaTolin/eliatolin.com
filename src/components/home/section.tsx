import type { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { logos, wordmarks } from '@/config/logos'

export function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('px-gutter mx-auto w-full max-w-5xl', className)}>
      {children}
    </section>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[2.1rem] font-extrabold tracking-tight sm:text-[2.5rem]">
      {children}
    </h2>
  )
}

/** Emoji tile used across story steps, projects and role cards. */
export function Tile({
  children,
  tone,
  className,
}: {
  children: ReactNode
  tone: 'accent' | 'mint'
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex size-13 shrink-0 items-center justify-center rounded-2xl text-2xl',
        tone === 'accent' ? 'bg-accent-soft' : 'bg-mint-soft',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Tile that shows the entity's logo when one is registered, and falls back
 * to the emoji/placeholder tile otherwise.
 */
export function LogoTile({
  name,
  tone,
  fallback,
  className,
}: {
  name: string
  tone: 'accent' | 'mint'
  fallback: ReactNode
  className?: string
}) {
  const logo = logos[name]

  if (!logo) {
    return (
      <Tile tone={tone} className={className}>
        {fallback}
      </Tile>
    )
  }

  return (
    <div
      className={cn(
        'flex size-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl',
        logo.bg === 'light' && 'bg-foreground p-1.5',
        className,
      )}
    >
      <Image
        src={logo.src}
        alt={`Logo ${name}`}
        width={52}
        height={52}
        className="size-full object-contain"
      />
    </div>
  )
}

/**
 * A brand's wordmark at its registered height, or nothing when none is
 * registered for `name`. `className` adds to it (spacing) and must not set a height.
 */
export function Wordmark({ name, className }: { name: string; className?: string }) {
  const mark = wordmarks[name]
  if (!mark) return null

  return (
    <Image
      src={mark.src}
      alt={name}
      width={mark.width}
      height={mark.height}
      className={cn('w-auto', mark.className, className)}
    />
  )
}
