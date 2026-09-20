import { useEffect, useRef, type ReactNode } from 'react'
import { annotate, type RoughAnnotationType } from 'rough-notation'

interface HighlighterProps {
  children: ReactNode
  action?: RoughAnnotationType
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  className?: string
}

/**
 * Hand-drawn annotation stroke (rough-notation) that draws itself in once the
 * text scrolls into view. Mirrors magicui.design's Highlighter component.
 * `color` is a literal (not a CSS var) since rough-notation sets it as a raw
 * SVG stroke attribute.
 */
export function Highlighter({
  children,
  action = 'underline',
  color = '#e79f1a',
  strokeWidth = 2.5,
  animationDuration = 850,
  iterations = 2,
  padding = 4,
  className = '',
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const annotation = annotate(node, {
      type: action,
      color,
      strokeWidth,
      animationDuration: reduced ? 0 : animationDuration,
      iterations,
      padding,
      multiline: true,
    })

    if (reduced) {
      annotation.show()
      return () => annotation.remove()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          annotation.show()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      annotation.remove()
    }
  }, [action, color, strokeWidth, animationDuration, iterations, padding])

  return (
    <span ref={ref} className={`relative inline ${className}`.trim()}>
      {children}
    </span>
  )
}
