# Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the landing page of Opeyemi Ajagbe's portfolio in Astro — Digcy-reference layout structure, light theme, own content — per the approved spec at `docs/superpowers/specs/2026-06-13-landing-page-design.md`.

**Architecture:** Static Astro 5 site, one page (`index.astro`) composed of section components. Content in markdown collections. All interactivity is vanilla TS modules: GSAP + ScrollTrigger for scroll motion, Lenis for smooth scroll, three.js lazy-loaded for the hero particle field. Zero UI-framework runtime.

**Tech Stack:** Astro 5, TypeScript, GSAP, split-type, Lenis, three.js, Fontsource (Inter Variable + Fragment Mono).

**Working directory:** All paths below are relative to `/Users/opeyemiajagbe/Documents/Projects/opeyemi-app/portfolio/` (created in Task 1). The Digcy reference export in the parent folder is read-only reference — never modify it.

**Verification model:** No unit-test framework — this is a static presentational site. Each task verifies via `npx astro check` (types), `npm run build` (collections + output), and the dev server visually. Treat a failing check/build exactly like a failing test: fix before committing.

**Content provenance:** All copy/content in this plan is the user's own material (from opeyemi.app). Hard rule from spec: nothing — assets, copy, name — from the Digcy export. Layout/spacing/palette parameters only.

---

### Task 1: Scaffold project

**Files:**
- Create: `portfolio/` (Astro scaffold)
- Create: `portfolio/docs/superpowers/specs/2026-06-13-landing-page-design.md` (copied)
- Create: `portfolio/docs/superpowers/plans/2026-06-13-portfolio-landing-page.md` (copied)

- [ ] **Step 1: Scaffold Astro (run from `/Users/opeyemiajagbe/Documents/Projects/opeyemi-app`)**

```bash
npm create astro@latest portfolio -- --template minimal --typescript strict --no-install --no-git --yes
cd portfolio
npm install
```

Expected: `portfolio/` exists with `astro.config.mjs`, `src/pages/index.astro`, `tsconfig.json`.

- [ ] **Step 2: Install dependencies**

```bash
npm install gsap lenis split-type three @fontsource-variable/inter @fontsource/fragment-mono
npm install -D @types/three
```

- [ ] **Step 3: Init git and copy docs into the repo**

```bash
git init
mkdir -p docs/superpowers/specs docs/superpowers/plans
cp ../docs/superpowers/specs/2026-06-13-landing-page-design.md docs/superpowers/specs/
cp ../docs/superpowers/plans/2026-06-13-portfolio-landing-page.md docs/superpowers/plans/
```

- [ ] **Step 4: Verify scaffold runs**

```bash
npx astro check && npm run build
```

Expected: 0 errors, `dist/` produced.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with deps, spec, and plan

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens, global styles, base layout

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  /* color */
  --bg: #f5f5f5;
  --surface: #ffffff;
  --ink: #0a0a0a;
  --ink-2: #666666;
  --line: #e2e2e2;
  --dark-bg: #0a0a0a;
  --dark-surface: #161616;
  --dark-ink: #ffffff;
  --dark-ink-2: #999999;
  --dark-line: #1c1c1c;
  --accent: #fb9826;       /* fills only; dark text on top */
  --accent-text: #d97c10;  /* AA-safe orange for text on light bg */
  --accent-2: #0099ff;

  /* shape */
  --radius-card: 18px;
  --radius-pill: 999px;

  /* type */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'Fragment Mono', monospace;
  --text-display: clamp(2.75rem, 8vw, 6.5rem);
  --text-h2: clamp(2rem, 4.5vw, 3.5rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-eyebrow: 0.75rem;

  /* rhythm */
  --space-section: clamp(5rem, 12vh, 9rem);
  --space-gutter: clamp(1.25rem, 4vw, 4rem);
  --container: 80rem;
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-gutter);
}

.section {
  padding-block: var(--space-section);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-text);
}

h1,
h2,
h3 {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.h2 {
  font-size: var(--text-h2);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--radius-pill);
  padding: 0.75rem 1.5rem;
  font-size: var(--text-small);
  font-weight: 600;
  background: var(--ink);
  color: var(--dark-ink);
  cursor: pointer;
  border: 0;
}

