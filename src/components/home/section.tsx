import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
