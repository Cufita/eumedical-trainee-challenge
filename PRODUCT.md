# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite, componentized under `src/` (atomic-design layout: atoms/molecules/organisms/templates/pages), with react-router-dom for routing, zustand for patient-area state, Tailwind v4 for styling, and eslint/vitest/playwright/storybook for quality tooling — this is the delivered challenge submission. `design-reference.html` at the repo root is kept as the original static HTML/CSS design (the audited baseline before componentization) for historical reference only; it is not part of the running app.

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

- Part A (public site, route `/`): responsive header/nav, hero, capabilities, services, trust/metrics block (real figures: 90k patients, 250 doctors, 70k prescriptions, 10 specialties, 4.9/5), corporate/coverage section, contact (mock form, no backend), footer.
- Part B (patient area, routes under `/paciente`): Dashboard (next consultation + join-video CTA, quick actions), Consultations (upcoming + history tabs, direct join), Studies/documents (downloadable reports), Prescriptions (active/expired), Profile & support, plus a 404 page for unmatched routes. Sidebar navigation via `react-router-dom`; state (appointments, prescriptions, studies, profile) lives in a typed `zustand` store with mocked fixtures under `src/mocks/`.
- No real backend: contact form, teleconsultation "join" links, and patient-area data are mocked/static — actions that would need one show a clear error/toast instead of failing silently.
- Visual direction is primarily graphic (shapes, cross motif, gradients) plus a simulated live-teleconsult UI chip, since no real Eumedical image library was available. One exception: the "Sobre nosotros" section uses one licensed, representative stock photo of a medical team (Pexels License, credited in code) — used generically to illustrate the kind of team Eumedical coordinates, not presented as Eumedical's own literal staff.

## Brand Commitments

Company name "Eumedical" (lowercase "eumedical" in the logotype lockup). Identity is governed by the existing Brand Book PDF (`docs/brand/BrandBook_EUMEDICAL_LOW.pdf`) and the rules captured in `docs/brand/rules.md` — binding visual authority for any DESIGN.md work; not detailed further here per init scope (palette, type, and component decisions belong in DESIGN.md, not PRODUCT.md).

## Evidence on Hand

- Brand Book: `docs/brand/BrandBook_EUMEDICAL_LOW.pdf`.
- Real content and trust metrics sourced from the live `eumedical.es` site: 90k patients, 250 doctors, 70k prescriptions, 10 specialties, 4.9/5 rating.
- `design-reference.html` is the original audited reference implementation of both surfaces (see README.md sections 1–3 and 5 for design rationale and the Impeccable before/after audit); `src/` is the current, delivered React implementation.
- No real photo library, testimonials, case studies, or press on hand — future work must not fabricate these.

## Product Principles

1. Reflect the real Brand Book faithfully rather than inventing a new visual identity.
2. Differentiate from eumedical.es's current generic template patterns (repeated icon cards, duplicated service blocks) without discarding its real content or proof points.
3. Prioritize the most urgent patient action (joining a live video consultation) as the first visible element of the portal experience.
4. Validate design decisions against real audit tooling (Impeccable anti-pattern detection) rather than subjective taste alone.
5. Never fabricate content, imagery, or data not confirmed by the Brand Book or the live site.

## Accessibility & Inclusion

AA color contrast, visible focus states, `prefers-reduced-motion` support, corrected heading hierarchy, full keyboard navigation, and a skip-link are implemented in the current `src/` React app and must be preserved in future changes.
