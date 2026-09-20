import { Link } from 'react-router-dom'
import { Container } from '../shared/Container'
import { Cross } from '../shared/Cross'

const footerColumns = [
  {
    title: 'Servicios',
    links: [
      { label: 'Teleconsulta 24/7', href: '#servicios' },
      { label: 'Médicos a domicilio', href: '#servicios' },
      { label: 'Fit to fly', href: '#servicios' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Sobre nosotros', href: '#nosotros' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones', href: '#' },
      { label: 'Política de privacidad', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy-2 text-sage-pale py-14 pb-7.5">
      <Container>
        <div className="flex justify-between gap-8 flex-wrap pb-9 px-1.5 border-b border-white/[0.14]">
          <div className="font-display font-semibold text-white text-xl flex gap-2 items-center">
            <Cross variant="white" /> eumedical
          </div>
          <div className="flex gap-10 flex-wrap">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-white text-sm font-label mb-2.5">{col.title}</h3>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sage-pale no-underline text-[0.92rem] py-1 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                {col.title === 'Compañía' && (
                  <Link
                    to="/paciente"
                    className="block text-sage-pale no-underline text-[0.92rem] py-1 hover:text-white"
                  >
                    Área paciente
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between pt-5.5 text-sm flex-wrap gap-2.5">
          <span>© 2026 eumedical. Todos los derechos reservados.</span>
          <span>Rediseño — Frontend &amp; UX Trainee Challenge</span>
        </div>
      </Container>
    </footer>
  )
}
