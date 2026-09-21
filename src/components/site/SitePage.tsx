import { useTranslation } from 'react-i18next'
import { PublicHeader } from '../atomic/organisms/PublicHeader'
import { PublicFooter } from '../atomic/organisms/PublicFooter'
import { PublicLandingTemplate } from '../atomic/templates/PublicLandingTemplate'

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
