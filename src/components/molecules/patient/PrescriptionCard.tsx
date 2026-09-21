import { Calendar, Clock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { ActionButton } from '../../atoms/Button'
import { Tag } from '../../atoms/Tag'
import type { Prescription } from '../../../mocks/types'

export function PrescriptionCard({ prescription: rx }: { prescription: Prescription }) {
  return (
    <article className="bg-white border border-mist rounded-2xl px-5 py-4.5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[1.05rem] font-semibold text-navy">{rx.name}</h3>
        <Tag variant={rx.status === 'active' ? 'success' : 'warn'}>{rx.status === 'active' ? 'Activa' : 'Vencida'}</Tag>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-slate">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} /> Emitida {rx.issuedLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} /> Vence {rx.expiresLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <User size={14} /> {rx.prescribedBy}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3.5">
        <ActionButton
          variant="outline"
          className="px-4! py-2! text-sm! flex-1"
          onClick={() => toast(`Detalles de ${rx.name}`)}
        >
          Ver detalles
        </ActionButton>
        <ActionButton
          variant="dark"
          className="px-4! py-2! text-sm! flex-1"
          onClick={() => toast.success(`Solicitud de renovación enviada para ${rx.name}.`)}
        >
          Solicitar
        </ActionButton>
      </div>
    </article>
  )
}
