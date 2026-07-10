# Hero Flip-Words Headline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the static hero `<h1>` into a rotating headline — a fixed "I design and build" prefix followed by a trailing phrase that flips through 4 options using the Aceternity FlipWords motion, rebuilt in vanilla JS + GSAP.

**Architecture:** A dedicated module (`hero-flip.ts`) owns the headline animation. It reads the 4 phrases from a `data-flip-words` JSON attribute on a `.hero-wall__flip` span, splits the active phrase into per-letter spans, and runs an infinite GSAP enter → dwell → exit loop. The full sentence ships in static HTML (SEO / no-JS / reduced-motion). The generic `data-split` line-reveal is removed from this h1 so it no longer fights the flip; the static prefix line keeps the site's `data-reveal` fade-up.

**Tech Stack:** Astro 6, TypeScript, GSAP 3 (already installed), vitest 4 (node env). No new dependencies.

**Design spec:** `docs/superpowers/specs/2026-07-10-hero-flip-words-design.md`

**The 4 phrases (confirmed), in rotation order:**
1. `the things other designers use.`
2. `design systems teams rely on.`
3. `products that actually ship.`
4. `tools for the people who build.`

---

## File Structure

- **Create** `src/scripts/hero-flip.ts` — the flip controller. Exports `splitIntoLetters` (pure) and `initHeroFlip` (DOM + GSAP). One responsibility: animate the hero headline's trailing phrase.
- **Create** `src/scripts/hero-flip.test.ts` — vitest unit tests for the pure `splitIntoLetters` helper only (the DOM/GSAP path is verified in-browser, matching how `bowling.ts` is handled).
- **Modify** `src/components/sections/HeroWall.astro` — swap the h1 markup, add CSS for the two spans, wire `initHeroFlip()` into the existing bowling `<script>` block.
- **Modify** `src/styles/global.css` — add `.hero-wall__flip`'s hide-until-ready selector to the existing `html.js` visibility rule.

Conventions to follow (already in the codebase):
- GSAP is imported as `import gsap from 'gsap';` (see `src/scripts/bowling.ts:1`).
- Reduced-motion gate: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- Font-dependent measurement waits on `document.fonts.ready` (see `src/scripts/animations.ts`).
- `html.js` is added in `src/layouts/Layout.astro:24`; the visibility-hide rule lives in `src/styles/global.css:24-26`.
- Test command: `npm test` (`vitest run`), config `vitest.config.ts` includes `src/**/*.test.ts`, environment `node`.

---

### Task 1: Pure helper `splitIntoLetters` (TDD)

**Files:**
- Create: `src/scripts/hero-flip.ts`
- Test: `src/scripts/hero-flip.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/scripts/hero-flip.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { splitIntoLetters } from './hero-flip';

describe('splitIntoLetters', () => {
  it('returns [] for an empty string', () => {
    expect(splitIntoLetters('')).toEqual([]);
  });

  it('splits a single word into one array of characters', () => {
    expect(splitIntoLetters('hi.')).toEqual([['h', 'i', '.']]);
  });

  it('groups letters by word, splitting on single spaces', () => {
    expect(splitIntoLetters('a b')).toEqual([['a'], ['b']]);
  });

  it('preserves punctuation as its own letter', () => {
    expect(splitIntoLetters('ship.')).toEqual([['s', 'h', 'i', 'p', '.']]);
  });

  it('round-trips: join words with a space reconstructs the input', () => {
    const phrase = 'design systems teams rely on.';
    const rebuilt = splitIntoLetters(phrase)
      .map((word) => word.join(''))
      .join(' ');
    expect(rebuilt).toBe(phrase);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- hero-flip`
Expected: FAIL — `splitIntoLetters` is not exported / file has no such export.

- [ ] **Step 3: Write the minimal implementation**

Create `src/scripts/hero-flip.ts` with ONLY the helper for now:

```ts
/**
 * Split a phrase into words → letters, preserving order.
 * `splitIntoLetters(p).map(w => w.join('')).join(' ')` reconstructs `p`
 * (for phrases with single spaces, which is all we feed it).
 * Returns [] for the empty string so the caller can guard cleanly.
 */
export function splitIntoLetters(phrase: string): string[][] {
  if (phrase.length === 0) return [];
  return phrase.split(' ').map((word) => word.split(''));
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- hero-flip`
Expected: PASS — 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/scripts/hero-flip.ts src/scripts/hero-flip.test.ts
git commit -m "feat: add splitIntoLetters helper for hero flip-words"
```

---

### Task 2: The flip controller `initHeroFlip`

**Files:**
- Modify: `src/scripts/hero-flip.ts` (append below the helper)

No unit test: this is DOM + GSAP, verified in-browser in Task 4 (same approach as `bowling.ts`).

- [ ] **Step 1: Append the module code**

Add the following BELOW the existing `splitIntoLetters` export in `src/scripts/hero-flip.ts`:

```ts
import gsap from 'gsap';