.pill--accent {
  background: var(--accent);
  color: var(--ink);
}

.dark-section {
  background: var(--dark-bg);
  color: var(--dark-ink);
}

/* split-type line wrappers must clip for the reveal */
.line {
  overflow: hidden;
}
```

- [ ] **Step 3: Create `src/layouts/Layout.astro`**

```astro
---
import '@fontsource-variable/inter';
import '@fontsource/fragment-mono';
import '../styles/tokens.css';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Opeyemi Ajagbe — Senior Product Designer',
  description = 'Senior Product Designer with 9+ years across Fintech, Logistics, Edu-tech, and E-sport. Design systems, product design, and Figma tooling.',
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

(Script imports for GSAP/Lenis are added in Task 10 — not here, the modules don't exist yet.)

- [ ] **Step 4: Replace `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <main>
    <h1 class="container section">Token check</h1>
  </main>
</Layout>
```

- [ ] **Step 5: Verify**

```bash
npx astro check && npm run build
```

Expected: 0 errors. `npm run dev` → page shows Inter heading on `#f5f5f5`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: design tokens, global styles, base layout

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Content collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/taming-the-fintech-monster.md`
- Create: `src/content/projects/hotel-entertainment-hub.md`
- Create: `src/content/projects/phonecash.md`
- Create: `src/content/projects/flatmagic.md`
- Create: `src/content/projects/ux-buddy.md`
- Create: `src/content/testimonials/tobi-okedeji.md`
- Create: `src/content/testimonials/thompson-edolo.md`
- Create: `src/content/testimonials/joshua-zaporta-cruz.md`
- Create: `src/content/blog/the-pursuit-of-knowledge.md`
- Create: `src/content/blog/the-joy-of-creation.md`
- Create: `src/content/blog/building-ux-buddy.md`

**Content note:** Frontmatter below is seed content ported from the user's existing site. v1 ships 3 testimonials (the three whose quotes are verified); the user adds the remaining ones as `.md` files later — that is a content task, not a code task. `year` and `cover` are optional: user confirms years and supplies cover images before launch; cards render a typographic variant until covers exist.

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      client: z.string().optional(),
      role: z.string(),
      year: z.number().optional(),
      cover: image().optional(),
      tags: z.array(z.string()),
      order: z.number(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, testimonials, blog };
```

- [ ] **Step 2: Create the 5 project entries**

`src/content/projects/taming-the-fintech-monster.md`:

```md
---
title: Taming the Fintech Monster
summary: Poseidon — a unified design system that ended fragmented UX across HydrogenPay's platforms.
client: HydrogenPay
role: Senior Product Designer
tags: [Design System, Fintech]
order: 1
featured: true
---

Atomic-design component library, design tokens, and WCAG-accessible patterns,
built with front-end developers for seamless adoption.
```

`src/content/projects/hotel-entertainment-hub.md`:

```md
---
title: Hotel Entertainment Hub
summary: One intuitive interface for everything a hotel offers — entertainment, bookings, and services in-room.
role: Product Designer
tags: [Product Design, Hospitality]
order: 2
---

Research-driven design consolidating discovery, personalization, and bookings
into a single guest-facing platform.
```

`src/content/projects/phonecash.md`:

```md
---
title: PhoneCash
summary: A mobile money solution making cashless payments accessible across Nigeria — smartphone or feature phone.
role: UX/UI Designer
tags: [Fintech, Mobile]
order: 3
---

End-to-end UX case study: research, personas, USSD + app flows, prototyping,
and iterative usability testing.
```

`src/content/projects/flatmagic.md`:

```md
---
title: FlatMagic
summary: A Figma plugin that flattens complex frame structures into single images with one click.
role: Designer & Developer
tags: [Figma Plugin, Tooling]
order: 4
---

Published on Figma Community. Built for designers who need fast thumbnails
and pixel-faithful design snapshots.
```

`src/content/projects/ux-buddy.md`:

```md
---
title: UX Buddy
summary: AI-powered UX analysis inside Figma — instant, expert-level feedback before the review meeting.
role: Designer & Developer
tags: [Figma Plugin, AI]
order: 5
---

A design co-pilot that critiques hierarchy, spacing, accessibility, and tone —
built from a designer's own frustration with feedback loops.
```

- [ ] **Step 3: Create the 3 testimonial entries**

`src/content/testimonials/tobi-okedeji.md`:

```md
---
author: Tobi Okedeji
role: Design Lead
order: 1
---

I ran UX Buddy before my review — it caught three things I would've missed.
The meeting went so much smoother.
```

`src/content/testimonials/thompson-edolo.md`:

```md
---
author: Thompson Edolo
role: Product Designer
order: 2
---

UX Buddy has become an essential part of my workflow. The feedback is always
thoughtful and professional.
```

`src/content/testimonials/joshua-zaporta-cruz.md`:

```md
---
author: Joshua Zaporta Cruz
role: UX Designer
order: 3
---

This is exactly what I've been looking for. Instant feedback without waiting
for reviews. Game changer!
```

- [ ] **Step 4: Create the 3 blog entries**

`src/content/blog/the-pursuit-of-knowledge.md`:

```md
---
title: The Pursuit of Knowledge
description: On staying a student — certifications, curiosity, and compounding skills as a designer.
pubDate: 2026-06-13
---

Full essay ported from existing site by the author before launch.
```

`src/content/blog/the-joy-of-creation.md`:

```md
---
title: The Joy of Creation
description: Why making things — products, plugins, systems — is the core joy of design work.
pubDate: 2026-06-13
---

Full essay ported from existing site by the author before launch.
```

`src/content/blog/building-ux-buddy.md`:

```md
---
title: Building UX Buddy
description: The story of building an AI design co-pilot inside Figma — from frustration to shipped plugin.
pubDate: 2026-06-13
---

Full essay ported from existing site by the author before launch.
```

- [ ] **Step 5: Verify collections compile**

```bash
npx astro check && npm run build
```

Expected: 0 errors (schema validates all 11 entries).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: content collections with seed projects, testimonials, blog

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Nav component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
<header class="nav-wrap">
  <nav class="nav" aria-label="Primary">
    <a class="nav__brand" href="/">Opeyemi</a>
    <div class="nav__links">
      <a href="#work">Work</a>
      <a href="#blog">Blog</a>
      <a class="pill nav__cta" href="#contact" data-magnetic>Let's Talk</a>
    </div>
  </nav>
</header>

<style>
  .nav-wrap {
    position: fixed;
    inset-inline: 0;
    top: 1rem;
    display: flex;
    justify-content: center;
    z-index: 100;
    pointer-events: none;
  }

  .nav {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    border: 1px solid rgb(0 0 0 / 12%);
    border-radius: var(--radius-pill);
    background: rgb(255 255 255 / 75%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  }

  .nav__brand {
    font-weight: 700;
  }

  .nav__links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    font-size: var(--text-small);
  }

  .nav__links a:not(.pill) {
    color: var(--ink-2);
    transition: color 0.2s;
  }

  .nav__links a:not(.pill):hover {
    color: var(--ink);
  }

  .nav__cta {
    padding: 0.5rem 1.1rem;
  }

  @media (max-width: 480px) {
    .nav__links a:not(.pill) {
      display: none;
    }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
---

<Layout>
  <Nav />
  <main>
    <h1 class="container section">Token check</h1>
  </main>
</Layout>
```

- [ ] **Step 3: Verify** — `npx astro check`; dev server shows centered blur pill nav fixed on scroll.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: sticky pill navigation

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Hero section (static, CSS-gradient background)

**Files:**
- Create: `src/components/sections/Hero.astro`
- Modify: `src/pages/index.astro`

The CSS radial gradient here is the permanent fallback; three.js (Task 11) layers on top when available.

- [ ] **Step 1: Create `src/components/sections/Hero.astro`**

```astro
<section class="hero" aria-label="Intro">
  <div class="hero__bg" id="hero-canvas" aria-hidden="true"></div>
  <div class="hero__content container">
    <p class="eyebrow" data-reveal>Senior Product Designer — 9+ Years</p>
    <h1 class="hero__title" data-split>
      Designing digital experiences that feel intuitive &amp; alive
    </h1>
    <p class="hero__sub" data-reveal>
      Fintech · Logistics · Edu-tech · E-sport — design &amp; build
    </p>
    <a class="pill" href="#work" data-reveal data-magnetic>See projects ↓</a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    display: grid;
    place-items: center;
    text-align: center;
    overflow: hidden;
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 60%,
      rgb(251 152 38 / 22%),
      rgb(0 153 255 / 10%) 50%,
      transparent 75%
    );
  }

  .hero__bg :global(canvas) {
    position: absolute;
    inset: 0;
  }

  .hero__content {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 1.5rem;
    padding-block: 8rem 6rem;
  }

  .hero__title {
    font-size: var(--text-display);
    max-width: 18ch;
  }

  .hero__sub {
    color: var(--ink-2);
  }
