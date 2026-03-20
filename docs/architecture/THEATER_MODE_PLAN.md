# ALMAGEST: THEATER MODE & CINEMATIC PIPELINE

This plan outlines the infrastructure needed to produce **automated, high-fidelity gameplay videos** that showcase the 20 key scenes of Sir Kenelm Digby’s life with a premium aesthetic.

---

## 🎬 1. THE CINEMATIC DIRECTOR (State Change)
We will implement a **Director State** in the `GameStore` to automate the transition between the 20 scenes.
*   **Action**: A `playlist` array of Scene IDs.
*   **Logic**: When a `SceneRunner` completes, if the `directorMode` is active, the system automatically triggers the next Scene ID in the queue instead of returning to the NavMap.
*   **Benefit**: Allows for a continuous "Narrative Reel" without human or agent interaction during recording.

## 🖼️ 2. VISUAL ASSET MAPPING
To "WOW" the viewer, we will map the high-fidelity mockups already generated to the static scene background.
*   **New Artifact**: `docs/design/scene_backgrounds.json`.
*   **Content**: Mapping `1628_scanderoon_clash` -> `scanderoon_clash_mockup.png`.
*   **Effect**: The `SceneRunner` will render these rich, cinematic backgrounds instead of flat colors or placeholders.

## 🎭 3. HUD-LESS CAPTURE MODE
We need a "Clean Screen" for high-quality video production.
*   **Toggle**: A `hudVisible` flag in the global state.
*   **Effect**: Conditionally hides the Header (stats), Footer (navigation), and Cursor during `staging` view playback.
*   **Hot-Key**: `Alt + H` to toggle for manual recording.

## 📜 4. NARRATIVE ENRICHMENT (PHASE 4)
For the 15 scenes that currently have empty timelines, we will:
1.  **Librarian Task**: Extract 3 lines of historically accurate dialogue for each remaining scene from "Stain in the Blood".
2.  **Philologist Task**: Ensure the dialogue reflects the "Calculated Stigma" and "Honor" of that specific epoch.

---

## 📅 EXECUTION TIMELINE

### **Step 1: The Director (Today)**
- Implement the `directorMode` logic in `gameStore.ts`.
- Link the "Play All" button in the `SceneGallery`.

### **Step 2: Visual Integration**
- Move high-fidelity mockups to the `/public/assets/scenes/` folder.
- Update `SceneRunner` to prioritize these assets.

### **Step 3: Auto-Capturing**
- Use the subagent to record a single, 5-minute continuous "Legacy Reel" without interruptions or manual clicks.

---
**Status**: DRAFT PLAN
**Objective**: "Video-Ready" Narrative Infrastructure.
