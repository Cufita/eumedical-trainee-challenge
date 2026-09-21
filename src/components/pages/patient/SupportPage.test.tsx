import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import toast from 'react-hot-toast'
import { SupportPage } from './SupportPage'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

describe('SupportPage', () => {
  it('lists the support channels', () => {
    render(<SupportPage />)

    expect(screen.getByText('Teléfono')).toBeInTheDocument()
    expect(screen.getByText('Chat en vivo')).toBeInTheDocument()
    expect(screen.getByText('soporte@eumedical.es')).toBeInTheDocument()
    expect(screen.getByText('Centro de ayuda')).toBeInTheDocument()
  })

  it('requires a subject and a message before it can be submitted', () => {
    render(<SupportPage />)

    expect(screen.getByLabelText('Asunto')).toBeRequired()
    expect(screen.getByLabelText('Mensaje')).toBeRequired()
  })

  it('shows a confirmation and clears the form on submit', () => {
    render(<SupportPage />)

    fireEvent.change(screen.getByLabelText('Asunto'), { target: { value: 'Duda sobre mi receta' } })
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: '¿Puedo renovarla online?' } })
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(toast.success).toHaveBeenCalledWith('Mensaje enviado. Te responderemos pronto.')
    expect(screen.getByLabelText('Asunto')).toHaveValue('')
    expect(screen.getByLabelText('Mensaje')).toHaveValue('')
  })
})
