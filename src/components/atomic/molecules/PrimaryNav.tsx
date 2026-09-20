import { LinkButton, AnchorButton } from "../../shared/Button";

const links = [
  ["#eu-servicios", "Servicios"],
  ["#eu-como", "Cómo funciona"],
  ["#eu-cobertura", "Cobertura"],
  ["#eu-nosotros", "Nosotros"],
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
  const showSheet = open || mounted;

  return (
    <nav
      id="eu-mobile-nav"
      aria-label="Principal"
      className={`absolute left-4 right-4 top-[calc(100%+12px)] z-[1] flex-col gap-0.5 rounded-2xl border border-navy/10 bg-white p-3 shadow-[0_24px_60px_-16px_rgba(30,72,101,.28)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none md:static md:flex md:flex-1 md:translate-y-0 md:flex-row md:items-center md:justify-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:shadow-none ${
        showSheet ? "flex" : "hidden"
      } ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
    >
      {links.map(([href, label], index) => (
        <a
          key={href}
          href={href}
          onClick={onNavigate}
          style={{ transitionDelay: open ? `${60 + index * 35}ms` : "0ms" }}
          className={`rounded-xl px-3 py-3 text-[15px] text-[#2c5873] transition-[color,background-color,opacity,transform] duration-200 ease-out hover:bg-navy/[0.04] hover:text-gold motion-reduce:transition-none motion-reduce:max-md:translate-x-0 motion-reduce:max-md:opacity-100 md:px-3 md:py-2 md:text-[14.5px] ${
            open ? "max-md:translate-x-0 max-md:opacity-100" : "max-md:translate-x-2 max-md:opacity-0"
          }`}
        >
          {label}
        </a>
      ))}
      <div className="mt-2 flex flex-col gap-2.5 border-t border-navy/10 pt-3 md:hidden">
        <LinkButton to="/paciente" variant="outline">
          Área paciente
        </LinkButton>
        <AnchorButton href="#eu-contacto" variant="gold">
          Solicitar una demo
        </AnchorButton>
      </div>
    </nav>
  );
}
