# 🏛️ Almagest Design Motif Extraction

**Purpose**: To extract recurring historical and structural patterns from the Scholarly Corpus (Digby, 1603-1665) and generalize them into reusable **Construction-Kit Motifs**.

---

## 🔬 1. THE EPISTEMIC MOTIF: "Experimental Uncertainty"
*   **Scholarly Source**: Digby’s *Powder of Sympathy*, *Alchemy*.
*   **Historical Pattern**: The exact properties of a substance or the outcome of a medical trial were often disputed or "hidden" during the Renaissance. Results were only revealed through use (The Weapon Salve).
*   **Generalized Motif**: **`Epistemic_Risk`**.
    *   **Logic**: A primitive (item/encounter) wraps its true value in an "Uncertainty" layer. The player must commit to the action before the actual `ResourceDelta` is revealed.
    *   **Usage**: Generalizable to any RPG system involving crafting, research, or investigation.

## 🏛️ 2. THE SOCIAL MOTIF: "Patronage Networks"
*   **Scholarly Source**: Digby as *Chancellor to the Queen Mother*, *Gentleman of the Bedchamber*.
*   **Historical Pattern**: Political power was not a static stat but a debt-based network. A "Letter of Marque" was a resource granted in exchange for future service and reputation risk.
*   **Generalized Motif**: **`Status_Debt`**.
    *   **Logic**: `ReputationAxis` is linked to `ActionAvailability`. Increasing your `Power` (resource) creates a negative `ServiceDebt` (reputation) that triggers specific `Crisis Encounters` until resolved.
    *   **Usage**: Generalizable to courtly drama, espionage, or faction-based political systems.

## ⚔️ 3. THE MARITIME MOTIF: "Jurisdictional Friction"
*   **Scholarly Source**: *Sir Kenelm Digby's Interruptions: Piracy and Scanderoon*.
*   **Historical Pattern**: The legality of an action (Privateering) changed instantly across the Mediterranean depending on whether one was in Ottoman, French, or Venetian waters.
*   **Generalized Motif**: **`Jurisdictional_Shift`**.
    *   **Logic**: An `Encounter` does not have fixed stakes. Its rewards are filtered through a `JurisdictionModifier` attached to the current `Location`.
    *   **Usage**: Generalizable to any game involving borders, smuggling, or varied legal landscapes.

## 📜 4. THE PHILOLOGICAL MOTIF: "Textual Recovery"
*   **Scholarly Source**: *Digby as Bibliophile and Collector of Manuscripts*.
*   **Historical Pattern**: Knowledge was recovered from corrupted, fragmented ancient texts. The "Truth" was proportional to the scholar's `Philology` skill.
*   **Generalized Motif**: **`Fragment_Reconstruction`**.
    *   **Logic**: A `SourceExcerpt` (primitive) is processed by a `Skill` to produce a `Resource` (Knowledge). The higher the skill, the lower the "Noise" in the resulting data.
    *   **Usage**: Generalizable to detective games, archaeological sims, or science-based research loops.

---

**Summary**: These motifs ensure that Almagest tools capture the "feel" of the Renaissance (uncertainty, patronage, fragmented knowledge, legal friction) without hardcoded lore.
