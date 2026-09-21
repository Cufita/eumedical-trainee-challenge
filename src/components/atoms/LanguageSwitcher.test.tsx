import { afterEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '../../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { STORAGE_KEY } from '../../i18n'

describe('LanguageSwitcher', () => {
  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY)
  })

  it('renders in Spanish by default, offering to switch to English', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Cambiar a inglés')
  })

  it('persists the chosen language and disables itself while the reload is pending', () => {
    render(<LanguageSwitcher />)
    const toggle = screen.getByRole('switch')

    fireEvent.click(toggle)

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('en')
    expect(toggle).toBeDisabled()
  })
})
