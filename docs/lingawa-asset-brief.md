# Lingawa case study — missing-media brief

What exists today: `cover: /lingawa-hero.webp`, and the 3 store badges in **Proof → Quality at scale** (`lingawa-trustpilot/play-store/app-store.webp`). Everything else is text-only. Below is every section that wants media, with a shot description, the case-study component to use, and a width.

Components available: `MediaFull` (single image/video; width `content|wide|full|container`), `MediaGrid` (2–3 up, click-to-zoom), `Gallery` (carousel + lightbox), `Quote`, `StoreBadges`. Images → webp; phone screens → transparent or on a branded bg; videos → muted/loop, I'll compress + poster them.

## Priority 1 — the centerpiece

### "Seven modalities, one system" (Building the Thing)
The single most important visual. Show the 7 exercise types as a **Gallery** (clickable, lightbox) — or short looping videos if you have screen recordings. One screen each, captioned:
1. **Lesson slides** — structured instruction screen.
2. **Vocab drills** — spaced-repetition card, minimal/no chrome.
3. **Matching game** — large tappable cards, timer/recall UI.
4. **Dialogue practice** — chat-like UI with speaker bubbles + attribution.
5. **Sentence construction** — word-bank builder; capture both **Normal** and **Advanced** tiers.
6. **Story-time reader** — long-form comfortable typography, minimal chrome.
7. **Practice hub** — progress tracking tying it together.
→ `Gallery` (or `MediaGrid cols={3}`), width `wide`. 7 phone screens.

## Priority 2 — brand & system story

### The mascot (The Mascot & The Rebrand)
Mascot character sheet (poses/expressions: guiding, celebrating a streak, softening an error) **and/or** the mascot in-app (onboarding walkthrough, streak celebration, "greets you by name"). → `MediaGrid cols={2}` or `MediaFull width="wide"`. 1–3 images.

### The rebrand
(a) Before/after of the logo or a key screen (old identity → new). (b) A brand board: new color palette, type scale, logo, and the background-pattern assets. Shows the rebrand propagating through the system. → `MediaGrid cols={2}` (before/after) + `MediaFull width="container"` (brand board). 2–3 images.

### "The design system came second"
A Figma component-library / tokens sheet — buttons, inputs, color tokens, type scale. Backs the "system was survival" point. → `MediaFull width="wide"`. 1 image.

## Priority 3 — supporting

### What We Learned From Learners (the core insight)
A clean diagram of the insight: **listening comprehension (high) vs speaking ability (low)** for diaspora learners, ideally mapped to which modality bridges each gap. A simple data-viz or research-synthesis board. → `MediaFull width="content"`. 1 image (could be authored, not a screenshot).

### Kids mode
Kids-mode screen(s) — simplified nav, larger touch targets, playful — ideally beside the adult equivalent to show "same system stretched." → `MediaGrid cols={2}`. 1–2 images.

### Business impact (Proof)
A press + partnership logo strip: **Forbes, Techpoint, Afrotech** (press) and **Google, Mastercard Foundation** (partners). Optional: the Forbes feature screenshot. → `MediaFull width="content"` or a logo row. 1 image.

### The Arrival (optional opener)
Device hero — the app on iPhone + Android (home/dashboard) on a branded bg; reinforces "web-only → mobile." → `MediaFull width="container"`. Optional, 1 image.

## Not needed
**What users said** (quotes render fine as text; reviewer avatars/review screenshots optional) · **What I Missed** · closing paragraph.
