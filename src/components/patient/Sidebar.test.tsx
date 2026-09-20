import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../App'

describe('Patient area sidebar navigation', () => {
  it('starts on the dashboard panel', () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Hola, María' })).toBeInTheDocument()
    expect(screen.getByText('Accesos rápidos')).toBeInTheDocument()
  })

  it('switches to the Consultas panel when its nav item is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('link', { name: 'Consultas' }))
    expect(screen.getByRole('heading', { name: 'Consultas' })).toBeInTheDocument()
    expect(screen.getByText('Próximas consultas')).toBeInTheDocument()
    expect(screen.queryByText('Accesos rápidos')).not.toBeInTheDocument()
  })

  it('switches to the Recetas panel when its nav item is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <App />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('link', { name: 'Recetas' }))
    expect(screen.getByRole('heading', { name: 'Recetas y prescripciones' })).toBeInTheDocument()
    expect(screen.getByText('Tus prescripciones')).toBeInTheDocument()
  })
})
