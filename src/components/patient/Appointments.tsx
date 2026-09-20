import { useShallow } from 'zustand/react/shallow'
import { AnchorButton } from '../shared/Button'
import { DotStatus, ListRow, Tag } from '../shared/ListRow'
import { selectPastAppointments, selectUpcomingAppointments, usePatientStore } from '../../store/patientStore'

export function Appointments() {
  const upcoming = usePatientStore(useShallow(selectUpcomingAppointments))
  const recentHistory = usePatientStore(useShallow(selectPastAppointments)).slice(0, 1)

  return (
    <section>
      <div className="mb-4">
        <p className="font-label text-[0.98rem] text-sage-deep">CONSULTAS</p>
        <h2 className="text-2xl mt-2">Próximas consultas</h2>
      </div>
      {upcoming.map((appt) => (
        <ListRow
          key={appt.id}
          leading={<DotStatus />}
          title={`${appt.doctorName} · ${appt.specialty}`}
          subtitle={`${appt.whenLabel} · ${appt.mode}`}
          trailing={
            appt.status === 'today' ? (
              <AnchorButton href={appt.joinUrl ?? '#'} variant="gold" className="px-4.5! py-2.5! text-sm!">
                Unirse
              </AnchorButton>
            ) : (
              <Tag>Confirmada</Tag>
            )
          }
        />
      ))}

      <div className="mt-8 mb-4">
        <h2 className="text-2xl">Historial reciente</h2>
      </div>
      {recentHistory.map((appt) => (
        <ListRow
          key={appt.id}
          leading={<DotStatus past />}
          title={`${appt.doctorName} · ${appt.specialty}`}
          subtitle={`${appt.whenLabel} · ${appt.mode}`}
          trailing={<Tag>Ver resumen</Tag>}
        />
      ))}
    </section>
  )
}
