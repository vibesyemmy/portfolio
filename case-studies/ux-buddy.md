---
slug: ux-buddy
title: UX Buddy — The Future of Feedback
subtitle: An AI design co-pilot that brings the review meeting forward
role: Creator & Lead Developer
team:
  - Opeyemi Ajagbe — Creator & Lead Developer
  - Thompson Edolo — Developer
timeline: ~3 months (solo build, evenings and weekends)
platforms: [figma-plugin]
heroImage: /images/UX-buddy.png
heroLogo: /images/uxbuddy.svg
ctaLabel: Try the plugin
ctaHref: https://www.figma.com/community/plugin/1513874084032014970/ux-buddy
---

## Context

UX Buddy is a Figma plugin built for product designers — a quiet, in-canvas reviewer that critiques the screen you are working on before you take it into a stakeholder meeting. I built it as a solo project with developer Thompson Edolo on the hardest pieces, over roughly three months of evenings and weekends.

Before UX Buddy existed, my own work had a recurring shape: a project that should have wrapped on Friday would slip into weeks of review cycles. Stakeholder meetings surfaced feedback that could have been spotted earlier; developers found UX issues during handoff; each loop meant more changes, more time, more frustration. Talking to other designers turned that pattern into a signal — the same waste was showing up across teams and tools.

The trigger was personal. I wanted a design co-pilot beside me in Figma giving thoughtful UX feedback as I worked, instead of waiting for the next review to find out what I had missed.

## Problem

Designers were getting their most important feedback at the wrong time — after the meeting, after handoff, after the cycle had already cost a week.

- Stakeholder reviews repeatedly surfaced UX issues a designer could have caught alone, given a structured second pair of eyes.
- Developers flagged UX problems at handoff that should have been resolved upstream — a recognition tax paid in re-work, not in the design phase.
- Existing audit tools either felt cold and checklist-shaped, or required leaving the canvas — both broke flow.
- One junior designer who tested an early build wrote back: *"I ran UX Buddy before my review — it caught three things I would've missed. The meeting went so much smoother."*

`[METRIC NEEDED: average review-cycle length pre/post UX Buddy — Opeyemi to confirm if any tracked baseline exists]`
`[METRIC NEEDED: number of design issues surfaced per analysis — Opeyemi to confirm typical range from internal usage]`

Cost of inaction: every late-arriving piece of feedback was a designer's afternoon spent re-doing work that a five-minute pre-review check could have prevented.

## Constraints

- **Figma plugin sandbox.** No direct web APIs, restricted storage, strict UI ↔ core message passing. The whole architecture had to live inside that bottle.
- **Solo build, lean engineering.** One designer-developer plus Thompson on the hardest bits — no room for scope creep, no team to absorb a re-architecture.
- **AI unpredictability.** Re-running an analysis on the same file could return a fresh list of issues, breaking the designer's trust in the tool.
- **Accessibility math on transparent layers.** WCAG 2.1 AA contrast had to account for backgrounds beneath semi-transparent elements — the naive calculation was wrong.
- **Tone, not just correctness.** A cold audit voice would have shipped on time and still failed — designers receive feedback emotionally; the language had to be conversational, calm, kind.

When constraints collided, the tradeoff lens was **trust over feature breadth** — every decision optimized for "would a designer believe this output and act on it?" over "how much can the tool detect?"

## Process

1. **Reframed the problem from audit to companion.** The first instinct was to build a checklist tool — alignment, contrast, spacing pass/fail. Talking to other designers reframed it: what they actually wanted was the review meeting brought forward, with a voice they trusted. **Lens: Jobs-to-Be-Done** — designers were not hiring an audit tool, they were hiring a calmer review experience. That single reframe changed everything downstream, including the response format.

2. **Locked a structured response rhythm: Strengths → Opportunities → Recommendations.** Early outputs were a wall of issues. Restructuring every analysis into the same three-beat rhythm gave designers a predictable shape they could scan and act on. **Lens: Chunking + Progressive Disclosure** — short, structured, human. The rhythm also forced the AI to lead with what was working, which lowered the emotional cost of receiving the rest.

3. **Solved contrast on transparent layers.** Calculating WCAG contrast for a button on a semi-transparent layer kept failing — the math fell apart without the background underneath. Factoring the resolved background color into the calculation unlocked accurate accessibility reporting on real Figma compositions, not just opaque mockups. **Lens: Accessibility floor (WCAG 2.1 AA)** — getting this wrong would have made the whole tool untrustworthy on the most ship-blocking issues.

