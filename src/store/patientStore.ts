import { create } from 'zustand'
import { appointments as initialAppointments } from '../mocks/appointments'
import { prescriptions as initialPrescriptions } from '../mocks/prescriptions'
import { studies as initialStudies } from '../mocks/studies'
import { profile as initialProfile } from '../mocks/profile'
import type { Appointment, PatientProfile, Prescription, Study } from '../mocks/types'

interface PatientState {
  profile: PatientProfile
  appointments: Appointment[]
  prescriptions: Prescription[]
  studies: Study[]
}

interface PatientActions {
  cancelAppointment: (id: string) => void
}

export const usePatientStore = create<PatientState & PatientActions>((set) => ({
  profile: initialProfile,
  appointments: initialAppointments,
  prescriptions: initialPrescriptions,
  studies: initialStudies,
  cancelAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)),
    })),
}))

export const selectUpcomingAppointments = (state: PatientState) =>
  state.appointments.filter((a) => a.status === 'upcoming')

export const selectPastAppointments = (state: PatientState) =>
  state.appointments.filter((a) => a.status === 'past')

export const selectActivePrescriptions = (state: PatientState) =>
  state.prescriptions.filter((p) => p.status === 'active')

export const selectNextAppointment = (state: PatientState) => selectUpcomingAppointments(state)[0]

export const selectStudies = (state: PatientState) => state.studies
