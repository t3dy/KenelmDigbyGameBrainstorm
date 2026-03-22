# 🏛️ Almagest Sample Asset: SOURCE_RESOLVER (Epistemic)

**Asset Name**: Conflicting Source Resolver
**Category**: Tool / Philology
**Lineage**: Shared / Epistemic

---

## 🏛️ 1. ARCHITECTURAL GATE
- **Primitive Mapping**: `SourceExcerpt`, `GameState`
- **Source Motif**: Discrepancies between Digby, Aubrey, and later historians.
- **Generality Check**: Used for any narrative-conflict analysis (Spy reports, Witness testimony).

---

## ⚙️ 2. SYSTEMIC CONTRACT
- **Input**: Two `SourceExcerpts` with conflicting claims.
- **Output**: Weighted `Plausibility_Score` (0.0 - 1.0).
- **Gameplay Function**: Determines the world-state "Truth" when evidence is contradictory.

---

## 🧬 3. DATA SCHEMA
```json
{
  "assetId": "epistemic_source_resolver",
  "primitive": "SourceExcerpt",
  "logic": {
    "prefer_direct_witness": true,
    "bias_adjustment_scale": 0.3,
    "source_reliability_threshold": 0.65
  }
}
```

---

**Status: Specified / Implemented.** 
**Validation: Passes `SourceExcerpt` structure.**
