# 🏛️ Almagest Validation Checklist (Verification)

**Purpose**: Every implementation must pass this checklist before Antigravity can claim a specific **Status** to the Architect.

---

## 📊 1. STATUS TAXONOMY
- **Planned**: Concept defined.
- **Specified**: Documents, schemas, and plans locked.
- **Implemented**: Code and scripts exist.
- **Validated**: Demonstrated via end-to-end workflow execution.
- **Generalized**: Proven Multiple Use-Cases.

## ✅ 2. CLAIM INTEGRITY CHECKLIST
- [ ] Status taxonomy matches actual implementation level.
- [ ] No Spec/Plan is described as an "Implemented Tool."
- [ ] No Implementation is described as "Validated" without a captured workflow log.
- [ ] No Digby-only scenario is described as "Generalized Proof."
- [ ] No human/LLM usability claim without a documented authoring pass.
- [ ] All known gaps are explicitly listed in the Evidence Block.

## ✅ 3. TECHNICAL CHECKLIST
- [ ] **Type Check**: No `any` types in `schema.ts`.
- [ ] **Store Sync**: Data changes in the Editor are correctly reflected in the store.
- [ ] **Persistence**: Edits can be "Saved" to the global manifest.

## ✅ 4. ASSET LAYER CHECKLIST
- [ ] Asset has clearly defined **Inputs / Outputs**.
- [ ] Asset maps to a specific **Pipeline Stage** (e.g. Inference, Assembly).
- [ ] Asset has **Generality Proof** (works in multiple lineages/eras).
- [ ] Asset is NOT duplicative of existing machinery.

---

**Policy**: If ONE item is unchecked, the claim is **INDIRECT/INVALID**.
