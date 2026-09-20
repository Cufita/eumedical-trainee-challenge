import { PublicHeader } from '../atomic/organisms/PublicHeader'
import { PublicFooter } from '../atomic/organisms/PublicFooter'
import { PublicLandingTemplate } from '../atomic/templates/PublicLandingTemplate'

export function SitePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <PublicHeader />
      <PublicLandingTemplate />
      <PublicFooter />
    </>
  )
}
