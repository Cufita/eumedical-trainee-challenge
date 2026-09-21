import { useTranslation } from "react-i18next";
import { Container } from "../atoms/Container";
import { Cross } from "../atoms/Cross";
import { SectionEyebrow } from "../atoms/SectionEyebrow";
import teamPhoto from "../../assets/about/team.jpg";

// Licensed stock photo (Pexels License) — used generically to illustrate
// the kind of international medical team Eumedical coordinates, per PRODUCT.md.
export function AboutUsOrganism() {
  const { t } = useTranslation();

  return (
    <section
      id="eu-nosotros"
      className="relative overflow-hidden bg-[linear-gradient(135deg,var(--color-navy-2),var(--color-navy)_48%,var(--color-sage-deep)_130%)] px-(--edge) py-24 text-white md:py-28"
    >
      <Cross
        variant="white"
        size={210}
        className="pointer-events-none absolute -right-[64px] -top-16 opacity-[0.07]"
      />
      <Container className="relative grid items-center gap-14 md:grid-cols-[1.05fr_.95fr] md:gap-12">
        <div>
          <SectionEyebrow light>{t("aboutUs.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 max-w-[15em] text-[clamp(1.7rem,3.1vw,2.375rem)] leading-[1.18] text-white">
            {t("aboutUs.title")}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[15.5px] leading-[1.62] text-white/80">
            {t("aboutUs.paragraph1")}
          </p>
          <p className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.62] text-white/80">
            {t("aboutUs.paragraph2")}
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/15">
          <img
            src={teamPhoto}
            alt={t("aboutUs.imageAlt")}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
