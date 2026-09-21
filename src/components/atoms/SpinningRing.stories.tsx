import type { Meta, StoryObj } from '@storybook/react-vite'
import { SpinningRing } from './SpinningRing'

const meta: Meta<typeof SpinningRing> = {
  title: 'Patient/Atoms/SpinningRing',
  component: SpinningRing,
  decorators: [
    (Story) => (
      <div className="group relative grid h-48 w-48 place-items-center rounded-full bg-navy text-white">
        Hover me
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SpinningRing>

export const Default: Story = {
  args: {
    items: ['ES', 'EN', 'FR', 'DE', 'PT'],
    radius: 70,
  },
}
