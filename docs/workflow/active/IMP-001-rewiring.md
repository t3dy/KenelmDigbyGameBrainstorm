# IMP-001: Systemic Rewiring (Consolidated Manifest)

## 🎯 Intent
To transition the application from using fragmented data files (`scenes.json`, `locations.json`, `characters.json`) to a single, unified source of truth: `manifest.json`. This reduces state synchronization errors and simplifies the development pipeline.

## 🛠️ Files to Modify
- `src/state/gameStore.ts`: Update imports and initial state to consume `manifest.json`.
- `src/App.tsx`: Align any direct data references with the new manifest structure.
- `src/components/interface/NavMap.tsx`: Update to read locations from the store's manifest.
- `src/data/manifest.json`: (Initial verification of content).

## 🛡️ Dependencies & Tethers
- **Librarian Approval**: Verified that `manifest.json` contains the latest Scanderoon and Milos findings.
- **Architect Approval**: Alignment with the new "Agentic OS" hierarchy.

## ✅ Success Criteria
- The application launches without JSON import errors.
- The `NavMap` correctly displays all locations from `manifest.json`.
- The `StageEditor` and `SceneRunner` operate using the unified `scenes` array in the manifest.
- Zero linting errors related to missing data properties.

---
**Status**: APPROVED BY FOREMAN
**Action**: Worker agent to proceed with implementation.
