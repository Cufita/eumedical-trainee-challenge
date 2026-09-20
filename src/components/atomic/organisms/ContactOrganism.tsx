import { useRef, useState, type FormEvent } from "react";
import { ActionButton } from "../../shared/Button";
import { Container } from "../../shared/Container";
import { Cross } from "../../shared/Cross";
import { SectionEyebrow } from "../atoms/SectionEyebrow";

const inputClasses =
  "w-full rounded-xl border-[1.5px] border-white/20 bg-white/[0.06] px-3.5 py-3 font-body text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none";

const contactInfo = [
  ["Email", "business@eumedical.es", "mailto:business@eumedical.es"],
  ["Teléfono", "+34 919 22 78 10", "tel:+34919227810"],
];

export function ContactOrganism() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      "Gracias, hemos recibido tu solicitud. Te contactaremos en menos de 24h.",
    );
    formRef.current?.reset();
  };

  return (
    <section id="eu-contacto" className="px-(--edge) pb-20 pt-0 md:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-lg bg-navy-2 text-white">
          <Cross
            variant="white"
            size={110}
            className="absolute -right-5 -top-5 opacity-10"
          />
          <Cross
            variant="white"
            size={80}
            className="absolute -bottom-6 -left-4 opacity-10"
          />
          <div className="relative grid gap-12 px-8 py-16 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-14 md:py-20">
            <div>
              <SectionEyebrow light>Solicita una demo</SectionEyebrow>
              <h2 className="mt-3 max-w-[14em] text-[clamp(1.8rem,3.3vw,2.5rem)] leading-[1.18] text-white">
                Dale a tus clientes una experiencia médica sobresaliente
              </h2>
              <p className="mt-5 max-w-[42ch] text-[#c4d5df]">
                Cuéntanos tu operativa y diseñamos un modelo de asistencia a
                medida en menos de una semana.
              </p>
              <ul className="mt-9 grid gap-4">
                {contactInfo.map(([label, value, href]) => (
                  <li key={label} className="flex items-baseline gap-3">
                    <span className="font-label text-xs uppercase tracking-[0.14em] text-white/45">
                      {label}
                    </span>
                    <a
                      href={href}
                      className="font-display text-white underline decoration-white/25 underline-offset-4 hover:decoration-gold"
                    >
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-6 text-left md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-label text-sm text-white/70"
                  >
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-label text-sm text-white/70"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-label text-sm text-white/70"
                >
                  Cuéntanos tu operativa
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  required
                  className={inputClasses}
                />
              </div>
              <ActionButton
                type="submit"
                variant="gold"
                className="mt-1 justify-self-start"
              >
                Enviar
              </ActionButton>
              <p
                role="status"
                className="min-h-[1.2em] font-label text-sage-pale"
              >
                {status}
              </p>
              <p className="text-xs text-white/40">
                Este formulario es una simulación (mock) para la prueba
                técnica; no envía datos a ningún servidor.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
