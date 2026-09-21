import type { ReactNode } from 'react'

export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
}: {
  leading: ReactNode
  title: string
  subtitle: string
  trailing: ReactNode
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center bg-white border border-mist rounded-2xl px-5 py-4.5 mb-3">
      {leading}
      <div>
        <h3 className="text-[1.05rem] font-semibold mb-0.5 text-navy">{title}</h3>
        <p className="text-sm text-slate">{subtitle}</p>
      </div>
      {trailing}
    </div>
  )
}
