import type { CSSProperties } from 'react'

interface CrossProps {
  variant?: 'gold' | 'sage' | 'white'
  size?: number
  className?: string
}

export function Cross({ variant = 'gold', size, className = '' }: CrossProps) {
  const variantClass = variant === 'gold' ? '' : variant
  return (
    <span
      className={`cross ${variantClass} ${className}`.trim()}
      style={size ? ({ '--cross-size': `${size}px` } as CSSProperties) : undefined}
      aria-hidden="true"
    />
  )
}
