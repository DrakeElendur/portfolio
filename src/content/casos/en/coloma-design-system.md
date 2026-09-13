---
title: Coloma Design System — built from scratch
image: "../../../assets/images/cover-coloma-ds.png"
summary: My personal, open-source design system. 155 design tokens in the W3C DTCG standard format, published on NPM as @coloma-design/tokens v0.1.0, plus a Web Components viewer that documents them and copies any token with one click. Written line by line, no templates.
date: 2026 - Present
tags:
    - Design Systems
    - Design Tokens
    - Open Source
    - Front-end
company: Personal project
role: Creator — Design and development
tldr: |
    After leading the tokenization of a corporate design system, I wanted to answer an uncomfortable question: "how much of that can I do myself, from scratch and alone?". Coloma Design System is my answer. A monorepo with two deliverables: a design tokens package in the W3C DTCG standard format — with a two-layer architecture, primitives and semantics, connected through aliases — published on NPM under an MIT license, and a web viewer that flattens the nested JSON, resolves the aliases, and documents every token using Web Components with Shadow DOM. All of the JSON is written by hand: I deliberately avoided exporting from Figma so I would internalize the alias mechanism, the core concept behind a semantic layer. It's my technical proving ground and, being open source, the only design system work of mine I can show in full.
---
## Why this project exists

All of my design system work lives inside a company, under confidentiality agreements. That creates two problems: I can't show the code or the components, and — more uncomfortably — it's hard to prove how much of the system is my own method and how much is context.

Coloma Design System exists to close that gap. It's **100% mine, open, and demonstrable**: every architectural decision, every token, and every line of code is public and auditable.

> **The question I asked myself:** take away the team, the budget, and a corporation's infrastructure — can I still build a proper design system from scratch?

## The architectural decisions

**DTCG (W3C) format from the very first token.** I chose the *Design Tokens Community Group* standard over a proprietary format. It's the specification the industry is converging on, and the one tools like Style Dictionary consume natively. Designing against the standard — not against a tool — is what makes a system portable.

**Two layers: primitives → semantics.** Primitives hold the raw values: eight color families in OKLCH (with hex fallbacks), spacing, typography — sizes, weights, line height and tracking — radii, shadows and z-index. Semantics contain **no literal values**: they only reference primitives through aliases. The rule I set for myself is simple and brutal: *if I write a hex value in the semantic layer, it means a primitive is missing*. That discipline is what lets a rebrand cascade through the system instead of becoming a find-and-replace.

**Monorepo with npm workspaces.** One publishable package (`tokens`) and one deployable app (`token-viewer`), without adding build tooling that obscures the concept. I wanted to understand hoisting and dependency resolution, not configure them blindly.

**Web Components with Shadow DOM for the viewer.** I could have built it in a framework, but I chose Custom Elements with Shadow DOM precisely because style isolation is what makes a system component work in any stack. That's the right mindset for a design system: **framework-agnostic by design, not by accident**.

**MIT license.** Unlike my portfolio, this project is built for adoption. If someone wants to take it, fork it, or learn from it, that's the point.

## The most counterintuitive decision: writing the JSON by hand

I could have exported the tokens from Figma with a plugin in an afternoon. I chose not to, for two reasons:

1. **Most exporters resolve aliases into literal values.** That destroys exactly the semantic layer that gives the system meaning: you're left with a flat JSON full of hex codes and no intent.
2. **Manual transcription isn't wasted work; it's where the mechanism sinks in.** Understanding why `surface.feedback.success` points to `green.100` and not `green.500` — an alert background needs the lightest step so the text on top keeps its contrast — isn't something you learn by reading an export.

Automated Figma → repository syncing is a real problem and I'll tackle it as its own project. But first I wanted to master the format, not the tool.

## The viewer's technical challenges

