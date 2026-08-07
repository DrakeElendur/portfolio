---
title: Coloma Design System — a DS from scratch, in the open
image: "../../../assets/images/cover-coloma-ds.png"
summary: My personal, open-source design system. A design tokens package in the W3C DTCG standard format published on NPM, plus a viewer built with Web Components that documents and lets you copy every token. Written line by line, no templates.
date: 2026 - Present
tags:
    - Design Systems
    - Design Tokens
    - Open Source
    - Front-end
company: Personal project
role: Creator — Design and development
tldr: After leading the tokenization of a corporate design system, I wanted to answer an uncomfortable question how much of that can I do myself, from scratch and alone? Coloma Design System is my answer. A monorepo with two deliverables a design tokens package in the W3C DTCG standard format — with a two-layer architecture, primitives and semantics, connected through aliases — published under an MIT license, and a web viewer that flattens the nested JSON and documents every token using Web Components with Shadow DOM. All the JSON is written by hand, on purpose exporting from Figma skips precisely the part where you internalize the alias mechanism, which is the core concept behind a semantic layer. It's my technical testing ground and, being open, the only design system work of mine I can show in full.
---
## Why this project exists

All of my design system work lives inside a company, under confidentiality agreements. That creates two problems: I can't show the code or the components, and — more uncomfortably — it's hard to prove how much of the system is my own method and how much is context.

Coloma Design System exists to close that gap. It's **100% mine, open, and demonstrable**: every architectural decision, every token, and every line of code is public and auditable.

> **The question I asked myself:** take away the team, the budget, and a corporation's infrastructure — can I still build a correct design system from scratch?

## The architectural decisions

**DTCG (W3C) format from the very first token.** I chose the *Design Tokens Community Group* standard over a proprietary format. It's the specification the industry is converging on, and the one tools like Style Dictionary consume natively. Designing against the standard — not against a tool — is what makes a system portable.

**Two layers: primitives → semantics.** Primitives hold the raw values (color scales, spacing, typography, radii, shadows). Semantics contain **no literal values**: they only reference primitives through aliases. The rule I set for myself is simple and brutal: *if I write a hex value in the semantic layer, it means a primitive is missing*. That discipline is what lets a rebrand cascade through the system instead of becoming a find-and-replace.

**Monorepo with npm workspaces.** One publishable package (`tokens`) and one deployable app (`token-viewer`), without adding build tooling that obscures the concept. I wanted to understand hoisting and dependency resolution, not configure them blindly.

**Web Components with Shadow DOM for the viewer.** I could have built it in a framework, but I chose Custom Elements with Shadow DOM precisely because style isolation is what makes a system component work in any stack. That's the right mindset for a design system: **framework-agnostic by design, not by accident**.

**MIT license.** Unlike my portfolio, this project is built for adoption. If someone wants to take it, fork it, or learn from it, that's the point.

## The most counterintuitive decision: writing the JSON by hand

I could have exported the tokens from Figma with a plugin in an afternoon. I chose not to, for two reasons:

1. **Most exporters resolve aliases into literal values.** That destroys exactly the semantic layer that gives the system meaning: you're left with a flat JSON full of hex codes and no intent.
2. **Manual transcription isn't wasted work; it's where the mechanism sinks in.** Understanding why `text.primary` points to `gray.900` and not the other way around isn't something you learn by reading an export.

Automated Figma → repository syncing is a real problem and I'll tackle it as its own project. But first I wanted to master the format, not the tool.

## The technical challenge: flattening variable depth

The viewer consumes the nested JSON files and needs to turn them into a flat list of tokens. It isn't trivial: depth varies — `color.blue.500` is three levels, `space.4` is two — so iterating with `map()` isn't enough.

The solution is to walk the object recursively and distinguish a final token from an intermediate group. The DTCG standard itself gives the hint: **a final token is the one declaring `$value`**; everything else is a group you keep descending into, accumulating the path.

> [Space for the snippet or the repository link.]

## Current status

This is a living project, documented in the open as it progresses:

- ✅ Monorepo with npm workspaces up and running.
- ✅ Primitive and semantic layers in valid DTCG, connected through aliases.
- 🔄 Viewer: token flattening and first Web Component with Shadow DOM.
- 🔄 Gallery grouped by category and copy-to-clipboard.
- ⏳ NPM package publication and viewer deployment.

> [Update the status when publishing the case. Link the GitHub repository, the NPM package, and the deployed viewer as soon as they're available — they're the strongest proof in the whole case.]

## What I'm learning

Building a small system alone forces you to justify decisions that in a corporation get made by inertia or inheritance: why nine color steps and not five, why a modular scale instead of a linear one, what criteria define the neutrals. **Constraint is the best systems teacher.**

And there's an unexpected benefit: every concept I land here — recursion, style isolation, versioning, publishing — makes me a better counterpart to the development teams at work. The gap between design and engineering closes by building, not by explaining.
