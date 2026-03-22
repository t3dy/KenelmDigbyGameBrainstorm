# 🧬 Almagest Primitive Registry

**Purpose**: The canonical vocabulary for the **Construction Kit**. Every feature must map to these entities.

---

## 🏛️ 1. CORE ENTITIES

### A. Narrative & Scene (FF-Lineage)
| Primitive | Purpose | Fields |
| :--- | :--- | :--- |
| **Scene** | Dramatic Unit. | `id`, `background`, `actors[]`, `sequence[]`. |
| **Actor** | Visual Prop/Entity. | `id`, `spriteId`, `name`, `startX`, `startY`. |
| **DialogueUnit** | Branching Text. | `id`, `text`, `choices[]`, `consequenceId`. |

### B. Systemic & World (Ultima-Lineage)
| Primitive | Purpose | Fields |
| :--- | :--- | :--- |
| **Location** | Exploration Node. | `id`, `name`, `x`, `y`, `jurisdiction`, `config`. |
| **Resource** | Quantitative Unit. | `id`, `value`, `min`, `max`, `decayRate`. |
| **ReputationAxis**| Social Stat. | `id`, `value`, `range`, `gates[]`. |
| **Reagent / Item**| Craftable State. | `id`, `name`, `properties{}`, `iconId`. |

### C. Crisis & Tactics (FTL-Lineage)
| Primitive | Purpose | Fields |
| :--- | :--- | :--- |
| **Encounter** | Discrete Gameplay. | `id`, `type`, `description`, `stakes[]`, `logic`. |
| **CombatVessel** | Naval Component. | `id`, `hull`, `name`, `components[]`. |
| **ShipComponent** | Subsystem. | `id`, `name`, `health`, `efficiency`. |

---

## 🛑 2. OUT-OF-SCOPE (FORBIDDEN)
- **Physics-simulated objects**: All interactions must be grid/logic-based.
- **Dynamic Terrain**: Locations are static nodes; changes happen inside them.
- **Real-time Navigation**: Movement is turn-based or "Leap" based.

---

## ✅ 3. VALIDATION RULES
1.  Any modification to these fields must be reflected in `src/data/schema.ts`.
2.  Any new primitive must be introduced via a **Decision Log** entry.
3.  Any scenario pack must use *only* these primitives.
