import { afterEach, describe, expect, it } from 'vitest'
import {
  selectActivePrescriptions,
  selectNextAppointment,
  selectPastAppointments,
  selectUpcomingAppointments,
  usePatientStore,
} from './patientStore'

describe('patientStore', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
  })

  it('selects only upcoming appointments', () => {
    const upcoming = selectUpcomingAppointments(usePatientStore.getState())
    expect(upcoming).toHaveLength(3)
    expect(upcoming.every((a) => a.status === 'upcoming')).toBe(true)
  })

  it('selects only past appointments', () => {
    const past = selectPastAppointments(usePatientStore.getState())
    expect(past).toHaveLength(3)
    expect(past.every((a) => a.status === 'past')).toBe(true)
  })

  it('selects the first upcoming appointment as the next one', () => {
    const next = selectNextAppointment(usePatientStore.getState())
    expect(next?.id).toBe(selectUpcomingAppointments(usePatientStore.getState())[0]?.id)
  })

  it('selects only active prescriptions', () => {
    const active = selectActivePrescriptions(usePatientStore.getState())
    expect(active.length).toBeGreaterThan(0)
    expect(active.every((p) => p.status === 'active')).toBe(true)
  })

  it('cancels an appointment and removes it from the upcoming list', () => {
    const [firstUpcoming] = selectUpcomingAppointments(usePatientStore.getState())
    expect(firstUpcoming).toBeDefined()

    usePatientStore.getState().cancelAppointment(firstUpcoming!.id)

    const updated = usePatientStore
      .getState()
      .appointments.find((a) => a.id === firstUpcoming!.id)
    expect(updated?.status).toBe('cancelled')
    expect(selectUpcomingAppointments(usePatientStore.getState())).not.toContainEqual(
      expect.objectContaining({ id: firstUpcoming!.id }),
    )
  })

  it('leaves other appointments untouched when cancelling one', () => {
    const beforeCount = usePatientStore.getState().appointments.length
    const [firstUpcoming] = selectUpcomingAppointments(usePatientStore.getState())

    usePatientStore.getState().cancelAppointment(firstUpcoming!.id)

    expect(usePatientStore.getState().appointments).toHaveLength(beforeCount)
  })
})
