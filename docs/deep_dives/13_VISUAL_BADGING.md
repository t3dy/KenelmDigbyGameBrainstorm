# 🎨 Deep Dive: Visual Badging (Governance UI)

**Status**: **Validated** | **Layer**: 7 (Presentation)

## 🏗️ How it Works
**Visual Badging** in the Almagest Construction Kit is the primary way we surface **Scholarly Integrity**. It is the visual layer of the `provenance` and `assetId` fields.

*   **Scholarly Tethered (Blue)**: Shows that an Encounter or Scene is anchored to a Source Note (Research).
*   **Validated Asset (Emerald)**: Shows that an encounter's `assetId` is not just "Lore," but a generic, systemically proven asset.
*   **Unprovenanced (Gray)**: Flags potential "Lore-beasts" (content with no scholarly or systemic anchor).

## 🛠️ Tips for Human Designers
1.  **Correct the Badge**: If an encounter shows as "Unprovenanced," it's your job to research it and add a `provenance` note. This is the visual feedback loop for "Serious" status.
2.  **Asset Badge Highlighting**: If a scene's badge says "Specified_Lore_Only," think: "Can I abstract this into a generic Almagest Asset?" (e.g., an Ambush).

## 🤖 Tips for LLMs
1.  **Dashboarding**: Check a manifest's "Coverage Percentage" (calculated by **Tool #26**). If it is low, suggest a "Badging Pass." Identify the specific nodes that are "Gray."
2.  **Asset Mapping Hints**: If a node is "Gray," suggest a corresponding `assetId` (e.g., `social_diplomatic_crisis`) to turn it "Green."

---
**Generality Note**: This is the visual "Quality Gate" for any Almagest-style simulator, necessary for both human review and automated audit.
