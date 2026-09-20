import { NavLink, useNavigate } from 'react-router-dom'
import { Cross } from '../shared/Cross'
import { ActionButton } from '../shared/Button'

const navItems = [
  { to: '/paciente', label: 'Inicio', end: true },
  { to: '/paciente/consultas', label: 'Consultas' },
  { to: '/paciente/historial', label: 'Historial' },
  { to: '/paciente/documentos', label: 'Documentos' },
  { to: '/paciente/recetas', label: 'Recetas' },
  { to: '/paciente/perfil', label: 'Perfil y soporte' },
]

export function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="bg-navy-2 text-white p-5 px-5 flex flex-col max-md:flex-row max-md:overflow-x-auto max-md:items-center">
      <div className="flex gap-2 items-center font-display font-semibold text-xl px-1.5 pb-6.5">
        <Cross variant="white" /> eumedical
      </div>
      <nav aria-label="Navegación del área paciente" className="flex flex-col gap-1 flex-1 max-md:flex-row">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 text-left bg-none border-none py-3.5 px-3.5 rounded-xl font-label text-[0.98rem] no-underline ${
                isActive ? 'bg-sage-deep text-white' : 'text-sage-pale hover:bg-white/[0.06] hover:text-white'
              }`
            }
          >
            <span className="w-2.5 h-2.5 rounded-full bg-current opacity-50 flex-none" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-5 border-t border-white/[0.14] max-md:hidden">
        <ActionButton
          onClick={() => navigate('/')}
          className="w-full bg-transparent! border-[1.5px]! border-white/35! text-white p-2.5! rounded-pill font-label"
        >
          ← Volver al sitio
        </ActionButton>
      </div>
    </aside>
  )
}
