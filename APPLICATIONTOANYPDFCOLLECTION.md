# 🏛️ THE ALMAGEST PIPELINE: Research-to-Simulation
*A blueprint for translating early modern historical corpora into structural game mechanics.*

The **Almagest Pipeline** (codenamed **KDSC: Knowledge-Driven Simulation Compiler**) is a high-fidelity workflow for building "Structural Alchemical Simulations" from a collection of historical research (PDFs, Manuscripts, Primary Sources).

---

## 🏗️ THE 5-LAYER STACK

### 1. LAYER ONE: RESEARCH (INGESTION)
**Goal:** Process raw text into a tagged and keyword-indexed "Knowledge Base."
*   **Corpus**: Any collection of PDFs/Markdown for a historical figure (e.g., *Margaret Cavendish*, *Robert Boyle*, *John Dee*).
*   **Ingest Pattern**: 
    1.  **OCR/Parsing**: Convert PDFs into clean Markdown.
    2.  **Entity Tagging**: Extract `[NAME]`, `[REAGENT]`, `[DATE]`, and `[LOCATION]` using keyword frequency models.
    3.  **Providence**: Ensure every piece of text is linked back to a specific PDF page number (Source-of-Truth).

### 2. LAYER TWO: ONTOLOGY (THE TRUTH)
**Goal:** Create a normalized JSON database of "Historical Truth" in `/docs/ontology/`.
*   **Characters**: `id`, `name`, `motivation`, `historical_context`.
*   **Reagents (or Portals)**: The "verbs" of the world. For alchemical figures, these are materials; for explorers, these are trade winds or current routes.
*   **Conflict Variants**: **CRITICAL FEATURE.** Identify three conflicting descriptions of the same entity from different sources. This creates the "Philology" gameplay.

### 3. LAYER THREE: DESIGN (AFFORDANCE)
**Goal:** Map the Ontology to specific game variables (Affordances) in `/docs/design/`.
*   **Example Mapping**: 
    *   *Ontology*: "Glass of Antimony" (Purest form, ruby red).
    *   *Design*: `potency: 1.0`, `stigma_on_mix: 15`, `rarity: legendary`.
*   **Vectorization**: Map ports and locations to an SVG coordinate system for navigation.

### 4. LAYER FOUR: COMPILATION (THE BUILD)
**Goal:** Resolve conflicts and build the unified `manifest.json`.
*   **The Compiler**: A script (`compile_manifest.cjs`) that:
    1.  Reads all Files in `/docs/ontology/`.
    2.  Check for "Resolution Tags" (decisions made by the user/player).
    3.  Injects "Global Multipliers" (e.g., Market pricing based on Day X).
    4.  Emits a single `manifest.json` into the `src/` directory.

### 5. LAYER FIVE: RUNTIME (SIMULATION)
**Goal:** Consume the manifest in a React + Zustand application.
*   **State Management**: Use `gameStore.ts` to handle player inventory and navigation.
*   **Theater Mode**: Launch the `SceneRunner` with the compiled historical scenes to visualize the research results.

---

## 🛠️ REPLICATING FOR A NEW FIGURE

### STEP 1: INITIALIZE THE DIRECTORY
```bash
/docs
  /ontology/   <-- Define your Truth
  /design/     <-- Define your Mechanics
  /workflow/   <-- Track the Development
/scripts
  compile_manifest.cjs  <-- The Brain
/src
  /state/      <-- Zustand Store
  /components/ <-- The Interface
```

### STEP 2: BUILD THE "PHILOLOGY ENGINE"
1.  Find a historical concept with conflicting definitions.
2.  Store them in `reagents.json` under `variant_options`.
3.  Implement a `Philology.tsx` component to let the player choose the "True Text."
4.  Update the Compiler to change reagent stats based on the choice.

### STEP 3: EXECUTE CINEMATIC PROOF
1.  Write a series of "Moments" in `scenes.json`.
2.  Use the **Director Mode** to play them back synchronously.
3.  This validates that your research (Ontology) is correctly reaching the final presentation (Runtime).

---

## ⚖️ THE CORE CONTRACT: "The Eagle & The Eye"
*   **The Eagle (Action)**: Every button in the game must affect an Ontological state.
*   **The Eye (Research)**: Every state in the game must have a Provenance reference to the Knowledge Base.

**Status**: SYSTEM READY FOR NEW COHORT.
**Author**: Antigravity / The Almagest Design Collective.
