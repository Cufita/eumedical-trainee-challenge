import type { Meta, StoryObj } from '@storybook/react-vite'
import { DotStatus } from './DotStatus'

const meta: Meta<typeof DotStatus> = {
  title: 'Patient/Atoms/DotStatus',
  component: DotStatus,
}

export default meta
type Story = StoryObj<typeof DotStatus>

export const Upcoming: Story = {
  args: {
    past: false,
  },
}

export const Past: Story = {
  args: {
    past: true,
  },
}
