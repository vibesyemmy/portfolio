---
slug: hotel-hub
title: Hotel Entertainment Hub — One Console, Whole Stay
subtitle: Console app that turns the hotel room into the front desk
role: Product Designer
team:
  - Opeyemi Ajagbe — Product Designer
  - Joshua Zaporta Cruz — Product Designer
  - Theodor — Product Designer
timeline: not disclosed
platforms: [tv-console]
heroImage: /images/hotel-entertainment-hub.png
---

## Context

Hotel Entertainment Hub is a TV-console app for ggCircuit, designed for hotel guests in their rooms — a single touchpoint that bundles entertainment (movies, music, games) with the hotel's bookable services (spa, tours, dining, checkout). Three product designers built it together; I led the research-to-IA work and the cross-section interaction patterns.

Before the Hub existed, hotels had no clean way to surface their full catalog inside the room. A guest who wanted a spa appointment, a private tour, or an event ticket reached for the phone, the printed binder on the nightstand, or the front desk. Entertainment lived on a different remote, on a different system, behind a different login. The full range of offerings — the part hotels wanted guests to discover — was the part guests almost never saw.

The trigger was ggCircuit's push to consolidate in-room experience onto a console-class device hotels were already deploying. The brief: one app, one input device, the whole stay.

## Problem

Guests were missing most of what the hotel offered, and the hotel was paying for the discovery gap in concierge load and lost ancillary revenue.

- Research surfaced fragmented information as the top complaint: guests defaulted to the concierge or front desk for questions the room could have answered.
- Pricing was unclear across services — guests hesitated to book spa, tours, or dining because the cost showed up only at the desk.
- Awareness of seasonal tours, specialty events, and curated dining was low across all traveler segments — business, couples, families.
- Entertainment and services lived on separate surfaces, so a guest never moved naturally from "watch a movie" to "book tomorrow's tour."

`[METRIC NEEDED: baseline ancillary booking rate per stay — Opeyemi to confirm if ggCircuit shared any pre-launch figure]`
`[METRIC NEEDED: pre-launch concierge call volume for service questions — Opeyemi to confirm if any operator data was shared]`
`[METRIC NEEDED: qualitative user quote from research — Opeyemi to pull one verbatim quote ≤25 words from interview notes]`

Cost of inaction: every booking the guest didn't make from the room was either a phone call to the concierge or revenue the hotel never captured.

## Constraints

- **TV-console hardware.** Ten-foot UI, remote-only input, no touch, no hover, no keyboard. Every interaction had to survive a five-button remote.
- **Mixed-audience scope.** Same surface for business travelers, couples, and families — three jobs, one IA. No personalization layer at launch.
- **Hotel operator coupling.** Catalog (rooms, spa, tours, dining, events) lived in the hotel's PMS; the app had to read pricing and availability without a guest-side login flow.
- **Payment inside the room.** Charges had to land on the room folio cleanly — no second checkout, no card re-entry — without compromising on confirmation clarity.
- **Accessibility for a transient audience.** Guests use this for one or two nights; affordances had to be legible without a tutorial. Plain language, large type, predictable focus order.

When constraints collided, the lens was **recognition over recall, every time** — guests should never have to remember where something lives. A hotel app the guest learns once and never sees again has to lead with cues, not memory.

## Process

1. **Research before IA.** Surveys and interviews across business guests, vacationing couples, and families surfaced a consistent shape: guests wanted one place to see everything, upfront pricing to remove the surprise, and recommendations that knew the segment they were in. **Lens: Jobs-to-Be-Done** — the job was not "find a movie" or "book a spa," it was "spend the evening without calling the front desk." That reframed the home screen from a content grid into a hub of intents.

2. **Sorted the catalog into four verbs.** The full offering — entertainment plus services — sorted cleanly into Watch, Play, Listen, Stay. One verb per primary section, one job per verb. **Lens: Hick's Law + Chunking** — four top-level choices kept the remote's d-pad sane, and the verbs let guests navigate by intent instead of by hotel taxonomy. Stay absorbed every bookable service so the operator's complexity stayed hidden from the guest.

3. **Designed for the remote, not the mouse.** Every grid was reworked for d-pad traversal: predictable focus order, generous focus rings, no nested controls deeper than two levels. **Lens: Fitts's Law (ten-foot variant)** — at remote distance, the cost is not pixels-to-target but presses-to-target. Cutting average press-count became the design metric. `[METRIC NEEDED: average presses-to-action target and post-launch number — Opeyemi to confirm if this was instrumented]`

4. **Made pricing legible upfront.** Every bookable card carried the price on the tile, not behind a tap. Total costs surfaced before the confirmation, not at the desk. **Lens: Plain Language + Loss-aversion framing (honest variant)** — guests hesitate when the number is hidden; showing it earlier moved the hesitation moment to where they could still say yes.

