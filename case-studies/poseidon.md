---
slug: poseidon
title: Poseidon — Taming the Fintech Sea Monster
subtitle: One design language across web, mobile, and POS
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

<!--
Archetype: Foundation Story (PUR-66 §1.1)
Hero variant: composite — multi-surface composite (web · mobile · POS panels in one frame). Render as <CaseStudyHero variant="composite">.
Accent placement: Tradeoff-Lens divider + Foundation-Held pull-quote rule (§2.2). Universal brand gradient — no per-case hue swap.
-->

> Threads about the platform stopped opening with *"why is this breaking, why is it so hard to operate?"* and shifted to *"what insight or extension can we build on top?"* That is the foundation we built.

## Drift Audit

HydrogenPay moves money across a web dashboard, native iOS and Android apps, and physical POS terminals on shop counters in Lagos, Abuja, and Port Harcourt. By the time I joined as Lead Product Designer, the same merchant could refund a transaction three different ways depending on which surface they reached for — different button shapes, different field orders, even different words for the same action.

Each surface had its own designer, its own component habits, and a separate front-end stack picking up the slack. There was no shared source of truth, only screens that happened to look related.

I pulled every primary-action screen across web, mobile, and POS into one Figma board and named the variance: eleven button styles, six input behaviours, four ways of saying *"transaction successful."* The audit, not a moodboard, set the scope.

The trigger was external. A new POS terminal SKU was queued for the next quarter. Shipping it on the existing patchwork would have meant rebuilding primitives a fourth time. Leadership asked the design team to fix the floor before adding another room.

*Visual artifact: `/images/case-studies/poseidon-before-after.png` — `<CaseStudyArtifact ratio="16:9" caption="Eleven button styles, six input behaviours, four success states — collapsed into one shared confirmation pattern across web, mobile, and POS." />`. Alt: "Before/after: confirmation screen. Left, three divergent success states across web, mobile, and POS. Right, one shared pattern."*

## Tradeoff Lens

Coherence had to land under five constraints, and they fought each other often enough that the lens we picked decided the work.

- **Multi-platform parity.** The system had to render on web (responsive), iOS, Android, and a low-resolution POS screen with limited touch targets and no hover state.
- **Nigerian fintech compliance and brand.** CBN-regulated flows — KYC, transaction confirmations, dispute notices — carried non-negotiable language and disclosure requirements. The HydrogenPay brand also held equity I could refine, not replace.
- **Lean front-end capacity.** A small engineering team meant the system had to ship in adoptable slices. No big-bang rewrite was on the table.
- **WCAG 2.1 AA as the floor.** Contrast, keyboard reach, and screen-reader semantics were ship-blockers, not polish.
- **Aggressive timeline.** The first adoptable slice had to land before the POS SKU entered build.

When constraints collided, we chose **accessibility and platform familiarity over visual novelty.** That call killed at least one direction outright — see Atomic Build, beat 4.

The other call worth naming: I treated **the merchant's recognition tax as the unit of cost.** Every time a primary action moved between surfaces or used a different verb, a merchant paid in hesitation, support tickets, or abandoned flows. Once we measured the work that way, the priority order rearranged itself — touch-target accessibility on POS climbed above visual refinement, and the brand refresh moved behind the migration checklist.

## Atomic Build

Once the lens held, the work got mechanical. We built atoms before screens.

1. **Tokens first.** Color, spacing, type, radius. One palette, one type scale, one spacing ramp. *Lens: Recognition over Recall.* Once tokens shipped, every downstream component PR shrank to hours, not days, and a token change in Figma matched a token change in code.
2. **Atoms next.** Button, input, icon. One component, every state — default, hover, focus, loading, disabled, destructive — across web, mobile, and POS. POS got the strictest tap-target rules; everything else stepped up to meet it.
3. **Then molecules and organisms.** Form rows, list items, transaction cards, KYC steps. *Lens: Chunking and Uniform Connectedness.* Grouping by composition let designers and engineers reason about the same units at the same time.
4. **One direction killed: a custom motion language.** An early option added a HydrogenPay-specific transition curve across all surfaces. POS hardware couldn't render it without dropped frames. On Android it fought platform expectations. *Lens: Jakob's Law.* Users spend most of their time on other apps; meeting their muscle memory beat asserting a house style. We adopted platform-native motion instead — iOS easing on iOS, Material on Android, no motion on POS. The system got duller and more correct.

