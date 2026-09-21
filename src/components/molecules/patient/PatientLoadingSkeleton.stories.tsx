import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientLoadingSkeleton } from './PatientLoadingSkeleton'

const meta: Meta<typeof PatientLoadingSkeleton> = {
  title: 'Patient/Molecules/PatientLoadingSkeleton',
  component: PatientLoadingSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PatientLoadingSkeleton>

export const Default: Story = {}
