import { Calendar, ChevronLeft, ChevronRight, FileText, Home, LifeBuoy, Pill, User, type LucideIcon } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const navItems: { to: string; label: string; end?: boolean; icon: LucideIcon }[] = [
  { to: '/paciente', label: 'Inicio', end: true, icon: Home },
  { to: '/paciente/consultas', label: 'Consultas', icon: Calendar },
  { to: '/paciente/estudios', label: 'Estudios', icon: FileText },
  { to: '/paciente/recetas', label: 'Recetas', icon: Pill },
  { to: '/paciente/perfil', label: 'Perfil', icon: User },
]

function navLinkClass(isActive: boolean, collapsed: boolean) {
  return `flex items-center gap-3 text-left bg-none border-none py-3 px-3.5 rounded-xl font-label text-[0.95rem] no-underline ${
    collapsed ? 'justify-center' : ''
  } ${isActive ? 'bg-navy-tint text-navy font-semibold' : 'text-slate hover:bg-cloud hover:text-navy'}`
}

export function PatientSidebar({
  collapsed,
  onToggleCollapsed,
}: {
  collapsed: boolean
  onToggleCollapsed: () => void
}) {
  const navigate = useNavigate()

  return (
    <aside className="bg-white border-r border-mist p-4 flex flex-col max-md:flex-row max-md:overflow-x-auto max-md:items-center">
      <nav aria-label="Navegación del área paciente" className="flex flex-col gap-1 flex-1 max-md:flex-row">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) => navLinkClass(isActive, collapsed)}
          >
            <item.icon size={18} className="flex-none" />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-mist max-md:hidden flex flex-col gap-1">
        <NavLink
          to="/paciente/soporte"
          title={collapsed ? 'Soporte' : undefined}
          className={({ isActive }) => navLinkClass(isActive, collapsed)}
        >
          <LifeBuoy size={18} className="flex-none" />
          {!collapsed && 'Soporte'}
        </NavLink>
        <button
          type="button"
          onClick={() => navigate('/')}
          title={collapsed ? 'Volver al sitio' : undefined}
          className={`flex items-center gap-3 text-left py-3 px-3.5 rounded-xl font-label text-[0.95rem] text-slate hover:bg-cloud hover:text-navy ${collapsed ? 'justify-center' : ''}`}
        >
          <ChevronLeft size={18} className="flex-none" />
          {!collapsed && 'Volver al sitio'}
        </button>
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Mostrar navegación' : 'Esconder navegación'}
          className={`flex items-center gap-3 text-left py-3 px-3.5 rounded-xl font-label text-[0.95rem] text-slate hover:bg-cloud hover:text-navy ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight size={18} className="flex-none" /> : <ChevronLeft size={18} className="flex-none" />}
          {!collapsed && 'Esconder navegación'}
        </button>
      </div>
    </aside>
  )
}
