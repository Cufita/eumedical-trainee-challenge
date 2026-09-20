import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('renders the primary navigation links', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Capacidades' })).toHaveAttribute('href', '#capacidades')
    expect(screen.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '#servicios')
    expect(screen.getByRole('link', { name: 'Nosotros' })).toHaveAttribute('href', '#nosotros')
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '#contacto')
  })

  it('links "Área paciente" to the patient area route', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Área paciente' })).toHaveAttribute('href', '/paciente')
  })

  it('toggles the mobile menu button state on click', () => {
    renderHeader()
    const burger = screen.getByRole('button', { name: 'Abrir menú' })
    expect(burger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'false')
  })
})
