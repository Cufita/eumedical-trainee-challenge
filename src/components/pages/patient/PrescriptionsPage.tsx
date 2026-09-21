import toast from 'react-hot-toast'
import { ActionButton } from '../../atoms/Button'
import { Tag } from '../../atoms/Tag'
import { PageHeader } from '../../molecules/patient/PageHeader'
import { PrescriptionCard } from '../../molecules/patient/PrescriptionCard'
import { Table, type Column } from '../../molecules/Table'
import { usePatientStore } from '../../../store/patientStore'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import type { Prescription } from '../../../mocks/types'

export function PrescriptionsPage() {
  const prescriptions = usePatientStore((state) => state.prescriptions)
  useDocumentTitle('Recetas')

  const columns: Column<Prescription>[] = [
    { key: 'emision', header: 'Fecha emisión', render: (rx) => <span className="text-slate">{rx.issuedLabel}</span> },
    { key: 'vencimiento', header: 'Vencimiento', render: (rx) => <span className="text-slate">{rx.expiresLabel}</span> },
    { key: 'medicamento', header: 'Medicamento', render: (rx) => <span className="font-semibold text-navy">{rx.name}</span> },
    { key: 'doctor', header: 'Doctor', render: (rx) => <span className="text-slate">{rx.prescribedBy}</span> },
    {
      key: 'estado',
      header: 'Estado',
      render: (rx) => <Tag variant={rx.status === 'active' ? 'success' : 'warn'}>{rx.status === 'active' ? 'Activa' : 'Vencida'}</Tag>,
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (rx) => (
        <div className="flex items-center gap-2 justify-end">
          <ActionButton variant="outline" className="px-4! py-2! text-sm!" onClick={() => toast(`Detalles de ${rx.name}`)}>
            Ver detalles
          </ActionButton>
          <ActionButton
            variant="dark"
            className="px-4! py-2! text-sm!"
            onClick={() => toast.success(`Solicitud de renovación enviada para ${rx.name}.`)}
          >
            Solicitar
          </ActionButton>
        </div>
      ),
      className: 'text-right',
    },
  ]

  return (
    <section>
      <PageHeader title="Recetas y medicación" subtitle="Prescripciones y tratamientos" />
      <Table
        columns={columns}
        rows={prescriptions}
        rowKey={(rx) => rx.id}
        renderMobileCard={(rx) => <PrescriptionCard prescription={rx} />}
        emptyMessage="No tienes recetas registradas."
      />
    </section>
  )
}
