# 🏛️ Almagest: Multi-Agent Governance Protocol (MAKER EDITION)

This document serves as the primary guidance for all AI interactions with the Almagest codebase. It overrides all previous persona-based "lore" or "vision" docs.

---

## 🚦 1. THE ARCHITECTURAL GATEWAY

Every time you (Antigravity) propose an action, you MUST mentally verify it against this checklist:

1.  **Is this a Reusable Primitive?** (e.g., a `Scene` component, not a `Sinking_Venice` component).
2.  **Is this a Maker Tool?** (e.g., a Level Editor, Sprite Manager, or Manifest Editor).
3.  **Does it directly support a Primitive?** (e.g., adding `PortEditor` for the `PortManifest`).
4.  **Is it a Vertical Slice?** (e.g., proving the `Editor` can save 1 JSON field).

**IF NONE OF THE ABOVE**: It is feature creep. **ABORT AND REJECT.**

---

## 🛑 2. THE MAKER MANDATES (DISCIPLINED)

You are explicitly ENCOURAGED to build tools, but they must follow these rules:
*   **Bi-Directional Persistence**: Every editor MUST read from `manifest.json` and save back to the same schema. No ad-hoc local state.
*   **LLM-First Accessibility**: Data schemas must be documented so that other LLMs (or the user) can perform data-authoring without code changes.
*   **Aesthetic Discipline**: Editors should be functional and "premium-professional," not visually over-elaborated. Use the established Almagest design system.
*   **Stat Sprawl**: No new `stats` in the `gameStore.ts` without proving it creates a **Systemic Tension** (Ultima Lineage) or **Crisis Pressure** (FTL Lineage).

---

## 📜 3. THE "MAKER" WORKFLOW

Do not build "Perfect" tools. Instead:
1.  **Define the Editor Schema** (`src/data/schema.ts`).
2.  **Build a Read-Only View** of the manifest data in `src/components/editors/`.
3.  **Add a single Write Capability** (e.g., "Change Tile type" or "Edit Move Damage").
4.  **Sync to GameStore**: Prove the change is reflected in the simulation immediately.
5.  **Refactor**: Ensure the editor is a reusable primitive (e.g., "The manifest editor should work for any scholarly dataset").

---

## 🚫 4. REFUSAL PROTOCOL

If the User asks for:
*   "A more beautiful intro screen." → **REFUSE**. Request primitive-based UI layout instead.
*   "Detailed lore for 5 new ports." → **REFUSE**. Suggest using the **Port Editor** to author them.
*   "A cool mini-game for fishing." → **REFUSE**. This is un-anchored feature creep.

---

## 📝 5. MAKER PLANNING TEMPLATE (MANDATORY)

Every Turn's plan MUST follow this structure:
1.  **Maker Tool**: [Identify which editor are you building/fixing]
2.  **Target Primitive**: [Port | Scene | Encounter | Reagent]
3.  **Data Loop**: [Read -> Modify -> Persist]
4.  **Acceptance**: [Concrete 1-sentence success criterion]
5.  **Deferred**: [What will NOT be built this turn?]
6.  **Action**: [Smallest possible code step]
