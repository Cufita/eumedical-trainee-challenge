import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import toast from 'react-hot-toast'
import { PrescriptionsPage } from './PrescriptionsPage'
import { usePatientStore } from '../../../store/patientStore'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

describe('PrescriptionsPage', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  it('lists prescriptions with their status', () => {
    render(<PrescriptionsPage />)

    const activeRow = screen.getByText('Ramipril 5 mg').closest('tr')!
    expect(within(activeRow).getByText('Activa')).toBeInTheDocument()

    const expiredRow = screen.getByText('Metformina 850 mg').closest('tr')!
    expect(within(expiredRow).getByText('Vencida')).toBeInTheDocument()
  })

  it('requests a renewal for a prescription', () => {
    render(<PrescriptionsPage />)

    const row = screen.getByText('Ramipril 5 mg').closest('tr')!
    fireEvent.click(within(row).getByRole('button', { name: 'Solicitar' }))

    expect(toast.success).toHaveBeenCalledWith('Solicitud de renovación enviada para Ramipril 5 mg.')
  })

  it('shows the prescription details', () => {
    render(<PrescriptionsPage />)

    const row = screen.getByText('Ramipril 5 mg').closest('tr')!
    fireEvent.click(within(row).getByRole('button', { name: 'Ver detalles' }))

    expect(toast).toHaveBeenCalledWith('Detalles de Ramipril 5 mg')
  })

  it('shows an empty state when there are no prescriptions', () => {
    usePatientStore.setState({ prescriptions: [] })
    render(<PrescriptionsPage />)

    expect(screen.getByText('No tienes recetas registradas.')).toBeInTheDocument()
  })
})
