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

Before the Hub existed, hotels had no clean way to surface their full catalog inside the room. A guest who wanted a spa appointment, a private tour, or an event ticket reached for the phone, the printed binder on the nightstand, or the front desk. Entertainment lived on a different remote and a different login.

The trigger was ggCircuit's push to consolidate in-room experience onto a console-class device hotels were already deploying. The brief: one app, one input device, the whole stay.

## Problem

Guests missed most of the hotel's catalog, and the hotel paid in concierge load and lost ancillary revenue.

- Research surfaced fragmented information as the top complaint: guests defaulted to the concierge or front desk for questions the room could have answered.
- Pricing was unclear across services — guests hesitated to book spa, tours, or dining because the cost showed up only at the desk.
- Awareness of seasonal tours and curated dining was low across business, couples, and family travelers.
- Entertainment and services lived on separate surfaces, so a guest never moved naturally from "watch a movie" to "book tomorrow's tour."

`[METRIC NEEDED: baseline ancillary booking rate per stay — Opeyemi to confirm if ggCircuit shared any pre-launch figure]`
`[METRIC NEEDED: pre-launch concierge call volume for service questions — Opeyemi to confirm if any operator data was shared]`
`[METRIC NEEDED: qualitative user quote from research — Opeyemi to pull one verbatim quote ≤25 words from interview notes]`

Cost of inaction: every booking the guest didn't make from the room was either a phone call to the concierge or revenue the hotel never captured.

## Constraints

- **TV-console hardware.** Ten-foot UI, remote-only input, no touch, no hover, no keyboard. Every interaction had to survive a five-button remote.
- **Mixed-audience scope.** Same surface for business travelers, couples, and families — three jobs, one IA. No personalization layer at launch.
- **Folio + catalog coupling.** Catalog (rooms, spa, tours, dining, events) lived in the hotel's PMS, and charges had to land on the room folio cleanly — no guest-side login, no second checkout, no card re-entry.
- **Accessibility for a transient audience.** Guests use this for one or two nights; affordances had to be legible without a tutorial.

When constraints collided, the lens was **recognition over recall, every time** — guests should never have to remember where something lives. A hotel app the guest learns once and never sees again has to lead with cues, not memory.

## Process

1. **Research before IA.** Surveys and interviews across business, couples, and families surfaced one shape: guests wanted one place to see everything, upfront pricing, and recommendations tuned to their segment. **Lens: Jobs-to-Be-Done** — the job was not "find a movie," it was "spend the evening without calling the front desk." That reframed the home from content grid to hub of intents.

2. **Sorted the catalog into four verbs.** Entertainment plus services sorted cleanly into Watch, Play, Listen, Stay — one verb, one job. **Lens: Hick's Law + Chunking** — four top-level choices kept the d-pad sane; Stay absorbed every bookable service so operator complexity stayed hidden from the guest.

3. **Designed for the remote, not the mouse.** Every grid reworked for d-pad traversal: predictable focus order, generous focus rings, no controls nested deeper than two. **Lens: Fitts's Law (ten-foot).** Press-count became the design metric. `[METRIC NEEDED: average presses-to-action target and post-launch number — Opeyemi to confirm if this was instrumented]`

4. **Made pricing legible upfront.** Every bookable card carried the price on the tile; totals surfaced before confirmation, not at the desk. **Lens: Plain Language + Loss-aversion (honest variant).** Hesitation moved earlier — where guests could still say yes.

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

Headline: **the room became the front desk for things guests never used to ask for.** In prototype rounds, ggCircuit and partner-hotel reviewers completed full booking flows — spa, time slot, folio confirmation — without leaving the couch. Peak-End reaction: *"so this just charges the room?"* — followed by the booking going through.

Supporting signals:

- Four-verb IA tested cleanly across all three traveler segments — no segment needed a different home, which validated killing the personalization-led direction.
- Upfront pricing on every bookable card shifted the question from *"how much is this?"* to *"which time slot?"*.
- Folio-only checkout collapsed booking to one confirmation — the moment reviewers cited as the app no longer feeling like a hotel system.
- `[METRIC NEEDED: post-launch ancillary booking lift, concierge call deflection, or guest CSAT — Opeyemi to confirm if ggCircuit shared any operational numbers]`
- `[METRIC NEEDED: any operator or guest quote post-rollout — Opeyemi to confirm]`

Residual risks: personalization is the next investment, earned with profile data the hotel can responsibly collect — guessing from room number alone is what killed the first attempt. No formal WCAG-equivalent audit for TV-console UI was run; that is the next quality bar.
