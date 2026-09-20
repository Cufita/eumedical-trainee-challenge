import { Container } from '../shared/Container'
import { Cross } from '../shared/Cross'

const quotes = [
  {
    text: 'La integración fue rápida y el equipo médico responde con el mismo rigor en cada país.',
    by: 'Aseguradora de viaje — operaciones',
  },
  {
    text: 'El médico habló con mi madre en su idioma. Para alguien sola en otro país, eso cambia todo.',
    by: 'Familiar — visita a domicilio',
  },
]

export function Trust() {
  return (
    <section className="bg-white px-(--edge) py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#45677d]">Confianza</p>
            <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.375rem)] leading-[1.18]">
              Una experiencia medica consistente, en cualquier destino
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {quotes.map((quote) => (
              <figure key={quote.by} className="rounded-2xl border border-navy/10 bg-[#f7f7f4] p-7">
                <Cross />
                <blockquote className="mt-5 font-display text-xl leading-[1.35] text-navy">"{quote.text}"</blockquote>
                <figcaption className="mt-5 text-sm text-[#4e7288]">{quote.by}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
