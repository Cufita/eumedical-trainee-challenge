import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import toast from 'react-hot-toast'
import { ProfilePage } from './ProfilePage'
import { usePatientStore } from '../../../store/patientStore'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

describe('ProfilePage', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  it('shows the patient personal and account data from the store', () => {
    render(<ProfilePage />)

    expect(screen.getByRole('heading', { name: 'María García López' })).toBeInTheDocument()
    expect(screen.getByText('28.456.789-K')).toBeInTheDocument()
    expect(screen.getByText('maria.garcia@example.com')).toBeInTheDocument()
  })

  it('shows an empty state when there are no known allergies', () => {
    render(<ProfilePage />)
    expect(screen.getByText('Sin alergias registradas.')).toBeInTheDocument()
  })

  it('lists known allergies as tags when present', () => {
    usePatientStore.setState((state) => ({ profile: { ...state.profile, allergies: ['Penicilina', 'Polen'] } }))
    render(<ProfilePage />)

    expect(screen.getByText('Penicilina')).toBeInTheDocument()
    expect(screen.getByText('Polen')).toBeInTheDocument()
    expect(screen.queryByText('Sin alergias registradas.')).not.toBeInTheDocument()
  })

  it('shows a "coming soon" notice for the stubbed edit actions', () => {
    render(<ProfilePage />)

    fireEvent.click(screen.getByRole('button', { name: 'Editar datos' }))
    expect(toast).toHaveBeenCalledWith('Edición de datos próximamente disponible.')

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar contraseña' }))
    expect(toast).toHaveBeenCalledWith('Cambio de contraseña próximamente disponible.')

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    expect(toast).toHaveBeenCalledWith('Edición de alergias próximamente disponible.')
  })
})
