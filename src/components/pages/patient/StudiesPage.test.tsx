import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import toast from 'react-hot-toast'
import { StudiesPage } from './StudiesPage'
import { usePatientStore } from '../../../store/patientStore'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

describe('StudiesPage', () => {
  const initialState = usePatientStore.getState()

  afterEach(() => {
    usePatientStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  it('shows a friendly error instead of following the stub download link', () => {
    render(<StudiesPage />)

    fireEvent.click(screen.getByRole('link', { name: 'Descargar Radiografía de Tórax AP' }))

    expect(toast.error).toHaveBeenCalledWith(
      'No se pudo descargar "Radiografía de Tórax AP": no hay un archivo real disponible en esta demo.',
    )
  })
})
