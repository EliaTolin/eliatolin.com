'use client'

import { useSyncExternalStore, type ReactNode } from 'react'

const USER = 'elia.tolin'
const DOMAIN = 'auroradigital.it'

const emptySubscribe = () => () => {}

/**
 * Renders the mailto link only after hydration, so the address never
 * appears in the statically generated HTML that spam harvesters scrape.
 */
export function ObfuscatedEmail({
  className,
  children,
  showAddress,
}: {
  className?: string
  children?: ReactNode
  showAddress?: boolean
}) {
  // Hydration-safe "mounted" check without effects or state.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  if (!mounted) {
    // Same footprint before hydration to avoid layout shift.
    return <span className={className}>{showAddress ? '…' : children}</span>
  }

  const address = `${USER}@${DOMAIN}`

  return (
    <a href={`mailto:${address}`} className={className}>
      {showAddress ? address : children}
    </a>
  )
}
