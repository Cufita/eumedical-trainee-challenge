import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '../../i18n'
import { PublicHeader } from './PublicHeader'

describe('PublicHeader', () => {
  it('renders the primary navigation links', () => {
    render(<PublicHeader />)
    expect(screen.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '#eu-servicios')
    expect(screen.getByRole('link', { name: 'Cómo funciona' })).toHaveAttribute('href', '#eu-como')
    expect(screen.getByRole('link', { name: 'Cobertura' })).toHaveAttribute('href', '#eu-cobertura')
    expect(screen.getByRole('link', { name: 'Nosotros' })).toHaveAttribute('href', '#eu-nosotros')
  })

  it('links the brand mark back to the top of the page', () => {
    render(<PublicHeader />)
    expect(screen.getByRole('link', { name: 'Eumedical' })).toHaveAttribute('href', '#eu-top')
  })

  it('toggles the mobile menu button state on click', () => {
    render(<PublicHeader />)
    const burger = screen.getByRole('button', { name: 'Abrir menú' })
    expect(burger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(burger)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar menú' }))
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
  })
})
