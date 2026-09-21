import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import toast from 'react-hot-toast'
import { AppointmentsPage } from './AppointmentsPage'
import { usePatientStore } from '../../../store/patientStore'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

describe('AppointmentsPage', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  it('shows upcoming appointments by default, with "Unirse" only for teleconsultas', () => {
    render(<AppointmentsPage />)

    expect(screen.getByRole('heading', { name: 'Consultas' })).toBeInTheDocument()
    expect(screen.getByText('Dr. Carlos Martínez')).toBeInTheDocument()
    expect(screen.getByText('Dra. Ana Torres')).toBeInTheDocument()

    const teleconsultaCard = screen.getByText('Dra. Ana Torres').closest('div.grid')!
    expect(within(teleconsultaCard).getByRole('link', { name: 'Unirse' })).toBeInTheDocument()

    const presencialCard = screen.getByText('Dr. Carlos Martínez').closest('div.grid')!
    expect(within(presencialCard).queryByRole('link', { name: 'Unirse' })).not.toBeInTheDocument()
  })

  it('switches to the Historial tab and shows past appointments without action buttons', () => {
    render(<AppointmentsPage />)

    fireEvent.click(screen.getByRole('tab', { name: 'Historial' }))

    expect(screen.getByText('Dra. Elena Blanco')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancelar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Unirse' })).not.toBeInTheDocument()
  })

  it('shows empty states when there are no appointments in a tab', () => {
    usePatientStore.setState({ appointments: [] })
    render(<AppointmentsPage />)

    expect(screen.getByText('No tienes consultas próximas.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: 'Historial' }))
    expect(screen.getByText('No tienes consultas pasadas.')).toBeInTheDocument()
  })

  it('cancels an upcoming appointment when "Cancelar" is clicked', () => {
    render(<AppointmentsPage />)

    const card = screen.getByText('Dr. Carlos Martínez').closest('div.grid')!
    fireEvent.click(within(card).getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByText('Dr. Carlos Martínez')).not.toBeInTheDocument()
  })

  it('shows a friendly error instead of joining the stub teleconsulta link', () => {
    render(<AppointmentsPage />)

    const teleconsultaCard = screen.getByText('Dra. Ana Torres').closest('div.grid')!
    fireEvent.click(within(teleconsultaCard).getByRole('link', { name: 'Unirse' }))

    expect(toast.error).toHaveBeenCalledWith(
      'No se pudo conectar con la videollamada de Dra. Ana Torres: esta es una demo sin backend real.',
    )
  })

  it('shows a stub message when scheduling a new appointment', () => {
    render(<AppointmentsPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Nueva consulta' }))

    expect(toast).toHaveBeenCalledWith('Función de agendar próximamente disponible.')
  })
})
