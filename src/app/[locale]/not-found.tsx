import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/container'

export default function LocaleNotFound() {
  const t = useTranslations('notFound')

  return (
    <Container className="py-28 sm:py-36">
      <p className="text-muted-foreground font-mono text-sm">404</p>
      <h1 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md leading-relaxed text-pretty">
        {t('description')}
      </p>
      <Link href="/" className="mt-8 inline-block text-sm underline underline-offset-4">
        {t('cta')}
      </Link>
    </Container>
  )
}
