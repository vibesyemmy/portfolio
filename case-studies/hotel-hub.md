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
archetype: demo-tour
heroVariant: home
---

## The Brief

ggCircuit wanted one console-class device on the wall to do what four touchpoints — phone, printed binder, front desk, separate TV remote — used to do. One app, one remote, the whole stay.

Catalog ran wider than entertainment: movies, music, in-room games, plus the spa, seasonal tours, dining reservations, event tickets, checkout. Three product designers built it together; I led research-to-IA and the cross-section interaction patterns.

Audience: business travelers, couples, families. One or two nights each. No tutorial.

`{{hero}}` — `/images/hotel-entertainment-hub.png` (16:9). Alt: "Hotel Entertainment Hub home screen on a TV console — four verbs (Watch, Play, Listen, Stay) anchored on a hotel-room background."

## The Verbs

Four verbs run the home: **Watch · Play · Listen · Stay**.

The catalog sorted that cleanly. Movies are Watch. In-room games are Play. Curated audio is Listen. Everything bookable — spa, tours, dining, events, checkout — collapses into Stay.

Four chips on the home, four jobs, one verb each. The d-pad never has to remember more than four. Stay carries the operator complexity so the guest doesn't.

The Verbs are why this case study is a tour, not a process narration. Walk past each chip and the design lens behind it becomes legible — recognition lens at Watch, density lens at Play, reach lens at Listen, folio lens at Stay.

`{{overview_motion}}` — `/animations/Hotel-Entertainment-Hub.json` (Lottie, ~3:2). Alt: "Animated overview of the Hub stitching the four sections together: Watch, Play, Listen, Stay."

## Walk-the-Verbs

Each verb earns its station. Same TV-console hardware, same five-button remote, same brand surface — the lens shifts.

### Watch — recognition over recall

Curated movie grid, d-pad focus state, detail screen with a synopsis and a single play button. Lens: **recognition over recall** at ten feet. Posters do the remembering. The catalogue is pre-curated, so every poster on screen is a candidate the guest might already know — no search bar, no on-screen keyboard. Focus rings draw heavier than touch UI would — a thin ring disappears across the room. Detail collapses to one primary action; the remote always knows which button plays.

`{{watch_grid}}` — `/images/watch-grid.gif` + `/images/watch-detail.png` (16:10 each). Alt: "Watch section: curated movie grid with d-pad focus state, and a movie detail screen with synopsis and play button."

### Play — five buttons, two presses

In-room games grid, detail screen showing controls and players supported. Lens: **Hick's Law on a five-button remote**. The detail tells a guest in two presses whether the title fits the room — solo, couples, family of four — before they commit. The catalogue itself is pre-pruned to titles a five-button remote can drive — most of Hick's payoff is banked before the guest opens a tile. *[METRIC NEEDED: presses-to-action target and post-launch number — Opeyemi to confirm if instrumented.]*

`{{play_grid}}` — `/images/game-grid.gif` + `/images/game-detail.png` (16:10 each). Alt: "Play section: in-room games grid and a game detail screen showing controls and players supported."

### Listen — controls a remote can reach

Curated playlist detail with track list and remote-friendly playback controls. Lens: **Fitts's Law at ten feet**. Play, skip, and volume sit where the d-pad lands first; shuffle and queue demote to the second row. Nothing nests deeper than two presses. Track titles wrap at one line so the eye finds the next track without leaning forward — at couch distance, a second line costs the rhythm.

`{{listen_detail}}` — `/images/Listen_Detail.png` (16:10). Alt: "Listen section: curated playlist detail with track list and remote-friendly playback controls."

### Stay — the verb that earns the headline

Spa, tours, dining, events, checkout — five surfaces under one verb. Each card carries the price upfront. Confirmation collapses to one screen: room number echoed back, charge lands on the folio, no card entry, no second auth. Lens: **Doherty Threshold + folio coupling**. Sub-second confirmation, the right room, every time.

This is the verb that turns the room into the front desk. The other three verbs entertain. Stay transacts.

`{{stay_carousel}}` — `/images/stay-grid-1.png` through `/images/stay-grid-5.png` (carousel). Alt per slide:
- "Stay section: spa booking screen with upfront pricing and folio confirmation."
- "Stay section: tour reservation screen with upfront pricing and folio confirmation."
- "Stay section: dining selection screen with upfront pricing and folio confirmation."
- "Stay section: event ticket screen with upfront pricing and folio confirmation."
- "Stay section: checkout screen with upfront pricing and folio confirmation."

`{{user_flow}}` — *[ARTIFACT NEEDED: 16:9 user-flow diagram — Home → Stay → Spa booking → Folio confirmation, showing remote-press count at each step. Opeyemi to ship if not yet drawn.]* Alt: "User flow: home screen → Stay → service selection → folio-charge confirmation, annotated with remote presses per step."

`{{prototype}}` — embedded ProtoPie prototype (16:9). Alt: "Interactive ProtoPie prototype of the Hotel Entertainment Hub — guests navigate the four sections via on-screen remote."

## The Cut

The first home led with a personalisation layer — kid-friendly tiles for families, business-lounge prompts for solo travelers, segment-aware recommendations on the front page. The only profile signal the room had was the room number. Without more, segmentation guessed wrong often enough that the home felt mistuned, not personalised.

Killed it. Shipped a flat home anchored on the four verbs. In a one-or-two-night surface, legibility beats personalisation — guests don't stay long enough to forgive a wrong guess.

## What the Room Now Does

The room became the front desk for things guests never used to ask for.

In prototype rounds, ggCircuit and partner-hotel reviewers booked spa slots, picked tours, confirmed checkout — never left the couch. Line cited most: *"so this just charges the room?"* — then the booking went through.

*[METRIC NEEDED: post-launch ancillary booking lift, concierge call deflection, or guest CSAT — Opeyemi to confirm if ggCircuit shared operational numbers.]*
*[METRIC NEEDED: post-rollout operator or guest quote — Opeyemi to confirm.]*

Next investment: personalisation, earned with real profile data. No formal WCAG-equivalent audit for TV-console UI.
