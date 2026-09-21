import { Clock, MapPin, Tag as TagIcon } from 'lucide-react'
import { DateBadge } from '../../atoms/DateBadge'
import { AnchorButton } from '../../atoms/Button'
import { Tag } from '../../atoms/Tag'
import type { Appointment } from '../../../mocks/types'

function splitDate(appointment: Appointment) {
  const match = appointment.fullDateLabel.match(/(\d{1,2})\s+([a-zA-Zé]+)/)
  return match ? { day: match[1], month: match[2].slice(0, 3) } : { day: '–', month: '' }
}

export function AppointmentCard({
  appointment,
  compact = false,
  showActions = true,
  onCancel,
  onJoin,
}: {
  appointment: Appointment
  compact?: boolean
  showActions?: boolean
  onCancel?: (id: string) => void
  onJoin?: (appointment: Appointment) => void
}) {
  const { day, month } = splitDate(appointment)
  const isTeleconsulta = appointment.type === 'teleconsulta'

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center bg-white border border-mist rounded-2xl px-5 py-4.5 mb-3">
      <DateBadge day={day} month={month} />
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[1.05rem] font-semibold text-navy">{appointment.doctorName}</h3>
          <Tag variant={isTeleconsulta ? 'success' : 'neutral'}>
            {isTeleconsulta ? 'Teleconsulta' : 'Presencial'}
          </Tag>
        </div>
        {compact ? (
          <p className="text-sm text-slate mt-1">
            {appointment.specialty} · {appointment.timeLabel} h
          </p>
        ) : (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-slate">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {appointment.timeLabel} h
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {appointment.location}
            </span>
            <span className="flex items-center gap-1.5">
              <TagIcon size={14} /> {appointment.specialty}
            </span>
          </div>
        )}
      </div>
      {showActions && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onCancel?.(appointment.id)}
            className="font-label text-sm text-slate underline underline-offset-[3px] hover:text-navy"
          >
            Cancelar
          </button>
          {isTeleconsulta && (
            <AnchorButton
              href={appointment.joinUrl ?? '#'}
              variant="outline"
              className="px-4.5! py-2.5! text-sm!"
              onClick={(e) => {
                if (onJoin) {
                  e.preventDefault()
                  onJoin(appointment)
                }
              }}
            >
              Unirse
            </AnchorButton>
          )}
        </div>
      )}
    </div>
  )
}
