import type { ReactNode } from 'react'

export type TagVariant = 'neutral' | 'warn' | 'success'

const variantClasses: Record<TagVariant, string> = {
  neutral: 'bg-mist text-sage-deep',
  warn: 'bg-warn-bg text-warn-text',
  success: 'bg-success-bg text-success-text',
}

export function Tag({ variant = 'neutral', children }: { variant?: TagVariant; children: ReactNode }) {
  return (
    <span className={`font-label text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
