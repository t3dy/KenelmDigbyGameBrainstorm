# ⚙️ Almagest: The Maker Contract

**Purpose**: To define the structural and governance requirements for tools in the `/makers/` directory. While "Tools" and "Scripts" perform linear edits, a **Maker** is a specialized generator that produces **Systemic Machinery**.

---

## 🏗️ 1. ARCHITECTURAL REQUIREMENTS
1.  **Immutability Policy**: Makers should NOT overwrite the master manifest directly. They must output a `patch_[feature].json` or a `temp_staging.json`.
2.  **Input/Output Contract**:
    - **Input**: Current `AlmagestManifest` (JSON).
    - **Control Metadata**: A Command String or Semantic Triple.
    - **Output**: A Validated JSON Node compatible with the `schema.ts`.
3.  **Governance Traceability**: Every generated node must include a `generation_id` and a `maker_type` for audit purposes.

---

## 🏺 2. SYSTEMIC CATEGORIES
A Maker must belong to one of these 5 machinery classes:
1.  **CHRONO-MAKER**: Generates temporal schedules and event triggers.
2.  **TACTIC-MAKER**: Generates movement grids, combat moves, and AI profiles.
3.  **ECON-MAKER**: Generates market pricing, reagent scarcity, and debt ledgers.
4.  **UX-MAKER**: Generates keyboard maps, UI component priorities, and command palettes.
5.  **REPAIR-MAKER**: Automates the rectification of manifest lint errors.

---

## ✅ 3. VALIDATION GATE
Before a Maker-generated node is merged into a Scenario Pack, it must pass:
1.  **Structural Linter** (Tool #27).
2.  **Reputation Balance Check** (Ensures the change doesn't break the loop economy).
3.  **Generality Check** (Can this machine work for non-Digby scenarios?).

---

**Status**: **Specified**. All future machinery generators MUST conform to this contract to be integrated into the Almagest Platform.
