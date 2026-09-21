import { Download, Tag as TagIcon, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { DateBadge } from '../../atoms/DateBadge'
import { ActionButton } from '../../atoms/Button'
import { Tag } from '../../atoms/Tag'
import type { Study } from '../../../mocks/types'

function splitDate(dateLabel: string) {
  const match = dateLabel.match(/(\d{1,2})\s+([a-zA-Zé]+)/)
  return match ? { day: match[1], month: match[2].slice(0, 3) } : { day: '–', month: '' }
}

export function StudyCard({ study }: { study: Study }) {
  const { day, month } = splitDate(study.dateLabel)

  return (
    <article className="grid grid-cols-[auto_1fr] gap-4 items-start bg-white border border-mist rounded-2xl px-5 py-4.5">
      <DateBadge day={day} month={month} />
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[1.05rem] font-semibold text-navy">{study.studyName}</h3>
          {study.isNew && <Tag variant="success">Nuevo</Tag>}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-slate">
          <span className="flex items-center gap-1.5">
            <TagIcon size={14} /> {study.type}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} /> {study.doctorName}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3.5">
          <ActionButton
            variant="outline"
            className="px-4! py-2! text-sm! flex-1"
            onClick={() => toast(`Abriendo "${study.studyName}"…`)}
          >
            Ver estudio
          </ActionButton>
          <a
            href={study.downloadUrl ?? '#'}
            aria-label={`Descargar ${study.studyName}`}
            className="w-9.5 h-9.5 rounded-full flex items-center justify-center text-navy border border-mist hover:bg-cloud flex-none"
            onClick={(e) => {
              if (!study.downloadUrl || study.downloadUrl === '#') {
                e.preventDefault()
                toast.error(`No se pudo descargar "${study.studyName}": no hay un archivo real disponible en esta demo.`)
              }
            }}
          >
            <Download size={17} />
          </a>
        </div>
      </div>
    </article>
  )
}
