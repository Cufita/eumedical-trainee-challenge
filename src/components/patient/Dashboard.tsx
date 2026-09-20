import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { AnchorButton } from '../shared/Button'
import {
  selectActivePrescriptions,
  selectNextAppointment,
  selectUpcomingAppointments,
  usePatientStore,
} from '../../store/patientStore'

const quickLinks = [
  { to: '/paciente/consultas', title: 'Reservar cita', subtitle: 'Elige médico y horario' },
  { to: '/paciente/documentos', title: 'Ver informes', subtitle: 'Descarga tus documentos médicos' },
  { to: '/paciente/perfil', title: 'Contactar soporte', subtitle: 'Estamos disponibles 24/7' },
]

export function Dashboard() {
  const nextAppointment = usePatientStore(selectNextAppointment)
  const upcomingCount = usePatientStore(useShallow(selectUpcomingAppointments)).length
  const activePrescriptionsCount = usePatientStore(useShallow(selectActivePrescriptions)).length
  const documentsCount = usePatientStore((state) => state.documents.length)

  return (
    <section>
      {nextAppointment && (
        <div className="bg-navy text-white rounded-lg p-7.5 mb-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="font-label text-[0.98rem] text-sage-pale">PRÓXIMA CONSULTA</p>
            <h2 className="text-white text-2xl mt-2">
              {nextAppointment.whenLabel} con {nextAppointment.doctorName}
            </h2>
            <p className="text-sage-pale mt-1">
              {nextAppointment.specialty} · {nextAppointment.mode}
            </p>
          </div>
          <AnchorButton href={nextAppointment.joinUrl ?? '#'} variant="gold" className="whitespace-nowrap">
            Unirse a la videoconsulta
          </AnchorButton>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-7.5">
        <div className="bg-white rounded-[18px] p-5.5 border border-mist">
          <b className="block font-display text-[1.7rem] text-navy">{upcomingCount}</b>
          <span className="font-label text-[0.88rem] text-[#5a6b73]">Consultas próximas</span>
        </div>
        <div className="bg-white rounded-[18px] p-5.5 border border-mist">
          <b className="block font-display text-[1.7rem] text-navy">{activePrescriptionsCount}</b>
          <span className="font-label text-[0.88rem] text-[#5a6b73]">Receta activa</span>
        </div>
        <div className="bg-white rounded-[18px] p-5.5 border border-mist">
          <b className="block font-display text-[1.7rem] text-navy">{documentsCount}</b>
          <span className="font-label text-[0.88rem] text-[#5a6b73]">Informes disponibles</span>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl">Accesos rápidos</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        {quickLinks.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="bg-white rounded-[18px] p-5.5 border border-mist text-left block no-underline"
          >
            <b className="block font-display text-[1.05rem] text-navy">{item.title}</b>
            <span className="font-label text-[0.88rem] text-[#5a6b73]">{item.subtitle}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
