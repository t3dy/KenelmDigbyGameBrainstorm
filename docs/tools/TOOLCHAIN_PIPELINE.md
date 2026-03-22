# 📚 Almagest Toolchain Pipeline

**Purpose**: To define the step-by-step transformation from scholarly material to a playable Renaissance RPG slice.

---

## 🏛️ 1. THE CANONICAL PIPELINE FLOW

```text
[SOURCE] -> [Scholary PDF / Text]
  |
  | (Ingestion Tools) --------------------> SourceExcerptParser, EntityExtractor
  |
[NOTES] -> [Structured Research Units]
  |
  | (Structural Tools) -------------------> PatronageNetworkBuilder, ReputationAxisDefiner
  |
[SEEDS] -> [Mechanic Seed (Mapping)]
  |
  | (Assembly Tools) ---------------------> SceneSkeletonGenerator, EncounterTriggerBuilder
  |
[PRIMITIVES] -> [JSON Objects (Encounters, Scenes)]
  |
  | (Balancing Tools) --------------------> DifficultyScaler, RiskProbabilityDistributor
  |
[SCENARIO PACK] -> [The Almagest Manifest]
  |
  | (Validation Tools) -------------------> ScenarioPackLinter, SourceCoverageValidator
  |
[PLAYABLE SLICE] -> [The ACK Harness / Simulation]
```

---

## 🏗️ 2. PILLAR ALIGNMENT

| Tool Type | | supported Pillar |
| :--- | :--- | :--- |
| **Ingestion** | (Excerpts/Exergenics) | Shared (Context) |
| **Structural** | (Patronage/Reputation) | **Ultima-like** (Systemic/Moral) |
| **Assembly** | (Scenes/Dialogue) | **FF-like** (Dramatic/Narrative) |
| **Balancing** | (Vessels/Status) | **FTL-like** (Tactical/Crisis) |
| **Validation** | (Linters/Schemas) | Shared (Stability) |

---

## ⚖️ 3. HUMAN VS LLM INTERVENTION

*   **Human Authoring**: Selection of "Source Excerpts", choosing the "Lineage", and the "Live Preview."
*   **LLM Authoring**: Automated "Mechanic Seed" generation, scaling "Crisis Stakes", and "Dialogue Tree" expansion.
*   **The Maker Tools** (ACK Port/Encounter/Asset): Acts as the interface where both meet to commit changes to the JSON manifest.

** Generality Answer**: **YES.** A designer can take any scholarly text (e.g., from an office sim or a different 1620s voyage), ingest excerpts, infer a patronage debt (reputation axis), and assembly a scene (FF-style) or an encounter (FTL-style) without code changes.
