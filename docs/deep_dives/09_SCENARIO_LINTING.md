# ✅ Deep Dive: Scenario Linting (Tool #27)

**Status**: **Validated** | **Layer**: 6 (Assembly/Governance)

## 🏗️ How it Works
The **Scenario Pack Linter (`lint_scenario.cjs`)** is the primary **Governance Gate** of the Almagest Construction Kit. It is the tool that ensures that a manifest is not just "Valid JSON," but "Structural Machinery."

*   **Primitive Verification**: It checks that all Locations, Encounters, and Scenes follow the core schema rules.
*   **Literal Type Enforcement**: It structurally rejects non-standardized strings (e.g., `Background: "london_prison"`) that aren't in the validated asset library.
*   **Structural Audit**: It cross-checks IDs to ensure that an Encounter's `location` exists and a Reagent's `iconId` is present in the assets.

## 🛠️ Tips for Human Designers
1.  **Iterative Linting**: Run the linter after every "Manual Edit" to the manifest. It is the only way to catch "String Fatigue" (typos) before the engine crashes.
2.  **Audit Reports**: Read the `lint_report.json` instead of just the CLI output. It contains the granular errors that the **Repair-Maker** needs to fix.

## 🤖 Tips for LLMs
1.  **Pre-Validation**: Before "Finalizing" a manifest generation, do a mental lint of your own. Check: "Is this Background primitive valid?" "Do all Scene actor IDs exist in the registry?"
2.  **Schema Consistency**: If you suggest an "Extension" to the schema (e.g., a new background type), update the `lint_scenario.cjs` at the same time.

---
**Generality Note**: This tool is the "First Line of Serious Defense" for any Almagest-style generator, from a simple conversation to a complex historical simulation.
