import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Download } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { ActionButton } from '../../atoms/Button'
import { Tag } from '../../atoms/Tag'
import { PageHeader } from '../../molecules/patient/PageHeader'
import { StudyCard } from '../../molecules/patient/StudyCard'
import { FilterDropdown } from '../../molecules/FilterDropdown'
import { Table, type Column } from '../../molecules/Table'
import { Pagination } from '../../molecules/Pagination'
import { selectStudies, usePatientStore } from '../../../store/patientStore'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import type { Study, StudyType } from '../../../mocks/types'

const PAGE_SIZE = 7
const STUDY_TYPES: StudyType[] = ['Laboratorio', 'Imagen', 'Informe']

export function StudiesPage() {
  const studies = usePatientStore(useShallow(selectStudies))
  const [typeFilter, setTypeFilter] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('')
  const [page, setPage] = useState(1)
  useDocumentTitle('Estudios')

  const doctorOptions = useMemo(
    () =>
      Array.from(new Set(studies.map((s) => s.doctorName)))
        .sort()
        .map((name) => ({ value: name, label: name })),
    [studies],
  )

  const filtered = studies.filter(
    (s) => (!typeFilter || s.type === typeFilter) && (!doctorFilter || s.doctorName === doctorFilter),
  )
  const pageStart = (page - 1) * PAGE_SIZE
  const paged = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function updateFilter(setter: (value: string) => void) {
    return (value: string) => {
      setter(value)
      setPage(1)
    }
  }

  const columns: Column<Study>[] = [
    {
      key: 'fecha',
      header: 'Fecha',
      render: (s) => (
        <span className="flex items-center gap-2 text-navy">
          {s.dateLabel} {s.isNew && <Tag variant="success">Nuevo</Tag>}
        </span>
      ),
    },
    { key: 'tipo', header: 'Tipo', render: (s) => <span className="text-slate">{s.type}</span> },
    { key: 'estudio', header: 'Estudio', render: (s) => <span className="font-semibold text-navy">{s.studyName}</span> },
    { key: 'doctor', header: 'Doctor', render: (s) => <span className="text-slate">{s.doctorName}</span> },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (s) => (
        <div className="flex items-center gap-2 justify-end">
          <ActionButton
            variant="outline"
            className="px-4! py-2! text-sm!"
            onClick={() => toast(`Abriendo "${s.studyName}"…`)}
          >
            Ver estudio
          </ActionButton>
          <a
            href={s.downloadUrl ?? '#'}
            aria-label={`Descargar ${s.studyName}`}
            className="w-9 h-9 rounded-full flex items-center justify-center text-navy hover:bg-cloud"
            onClick={(e) => {
              if (!s.downloadUrl || s.downloadUrl === '#') {
                e.preventDefault()
                toast.error(`No se pudo descargar "${s.studyName}": no hay un archivo real disponible en esta demo.`)
              }
            }}
          >
            <Download size={17} />
          </a>
        </div>
      ),
      className: 'text-right',
    },
  ]

  return (
    <section>
      <PageHeader title="Estudios" subtitle="Informes, imágenes y resultados de laboratorio" />
      <div className="flex flex-wrap gap-3 mb-5">
        <FilterDropdown
          label="Tipo de estudio"
          value={typeFilter}
          onChange={updateFilter(setTypeFilter)}
          options={STUDY_TYPES.map((t) => ({ value: t, label: t }))}
        />
        <FilterDropdown label="Doctor" value={doctorFilter} onChange={updateFilter(setDoctorFilter)} options={doctorOptions} />
      </div>
      <Table
        columns={columns}
        rows={paged}
        rowKey={(s) => s.id}
        renderMobileCard={(s) => <StudyCard study={s} />}
        emptyMessage="No se encontraron estudios con estos filtros."
      />
      {filtered.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filtered.length} itemLabel="estudios" onPageChange={setPage} />
      )}
    </section>
  )
}