</style>
```

- [ ] **Step 2: Replace the placeholder heading in `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/sections/Hero.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 3: Verify** — dev server: full-viewport hero, gradient glow behind display headline, nav floats over it.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: hero section with gradient fallback background

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Marquee component

**Files:**
- Create: `src/components/Marquee.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Marquee.astro`**

Content is rendered twice so the GSAP `xPercent: -50` loop (Task 10) is seamless. Static (non-animated) state is acceptable until then.

```astro
---
interface Props {
  items: string[];
}

const { items } = Astro.props;
const row = items.join(' ✦ ') + ' ✦ ';
---

<div class="marquee" aria-hidden="true">
  <div class="marquee__track" data-marquee-track>
    <span>{row}</span>
    <span>{row}</span>
  </div>
</div>

<style>
  .marquee {
    overflow: hidden;
    border-block: 1px solid var(--line);
    background: var(--surface);
    padding-block: 0.75rem;
    white-space: nowrap;
  }

  .marquee__track {
    display: inline-flex;
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-2);
  }
</style>
```

- [ ] **Step 2: Add below Hero in `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/sections/Hero.astro';
import Marquee from '../components/Marquee.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <Marquee
      items={['UX/UI', 'Design Systems', 'Motion', 'Figma Plugins', 'Product Design']}
    />
  </main>
</Layout>
```

