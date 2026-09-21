import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('disables both arrows when there is only one page', () => {
    render(<Pagination page={1} pageSize={10} totalItems={10} itemLabel="items" onPageChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Página siguiente' })).toBeDisabled()
  })

  it('navigates to the previous, next, and a specific page', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={2} pageSize={10} totalItems={30} itemLabel="items" onPageChange={onPageChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Página anterior' }))
    expect(onPageChange).toHaveBeenCalledWith(1)

    fireEvent.click(screen.getByRole('button', { name: 'Página siguiente' }))
    expect(onPageChange).toHaveBeenCalledWith(3)

    fireEvent.click(screen.getByRole('button', { name: '3' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})
