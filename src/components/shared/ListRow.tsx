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
        <p className="text-sm text-[#5a6b73]">{subtitle}</p>
      </div>
      {trailing}
    </div>
  )
}

export function DotStatus({ past = false }: { past?: boolean }) {
  return <span className={`w-2.5 h-2.5 rounded-full flex-none ${past ? 'bg-[#b9c2c6]' : 'bg-sage-deep'}`} />
}

export function Tag({ warn = false, children }: { warn?: boolean; children: ReactNode }) {
  return (
    <span
      className={`font-label text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
        warn ? 'bg-[#fbe8c4] text-[#8a5f04]' : 'bg-mist text-sage-deep'
      }`}
    >
      {children}
    </span>
  )
}
