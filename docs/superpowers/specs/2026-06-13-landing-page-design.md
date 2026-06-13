# Portfolio Landing Page — Design Spec

Date: 2026-06-13
Status: awaiting user approval
Scope: landing page only (v1). Project detail pages, blog post pages, about/contact pages are later phases.

## Overview

Rebuild of a Framer-agency-style landing page layout (structural reference: downloaded Digcy site export in this directory) as a new Astro site for Opeyemi Ajagbe's portfolio. All content, imagery, and branding are Opeyemi's own, sourced from the existing portfolio at opeyemi.app. Light theme primary.

## Goals

- Landing page with the reference site's layout structure and motion caliber
- Content managed via Astro markdown content collections
- GSAP-driven scroll animation; three.js hero accent
- Lighthouse 95+ on all categories

## Non-goals (v1)

- Project case-study detail pages (cards link to stubs)
- Blog post pages (teaser links to stubs)
- CMS integration, contact form backend, analytics

## Hard constraints (legal)

- NO assets, imagery, illustrations, copy text, logo, or name from the Digcy site
- Layout structure, palette values, type scale, spacing rhythm: replicated (style parameters, not protected expression)
- Fonts: Inter + Fragment Mono — both OFL-licensed, self-hosted via Fontsource. Same families the reference uses, independently licensed

## Stack

- Astro 5 + TypeScript, static output
- GSAP + ScrollTrigger (plain ES modules, no UI framework)
- three.js (hero background only, lazy-loaded)
- Lenis smooth scroll
- @fontsource-variable/inter, @fontsource/fragment-mono
- No React/Vue/Svelte. Zero framework runtime

## Project location

New directory inside the main project folder: `~/Documents/Projects/opeyemi-app/portfolio` (git-initialized). The downloaded reference export files in `~/Documents/Projects/opeyemi-app/` (root HTML files, `industries/`, `blog/`, `work/`, `services/`, `legal/`) stay untouched as visual reference.

## Structure

```
src/
  components/
    Nav.astro            sticky pill nav, blur bg
    Marquee.astro        infinite ticker strip
    sections/
      Hero.astro
      Projects.astro
      Success.astro
      BlogTeaser.astro
      ContactCTA.astro   includes footer
  content/
    projects/            5 entries (md + frontmatter)
    testimonials/        7 entries
    blog/                3 entries
    config.ts            zod schemas
  scripts/
    animations.ts        GSAP timelines + ScrollTrigger setup
    hero-bg.ts           three.js particle field
    smooth-scroll.ts     Lenis init
  styles/
    tokens.css           custom properties below
    global.css
  pages/
    index.astro
```

## Design tokens (light primary)

| Token | Value |
|---|---|
| `--bg` | `#f5f5f5` |
| `--surface` | `#ffffff` |
| `--ink` | `#0a0a0a` |
| `--ink-2` | `#666666` |
| `--dark-bg` | `#0a0a0a` (contrast sections) |
| `--dark-surface` | `#161616` |
| `--dark-ink-2` | `#999999` |
| `--accent` | `#FB9826` (orange) |
| `--accent-2` | `#0099FF` (blue) |
| `--radius-card` | `18px` |
| `--radius-pill` | `999px` |

Type: Inter (display + body, tight letter-spacing on display sizes), Fragment Mono (eyebrows, labels, tickers — uppercase, letter-spaced). Display scale fluid via `clamp()`.

Accessibility note: orange `#FB9826` on light fails AA for text — use darkened `#d97c10` for text-on-light; reserve `#FB9826` for fills with dark text and dark-section accents.

## Sections (top → bottom)

1. **Nav** — sticky, centered pill, `rgba(255,255,255,.75)` + `backdrop-filter: blur`, links: Work / About / Blog, dark "Let's Talk" pill CTA
2. **Hero** — full viewport, centered. Mono eyebrow "SENIOR PRODUCT DESIGNER — 9+ YEARS", oversized Inter headline (working copy: "Designing digital experiences that feel intuitive & alive"), sub-line listing sectors, pill CTA scrolling to Projects. three.js canvas behind text
3. **Marquee** — white strip, mono uppercase ticker of disciplines, infinite GSAP loop, pauses on `prefers-reduced-motion`
4. **Projects** — "Projects." heading. 5 cards: Taming the Fintech Monster (featured, full-width), Hotel Entertainment Hub, PhoneCash, FlatMagic, UX Buddy. White cards, 18px radius, soft shadow. Hover: lift + image parallax. Scroll: staggered reveal
5. **Success** — dark contrast section. Testimonial cards (`#161616`) in horizontal drag/scroll row, 7 entries. Logo strip below: Kobo360, Hydrogen Pay, ggCircuit — dim → bright on hover
6. **Blog teaser** — "Newest insights." 3 rows (title + arrow), border-separated list. Entries: The Pursuit of Knowledge, The Joy of Creation, Building UX Buddy story
7. **ContactCTA** — dark section. Oversized "Let's Talk", orange email pill (magnetic hover), socials row: LinkedIn, Dribbble, GitHub, Figma, Uxcel

## Motion spec

- Headings: line-split staggered reveal on scroll-in (GSAP SplitText alternative: manual line wrapping — SplitText is Club GSAP; use free `split-type` package)
- Cards/blocks: opacity + y-translate stagger, `once: true`
- Marquee: seamless infinite x-loop
- Magnetic hover on CTA pills (cursor proximity translate)
- Lenis smooth scroll synced to ScrollTrigger
- All motion gated behind `prefers-reduced-motion: reduce` → static fallbacks

## three.js hero spec

- Particle field (~2-4k points), dark particles on light bg, orange/blue accent tint mix
- Mouse-reactive: pointer displaces nearby particles (lerped)
- Lazy: dynamic `import()` after first paint + IntersectionObserver on hero
- Fallbacks: WebGL unavailable or reduced-motion → static radial-gradient CSS (already designed)
- Budget: hero JS < 150KB gzipped, 60fps on mid-range laptop, paused when hero off-screen

## Content collections

```ts
projects: { title, summary, client?, role, year, cover (image), tags[], order, draft }
testimonials: { author, role, company?, avatar?, order }   // body = quote
blog: { title, description, pubDate, cover?, draft }
```

Initial entries ported from opeyemi.app bundle content (user's own material). Cover images: user supplies own screenshots; build uses `astro:assets` optimization.

## Error handling

- Missing cover image → typographic placeholder card variant
- three.js init failure → caught, CSS fallback stays, no console spam
- Empty collection → section renders nothing (no broken empty shells)

## Verification

- `astro build` + `astro check` clean
- Lighthouse (mobile + desktop) ≥ 95 all categories
- Manual: reduced-motion mode, WebGL-disabled mode, 360px–1440px responsive sweep
- Visual compare against reference export for layout fidelity

## Open items

- Final hero headline copy (working copy above; user confirms)
- Contact email address (assumed hello@opeyemi.app — confirm)
- Project cover images need supplying before launch
