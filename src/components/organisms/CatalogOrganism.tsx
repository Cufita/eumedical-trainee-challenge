import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import { Container } from "../atoms/Container";
import { SectionEyebrow } from "../atoms/SectionEyebrow";
import { ServiceTile, type ServiceMotion } from "../molecules/ServiceTile";

const serviceDefs: Array<{
  id: string;
  icon: LucideIcon;
  motion?: ServiceMotion;
  featured?: boolean;
  tinted?: boolean;
  className?: string;
}> = [
  {
    id: "fitToFly",
    icon: PlaneTakeoff,
    motion: "fly",
    featured: true,
    className: "sm:col-span-2 lg:[grid-column:1/3] lg:[grid-row:1/3]",
  },
  { id: "videoConsultation", icon: Video, motion: "rec" },
  { id: "medicalRounds", icon: Stethoscope, motion: "pulse-trace" },
  { id: "ambulances", icon: Ambulance, motion: "speed" },
  { id: "secondOpinion", icon: Clipboard, motion: "check" },
  { id: "medicalEscort", icon: HeartHandshake, motion: "thump" },
  { id: "medicalAudit", icon: ShieldCheck, motion: "scan" },
  { id: "globalTelemedicine", icon: Globe },
  { id: "socialSupport", icon: Users, motion: "glow-ring" },
  { id: "eventCoverage", icon: CalendarHeart },
  { id: "hospitalCoordination", icon: Hospital, motion: "radar" },
  {
    id: "operationsCenter",
    icon: Headset,
    motion: "equalizer",
    tinted: true,
    className: "sm:col-span-2 lg:col-span-2",
  },
];

export function CatalogOrganism() {
  const { t } = useTranslation();

  return (
    <section id="eu-catalogo" className="bg-sage/20 px-(--edge) py-24">
      <Container>
        <SectionEyebrow>{t("catalog.eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 max-w-[20em] text-[clamp(1.7rem,3.1vw,2.375rem)] leading-[1.14]">
          {t("catalog.title")}
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceDefs.map(({ id, ...rest }) => (
            <ServiceTile
              key={id}
              {...rest}
              title={t(`catalog.items.${id}.title`)}
              description={t(`catalog.items.${id}.description`)}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
