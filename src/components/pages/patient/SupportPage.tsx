import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { HelpCircle, Mail, MessageSquare, Phone } from 'lucide-react'
import { ActionButton } from '../../atoms/Button'
import { PageHeader } from '../../molecules/patient/PageHeader'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'

const channels = [
  { icon: Phone, title: 'Teléfono', line1: '900 123 456', line2: 'Gratuito · Lun-Vie 8h-20h' },
  { icon: MessageSquare, title: 'Chat en vivo', line1: 'Disponible ahora', line2: 'Tiempo de espera: ~2 min' },
  { icon: Mail, title: 'Correo electrónico', line1: 'soporte@eumedical.es', line2: 'Respuesta en 24h' },
  { icon: HelpCircle, title: 'Centro de ayuda', line1: 'Preguntas frecuentes', line2: 'Artículos y guías' },
]

const inputClasses =
  'w-full px-3.5 py-3 rounded-xl border-[1.5px] border-mist bg-white font-body text-base text-ink focus:border-sage-deep focus:outline-none'

export function SupportPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  useDocumentTitle('Soporte')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    toast.success('Mensaje enviado. Te responderemos pronto.')
    setSubject('')
    setMessage('')
  }

  return (
    <section>
      <PageHeader title="Soporte" subtitle="Canales de atención al paciente" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 mb-6">
        {channels.map((channel) => (
          <div key={channel.title} className="bg-white rounded-2xl border border-mist p-5.5 flex items-start gap-4">
            <span className="w-11 h-11 rounded-full bg-cloud flex items-center justify-center text-navy flex-none">
              <channel.icon size={19} />
            </span>
            <div>
              <h3 className="font-semibold text-navy">{channel.title}</h3>
              <p className="text-sm text-navy/90 mt-0.5">{channel.line1}</p>
              <p className="text-xs text-slate mt-0.5">{channel.line2}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-mist p-6">
        <h3 className="text-xl mb-1">Enviar un mensaje</h3>
        <p className="text-sm text-slate mb-5">Responderemos en menos de 24 horas en días laborables.</p>
        <div className="mb-4">
          <label htmlFor="support-subject" className="block font-label text-sm text-navy mb-1.5">
            Asunto
          </label>
          <input
            id="support-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Describe brevemente tu consulta"
            className={inputClasses}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="support-message" className="block font-label text-sm text-navy mb-1.5">
            Mensaje
          </label>
          <textarea
            id="support-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            rows={5}
            className={inputClasses}
            required
          />
        </div>
        <ActionButton type="submit" variant="dark">
          Enviar mensaje
        </ActionButton>
      </form>
    </section>
  )
}
