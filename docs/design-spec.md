# Session 87 Design Specification

## Status
Normative. This document is the source of truth for the Session 87 UI design contract derived from the Kimi K2 design review. All agents must treat this specification as binding unless superseded by a later normative document.

## Purpose
This specification defines the required layout, interaction, authority model, approval behavior, provenance labeling, and permitted deviations for the Session 87 interface. It exists to preserve scope, protect operator authority, and ensure implementation fidelity across all components and agents.

## Core Design Principles
1. **Operator authority is primary.** Interactive controls must support operator intent without silently overriding or dismissing operator actions.
2. **Review outcomes are non-destructive.** Approval and HOLD behaviors must be explicit, persistent, and auditable.
3. **Provenance must be visible.** Every user-facing state relevant to review or approval must surface its origin or decision basis when applicable.
4. **Layout serves decision-making.** The interface must prioritize triage, comparison, and gate decisions over decorative presentation.
5. **Scope protection is mandatory.** Any new component addition requires a documented operator-authority use-case entry in this specification.

## Three-Column Layout Rationale
The interface shall use a three-column layout as the normative information architecture.

### Column 1: Context / Intake
Purpose: present the source item, high-level metadata, and immediate triage cues.

Rationale:
- Keeps the original request or artifact visible while decisions are made.
- Reduces cognitive switching by anchoring the operator in the source context.
- Supports fast comparison against review criteria without burying provenance or origin details.

### Column 2: Primary Review / Action Surface
Purpose: host the main content under review, direct controls, and primary operator actions.

Rationale:
- Concentrates decision-making controls where attention is already focused.
- Minimizes misclicks by separating action surfaces from ancillary information.
- Allows operator authority to be exercised in proximity to the reviewed artifact.

### Column 3: Status / Gate / Audit
Purpose: present approval state, HOLD state, review provenance, and decision traceability.

Rationale:
- Makes gate outcomes immediately legible.
- Keeps approval and HOLD mechanics visible and difficult to overlook.
- Provides an always-available audit surface for provenance and decision integrity.

### Layout Constraint
The three-column structure is not merely decorative; it is a functional separation of concerns. Any deviation that collapses or merges these responsibilities must be justified in a subsequent normative revision.

## Component-Level Operator-Authority Justifications
Each interactive or decision-bearing component must be justified by how it preserves or clarifies operator authority.

### Required Components
#### 1. Source Context Panel
Justification: enables the operator to verify the origin and scope of the current item before acting.

#### 2. Review Content Panel
Justification: keeps the object of review directly editable or inspectable by the operator without hidden transformations.

#### 3. Action Controls Cluster
Justification: ensures the operator can apply decisions explicitly rather than through implicit system inference.

#### 4. Approval Gate Indicator
Justification: communicates whether the item has passed the required review gate and what authority basis governs that state.

#### 5. HOLD Toggle
Justification: grants the operator sovereign ability to suspend progression when review is incomplete, uncertain, or requires escalation.

#### 6. Provenance Label Surface
Justification: exposes decision origin, source attribution, or status lineage so the operator can trust the displayed state.

#### 7. Audit Summary / Trace Surface
Justification: preserves a readable account of what was decided, by whom or by what system rule, and under which conditions.

### Operator-Authority Use-Case Entries
Per the scope-protection principle, every new component addition must append a new use-case entry here before implementation proceeds.

- **Source Context Panel**: Operator confirms the artifact source before approving, preventing accidental review of the wrong session.
- **Review Content Panel**: Operator inspects the exact content under consideration and compares it against criteria without losing context.
- **Action Controls Cluster**: Operator selects an explicit action rather than relying on background automation.
- **Approval Gate Indicator**: Operator verifies whether the item is eligible for progression and whether additional review is required.
- **HOLD Toggle**: Operator pauses advancement immediately when uncertainty, disagreement, or escalation is needed.
- **Provenance Label Surface**: Operator checks where a label, state, or recommendation originated before accepting it.
- **Audit Summary / Trace Surface**: Operator reviews the decision trail to confirm accountability and repeatability.

## Approval Gate Non-Dismissibility Requirement
The approval gate must be non-dismissible.

