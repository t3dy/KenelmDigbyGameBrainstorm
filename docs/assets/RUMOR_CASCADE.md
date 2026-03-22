# 🏛️ Almagest Sample Asset: RUMOR_CASCADE (Social)

**Asset Name**: Rumor Cascade
**Category**: Simulation Module / System
**Lineage**: Ultima / Social

---

## 🏛️ 1. ARCHITECTURAL GATE
- **Primitive Mapping**: `ReputationAxis`, `Actor`
- **Source Motif**: The spread of rumors about Venetia Stanley's honor at court.
- **Generality Check**: Applies to any reputational decay scenario (Social Media scandal, High-school gossip).

---

## ⚙️ 2. SYSTEMIC CONTRACT
- **Input**: Initial `StigmaDelta` for `Actor A`.
- **Output**: Recursive `StigmaDelta` for linked `Actors B, C, D`.
- **Gameplay Function**: Models the viral spread of social stigma.

---

## 🧬 3. DATA SCHEMA
```json
{
  "assetId": "social_rumor_cascade",
  "primitive": "ReputationAxis",
  "propagation": {
    "decay_per_hop": 0.5,
    "max_hops": 3,
    "linked_actor_multiplier": 1.2
  }
}
```

---

**Status: Specified / Implemented.** 
**Validation: Passes `ReputationAxis` contract.**
