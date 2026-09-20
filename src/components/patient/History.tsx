import { useShallow } from 'zustand/react/shallow'
import { DotStatus, ListRow, Tag } from '../shared/ListRow'
import { selectPastAppointments, usePatientStore } from '../../store/patientStore'

export function History() {
  const past = usePatientStore(useShallow(selectPastAppointments))

  return (
    <section>
      <div className="mb-4">
        <p className="font-label text-[0.98rem] text-sage-deep">HISTORIAL</p>
        <h2 className="text-2xl mt-2">Tus consultas pasadas</h2>
      </div>
      {past.map((appt) => (
        <ListRow
          key={appt.id}
          leading={<DotStatus past />}
          title={`${appt.specialty} · ${appt.doctorName}`}
          subtitle={appt.fullDateLabel}
          trailing={<Tag>Resumen</Tag>}
        />
      ))}
    </section>
  )
}
