import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Contact } from './Contact'

describe('Contact form', () => {
  it('does not show a confirmation when required fields are left empty', () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getByRole('status')).toHaveTextContent('')
  })

  it('shows a confirmation and clears the form once all required fields are valid', () => {
    render(<Contact />)
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'María' } })
    fireEvent.change(screen.getByLabelText('Apellidos'), { target: { value: 'Gómez' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'maria@example.com' } })
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Quisiera más información.' } })

    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Gracias, hemos recibido tu mensaje (simulación — sin backend real).',
    )
    expect(screen.getByLabelText('Nombre')).toHaveValue('')
  })
})