- [ ] **Step 3: Verify** — `npx astro check`; strip renders between sections.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: marquee ticker strip

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Projects section

**Files:**
- Create: `src/components/sections/Projects.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/sections/Projects.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

const projects = (await getCollection('projects', ({ data }) => !data.draft)).sort(
  (a, b) => a.data.order - b.data.order
);
---

<section class="section container" id="work" aria-label="Projects">
  <h2 class="h2" data-split>Projects.</h2>
  <div class="grid" data-stagger>
    {
      projects.map((p) => (
        <article class:list={['card', { 'card--featured': p.data.featured }]}>
          <div class="card__media">
            {p.data.cover ? (
              <Image src={p.data.cover} alt={p.data.title} widths={[480, 960, 1440]} />
            ) : (
              <div class="card__placeholder" aria-hidden="true">
                {p.data.title}
              </div>
            )}
          </div>
          <div class="card__meta">
            <h3>{p.data.title}</h3>
            <p>{p.data.summary}</p>
            <p class="card__tags">{p.data.tags.join(' · ')}</p>
          </div>
        </article>
      ))
    }
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .card {
    background: var(--surface);
    border-radius: var(--radius-card);
    overflow: hidden;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
    transition: translate 0.35s ease, box-shadow 0.35s ease;
  }

  .card:hover {
    translate: 0 -6px;
    box-shadow: 0 14px 30px rgb(0 0 0 / 10%);
  }

  .card--featured {
    grid-column: 1 / -1;
  }

  .card__media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .card--featured .card__media {
    aspect-ratio: 21 / 9;
  }

  .card__media :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: scale 0.5s ease;
  }

  .card:hover .card__media :global(img) {
    scale: 1.04;
  }

  .card__placeholder {
    height: 100%;
    display: grid;
    place-items: center;
    padding: 1rem;
    font-size: var(--text-h2);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--ink);
    background: linear-gradient(135deg, rgb(251 152 38 / 18%), rgb(0 153 255 / 12%));
  }

  .card__meta {
    padding: 1.25rem 1.5rem 1.5rem;
    display: grid;
    gap: 0.4rem;
  }

  .card__meta p {
    color: var(--ink-2);
    font-size: var(--text-small);
  }

  .card__tags {
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  @media (max-width: 700px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Add `<Projects />` after `<Marquee />` in `src/pages/index.astro`** (import: `import Projects from '../components/sections/Projects.astro';`)

- [ ] **Step 3: Verify** — `npm run build` passes; dev server shows featured full-width card + 4 grid cards, all using the typographic placeholder variant (no covers yet).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: projects section from content collection

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Success section (dark)

**Files:**
- Create: `src/components/sections/Success.astro`
- Modify: `src/pages/index.astro`

Logo strip ships as styled wordmarks (Kobo360 · Hydrogen Pay · ggCircuit); user supplies SVG logos later if desired.

- [ ] **Step 1: Create `src/components/sections/Success.astro`**

```astro
---
import { getCollection, render } from 'astro:content';

