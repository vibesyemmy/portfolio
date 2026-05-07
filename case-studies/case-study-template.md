# Case-Study Template

Reusable schema for every case study on the portfolio site. Five sections, in order, no nesting:
**Context → Problem → Constraints → Process → Outcome**.

A blank instance should be fillable in under 30 minutes by a writer with the raw material on hand.

---

## How to use this template

1. Duplicate this file under `docs/case-studies/<slug>.md` (or fill the React page directly — both share the schema).
2. Replace every `{{placeholder}}` with real content. Delete prompt blockquotes once filled.
3. Keep the section order. Do not add sub-sections beyond what is listed here.
4. Stay inside the word-count guidance — case studies that drift past the cap lose readers (Peak-End Rule, F-pattern scanning).
5. Match the visual language already established by `StripBanner` and the UX Buddy hero pattern. New tokens / components require a system-level proposal, not an inline override.

---

## Frontmatter (metadata)

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
```

---

## Section 1 — Context (~120–180 words)

> **Prompt:** Where were we? Set the scene in two beats: what the product/team/market looked like before the work, and what triggered this project.
> Lead with information scent — the reader should know *what space we're in* by the end of the first sentence.

**Required elements**

- One opening sentence naming the product, audience, and surface (web app / plugin / mobile / etc.).
- One paragraph on the starting state: scale, stakeholders, prior solution (if any).
- One sentence on the trigger — what new constraint, opportunity, or signal kicked the work off.

**Avoid**

- Company history paragraphs. The reader is here for the design work.
- Vague hooks ("In today's fast-paced world…").

---

## Section 2 — Problem (~100–160 words)

> **Prompt:** What hurt, and for whom? State the user-side and business-side pain in plain language, with evidence.
> Use Jobs-to-Be-Done framing where natural ("when I'm doing X, I want Y, so I can Z").

**Required elements**

- One-sentence problem statement (the headline a stranger could repeat back).
- 2–4 bullets of evidence: research quotes, support tickets, analytics, NPS verbatim, observed behavior.
- One sentence on the cost of inaction (churn, missed conversion, manual overhead, brand risk).

**Metric placeholder slots** *(use any that apply — delete the rest)*

- `{{baseline_adoption}}` — e.g. `12% weekly active out of 40k seats`
- `{{baseline_conversion}}` — e.g. `2.1% checkout completion`
- `{{baseline_time}}` — e.g. `~14 min average task time`
- `{{baseline_satisfaction}}` — e.g. `NPS -8` or `CSAT 62%`
- `{{qualitative_quote}}` — one verbatim user quote, ≤ 25 words, attributed by role not name

---

## Section 3 — Constraints (~80–140 words)

> **Prompt:** What was non-negotiable? List the rails the design had to run on. This is where you earn credibility — readers can tell when constraints are honest vs. retrofitted.

**Required elements**

- 3–6 short bullets covering any of: technical (stack, performance budget), platform (HIG/Material), regulatory/compliance, brand, accessibility (WCAG level), timeline, team size, data limits.
- One sentence on the tradeoff lens you used to resolve conflicts when constraints collided (e.g. "accessibility over animation polish", "speed-to-ship over visual novelty").

**Avoid**

- Listing constraints you didn't actually feel. If it never bit, it isn't a constraint.

---

## Section 4 — Process (~220–320 words)

> **Prompt:** How did you get from problem to solution? Show the moves, not the Figma file. Three to five beats max — pick the ones that changed the outcome.

**Required elements**

- 3–5 numbered beats. Each beat = **what you did** + **what you learned** + **what changed because of it**.
- Name the design lenses you applied (Hick's Law, Progressive Disclosure, Fitts's Law, Doherty Threshold, Recognition over Recall, etc.) when they drove a decision.
- One paragraph on a discarded direction and why — readers trust process more when they see the dead ends.

**Visual artifact slots** *(every case study should have at least 3 of these — pick what tells the story)*

| Slot                   | Aspect ratio | Alt-text guidance                                                      |
| ---------------------- | ------------ | ---------------------------------------------------------------------- |
| `{{user_flow}}`        | 16:9         | "User flow: <entry> → <decision points> → <success state>"             |
| `{{before_after}}`     | 16:9 split   | "Before/after: <surface name>. Left: <prior state>. Right: <new state>"|
| `{{key_screens}}`      | 4:3 each     | Per-screen alt: "<surface>: <primary action>"                          |
| `{{system_diagram}}`   | 16:9         | "System diagram: <inputs> feeding <component> producing <outputs>"     |
| `{{component_specimen}}` | 1:1        | "Component: <name>, states <list>"                                     |
| `{{sketch_or_wireframe}}` | 4:3        | "Early wireframe: <screen> — annotated for <intent>"                   |

> Every image must have alt text. No alt = not shipped.

---

## Section 5 — Outcome (~140–200 words)

> **Prompt:** What changed in the world because of this work? Lead with the strongest metric, end with what you'd do next.

**Required elements**

- One headline metric in the first line (Peak-End: this is the part readers remember).
- 2–4 supporting metrics or qualitative signals.
- One paragraph on residual risks or follow-ups — the reader should leave knowing this designer thinks past launch.
- Optional: one verbatim quote from a stakeholder/user.

**Metric placeholder slots** *(format hints — use exact numbers, not ranges, when possible)*

- `{{adoption_lift}}` — e.g. `+34% weekly active in 90 days`
- `{{conversion_lift}}` — e.g. `+18% checkout completion`
- `{{time_saved}}` — e.g. `−42% average task time (14 min → 8.1 min)`
- `{{nps_or_csat}}` — e.g. `NPS -8 → +21 in two quarters`
- `{{retention}}` — e.g. `D30 retention 41% → 58%`
- `{{task_completion}}` — e.g. `Task success 71% → 94% in moderated tests (n=12)`
- `{{qualitative_quote}}` — verbatim, ≤ 25 words, attributed by role
- `{{business_outcome}}` — e.g. `unblocked enterprise tier launch`, `reduced support tickets 31%`

> If a metric isn't available, say so explicitly ("not measured — instrumentation landed post-launch"). Do not invent numbers.

---

## Visual / handoff notes

- **Hero**: reuse the `BlurImageBackground` + centered logo + title + subtitle pattern from `src/pages/UXBuddy.jsx`. Hero image aspect 16:9, ≥ 1920×1080.
- **Strip banner**: optional — use `StripBanner` for a single punchy claim (max 8 words) or for rotating testimonials.
- **Body width**: `max-w-7xl` container, `prose`-equivalent line length for paragraph copy (~65–75ch).
- **Type scale**: H1 `text-4xl md:text-5xl lg:text-6xl`, H2 `text-2xl md:text-3xl`, body `text-base md:text-lg`. Don't introduce new sizes.
- **Color**: stay on `bg-neutral-950` + `text-white` + `text-neutral-300/400` for muted copy. Accent only via existing brand gradient (`from-purple-600 to-blue-600`).
- **Spacing**: section padding `py-16 md:py-24`. Image-to-paragraph gap `mt-8`. No stray values.
- **Navigation**: every case study ends with `<CaseStudyNav prev={prevCase} next={nextCase} />` — register the slug in `src/config/case-studies.js`.

## Accessibility checklist (blocks publish)

- All images have descriptive alt text (decorative images use `alt=""`).
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text and UI.
- No information conveyed by color alone.
- Motion respects `prefers-reduced-motion` — wrap any continuous animation in a media-query guard.
- Headings nest correctly: one H1, then H2 per section, no skipped levels.
- Interactive elements are reachable by keyboard with a visible focus ring.

---

## Word-count target

- Total body copy: **660–1000 words** across the five sections.
- Sections that blow past the cap should split into a separate piece, not nest sub-sections here.