5. **Folio-only checkout.** Booking a spa session, a tour, or a dining reservation charged the room directly — one confirmation screen, no card entry, no second auth. **Lens: Doherty Threshold + Recognition over Recall** — sub-second confirmation, with the room number echoed back so guests trusted the charge had gone to the right place.

**Discarded direction: a personalization-led home screen.** An early version led with segment-aware recommendations — kid-friendly tiles for families, business-lounge prompts for solo travelers. Without a guest profile beyond room number, the segmentation guessed wrong often enough that the home felt mistuned, not personalized. Killed it for a flat, recognizable hub anchored on the four verbs. Lesson: in a one-or-two-night surface, *legibility beats personalization* — guests don't stay long enough to forgive a wrong guess.

**Visual artifacts**

- `{{hero}}` — `/images/hotel-entertainment-hub.png` (16:9). Alt: "Hotel Entertainment Hub home screen on a TV console — four verbs (Watch, Play, Listen, Stay) anchored on a hotel-room background."
- `{{overview_motion}}` — `/animations/Hotel-Entertainment-Hub.json` (Lottie, ~3:2). Alt: "Animated overview of the Hub stitching the four sections together: Watch, Play, Listen, Stay."
- `{{watch_grid}}` — `/images/watch-grid.gif` + `/images/watch-detail.png` (16:10 each). Alt: "Watch section: curated movie grid with d-pad focus state, and a movie detail screen with synopsis and play button."
- `{{play_grid}}` — `/images/game-grid.gif` + `/images/game-detail.png` (16:10 each). Alt: "Play section: in-room games grid and a game detail screen showing controls and players supported."
- `{{listen_detail}}` — `/images/Listen_Detail.png` (16:10). Alt: "Listen section: curated playlist detail with track list and remote-friendly playback controls."
- `{{stay_carousel}}` — `/images/stay-grid-1.png` through `/images/stay-grid-5.png` (carousel). Alt per slide: "Stay section: <spa booking | tour reservation | dining selection | event ticket | checkout> screen with upfront pricing and folio confirmation."
- `{{feature_grid}}` — `/images/feature-grid.png` (16:9). Alt: "Feature grid: composite of every primary surface across Watch, Play, Listen, and Stay."
- `{{prototype}}` — embedded ProtoPie prototype (16:9). Alt: "Interactive ProtoPie prototype of the Hotel Entertainment Hub — guests can navigate the four sections via on-screen remote."
- `{{user_flow}}` — `[ARTIFACT NEEDED: 16:9 user-flow diagram — Home → Stay → Spa booking → Folio confirmation, showing remote-press count at each step]`. Alt: "User flow: home screen → Stay → service selection → folio-charge confirmation, annotated with remote presses per step."

## Outcome

Headline: **the room became the front desk for things guests never used to ask for.** Inside the prototype rounds, ggCircuit and partner-hotel reviewers consistently completed a full booking flow — spa selection, time slot, folio confirmation — without leaving the couch and without asking how it worked. The reaction in playback sessions was the Peak-End signal: *"so this just charges the room?"* — followed by the booking going through.

Supporting signals:

- The four-verb IA (Watch, Play, Listen, Stay) tested cleanly across all three traveler segments — no segment needed a different home screen, which validated killing the personalization-led direction.
- Upfront pricing on every bookable card removed the hesitation moment reviewers flagged in the prior concierge-led flow — the question shifted from *"how much is this?"* to *"which time slot?"*.
- Folio-only checkout collapsed booking into a single confirmation screen — no card entry, no second auth — which reviewers cited as the moment the app stopped feeling like a hotel system and started feeling like a stay.
- The full prototype is live and interactive on the case-study page via ProtoPie — `{{prototype}}` above.
- `[METRIC NEEDED: post-launch ancillary booking lift, concierge call deflection, or guest CSAT — Opeyemi to confirm if ggCircuit shared any operational numbers post-deployment]`
- `[METRIC NEEDED: any quote from an operator or guest after rollout — Opeyemi to confirm if any verbatim is on file]`

Residual risks and follow-ups: personalization is the obvious next investment, but it has to be earned with profile data the hotel can responsibly collect (loyalty tier, prior stays) — guessing from room number alone is what killed the first attempt. Accessibility on the ten-foot surface needs a deeper audit pass — focus rings and type scale held in review, but no formal WCAG-equivalent audit for TV-console UI was run, and that is the next quality bar. Long-term, the Stay section is the lever: every operator-side service that lands on the folio (laundry, room service, late checkout, paid upgrades) compounds the per-stay value of the Hub without changing the IA.