const testimonials = (await getCollection('testimonials')).sort(
  (a, b) => a.data.order - b.data.order
);

const rendered = await Promise.all(
  testimonials.map(async (t) => ({ ...t, Content: (await render(t)).Content }))
);

const companies = ['Kobo360', 'Hydrogen Pay', 'ggCircuit'];
---

<section class="dark-section section" aria-label="Testimonials">
  <div class="container">
    <h2 class="h2" data-split>Success.</h2>
    <div class="row" data-stagger>
      {
        rendered.map((t) => (
          <figure class="quote">
            <blockquote>
              <t.Content />
            </blockquote>
            <figcaption>
              — {t.data.author}, {t.data.role}
              {t.data.company ? ` · ${t.data.company}` : ''}
            </figcaption>
          </figure>
        ))
      }
    </div>
    <p class="logos" data-reveal>
      {companies.map((c) => <span>{c}</span>)}
    </p>
  </div>
</section>

<style>
  .row {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(18rem, 24rem);
    gap: 1.25rem;
    margin-top: 2.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    scrollbar-width: thin;
  }

  .quote {
    background: var(--dark-surface);
    border-radius: var(--radius-card);
    padding: 1.5rem;
  }

  .quote blockquote {
    font-size: var(--text-body);
  }

  .quote figcaption {
    margin-top: 1rem;
    color: var(--dark-ink-2);
    font-size: var(--text-small);
  }

  .logos {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 3rem;
    font-weight: 700;
    color: var(--dark-ink-2);
  }

  .logos span {
    transition: color 0.25s;
  }

  .logos span:hover {
    color: var(--dark-ink);
  }
</style>
```

- [ ] **Step 2: Add `<Success />` after `<Projects />` in `src/pages/index.astro`** (import: `import Success from '../components/sections/Success.astro';`)

- [ ] **Step 3: Verify** — dark section, 3 horizontally scrollable quote cards, wordmark strip.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: dark success section with testimonials

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Blog teaser + ContactCTA sections

**Files:**
- Create: `src/components/sections/BlogTeaser.astro`
- Create: `src/components/sections/ContactCTA.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/sections/BlogTeaser.astro`**

```astro
---
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);
---

<section class="section container" id="blog" aria-label="Blog">
  <h2 class="h2" data-split>Newest insights.</h2>
  <ul class="list" data-stagger>
    {
      posts.map((post) => (
        <li>
          <a class="rowlink" href="#" aria-disabled="true" title="Post pages coming in next phase">
            <span>{post.data.title}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </a>
        </li>
      ))
    }
  </ul>
</section>

<style>
  .list {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
  }

  .rowlink {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 1.25rem;
    border-top: 1px solid var(--line);
    font-weight: 500;
    transition: padding-left 0.25s ease;
  }

  li:last-child .rowlink {
    border-bottom: 1px solid var(--line);
  }

  .rowlink:hover {
    padding-left: 0.75rem;
  }

  .arrow {
    color: var(--ink-2);
  }
