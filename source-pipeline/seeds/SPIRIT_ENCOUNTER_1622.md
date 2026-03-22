# 📋 Mechanic Seed: Spirit Encounter (1622)

**Milestone**: Transition from Source Note -> Mechanic Seed
**Owner**: Antigravity (Assistant)
**Status**: Specified

---

## 🏛️ 1. ARCHITECTURAL GATE
- **Classification**: **primitive**
- **Target Lineage**: FF / Ultima 
- **Primitive Affected**: `Encounter`, `Actor`
- **Asset Selected**: **`social_rumor_cascade`** (to reverse the stigma).
- **Generality Check**: This "Ghostly Confirmation" pattern works for any mystery (Hamlet, Dickensen Ghost).

## 🧬 2. SCHEMATIC Contract
```json
{
  "id": "spirit_vision_florence",
  "type": "alchemy",
  "title": "The Conjured Likeness",
  "description": "A spirit, in the exact form of Venetia, speaks to you. Her words carry the weight of the supernatural.",
  "stakes": {
    "stigma": -40,
    "knowledge": 25
  },
  "choices": [
    { "text": "Believe the phantom.", "consequence": "You regain 40 Honor by dismissing the rumors." },
    { "text": "Reject the trickery.", "consequence": "You remain in a state of high Stigma/Doubt." }
  ]
}
```

## 🏗️ 3. VERTICAL SLICE (IMPLEMENTATION)
1.  **DATA**: Insert this JSON into `scenario-packs/digby-1628/manifest.json`.
2.  **EDITOR**: Verify it appears in the **Encounter Editor**.
3.  **LINT**: Run `lint_scenario.cjs`.

## ✅ 5. COMPLETION EVIDENCE
- [ ] Manifest updated with `spirit_vision_florence`.
- [ ] Linter reports **PASS**.
