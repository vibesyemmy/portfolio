# Case-Study Narrative System

> **Source.** Ported from PUR-66 doc rev `c4bab4d1` (Narrative System v2 — Case-Study Story Shapes), board-approved 2026-05-08 (approval `2c5cdf72`). Voice constants anchor to PUR-64 brand-voice guide doc rev 2 `db3d27e9`. Replaces the legacy 5-section spine in `case-study-template.md` (retired, redirect note in place).
>
> **Premise.** A single 5-section template (Context → Problem → Constraints → Process → Outcome) is one story shape. Forcing every product through it flattens distinct work into one rhythm. The fix is not "more freedom" — it is a **menu of named shapes** with explicit when-to-use rules, anchored to shared design-system primitives so the portfolio still reads as one author. This is the system.

---

## 1. Story-shape menu (4 archetypes)

Four shapes cover the shipped portfolio plus the 4th planned slot. Adding more shapes risks dilution; fewer forces work back into a template. Each archetype names: **what it is**, **when to use**, **section spine**, **headline shape**, **artifact emphasis**, **avoid**.

### 1.1 Foundation Story

- **What it is.** A "we rebuilt the floor" narrative. Reader leaves understanding the **system** that now sits under future work, not the surface that shipped.
- **When to use.** System/infrastructure/platform work. Multi-surface unification. Design-system, tokenisation, primitives, migration. Outcome is *capability*, not a single feature.
- **Section spine.** Drift Audit → Tradeoff Lens → Atomic Build → Adoption Path → Foundation Held. (5 beats; "Constraints" folded into Tradeoff Lens; "Outcome" reframed as Foundation Held — what it lets the team do *now*.)
- **Headline shape.** Lead with the **conversation that changed**, not a percentage. "Threads stopped opening with X and shifted to Y." Peak-End is the *kind* of question now possible.
- **Artifact emphasis.** System diagram + component specimen + before/after across surfaces. User flow optional. Sketch/wireframe rare.
- **Avoid.** Per-screen show-and-tell. Numeric outcome theatre when instrumentation post-dated the work — say so honestly.

### 1.2 Constraint Puzzle

