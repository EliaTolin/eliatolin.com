import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-gutter mx-auto w-full max-w-3xl', className)}>{children}</div>
  )
}
