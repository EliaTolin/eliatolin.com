import { siteConfig } from '@/config/site'

/**
 * Public site for each project/role, keyed by the display name used in
 * the message catalogs. Entries missing here render as plain text.
 */
export const projectLinks: Record<string, string> = {
  'Aurora Digital': siteConfig.links.aurora,
  Builtdifferent: siteConfig.links.builtdifferent,
  Ermanno: siteConfig.links.ermanno,
  'Quiz Radioamatori': siteConfig.links.quizRadioamatori,
  HamQRG: siteConfig.links.hamqrg,
  Tepio: siteConfig.links.tepio,
  'ZTL Elettrica': siteConfig.links.ztlElettrica,
  Acetaia: siteConfig.links.acetaia,
}
