import { Container } from '../shared/Container'
import { Cross } from '../shared/Cross'

const reach = [
  ['80+ países', 'Red médica propia activa'],
  ['10+ idiomas', 'Atención en el idioma del paciente'],
  ['España, Portugal, Italia y Francia', 'Cobertura de médicos a domicilio'],
  ['Madrid', 'Central operativa médica 24/7'],
]

export function Corporate() {
  return (
    <section id="nosotros" className="bg-[#f7f7f4] px-(--edge) py-24">
      <Container className="grid gap-14 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#45677d]">Nosotros</p>
          <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.375rem)] leading-[1.18]">
            Asistencia sanitaria digital con capacidad internacional
          </h2>
          <p className="mt-5 max-w-[52ch] text-[#4e7288]">
            Ponemos a disposición de nuestros partners conocimiento local, profesionales verificados y coordinación
            médica para que cada paciente reciba una experiencia clara, cercana y resolutiva.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#45677d]">Cobertura</p>
          <ul className="mt-7">
            {reach.map(([title, description], index) => (
              <li
                key={title}
                className={`flex items-start gap-4 border-t border-navy/10 px-1 py-4 ${index === reach.length - 1 ? 'border-b' : ''}`}
              >
                <Cross />
                <div>
                  <b className="block font-display font-medium text-navy">{title}</b>
                  <span className="text-sm text-[#4e7288]">{description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
