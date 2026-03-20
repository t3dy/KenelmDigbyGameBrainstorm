# ⚔️ ALMAGEST: The Kenelm Digby Mediterranean Voyage

**Almagest** is a research-backed tactical simulation of Sir Kenelm Digby’s 1628 privateering voyage. This project integrates 17th-century alchemical theory (The Powder of Sympathy) with a high-tension naval chase across the Mediterranean.

---

## 🏗️ THE KDSC ARCHITECTURE
This repository operates on the **Knowledge-Driven Simulation Compiler (KDSC)** architecture. This 5-layer framework ensures that every gameplay mechanic is strictly derived from validated historical research.

### **The 5-Layer Stack**
1.  **Research (Input)**: Historical PDFs, primary sources, and keyword extractions.
2.  **Ontology (The Truth)**: Normalized entities (reagents, characters, ports) with provenance and confidence scores in `/docs/ontology/`.
3.  **Design (Affordance)**: Mapping of ontological data to structural mechanics in `/docs/design/`.
4.  **Compilation (Build)**: A deterministic build script ([scripts/compile_manifest.cjs](file:///scripts/compile_manifest.cjs)) that builds the world-state.
5.  **Runtime (Simulation)**: A React + Zustand application consuming the compiled `manifest.json`.

---

## 📂 DOCUMENT REGISTRY (CANONICAL)

| Category | File / Folder | Purpose |
| :--- | :--- | :--- |
| **CONSTITUTION** | `SYSTEM_INIT.md` | Core structural rules and KDSC data flow contract. |
| **SWARM** | `/.agents/SWARM_ROLES.md` | Definitions for Foreman, Worker, Librarian, Philologist, and Orchestrator. |
| **ONTOLOGY** | `/docs/ontology/` | Every entity in the world (Reagents, Locations, Characters, Scenes). |
| **DESIGN** | `/docs/design/` | Mechanic-Ontology mappings and gameplay balance. |
| **WORKFLOW** | `/docs/workflow/` | Active implementation plans (IMP) and historical audit reports (REPORT). |
| **COMPILER** | `scripts/compile_manifest.cjs` | The validator and builder for the Mediterranean world-state. |
| **RUNTIME** | `src/data/manifest.json` | **READ-ONLY** build output for the React simulation. |
| **STATE** | `src/state/gameStore.ts` | Unified Zustand data pipeline for the voyage and alchemy. |

---

## 🧬 THE SYMPATHETIC SIMULATION
Unlike standard RPGs, Almagest features a core **Philology System**:
*   **Competing Variants**: Reagents (like Vitriol) carry conflicting historical definitions from different manuscripts.
*   **Resolution Engine**: The player's resolution of these variants at the Philology workbench changes the mechanical properties of materials at compile-time.
*   **Tactical Chase**: A real-time Mediterranean map where the player’s **Stigma** (reputation) directly escalates the pursuit aggression of the Venetian fleet.

---

## 🏛️ THE ALMAGEST SHOWCASE PORTFOLIO
The simulation includes a high-fidelity **Showcase Portfolio** accessible from the main intro. This production gallery features:
*   **Theater Mode**: Automated cinematography for the 20 key scenes of Kenelm Digby’s life.
*   **Structural Deep-Dives**: Detailed design cards for the Alchemical Forge, the Mediterranean Stage, and the Philological Codex.
*   **Cinematic Presentation**: Glassmorphism and historical parallax effects designed for design audits and video reels.

---

## 🛠️ GETTING STARTED (DEVELOPER)
1.  **Install**: `npm install`
2.  **Build Manifest**: `node scripts/compile_manifest.cjs`
3.  **Run Simulation**: `npm run dev`
4.  **View Showcase**: Select "Almagest Showcase Portfolio" from the landing page to enter the production reel.

**License**: Private Research (Sir Kenelm Digby, 1628)
**Status**: PHASE 7: STRUCTURALLY SEALED. COMPILER-DRIVEN.
