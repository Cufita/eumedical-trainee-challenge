import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bell, ChevronDown, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Cross } from '../../atoms/Cross'
import { usePatientStore } from '../../../store/patientStore'

const notifications = [
  { id: 'n1', text: 'Tu estudio "Radiografía de Tórax AP" ya está disponible.' },
  { id: 'n2', text: 'Recordatorio: consulta con Dr. Carlos Martínez el 24 sep.' },
  { id: 'n3', text: 'Tu receta de Metformina 850 mg venció.' },
]

export function PatientTopBar() {
  const navigate = useNavigate()
  const fullName = usePatientStore((state) => state.profile.fullName)
  const firstName = fullName.split(' ')[0]

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-mist px-6 py-3.5">
      <div className="flex items-center gap-2 font-display font-semibold text-xl text-navy">
        <Cross /> eumedical
      </div>
      <div className="flex items-center gap-3">
        <Popover className="relative">
          <PopoverButton
            aria-label="Notificaciones"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-navy hover:bg-cloud outline-none"
          >
            <Bell size={19} />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-gold" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom end"
            className="mt-2 w-80 rounded-xl border border-mist bg-white shadow-lg py-2 z-20"
          >
            <p className="font-label text-xs uppercase text-slate px-4 py-2">Notificaciones</p>
            {notifications.map((n) => (
              <p key={n.id} className="px-4 py-2.5 text-sm text-navy border-t border-mist first:border-0">
                {n.text}
              </p>
            ))}
          </PopoverPanel>
        </Popover>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-cloud outline-none">
            <span
              className="w-9 h-9 rounded-full bg-sage-pale text-sage-deep flex items-center justify-center"
              aria-hidden="true"
            >
              <User size={17} />
            </span>
            <span className="text-left leading-tight hidden sm:block">
              <span className="block text-sm font-semibold text-navy">{fullName}</span>
              <span className="block text-xs text-slate">Paciente</span>
            </span>
            <ChevronDown size={16} className="text-slate" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="mt-2 w-48 rounded-xl border border-mist bg-white shadow-lg py-1.5 z-20 focus:outline-none"
          >
            <MenuItem>
              <button
                type="button"
                onClick={() => navigate('/paciente/perfil')}
                className="w-full text-left px-4 py-2 text-sm text-navy data-[focus]:bg-cloud"
              >
                Ver perfil
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                onClick={() => {
                  toast.success(`Hasta pronto, ${firstName}.`)
                  navigate('/')
                }}
                className="w-full text-left px-4 py-2 text-sm text-navy data-[focus]:bg-cloud"
              >
                Cerrar sesión
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  )
}
