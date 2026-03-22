# 🏛️ Almagest: The History-to-Game Maker Kit (OVERVIEW)

## 📊 CURRENT SYSTEM MATURITY
- **Architecture**: **Specified**. The blueprint for the toolkit and its lineages is locked.
- **Vessel/Encounter Tools**: **Implemented**. Code exists for editors, but end-to-end validation is pending.
- **Workflow Pipeline**: **Specified**. The path from Source -> Scenario is diagrammed, but not yet validated in a live demo.

---

## 🏗️ 1. WHAT IS ALMAGEST?
Almagest is an **Experimental Construction Kit** designed to turn scholarly historical notes into playable RPG micro-scenarios. Instead of coding every interaction, designers use data-driven "Lego blocks" (Primitives) to model history.

We support three lineages of gameplay:
1.  **Systemic (Ultima)**: Reputation-gated choices.
2.  **Dramatic (FF)**: Scripted cinematic scenes.
3.  **Tactical (FTL)**: Resource-heavy crisis management.

---

## ⚖️ 2. THE GOVERNANCE (How We Stay Honest)
To prevent "feature creep" or fake claims, the project is governed by strict rules:
*   **[INIT_PROJECT.md](file:///INIT_PROJECT.md)**: The core mission and status taxonomy.
*   **[FEATURE_GATE.md](file:///docs/governance/FEATURE_GATE.md)**: The "Bouncer" that rejects unproven or speculative features.
*   **[VALIDATION_CHECKLIST.md](file:///docs/governance/VALIDATION_CHECKLIST.md)**: The final verification required for any claim.

---

## 🛠️ 3. THE WORKSPACE TOOLS (Maker Suite)
Currently implemented editor components (Status: Implemented):
*   **Port Editor**: Map and jurisdiction layout.
*   **Encounter Editor**: Crisis and naval combat logic.
*   **Asset Painter**: Custom sprite and icon creation.

Detailed blueprints for 40 tools are available in **[CONSTRUCTION_KIT_TOOLS.md](file:///docs/tools/CONSTRUCTION_KIT_TOOLS.md)**.

---

## 📚 4. THE PROPOSED PIPELINE (History -> Game)
Status: **Specified**. The workflow for transforming information into a scenario:
1.  **Source Notes**: Extracting records from history ([Template](file:///templates/SOURCE_NOTE_TEMPLATE.md)).
2.  **Mechanic Seeds**: Mapping records to game blocks.
3.  **Scenario Pack**: Exporting to a JSON manifest.

Details: **[SOURCE_TO_SCENARIO_PIPELINE.md](file:///docs/workflows/SOURCE_TO_SCENARIO_PIPELINE.md)**.

---

## 📂 5. FILE MAP
*   **/engine**: Core React/Zustand runtime.
*   **/scenario-packs**: Current data (Digby mission).
*   **/docs/architecture**: Primitives and boundaries.

**Next Step**: Consult the **[DESIGNER_WORKFLOW.md](file:///docs/workflows/DESIGNER_WORKFLOW.md)** to begin a trial authoring pass.
