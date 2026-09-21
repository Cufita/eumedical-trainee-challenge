import { useTranslation } from "react-i18next";
import { Container } from "../atoms/Container";
import { BrandMark } from "../atoms/BrandMark";

export function PublicFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-2 px-(--edge) py-16 text-white/70">
      <Container>
        <div className="flex flex-wrap justify-between gap-10 border-b border-white/15 pb-10">
          <div>
            <BrandMark light />
            <p className="mt-4 max-w-[24ch] text-sm">{t("footer.tagline")}</p>
          </div>
          <div className="flex gap-10">
            <div>
              <h3 className="font-display text-sm text-white">{t("footer.servicesHeading")}</h3>
              <a className="mt-3 block text-sm text-white/70 hover:text-white" href="#eu-catalogo">
                {t("footer.catalog")}
              </a>
              <a className="block text-sm text-white/70 hover:text-white" href="#eu-como">
                {t("footer.howItWorks")}
              </a>
            </div>
            <div>
              <h3 className="font-display text-sm text-white">{t("footer.companyHeading")}</h3>
              <a className="mt-3 block text-sm text-white/70 hover:text-white" href="#eu-nosotros">
                {t("footer.aboutUs")}
              </a>
              <a className="block text-sm text-white/70 hover:text-white" href="#eu-contacto">
                {t("footer.contact")}
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-5 text-sm">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.legal")}</span>
        </div>
      </Container>
    </footer>
  );
}
