type ClassValue = string | number | null | false | undefined

/** Minimal className joiner. Swap for clsx + tailwind-merge if the UI grows. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ')
}
