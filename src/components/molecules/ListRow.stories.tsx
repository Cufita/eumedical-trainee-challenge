import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListRow } from './ListRow'
import { DotStatus } from '../atoms/DotStatus'
import { Tag } from '../atoms/Tag'
import { AnchorButton } from '../atoms/Button'

const meta: Meta<typeof ListRow> = {
  title: 'Patient/Molecules/ListRow',
  component: ListRow,
}

export default meta
type Story = StoryObj<typeof ListRow>

export const UpcomingAppointment: Story = {
  args: {
    leading: <DotStatus />,
    title: 'Dra. Laura Ibáñez · Cardiología',
    subtitle: 'Hoy, 17:30 · Videoconsulta',
    trailing: (
      <AnchorButton href="#" variant="gold" className="px-4.5! py-2.5! text-sm!">
        Unirse
      </AnchorButton>
    ),
  },
}

export const PastAppointment: Story = {
  args: {
    leading: <DotStatus past />,
    title: 'Dr. Marcos Vidal · Medicina general',
    subtitle: '12 mar 2026, 10:00',
    trailing: <Tag>Ver resumen</Tag>,
  },
}
