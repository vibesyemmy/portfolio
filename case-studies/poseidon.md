---
slug: fintech-monster
title: Poseidon — Taming the Fintech Sea Monster
subtitle: How a Nigerian fintech got one design language across web, mobile, and POS
role: Lead Product Designer
team:
  - Opeyemi Ajagbe — Lead Product Designer
  - Ayo — Product Designer
  - Seun — Product Designer
timeline: not measured — exact dates pending
platforms: [web, ios, android, pos]
heroImage: /images/case-studies/fintech-monster-hero.png
heroLogo: /images/case-studies/fintech-monster-logo.svg
ctaLabel: View live components
ctaHref:
---

## Context

HydrogenPay is a Nigerian payments company whose customers move money across a web dashboard, native iOS and Android apps, and physical POS terminals on shop counters in Lagos, Abuja, and Port Harcourt. When I joined as Lead Product Designer, the same merchant could refund a transaction three different ways depending on which surface they reached for — different button shapes, different field orders, even different words for the same action.

The product had grown faster than its design rails. Each surface had its own designer, its own component habits, and a separate front-end stack picking up the slack. There was no shared source of truth — only screens that happened to look related.

The trigger was a planned POS expansion: a new terminal SKU was queued for the next quarter, and shipping it on the existing patchwork would have meant rebuilding primitives a fourth time. Leadership asked the design team to fix the foundation before adding another floor.

## Problem

Merchants and engineers were both paying a recognition tax: the same task looked different on each surface, and developers kept rebuilding primitives per platform.

- Internal user testing surfaced repeated confusion when merchants moved between web and mobile — primary actions sat in different places and used different verbs.
- Support flagged tickets where users assumed a flow had failed because the success state on POS looked nothing like the success state on web.
- Engineers maintained three near-duplicate button, input, and modal implementations, with no shared tokens for spacing or color.
- Side-by-side, marketing screenshots from web, mobile, and POS read like three different products.

`{{baseline_adoption}}` — not measured (instrumentation landed post-system).
`{{qualitative_quote}}` — not yet sourced; pending merchant interviews.

Cost of inaction: every new feature multiplied the problem by three, and the planned POS SKU would have made it four.

## Constraints

- **Multi-platform parity.** The system had to render coherently on web (responsive), iOS, Android, and a low-resolution POS screen with limited touch targets and no hover state.
- **Nigerian fintech compliance and brand.** CBN-regulated flows (KYC, transaction confirmations, dispute notices) had non-negotiable language and disclosure requirements. The HydrogenPay brand also carried equity we could refine, not replace.
- **Lean front-end capacity.** A small engineering team meant the system had to ship in adoptable slices — no big-bang rewrite.
- **Accessibility floor: WCAG 2.1 AA.** Color contrast, keyboard navigation, and screen-reader semantics were ship-blockers, not polish.
- **Aggressive timeline.** First adoptable slice had to land before the POS SKU entered build.

When constraints collided, we chose **accessibility and platform familiarity over visual novelty** — a decision that killed at least one direction outright (see Process, beat 4).

## Process

1. **Mapped the drift before drawing anything new.** I pulled every primary-action screen across web, mobile, and POS into one Figma board and annotated the variance — eleven button styles, six input behaviors, four ways of saying "transaction successful." This audit, not a moodboard, set the scope. **Lens: Recognition over Recall** — every divergence was a memory tax we were charging the merchant. *Visual artifact: `{{before_after}}` — 16:9 split. Alt: "Before/after: confirmation screen. Left: three divergent success states across web, mobile, POS. Right: one shared pattern."*

2. **Talked to merchants and engineers in the same week.** Six merchant interviews surfaced the moments they hesitated; four engineering conversations surfaced where the codebase fought them. Pairing the two changed our priority list — accessibility-of-tap-targets on POS jumped above visual refinement.

3. **Built atoms before screens.** Adopting Brad Frost's **Atomic Design**, we defined tokens (color, spacing, type, radius) first, then atoms (button, input, icon), then molecules (form rows, list items), then organisms (transaction card, KYC step). Designers and engineers shared one Figma library and one component package; a token change in Figma matched a token change in code. *Visual artifact: `{{component_specimen}}` — 1:1. Alt: "Component specimen: button, default / hover / focus / loading / disabled / destructive states."*

4. **Discarded a custom motion language.** An early direction added a HydrogenPay-specific transition curve across all surfaces. POS hardware couldn't render it without dropped frames, and on Android it fought platform expectations. We cut it and adopted **platform-native motion** instead — iOS easing on iOS, Material on Android, no motion on POS. The system got duller and more correct.

5. **Shipped in adoptable slices.** We rolled the system out feature by feature behind a migration checklist rather than as a big-bang rewrite, so engineering could keep delivering. *Visual artifact: `{{user_flow}}` — 16:9. Alt: "User flow: refund transaction → confirmation → receipt, rendered identically on web, mobile, and POS."*

## Outcome

Headline: **not measured — adoption and ticket-volume instrumentation landed alongside the system, baselines unavailable.** Quantified follow-up tracked in [PUR-45](/PUR/issues/PUR-45).

Qualitative signals we did see:

- The POS SKU shipped on the new system without rebuilding primitives — the foundation held under a fourth surface, which was the original goal.
- Front-end engineers stopped duplicating button, input, and modal code across repos; one shared package became canonical.
- Brand expression unified across surfaces — marketing screenshots from web, mobile, and POS now read as one product.
- Internal design reviews shifted from "is this consistent?" to "is this the right pattern?" — a healthier conversation.

`{{adoption_lift}}` — not measured.
`{{time_saved}}` — not measured.
`{{qualitative_quote}}` — pending stakeholder sourcing.

Residual risks and follow-ups: the system needs a versioning and deprecation policy before the next major brand refresh, and accessibility coverage is currently AA — a push to AAA on critical financial flows (KYC, transaction confirmations) is the obvious next investment. The migration checklist also needs to harden into automated lint rules so new screens cannot drift back to the old primitives.
