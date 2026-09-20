import { Cross } from '../shared/Cross'
import { ListRow, Tag } from '../shared/ListRow'
import { usePatientStore } from '../../store/patientStore'

export function Prescriptions() {
  const prescriptions = usePatientStore((state) => state.prescriptions)

  return (
    <section>
      <div className="mb-4">
        <p className="font-label text-[0.98rem] text-sage-deep">RECETAS</p>
        <h2 className="text-2xl mt-2">Tus prescripciones</h2>
      </div>
      {prescriptions.map((rx) => (
        <ListRow
          key={rx.id}
          leading={<Cross />}
          title={rx.name}
          subtitle={`Prescrita ${rx.prescribedLabel} · ${rx.prescribedBy}`}
          trailing={<Tag warn={rx.status === 'expired'}>{rx.status === 'active' ? 'Activa' : 'Caducada'}</Tag>}
        />
      ))}
      <div className="text-center py-15 px-5 border-[1.5px] border-dashed border-sage-pale rounded-[20px] text-[#5a6b73] mt-6">
        <h3 className="text-navy mb-2 text-[1.1rem]">¿Necesitas presentar una receta en farmacia?</h3>
        <p>Genera un código QR válido para tu farmacia habitual desde cualquier receta activa.</p>
      </div>
    </section>
  )
}
