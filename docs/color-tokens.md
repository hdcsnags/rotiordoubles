# Color Tokens

`design-tokens.css` is the authoritative source for all accent color tokens. This document describes the intended usage of the palette defined there, the recommended accessible contrast pairing for each token, and the rationale captured during the Kimi K2 design review.

**Important:** hex values must not be introduced anywhere outside `design-tokens.css`. Use token names in implementation and documentation; do not copy or hard-code raw color values into other files.

## Brand accents

| Token | Intended usage context | Accessible contrast pairing | Kimi K2 design review rationale |
| --- | --- | --- | --- |
| `--color-accent-brand` | Primary brand emphasis, key interactive elements, and product identity moments such as selected nav states, primary CTAs, and highlighted links. | Use with `--color-on-accent-brand` for text/iconography on the accent surface; for light backgrounds, use the brand token as a foreground accent rather than a large fill when contrast is uncertain. | Chosen to establish a clear, recognizable brand signature while remaining restrained enough for repeated UI use. The review emphasized consistency across product surfaces and avoiding overuse that could dilute hierarchy. |
| `--color-accent-brand-hover` | Hover or active-state treatment for brand-colored controls and links. | Pair with the same on-accent text token used for the base brand color when the control is filled; keep text/icon contrast above accessibility thresholds. | Added to create a perceptible interaction state without introducing a separate visual language. The review favored subtle state progression over dramatic hue shifts. |
| `--color-accent-brand-subtle` | Gentle brand tint for badges, callouts, or background washes that need brand presence without strong emphasis. | Pair with `--color-on-accent-brand-subtle` or neutral text depending on actual usage; confirm contrast before using for body text. | Approved as a supporting tone to expand the brand system into softer surfaces. The review noted it helps preserve hierarchy while reinforcing identity. |

## Status colors

| Token | Intended usage context | Accessible contrast pairing | Kimi K2 design review rationale |
| --- | --- | --- | --- |
| `--color-status-success` | Success states, confirmation messages, positive trend indicators, and approved or completed status labels. | Pair with `--color-on-status-success` for filled chips, badges, and alert surfaces; use the token sparingly for text on neutral surfaces. | Selected to communicate positive outcomes quickly and unambiguously. The review prioritized recognizability and parity with common status semantics. |
| `--color-status-warning` | Attention states, caution banners, incomplete workflows, and non-blocking advisories. | Pair with `--color-on-status-warning` for warning surfaces and badges; avoid using as the sole text color on light backgrounds unless contrast is verified. | Chosen to signal caution without escalating to error severity. The review emphasized a warm but controlled tone that supports guidance rather than alarm. |
| `--color-status-danger` | Error states, destructive actions, validation failures, and urgent alerts. | Pair with `--color-on-status-danger` for filled surfaces and destructive action treatments; use neutral backgrounds when the message itself must remain dominant. | Defined to make failure states immediately legible and to support clear destructive affordances. The review stressed restraint so the color retains maximum meaning when used. |
| `--color-status-info` | Informational notices, help callouts, onboarding hints, and neutral system messages. | Pair with `--color-on-status-info` for filled surfaces and informational chips; use on neutral backgrounds for secondary cues. | Included to separate informational guidance from success and warning states. The review favored a calm tone that informs without competing with primary actions. |

## Surface layers

| Token | Intended usage context | Accessible contrast pairing | Kimi K2 design review rationale |
| --- | --- | --- | --- |
| `--color-surface-layer-1` | Lowest-emphasis tinted surface layer for nested cards, panels, and subtle segmentation. | Pair with the standard text token for body content and with higher-emphasis accent tokens only for small UI markers. | Introduced to create depth and structure without heavy borders. The review supported layered surfaces as a way to improve scanability in dense layouts. |
| `--color-surface-layer-2` | Secondary tinted layer for grouped content, inset regions, and hoverable containers that need stronger separation. | Pair with the standard text token and use accent tokens selectively for labels, icons, or focus cues. | Selected as a slightly stronger surface treatment to differentiate content regions while preserving a quiet overall aesthetic. |
| `--color-surface-layer-3` | Highest-emphasis tinted layer for prominent grouped areas, elevated panels, or sections that need stronger visual anchoring. | Pair with the standard text token and avoid using large accent fills on top unless contrast is explicitly checked. | Approved to complete the surface hierarchy and to support more complex layouts. The review noted that a three-step layering system improves rhythm and reduces reliance on borders. |

## Approval gate accent

| Token | Intended usage context | Accessible contrast pairing | Kimi K2 design review rationale |
| --- | --- | --- | --- |
| `--color-accent-approval-gate` | Specialized accent for approval-gated interactions, readiness indicators, and workflow states that require explicit user confirmation. | Pair with `--color-on-accent-approval-gate` for labels, buttons, and status pills; use only where the approval context is clearly defined. | Added as a distinct accent to separate approval actions from general success states. The review requested a dedicated tone to reduce ambiguity in gated workflows and make consent-oriented steps more visible. |

## Usage notes

- Treat `design-tokens.css` as the source of truth for token definitions, values, and future palette updates.
- Prefer token references in code, documentation, and design specs; do not duplicate hex values elsewhere.
- When introducing a new accent usage, verify the pairing against the relevant `--color-on-*` token or another approved text color to maintain accessibility.
- If a token is repurposed or renamed, update this document alongside `design-tokens.css` so the documentation remains synchronized with implementation.
