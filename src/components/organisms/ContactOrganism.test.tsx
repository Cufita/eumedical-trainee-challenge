import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '../../i18n'
import { ContactOrganism } from './ContactOrganism'

describe('ContactOrganism', () => {
  it('does not show a confirmation when required fields are left empty', () => {
    render(<ContactOrganism />)
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByRole('status')).toHaveTextContent('')
  })

  it('shows a confirmation and clears the form once all required fields are valid', () => {
    render(<ContactOrganism />)
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'María' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'maria@example.com' } })
    fireEvent.change(screen.getByLabelText('Cuéntanos tu operativa'), {
      target: { value: 'Quisiera más información.' },
    })
    fireEvent.click(screen.getByRole('checkbox'))

    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Gracias, hemos recibido tu solicitud. Te contactaremos en menos de 24h.',
    )
    expect(screen.getByLabelText('Nombre')).toHaveValue('')
  })
})
