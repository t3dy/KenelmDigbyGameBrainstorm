# ⚖️ Deep Dive: Reputation Metrics (Layer 5)

**Status**: **Validated** | **Layer**: 5 (Systemic Machinery)

## 🏗️ How it Works
**Reputation Metrics** in the Almagest Construction Kit are the primary way we track the "Serious" social layer. They are the **Non-Currency Primitives**.

*   **Honor (+)**: Reflects legal, noble, or scholarly prestige. High Honor unlocks Royal Court encounters and high-stakes diplomacy.
*   **Stigma (-)**: Reflects scandal, illegality, or occult failure. High Stigma triggers pursuit scenes, prison encounters, and "Lore-beast" social crises.
*   **Calculated Stakes**: Every encounter (Layer 1 Seed) must define its impact on these axes.

## 🛠️ Tips for Human Designers
1.  **Inverse Pacing**: High-Honor choices should often require a loss of personal `Wealth` or `Wealth` (e.g., Algiers Ransom). High-Stigma choices should offer a shortcut to success (e.g., Alchemical Deception).
2.  **Reputation Gates**: Use a location's `reputation_axes` (defined in `AlmagestManifest`) to trigger specific, location-sensitive crises.

## 🤖 Tips for LLMs
1.  **Moral Ambiguity**: When seeding choices, offer one `Honor` path (difficult, but socially rewarding) and one `Stigma` path (easy, but socially dangerous).
2.  **Stakes Scaling**: A "Major Discovery" (e.g., the Spirit Vision) should have high `Honor` and high `Stigma` simultaneously. This creates a "Great Work" tension.

---
**Generality Note**: These metrics model the "Social Credit" system of any Almagest-style world, from 17th-century privateers to 20th-century exegesis portals.
