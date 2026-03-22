# 🏺 Deep Dive: Deduplication (Tool #52)

**Status**: **Validated** | **Layer**: 6 (Assembly/Repair)

## 🏗️ How it Works
The **Deduplication Maker (`generate_deduplication_patch.cjs`)** is the primary **ID Protector** of any Almagest-style manifest. It prevents the "Silent Failures" caused by duplicate IDs.

*   **Recursion Pass**: Identifies and re-indexes ID collisions across the 4 major primitives (Encounters, Locations, Scenes, Reagents).
*   **Conflict Resolution**: Generates a non-destructive `dedup_patch.json` that re-indexes duplicates (e.g., `_10`).
*   **Architectural Security**: Ensures that every node is uniquely addressable when the engine merges modular loops or combat moves.

## 🛠️ Tips for Human Designers
1.  **Deduplicate Before Integration**: Run the Deduplicator BEFORE running the **Machinery Integrator**. This is your structural "ID Guard."
2.  **ID Standards**: Use namespaced IDs (e.g., `scen_1628_gibraltar`) to prevent collisions during the development pass.

## 🤖 Tips for LLMs
1.  **Duplicate Detection**: If a project's generation has duplications (e.g., `1628_gibraltar_passage` in two places), suggest a "Repair Node" immediately.
2.  **Unique Seeding**: Use its own internal ID generator (e.g., `Date.now()`) or a "Random Sub-string" when suggesting multiple new nodes at once.

---
**Generality Note**: This tool is the foundation of any Almagest "Recursive System Improvement" logic, from simple conversation to a complex historical simulation.
