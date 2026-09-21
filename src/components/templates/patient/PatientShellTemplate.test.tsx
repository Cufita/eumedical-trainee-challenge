import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PatientShellTemplate } from './PatientShellTemplate'

describe('PatientShellTemplate', () => {
  it('shows a loading skeleton first, then the patient shell', async () => {
    render(
      <MemoryRouter initialEntries={['/paciente']}>
        <Routes>
          <Route path="/paciente" element={<PatientShellTemplate />}>
            <Route index element={<div>Contenido del panel</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('status', { name: 'Cargando' })).toBeInTheDocument()

    expect(await screen.findByText('Contenido del panel', {}, { timeout: 5000 })).toBeInTheDocument()
    expect(screen.queryByRole('status', { name: 'Cargando' })).not.toBeInTheDocument()
  })
})
