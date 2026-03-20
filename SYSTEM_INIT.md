# SYSTEM_INIT: Almagest Knowledge-Driven Simulation Compiler (KDSC) v2.0

## 🎯 1. OBJECTIVE
To transform the Almagest project into a deterministic, research-backed simulation where every gameplay mechanic, narrative beat, and alchemical reagent is derived from a strictly validated **Ontology Layer**.

---

## 🏗️ 2. THE 5-LAYER ARCHITECTURE

### **Layer 1: Research (The Input)**
*   **Artifacts**: Source PDFs, extracted summaries, keyword reports.
*   **Action**: Keyword detection and source extraction.

### **Layer 2: Ontology (The Core Truth)**
*   **Artifacts**: `/docs/ontology/*.json` (Entities, Relationships, Variants).
*   **Action**: Defining "What exists" in the world.
*   **Constraints**: Must include **Provenance** (source) and **Confidence** for every entity.

### **Layer 3: Design (The Affordance)**
*   **Artifacts**: `/docs/design/*.json` (Ontology -> Mechanics mapping).
*   **Action**: Defining "How it works" in the game.
*   **Constraint**: No mechanic may exist without an Ontological backing.

### **Layer 4: Compilation (The Builder)**
*   **Script**: `/scripts/compile_manifest.py` (or similar).
*   **Action**: Deterministically merges Ontology + Design -> `src/data/manifest.json`.
*   **Constraint**: **MANIFEST.JSON IS READ-ONLY FOR AGENTS.**

### **Layer 5: Runtime (The Game)**
*   **Code**: `/src/` (React + Zustand).
*   **Action**: Consumes `manifest.json` ONLY.
*   **Constraint**: No interpretation or mutation of ontology at runtime.

---

## 🚦 3. DATA FLOW CONTRACT
**INGEST → ONTOLOGY → DESIGN → COMPILE → RUNTIME**

1.  **NO** agent may write directly to `src/data/manifest.json`.
2.  **NO** mechanic may be added to the code without a backing entry in `/docs/ontology/`.
3.  **ALL** changes to the world-state must be performed by the **Foreman** proposing Ontology/Design changes, followed by a **Compilation Step**.

---

## 📂 4. DIRECTORY STRUCTURE

| Path | Purpose | Role |
| :--- | :--- | :--- |
| `/.agents/` | Persona Contracts (Foreman, Worker, Librarian) | **Foreman** |
| `/docs/ontology/` | Entities, Relationships, Manuscript Variants | **Librarian** |
| `/docs/design/` | Mechanic Affordances, Gameplay Tables | **Retroist** |
| `/docs/workflow/` | Active Implementation Plans (Ephemeral) | **Foreman** |
| `/scripts/` | Manifest Compilers & Validation Scripts | **Orchestrator** |
| `/src/` | React Runtime (Read-only Manifest) | **Worker** |

---

## 🧬 5. PHILOLOGY SYSTEM
Philology is a first-class citizen. 
*   **Variants** are stored in `/docs/ontology/manuscripts/`.
*   **Truth Resolution** happens at the **Design Layer**.
*   **Resolution Output** modifies Reagent behavior and Narrative branches at **Compile Time**.

---

## 🛡️ 6. TETHER VALIDATION RULES
1.  **Librarian <-> Retroist**: A reagent must have a `source` and `confidence > 0.7` to be mapped to a mechanic.
2.  **Foreman <-> Worker**: Worker cannot edit `/src/` without an approved `IMP-xxxx` linked to an Ontology change.
3.  **Compilation Gate**: Build fails if an entity lacks provenance.

---

**Status**: SEALED ARCHITECTURE. COMPILER-DRIVEN.
**Mode**: EXPANSION MODE (Phase 4: Levantine Trade).
**Strategic Reference**: [ROADMAP.md](file:///docs/architecture/ROADMAP.md)
