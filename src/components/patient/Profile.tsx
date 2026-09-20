import { Cross } from '../shared/Cross'
import { ListRow, Tag } from '../shared/ListRow'
import { usePatientStore } from '../../store/patientStore'

const inputClasses =
  'w-full px-3.5 py-3.5 rounded-xl border-[1.5px] border-sage-pale bg-white font-body text-base text-ink focus:border-sage-deep focus:outline-none'

const fields: { key: 'fullName' | 'email' | 'phone' | 'language'; label: string; id: string }[] = [
  { key: 'fullName', label: 'Nombre completo', id: 'p-name' },
  { key: 'email', label: 'Email', id: 'p-email' },
  { key: 'phone', label: 'Teléfono', id: 'p-phone' },
  { key: 'language', label: 'Idioma preferido', id: 'p-lang' },
]

export function Profile() {
  const profile = usePatientStore((state) => state.profile)

  return (
    <section>
      <div className="mb-4">
        <p className="font-label text-[0.98rem] text-sage-deep">PERFIL</p>
        <h2 className="text-2xl mt-2">Tus datos</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-label text-sm text-navy mb-1.5">
              {field.label}
            </label>
            <input id={field.id} defaultValue={profile[field.key]} className={inputClasses} />
          </div>
        ))}
      </div>

      <div className="mt-8 mb-4">
        <h2 className="text-2xl">Soporte</h2>
      </div>
      <ListRow
        leading={<Cross />}
        title="Central operativa médica 24/7"
        subtitle="business@eumedical.es · +34 919 22 78 10"
        trailing={<Tag>Disponible</Tag>}
      />
    </section>
  )
}
