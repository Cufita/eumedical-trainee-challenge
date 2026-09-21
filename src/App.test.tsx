import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Lazy-loaded chunks (App.tsx) stack on top of PatientShellTemplate's ~500ms
// simulated load, so the default 1000ms findBy timeout can be too tight.
const FIND_OPTIONS = { timeout: 5000 }

describe('App routing', () => {
  it('shows a 404 page for an unknown top-level route', async () => {
    render(
      <MemoryRouter initialEntries={['/no-existe']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText('Esta página no existe', {}, FIND_OPTIONS)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })

  it('shows a 404 page (with patient chrome) for an unknown route under /paciente', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente/no-existe']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText('Esta página no existe', {}, FIND_OPTIONS)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/paciente')
    expect(screen.getByRole('navigation', { name: 'Navegación del área paciente' })).toBeInTheDocument()
  })
})
