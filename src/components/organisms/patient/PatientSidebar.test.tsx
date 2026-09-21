import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../../App'

// Lazy-loaded chunks (App.tsx) stack on top of PatientShellTemplate's ~500ms
// simulated load, so the default 1000ms findBy timeout can be too tight.
const FIND_OPTIONS = { timeout: 5000 }

describe('Patient area sidebar navigation', () => {
  it('starts on the dashboard panel', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByRole('heading', { name: 'Buenos días, María' }, FIND_OPTIONS)).toBeInTheDocument()
    expect(screen.getByText('Próximas consultas')).toBeInTheDocument()
  })

  it('switches to the Consultas panel when its nav item is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    fireEvent.click(await screen.findByRole('link', { name: 'Consultas' }, FIND_OPTIONS))
    expect(await screen.findByRole('heading', { name: 'Consultas' }, FIND_OPTIONS)).toBeInTheDocument()
    expect(screen.getByText('Gestiona tus consultas médicas')).toBeInTheDocument()
  })

  it('switches to the Recetas panel when its nav item is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    fireEvent.click(await screen.findByRole('link', { name: 'Recetas' }, FIND_OPTIONS))
    expect(await screen.findByRole('heading', { name: 'Recetas y medicación' }, FIND_OPTIONS)).toBeInTheDocument()
    expect(screen.getByText('Prescripciones y tratamientos')).toBeInTheDocument()
  })
})
