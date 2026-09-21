import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../../App'

describe('Patient area sidebar navigation', () => {
  it('starts on the dashboard panel', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByRole('heading', { name: 'Buenos días, María' })).toBeInTheDocument()
    expect(screen.getByText('Próximas consultas')).toBeInTheDocument()
  })

  it('switches to the Consultas panel when its nav item is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    fireEvent.click(await screen.findByRole('link', { name: 'Consultas' }))
    expect(screen.getByRole('heading', { name: 'Consultas' })).toBeInTheDocument()
    expect(screen.getByText('Gestiona tus consultas médicas')).toBeInTheDocument()
  })

  it('switches to the Recetas panel when its nav item is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    fireEvent.click(await screen.findByRole('link', { name: 'Recetas' }))
    expect(screen.getByRole('heading', { name: 'Recetas y medicación' })).toBeInTheDocument()
    expect(screen.getByText('Prescripciones y tratamientos')).toBeInTheDocument()
  })
})
