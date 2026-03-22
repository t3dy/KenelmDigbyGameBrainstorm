# 🧱 Deep Dive: Schema Hardening (SERIOUS.md)

**Status**: **Validated** | **Layer**: 6 (Governance)

## 🏗️ How it Works
**Schema Hardening** is the core process of moving a project from "General" to "Serious." It involves replacing loose strings (e.g., `background: string`) with strict **Literal Types** and **Enums**.

*   **Fixed Primitives**: Standardizes the "Visual Staging" area (e.g., `eagle_deck`, `milos_refuge`).
*   **Jurisdictional Rigor**: Defines a strict literal set for `AlmagestJurisdiction` (`ottoman`, `venetian`, etc.).
*   **Actor Classes**: Hardens `AlmagestSprite` to standardized classes, preventing the use of one-off, lore-specific sprites.

## 🛠️ Tips for Human Designers
1.  **Literal Mastery**: Use the schema as your "Asset Library" before writing a scene. Check `AlmagestBackground` in `src/data/schema.ts` to see what is already "Hardened" and available to the rendering engine.
2.  **Schema Extension**: If you have a unique background (e.g., "Paris Conversion"), don't just "Write it." Propose an extension to the `AlmagestBackground` literal first.

## 🤖 Tips for LLMs
1.  **Strict Compliance**: When suggesting a manifest update, ONLY use valid Literal Types. If you suggest a "Market" in Venice, its `jurisdiction` MUST be `venetian`.
2.  **Structural Integrity**: If a manifest's data-entry is "Lore-heavy" (using non-standardized strings), suggest a "Hardening Pass" immediately.

---
**Generality Note**: This is the "First Pillar of Serious Architecture" for any Almagest-style world, from 17th-century naval campaigns to 20th-century exegesis databases.
