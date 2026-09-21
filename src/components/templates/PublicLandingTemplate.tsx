import { HeroOrganism } from "../organisms/HeroOrganism";
import { ServicesOrganism } from "../organisms/ServicesOrganism";
import { HowItWorksOrganism } from "../organisms/HowItWorksOrganism";
import { AboutUsOrganism } from "../organisms/AboutUsOrganism";
import { CatalogOrganism } from "../organisms/CatalogOrganism";
import { TrustMetricsOrganism } from "../organisms/TrustMetricsOrganism";
import { TestimonialsOrganism } from "../organisms/TestimonialsOrganism";
import { ContactOrganism } from "../organisms/ContactOrganism";

export function PublicLandingTemplate() {
  return (
    <main id="main">
      <HeroOrganism />
      <ServicesOrganism />
      <HowItWorksOrganism />
      <AboutUsOrganism />
      <CatalogOrganism />
      <TrustMetricsOrganism />
      <TestimonialsOrganism />
      <ContactOrganism />
    </main>
  );
}
