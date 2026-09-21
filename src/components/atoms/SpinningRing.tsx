import type { CSSProperties } from 'react'

interface SpinningRingProps {
  items: string[]
  radius?: number
  duration?: number
  reverse?: boolean
  fontSize?: number
  className?: string
}

/**
 * Orbiting ring of tokens (flags, words) that spins continuously while its
 * `.group` ancestor is hovered. Inspired by magicui.design's Spinning Text.
 */
export function SpinningRing({
  items,
  radius = 60,
  duration = 16,
  reverse = false,
  fontSize = 11,
  className = '',
}: SpinningRingProps) {
  const total = items.length

  return (
    <div className={`spinning-ring ${className}`.trim()} aria-hidden="true">
      <div
        className="spinning-ring-track"
        style={
          {
            '--spin-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as CSSProperties
        }
      >
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="spinning-ring-item"
            style={
              {
                '--angle': `${(360 / total) * index}deg`,
                '--radius': `${radius}px`,
                fontSize,
              } as CSSProperties
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
