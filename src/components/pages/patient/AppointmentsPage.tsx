import { useState } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { Cross } from '../../atoms/Cross'
import { ActionButton } from '../../atoms/Button'
import { PageHeader } from '../../molecules/patient/PageHeader'
import { AppointmentCard } from '../../molecules/patient/AppointmentCard'
import { Tabs } from '../../molecules/Tabs'
import { selectPastAppointments, selectUpcomingAppointments, usePatientStore } from '../../../store/patientStore'
import { handleJoinTeleconsulta } from '../../../utils/teleconsulta'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import type { Appointment } from '../../../mocks/types'

function groupByDate(appointments: Appointment[]) {
  const groups = new Map<string, Appointment[]>()
  for (const appt of appointments) {
    const group = groups.get(appt.fullDateLabel) ?? []
    group.push(appt)
    groups.set(appt.fullDateLabel, group)
  }
  return groups
}

function UpcomingPanel() {
  const upcoming = usePatientStore(useShallow(selectUpcomingAppointments))
  const cancelAppointment = usePatientStore((state) => state.cancelAppointment)
  const groups = groupByDate(upcoming)

  if (upcoming.length === 0) {
    return (
      <p className="text-center py-14 px-5 border-[1.5px] border-dashed border-sage-pale rounded-[20px] text-slate">
        No tienes consultas próximas.
      </p>
    )
  }

  return (
    <>
      {Array.from(groups.entries()).map(([dateLabel, appts]) => (
        <div key={dateLabel} className="mb-6">
          <h3 className="font-label text-sm text-slate mb-2.5">{dateLabel}</h3>
          {appts.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onCancel={(id) => {
                cancelAppointment(id)
                toast.success('Consulta cancelada.')
              }}
              onJoin={handleJoinTeleconsulta}
            />
          ))}
        </div>
      ))}
      <div className="flex items-start gap-3 bg-sage-pale/30 border border-sage-pale rounded-xl px-5 py-4 mt-2 text-sm text-navy">
        Para atención urgente, puedes solicitar una consulta inmediata por videollamada desde{' '}
        <strong>Nueva consulta</strong>.
      </div>
    </>
  )
}

function HistoryPanel() {
  const past = usePatientStore(useShallow(selectPastAppointments))

  if (past.length === 0) {
    return (
      <p className="text-center py-14 px-5 border-[1.5px] border-dashed border-sage-pale rounded-[20px] text-slate">
        No tienes consultas pasadas.
      </p>
    )
  }

  return (
    <>
      {past.map((appt) => (
        <AppointmentCard key={appt.id} appointment={appt} showActions={false} />
      ))}
    </>
  )
}

export function AppointmentsPage() {
  const [tab, setTab] = useState<'proximas' | 'historial'>('proximas')
  useDocumentTitle('Consultas')

  return (
    <section>
      <PageHeader
        title="Consultas"
        subtitle="Gestiona tus consultas médicas"
        action={
          <ActionButton variant="dark" onClick={() => toast('Función de agendar próximamente disponible.')}>
            <Cross variant="white" size={16} /> Nueva consulta
          </ActionButton>
        }
      />
      <Tabs
        selectedKey={tab}
        onChange={(key) => setTab(key as 'proximas' | 'historial')}
        items={[
          { key: 'proximas', label: 'Próximas', content: <UpcomingPanel /> },
          { key: 'historial', label: 'Historial', content: <HistoryPanel /> },
        ]}
      />
    </section>
  )
}