// Motion constants — mirror the Aceternity FlipWords component.
const ENTER_DUR = 0.25; // seconds, per letter
const WORD_STAGGER = 0.3; // seconds added per word index
const LETTER_STAGGER = 0.05; // seconds added per letter index within a word
const DWELL_MS = 3000; // hold a phrase fully visible before it exits
const EXIT_DUR = 0.4; // seconds, whole-phrase exit
const START_DELAY_MS = 200; // let the static prefix line settle first

interface LetterHandle {
  el: HTMLElement;
  delay: number; // absolute start time on the enter timeline
}

/** Copy the font-affecting computed styles from `from` onto `to` (for measuring). */
function copyFont(from: CSSStyleDeclaration, to: HTMLElement): void {
  to.style.fontFamily = from.fontFamily;
  to.style.fontSize = from.fontSize;
  to.style.fontWeight = from.fontWeight;
  to.style.fontStyle = from.fontStyle;
  to.style.lineHeight = from.lineHeight;
  to.style.letterSpacing = from.letterSpacing;
}

/**
 * Reserve the slot's height to the tallest phrase (measured at the slot's live
 * width) so phrases that wrap to more lines don't shift the sub-copy / actions /
 * wall below. Measured once, after fonts load.
 */
function reserveHeight(slot: HTMLElement, phrases: string[]): void {
  const cs = getComputedStyle(slot);
  const m = document.createElement('span');
  m.style.position = 'absolute';
  m.style.visibility = 'hidden';
  m.style.left = '-9999px';
  m.style.top = '0';
  m.style.display = 'block';
  m.style.width = `${slot.clientWidth}px`;
  m.style.whiteSpace = 'normal';
  copyFont(cs, m);
  document.body.appendChild(m);
  let maxH = 0;
  for (const p of phrases) {
    m.textContent = p;
    if (m.offsetHeight > maxH) maxH = m.offsetHeight;
  }
  document.body.removeChild(m);
  if (maxH > 0) slot.style.minHeight = `${maxH}px`;
}

/**
 * Replace the slot's content with per-letter spans (grouped into word spans so
 * words never break mid-wrap), and return a handle per letter with its staggered
 * enter delay (wordIndex*0.3 + letterIndex*0.05).
 */
function buildLetterSpans(slot: HTMLElement, phrase: string): LetterHandle[] {
  slot.textContent = '';
  const handles: LetterHandle[] = [];
  const words = splitIntoLetters(phrase);
  words.forEach((chars, wi) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'flip-word';
    chars.forEach((ch, li) => {
      const letterEl = document.createElement('span');
      letterEl.className = 'flip-letter';
      letterEl.textContent = ch;
      wordEl.appendChild(letterEl);
      handles.push({ el: letterEl, delay: wi * WORD_STAGGER + li * LETTER_STAGGER });
    });
    slot.appendChild(wordEl);
    if (wi < words.length - 1) slot.appendChild(document.createTextNode(' '));
  });
  return handles;
}

/** Animate each letter in: fade + rise + de-blur, staggered by word then letter. */
function enter(letters: LetterHandle[]): gsap.core.Timeline {
  const tl = gsap.timeline();
  for (const { el, delay } of letters) {
    tl.fromTo(
      el,
      { opacity: 0, y: 10, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: ENTER_DUR, ease: 'power2.out' },
      delay // absolute position on the timeline
    );
  }
  return tl;
}

/** Animate the whole phrase out: fade + rise + blur + scale up. */
function exit(slot: HTMLElement): gsap.core.Tween {
  return gsap.to(slot, {
    opacity: 0,
    y: -40,
    filter: 'blur(8px)',
    scale: 1.3,
    duration: EXIT_DUR,
    ease: 'power2.in',
  });
}

/**
 * Enhance `.hero-wall__flip` into a rotating flip-words headline. Reads the 4
 * phrases from `data-flip-words` (JSON). No-op under reduced motion, with <2
 * phrases, or if already initialised — the static first phrase (already in the
 * HTML) then stands as the complete, readable headline.
 */