**Flattening variable depth.** The viewer consumes the nested JSON files and needs to turn them into a flat list. Depth isn't fixed: `spacing.8` is two levels, `color.primary.500` is three and `color.surface.overlay.state-layer.hover` is five, so iterating with `map()` isn't enough. The solution is to walk the object recursively and tell a final token from an intermediate group. The standard itself gives the hint: **a final token is the one declaring `$value`**; everything else is a group you keep descending into, accumulating the path and inheriting whatever `$type` the group declares.

**Resolving aliases.** A semantic token only says `{color.green.100}`. To show the actual color, the viewer looks each reference up in the already-flattened primitives list and swaps in its value and type. If a reference doesn't resolve, the token is shown as-is: the error stays visible instead of hiding.

**Grouping without multiplying components.** The 155 tokens are grouped by category with a `reduce` that reads the relevant level of the path: the first for primitives, the second for semantics, since they all start with `color`. A single Custom Element, `<token-swatch>`, decides how to preview each token from its type: a color paints a swatch, a spacing value draws a square to scale, a shadow casts it, a font size renders text.

**Copy to clipboard, and finally understanding async.** `navigator.clipboard.writeText()` returns a promise, so the click has to wait for the browser's confirmation before showing "Copied!". That forced me to answer three questions I'd been using without fully understanding: why the function must be `async`, what exactly happens during the `await`, and why a `try/catch` is the only way to tell the user when permission fails. One UX detail came from testing it: two quick clicks made the first feedback's timer wipe out the second; the fix is cancelling the previous timer before scheduling the new one.

## System decisions you can't see in the JSON

- **Seven steps, not nine.** Every color family has seven tones. Fewer variants means less maintenance and fewer unused tokens; if an eighth is ever needed, it gets justified when the case shows up.
- **Different scales for different problems.** Spacing is stepped: increments of 4 up to 16 px, where the eye can tell fine differences apart, then increments of 8 up to 64. Typography is modular, ratio 1.333, with values rounded to 1/16 rem so they land on whole pixels.
- **Alpha without an alpha function.** DTCG has no way to say "this color at 10%". Rather than sneaking literal values into the semantic layer, I added two primitive families, `dark_alpha` and `light_alpha`, with seven opacity steps of pure black and pure white. They feed modal backdrops and state layers.
- **One interaction model.** No action token has its own `hover` or `pressed`. States come from overlaying `surface.overlay.state-layer.hover` or `.pressed` on the base color, Material's *state layer* pattern. One mechanism for the whole system instead of three tokens per variant per role.
- **OKLCH with a safety net.** Colors are defined in OKLCH, with the hue nudged a few degrees toward each scale's extremes to compensate for perceptual shift, and every one carries a `hex` fallback for tools that don't read it yet.

## Current status: v0.1.0 published

The first project's scope is closed and merged into `main`:

- ✅ Monorepo with npm workspaces.
- ✅ 155 tokens in valid DTCG: 111 primitives and 44 semantics, all aliased, none with a literal value.
- ✅ Viewer: recursive flattening, alias resolution, gallery grouped by category and copy-to-clipboard with feedback.
- ✅ READMEs for the monorepo and the package.
- ✅ `@coloma-design/tokens` v0.1.0 published on NPM under the MIT license.
- ⏳ Public deployment of the viewer.

> [GitHub repository](https://github.com/DrakeElendur/Coloma-Design-System) · [NPM package](https://www.npmjs.com/package/@coloma-design/tokens)

**What's next.** It's a living project. On the backlog: WCAG contrast validation inside the viewer, the third token layer (component) alongside the first components, and a Style Dictionary pipeline transforming to CSS and JS, which opens the door to theming and to syncing from Figma with judgment.

## What it's teaching me

Building a small system alone forces you to justify decisions that in a corporation get made by inertia or inheritance: why seven color steps and not nine, why spacing is stepped while typography follows a ratio, what criteria define the neutrals. **Constraint is the best systems teacher.**

And there's an unexpected benefit: every concept I land here — recursion, style isolation, async, semantic versioning, publishing — makes me a better partner to the development teams at work. The gap between design and engineering closes by building, not by explaining.
