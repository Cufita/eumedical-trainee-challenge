import { Download } from 'lucide-react'
import type { Study } from '../../../mocks/types'

export function StudyRow({ study }: { study: Study }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-mist rounded-2xl px-5 py-4 mb-3">
      <div>
        <h3 className="text-[1.02rem] font-semibold text-navy">{study.studyName}</h3>
        <p className="text-sm text-slate mt-0.5">{study.dateLabel}</p>
      </div>
      <a
        href={study.downloadUrl ?? '#'}
        aria-label={`Descargar ${study.studyName}`}
        className="w-9 h-9 rounded-full flex items-center justify-center text-navy hover:bg-mist flex-none"
      >
        <Download size={17} />
      </a>
    </div>
  )
}
