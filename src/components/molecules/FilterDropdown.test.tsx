import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { FilterDropdown } from './FilterDropdown'

const options = [
  { value: 'lab', label: 'Laboratorio' },
  { value: 'img', label: 'Imagen' },
]

describe('FilterDropdown', () => {
  it('calls onChange with the selected option value', () => {
    const onChange = vi.fn()
    render(<FilterDropdown label="Tipo" value="" options={options} onChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Tipo: Todos' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Laboratorio' }))

    expect(onChange).toHaveBeenCalledWith('lab')
  })

  it('clears the filter with an empty value when "Todos" is selected', () => {
    const onChange = vi.fn()
    render(<FilterDropdown label="Tipo" value="lab" options={options} onChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Tipo: Laboratorio' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Todos' }))

    expect(onChange).toHaveBeenCalledWith('')
  })
})
