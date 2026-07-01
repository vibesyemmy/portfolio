---
title: "The Token Was Always Code"
description: "Figma Code Layers don't kill design tokens. They prove why tokens matter more than ever."
pubDate: 2026-07-01
cover: /design-tokens-code-layers-hero.png
draft: true
---

I'm building a design system in Figma right now. Not designing screens — building the system that builds screens. Ninety-three variables. Ten text styles. Eleven components. Every color bound to a semantic token. Every spacing value mapped to a 4px grid. The pipeline is deliberate: Figma variable → design token → CSS custom property → shadcn/ui component. Months of work, all organized around the idea that the token is the source of truth and the code is the output.

Then Config 2026 happened.

Dylan Field walked on stage and said: "Code is not the opposite of design. Code is material for design." Then he showed Code Layers — any design frame, one click, becomes interactive code. Duplicate it. Iterate on it. Comment on it. Treat it like any other layer on your canvas.

I stared at my variable collection and asked the obvious question: if a Figma layer is code now, what exactly am I spending months building tokens for?

## What Code Layers actually does

This isn't Figma-to-Code export. That's been around for years and has always been mediocre — pixel-perfect screenshots wrapped in absolute positioning, useless to any real engineering team. Code Layers is something different.

It's a layer type. A first-class canvas primitive, sitting alongside frames, text, and vectors. You can extract design frames from a GitHub repository. You can convert any design layer into working JSX with a prompt or a click. You can go the other direction — pull interaction flows out of code and inspect them as design layers. It's bidirectional. The handoff pipeline doesn't get faster. It dissolves.

Think about what that means for a design system. Today, the workflow is: design a component in Figma → document the tokens → write the code → test the code → find inconsistencies → update Figma → repeat. With Code Layers, you design a button variant, generate the code, and see immediately whether it respects the system. The gap between designing and verifying closes to zero.

## What tokens do that Code Layers can't

Here's where it gets interesting.

A Code Layer gives you *this button* as JSX. The exact component, on the exact screen, in the exact state you designed. Beautiful. Precise. And also: a point solution.

A token system says something different. It says: every button across this entire product — on web, on iOS, on Android, in light mode and dark mode, in every component library your team maintains — uses this exact primary color, this exact spacing scale, this exact border radius. Not because someone remembered to copy the value. Because the token is the contract. Change the token, change every instance. Every platform. Every mode. Automatically.

Code Layers solve the translation problem. Tokens solve the consistency problem. They are not competing. They operate at different altitudes. A Code Layer without a token system is a beautiful one-off — precise, fast, unrepeatable at scale. A token system without Code Layers is a promise you still have to verify by hand.

The real power is when they meet: a Code Layer that inherits from your token system. Generate the code, and the button already knows it's `bg-primary`, not `bg-blue-500`. Already uses `spacing-3`, not `12px`. The token was there before the code existed. The code just makes it visible.

## Figma's playbook

There's a pattern here. Figma has been eating the layers between design and production for a decade.

In 2016, prototyping moved into Figma. Suddenly you didn't need InVision or Marvel to show a flow. The prototype lived on the same canvas as the design. In 2019, developer handoff moved in. Inspect mode, code snippets, measurements — Zeplin and Abstract became optional. Each time, the tool absorbed what sat between the design file and the shipped product.

Code Layers is that absorption reaching the final mile. Not the handoff. The build itself.

If the pattern holds, the thing that distinguishes designers won't be their ability to operate Figma. It will be their ability to define the rules the code follows. Tokens. Component architecture. State management. The things that live above any single screen. The things that make a system a system.

## Two kinds of designers

After Config 2026, there are two kinds of designers.

Type A pushes pixels. They're fast in Figma. They know every shortcut. Their frames are beautiful. Their job ends at the Dev Mode handoff. They trust the engineers to figure out the rest.

Type B understands component architecture. They know why a token system has tiers — primitive tokens feed semantic tokens feed component tokens. They can read the JSX that Code Layers generates and spot when a color is hardcoded instead of inherited. They don't need to write production code, but they can have a real conversation about component composition with an engineer. Not a handoff. A conversation.

Type A is in trouble. Not because they're bad at their job — because their job is the part the tool just automated. Type B just got a promotion they didn't ask for. They're now working in the same material as the engineers. Same tokens, same components, same source of truth. That's either terrifying or liberating, depending on what you invested in learning.

## The token was always code

Here's the thing Figma's framing quietly obscures: the token was always code.

A CSS custom property is code. A JSON token file is code. A design token specification — W3C format, Style Dictionary, Tokens Studio — is code. It's declarative code. It says what should be true. It doesn't execute. But it's code all the same.

What Code Layers introduced isn't *code* entering the design canvas. It's *imperative* code entering the design canvas. JSX. TSX. Components that render and respond to state. The declarative code — the tokens — was already there. It was just invisible to anyone who didn't think of it as code.

The split isn't design versus code. The split is declarative system versus imperative instance. And the declarative system — the token architecture — is what makes the imperative instances consistent, composable, and scalable. Without it, every Code Layer is an island. With it, every Code Layer inherits the continent.

## The better job

Tokens don't become redundant after Code Layers. They become the grammar that makes Code Layers useful at scale. You don't stop designing tokens. You design tokens, and the code inherits them. You change a spacing variable, and every Code Layer across every screen updates. You add a dark mode value to a color token, and every generated component knows what to do.

The designer's job shifts from "translate this frame to code" to "define the rules the code follows." That's a better job. It's harder. It requires knowing how components compose, how systems scale, how a change at the primitive level cascades through an entire product. But it's also the job that survives automation. Because defining the rules — deciding what should be consistent, what should flex, what should adapt — is a design decision. Not a translation task.

The token was always code. Code Layers just made everyone else see it.