</style>
```

- [ ] **Step 2: Create `src/components/sections/ContactCTA.astro`**

```astro
<section class="dark-section section cta" id="contact" aria-label="Contact">
  <div class="container">
    <h2 class="cta__title" data-split>Let's Talk</h2>
    <a class="pill pill--accent" href="mailto:hello@opeyemi.app" data-magnetic>
      hello@opeyemi.app
    </a>
    <nav class="socials" aria-label="Social links">
      <a href="https://www.linkedin.com/in/opeyemi-ajagbe/">LinkedIn</a>
      <a href="https://dribbble.com/opeyemiajagbe">Dribbble</a>
      <a href="https://github.com/vibesyemmy">GitHub</a>
      <a href="https://www.figma.com/@opeyemiajagbe">Figma</a>
      <a href="https://app.uxcel.com/ux/opeyemiajagbe">Uxcel</a>
    </nav>
    <p class="fineprint">© 2026 Opeyemi Ajagbe</p>
  </div>
</section>

<style>
  .cta .container {
    display: grid;
    justify-items: center;
    gap: 2rem;
    text-align: center;
  }

  .cta__title {
    font-size: var(--text-display);
  }

  .socials {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    font-size: var(--text-small);
    color: var(--dark-ink-2);
  }

  .socials a:hover {
    color: var(--dark-ink);
  }

  .fineprint {
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    color: var(--dark-ink-2);
  }
</style>
```

- [ ] **Step 3: Final `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/sections/Hero.astro';
import Marquee from '../components/Marquee.astro';
import Projects from '../components/sections/Projects.astro';
import Success from '../components/sections/Success.astro';
import BlogTeaser from '../components/sections/BlogTeaser.astro';
import ContactCTA from '../components/sections/ContactCTA.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <Marquee
      items={['UX/UI', 'Design Systems', 'Motion', 'Figma Plugins', 'Product Design']}
    />
    <Projects />
    <Success />
    <BlogTeaser />
    <ContactCTA />
  </main>
</Layout>
```

- [ ] **Step 4: Verify full page** — `npx astro check && npm run build`; dev server: complete page scroll-through matches light wireframe.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: blog teaser and contact CTA sections; full page assembly

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: GSAP animations + Lenis smooth scroll

**Files:**
- Create: `src/scripts/smooth-scroll.ts`
- Create: `src/scripts/animations.ts`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create `src/scripts/smooth-scroll.ts`**

```ts
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
```

- [ ] **Step 2: Create `src/scripts/animations.ts`**

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  // Headline line reveals
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const split = new SplitType(el, { types: 'lines', lineClass: 'line-inner' });
    split.lines?.forEach((line) => {
      const wrap = document.createElement('div');
      wrap.className = 'line';
      line.replaceWith(wrap);
      wrap.appendChild(line);
    });
    gsap.from(el.querySelectorAll('.line-inner'), {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Single-element reveals
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Staggered child groups
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // Seamless marquee (content duplicated in markup)
  document.querySelectorAll<HTMLElement>('[data-marquee-track]').forEach((track) => {
    gsap.to(track, { xPercent: -50, ease: 'none', duration: 24, repeat: -1 });
  });

  // Magnetic pills
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
```

- [ ] **Step 3: Add script imports to `src/layouts/Layout.astro`** (before `</body>`)

```astro
    <slot />
    <script>
      import '../scripts/smooth-scroll';
      import '../scripts/animations';
    </script>
  </body>
```

- [ ] **Step 4: Verify**

```bash
npx astro check && npm run build
```

Dev server: headings reveal line-by-line on scroll, cards stagger in, marquee loops seamlessly, nav/CTA pills track cursor. Then toggle reduced motion (macOS: System Settings → Accessibility → Display → Reduce motion) and reload: everything visible, nothing animates.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: GSAP scroll animations, marquee loop, magnetic buttons, Lenis

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: three.js hero particle field

**Files:**
- Create: `src/scripts/hero-bg.ts`
- Modify: `src/components/sections/Hero.astro` (add script block)

- [ ] **Step 1: Create `src/scripts/hero-bg.ts`**

