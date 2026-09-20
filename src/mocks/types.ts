export type AppointmentStatus = 'today' | 'confirmed' | 'past'

export interface Appointment {
  id: string
  doctorName: string
  specialty: string
  whenLabel: string
  fullDateLabel: string
  mode: 'Videoconsulta' | 'Consulta finalizada'
  status: AppointmentStatus
  joinUrl?: string
}

export interface MedicalDocument {
  id: string
  title: string
  dateLabel: string
  format: 'PDF'
}

export type PrescriptionStatus = 'active' | 'expired'

export interface Prescription {
  id: string
  name: string
  prescribedLabel: string
  prescribedBy: string
  status: PrescriptionStatus
}

export interface PatientProfile {
  fullName: string
  email: string
  phone: string
  language: string
}
