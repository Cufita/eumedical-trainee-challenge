import { expect, test } from '@playwright/test'

test('public site renders the hero section', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('banner')).toBeVisible()
})

test('patient can browse to appointments and switch to the history tab', async ({ page }) => {
  await page.goto('/paciente')
  await expect(page.getByRole('heading', { name: 'Buenos días, María' })).toBeVisible()
  await expect(page.getByText('Próximas consultas')).toBeVisible()

  await page.getByRole('link', { name: 'Consultas' }).click()
  await expect(page.getByRole('heading', { name: 'Consultas' })).toBeVisible()

  await page.getByRole('tab', { name: 'Historial' }).click()
  await expect(page.getByRole('tab', { name: 'Historial', selected: true })).toBeVisible()
  await expect(page.getByText('Dra. Elena Blanco')).toBeVisible()
})
