# 🏛️ Almagest Construction Kit (ACK) Scope

This is the canonical definition of the Almagest Construction Kit (ACK). It establishes the boundaries between the **Engine**, the **Maker Tools**, and the **Content**.

---

## 🏗️ 1. ARCHITECTURAL LAYERS

| Layer | Purpose | Status |
| :--- | :--- | :--- |
| **THE ENGINE** | Core React/Zustand runtime + KDSC Compiler. | **FROZEN** |
| **THE MAKER TOOLS** | Level editors, sprite creators, and manifestation authoring UIs. | **ACTIVE** |
| **THE CONSTRUCTION KIT** | Reusable primitives for scene/mechanics. | **STABLE** |
| **THE CONTENT** | JSON-based data (manifest, encounters) built with the tools. | **GATED** |

---

## 🧬 2. THE ACK PRIMITIVE VOCABULARY

Every feature proposed for Almagest MUST be reducible to one or more of these primitives.

### **A. Authoring & Tooling (THE MAKER)**
*   **ViewportEditor**: A visual interface for modifying `Port` tiles and `Sprite` positions.
*   **ManifestEditor**: A data-driven UI for editing `Reagents`, `Recipes`, and `Encounters`.
*   **ScriptVisualizer**: A timeline-based tool for authoring `SceneScript` actions.
*   **AgentBridge**: A standardized JSON-over-IPC protocol for LLMs to safely modify manifest data.

### **B. Narrative & Pacing (FF-Lineage)**
*   **Scene**: A background + a list of `Actor` states + a `Timeline` of actions.
*   **Actor**: A uniquely identified sprite with `Emote`, `Say`, and `Move` capabilities.
*   **DialogueUnit**: A single text block with optional branching `Choice` outcomes.

### **C. Systemic World (Ultima-Lineage)**
*   **ReputationAxis**: A bi-directional numeric stat (e.g., Honor-Stigma) that gates `Encounter` availability.
*   **Resource**: A key/value persistence unit (e.g., Wealth, Knowledge) consumed by `Actions`.

### **D. Crisis & Tactics (FTL-Lineage)**
*   **Encounter**: A discrete gameplay logic unit with `Trigger` conditions and `Reward/Penalty` stakes.
*   **SubsystemState**: A health/efficiency unit (e.g., Ship Component).
*   **CombatSubsystem**: A turn-based state machine for `Moves`.
*   **SynthesisSubsystem**: A recipe-based state processor (Alchemy/Crafting).

---

## 🛑 3. EXPLICITLY THE OUT-OF-SCOPE BACKLOG

The following items are forbidden until the primitives above achieve **100% Stability**:
*   **Aesthetic Elaboration**: Custom shaders or "Cinematography" UI that is not tied to a primitive.
*   **World Inflation**: New ports or character bios without a specific tool-driven requirement.
*   **Feature Creep**: New game mechanics (e.g., "Fishing Minigame") that do not utilize existing primitives.

---

## ✅ 4. THE "DEFINITION OF DONE" (DoD) FOR TOOLS

A Tool is considered "Done" when:
1.  **Bi-Directional**: It can read from and write to the `manifest.json`.
2.  **Stateless Persistence**: Modifications appear immediately in the game-state without code changes.
3.  **Primitive-First**: It edits existing ACK primitives, it does not create new ad-hoc logic.
4.  **Agent-Accessible**: The JSON schema it produces is documented for LLM-authoring.
5.  **Visual Proof**: It can be used to re-create the "Scanderoon" or "Milos" stages.

---

## 🛡️ 5. RULES FOR ADDING NEW TOOLS

1.  **Automation**: Must explain how this tool reduces the manual work (for humans or LLMs) required to author new scholarly datasets.
2.  **Stability**: New tools cannot be added if the underlying primitives they edit are unstable.
3.  **Portability**: Must be usable across different themes (e.g., "A level editor for 1628 Algiers must work for 1970s PKD Exegesis").
