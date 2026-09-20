import { useEffect, useState } from "react";
import { AnchorButton, LinkButton } from "../../shared/Button";
import { BrandMark } from "../atoms/BrandMark";
import { PrimaryNav } from "../molecules/PrimaryNav";

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the mobile sheet mounted for the exit transition, then drop it so
  // its links leave the tab order once fully closed.
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const timeout = window.setTimeout(() => setMounted(false), 220);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center px-(--edge)">
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-10 bg-navy-2/35 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`liquid-glass relative z-10 flex w-full max-w-[1200px] items-center gap-6 rounded-lg border transition-[margin-top,padding-top,padding-bottom,background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none ${
          scrolled
            ? "mt-1.5 border-white/80 bg-[#f7f7f4]/75 px-6 py-2.5 shadow-[0_16px_38px_-14px_rgba(23,54,74,.4)]"
            : "mt-3 border-white/60 bg-[#f7f7f4]/40 px-6 py-3.5 shadow-[0_10px_30px_-14px_rgba(23,54,74,.22)] md:mt-4"
        } backdrop-blur-2xl backdrop-saturate-150`}
      >
        <a href="#eu-top" aria-label="Eumedical" className="relative z-[1]">
          <BrandMark />
        </a>
        <PrimaryNav open={open} mounted={mounted} onNavigate={() => setOpen(false)} />
        <div className="relative z-[1] ml-auto hidden items-center gap-3 md:flex">
          <LinkButton to="/paciente" variant="outline">
            Área paciente
          </LinkButton>
          <AnchorButton href="#eu-contacto" variant="gold">
            Solicitar una demo
          </AnchorButton>
        </div>
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="eu-mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="relative z-[1] flex size-10 shrink-0 items-center justify-center rounded-xl border-0 bg-navy/10 text-navy transition-colors duration-200 hover:bg-navy/15 md:hidden"
        >
          <span className="relative flex h-4 w-5 items-center justify-center">
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-opacity duration-150 ease-out motion-reduce:transition-none ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
