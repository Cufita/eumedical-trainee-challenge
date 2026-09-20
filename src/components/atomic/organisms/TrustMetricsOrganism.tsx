import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Container } from "../../shared/Container";
import { Cross } from "../../shared/Cross";
import { NumberTicker } from "../atoms/NumberTicker";

const stats: Array<{
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}> = [
  { value: 90, suffix: "k", label: "Pacientes satisfechos" },
  { value: 250, label: "Médicos expertos" },
  { value: 70, suffix: "k", label: "Recetas aceptadas" },
  { value: 10, label: "Especialidades médicas" },
];

export function TrustMetricsOrganism() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="eu-cobertura"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy px-(--edge) py-20 text-white md:py-24"
    >
      <Cross
        variant="white"
        size={260}
        className="pointer-events-none absolute -left-20 -bottom-24 opacity-[0.05]"
      />
      <Container className="relative">
        <h2 className="mx-auto max-w-[19em] text-center text-[clamp(1.7rem,3.1vw,2.375rem)] leading-[1.16] text-white">
          Una calidad que se sostiene en cada consulta
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5">
                <Cross size={20} className="shrink-0" />
                <span className="font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-light leading-none text-white">
                  <NumberTicker
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </span>
              </div>
              <span className="mt-3 text-sm text-[#b9cbd8]">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-[26em] flex-col items-center border-t border-white/15 pt-10 text-center">
          <p className="font-display text-lg text-white">
            Nuestra calidad siempre prevalece
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-1 text-gold" role="img" aria-label="4.9 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={22}
                  fill="currentColor"
                  strokeWidth={0}
                  className="transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "scale(1)" : "scale(0.6)",
                    transitionDelay: `${index * 90}ms`,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-display text-xl font-light text-white">
              <NumberTicker value={4.9} decimals={1} suffix="/5" />
            </span>
          </div>
          <p className="mt-5 max-w-[42ch] text-xs italic text-[#8fb0c2]">
            *Según las encuestas de valoración de nuestros clientes después de
            usar nuestros servicios
          </p>
        </div>
      </Container>
    </section>
  );
}