```ts
import * as THREE from 'three';

const COUNT = 3000;
const POINTER_RADIUS = 2.2;
const PUSH = 1.4;

export function initHeroBackground(host: HTMLElement): void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
  } catch {
    return; // CSS gradient fallback stays
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    host.clientWidth / host.clientHeight,
    0.1,
    50
  );
  camera.position.z = 8;

  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  // Geometry: random cloud, base positions kept for spring-back
  const positions = new Float32Array(COUNT * 3);
  const basePositions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  const ink = new THREE.Color('#2a2a2a');
  const orange = new THREE.Color('#fb9826');
  const blue = new THREE.Color('#0099ff');

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 18;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 4;
    basePositions.set(positions.slice(i3, i3 + 3), i3);

    const roll = Math.random();
    const c = roll < 0.85 ? ink : roll < 0.95 ? orange : blue;
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });

  scene.add(new THREE.Points(geometry, material));

  // Pointer in world units at z=0 plane (approximate via viewport fit)
  const pointer = new THREE.Vector2(999, 999);
  const target = new THREE.Vector2(999, 999);

  host.ownerDocument.addEventListener('pointermove', (e) => {
    const rect = host.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    target.set(ndcX * halfH * camera.aspect, ndcY * halfH);
  });

  // Visibility-gated render loop
  let running = true;
  let rafId = 0;

  const io = new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting && !document.hidden;
    if (running) loop();
  });
  io.observe(host);

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) loop();
  });

  function loop(): void {
    if (!running) return;
    pointer.lerp(target, 0.08);

    const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const dx = bx - pointer.x;
      const dy = by - pointer.y;
      const dist = Math.hypot(dx, dy);

      let tx = bx;
      let ty = by;
      if (dist < POINTER_RADIUS && dist > 0.001) {
        const force = (1 - dist / POINTER_RADIUS) * PUSH;
        tx = bx + (dx / dist) * force;
        ty = by + (dy / dist) * force;
      }
      pos.array[i3] += (tx - pos.array[i3]) * 0.06;
      pos.array[i3 + 1] += (ty - pos.array[i3 + 1]) * 0.06;
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', () => {
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  });

  // Cleanup on page hide (Astro static site: pagehide is enough)
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(rafId);
    io.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  });
}
```

- [ ] **Step 2: Add lazy-loader script to `src/components/sections/Hero.astro`** (after `</section>`, before `<style>`)

```astro
<script>
  const host = document.getElementById('hero-canvas');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (host && !reduced) {
    const io = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      try {
        const { initHeroBackground } = await import('../../scripts/hero-bg');
        initHeroBackground(host);
      } catch {
        // CSS gradient fallback stays — no console spam
      }
    });
    io.observe(host);
  }
</script>
```

- [ ] **Step 3: Verify**

```bash
npx astro check && npm run build
```

Confirm in build output that three.js is a separate lazy chunk (look for a distinct `hero-bg` / vendor chunk in `dist/_astro/`, not inside the main bundle). Dev server: particle field over gradient, particles part around cursor and spring back; with reduced motion enabled only the gradient shows.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: lazy three.js particle field hero background

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 12: Final verification sweep

**Files:** none (verification only)

- [ ] **Step 1: Clean build**

```bash
npx astro check && npm run build && npm run preview
```

Expected: 0 errors; preview serves `dist/`.

- [ ] **Step 2: Manual sweep** (against spec "Verification" section)

- Responsive: 360px, 768px, 1024px, 1440px — no overflow, nav collapses on mobile
- Reduced motion: all content visible, no animation, no canvas
- WebGL check: in devtools, block `hero-bg` chunk → gradient fallback, no errors
- Layout fidelity: compare scroll-through against the Digcy reference export and the approved light wireframe

- [ ] **Step 3: Lighthouse** — Chrome devtools, mobile + desktop, target ≥ 95 each category. Record scores. If perf < 95: check fonts are self-hosted (no network fonts), three.js chunk is lazy, images optimized.

- [ ] **Step 4: Commit any fixes; tag**

```bash
git add -A
git commit -m "chore: verification fixes from final sweep

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git tag v1.0.0-landing
```

---

## Deferred to later phases (explicitly out of scope)

- Project detail pages (cards intentionally have no links yet)
- Blog post pages (teaser rows link to `#`, marked `aria-disabled`)
- Remaining 4 testimonials + quote/author confirmation by user
- Project cover images, company logo SVGs (user supplies)
- Full blog essay bodies (user ports from existing site)
- About/contact pages, contact form backend, analytics, deployment
