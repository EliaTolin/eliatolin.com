import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import { Hero } from '@/components/home/hero'
import { Story } from '@/components/home/story'
import { PressMarquee } from '@/components/home/press-marquee'
import { Roles } from '@/components/home/roles'
import { Projects } from '@/components/home/projects'
import { OpenSource } from '@/components/home/open-source'
import { Business } from '@/components/home/business'
import { Contact } from '@/components/home/contact'

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <PressMarquee />
      <Story />
      <Roles />
      <Projects />
      <OpenSource />
      <Business />
      <Contact />
    </>
  )
}
