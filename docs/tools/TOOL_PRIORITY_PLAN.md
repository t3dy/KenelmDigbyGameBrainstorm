# 🎯 Almagest Construction-Kit Tool Priority Plan

**Purpose**: To identify the **Top 8-10 High-Leverage Tools** that unlock the source-to-scenario pipeline and prioritize their implementation as **Antigravity Workspace Skills**.

---

## 🏗️ 1. TOP 8 PRIORITY TOOLS

| Rank | Tool | Category | Status |
| :--- | :--- | :--- | :--- |
| **01** | **SourceExcerptParser** | Ingestion | **High** |
| **02** | **MechanicSeedGenerator** | Structural | **High** |
| **03** | **SceneSkeletonGenerator** | Assembly | **Medium** |
| **04** | **ScenarioPackLinter** | Validation | **Medium** |
| **05** | **ReputationAxisDefiner** | Morality | **Medium** |
| **06** | **DialogueTreeBuilder** | Assembly | **Low** |
| **07** | **EncounterTriggerLogic** | Assembly | **Low** |
| **08** | **DifficultyScaler** | Balancing | **Low** |

---

## ⚙️ 2. ANTIGRAVITY WORKSPACE SKILLS (Integration)

| Skill Folder | Input | Output |
| :--- | :--- | :--- |
| **`skills/extract-source-notes/`** | Scholarly PDF/Text. | `/source-pipeline/` Notes. |
| **`skills/generate-mechanic-seed/`**| Source Notes. | `/source-pipeline/` Seeds. |
| **`skills/author-scenario-manifest/`**| Mechanic Seeds. | `/scenario-packs/` JSON. |
| **`skills/validate-scenario-pack/`** | JSON Manifest. | Lint Report (Schema/Logic). |

---

## 🛑 3. RISKS & DEFERRALS
- **Risk: Overfitting to Digby**: Any tool that assumes "Ship" must also assume "Office" or "Court". 
- **Deferred Area**: Purely aesthetic animations, camera-shaking, or custom-shader tools are explicitly **Out-of-Scope** for this construction kit phase.
- **Redundancy**: Tools must only edit **Primitives**. If a tool creates a new logic-type, it must be escalated to a schema-architect.

---

**Summary**: By focusing on the **Ingestion -> Seed -> Manifest -> Linter** pipeline, we enable LLMs to author complete micro-scenarios from scholarly evidence with 100% data integrity.
