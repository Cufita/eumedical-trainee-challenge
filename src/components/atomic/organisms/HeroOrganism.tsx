import { AnchorButton } from "../../shared/Button";
import { Container } from "../../shared/Container";
import { Cross } from "../../shared/Cross";
import { Highlighter } from "../../shared/Highlighter";
import { Globe } from "../../site/Globe";

export function HeroOrganism() {
  return (
    <section
      id="eu-top"
      className="relative overflow-hidden bg-[#f7f7f4] px-(--edge) pb-0 pt-[132px]"
    >
      <Cross
        size={230}
        className="absolute -left-[74px] top-9 opacity-50 [&::before]:bg-[#e6e6e0] [&::after]:bg-[#e6e6e0]"
      />
      <Container className="relative grid min-h-[680px] grid-cols-1 items-center gap-10 pb-12 md:grid-cols-[.85fr_1.15fr] md:gap-12">
        <div className="relative z-[2] pb-12">
          <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[#45677d]">
            Asistencia sanitaria internacional
          </p>
          <h1 className="max-w-[13.5em] text-[clamp(2.375rem,4.6vw,3.625rem)] leading-[1.1] tracking-normal text-navy">
            Atención médica que{" "}
            <Highlighter action="underline" strokeWidth={3} padding={3}>
              atraviesa fronteras
            </Highlighter>
          </h1>
          <p className="mt-6 max-w-[31em] text-[15.5px] leading-[1.62] text-[#3c6480]">
            Red médica propia, telemedicina y coordinación de asistencia para
            aseguradoras y empresas. Cuidamos de tus pacientes estén donde
            estén, en su idioma.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AnchorButton href="#eu-contacto" variant="gold">
              Solicitar una demo
            </AnchorButton>
            <AnchorButton href="#eu-cobertura" variant="outline">
              Ver cobertura
            </AnchorButton>
          </div>
        </div>
        <div className="relative min-h-[540px] py-8 md:min-h-[620px]">
          <Globe />
        </div>
      </Container>
    </section>
  );
}
