import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('shows a 404 page for an unknown top-level route', () => {
    render(
      <MemoryRouter initialEntries={['/no-existe']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('Esta página no existe')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })

  it('shows a 404 page (with patient chrome) for an unknown route under /paciente', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente/no-existe']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText('Esta página no existe')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/paciente')
    expect(screen.getByRole('navigation', { name: 'Navegación del área paciente' })).toBeInTheDocument()
  })
})
