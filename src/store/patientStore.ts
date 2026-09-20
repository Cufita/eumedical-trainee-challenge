import { create } from 'zustand'
import { appointments as initialAppointments } from '../mocks/appointments'
import { documents as initialDocuments } from '../mocks/documents'
import { prescriptions as initialPrescriptions } from '../mocks/prescriptions'
import type { Appointment, MedicalDocument, PatientProfile, Prescription } from '../mocks/types'

interface PatientState {
  profile: PatientProfile
  appointments: Appointment[]
  documents: MedicalDocument[]
  prescriptions: Prescription[]
}

export const usePatientStore = create<PatientState>(() => ({
  profile: {
    fullName: 'María Gómez',
    email: 'maria.gomez@example.com',
    phone: '+34 600 000 000',
    language: 'Español',
  },
  appointments: initialAppointments,
  documents: initialDocuments,
  prescriptions: initialPrescriptions,
}))

export const selectUpcomingAppointments = (state: PatientState) =>
  state.appointments.filter((a) => a.status === 'today' || a.status === 'confirmed')

export const selectPastAppointments = (state: PatientState) =>
  state.appointments.filter((a) => a.status === 'past')

export const selectActivePrescriptions = (state: PatientState) =>
  state.prescriptions.filter((p) => p.status === 'active')

export const selectNextAppointment = (state: PatientState) => selectUpcomingAppointments(state)[0]
