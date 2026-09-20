import { Cross } from '../shared/Cross'
import { ListRow, Tag } from '../shared/ListRow'
import { usePatientStore } from '../../store/patientStore'

export function Documents() {
  const documents = usePatientStore((state) => state.documents)

  return (
    <section>
      <div className="mb-4">
        <p className="font-label text-[0.98rem] text-sage-deep">DOCUMENTOS</p>
        <h2 className="text-2xl mt-2">Informes médicos</h2>
      </div>
      {documents.map((doc) => (
        <ListRow
          key={doc.id}
          leading={<Cross />}
          title={doc.title}
          subtitle={`${doc.dateLabel} · ${doc.format}`}
          trailing={<Tag>Descargar</Tag>}
        />
      ))}
    </section>
  )
}
