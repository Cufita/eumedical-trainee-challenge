import type { ReactNode } from 'react'

export function SectionHead({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-[640px] mb-12 ${className}`.trim()}>
      <p className="font-label text-[0.98rem] text-sage-deep">{eyebrow}</p>
      <h2 className="text-[clamp(1.7rem,2.6vw,2.3rem)] mt-2.5">{title}</h2>
      {children && <p className="text-[#3c4c55] mt-3.5 text-[1.05rem]">{children}</p>}
    </div>
  )
}
