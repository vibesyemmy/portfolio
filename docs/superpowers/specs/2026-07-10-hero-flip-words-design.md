# Hero Flip-Words Headline — Design Spec

**Date:** 2026-07-10
**Status:** Approved (design), pending implementation plan
**Reference:** [Aceternity FlipWords](https://ui.aceternity.com/components/flip-words) — reproduced in vanilla JS + GSAP (no React/framer-motion).

## Goal

Turn the static hero `<h1>` into a rotating headline: a fixed prefix "I design and
build" followed by a trailing phrase that flips through 4 options, using the
Aceternity FlipWords motion (per-letter blur+fade+rise on enter, block exit up).

## Content — the 4 phrases (confirmed)

The flipping trailing line rotates through, in order:

1. `the things other designers use.`
2. `design systems teams rely on.`
3. `products that actually ship.`
4. `tools for the people who build.`

Rotation loops 1 → 2 → 3 → 4 → 1 indefinitely. Phrase #1 is the current headline
line and is the static default rendered in HTML.

## Structure & markup (progressive enhancement)

The `<h1>` remains a single semantic heading and ships the **complete** sentence
in static HTML — crawlers, no-JS, and screen readers get
`"I design and build the things other designers use."`

```html
<h1 class="hero-wall__title">
  <span class="hero-wall__title-static" data-reveal>I design and build</span>
  <span class="hero-wall__flip"
        data-flip-words='["the things other designers use.","design systems teams rely on.","products that actually ship.","tools for the people who build."]'>the things other designers use.</span>
</h1>
```

- **Remove `data-split`** from this h1. The generic split-line reveal in
  `animations.ts` would tokenize and mask the flip span and break it. The flip
  module becomes the dedicated animator for this heading.
- The static prefix line gets `data-reveal` (the same fade-up used by `.eyebrow`,
  `.hero-wall__sub`, `.hero-wall__actions`), so line 1's entrance stays consistent
  with the rest of the hero.
- `.hero-wall__flip` is `display:block`, so the trailing phrase sits on its own
  line under the prefix (the hero is `text-align:center`; a single-line inline
  rotation would re-center and jitter on every flip — its own line isolates it).
- The phrases string is a JSON array in `data-flip-words`; the module reads and
  parses it. The element's static text content is phrase #1 (the no-JS fallback).

## Motion (GSAP)

Values mirror the Aceternity FlipWords component.

**Enter** (incoming phrase): split into per-letter `<span>`s (word boundaries
preserved). Each letter tweens
`{opacity:0, y:10, filter:'blur(8px)'}` → `{opacity:1, y:0, filter:'blur(0px)'}`,
~0.25s, ease `power2.out`, staggered by `wordIndex*0.3 + letterIndex*0.05` seconds.

**Dwell:** 3000 ms after the enter completes.

**Exit** (outgoing phrase, as one block): tween
`→ {opacity:0, y:-40, filter:'blur(8px)', scale:1.3}`, ~0.4s, ease `power2.in`.
On exit-complete, swap DOM to the next phrase and run its Enter.

**Entrance sequencing:** on load, line 1 (`data-reveal`) reveals first; the flip
line's first-phrase Enter is delayed slightly (~0.15–0.25s after line 1) so the
hero reads top-to-bottom. The first Enter doubles as the flip line's entrance —
there is no separate reveal for it.

## Layout stability

`.hero-wall__flip` must not change the layout as phrases swap:

- After `document.fonts.ready` (so measurement uses the real font, not the
  fallback), measure the rendered width of each of the 4 phrases and set the
  slot's `min-width` to the widest; set `min-height` to a single line's height.
- This freezes the centered layout horizontally and prevents any vertical shift
  of the sub-copy / actions / wall below.
- Measurement happens once on init; no re-measure on resize is required for v1
  (phrases are short, single-line; revisit only if wrapping appears at small
  widths — see Open questions).

## Edge cases & constraints

- **`prefers-reduced-motion: reduce`**: no rotation, no letter animation. The
  static first phrase remains; the full sentence is already in the HTML. Nothing
  flashes or moves.
- **No-JS**: full sentence renders as authored. No dependency on the module.
- **No-flash-of-hidden**: the flip slot is hidden only under the existing
  `html.js` + `prefers-reduced-motion: no-preference` convention until the module
  takes over, so no-JS and reduced-motion users always see it.
- **Bowling easter egg**: `.hb-playing` already blurs/dims `.hero-wall__title`.
  The flip keeps running underneath the blur; the two are intentionally not
  coupled. (Possible later optimization: pause rotation while `hb-playing` to
  save compositing — out of scope for v1.)
- **SEO**: the h1 stays one heading containing a complete, sensible sentence.

## Files

- `src/scripts/hero-flip.ts` (new) — `initHeroFlip(root?)`: locate
  `.hero-wall__flip`, parse `data-flip-words`, measure + lock slot size, build the
  GSAP enter/dwell/exit loop, honor reduced-motion, expose teardown. Owns all DOM
  + GSAP for the heading.
- `src/scripts/hero-flip.ts` also exports a pure helper `splitIntoLetters(phrase)`
  → returns an ordered structure of words → letters (spaces preserved) that the
  DOM builder consumes.
- `src/scripts/hero-flip.test.ts` (new) — vitest unit tests for
  `splitIntoLetters` (letter/word counts, spaces preserved, punctuation kept,
  empty string, reconstruction equals input).
- `src/components/sections/HeroWall.astro` — markup change (above), CSS for
  `.hero-wall__flip` / `.hero-wall__title-static`, and `initHeroFlip()` wired into
  the existing `<script>` block next to the current imports.
- No new dependencies (GSAP already installed).

## Testing / verification

- `splitIntoLetters` unit tests pass (`npm run test` / vitest).
- `npm run build` succeeds; built Lotti/home HTML contains the full static
  sentence (SEO check).
- In-browser: hard-refresh home → line 1 reveals, flip line enters per-letter,
  rotates every 3s through all 4, no layout jitter below, loops. Toggle
  reduced-motion → static first phrase, no motion. Trigger bowling → title blurs,
  no errors.

## Non-goals (YAGNI)

- No caret/typewriter/backspace variants (explicitly rejected in favor of the
  Aceternity look).
- No per-phrase color/style theming.
- No resize re-measurement in v1.
- No pause-on-bowling coupling in v1.

## Open questions

- At very small viewports, could the longest phrase wrap to 2 lines? If so, the
  reserved `min-height` should account for the wrapped height, or font-size steps
  down at that breakpoint. Confirm during in-browser verification; adjust CSS if
  observed.
