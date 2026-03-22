# 🔗 Almagest Asset Pipeline Extension

**Purpose**: To define the role of the **Asset Layer** in transforming historical scholarship into gameplay.

---

## 🏛️ 1. THE AUGMENTED PIPELINE

```text
[SOURCE] -> [Historical PDF / Text Corpus]
  |
  | (Ingestion/Philology Tools) --------> SourceExcerptParser, EntityExtractor
  |
[SOURCE NOTES] -> [Structured Research Records]
  |
  | (Structural/Inference Tools) --------> MechanicSeedGenerator, PatronageInferrer
  |
[MECHANIC SEEDS] -> [Primitive Mapping (Location, Actor, Encounter)]
  |
  | (Asset Selection / Application) ----> **ASSET LAYER** (Modules, Templates, Generators)
  | 
  | (Assembly Tools) ----------------------> SceneSkeletonGenerator, PortConfigGenerator
  |
[SCENARIO COMPONENTS] -> [Populated JSON Manifests]
  |
  | (Validation/Simulation) --------------> ScenarioPackLinter, BalancingSimulator
  |
[PLAYABLE SLICE] -> [The Runtime Experience]
```

---

## 🏗️ 2. ASSET COMPOSITION EXAMPLE (DIGBY)

| Stage | Asset / Tool | Output Unit |
| :--- | :--- | :--- |
| **Source** | "Madrid Duel 1621" | Text Chunk |
| **Note**| Historical Claim | "Digby killed two attackers while outnumbered." |
| **Seed**| `Encounter` | `type: combat`, `adversaries: 15` |
| **Asset**| **Asymmetric Ambush Generator** | Populated `Encounter` with FTL-lineage stakes. |
| **Component**| **Scene Skeleton** | JSON node for the `scanderoon` manifest. |

---

## ⚖️ 3. HUMAN VS. LLM ROLES IN THE ASSET LAYER

*   **Human Architect**: Defines the Asset parameters (e.g. "What is an Ambush?").
*   **LLM Designer**: Selects the appropriate Asset for a Source Note (e.g. "This historical duel is an Ambush asset").
*   **The Construction Kit**: Provides the "Lego Board" (Asset Templates) where these units are snapped into place.

** Generality Check**: The **Asset Layer** is the secret to generality. By converting "Digby's Duel" into the "Asymmetric Ambush" Asset, it becomes immediately usable for a 1970s bar fight or a 2050s space piracy event.
