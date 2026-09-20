# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Currently a single self-contained `index.html` (no build step, no framework) — the delivered challenge submission. A React + TypeScript + Vite scaffold already exists under `src/` (with eslint, vitest, playwright, tailwindcss, react-router-dom, zustand, etc. pre-installed) but is still unused default Vite boilerplate. Decision: migrate the design in `index.html` into that `src/` scaffold as the basis for a real product build-out (in progress).

## Users

- Prospective and international patients evaluating Eumedical's telemedicine services on the public marketing site — people in any of 80+ countries considering 24/7 teleconsultation or at-home doctor visits.
- Enrolled patients using the patient portal to join video consultations, review consultation history, download documents/reports, manage prescriptions (active/expired, pharmacy QR), and manage profile/support.
- B2B partners (e.g. insurers, employers, healthcare partners) as a secondary audience for the public site's positioning and trust signals.

## Product Purpose

Eumedical is a digital health / telemedicine company operating its own private medical network, offering 24/7 teleconsultation and at-home doctor visits across 80+ countries, for both individual (often international) patients and B2B partners. This repo delivers two rebuilt surfaces: (A) a redesigned public marketing site communicating capabilities, services, trust metrics, coverage, and contact, and (B) a functional patient-area prototype for managing consultations, history, documents, prescriptions, and support. Success is a rebrand faithful to the real Brand Book that avoids the current eumedical.es site's generic template patterns, validated with a real Impeccable anti-pattern audit rather than subjective judgment alone.

## Positioning

Eumedical owns its own private medical network (not a marketplace/aggregator), combining 24/7 teleconsultation with at-home doctor visits at a scale of 80+ countries — a mechanism and reach claim a template-based telehealth competitor could not truthfully copy.

## Operating Context

This repo is the deliverable for the **Eumedical Frontend & UX Trainee Challenge**, a hiring/recruitment exercise — the repo doubles as a job-application artifact, not just a product codebase. It is evaluated against the canonical Brand Book PDF in `docs/brand/BrandBook_EUMEDICAL_LOW.pdf` and the live `eumedical.es` site's actual content and stats.

The repo also ships a starter `package.json` with intentional bugs (React 19 vs ReactDOM 18 major-version mismatch, missing `terser`, `@types/node` ahead of the `engines.node` target, a non-cross-platform `build:dev` script) that were diagnosed and corrected as part of the challenge; the fixes and the documented-but-unresolved risks (Twilio Programmable Video EOL Dec 2026, private `@eumedical/shared` scoped package, `@tanstack/react-query`/devtools version skew) are real constraints on any future build-out — see README.md section 4.

## Capabilities and Constraints

- Part A (public site, in `index.html`): responsive header/nav, hero, capabilities, services, trust/metrics block (real figures: 90k patients, 250 doctors, 70k prescriptions, 10 specialties, 4.9/5), corporate/coverage section, contact (mock form, no backend), footer.
- Part B (patient area, in `index.html`): Dashboard (next consultation + join-video CTA, quick actions), Consultations (upcoming + brief history, direct join), History, Documents (downloadable reports), Prescriptions (active/expired + empty state guiding pharmacy QR generation), Profile & support. Six-section sidebar always visible; view is toggled with plain JS show/hide (no router) in the current prototype.
- No real backend: contact form and patient-area data are mocked/static.
- Visual direction is primarily graphic (shapes, cross motif, gradients) plus a simulated live-teleconsult UI chip, since no real Eumedical image library was available. One exception: the "Sobre nosotros" section uses one licensed, representative stock photo of a medical team (Pexels License, credited in code) — used generically to illustrate the kind of team Eumedical coordinates, not presented as Eumedical's own literal staff.
- In progress: componentizing `index.html` into `src/` as a real React + TypeScript app, replacing the JS toggle with `react-router-dom` routing and mocked data with typed fixtures behind a `zustand` store.

## Brand Commitments

Company name "Eumedical" (lowercase "eumedical" in the logotype lockup). Identity is governed by the existing Brand Book PDF (`docs/brand/BrandBook_EUMEDICAL_LOW.pdf`) and the rules captured in `docs/brand/rules.md` — binding visual authority for any DESIGN.md work; not detailed further here per init scope (palette, type, and component decisions belong in DESIGN.md, not PRODUCT.md).

## Evidence on Hand

- Brand Book: `docs/brand/BrandBook_EUMEDICAL_LOW.pdf`.
- Real content and trust metrics sourced from the live `eumedical.es` site: 90k patients, 250 doctors, 70k prescriptions, 10 specialties, 4.9/5 rating.
- `index.html` is the audited reference implementation of both surfaces (see README.md sections 1–3 and 5 for design rationale and the Impeccable before/after audit).
- No real photo library, testimonials, case studies, or press on hand — future work must not fabricate these.

## Product Principles

1. Reflect the real Brand Book faithfully rather than inventing a new visual identity.
2. Differentiate from eumedical.es's current generic template patterns (repeated icon cards, duplicated service blocks) without discarding its real content or proof points.
3. Prioritize the most urgent patient action (joining a live video consultation) as the first visible element of the portal experience.
4. Validate design decisions against real audit tooling (Impeccable anti-pattern detection) rather than subjective taste alone.
5. Never fabricate content, imagery, or data not confirmed by the Brand Book or the live site.

## Accessibility & Inclusion

AA color contrast, visible focus states, `prefers-reduced-motion` support, corrected heading hierarchy, full keyboard navigation, and a skip-link are already implemented in `index.html` and must be preserved (not regressed) in the React componentization.
