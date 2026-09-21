import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PatientShellTemplate } from './PatientShellTemplate'
import { DashboardPage } from '../../pages/patient/DashboardPage'

const meta: Meta<typeof PatientShellTemplate> = {
  title: 'Patient/Templates/PatientShellTemplate',
  component: PatientShellTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/paciente']}>
        <Routes>
          <Route path="/paciente" element={<Story />}>
            <Route index element={<DashboardPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PatientShellTemplate>

export const Default: Story = {}
