import toast from 'react-hot-toast'
import type { Appointment } from '../mocks/types'

// The demo has no real video-call backend, so `joinUrl` is always a stub —
// this turns that dead link into an honest, user-facing error instead of a
// silent no-op navigation to "#".
export function handleJoinTeleconsulta(appointment: Appointment) {
  toast.error(
    `No se pudo conectar con la videollamada de ${appointment.doctorName}: esta es una demo sin backend real.`,
  )
}
