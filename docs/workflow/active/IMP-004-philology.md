# IMP-004: Philological Impact Loop

## 🎯 Intent
To bridge the gap between **Philology (Research)** and **Mechanics (Gameplay)**. This ensures that the player's reconstruction of manuscripts isn't just a mini-game, but a strategic decision that changes the world-state properties via the **KDSC Compilation Loop**.

## 🏗️ Structural Changes

### **1. Ontology Layer**
- Update `docs/ontology/reagents.json` to define multiple `variants` for each reagent, with specific `mechanical_modifiers`.

### **2. Design Layer (NEW Artifact)**
- Create `docs/design/variant_resolutions.json`.
- Holds the "Current Truth" for each reagent/manuscript (e.g. `{"vitriol": "oxford_variant"}`).

### **3. Compilation Layer**
- Update `scripts/compile_manifest.cjs` to:
    1. Read `docs/design/variant_resolutions.json`.
    2. Resolve the reagent's `name`, `description`, and `potency/instability` based on the selected variant.
    3. Error-out if a resolution is missing for an unlocked reagent.

### **4. Runtime Layer**
- **ManuscriptView.tsx**: Add a "Resolve Truth" modal after reconstruction (1.0 condition), allowing the player to pick between competing variants.
- **gameStore.ts**: Add `resolveVariant(entityId, variantId)` action. This will (virtually) write to the Design Layer.

---

## 🛡️ Tethers
- **Philologist Approval**: Variants must have historical textual grounding.
- **Retroist Approval**: Modifiers must impact the "Weapon Salve" healing efficiency.

## ✅ Success Criteria
1. Reconstructing the Vitriol manuscript allows selecting between "Oxford" and "Paris" variants.
2. Compiling the manifest with "Paris" selected results in a higher `instability` score for Vitriol in `manifest.json`.
3. The UI text for Vitriol updates to reflect the selected manuscript's description.

---
**Status**: DRAFT FOR FOREMAN APPROVAL
**Current Priority**: Structural Tethering.
