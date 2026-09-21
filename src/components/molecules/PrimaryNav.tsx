import { useTranslation } from "react-i18next";
import { AnchorButton } from "../atoms/Button";
import { LanguageSwitcher } from "../atoms/LanguageSwitcher";

// Ordered to match the sections' order down the page, so the nav reads as
// a table of contents for the whole site, not an arbitrary shortlist.
const links = [
  { href: "#eu-servicios", key: "servicios" },
  { href: "#eu-como", key: "comoFunciona" },
  { href: "#eu-nosotros", key: "nosotros" },
  { href: "#eu-catalogo", key: "catalogo" },
  { href: "#eu-cobertura", key: "cobertura" },
  { href: "#eu-testimonios", key: "testimonios" },
] as const;

export function PrimaryNav({
  open,
  mounted,
  onNavigate,
}: {
  open: boolean;
  mounted: boolean;
  onNavigate: () => void;
}) {
  const { t } = useTranslation();
  const showSheet = open || mounted;

  return (
    <nav
      id="eu-mobile-nav"
      aria-label={t("nav.ariaLabel")}
      className={`absolute left-4 right-4 top-[calc(100%+12px)] z-[1] flex-col gap-0.5 rounded-2xl border border-white bg-cloud p-3 shadow-[0_16px_38px_-14px_rgba(23,54,74,.4)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none max-h-[calc(100vh-96px)] overflow-y-auto lg:static lg:flex lg:max-h-none lg:flex-1 lg:translate-y-0 lg:flex-row lg:items-center lg:justify-center lg:gap-1 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${
        showSheet ? "flex" : "hidden"
      } ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
    >
      {links.map(({ href, key }, index) => (
        <a
          key={href}
          href={href}
          onClick={onNavigate}
          style={{ transitionDelay: open ? `${60 + index * 35}ms` : "0ms" }}
          className={`rounded-xl px-3 py-3 text-[15px] whitespace-nowrap text-navy/90 transition-[color,background-color,opacity,transform] duration-200 ease-out hover:bg-navy/[0.04] hover:text-gold motion-reduce:transition-none motion-reduce:max-lg:translate-x-0 motion-reduce:max-lg:opacity-100 lg:px-2.5 lg:py-2 lg:text-[13.5px] ${
            open ? "max-lg:translate-x-0 max-lg:opacity-100" : "max-lg:translate-x-2 max-lg:opacity-0"
          }`}
        >
          {t(`nav.${key}`)}
        </a>
      ))}
      <div className="mt-2 flex flex-col gap-2.5 border-t border-navy/10 pt-3 lg:hidden">
        <LanguageSwitcher className="self-start" />
        <AnchorButton href="#eu-contacto" variant="gold">
          {t("common.requestDemo")}
        </AnchorButton>
      </div>
    </nav>
  );
}
