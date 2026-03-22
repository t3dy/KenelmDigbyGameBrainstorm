# 🎭 Deep Dive: Scene Staging (Backgrounds & Actors)

**Status**: **Validated** | **Layer**: 4 (Environment Staging)

## 🏗️ How it Works
**Scene Staging** in the Almagest Construction Kit is the primary way we map **Narrative Flavor** to **Systemic Assets**. It is the registry of standardized background (Layer 4) and actor (Layer 3) primitives.

*   **Standardized Backgrounds**: Maps a scene (e.g., "Duel in Madrid") to a validated background ID (e.g., `scanderoon_clash`).
*   **Actor Primitives**: Every actor is a specific `AlmagestSprite` (e.g., `digby`, `official`, `sailor`).
*   **Coordinate Staging**: Every actor must have a `startX` and `startY` within the 2D pixel area (1-20 grid).

## 🛠️ Tips for Human Designers
1.  **Background Economy**: Reuse backgrounds where appropriate. A "Prison" in London and a "Dungeon" in Algiers can both use the `london_studio` (Studio/Dungeon-style) background until a specific asset is built.
2.  **Actor Spacing**: Use the 20x20 grid to create "Visual Drama." Put rivals far apart (e.g., 3 and 17) and allies close together (e.g., 8 and 10).

## 🤖 Tips for LLMs
1.  **Strict Backgrounding**: Only use valid `AlmagestBackground` literals. If you suggest a scene, map it to a `Background` that is "Thematically Consistent" with the location.
2.  **Coordinate Precision**: When staging an actor, ensure they don't overlap (same X and Y). Suggest "Plausible Staging" (e.g., a King at `10, 5` and a petitioner at `10, 15`).

---
**Generality Note**: This tool automates the "Directorial Staging" of any Almagest-style world, essential for building theatrical and cinematic simulations.
