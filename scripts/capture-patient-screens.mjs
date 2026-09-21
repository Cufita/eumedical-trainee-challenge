// One-off script: captures fresh screenshots of the current patient-area
// pages to replace the stale howItWorks step images. Run manually with
// `node scripts/capture-patient-screens.mjs` while `npm run dev` is running
// — not part of the build pipeline.
import { chromium } from '@playwright/test'
import { join } from 'node:path'

const BASE_URL = 'http://localhost:5173'
const OUT_DIR = join(import.meta.dirname, '..', 'src', 'assets', 'patient-app')

// The showcase frame these land in crops with object-cover at roughly a 1.5:1
// aspect ratio, so each page is captured at whatever viewport width makes its
// real content land near that aspect — a plain 2560px-wide capture leaves the
// short dashboard/list content stranded in a sea of empty grey, which reads
// as tiny/zoomed-out once object-cover squashes it to fit. The capture width
// also sets the effective zoom level (how much of the frame the UI fills),
// so tabs of the same page (consultas/historial) must share one width —
// otherwise they end up looking zoomed differently from each other.
// historial and documentos no longer have their own routes: historial is now
// the "Historial" tab on Consultas, and documentos maps to Estudios.
const targets = [
  { path: '/paciente', file: 'dashboard.png', width: 1180 },
  { path: '/paciente/consultas', file: 'consultas.png', width: 1040 },
  { path: '/paciente/consultas', file: 'historial.png', tab: 'Historial', width: 1040 },
  { path: '/paciente/estudios', file: 'documentos.png', width: 1250 },
]

const BOTTOM_PADDING = 32
const DEVICE_SCALE_FACTOR = 2 // captured viewports are narrow; scale up for a crisp output image
// The desktop showcase frame is ~1.45:1. object-cover picks whichever axis
// needs the bigger scale-up to fully cover the frame, so a crop noticeably
// wider than this (short list content, e.g. historial's 3 rows) ends up
// height-bound: it gets scaled up MORE than a well-matched crop, which is
// what reads as "zoomed in" even though the capture width already matches
// its sibling tab. Padding short crops out to this aspect (extra plain page
// background, not real content) keeps every step at the same effective zoom.
const TARGET_ASPECT = 1.45

const browser = await chromium.launch()

for (const target of targets) {
  const page = await browser.newPage({
    viewport: { width: target.width, height: 2400 },
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
  })
  await page.goto(BASE_URL + target.path, { waitUntil: 'networkidle' })
  // Clear the simulated patient-shell loading skeleton (500ms) plus a margin.
  await page.waitForTimeout(900)
  if (target.tab) {
    await page.getByRole('tab', { name: target.tab }).click()
    await page.waitForTimeout(300)
  }

  // The showcase frame around this image already draws its own browser-style
  // header ("app.eumedical.com/paciente"), so skip the in-app top bar. The
  // shell's sidebar+main row is stretched to min-h-screen (its "Soporte /
  // Volver al sitio" links are pinned to the bottom via flexbox), so instead
  // of cropping to that row's full height, crop to the real bottom edge of
  // main's actual content.
  const { top, height } = await page.evaluate(() => {
    const main = document.querySelector('main')
    const shellRow = main.parentElement
    let maxBottom = 0
    main.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.height > 0 && r.bottom > maxBottom) maxBottom = r.bottom
    })
    const top = shellRow.getBoundingClientRect().top + window.scrollY
    return { top, height: maxBottom + window.scrollY - top }
  })

  const clipHeight = Math.max(height + BOTTOM_PADDING, target.width / TARGET_ASPECT)

  const out = join(OUT_DIR, target.file)
  await page.screenshot({
    path: out,
    clip: { x: 0, y: top, width: target.width, height: clipHeight },
  })
  console.log(`Captured ${target.path}${target.tab ? ` (${target.tab})` : ''} -> ${out}`)
  await page.close()
}

await browser.close()
