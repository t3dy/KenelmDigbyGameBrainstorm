# KDSC MIGRATION & ACK INTEGRATION

## 🧭 MIGRATION PLAN (Incremental Adoption)

1.  **Step 1: Ontology Extraction**:
    *   Manually extract `reagents`, `locations`, and `characters` from the current `manifest.json`.
    *   Populate `/docs/ontology/reagents.json`, `/docs/ontology/locations.json`, etc.
    *   **Rule**: ADD PROVENANCE (source/confidence) to every entity.
2.  **Step 2: Compiler Logic Integration**:
    *   Update `/scripts/compile_manifest.js` to handle all current data fields.
    *   Delete the manual `src/data/manifest.json`.
    *   Run `node scripts/compile_manifest.js` to regenerate it.
3.  **Step 3: Runtime Lock-down**:
    *   Delete all "state-writing" logic from the **Foreman** and **Worker** prompts.
    *   Switch `manifest.json` to `.gitignore` (optional) or mark as `@readonly` in all JSDoc/TS.
4.  **Step 4: Philology Escalation**:
    *   Migrate manuscript fragments from `manifest.json` to `/docs/ontology/manuscripts/`.
    *   Implement "Variant Flagging" in `/docs/design/phi_config.json`.

## 🏗️ ACK INTEGRATION (ACK Phase 3)

The **Construction Kit (ACK)** will evolve from a JSON editor into a **Visual Ontology Workbench**.

1.  **Entity Graph View**:
    *   ACK reads `/docs/ontology/`.
    *   Visualizes relationships (links) as a graph.
    *   Allows adding **Provenance** in a UI modal.
2.  **Variant Timeline Editor**:
    *   Allows the **Philologist** agent (or human) to see competing variants side-by-side.
    *   Allows selecting the "Resolved Truth" flag which writes to `/docs/design/`.
3.  **Compilation Trigger**:
    *   A "BUILD WORLD" button in ACK that executes the compilation script and reloads the store.
4.  **No Direct Runtime Access**:
    *   ACK DOES NOT edit `src/data/manifest.json`.
    *   ACK edits Ontology and triggers Compiles.

---
**Status**: DRAFT FOR FOREMAN APPROVAL
**Target**: Complete Extraction by Turn 2000.
