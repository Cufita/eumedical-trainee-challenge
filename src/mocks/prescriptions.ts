import type { Prescription } from './types'

export const prescriptions: Prescription[] = [
  {
    id: 'rx-1',
    name: 'Amoxicilina 500mg',
    prescribedLabel: '3 sept 2026',
    prescribedBy: 'Dra. Martínez',
    status: 'active',
  },
  {
    id: 'rx-2',
    name: 'Loratadina 10mg',
    prescribedLabel: '18 jul 2026',
    prescribedBy: 'Dr. Rossi',
    status: 'expired',
  },
]
