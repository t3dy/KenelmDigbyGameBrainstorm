# 🧱 Almagest: Systemic Machinery Primitives

**Purpose**: To define the data structures for the "Second Tier" of the Almagest Construction Kit—**The Machinery**. These are the engines that consume the content (Encounters, Locations, Reagents).

---

## 🏗️ 1. CHRONO-MACHINERY (Loop Generators)
*   **ChronoSchedule**: A node defining a repeating event trigger.
    - `frequency`: `daily | weekly | lunar | custom`
    - `trigger_condition`: `LocationID` | `ResourceThreshold`
    - `action_id`: `EncounterID` | `PromptID`
*   **DecayEngine**: Defines how stats change over time without intervention.
    - `target_stat`: `honor` | `stigma` | `wealth`
    - `decay_rate`: `modifier_value`
    - `halt_condition`: `EncounterCompletionID`

## ⚔️ 2. TACTIC-MACHINERY (Combat/Naval Generators)
*   **CombatMoveRegistry**: Generated sets of tactical abilities.
    - `move_id`: `String`
    - `reagent_tether`: `ReagentID` (The alchemical source of the move)
    - `damage_type`: `Hull | Sail | Crew | Morale`
    - `mechanic`: `FTL_Lineage` (Tactical power states)
*   **AIPattern**: Defines the Pursuer's tactical behavior.
    - `aggro_formula`: `(Stigma * 0.5) + (Wealth / 100)`
    - `detection_radius`: `Integer`
    - `evasion_threshold`: `Percentage`

## 🧪 3. ECON-MACHINERY (Alchemical Business Simulation)
*   **MarketOscillator**: Automates scarcity.
    - `location_id`: `String`
    - `local_demand`: `Record<ReagentID, Float>`
    - `volatility`: `Low | Medium | High`
*   **DebtLedger**: Tracks patronage.
    - `patron_id`: `CharacterID`
    - `total_loaned`: `Integer`
    - `interest_trigger`: `EncounterID` (e.g., "The Call for Repayment")

---

**Status**: **Specified**. These primitives will be implemented into `schema.ts` as the `/makers/` tools are finalized.
