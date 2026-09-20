import { HeroOrganism } from "../organisms/HeroOrganism";
import { PatientCareOrganism } from "../organisms/PatientCareOrganism";
import { PatientCareAltOrganism } from "../organisms/PatientCareAltOrganism";
import { HowItWorksOrganism } from "../organisms/HowItWorksOrganism";
import { AboutUsOrganism } from "../organisms/AboutUsOrganism";
import { ServicesOrganism } from "../organisms/ServicesOrganism";
import { TrustMetricsOrganism } from "../organisms/TrustMetricsOrganism";
import { TestimonialsOrganism } from "../organisms/TestimonialsOrganism";
import { ContactOrganism } from "../organisms/ContactOrganism";

export function PublicLandingTemplate() {
  return (
    <main id="main">
      <HeroOrganism />
      <PatientCareOrganism />
      <PatientCareAltOrganism />
      <HowItWorksOrganism />
      <AboutUsOrganism />
      <ServicesOrganism />
      <TrustMetricsOrganism />
      <TestimonialsOrganism />
      <ContactOrganism />
    </main>
  );
}