export function initHeroFlip(root: ParentNode = document): void {
  const slot = root.querySelector<HTMLElement>('.hero-wall__flip');
  if (!slot || slot.dataset.flipReady) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let phrases: string[] = [];
  try {
    phrases = JSON.parse(slot.dataset.flipWords || '[]');
  } catch {
    phrases = [];
  }
  if (reduced || phrases.length < 2) return;

  slot.dataset.flipReady = 'true';

  document.fonts.ready.then(() => {
    reserveHeight(slot, phrases);
    gsap.set(slot, { autoAlpha: 1 }); // clears the CSS visibility:hidden pre-hide

    let i = 0;
    let timer = 0;

    const cycle = (): void => {
      // reset the slot transform/filter the exit left behind, then build + enter
      gsap.set(slot, { opacity: 1, y: 0, scale: 1, filter: 'none' });
      const letters = buildLetterSpans(slot, phrases[i]);
      enter(letters).eventCallback('onComplete', () => {
        timer = window.setTimeout(() => {
          exit(slot).eventCallback('onComplete', () => {
            i = (i + 1) % phrases.length;
            cycle();
          });
        }, DWELL_MS);
      });
    };

    timer = window.setTimeout(cycle, START_DELAY_MS);
    void timer;
  });
}
```

- [ ] **Step 2: Typecheck the module**

Run: `npx astro check 2>&1 | grep -i hero-flip || echo "no hero-flip type errors"`
Expected: `no hero-flip type errors` (or a clean check). Fix any reported type errors in `hero-flip.ts` before continuing.

- [ ] **Step 3: Verify the pure helper tests still pass**

Run: `npm test -- hero-flip`
Expected: PASS — the 5 Task 1 tests are unaffected by the appended code.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/hero-flip.ts
git commit -m "feat: flip-words controller — enter/dwell/exit loop, height reserve"
```

---

### Task 3: Markup, CSS, and wiring in the hero

**Files:**
- Modify: `src/components/sections/HeroWall.astro` (h1 markup ~121-123, `<style>` after `.hero-wall__title`, `<script>` at 590-594)
- Modify: `src/styles/global.css` (visibility rule at 24-26)

- [ ] **Step 1: Replace the h1 markup**

In `src/components/sections/HeroWall.astro`, find:

```astro
      <h1 class="hero-wall__title" data-split>
        I design and build the things other designers use.
      </h1>
```

Replace it with (note: `data-split` removed; full sentence still present as static text):

```astro
      <h1 class="hero-wall__title">
        <span class="hero-wall__title-static" data-reveal>I design and build</span>
        <span
          class="hero-wall__flip"
          data-flip
          data-flip-words='["the things other designers use.","design systems teams rely on.","products that actually ship.","tools for the people who build."]'
        >the things other designers use.</span>
      </h1>
```

- [ ] **Step 2: Add CSS for the two spans**

In the same file's `<style>` block, find the `.hero-wall__title` rule (currently):

```css
  .hero-wall__title {
    font-size: var(--text-display);
    max-width: 18ch;
  }
```

Replace it with:

```css
  .hero-wall__title {
    font-size: var(--text-display);
    max-width: 18ch;
  }

  /* Prefix on its own line; block so its data-reveal transform applies (a
     transform on an inline element is ignored). */
  .hero-wall__title-static {
    display: block;
  }

  /* The rotating trailing phrase. Its own line under the prefix. Width is fixed
     by the h1's max-width:18ch, so wrapping happens within a stable column and
     the centered line never jitters horizontally as phrases change; JS reserves
     min-height for the tallest phrase so nothing below shifts. */
  .hero-wall__flip {
    display: block;
  }
  .hero-wall__flip .flip-word {
    display: inline-block;
    white-space: nowrap; /* keep each word intact; wrap only between words */
  }
  .hero-wall__flip .flip-letter {
    display: inline-block; /* required for per-letter y / blur transforms */
    will-change: transform, opacity, filter;
  }
```

- [ ] **Step 3: Hide the flip slot until the module reveals it**

In `src/styles/global.css`, find (lines ~23-28):

```css
@media (prefers-reduced-motion: no-preference) {
  html.js [data-reveal],
  html.js [data-split] {
    visibility: hidden;
  }
}
```

Replace with (adds `[data-flip]`):

```css
@media (prefers-reduced-motion: no-preference) {
  html.js [data-reveal],
  html.js [data-split],
  html.js [data-flip] {
    visibility: hidden;
  }
}
```

This hides the flip slot ONLY when JS is on and motion is allowed — no-JS and reduced-motion users always see the static phrase. `initHeroFlip` clears it via `gsap.set(slot, { autoAlpha: 1 })`.

