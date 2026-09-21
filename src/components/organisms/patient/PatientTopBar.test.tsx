import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import toast from 'react-hot-toast'
import { PatientTopBar } from './PatientTopBar'
import { usePatientStore } from '../../../store/patientStore'

const navigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => navigate }
})

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

describe('PatientTopBar', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  it('navigates to the profile page from the account menu', () => {
    render(<PatientTopBar />)

    fireEvent.click(screen.getByRole('button', { name: /Paciente/ }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Ver perfil' }))

    expect(navigate).toHaveBeenCalledWith('/paciente/perfil')
  })

  it('shows a farewell toast and returns to the public site when logging out', () => {
    render(<PatientTopBar />)

    fireEvent.click(screen.getByRole('button', { name: /Paciente/ }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Cerrar sesión' }))

    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Hasta pronto,'))
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