### Normative Requirement
If an approval gate is presented, it must remain visible and cannot be silently dismissed, auto-cleared, or visually suppressed without an explicit operator action that records the state transition.

### Intent
- Prevents accidental loss of review state.
- Ensures that gate status cannot disappear before the operator has acknowledged it.
- Maintains a stable boundary between pending review and accepted progression.

### Prohibited Behaviors
- Auto-closing the approval gate on unrelated interaction.
- Collapsing the gate without operator acknowledgment.
- Hiding gate status while retaining hidden enforcement logic.
- Replacing the gate with an ambiguous or transient indicator that can be missed.

### Required Behavior
- The gate must remain discoverable and persistent while relevant.
- Dismissal, if any, must be explicit and logged as a state change.
- The UI must preserve visibility of pending or blocked approval conditions.

## HOLD Toggle Sovereignty Contract
The HOLD toggle is sovereign to the operator.

### Normative Requirement
The operator's HOLD action takes precedence over default progression. When HOLD is engaged, the system must treat the item as paused for decision-making and must not advance it as though approval were granted.

### Sovereignty Rules
1. HOLD may be asserted by the operator at any point the control is available.
2. HOLD must be clearly reversible by the operator, subject only to the same authority that enabled it.
3. HOLD state must be visibly represented and cannot be disguised as a neutral or informational status.
4. The system must not override HOLD due to automation, background refresh, or unrelated UI actions.
5. HOLD must be respected as an active review state until the operator changes it.

### Contractual Meaning
HOLD is not a suggestion. It is an operator-controlled authority boundary that suspends onward progression and preserves the review state for further action.

## Provenance Label Mandate
All relevant states, recommendations, or review outcomes must display provenance labels where applicable.

### Normative Requirement
A provenance label must be shown whenever a state, verdict, recommendation, or cue could reasonably be mistaken as system-generated, human-approved, inherited, or externally sourced.

### Provenance Content Expectations
A provenance label should, when applicable, indicate one or more of the following:
- source origin
- decision authority
- review lineage
- generation basis
- current state derivation

### Visibility Rules
- Provenance labels must be legible and adjacent to the state they qualify.
- Labels must not be hidden behind hover-only affordances when they are material to review.
- Labels must not be ambiguous or stylistically indistinguishable from unrelated metadata.

### Purpose
Provenance labeling prevents attribution confusion and supports the operator's ability to trust, challenge, or override a displayed state.

## Deviations from `static/reference/kimi-mockup.html`
The following deviations are normative and approved as part of the Session 87 design contract.

### Approved Deviations
1. **Three-column layout formalization**
   - If the reference mockup implies a less rigid arrangement, Session 87 shall enforce the three-column separation described above.

2. **Explicit approval gate persistence**
   - Any dismissible or transient gate behavior implied by the reference mockup is superseded by the non-dismissibility requirement.

3. **Sovereign HOLD toggle behavior**
   - If the reference mockup treats HOLD as secondary or visually subordinate, Session 87 elevates HOLD to a primary operator authority control.

4. **Provenance label emphasis**
   - If provenance is implicit or understated in the reference mockup, Session 87 requires explicit provenance labeling wherever relevant.

5. **Audit trace visibility**
   - If the reference mockup minimizes audit or trace surfaces, Session 87 requires them to remain visible and accessible.

### Unchanged Intent
The reference mockup remains a stylistic and structural baseline, but only insofar as it does not conflict with the authority, gate, provenance, and scope protections defined here.

## Scope-Protection Principle
Any addition of a new component, control, or authority-bearing affordance requires the following before implementation:
1. a normative description in this document,
2. an operator-authority use-case entry added to the list above,
3. confirmation that the addition does not weaken approval gate non-dismissibility,
4. confirmation that the addition does not weaken HOLD sovereignty,
5. confirmation that the addition preserves provenance visibility.

If a new component cannot satisfy these requirements, it is out of scope for Session 87.

## Interpretation Hierarchy
In case of ambiguity, interpret the design in the following order:
1. this document,
2. later normative design revisions,
3. implementation details that do not conflict with the above,
4. `static/reference/kimi-mockup.html` only where compatible.

## Compliance Statement
All agents and implementers must follow this specification for Session 87. No code dependencies are defined here; this document is referenced by all agents as the normative design contract.
