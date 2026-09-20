import { Container } from '../shared/Container'
import { Cross } from '../shared/Cross'

const steps = [
  ['1', 'Recepción', 'Recibimos el caso desde tu equipo, central o aseguradora.'],
  ['2', 'Triaje médico', 'Validamos prioridad, idioma, ubicación y necesidad clínica.'],
  ['3', 'Resolución', 'Activamos teleconsulta, receta local, visita domiciliaria o especialista.'],
]

const services = [
  'Telemedicina 24/7',
  'Médicos a domicilio',
  'Red médica internacional',
  'Receta local',
  'Fit to fly',
  'Ambulancias',
  'Especialistas',
  'Central operativa',
]

export function Services() {
  return (
    <section id="servicios" className="bg-[#f7f7f4] px-(--edge) py-24">
      <Container className="grid items-start gap-14 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#45677d]">Cómo funciona</p>
          <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.375rem)] leading-[1.18]">
            De la primera llamada a la resolución
          </h2>
          <p className="mt-5 max-w-[34em] text-[#4e7288]">
            Eumedical coordina cada caso con criterio médico, red local y comunicación clara para partners y pacientes.
          </p>
          <ol className="mt-8 grid gap-4">
            {steps.map(([number, title, description]) => (
              <li key={title} className="grid grid-cols-[42px_1fr] gap-4">
                <span className="flex size-[42px] items-center justify-center rounded-full bg-amber font-display font-semibold text-navy">
                  {number}
                </span>
                <div className="border-b border-navy/10 pb-4">
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1 text-sm text-[#4e7288]">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-[2px] overflow-hidden rounded-2xl bg-mist md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service}
              className={`min-h-[140px] p-6 ${index === 0 ? 'bg-navy text-white' : index % 3 === 0 ? 'bg-cloud' : 'bg-white'}`}
            >
              <Cross variant={index === 0 ? 'white' : 'gold'} />
              <h3 className={`mt-7 text-base ${index === 0 ? 'text-white' : ''}`}>{service}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
