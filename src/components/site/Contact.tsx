import { useRef, useState, type FormEvent } from 'react'
import { Container } from '../shared/Container'
import { Cross } from '../shared/Cross'
import { ActionButton } from '../shared/Button'

const inputClasses =
  'w-full px-3.5 py-3.5 rounded-xl border-[1.5px] border-sage-pale bg-white font-body text-base text-ink focus:border-sage-deep focus:outline-none'

const contactInfo = [
  ['Email', 'business@eumedical.es'],
  ['Teléfono', '+34 919 22 78 10'],
  ['Dirección', 'Calle Velázquez 157, 28002, Madrid'],
]

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Gracias, hemos recibido tu mensaje (simulación — sin backend real).')
    formRef.current?.reset()
  }

  return (
    <section id="contacto" className="bg-[#f7f7f4] px-(--edge) py-24">
      <Container className="grid gap-14 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#45677d]">Habla con nosotros</p>
          <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.375rem)] leading-[1.18]">Resolvemos todas tus dudas</h2>
          <ul className="mt-7">
            {contactInfo.map(([label, value], index) => (
              <li
                key={label}
                className={`flex items-start gap-4 border-t border-navy/10 px-1 py-4 ${index === contactInfo.length - 1 ? 'border-b' : ''}`}
              >
                <Cross />
                <div>
                  <b className="block font-display font-medium text-navy">{label}</b>
                  <span className="text-sm text-[#4e7288]">{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fname" className="mb-1.5 block font-label text-sm text-navy">
                Nombre
              </label>
              <input id="fname" name="fname" required className={inputClasses} />
            </div>
            <div>
              <label htmlFor="lname" className="mb-1.5 block font-label text-sm text-navy">
                Apellidos
              </label>
              <input id="lname" name="lname" required className={inputClasses} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block font-label text-sm text-navy">
              Email
            </label>
            <input id="email" name="email" type="email" required className={inputClasses} />
          </div>
          <div>
            <label htmlFor="msg" className="mb-1.5 block font-label text-sm text-navy">
              Mensaje
            </label>
            <textarea id="msg" name="msg" rows={4} required className={inputClasses} />
          </div>
          <ActionButton type="submit" variant="gold" className="justify-self-start">
            Enviar mensaje
          </ActionButton>
          <p role="status" className="min-h-[1.2em] font-label text-sage-deep">
            {status}
          </p>
          <p className="max-w-[65ch] text-sm text-[#4e7288]">
            Al enviar este formulario aceptas nuestra{' '}
            <a href="#" className="underline">
              política de privacidad
            </a>
            . Este formulario es una simulación (mock) para la prueba técnica; no envía datos a ningún servidor.
          </p>
        </form>
      </Container>
    </section>
  )
}
