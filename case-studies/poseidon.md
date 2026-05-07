---
slug: poseidon
title: Poseidon — Taming the Fintech Sea Monster
subtitle: How a Nigerian fintech got one design language across web, mobile, and POS
role: Lead Product Designer
team:
  - Opeyemi Ajagbe — Lead Product Designer
  - Ayo — Product Designer
  - Seun — Product Designer
  - Product — Product Management
  - Engineering — Front-end Engineering
  - Data — Analytics & Instrumentation
  - Ops — Support & Operations
timeline: not disclosed
platforms: [web, ios, android, pos]
heroImage: /images/case-studies/poseidon-hero.png
heroLogo: /images/case-studies/poseidon-logo.svg
---

## Context

HydrogenPay is a Nigerian payments company whose customers move money across a web dashboard, native iOS and Android apps, and physical POS terminals on shop counters in Lagos, Abuja, and Port Harcourt. When I joined as Lead Product Designer, the same merchant could refund a transaction three different ways depending on which surface they reached for — different button shapes, different field orders, even different words for the same action.

The product had grown faster than its design rails. Each surface had its own designer, its own component habits, and a separate front-end stack picking up the slack. There was no shared source of truth — only screens that happened to look related.

The trigger was a planned POS expansion: a new terminal SKU was queued for the next quarter, and shipping it on the existing patchwork would have meant rebuilding primitives a fourth time. Leadership asked the design team to fix the foundation before adding another floor. I led the design and experience work on Poseidon inside a cross-functional team spanning Product, Design, Engineering, Data, and Ops.

## Problem

Merchants and engineers were both paying a recognition tax: the same task looked different on each surface, and developers kept rebuilding primitives per platform.

- Internal user testing surfaced repeated confusion when merchants moved between web and mobile — primary actions sat in different places and used different verbs.
- Support flagged tickets where users assumed a flow had failed because the success state on POS looked nothing like the success state on web.
- Engineers maintained three near-duplicate button, input, and modal implementations, with no shared tokens for spacing or color.
- Side-by-side, marketing screenshots from web, mobile, and POS read like three different products.

Baseline adoption and satisfaction were not measured pre-system — instrumentation landed alongside the rollout, so we have qualitative signal only for the before-state.

Cost of inaction: every new feature multiplied the problem by three, and the planned POS SKU would have made it four.

## Constraints

- **Multi-platform parity.** The system had to render coherently on web (responsive), iOS, Android, and a low-resolution POS screen with limited touch targets and no hover state.
- **Nigerian fintech compliance and brand.** CBN-regulated flows (KYC, transaction confirmations, dispute notices) had non-negotiable language and disclosure requirements. The HydrogenPay brand also carried equity we could refine, not replace.
- **Lean front-end capacity.** A small engineering team meant the system had to ship in adoptable slices — no big-bang rewrite.
- **Accessibility floor: WCAG 2.1 AA.** Color contrast, keyboard navigation, and screen-reader semantics were ship-blockers, not polish.
- **Aggressive timeline.** First adoptable slice had to land before the POS SKU entered build.

When constraints collided, we chose **accessibility and platform familiarity over visual novelty** — a decision that killed at least one direction outright (see Process, beat 4).

## Process

1. **Mapped the drift before drawing anything new.** I pulled every primary-action screen across web, mobile, and POS into one Figma board and annotated the variance — eleven button styles, six input behaviors, four ways of saying "transaction successful." This audit, not a moodboard, set the scope. **Lens: Recognition over Recall** — every divergence was a memory tax we were charging the merchant. *Visual artifact: `/images/case-studies/poseidon-before-after.png` — 16:9 split. Alt: "Before/after: confirmation screen. Left: three divergent success states across web, mobile, POS. Right: one shared pattern."*

2. **Talked to merchants and engineers in the same week.** Six merchant interviews surfaced the moments they hesitated; four engineering conversations surfaced where the codebase fought them. **Lens: Jobs-to-Be-Done** — listening for the job a merchant was hiring the screen to do flipped our priority order. Accessibility of tap targets on POS jumped above visual refinement.

3. **Built atoms before screens.** Adopting Brad Frost's Atomic Design, we defined tokens (color, spacing, type, radius) first, then atoms (button, input, icon), then molecules (form rows, list items), then organisms (transaction card, KYC step). **Lens: Chunking / Uniform Connectedness** — grouping by composition let designers and engineers reason about the same units. The decomposition changed delivery cadence: once tokens shipped, every downstream component PR shrank to hours, not days, and a token change in Figma matched a token change in code. *Visual artifact: `/images/case-studies/poseidon-button-specimen.png` — 1:1. Alt: "Component specimen: button — default, hover, focus, loading, disabled, destructive states across web, mobile, and POS."* *Visual artifact: `/images/case-studies/poseidon-system-diagram.png` — 16:9. Alt: "System diagram: design tokens feeding atoms (button, input), feeding molecules (form row, list item), feeding organisms (transaction card, KYC step)."*

4. **Discarded a custom motion language.** An early direction added a HydrogenPay-specific transition curve across all surfaces. POS hardware couldn't render it without dropped frames, and on Android it fought platform expectations. **Lens: Jakob's Law** — users spend most of their time on other apps; meeting their muscle memory beat asserting a house style. We adopted platform-native motion instead — iOS easing on iOS, Material on Android, no motion on POS. The system got duller and more correct.

5. **Shipped in adoptable slices.** **Lens: Pareto** — the 20% of components touched by 80% of flows (button, input, transaction card, confirmation modal) shipped first; the long tail followed when teams pulled it. The learning move: a migration checklist beat a big-bang rewrite because engineering kept delivering features the whole way through. *Visual artifact: `/images/case-studies/poseidon-user-flow.png` — 16:9. Alt: "User flow: refund transaction → confirmation → receipt, rendered identically on web, mobile, and POS."*

## Outcome

Headline: **the conversation around Poseidon changed.** Support and stakeholder threads stopped opening with *"why is this breaking, why is it so hard to operate?"* and shifted to nuanced asks about *insights and extensibility* — the Peak-End signal that the foundation had stopped being the bottleneck.

Poseidon sat inside HydrogenPay's 2023–2024 turn from loss-making to profitable as the UX and infrastructure layer that lowered friction on high-volume payment flows and reduced support and ops overhead. Poseidon was one input among many in that turnaround — we are not claiming isolated revenue or profit numbers — but the foundation it laid is now load-bearing for every flow shipped after it.

Qualitative signals we did see:

- The POS SKU shipped on the new system without rebuilding primitives — the foundation held under a fourth surface, which was the original goal.
- Support and ops escalations on shared flows dropped in tone and volume; merchants stopped flagging confusing or blocked states on confirmations and refunds.
- Front-end engineers stopped duplicating button, input, and modal code across repos; one shared package became canonical.
- Brand expression unified across surfaces — marketing screenshots from web, mobile, and POS now read as one product.
- Internal design reviews moved from "is this consistent?" to "is this the right pattern?" — a healthier conversation.

> *"Poseidon turned a flow that constantly needed explanation into something our teams could trust and operate without babysitting."*
> — Product / Operations Lead

Residual risks: the system needs a versioning and deprecation policy before the next major brand refresh, and accessibility coverage is currently AA — a push to AAA on critical financial flows (KYC, transaction confirmations) is the obvious next investment. The migration checklist also needs to harden into automated lint rules so new screens cannot drift back to the old primitives.
