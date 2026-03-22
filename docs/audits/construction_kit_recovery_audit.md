# 🏛️ Construction Kit Recovery Audit

**Date**: 2026-03-20
**Scope**: Project Infrastructure, Governance, and Architectural Boundaries

## 🎯 1. IDENTIFIED CREEP & LEAKAGE (THE "BLUR")

### A. Init Files & Governance
- **Vision vs Validation**: Existing `SYSTEM_INIT.md` and `CONSTRUCTION_KIT_SCOPE.md` use "Master-Maker" visionary language but lack actionable "Feature Gates" or "Validation Checklists."
- **Creep Invitation**: The core objective allows for "Full-Scale Construction Kit" without a hard boundary on what constitutes the "Engine" versus a "Scenario Pack."
- **Missing Gating**: There is no documented rubric for rejecting "bespoke" mechanics (e.g., weapon salve logic) vs. generalizable primitives (e.g., status-resource logic).

### B. Digby-Bespoke Leakage
- **State Coupling**: `src/state/gameStore.ts` contains hardcoded `mixReagents`, `healCharacter`, and `selectLetter` logic. These are **Scenario-specific** mechanics that have leaked into the **Engine's** global state.
- **Data Pollution**: `src/data/manifest.json` is a monolith. It contains lore, mechanics, and UI configuration for *one specific campaign* (Digby). It is not a template; it is a hardcoded instance.
- **Folder Organization**: `KenelmDigby/` exists in the root as a "source" folder, but there is no equivalent `schemas/` or `source-pipeline/` to generalize other scholarly datasets (e.g., PKD Exegesis).

### C. Architectural Boundaries
- **Engine vs Content**: Currently, adding a new "Renaissance" mechanic require editing `schema.ts` and `gameStore.ts`. This proves the "Engine" is not decoupled from the "Content."
- **Authoring Surfaces**: While we have `PortEditor` and `AssetPainter`, they are built in `src/components/editor` inside the app. They should be distinct **Tools** operating on **Schemas**.

## 🛑 2. PATHWAY TO GENERALITY (GAPS)

| Gap | Description | Impact |
| :--- | :--- | :--- |
| **Pipeline Clarity** | No `SOURCE_TO_SCENARIO` workflow. LLMs "guess" how to convert PDFs to JSON. | High Hallucinated Logic. |
| **Schema Sovereignty** | Primitives (`Scene`, `Actor`) are defined in TypeScript, not JSON Schema. | Hard for non-React tools to validate. |
| **Vertical Slice Gating** | No proof that the "Ports" tool works for a non-maritime scenario (e.g., a 1970s office). | Visual Bespokeness. |

## 🛠️ 3. CORE RECOMMENDATIONS (PHASE 2-10)
1.  **Isolate the Engine**: Move core React components and Zustand state logic to `/engine`.
2.  **Externalize Content**: Move `manifest.json` and its brethren to `/scenario-packs/digby-1628`.
3.  **Formalize Workflows**: Create the `LLM_DESIGN_WORKFLOW` so Antigravity doesn't improvise.
4.  **Enforce Feature Gates**: Every new tab must die unless it proves it edits a primitive in `/schemas`.

---

**Audit Status**: CRITICAL. Architecture reflects a "Digby Game" more than a "Construction Kit."
**Recovery Required**: 10-Phase Systemic Refactor.
