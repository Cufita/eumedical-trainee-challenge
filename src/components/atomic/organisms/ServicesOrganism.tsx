import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  CalendarHeart,
  Clipboard,
  Globe,
  Headset,
  HeartHandshake,
  Hospital,
  PlaneTakeoff,
  ShieldCheck,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import { Container } from "../../shared/Container";
import { SectionEyebrow } from "../atoms/SectionEyebrow";
import { ServiceTile, type ServiceMotion } from "../molecules/ServiceTile";

const services: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  motion?: ServiceMotion;
  featured?: boolean;
  tinted?: boolean;
  className?: string;
}> = [
  {
    title: "Fit to Fly",
    description:
      "Certificación médica que confirma la aptitud del paciente para volar con seguridad.",
    icon: PlaneTakeoff,
    motion: "fly",
    featured: true,
    className: "sm:col-span-2 lg:[grid-column:1/3] lg:[grid-row:1/3]",
  },
  {
    title: "Videoconsulta 24/7",
    description:
      "Consulta médica por videollamada a cualquier hora, con receta local si hace falta.",
    icon: Video,
    motion: "rec",
  },
  {
    title: "Rondas médicas",
    description:
      "Evaluación periódica del estado de salud de un grupo de personas.",
    icon: Stethoscope,
    motion: "pulse-trace",
  },
  {
    title: "Ambulancias",
    description:
      "Coordinación de traslados urgentes o programados en el destino.",
    icon: Ambulance,
    motion: "speed",
  },
  {
    title: "Segunda opinión",
    description:
      "Revisión de un diagnóstico por un especialista para confirmar el criterio médico.",
    icon: Clipboard,
    motion: "check",
  },
  {
    title: "Escolta médica",
    description:
      "Acompañamiento sanitario durante el traslado o la estancia del paciente.",
    icon: HeartHandshake,
    motion: "thump",
  },
  {
    title: "Auditoría médica",
    description:
      "Control de calidad y seguimiento de la atención prestada por la red.",
    icon: ShieldCheck,
    motion: "scan",
  },
  {
    title: "Telemedicina global",
    description:
      "Acceso remoto a atención médica desde cualquier país de la red.",
    icon: Globe,
  },
  {
    title: "Apoyo sociosanitario",
    description:
      "Acompañamiento social y sanitario en situaciones de vulnerabilidad.",
    icon: Users,
    motion: "glow-ring",
  },
  {
    title: "Cobertura de eventos",
    description:
      "Equipo médico presente en eventos, competiciones o desplazamientos grupales.",
    icon: CalendarHeart,
  },
  {
    title: "Coordinación hospitalaria",
    description:
      "Gestión de ingresos, altas y comunicación directa con los centros.",
    icon: Hospital,
    motion: "radar",
  },
  {
    title: "Centro de operaciones 24/7",
    description:
      "Central operativa disponible todos los días del año para cada caso.",
    icon: Headset,
    motion: "equalizer",
    tinted: true,
    className: "sm:col-span-2 lg:col-span-2",
  },
];

export function ServicesOrganism() {
  return (
    <section id="eu-servicios" className="bg-[#e9efe9] px-(--edge) py-24">
      <Container>
        <SectionEyebrow>Servicios</SectionEyebrow>
        <h2 className="mt-3 max-w-[20em] text-[clamp(1.7rem,3.1vw,2.375rem)] leading-[1.14]">
          Un catálogo completo de asistencia médica
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceTile key={service.title} {...service} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