4. **Split the plugin into two cooperating processes.** Figma's sandbox forced an architectural call: one part handled data (analyzing layers, screenshots), another handled the UI, and they communicated through lightweight messages. Storage pressure pushed a smart caching layer over Figma's `clientStorage`, so UX Buddy could remember past analyses without exhausting the limit. **Lens: Constraint-as-protagonist** — every limit became a design decision, not a workaround.

5. **Taught the plugin to remember.** The biggest trust break: designers fixed issues, re-ran the analysis, and got an entirely new list. The fix was diffing — comparing each run against the previous one and tagging items as ✅ Resolved, 🆕 New, or 🔁 Ongoing. **Lens: Recognition over Recall + Doherty Threshold** — the designer no longer had to mentally hold "what did it say last time?", and the sub-second response let the tool feel like a partner, not a queue. This was the move that turned the plugin from critic into mentor.

**Discarded direction: the cold-audit voice.** An early version mimicked accessibility scanners — a flat list of issues with severity tags. It tested as accurate and felt awful to use. Killed it in favor of the conversational rhythm above. The lesson: in a tool designers reach for under deadline pressure, tone is not polish — it is product.

**Visual artifacts**

- `{{hero}}` — `/images/UX-buddy.png` (16:9). Alt: "UX Buddy plugin running inside a Figma canvas — analysis panel beside design layers."
- `{{vision_panel}}` — `/images/the-vision.png` (16:9). Alt: "UX Buddy vision: Figma workspace with the analysis panel docked alongside a design file."
- `{{user_flow}}` — `/images/ux-buddy-chart.png` (16:9). Alt: "UX Buddy flow: Select → Analyze → Review → Iterate → Track."
- `{{before_after}}` — `/images/analysis.png` (16:9). Alt: "Before/after: contrast feedback on a transparent-layer button. Left: naive contrast result. Right: corrected reading factoring in resolved background color."
- `{{component_specimen}}` — `[ARTIFACT NEEDED: 1:1 image showing the Strengths / Opportunities / Recommendations response card with all three states]`. Alt: "Component: response card — Strengths, Opportunities, Recommendations, with diff tags ✅ Resolved, 🆕 New, 🔁 Ongoing."
- `{{showcase_marquee}}` — existing 3D marquee on `/ux-buddy` (Login, OTP, Frame selection, Top-up, Log-out confirmation, backgrounds). Alt: "Sample screens analyzed by UX Buddy across a real product flow."
- `{{team_strip}}` — Opeyemi Ajagbe (Creator & Lead Developer), Thompson Edolo (Developer). AnimatedTooltip strip already present on the live page.

## Outcome

Headline: **the first analysis that felt human** — a coworker test where the plugin surfaced, in seconds, issues that had previously taken an entire review meeting to spot. The reaction in the room was the Peak-End signal: wide eyes, then *"can I get access?"*

Supporting signals:

- A junior designer reported running UX Buddy before a review and catching three issues that would have otherwise landed in the meeting — feedback moved upstream, exactly where the tool was aimed.
- The plugin shipped publicly on the Figma Community: [UX Buddy on Figma Community](https://www.figma.com/community/plugin/1513874084032014970/ux-buddy).
- The diff-tagging behavior (✅ Resolved / 🆕 New / 🔁 Ongoing) became the most-cited reason testers said the tool felt like a mentor rather than a critic — the architecture decision in Process beat 5 was the one that earned trust.
- `[METRIC NEEDED: install / weekly active count from Figma Community dashboard — Opeyemi to pull current numbers]`
- `[METRIC NEEDED: tester satisfaction signal — any structured rating, NPS, or quote count beyond the two on file]`

> *"It feels like having a calm, honest mentor by your side — one who notices the details you miss and cheers when you improve."*
> — Tester, early access

Residual risks and follow-ups: the next iteration adds a persistence layer that saves every analysis to a database, so designers can track accessibility and usability scores across versions and see their own growth over time. Tone calibration is the other open thread — designers receive feedback emotionally, and there is more to tune in language, timing, and the order of strengths vs. opportunities than the current rhythm captures. Longer term, UX Buddy is positioned to become a family of empathetic design tools that understand intent, not just pixels.
