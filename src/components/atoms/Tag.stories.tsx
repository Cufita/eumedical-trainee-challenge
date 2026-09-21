import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Patient/Atoms/Tag',
  component: Tag,
}

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    children: 'Confirmada',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warn',
    children: 'Caducada',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Activa',
  },
}
