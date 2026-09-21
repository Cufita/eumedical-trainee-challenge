import { Calendar, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { Cross } from '../../atoms/Cross'
import { AnchorButton, ActionButton } from '../../atoms/Button'
import { StatCard } from '../../molecules/StatCard'
import { PageHeader } from '../../molecules/patient/PageHeader'
import { AppointmentCard } from '../../molecules/patient/AppointmentCard'
import { StudyRow } from '../../molecules/patient/StudyRow'
import {
  selectActivePrescriptions,
  selectNextAppointment,
  selectStudies,
  selectUpcomingAppointments,
  usePatientStore,
} from '../../../store/patientStore'
import { handleJoinTeleconsulta } from '../../../utils/teleconsulta'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'

function todayLabel() {
  const label = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function DashboardPage() {
  const nextAppointment = usePatientStore(selectNextAppointment)
  const upcoming = usePatientStore(useShallow(selectUpcomingAppointments)).slice(0, 3)
  const activePrescriptionsCount = usePatientStore(useShallow(selectActivePrescriptions)).length
  const studies = usePatientStore(useShallow(selectStudies))
  const newStudiesCount = studies.filter((s) => s.isNew).length
  const latestStudies = studies.slice(0, 3)
  const fullName = usePatientStore((state) => state.profile.fullName)
  const firstName = fullName.split(' ')[0]
  const cancelAppointment = usePatientStore((state) => state.cancelAppointment)
  useDocumentTitle('Inicio')

  function handleCancel(id: string) {
    cancelAppointment(id)
    toast.success('Consulta cancelada.')
  }

  return (
    <section>
      <PageHeader
        eyebrow={todayLabel()}
        title={`Buenos días, ${firstName}`}
        action={
          <ActionButton variant="dark" onClick={() => toast('Función de agendar próximamente disponible.')}>
            <Cross variant="white" size={16} /> Nueva consulta
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-7.5 items-stretch">
        {nextAppointment ? (
          <div className="bg-navy text-white rounded-[18px] p-5.5">
            <div className="flex justify-between items-start gap-3">
              <p className="font-label text-[0.85rem] text-sage-pale">PRÓXIMA CONSULTA</p>
              {nextAppointment.type === 'teleconsulta' && (
                <AnchorButton
                  href={nextAppointment.joinUrl ?? '#'}
                  variant="gold"
                  className="px-4! py-2! text-sm!"
                  onClick={(e) => {
                    e.preventDefault()
                    handleJoinTeleconsulta(nextAppointment)
                  }}
                >
                  Unirse
                </AnchorButton>
              )}
            </div>
            <h2 className="text-white text-xl mt-3">{nextAppointment.doctorName}</h2>
            <p className="text-sage-pale text-sm mt-0.5">{nextAppointment.specialty}</p>
            <p className="flex items-center gap-1.5 text-sage-pale text-sm mt-3">
              <Calendar size={14} /> {nextAppointment.fullDateLabel}
            </p>
            <p className="flex items-center gap-1.5 text-sage-pale text-sm mt-1">
              <Clock size={14} /> {nextAppointment.timeLabel} h
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[18px] p-5.5 border border-mist flex items-center justify-center text-slate text-sm">
            No tienes próximas consultas.
          </div>
        )}
        <StatCard
          value={String(activePrescriptionsCount)}
          label="Recetas activas"
          linkLabel="Ver medicación"
          linkTo="/paciente/recetas"
        />
        <StatCard
          value={String(newStudiesCount)}
          label="Estudios disponibles"
          linkLabel="Informe nuevo"
          linkTo="/paciente/estudios"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">Próximas consultas</h2>
            <Link to="/paciente/consultas" className="text-sm text-sage-deep underline underline-offset-[3px]">
              Ver todo
            </Link>
          </div>
          {upcoming.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              compact
              onCancel={handleCancel}
              onJoin={handleJoinTeleconsulta}
            />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">Últimos estudios</h2>
            <Link to="/paciente/estudios" className="text-sm text-sage-deep underline underline-offset-[3px]">
              Ver todo
            </Link>
          </div>
          {latestStudies.map((study) => (
            <StudyRow key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  )
}
