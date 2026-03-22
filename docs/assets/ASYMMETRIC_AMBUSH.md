# 🏛️ Almagest Sample Asset: ASYMMETRIC_AMBUSH (Tactical)

**Asset Name**: Asymmetric Ambush
**Category**: Data Primitive / Encounter Template
**Lineage**: FTL / Tactical

---

## 🏛️ 1. ARCHITECTURAL GATE
- **Primitive Mapping**: `Encounter`, `CombatVessel`
- **Source Motif**: Digby's 1621 ambush by 15 men in Madrid.
- **Generality Check**: Used for any uneven combat (1920s gang hit, 2077 cyber-raid).

---

## ⚙️ 2. SYSTEMIC CONTRACT
- **Input**: Player `health`, `weapon_id`.
- **Output**: `Encounter` node with 4:1 odds favoring Adversary.
- **Gameplay Function**: Forces a high-risk combat encounter with a focus on defense.

---

## 🧬 3. DATA SCHEMA
```json
{
  "assetId": "tactical_asymmetric_ambush",
  "primitive": "Encounter",
  "difficulty_multiplier": 4.5,
  "config": {
    "adversary_count_formula": "ceil(player_units * 4.5)",
    "stakes": {
      "danger": "critical",
      "wealth": "minimal_recovery"
    }
  }
}
```

---

**Status: Specified / Implemented.** 
**Validation: Passed schema check for `Encounter`.**
