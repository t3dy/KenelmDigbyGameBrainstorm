# 🧩 Deep Dive: Entity Resolution (Tool #10)

**Status**: **Validated** | **Layer**: 3 (Asset Registry)

## 🏗️ How it Works
The **Entity Extractor (`extract_entities.cjs`)** is the primary tool for maintaining **Ontological Consistency**. It is the bridge between disparate historical names (e.g., "The Admiral," "Sir Kenelm," "Digby") and their canonical RPG ID (`kenelm`).

*   **Registry Comparison**: It takes a raw string and cross-references it with the **ENTITY_REGISTRY.json**.
*   **Resolution Node**: It produces a list of "Found" vs. "Unknown" entities.
*   **ID Mapping**: It ensures that a scene's actor array uses `kenelm` or `venetia` instead of "him" or "her."

## 🛠️ Tips for Human Designers
1.  **Registry Expansion**: As you encounter new historical figures (e.g., "The Dey of Algiers"), add them to the registry immediately. This prevents the "ID Drift" which occurs when multiple designers use different IDs for the same person.
2.  **Location Aliases**: Use the registry for place names too. "Scanderoon" and "İskenderun" must both resolve to `scanderoon`.

## 🤖 Tips for LLMs
1.  **Greedy Match**: Always scan for the longest possible entity name first (e.g., "Sir Kenelm Digby" before "Kenelm"). This prevents sub-string collisions.
2.  **Role Infilling**: If an entity is mentioned but not found, suggest its plausible `role` (advisor, rival, crew) based on the surrounding historical context.

---
**Generality Note**: This tool is the foundation of any Almagest "Search & Discovery" pipeline, from PDFs to Exegesis portals.
