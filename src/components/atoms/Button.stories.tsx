import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ActionButton, AnchorButton, LinkButton } from './Button'

const meta: Meta = {
  title: 'Patient/Atoms/Button',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta

export const Action: StoryObj<typeof ActionButton> = {
  render: (args) => <ActionButton {...args} />,
  args: {
    children: 'Unirse a la videoconsulta',
    variant: 'gold',
  },
}

export const Anchor: StoryObj<typeof AnchorButton> = {
  render: (args) => <AnchorButton {...args} />,
  args: {
    href: '#',
    children: 'Unirse',
    variant: 'gold',
  },
}

export const RouterLink: StoryObj<typeof LinkButton> = {
  render: (args) => <LinkButton {...args} />,
  args: {
    to: '/paciente/consultas',
    children: 'Reservar cita',
  },
}