- [ ] **Step 4: Wire `initHeroFlip` into the hero script**

In `src/components/sections/HeroWall.astro`, find the second `<script>` block (lines 590-594):

```astro
<script>
  import { initHeroBowling } from '../../scripts/bowling';
  const avatar = document.querySelector<HTMLElement>('.hero-wall__avatar');
  if (avatar) initHeroBowling(avatar);
</script>
```

Replace with:

```astro
<script>
  import { initHeroBowling } from '../../scripts/bowling';
  import { initHeroFlip } from '../../scripts/hero-flip';
  const avatar = document.querySelector<HTMLElement>('.hero-wall__avatar');
  if (avatar) initHeroBowling(avatar);
  initHeroFlip();
</script>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HeroWall.astro src/styles/global.css
git commit -m "feat: wire flip-words into hero headline + layout-stable CSS"
```

---

### Task 4: Build, SEO check, and in-browser verification

**Files:** none created; fixes (if any) go back into the Task 2/3 files.

- [ ] **Step 1: Full test + typecheck + build**

Run: `npm test && npx astro check && npm run build`
Expected: tests PASS, check clean, build completes (17 pages).

- [ ] **Step 2: SEO / no-JS check — full sentence in static HTML**

Run:
```bash
grep -o 'I design and build[^<]*' dist/index.html | head -1
```
Expected output contains the complete sentence: `I design and build` immediately followed by `the things other designers use.` (the static prefix span text, then the flip span's static text — confirm both strings are present in the built HTML so crawlers and no-JS users get a complete headline).

- [ ] **Step 3: In-browser verification (dev server)**

Start the dev server (background, absolute path):
```bash
npm --prefix /Users/opeyemiajagbe/Documents/Projects/opeyemi-app/portfolio run dev
```
Open the Local URL. Hard-refresh (Cmd+Shift+R). Confirm ALL of:
- [ ] Line 1 "I design and build" fades up; line 2's first phrase enters letter-by-letter (blur → sharp, rising).
- [ ] After ~3s the phrase blurs/rises out and the next enters; it cycles all 4 in order and loops back to #1.
- [ ] The sub-copy, buttons, and image wall below do NOT shift vertically as phrases change (height reserve works).
- [ ] The centered headline does NOT jump left/right between phrases (width stable).
- [ ] Drag the avatar to trigger the bowling easter egg — the headline blurs/dims as before, no console errors, flip keeps working after.

- [ ] **Step 4: In-browser verification (reduced motion)**

Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate CSS media feature) and hard-refresh. Confirm:
- [ ] No flipping and no letter animation — the static first phrase "the things other designers use." is simply shown, and the full headline is visible immediately (not hidden).

- [ ] **Step 5: Commit any fixes**

If Steps 1-4 required changes:
```bash
git add -A
git commit -m "fix: flip-words verification adjustments"
```
If no fixes were needed, skip this step.

---

## Self-Review

**Spec coverage:**
- Content / 4 phrases → Task 3 Step 1 (data-flip-words) + Task 1 tests. ✓
- Progressive-enhancement markup, single h1, full static sentence, `data-split` removed, prefix gets `data-reveal` → Task 3 Steps 1-2; SEO checked Task 4 Step 2. ✓
- Motion values (enter per-letter blur/rise/fade with word+letter stagger, 3s dwell, block exit up+blur+scale) → Task 2 constants + `enter`/`exit`. ✓
- Layout stability (own line, width fixed by 18ch column, JS min-height reserve after fonts.ready) → Task 2 `reserveHeight` + Task 3 Step 2 CSS; verified Task 4 Step 3. ✓
- Reduced-motion / no-JS / no-flash → Task 2 `initHeroFlip` guard + Task 3 Step 3 CSS; verified Task 4 Step 4. ✓
- Bowling coexistence → verified Task 4 Step 3. ✓
- Files (`hero-flip.ts`, `hero-flip.test.ts`, HeroWall, global.css) → Tasks 1-3. ✓
- No new deps → confirmed (GSAP already present). ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete code; every command has expected output. ✓

**Type consistency:** `splitIntoLetters` returns `string[][]` (Task 1) and is consumed as words→chars in `buildLetterSpans` (Task 2). `LetterHandle { el, delay }` produced by `buildLetterSpans`, consumed by `enter`. `initHeroFlip(root?)` called with no args in Task 3 Step 4. Class names `.hero-wall__flip` / `.flip-word` / `.flip-letter` and attribute `data-flip` / `data-flip-words` match across module, markup, and CSS. ✓
