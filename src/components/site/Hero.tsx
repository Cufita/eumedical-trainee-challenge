import { AnchorButton } from '../shared/Button'
import { Container } from '../shared/Container'
import { Cross } from '../shared/Cross'
import { Globe } from './Globe'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#f7f7f4] px-(--edge) pb-0 pt-[132px]">
      <Cross
        size={230}
        className="absolute -left-[74px] top-9 opacity-50 [&::before]:bg-[#e6e6e0] [&::after]:bg-[#e6e6e0]"
      />
      <Container className="relative grid min-h-[430px] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1fr]">
        <div className="relative z-[2]">
          <h1 className="max-w-[12em] text-[clamp(2.375rem,4.6vw,3.625rem)] leading-[1.06] tracking-normal text-navy">
            Atención médica
            <br />
            sin fronteras
          </h1>
          <p className="mt-5 max-w-[27em] text-[15.5px] leading-[1.62] text-[#3c6480]">
            Red médica propia, telemedicina y coordinación de asistencia para aseguradoras y empresas. Cuidamos de tus
            pacientes estén donde estén, en su idioma.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <AnchorButton href="#contacto" variant="gold">
              Solicitar demo
            </AnchorButton>
            <AnchorButton href="#nosotros" variant="outline">
              Ver cobertura
            </AnchorButton>
          </div>
        </div>
        <div className="relative min-h-[340px] pb-14 max-md:order-first">
          <Globe />
        </div>
      </Container>
    </section>
  )
}
