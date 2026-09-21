import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap justify-between items-end gap-5 mb-7.5">
      <div>
        {eyebrow && <p className="font-label text-[0.95rem] text-slate mb-1">{eyebrow}</p>}
        <h1 className="text-[1.7rem]">{title}</h1>
        {subtitle && <p className="text-slate mt-1.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
