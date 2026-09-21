import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { PatientSidebar } from './PatientSidebar'

const meta: Meta<typeof PatientSidebar> = {
  title: 'Patient/Organisms/PatientSidebar',
  component: PatientSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/paciente/consultas']}>
        <div className="h-screen w-64">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PatientSidebar>

export const Default: Story = {}
