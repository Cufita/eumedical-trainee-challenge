import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { usePatientStore } from '../../store/patientStore'

const titlesByPath: Record<string, string> = {
  '/paciente': 'Hola, María',
  '/paciente/consultas': 'Consultas',
  '/paciente/historial': 'Historial de consultas',
  '/paciente/documentos': 'Documentos médicos',
  '/paciente/recetas': 'Recetas y prescripciones',
  '/paciente/perfil': 'Perfil y soporte',
}

export function AppShell() {
  const { pathname } = useLocation()
  const fullName = usePatientStore((state) => state.profile.fullName)
  const title = titlesByPath[pathname] ?? 'Área paciente'
  const initial = fullName.charAt(0)

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[264px_1fr] bg-cloud">
      <Sidebar />
      <main className="p-8.5 px-(--edge) max-w-[980px]">
        <div className="flex justify-between items-center mb-7.5 gap-5">
          <h1 className="text-[1.7rem]">{title}</h1>
          <div
            className="w-11 h-11 rounded-full bg-sage-deep text-white flex items-center justify-center font-display font-semibold"
            aria-hidden="true"
          >
            {initial}
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
