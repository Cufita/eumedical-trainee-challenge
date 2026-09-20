import { Container } from "../../shared/Container";
import { Cross } from "../../shared/Cross";
import { SectionEyebrow } from "../atoms/SectionEyebrow";

const approach = [
  [
    "Know How local",
    "Acceso al conocimiento sanitario local en más de 80 países.",
  ],
  [
    "Enfoque holístico",
    "En todos los casos que gestionamos para nuestros partners.",
  ],
  [
    "Servicio sobresaliente",
    "Una experiencia de cliente única, de principio a fin.",
  ],
] as const;

const teamNodes = [
  [372, 36, 11],
  [452, 92, 8],
  [404, 152, 13],
  [268, 168, 9],
  [96, 156, 12],
  [30, 96, 8],
  [80, 32, 10],
  [206, 26, 8],
] as const;

const teamLinks: [number, number][] = [0, 1, 2, 3, 4, 5, 6, 7].map(
  (i) => [i, (i + 1) % 8] as [number, number],
);

/**
 * Abstract network-of-nodes illustration — the same line-and-circle
 * vocabulary as CapabilityGlyph's "network" variant, scaled up. Stands in
 * for a team photo without claiming to depict real people, per the brand's
 * documented no-stock-photography direction.
 */
function TeamNetwork() {
  const hub: [number, number] = [206, 96];
  return (
    <svg
      viewBox="0 0 480 190"
      aria-hidden="true"
      className="h-full w-full max-w-[460px]"
    >
      {teamLinks.map(([a, b]) => {
        const [x1, y1] = teamNodes[a];
        const [x2, y2] = teamNodes[b];
        return (
          <line
            key={`ring-${a}-${b}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1.2"
          />
        );
      })}
      {teamNodes.map(([x, y], index) => (
        <line
          key={`spoke-${index}`}
          x1={hub[0]}
          y1={hub[1]}
          x2={x}
          y2={y}
          stroke="white"
          strokeOpacity="0.22"
          strokeWidth="1.3"
        />
      ))}
      <circle
        cx={hub[0]}
        cy={hub[1]}
        r="27"
        fill="white"
        fillOpacity="0.1"
        stroke="white"
        strokeOpacity="0.35"
      />
      <path
        d={`M${hub[0] - 9} ${hub[1]}h18M${hub[0]} ${hub[1] - 9}v18`}
        stroke="var(--color-gold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {teamNodes.map(([x, y, r], index) => (
        <circle
          key={`node-${index}`}
          cx={x}
          cy={y}
          r={r}
          fill={index % 3 === 0 ? "var(--color-sage-pale)" : "white"}
          fillOpacity={index % 3 === 0 ? 0.85 : 0.65}
          stroke="white"
          strokeOpacity="0.4"
        />
      ))}
    </svg>
  );
}

export function AboutUsOrganism() {
  return (
    <section
      id="eu-nosotros"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#153549,#1e4865_48%,#2f6653_130%)] px-(--edge) py-24 text-white md:py-28"
    >
      <Cross
        variant="white"
        size={210}
        className="pointer-events-none absolute -right-[64px] -top-16 opacity-[0.07]"
      />
      <Container className="relative grid gap-14 md:grid-cols-[1.05fr_.95fr] md:gap-12">
        <div>
          <SectionEyebrow light>Sobre nosotros</SectionEyebrow>
          <h2 className="mt-3 max-w-[15em] text-[clamp(1.7rem,3.1vw,2.375rem)] leading-[1.18] text-white">
            Asistencia sanitaria digital con capacidad internacional
          </h2>
          <p className="mt-5 max-w-[54ch] text-[15.5px] leading-[1.62] text-[#c4d5df]">
            Somos una compañía de asistencia sanitaria digital con capacidad
            internacional para responder a las necesidades de pacientes y
            empresas alrededor del mundo.
          </p>
          <p className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.62] text-[#c4d5df]">
            Ponemos a disposición de nuestros partners el acceso al Know How
            local en más de 80 países con un enfoque holístico en todos los
            casos que gestionamos, traduciéndose en una experiencia de
            cliente única a través de un servicio sobresaliente.
          </p>
        </div>
        <div>
          <SectionEyebrow light>Nuestro enfoque</SectionEyebrow>
          <ul className="mt-7">
            {approach.map(([title, description], index) => (
              <li
                key={title}
                className={`flex items-start gap-4 border-t border-white/15 px-1 py-4 ${index === approach.length - 1 ? "border-b" : ""}`}
              >
                <Cross variant="white" />
                <div>
                  <b className="block font-display font-medium text-white">
                    {title}
                  </b>
                  <span className="text-sm text-[#b9cbd8]">
                    {description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="relative mt-14 rounded-[28px] border border-white/15 bg-white/[0.04] p-8 md:mt-16 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
          <TeamNetwork />
          <div className="md:text-right">
            <p className="font-display text-lg leading-snug text-white">
              Una red de especialistas conectada en más de 80 países
            </p>
            <p className="mt-2 max-w-[38ch] text-sm text-[#b9cbd8] md:ml-auto">
              Profesionales verificados que coordinamos como un único equipo,
              estén donde estén.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
