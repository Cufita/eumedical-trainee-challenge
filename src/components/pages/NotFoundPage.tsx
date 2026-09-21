import { useTranslation } from 'react-i18next'
import { Cross } from '../atoms/Cross'
import { Container } from '../atoms/Container'
import { LinkButton } from '../atoms/Button'
import { PublicHeader } from '../organisms/PublicHeader'
import { PublicFooter } from '../organisms/PublicFooter'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

function NotFoundContent({ ctaTo, ctaLabel }: { ctaTo: string; ctaLabel: string }) {
  return (
    <Container className="flex flex-col items-center gap-4 py-20 text-center">
      <Cross size={56} />
      <p className="font-label text-sm uppercase tracking-[0.14em] text-slate">Error 404</p>
      <h1 className="text-[clamp(1.8rem,3.3vw,2.5rem)] text-navy">Esta página no existe</h1>
      <p className="max-w-[42ch] text-slate">
        La dirección a la que intentaste acceder no está disponible o ha cambiado de lugar.
      </p>
      <LinkButton to={ctaTo} variant="dark" className="mt-2">
        {ctaLabel}
      </LinkButton>
    </Container>
  )
}

export function NotFoundPage() {
  const { t } = useTranslation()
  useDocumentTitle('Página no encontrada')

  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <PublicHeader />
      <main id="main" className="px-(--edge) pt-[132px]">
        <NotFoundContent ctaTo="/" ctaLabel="Volver al inicio" />
      </main>
      <PublicFooter />
    </>
  )
}

export function PatientNotFoundPage() {
  useDocumentTitle('Página no encontrada')
  return <NotFoundContent ctaTo="/paciente" ctaLabel="Volver al inicio" />
}
