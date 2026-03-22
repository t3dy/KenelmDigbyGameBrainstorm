# 🏺 Deep Dive: Asset Registry (Layer 3)

**Status**: **Validated** | **Layer**: 3 (Asset Registry)

## 🏗️ How it Works
The **Asset Registry** in any Almagest-style world is the primary way we **Abstract Lore**. It is the registry of standardized systemic units (e.g., `alchemical_maturation`, `diplomatic_fiasco`, `naval_skirmish`).

*   **Lore Abstraction**: Every specific historical incident (e.g., "Duel in Madrid") is mapped to a generic `assetId` (e.g., `ambush_generator`).
*   **Asset Specification**: The registry defines the `icon`, `color`, and `pixel-art` data for the engine.
*   **Systemic Reusability**: An Asset can be used in any future generated game, whether it's 17th-century or 20th-century history.

## 🛠️ Tips for Human Designers
1.  **Stop Writing One-Offs**: If you're building a "New Encounter," don't just "Describe it." Ask: "Is there an existing Asset (e.g., `research_breakthrough`) that this maps to?"
2.  **Asset Expansion**: If you need a new asset, build its generic "Skeleton" first (icon, type, stakes-potential).

## 🤖 Tips for LLMs
1.  **Systemic Infilling**: If a manifest's encounter uses the `assetId`, read that asset's "Archetypes" first. If the asset says `type: hostile`, don't write it as a friendly conversation.
2.  **Registry Scaling**: If you find multiple encounters with similar mechanics (e.g., "Finding a lost map"), suggest a single, generic `assetId` (`discovery_artifact`).

---
**Generality Note**: The Asset Registry is the "DNA" of the building-block generator for any Almagest-style world.
