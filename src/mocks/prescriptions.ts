import type { Prescription } from './types'

export const prescriptions: Prescription[] = [
  {
    id: 'rx-1',
    name: 'Ramipril 5 mg',
    issuedLabel: '18 ago 2026',
    expiresLabel: '18 nov 2026',
    prescribedBy: 'Dr. Alejandro Ruiz',
    status: 'active',
  },
  {
    id: 'rx-2',
    name: 'Atorvastatina 20 mg',
    issuedLabel: '5 jul 2026',
    expiresLabel: '5 ene 2027',
    prescribedBy: 'Dra. Ana Torres',
    status: 'active',
  },
  {
    id: 'rx-3',
    name: 'Omeprazol 20 mg',
    issuedLabel: '12 may 2026',
    expiresLabel: '12 nov 2026',
    prescribedBy: 'Dr. Carlos Martínez',
    status: 'active',
  },
  {
    id: 'rx-4',
    name: 'Metformina 850 mg',
    issuedLabel: '3 ene 2026',
    expiresLabel: '3 jun 2026',
    prescribedBy: 'Dr. Alejandro Ruiz',
    status: 'expired',
  },
]
