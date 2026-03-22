# 🧱 Deep Dive: Mechanic Seeding (Tool #02)

**Status**: **Validated** | **Layer**: 2 (Systemic Mapping)

## 🏗️ How it Works
The **Mechanic Seed Generator (`generate_seed.cjs`)** is the first point of **Scholarly Transformation**. It takes a Layer 1 Source Note and maps the historical "Drama" to systemic "Stakes."

*   **The Heuristic**: If a source mentions "negotiation," the tool maps it to a `diplomatic` encounter with `honor` stakes.
*   **The Seed**: It produces a JSON "Seed" (a proto-encounter) that includes:
    - `id`: A unique, scholarship-derived identifier.
    - `type`: The Almagest Encounter class.
    - `stakes`: Quantified impacts on `wealth`, `honor`, or `stigma`.
    - `choices`: Branching outcomes based on the historical context.

## 🛠️ Tips for Human Designers
1.  **Stakes Variance**: When designing seeds, try to balance `Honor` and `Stigma` inversely. High-honor choices should often come at a cost to the `Wealth` or `Spirit` resource.
2.  **Historical Branches**: If a scholarly source says "he might have done X, but chose Y," use that ambiguity to create a "Choice Path" in the seed.

## 🤖 Tips for LLMs
1.  **Axiomatic Logic**: When seeding, prioritize systemic impact over narrative flavor. The "Flavor" (Layer 4) will be added during scene creation. The Seed's primary job is to establish the mechanical impact of the historical episode.
2.  **Schema Compliance**: Only use valid Literal Types (e.g., `naval`, `diplomatic`, `alchemy`). The **Scenario Linter** will reject any "fantasy" types.

---
**Generality Note**: The Seed Generator is the primary bridge between any historical source and the Almagest Engine's mathematical model.
