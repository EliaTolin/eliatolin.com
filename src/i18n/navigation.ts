import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Locale-aware drop-in replacements for next/link and the navigation hooks.
// Always import Link/redirect/useRouter from here, never from next/*.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
