import toast from 'react-hot-toast'
import { User } from 'lucide-react'
import { ActionButton } from '../../atoms/Button'
import { Tag } from '../../atoms/Tag'
import { PageHeader } from '../../molecules/patient/PageHeader'
import { usePatientStore } from '../../../store/patientStore'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'

const infoFields: { key: keyof ReturnType<typeof usePatientStore.getState>['profile']; label: string }[] = [
  { key: 'birthDateLabel', label: 'Fecha de nacimiento' },
  { key: 'primaryDoctorName', label: 'Médico de cabecera' },
  { key: 'dni', label: 'DNI / NIF' },
  { key: 'healthCenter', label: 'Centro de salud' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'bloodType', label: 'Grupo sanguíneo' },
  { key: 'address', label: 'Dirección' },
  { key: 'insuranceNumber', label: 'Número de seguro' },
]

export function ProfilePage() {
  const profile = usePatientStore((state) => state.profile)
  useDocumentTitle('Perfil')

  return (
    <section>
      <PageHeader title="Perfil" subtitle="Mantené tus datos personales completos y actualizados para una mejor atención." />

      <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span
              className="w-14 h-14 rounded-full bg-sage-pale text-sage-deep flex items-center justify-center"
              aria-hidden="true"
            >
              <User size={24} />
            </span>
            <div>
              <h2 className="text-xl">{profile.fullName}</h2>
              <p className="text-sm text-slate mt-0.5">
                Paciente desde {profile.patientSinceLabel} · N.º {profile.patientNumber}
              </p>
            </div>
          </div>
          <ActionButton variant="outline" className="px-4! py-2.5! text-sm!" onClick={() => toast('Edición de datos próximamente disponible.')}>
            Editar datos
          </ActionButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {infoFields.map((field) => (
            <div key={field.key}>
              <p className="font-label text-xs uppercase text-slate mb-1">{field.label}</p>
              <p className="text-navy">{profile[field.key]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
        <div className="flex justify-between items-start gap-4 mb-5">
          <div>
            <h2 className="text-xl">Cuenta</h2>
            <p className="text-sm text-slate mt-0.5">Configuración de acceso y seguridad</p>
          </div>
          <ActionButton variant="outline" className="px-4! py-2.5! text-sm!" onClick={() => toast('Cambio de contraseña próximamente disponible.')}>
            Cambiar contraseña
          </ActionButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <p className="font-label text-xs uppercase text-slate mb-1">Correo electrónico</p>
            <p className="text-navy">{profile.email}</p>
          </div>
          <div>
            <p className="font-label text-xs uppercase text-slate mb-1">Contraseña</p>
            <p className="text-navy tracking-widest">••••••••••</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h2 className="text-xl">Alergias conocidas</h2>
            <p className="text-sm text-slate mt-0.5">Informar siempre al médico</p>
          </div>
          <ActionButton variant="outline" className="px-4! py-2.5! text-sm!" onClick={() => toast('Edición de alergias próximamente disponible.')}>
            Editar
          </ActionButton>
        </div>
        {profile.allergies.length === 0 ? (
          <p className="text-slate text-sm">Sin alergias registradas.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.allergies.map((allergy) => (
              <Tag key={allergy} variant="warn">
                {allergy}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
