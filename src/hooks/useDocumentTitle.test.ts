import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useDocumentTitle } from './useDocumentTitle'

describe('useDocumentTitle', () => {
  it('sets the document title with the site name suffix', () => {
    renderHook(() => useDocumentTitle('Consultas'))
    expect(document.title).toBe('Consultas · eumedical')
  })

  it('updates the title when it changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Consultas' },
    })
    expect(document.title).toBe('Consultas · eumedical')

    rerender({ title: 'Recetas' })
    expect(document.title).toBe('Recetas · eumedical')
  })
})
