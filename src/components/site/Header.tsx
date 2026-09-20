import { useState } from 'react'
import { AnchorButton, LinkButton } from '../shared/Button'
import { Cross } from '../shared/Cross'

const navLinks = [
  { href: '#capacidades', label: 'Capacidades' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] bg-[#f7f7f4]/90 py-3 shadow-[0_1px_0_rgba(30,72,101,.1)] backdrop-blur-[14px] backdrop-saturate-[1.8] md:py-4">
      <div className="mx-auto flex max-w-[1200px] items-center gap-8 px-(--edge)">
        <a className="flex flex-none items-center gap-2 font-display text-xl font-semibold text-navy" href="#top">
          <Cross size={17} />
          eumedical
        </a>

        <nav
          aria-label="Navegación principal"
          className={`${menuOpen ? 'flex' : 'hidden'} md:flex md:flex-1 md:justify-center md:gap-8 max-md:absolute max-md:left-(--edge) max-md:right-(--edge) max-md:top-[72px] max-md:flex-col max-md:rounded-2xl max-md:border max-md:border-navy/10 max-md:bg-white max-md:p-2 max-md:shadow-[0_18px_50px_rgba(30,72,101,.14)]`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-[14.5px] text-[#2c5873] transition-colors hover:text-gold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LinkButton to="/paciente" variant="outline" className="max-md:hidden">
            Área paciente
          </LinkButton>
          <AnchorButton href="#contacto" variant="gold" className="max-sm:hidden">
            Solicitar demo
          </AnchorButton>
          <button
            className="flex size-10 items-center justify-center rounded-xl border-0 bg-navy/10 text-navy md:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative h-0.5 w-5 bg-current before:absolute before:left-0 before:top-[-7px] before:h-0.5 before:w-5 before:bg-current after:absolute after:left-0 after:top-[7px] after:h-0.5 after:w-5 after:bg-current" />
          </button>
        </div>
      </div>
    </header>
  )
}