*Visual artifact: `/images/case-studies/poseidon-system-diagram.png` — `<CaseStudyArtifact ratio="16:9" caption="Tokens feed atoms (button, input). Atoms feed molecules (form row, list item). Molecules feed organisms (transaction card, KYC step). One source, four surfaces." />`. Alt: "System diagram: design tokens feeding atoms, molecules, and organisms across web, mobile, and POS."*

*Visual artifact: `/images/case-studies/poseidon-button-specimen.png` — `<CaseStudyArtifact ratio="1:1" caption="One button, every state — default, hover, focus, loading, disabled, destructive — rendered identically across web, mobile, and POS." />`. Alt: "Component specimen: button states across web, mobile, and POS."*

## Adoption Path

A design system is only as real as its uptake. We shipped in slices and let the work pull itself.

- **Pareto first.** The 20% of components touched by 80% of flows — button, input, transaction card, confirmation modal — shipped first. The long tail followed when teams pulled it.
- **Migration checklist over big-bang rewrite.** Each squad kept delivering features the whole way through. Nobody had to stop and rebuild their world.
- **Merchants and engineers in the same week.** Six merchant interviews surfaced the moments they hesitated; four engineering conversations surfaced where the codebase fought them. *Lens: Jobs-to-Be-Done.* Listening for the job a merchant was hiring the screen to do flipped our priority order — accessibility on POS climbed above visual refinement before any token shipped.
- **The POS SKU was the forcing function.** Once tokens, atoms, and the four organisms covering refunds and confirmations had shipped, the new terminal could be designed inside the system instead of around it.

*Visual artifact: `/images/case-studies/poseidon-user-flow.png` — `<CaseStudyArtifact ratio="16:9" caption="Refund → confirmation → receipt, rendered identically on web, mobile, and POS." />`. Alt: "User flow: refund transaction → confirmation → receipt, rendered identically across three surfaces."*

## Foundation Held

The headline isn't a percentage — instrumentation landed alongside the rollout, so we have qualitative signal only for the before-state. *[METRIC NEEDED] — pre/post adoption and satisfaction baselines were not measured before the system shipped; comparable instrumentation post-rollout is being pulled.*

What we can say is what the team can now do that it couldn't before:

- The POS SKU shipped on the new system without rebuilding primitives. The foundation held under a fourth surface, which was the original goal.
- Support and ops escalations on shared flows shifted in tone and volume. Confusing or blocked states on confirmations and refunds fell off support's top-three escalation themes. *[METRIC NEEDED] — ticket-volume delta not captured at the time.*
- Front-end engineers stopped duplicating button, input, and modal code across repos. One shared package became canonical.
- Marketing screenshots from web, mobile, and POS now read as one product.
- Internal design reviews moved from *"is this consistent?"* to *"is this the right pattern?"* — a healthier conversation.

Poseidon sat inside HydrogenPay's 2023–2024 turn from loss-making to profitable as the UX and infrastructure layer that lowered friction on high-volume payment flows and reduced support and ops overhead. It was one input among many in that turn — not isolated revenue or profit numbers — but the foundation it laid is now load-bearing for every flow shipped after it.

> *"Poseidon turned a flow that constantly needed explanation into something our teams could trust and operate without babysitting."*
> — *Composite, drawn from post-rollout 1:1s with product and operations leads.*

**Residual risks.** The system needs a versioning and deprecation policy before the next major brand refresh. Accessibility coverage sits at AA; pushing critical financial flows (KYC, transaction confirmations) to AAA is the next investment. The migration checklist needs to harden into automated lint rules so new screens cannot drift back to the old primitives.
