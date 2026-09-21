import { useTranslation } from 'react-i18next'
import { PublicHeader } from '../organisms/PublicHeader'
import { PublicFooter } from '../organisms/PublicFooter'
import { PublicLandingTemplate } from '../templates/PublicLandingTemplate'

export function SitePage() {
  const { t } = useTranslation()

  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <PublicHeader />
      <PublicLandingTemplate />
      <PublicFooter />
    </>
  )
}
