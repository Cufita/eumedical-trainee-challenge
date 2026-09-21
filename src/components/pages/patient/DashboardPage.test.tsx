import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import toast from 'react-hot-toast'
import { DashboardPage } from './DashboardPage'
import { usePatientStore } from '../../../store/patientStore'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

function renderDashboard() {
  return render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  )
}

describe('DashboardPage', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  it('shows "Unirse" for the next appointment only when it is a teleconsulta', () => {
    renderDashboard()
    expect(screen.getByRole('link', { name: 'Unirse' })).toBeInTheDocument()
  })

  it('hides "Unirse" when the next appointment is presencial', () => {
    usePatientStore.setState((state) => ({
      appointments: state.appointments.map((a) => (a.id === 'appt-2' ? { ...a, status: 'cancelled' } : a)),
    }))
    renderDashboard()
    expect(screen.queryByRole('link', { name: 'Unirse' })).not.toBeInTheDocument()
  })

  it('shows a friendly error instead of joining the stub teleconsulta link', () => {
    renderDashboard()
    fireEvent.click(screen.getByRole('link', { name: 'Unirse' }))

    expect(toast.error).toHaveBeenCalledWith(
      'No se pudo conectar con la videollamada de Dra. Ana Torres: esta es una demo sin backend real.',
    )
  })

  it('shows a message when there are no upcoming appointments', () => {
    usePatientStore.setState({ appointments: [] })
    renderDashboard()
    expect(screen.getByText('No tienes próximas consultas.')).toBeInTheDocument()
  })
})
