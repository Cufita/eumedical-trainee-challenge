export type AppointmentType = 'presencial' | 'teleconsulta'
export type AppointmentStatus = 'upcoming' | 'past' | 'cancelled'

export interface Appointment {
  id: string
  doctorName: string
  specialty: string
  type: AppointmentType
  location: string
  fullDateLabel: string
  timeLabel: string
  whenLabel: string
  status: AppointmentStatus
  joinUrl?: string
}

export type StudyType = 'Laboratorio' | 'Imagen' | 'Informe'

export interface Study {
  id: string
  dateLabel: string
  isNew?: boolean
  type: StudyType
  studyName: string
  doctorName: string
  downloadUrl?: string
}

export type PrescriptionStatus = 'active' | 'expired'

export interface Prescription {
  id: string
  name: string
  issuedLabel: string
  expiresLabel: string
  prescribedBy: string
  status: PrescriptionStatus
}

export interface PatientProfile {
  fullName: string
  email: string
  phone: string
  language: string
  birthDateLabel: string
  patientSinceLabel: string
  patientNumber: string
  primaryDoctorName: string
  dni: string
  healthCenter: string
  bloodType: string
  address: string
  insuranceNumber: string
  allergies: string[]
}
