import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../../App'

// Lazy-loaded chunks (App.tsx) stack on top of PatientShellTemplate's ~500ms
// simulated load, and can be slow to resolve under a busy parallel test run —
// give both the query and the test itself real headroom (the test's own
// default 5000ms timeout was racing the findBy timeout 1:1).
const FIND_OPTIONS = { timeout: 10000 }
const TEST_TIMEOUT = 15000

describe('Patient area sidebar navigation', () => {
  it(
    'starts on the dashboard panel',
    async () => {
      render(
        <MemoryRouter initialEntries={['/paciente']}>
          <App />
        </MemoryRouter>,
      )
      expect(await screen.findByRole('heading', { name: 'Buenos días, María' }, FIND_OPTIONS)).toBeInTheDocument()
      expect(screen.getByText('Próximas consultas')).toBeInTheDocument()
    },
    TEST_TIMEOUT,
  )

  it(
    'switches to the Consultas panel when its nav item is clicked',
    async () => {
      render(
        <MemoryRouter initialEntries={['/paciente']}>
          <App />
        </MemoryRouter>,
      )
      fireEvent.click(await screen.findByRole('link', { name: 'Consultas' }, FIND_OPTIONS))
      expect(await screen.findByRole('heading', { name: 'Consultas' }, FIND_OPTIONS)).toBeInTheDocument()
      expect(screen.getByText('Gestiona tus consultas médicas')).toBeInTheDocument()
    },
    TEST_TIMEOUT,
  )

  it(
    'switches to the Recetas panel when its nav item is clicked',
    async () => {
      render(
        <MemoryRouter initialEntries={['/paciente']}>
          <App />
        </MemoryRouter>,
      )
      fireEvent.click(await screen.findByRole('link', { name: 'Recetas' }, FIND_OPTIONS))
      expect(await screen.findByRole('heading', { name: 'Recetas y medicación' }, FIND_OPTIONS)).toBeInTheDocument()
      expect(screen.getByText('Prescripciones y tratamientos')).toBeInTheDocument()
    },
    TEST_TIMEOUT,
  )

  it(
    'switches to the Estudios panel when its nav item is clicked',
    async () => {
      render(
        <MemoryRouter initialEntries={['/paciente']}>
          <App />
        </MemoryRouter>,
      )
      fireEvent.click(await screen.findByRole('link', { name: 'Estudios' }, FIND_OPTIONS))
      expect(await screen.findByRole('heading', { name: 'Estudios' }, FIND_OPTIONS)).toBeInTheDocument()
      expect(screen.getByText('Informes, imágenes y resultados de laboratorio')).toBeInTheDocument()
    },
    TEST_TIMEOUT,
  )

  it(
    'switches to the Perfil panel when its nav item is clicked',
    async () => {
      render(
        <MemoryRouter initialEntries={['/paciente']}>
          <App />
        </MemoryRouter>,
      )
      fireEvent.click(await screen.findByRole('link', { name: 'Perfil' }, FIND_OPTIONS))
      expect(await screen.findByRole('heading', { name: 'Perfil' }, FIND_OPTIONS)).toBeInTheDocument()
    },
    TEST_TIMEOUT,
  )

  it(
    'switches to the Soporte panel when its nav item is clicked',
    async () => {
      render(
        <MemoryRouter initialEntries={['/paciente']}>
          <App />
        </MemoryRouter>,
      )
      fireEvent.click(await screen.findByRole('link', { name: 'Soporte' }, FIND_OPTIONS))
      expect(await screen.findByRole('heading', { name: 'Soporte' }, FIND_OPTIONS)).toBeInTheDocument()
      expect(screen.getByText('Canales de atención al paciente')).toBeInTheDocument()
    },
    TEST_TIMEOUT,
  )

})
