# 🏛️ Almagest Feature Gate (Sentry)

**Purpose**: To prevent "Digby-Specific" lore-inflation or visionary feature-creep from degrading the **Construction Kit's** generality.

## ⚖️ 1. THE RUBRIC
Every proposed feature MUST declare:

| Question | Answer |
| :--- | :--- |
| **Classification** | engine / primitive / tool / scenario-content / reject |
| **Target Lineage** | Ultima-like / FF-like / FTL-like |
| **Primitive Touched** | (e.g., Scene, Actor, Resource, Encounter) |
| **Player-Facing Loop** | Improved Interaction? Improved Logic? |
| **Generality Proof** | Does this work in a 1970s office OR a 1628 ship? |
| **Vertical Slice** | Smallest testable unit? (e.g., UI Tab + Save logic) |
| **Deferred Items** | What is explicitly NOT being built now? |

## 🛑 2. AUTO-REJECT CRITERIA
The "Bouncer" will automatically reject any proposal that includes:
- **Speculative Tabs**: Adding UI "slots" for future features.
- **Lore-Bloat**: New character/location bios without an authoring-tool requirement.
- **Bespoke Logic**: Mechanics that *must* have an "If (Digby) { ... }" condition in the engine.
- **Over-Claiming**: 
    - Claims of **Generality** without a second, non-Digby dataset.
    - Claims of **Usability** without a demonstrated, end-to-end authoring workflow.
    - Claims of **Completion** without validation artifacts (logs, screenshots).
- **Lore-Heavy Assets**: 
    - Asset is Digby-specific (e.g. "The King's Pardon" instead of "Political Amnesty").
    - Asset does not map to a `schema.ts` primitive.
    - Asset is narrative-only with no system behavior or gameplay loop impact.
- **Decorative Polish**: Shaders or UX "juice" not tied to a primitive.

## ✅ 3. THE REVIEW CHECKLIST
- [ ] No speculative "empty" tabs.
- [ ] No new UI mode without an underlying data primitive.
- [ ] No lore context in the `src/` directory.
- [ ] No "If (Digby)" hardcoding in the runtime.
- [ ] Validates against `/schemas/`.
- [ ] Documented in `plans/DECISION_LOG.md`.

---

**Policy**: This Gate defines the boundary of the **Engine**. Content lives in `/scenario-packs/`.
