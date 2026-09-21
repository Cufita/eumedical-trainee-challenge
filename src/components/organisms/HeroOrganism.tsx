import { useTranslation } from "react-i18next";
import { AnchorButton } from "../atoms/Button";
import { Container } from "../atoms/Container";
import { Cross } from "../atoms/Cross";
import { Highlighter } from "../atoms/Highlighter";
import { Globe } from "../atoms/Globe";

export function HeroOrganism() {
  const { t } = useTranslation();

  return (
    <section
      id="eu-top"
      className="relative overflow-hidden bg-cloud px-(--edge) pb-0 pt-[132px]"
    >
      <Cross
        size={230}
        className="absolute -left-[74px] top-9 opacity-50 [&::before]:bg-fog [&::after]:bg-fog"
      />
      <Container className="relative grid min-h-[680px] grid-cols-1 items-center gap-10 pb-12 md:grid-cols-[.85fr_1.15fr] md:gap-12">
        <div className="relative z-[2] pb-12">
          <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-navy/80">
            {t("hero.eyebrow")}
          </p>
          <h1 className="max-w-[13.5em] text-[clamp(2.375rem,4.6vw,3.625rem)] leading-[1.1] tracking-normal text-navy">
            {t("hero.titlePrefix")}{" "}
            <Highlighter action="underline" strokeWidth={3} padding={3}>
              {t("hero.titleHighlight")}
            </Highlighter>
          </h1>
          <p className="mt-6 max-w-[31em] text-[15.5px] leading-[1.62] text-navy/85">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AnchorButton href="#eu-contacto" variant="gold">
              {t("common.requestDemo")}
            </AnchorButton>
            <AnchorButton href="#eu-cobertura" variant="outline">
              {t("hero.viewCoverage")}
            </AnchorButton>
          </div>
        </div>
        <div className="relative min-h-[540px] py-8 md:min-h-[620px]">
          <Globe />
        </div>
      </Container>
    </section>
  );
}
