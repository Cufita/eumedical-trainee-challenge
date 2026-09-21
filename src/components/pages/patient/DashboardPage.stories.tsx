import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'

const meta: Meta<typeof DashboardPage> = {
  title: 'Patient/Pages/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DashboardPage>

export const Default: Story = {}
