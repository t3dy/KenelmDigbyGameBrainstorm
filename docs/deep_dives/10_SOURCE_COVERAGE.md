# ⚖️ Deep Dive: Source Coverage (Tool #26)

**Status**: **Validated** | **Layer**: 6 (Audit/Governance)

## 🏗️ How it Works
The **Source Coverage Auditor (`audit_source_coverage.cjs`)** is the primary audit mechanism of any **Serious** Almagest project. It measures the "Scholarly Maturity" of your game.

*   **Provenance Discovery**: Matches manifest nodes (Encounters, Locations, Scenes) to Source Note IDs (e.g., `SPIRIT_VISION_1622`).
*   **Coverage Scoring**: Calculates the percentage of your "Research Pipeline" that has been transformed into "Playable Machinery."
*   **Unprovenanced Alerts**: Flags manifest nodes (Lore-beasts) that lack a documented historical link.

## 🛠️ Tips for Human Designers
1.  **Iterative Research**: Don't build the whole game at once. Research 5 things, Secrete 5 Sources, and check your coverage. It should always be 100% for the "Research Pillar."
2.  **Tethering Check**: Use the `provenance` field for everything. Even a "Standard Ship" should have a provenance note (e.g., `DIGBY_EAGLE_DESIGN_1628`).

## 🤖 Tips for LLMs
1.  **Governance Patching**: When generating a new encounter, check for a matching Source Note first. If it exists, use that ID in the `provenance` field.
2.  **Scholarly Maturity**: If a project's coverage score is low (e.g., < 50%), suggest a "Research Sprint." Identify which Source Notes have not yet been "Seeded" into the manifest.

---
**Generality Note**: This tool is the foundation of any Almagest "History Gate," from a 17th-century voyage across the Mediterranean to a 20th-century exegesis database.
