import { AnchorButton } from "../../shared/Button";
import { Container } from "../../shared/Container";
import { SectionEyebrow } from "../atoms/SectionEyebrow";
import { PatientCareAltSlide } from "../molecules/PatientCareAltSlide";
import { patientCareSlides } from "../molecules/patientCareSlides";

/**
 * Alternate take on "Cómo cuidamos a tus pacientes" — video and text sit
 * side by side, swapping sides slide to slide, in plain static flow with
 * normal scrolling (no pin, no scroll-scrubbed crossfade). Kept as a
 * separate section purely to compare against the stacked-cards treatment
 * above; not wired into navigation.
 */
export function PatientCareAltOrganism() {
  return (
    <section id="eu-cuidado-pacientes-alt" className="bg-[#f7f7f4] px-(--edge) py-20 md:py-24">
      <Container>
        <div className="mx-auto max-w-[40em] text-center">
          <SectionEyebrow>Cómo cuidamos a tus pacientes (opción B)</SectionEyebrow>
          <h2 className="mx-auto mt-3 max-w-[18em] text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.14] text-navy">
            Todo lo que tus pacientes necesitan, coordinado por nosotros
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {patientCareSlides.map((slide, index) => (
            <PatientCareAltSlide key={slide.title} slide={slide} index={index} reverse={index % 2 === 1} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <AnchorButton href="#eu-servicios" variant="gold">
            Ver más
          </AnchorButton>
        </div>
      </Container>
    </section>
  );
}
