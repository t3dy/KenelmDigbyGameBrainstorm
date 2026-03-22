# 🏛️ Almagest Project Init (Canon)

**Purpose**: Establish the project's identity as a **Reusable Renaissance RPG Construction Kit** for scholarly simulation.

## 📊 1. THE STATUS TAXONOMY (MANDATORY)
Current project status must be qualified by these levels:
- **Planned**: Concept defined.
- **Specified**: Specs, schemas, and plans exist.
- **Implemented**: Code exists and compiles.
- **Validated**: End-to-end workflow proven with evidence.
- **Generalized**: Proven across multiple scholarly datasets.

## ⚖️ 2. TRUTHFULNESS CONSTRAINTS (ANTI-HALLUCINATION)
All progress reporting must adhere to these facts:
- Plans are NOT implementation.
- Registries are NOT tools.
- Pipeline diagrams are NOT executed systems.
- A single "Digby" example is NOT general proof.
- LLM usability requires a demonstrated, end-to-end authoring pass.

## 🏗️ 3. THE FOUR LAYERS (ARCHITECTURE)
| Layer | Path | Purpose |
| :--- | :--- | :--- |
| **THE ENGINE** | `src/engine/` | Minimal, React/Zustand runtime for primitives. |
| **THE ASSETS** | `/docs/assets/` | Reusable **Modules/Templates** for gameplay mechanics. |
| **THE MAKER** | `src/components/editor/` | Visual authoring tools for manifest data. |
| **THE SCENARIO** | `scenario-packs/` | Specific historical content packs (JSON). |

## 🛑 4. GOVERNANCE RULES (ANTI-CREEP)
1.  **No New Logic without a Tool**: If a mechanic is added, a corresponding editor MUST be updated.
2.  **No Scenario without Asset Abstraction**: Every unique gameplay unit (e.g. an "Ambush") must first be defined as a reusable Asset before it is instantiated.
3.  **No Lore in the Engine**: Port names, bios, and specific dialogues MUST live in `/scenario-packs/`.
3.  **Generality Check**: Every primitive must work across disparate datasets (1620s Algiers vs 1970s PKD).

## ✅ 5. DEFINITION OF "VALIDATED SLICE"
A validated vertical slice MUST deliver:
1.  **A Schema change** (Contract).
2.  **An Editor UI update** (Authoring).
3.  **A Simulation view update** (Rendering).
4.  **A Proven Workflow** (Source-to-Scenario execution).

---

**Status**: SPECIFIED. Architectural gating enabled.
**Reference**: [CONSTRUCTION_KIT_SCOPE.md](file:///docs/architecture/CONSTRUCTION_KIT_SCOPE.md)