- **What it is.** A "the box was the brief" narrative. Reader leaves believing the constraints *forced* the craft, not the other way round.
- **When to use.** Bounded sandbox work — plugins, embedded surfaces, hardware-limited UI, regulated flows, AI-output design. Constraints are protagonist, not footnote.
- **Section spine.** The Box → Reframe → Move 1 / Move 2 / Move 3 (each move = constraint resolved) → The Discarded Voice → The Trust Moment. (Trust Moment replaces Outcome — the beat where a real user's reaction proved the constraint-resolution shipped.)
- **Headline shape.** A scene, not a stat. "First analysis that felt human." "Six-button remote, one confirmation." The reader hears it, then learns why.
- **Artifact emphasis.** Before/after on the specific constraint (e.g. transparent-layer contrast). System diagram of the bounded architecture. Component specimen for the trust-bearing micro-pattern (response card, focus ring, confirmation modal).
- **Avoid.** Listing constraints you didn't feel. If a limit never bit a decision, cut it.

### 1.3 Demo Tour

- **What it is.** A "walk the surface with me" narrative. Reader leaves having *toured* the product as a guest would, with the design thinking exposed at each station.
- **When to use.** Surface-rich finished products with strong IA. Multi-section apps, dashboards, consumer experiences where the **shape of the home** is the design move. Outcome is *legibility for a transient audience*.
- **Section spine.** The Brief → The Verbs (or sections, or modes — the IA spine) → Walk-the-Verbs (one beat per verb, each carrying its own design lens) → The Cut (discarded direction) → What the Room Now Does. (The Verbs section is the load-bearing move — it shows the IA before any screen.)
- **Headline shape.** A reframe of the surface itself. "The room became the front desk." "One console, whole stay." Not a metric.
- **Artifact emphasis.** Hero of the home, then per-section grids/details (the tour). Animated overview welcome. User flow showing press/click count for input-constrained UI. Prototype embed if available.
- **Avoid.** Process narration that drowns the tour. Personalisation/segmentation digressions that didn't ship. Touring sections that look the same — pick the 3–4 that earn screen-time.

### 1.4 Forensic Reveal

- **What it is.** A "look what I found in the data" narrative. Reader leaves knowing the **hidden problem** the work surfaced before solving — diagnosis is the headline move.
- **When to use.** Research-led, instrumentation-led, or audit-led work where the *insight* outranks the build. Conversion problems, retention drops, accessibility audits, qualitative-evidence redesigns. Best fit for the **4th planned case**.
- **Section spine.** The Symptom → The Hunt (research/instrumentation/audit method) → The Reveal (the misdiagnosed root) → The Intervention → What the Numbers Said. (Process and Outcome are split across Hunt + Reveal + Intervention; numbers earn the closing slot.)
- **Headline shape.** The misdiagnosis, in plain language. "Users weren't dropping off at checkout — they were never reaching it." A claim that reframes the reader's assumption.
- **Artifact emphasis.** Research synthesis (affinity diagram, journey map). Before/after of the misdiagnosed flow. Charts/instrumentation visuals. User-quote pull-out. Component specimen rare.
- **Avoid.** Burying the reveal under method. Method earns trust, but the reveal is what readers remember.

> **Boundary rule.** A piece of work picks **one** archetype. If two genuinely fit, the work is two case studies — split it. Hybrid shapes drift back toward the flat template.

---

## 2. Constants vs. variables

Coherence comes from constants. Distinctiveness comes from variables. The split below is the contract every case study honours.

### 2.1 Constants (every case study, no exceptions)

**Voice & language**

- §0 six traits from PUR-64 voice-guide: Direct + efficient · Purposeful, not casual · Technically literate, no over-explain · Collaborative + decisive · Nigerian directness, professional · Confident, concise, outcome-focused.
- §3 plain-English rules — short sentences, one idea per line, no hedging, no "I had the pleasure of…".
- §5 honesty pattern — `[METRIC NEEDED]` / `[ARTIFACT NEEDED]` italic gap-acks instead of inventing numbers. Same shape across all 4 archetypes; no per-archetype hedging variants.
- §7 worked examples (hero, about, card row) as reference patterns. Card row stays the Ekemini three-line shape (hook · what · proof) regardless of archetype.

**Information architecture & meta**

- One H1, no skipped heading levels. Shared `<CaseStudyMeta>` component (per PUR-60) on every page — h3 metadata under h1 title.
- `<CaseStudyNav prev/next>` at end. Slug registered in `src/config/case-studies.js`.
- Frontmatter schema (slug · title · subtitle · role · team · timeline · platforms · heroImage · heroLogo · ctaLabel · ctaHref). Subtitle ≤ 12 words.

**Type, grid, motion**

- Type scale: H1 `text-4xl md:text-5xl lg:text-6xl`, H2 `text-2xl md:text-3xl`, body `text-base md:text-lg`. No new sizes per case.
- Body container `max-w-7xl`, prose width ~65–75ch.
- Section padding `py-16 md:py-24`. Image-to-paragraph gap `mt-8`.
- Background `bg-neutral-950` + `text-white` + `text-neutral-300/400` for muted copy.
- Motion respects `prefers-reduced-motion`. Platform-native motion vocabulary (per Poseidon's Jakob's-Law decision).

**Accessibility floor**

- WCAG 2.1 AA — contrast ≥ 4.5:1 body, ≥ 3:1 large/UI. Keyboard reachable, visible focus rings. Alt text on every image (decorative `alt=""`). No info via colour alone.

**Honesty posture**

- Every claim sourced or qualified. Unmeasured baselines stated explicitly. Discarded directions named in every case study — readers trust process when they see the dead ends.

### 2.2 Variables (flex per case, by archetype)

**Section spine.** Per §1 archetype. Spine names + count differ; the underlying beats (context, decision, evidence, outcome) are still all present, re-cast for the shape.

**Hero treatment.** Single shared component `<CaseStudyHero variant>` ships across all 4 archetypes — fills swap, scaffold stays. Variants:

- *Foundation Story* — `variant="composite"` — multi-surface composite hero (web · mobile · POS panels in one frame).
- *Constraint Puzzle* — `variant="bounded"` — hero is the bounded surface itself (plugin window, console screen, embedded canvas).
- *Demo Tour* — `variant="home"` — the home/landing surface of the product, full-bleed.
- *Forensic Reveal* — `variant="before-state"` — the **misdiagnosed flow's before-state**, not a data-viz chart. The data lands inside The Hunt, not in the hero.

Logo placement, hero copy length, CTA presence flex inside the variant. Single component = one a11y contract, one focus-order, one motion guard.

**Accent palette.** Brand gradient (`from-purple-600 to-blue-600`) plus the `purple-300/400/500` ramp stays **universal across all 4 archetypes** — no per-case hue swap. Per-archetype variable is **accent-surface placement in spine**, not hue:

- *Foundation* — accent on Tradeoff Lens divider + Foundation-Held pull-quote rule.
- *Constraint Puzzle* — accent on Trust-Moment pull-quote rule + Move beat numerals.
- *Demo Tour* — accent on Verbs IA chips + Walk-the-Verbs station markers.
- *Forensic Reveal* — accent on Reveal sentence rule + Numbers chart key line.

Rationale: portfolio must read as one author; per-case hue swaps trigger §4 risk 1 from PUR-66. Accent rules (link underlines, focus rings, dividers, pull-quotes) hold — driven by the universal gradient/ramp, not per-case hue.

**Artifact emphasis.** Single shared component `<CaseStudyArtifact ratio caption>` wraps every artifact slot. Ratio menu: `16:9 | 4:3 | 1:1 | 9:16`. Per §1, drives which slots from the template carry weight (system-diagram-heavy vs. screen-grid-heavy vs. chart-heavy). Each shape has 1–2 *signature* artifacts that tell the story; signature lists in §1 are *defaults*, not requirements.

**Voice tone-dial.** Inside §0 traits, the §2 PUR-64 tone matrix flexes per archetype. Each dial below ships with a guard-rail to keep §0 trait 2 (Purposeful, not casual) intact under "warmth up" / "formality low" settings. Once voice-guide §7.4 per-archetype samples land, this column references the sample anchor instead of restating the dial inline.

- *Foundation Story* — **formality mid-high**, warmth medium, pace measured. Tone in one line: "Here's the floor we built and what it now lets the team do."
  *Guard-rail.* No ceremonial connectors ("In this work, we sought to…"), no résumé exposition, no "I had the pleasure of…" openers. §3.1 short-word-over-long-word still applies — Tradeoff Lens does not get to use "operationalize."
- *Constraint Puzzle* — warmth up, formality medium, pace varied (scene-setting beats slow, move beats short). Tone in one line: "The box was the brief; here's how it forced the craft."
  *Guard-rail.* Warmth comes from concrete scenes ("first analysis that felt human") and named users — never from filler openers, second-person chumminess ("you know how it is when…"), or exclamation beats. The Discarded Voice beat stays mandatory.
- *Demo Tour* — warmth up, formality low, pace brisk per station. Tone in one line: "Walk it with me, station by station."
  *Guard-rail.* Low-formal ≠ conversational filler. No "Let's take a look at…", no "Pretty cool, right?", no second-person tour-guide voice. Plain-English declaratives, station by station — the rhythm is brisk, not chatty. Most casual-drift-prone setting; §6 ban-list applies in full.
- *Forensic Reveal* — moving dial: warmth medium, formality high through Hunt, low at Reveal, decisive at Intervention. Tone in one line: "Here's what the data was actually saying."
  *Guard-rail.* Hunt formality is procedural-honest (named method, named sample, named tool — e.g. "30 interviews with POS merchants in Lagos and Onitsha"). Not academic-passive. Reveal is §0 trait 1 at peak; single-sentence Reveal allowed and encouraged.

**Per-section word caps.** Caps are **ceilings, not targets** — short is fine. **Hard floor: 60 words per section.** Below that, the section is not earning its slot — fold into a neighbour or cut. Total stays in the 660–1000 corridor.

| Archetype | Section | Cap | Spine total |
|---|---|---:|---:|
| **Foundation Story** | Drift Audit | 120 | |
| | Tradeoff Lens *(load-bearing)* | 220 | |
| | Atomic Build | 200 | |
| | Adoption Path | 180 | |
| | Foundation Held | 180 | **900** |
| **Constraint Puzzle** | The Box | 120 | |
| | Reframe | 120 | |
| | Move 1 / Move 2 / Move 3 | 160 each (480) | |
| | The Discarded Voice | 100 | |
| | The Trust Moment | 130 | **950** |
| **Demo Tour** | The Brief | 100 | |
| | The Verbs *(load-bearing IA)* | 140 | |
| | Walk-the-Verbs (× 4) | 140 each (560) | |
| | The Cut | 100 | |
| | What the Room Now Does | 100 | **1000** |
| **Forensic Reveal** | The Symptom | 100 | |
| | The Hunt | 220 | |
| | The Reveal *(peak — short on purpose)* | 120 | |
| | The Intervention | 220 | |
| | What the Numbers Said | 180 | **840** |

**Hook (first 12 words).** §1 Headline shape determines the rhythm. Foundation = conversation-changed; Constraint = scene; Demo = surface-reframe; Forensic = misdiagnosis. No archetype opens with a stat.

**Forensic hook clickbait gate.** Every Forensic hook clears all three before shipping. Hook must be the diagnosis itself in plain English; if it doesn't fit one sentence, it is not ready.

1. **Named, not vague.** *"Users weren't dropping off at checkout — they were never reaching it"* passes. *"The real reason your funnel is broken"* fails.
2. **Sourced inside the page.** The reframe must be evidenced in The Hunt section. If the data is not in the case study, the hook is a claim without a receipt — rewrite or cut.
3. **No reader-blame.** The misdiagnosis is the *team's* prior assumption, never the reader's. *"We thought X, the data said Y"* works. *"You think your checkout is the problem? Wrong."* fails.

---

## 3. Mapping (current portfolio + 4th slot)

| Case study | Archetype | Why this shape | Voice tone-dial (§2.2) | Signature artifacts |
|---|---|---|---|---|
| PUR-45 **Poseidon** | **Foundation Story** | Multi-surface design-system work; outcome is the floor under future shipping; Peak-End is "the conversation changed". | Foundation dial (formality mid-high, warmth medium, measured). | System diagram (tokens → atoms → molecules → organisms) · Button specimen across web/mobile/POS · Before/after confirmation screen |
| PUR-46 **UX Buddy** | **Constraint Puzzle** | Figma plugin sandbox + AI unpredictability + transparent-layer contrast = constraints as protagonist; Trust Moment closes the loop. | Constraint Puzzle dial. | Two-process system diagram · Strengths/Opportunities/Recommendations response card · Diff-tag specimen (✅🆕🔁) |
| PUR-47 **Hotel Hub** | **Demo Tour** | Four-verb IA (Watch · Play · Listen · Stay) is the design move and the tour spine; transient guest audience demands legibility-led narrative. | Demo Tour dial. | Home hero + animated overview · Per-verb grid+detail pairs · Stay carousel (5-slide booking flow) |
| **4th slot (TBD — pending PUR-77)** | **Forensic Reveal** *(default)* | Portfolio currently has no diagnosis-led story. Forensic adds research/instrumentation muscle the other three shapes don't carry. **Hero = misdiagnosed before-state, not data-viz.** Update on PUR-77 close (Forensic vs. Before/After verdict). | Forensic moving dial. | Research synthesis / journey map · Misdiagnosis before-state · Numbers chart at close (inside The Hunt, not the hero) |

> **Selection criterion for 4th case.** Pick the project where the **insight outranked the build**. If no shipped project fits, write a research-led slice — the Forensic shape doesn't require a full ship.

---

## 4. Rewrite hard-gate (3-check protocol)

Every case-study rewrite (PUR-45 / PUR-46 / PUR-47 / 4th-slot) must clear this gate before merge. James UI/UX owns the review.

On **1440×900 desktop + 390×844 mobile**, run on the 3 shipped case studies before 4th-slot lock:

- **Squint test (30%):** at 30% browser zoom-out, can a viewer tell the 3 cards apart by *shape* (hero variant + spine pacing) rather than by colour?
- **Type-scale parity:** H1/H2/body sizes match across all 3 (per §2.1 type scale); no per-case override slips through.
- **Accent-surface check:** every accent application maps to the §2.2 placement list for that archetype (no rogue hue, no rogue surface).

---

## 5. Frontmatter (shared across archetypes)

```yaml
slug: {{kebab-case-id}}                 # used in /config/case-studies.js
title: {{Case Study Title}}             # 3–7 words
subtitle: {{Hook line}}                 # ≤ 12 words, sets emotional tone
role: {{Your role}}                     # e.g. "Lead Product Designer"
team: [{{name + role}}, ...]            # for AnimatedTooltip
timeline: {{e.g. Jun 2024 – Sep 2024}}
platforms: [web, ios, android, figma-plugin]
heroImage: /images/case-studies/{{slug}}-hero.png
heroLogo: /images/case-studies/{{slug}}-logo.svg   # optional
ctaLabel: {{e.g. "Try the plugin"}}     # optional
ctaHref: {{external url}}               # optional
heroVariant: composite | bounded | home | before-state   # per archetype
```

---

## 6. Per-archetype skeletons

Drop-in stubs. Pick one based on §1 archetype fit. Each section header carries its word-cap (ceiling), tone-dial line, and accent-surface placement note.

### 6.1 Foundation Story skeleton

```markdown
---
{frontmatter — heroVariant: composite}
---

# {{Title — conversation that changed}}

<CaseStudyMeta role={{...}} team={{...}} timeline={{...}} />

<CaseStudyHero variant="composite" image={{heroImage}} alt={{...}} />

## Drift Audit  <!-- ≤ 120 words -->
<!-- Tone: formality mid-high, warmth medium, measured. -->
<!-- Accent: none in this beat. -->

{{What the floor looked like before. Drift evidence — surfaces diverging, tokens duplicating, conversations stalling. One trigger sentence.}}

## Tradeoff Lens  <!-- ≤ 220 words — load-bearing -->
<!-- Tone: same. State the lens, name the conflicts it resolved. -->
<!-- Accent: divider rule above this section uses brand gradient. -->

{{The lens you used to choose. 2–4 named conflicts (e.g. "speed-to-ship over visual novelty"). Discarded direction lives here, not in a separate beat.}}

## Atomic Build  <!-- ≤ 200 words -->
<!-- Tone: same; pace tightens. -->
<!-- Accent: none. -->

<CaseStudyArtifact ratio="16:9" src={{system_diagram}} alt="System diagram: tokens → atoms → molecules → organisms" />

{{Tokens → atoms → molecules → organisms. Name the primitives. Show the system diagram.}}

<CaseStudyArtifact ratio="1:1" src={{component_specimen}} alt="Component: <name>, states <list>" />

## Adoption Path  <!-- ≤ 180 words -->
<!-- Tone: same. -->
<!-- Accent: none. -->

{{How the system reached the surfaces. Migration order, who adopted first, what broke, how the rollout was sequenced.}}

<CaseStudyArtifact ratio="16:9" src={{before_after}} alt="Before/after: <surface>. Left: <prior>. Right: <new>" />

## Foundation Held  <!-- ≤ 180 words -->
<!-- Tone: same; close on capability, not a percentage. -->
<!-- Accent: pull-quote rule (left border) uses brand gradient. -->

{{What the team can now do that they couldn't before. The conversation that changed. Residual risks named honestly. [METRIC NEEDED] gap-acks where instrumentation post-dated the work.}}

> {{Pull-quote — the conversation that changed}}

<CaseStudyNav prev={{...}} next={{...}} />
```

### 6.2 Constraint Puzzle skeleton

```markdown
---
{frontmatter — heroVariant: bounded}
---

# {{Title — a scene, not a stat}}

<CaseStudyMeta role={{...}} team={{...}} timeline={{...}} />

<CaseStudyHero variant="bounded" image={{heroImage}} alt={{the bounded surface itself — plugin window, console screen, embedded canvas}} />

## The Box  <!-- ≤ 120 words -->
<!-- Tone: warmth up, formality medium, scene-setting (slow). -->
<!-- Accent: none. -->

{{Name the bounded surface and its hard limits. Reader leaves knowing exactly what could and could not be touched.}}

## Reframe  <!-- ≤ 120 words -->
<!-- Tone: same; this is the pivot beat. -->
<!-- Accent: none. -->

{{The mental shift that turned the box from obstacle into brief.}}

## Move 1 — {{constraint resolved}}  <!-- ≤ 160 words -->
<!-- Tone: warmth up, pace short. -->
<!-- Accent: Move numeral "1" rendered in brand gradient. -->

<CaseStudyArtifact ratio="16:9" src={{before_after}} alt="Before/after: <constraint surface>" />

{{What you did + what changed because of it. Cite the lens (Hick's, Fitts's, Recognition over Recall, etc.) when it drove the decision.}}

## Move 2 — {{constraint resolved}}  <!-- ≤ 160 words -->
<!-- Accent: Move numeral "2" in brand gradient. -->

{{...}}

## Move 3 — {{constraint resolved}}  <!-- ≤ 160 words -->
<!-- Accent: Move numeral "3" in brand gradient. -->

<CaseStudyArtifact ratio="1:1" src={{component_specimen}} alt="Trust-bearing micro-pattern: <name>, states <list>" />

{{...}}

## The Discarded Voice  <!-- ≤ 100 words — mandatory -->
<!-- Tone: warmth up; name the cut, do not hand-wave. -->
<!-- Accent: none. -->

{{The direction you killed and why. Concrete, not hand-waved.}}

## The Trust Moment  <!-- ≤ 130 words -->
<!-- Tone: warmth up; close on the scene where a real user's reaction proved it shipped. -->
<!-- Accent: pull-quote rule uses brand gradient. -->

> {{User quote — ≤ 25 words, attributed by role}}

{{The scene that proved the constraint-resolution landed.}}

<CaseStudyNav prev={{...}} next={{...}} />
```

### 6.3 Demo Tour skeleton

```markdown
---
{frontmatter — heroVariant: home}
---

# {{Title — surface reframe (e.g. "The room became the front desk")}}

<CaseStudyMeta role={{...}} team={{...}} timeline={{...}} />

<CaseStudyHero variant="home" image={{heroImage}} alt="Home/landing surface of {{product}}" />

## The Brief  <!-- ≤ 100 words -->
<!-- Tone: warmth up, formality low, brisk. -->
<!-- Accent: none. -->

{{Who the product is for, what surface it lives on, what kind of audience walks in. Transient or returning? Guest or staff?}}

## The Verbs  <!-- ≤ 140 words — load-bearing IA -->
<!-- Tone: same. Show IA before any screen. -->
<!-- Accent: each verb chip rendered with brand-gradient border. -->

{{The IA spine. Name the 3–5 verbs (or sections, or modes). This is the design move; it earns its own beat before the tour starts.}}

<CaseStudyArtifact ratio="16:9" src={{ia_diagram}} alt="IA: <verb 1> · <verb 2> · <verb 3> · <verb 4>" />

## Walk the Verbs

### {{Verb 1}}  <!-- ≤ 140 words -->
<!-- Accent: station marker dot for verb 1 in brand gradient. -->

<CaseStudyArtifact ratio="4:3" src={{verb1_screen}} alt="<verb 1>: <primary action>" />

{{One station of the tour. What the user does here. The design lens that drove the layout (Fitts's Law for input-constrained UI, Progressive Disclosure for dense surfaces, etc.).}}

### {{Verb 2}}  <!-- ≤ 140 words -->
<!-- Accent: station marker dot for verb 2. -->
{{...}}

### {{Verb 3}}  <!-- ≤ 140 words -->
<!-- Accent: station marker dot for verb 3. -->
{{...}}

### {{Verb 4}}  <!-- ≤ 140 words -->
<!-- Accent: station marker dot for verb 4. -->
{{...}}

## The Cut  <!-- ≤ 100 words -->
<!-- Tone: same; name the discarded direction. -->
<!-- Accent: none. -->

{{The personalisation/segmentation/section that didn't ship and why.}}

## What the Room Now Does  <!-- ≤ 100 words -->
<!-- Tone: brisk close; legibility outcome, not a percentage. -->
<!-- Accent: none. -->

{{What the surface now does for the transient audience. [METRIC NEEDED] gap-acks honest if instrumentation isn't there.}}

<CaseStudyNav prev={{...}} next={{...}} />
```

### 6.4 Forensic Reveal skeleton

> Default skeleton for the 4th slot. Update on PUR-77 close if the verdict swaps Forensic for Before/After.

```markdown
---
{frontmatter — heroVariant: before-state}
---

# {{Title — the misdiagnosis in plain English (clears 3-part hook gate)}}

<CaseStudyMeta role={{...}} team={{...}} timeline={{...}} />

<CaseStudyHero variant="before-state" image={{heroImage}} alt="Before-state of the misdiagnosed flow — not a chart" />

## The Symptom  <!-- ≤ 100 words -->
<!-- Tone: formality high, warmth medium, procedural. -->
<!-- Accent: none. -->

{{What the surface signal looked like. Drop, plateau, complaint pattern, audit finding. State it without naming the misread yet.}}

## The Hunt  <!-- ≤ 220 words -->
<!-- Tone: high formality, procedural-honest. Named method, named sample, named tool. -->
<!-- Accent: none. -->

<CaseStudyArtifact ratio="16:9" src={{research_synthesis}} alt="Research synthesis: <method> across <sample>" />

{{The method. "30 interviews with POS merchants in Lagos and Onitsha." "Heatmap + funnel-step instrumentation across 6 weeks." "WCAG audit on 14 screens." Show the work; this is where trust is earned.}}

## The Reveal  <!-- ≤ 120 words — peak, short on purpose -->
<!-- Tone: formality drops; this is §0 trait 1 at peak. Single-sentence Reveal allowed and encouraged. -->
<!-- Accent: Reveal sentence rendered with brand-gradient underline rule. -->

{{The misdiagnosed root. Plain English. Receipts already laid in The Hunt.}}

## The Intervention  <!-- ≤ 220 words -->
<!-- Tone: decisive. -->
<!-- Accent: none. -->

<CaseStudyArtifact ratio="16:9" src={{before_after_flow}} alt="Before/after: misdiagnosed flow. Left: prior. Right: new." />

{{What you changed because of the reveal. Why this intervention follows from the diagnosis (not from a generic best-practice).}}

## What the Numbers Said  <!-- ≤ 180 words -->
<!-- Tone: decisive close. Numbers earn the closing slot. -->
<!-- Accent: chart key line in brand gradient. -->

<CaseStudyArtifact ratio="16:9" src={{numbers_chart}} alt="Outcome chart: <metric> over <window>" />

{{Headline metric in the first line. Supporting metrics. Residual risks. [METRIC NEEDED] / [ARTIFACT NEEDED] gap-acks instead of inventing numbers.}}

> {{Optional pull-quote — stakeholder/user, ≤ 25 words}}

<CaseStudyNav prev={{...}} next={{...}} />
```

---

## 7. References

- PUR-66 v2 doc rev `c4bab4d1` — narrative system source of truth (board-approved 2026-05-08).
- PUR-64 voice-guide doc rev 2 `db3d27e9` — §0 traits, §3 plain-English rules, §5 honesty pattern, §6 ban-list, §7 worked examples.
- PUR-60 — `<CaseStudyMeta>` h-order component shipped on all 5 case-study pages.
- PUR-77 — Forensic vs. Before/After verdict for 4th slot. Update §6.4 skeleton on close.
