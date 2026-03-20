# ALMAGEST: THE STRATEGIC ROADMAP (POST-REFACTOR)

This roadmap outlines the evolution of the **Almagest** simulation under the **Knowledge-Driven Simulation Compiler (KDSC)** architecture.

---

## 📍 CURRENT STATUS: PHASE 3 (COMPLETE)
*   **Layer Lockdown**: 5-Layer architecture enforced.
*   **Provenance**: Reagents and Locations tethered to research sources.
*   **Resolution Loop**: Manuscript variants successfully impact reagent stats at build-time.

---

## 🚀 PHASE 4: THE LEVANTINE TRADE (ACTIVE)
*   **Objective**: Transition the "Market" from a UI prototype to an **Ontology-Driven Economy**.
*   **Ontology**: Define Mediterranean port commodities (Silk, Spices, Alchemical Lead) with pricing modifiers based on historical data.
*   **Design**: Implement "Risk/Reward" tables for crossing the Straits of Gibraltar under Venetian surveillance.
*   **UI**: Hook the `Market.tsx` to the `manifest.json`'s port-specific pricing data.

## ⚖️ PHASE 5: THE STIGMA & THE PURSUIT
*   **Objective**: Formalize the "NavMap" tactical chase as a consequence of the player’s **Stigma** (Reputation).
*   **Ontology**: Map the historical biography of Sir Everard Digby to the "Stigma" mechanic.
*   **Design**: Scale "Pursuer" AI aggression linearly with the player's Stigma level.
*   **Mechanic**: "Weapon Salve" repair efficiency must be balanced against the loss of "Spirit" (Morale).

## 🧪 PHASE 6: THE LABORATORY EVOLUTION
*   **Objective**: Transform the "Construction Kit" (ACK) from a raw editor into a **Visual Knowledge Editor**.
*   **Feature**: Drag-and-drop mapping from **Ontology (The Truth)** to **Design (The Affordance)**.
*   **Outcome**: A "No-Code" way for agents to propose new world-state behaviors.

## 🏅 PHASE 7: THE HONOR OF STELLIANA (ENDGAME)
*   **Objective**: Narrative resolution and return to London.
*   **System**: Calculate the player's cumulative **Honor**, **Knowledge**, and **Wealth**.
*   **Endings**: Branching narrative outcomes based on the player's resolution of alchemical truth vs. courtly expectations.

---

## 🛡️ CORE CONSTRAINTS (FOR AGENTS)
1.  **NO** feature may bypass the `scripts/compile_manifest.cjs` gate.
2.  **ALL** gameplay mods must start as a proposal in `/docs/design/`.
3.  **ZERO** manual editing of `src/data/manifest.json`.
