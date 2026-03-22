# 🏛️ Almagest: Serious Project Mandate

**Objective**: To transition the Almagest Construction Kit from an exploratory prototype into a rigorous, scholarship-led engineering environment that structurally prevents narrative creep and enforces systemic integrity.

---

## 🏗️ 1. DATA RIGOR & HARDENING
1.  **Schema Exhaustion**:
    - **Move from Strings to Enums**: All `Jurisdictions`, `Backgrounds`, `SpriteTypes`, and `EmotionTypes` must be strictly typed in `schema.ts`. No arbitrary strings allowed in the `manifest.json`.
    - **Stakes as Functional Typed Objects**: Instead of `wealth: -100`, use `Impact<Resource>` objects with `probability`, `decay_rate`, and `visibility_modifier`.
2.  **Provenance-First Authoring**:
    - Every `Encounter` and `Scene` node in the manifest MUST include a `provenance` field containing a valid `SourceNoteID`.
    - **Lint Rule**: Reject any manifest entry that lacks a validated scholarly link.

## ⚖️ 2. GOVERNANCE AS CODE
1.  **CI/CD Validation**:
    - Implement a `pre-commit` hook that runs `lint_scenario.cjs`.
    - If the "Evidence Block" in a PR is missing or fails to reference a `Validated` status, the merge is structurally blocked.
2.  **Reputation Consensus System**:
    - Implement the **Reputation Consistency Checker (Tool #23)** to simulate the mathematical drift of `Honor` and `Stigma`. Reject any encounter where a single choice creates a "Death Loop" in player state.

## 🧪 3. SCHOLARLY INTEGRITY (NO "LORE-BEASTS")
1.  **The Generality mandate**:
    - Assets like `ASYMMETRIC_AMBUSH` must be tested against TWO disparate datasets (e.g., Digby 1628 AND a 1970s Counter-Culture case study).
    - If an asset contains a single property that ONLY works for Digby, it is disqualified and must be refactored into a `Data Primitive` or a `Lore Layer`.
2.  **Headless Playtesting (Tool #50)**:
    - Automate a "Monte Carlo" simulation of the voyage. Run 10,000 automated sessions of a scenario pack to ensure equilibrium in the **Asset Layer** (e.g., Rumors shouldn't cascade to infinity).

## 🏙️ 4. PROFESSIONAL ARCHITECTURE
1.  **Runtime Decoupling**:
    - The React engine should not know about "Kenelm Digby." It should consume a generic `AlmagestManifest`. All Digby-specific strings are "Package Content," not "Platform Logic."
2.  **The "Maker" Registry**:
    - Instead of manual JSON editing, implement the **Asset Registry (Tool #09)** where assets are "Registered" and "Instantiated" via a CLI, preventing the manual syntax errors encountered during the Scanderoon/Algiers phase.

---

**Status**: **Specified**. Implementation of these mandates starts with the Schema Hardening and the CI/CD Linter integration.
