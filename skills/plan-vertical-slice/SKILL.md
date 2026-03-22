---
name: plan-vertical-slice
description: Force the implementation of a small playable/testable unit with a bi-directional data loop.
---

# 🏗️ Skill: Plan Vertical Slice

Use this skill whenever building a **Maker Tool** or a **Kit Primitive**.

## 🏛️ 1. PROCEDURE
A complete task MUST NOT be "Visual-Only."

1.  **SCHEMA FIRST**: Update `src/data/schema.ts` to include the new field/primitive.
2.  **AUTHORING SECOND**: Create or update a UI-Editor in `src/components/editor/` to modify the new field.
3.  **PERSISTENCE THIRD**: Use `saveManifest` or specific store actions to flush back to JSON.
4.  **SIMULATION FOURTH**: Update the runtime in `src/components/interface/` or `laboratory/` to reflect the change.

## 🛑 2. ANTI-SLICING CHECK
- **NO SPECULATIVE TABS**: A Tab is not a vertical slice unless it edits a real data-primitive.
- **NO HARDCODED BIOS**: Story content is not a feature; a workflow to author story content IS a feature.
- **NO ONE-OFF MINI-GAMES**: A mini-game is only valid if it generalizes as a **Kit Subsystem** (e.g., "Drafting," "Synthesis").

## ✅ 3. OUTPUT
A **Vertical Slice Plan** (Implementation Plan):
- **Tool**: [Name]
- **Primitive**: [Name]
- **Bi-Directional**: [Yes/No]
- **Generality Proof**: [Work in both 1628 and 1970?]

---

**Directive**: ONE BI-DIRECTIONAL LOOP > TEN VISIONARY TABS.
