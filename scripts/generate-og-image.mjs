// One-off generator for public/og-image.png from scripts/og-image/template.html.
// Not wired into the build — the template is brand tokens + the real favicon
// mark, no photography, so there's nothing to regenerate unless the brand
// tokens change. Run manually with: node scripts/generate-og-image.mjs
import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const templatePath = path.join(dirname, 'og-image', 'template.html')
const outputPath = path.join(dirname, '..', 'public', 'og-image.png')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(`file://${templatePath}`)
await page.waitForTimeout(300) // let the web font finish loading
await page.screenshot({ path: outputPath })
await browser.close()

console.log(`Wrote ${outputPath}`)
