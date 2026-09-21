import { afterEach, describe, expect, it } from 'vitest'
import i18n, { STORAGE_KEY } from './index'

describe('i18n', () => {
  afterEach(async () => {
    window.localStorage.removeItem(STORAGE_KEY)
    await i18n.changeLanguage('es')
  })

  it('updates <html lang> and persists the choice when the language changes', async () => {
    await i18n.changeLanguage('en')

    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('en')
  })
})
