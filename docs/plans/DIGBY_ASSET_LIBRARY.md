# 🏛️ Almagest Asset Library (50 Units)

**Purpose**: A structural portfolio of reusable mechanics and modules extracted from the Kenelm Digby memoirs, generalized for the Renaissance RPG Construction Kit.

---

## 🏛️ CATEGORY A: SOCIAL / REPUTATION SYSTEMS (10)

### 1. Rumor Cascade Engine
*   **Category**: System / Simulation Module
*   **Source Motif**: Widespread rumors of Venetia Stanley's compromised virtue in the London court.
*   **Primitive Mapping**: `ReputationAxis`, `Actor`, `Encounter`
*   **Input**: Delta to `Honor/Stigma` for one `Actor`.
*   **Output**: Recursive Deltas to all linked `Actors` in the same `Location`.
*   **Gameplay Function**: Propagates reputation shifts through a social network.
*   **Lineage**: Ultima
*   **Generality Check**: Works for any localized social group (Court, Office, Village).
*   **Instance**: If Digby loses Honor, Venetia's Stigma increases by 20% of the delta.

### 2. Patronage Debt Ledger
*   **Category**: Resource / System
*   **Source Motif**: Venetia pawning jewels to fund Digby's self-imposed exile.
*   **Primitive Mapping**: `Resource`, `ReputationAxis`
*   **Input**: `ResourceDelta` (Positive).
*   **Output**: `PatronageDebt` (Reputation Axis).
*   **Gameplay Function**: Grants immediate power at the cost of future systemic obligation.
*   **Lineage**: Ultima / FTL
*   **Generality**: Applies to loans, political favors, or divine pacts.

### 3. Honor vs. Scandal Resolver
*   **Category**: Logic / Validator
*   **Source Motif**: Conflicting historical accounts of Venetia's conduct.
*   **Primitive Mapping**: `ReputationAxis`
*   **Input**: Conflicting `EvidenceNodes`.
*   **Output**: Weighted Reputation score.
*   **Gameplay Function**: Determines the "Public Truth" when multiple reports conflict.
*   **Lineage**: Ultima

... [Items 4-10 summarized for brevity in this initial write, will expand in full file] ...

### 4. Court Visibility Amplifier (Actor visibility states)
### 5. Reputation Recovery Loop (Time-based decay of negative stats)
### 6. Intercession Mechanic (Third-party reputation transfer)
### 7. Rival Suitor Pressure Model (Asymmetric competition for Relationship resource)
### 8. Social Isolation State (Reduced encounter frequency/options)
### 9. Defamation Event Generator (Random influx of Stigma)
### 10. Loyalty Stress Test (Moral choice triggers during resource scarcity)

---

## ⚔️ CATEGORY B: NARRATIVE / SCENE SYSTEMS (10)

### 11. Abduction-by-Deception Scenario
*   **Category**: Encounter Template
*   **Source Motif**: Venetia tricked into a carriage and taken to a manor house.
*   **Primitive Mapping**: `Scene`, `Encounter`
*   **Input**: `Actor` (Target), `Location` (Trap).
*   **Output**: Forced `Scene` transition with locked exit conditions.
*   **Lineage**: FF

### 12. Escape Chain Generator
### 13. Chance Rescue Event
### 14. Intercepted Letter Event
*   **Category**: System / Event
*   **Source Motif**: Digby's letters to Venetia being stolen by the Postmaster.
*   **Primitive Mapping**: `Resource` (Information), `Event`
*   **Input**: Sent `Message`.
*   **Output**: 15% chance of `null` delivery + `stigma` increase for sender.
*   **Lineage**: Ultima / FF

... [Summarized 15-20] ...
### 15. False Death Propagation (World state change based on misinformation)
### 16. Secret Meeting Scene Builder (Private dialogue triggers)
### 17. Sudden Illness Interruption (Actor agency pause)
### 18. Royal Court Encounter Template (High-stakes dialogue staging)
### 19. Duel Trigger Event (Social tension -> Combat primitive)
### 20. Emotional Confession Scene (Relationship resolution check)

---

## ⚓ CATEGORY C: TACTICAL / FTL-LIKE SYSTEMS (10)

### 21. Asymmetric Ambush Generator
*   **Category**: Combat Generator
*   **Source Motif**: Digby attacked by 15 men in Madrid, killing two.
*   **Primitive Mapping**: `Encounter`, `CombatVessel` (or Unit)
*   **Input**: Player State.
*   **Output**: Combat encounter with 4:1 odds favoring Adversary.
*   **Lineage**: FTL / FF

... [Summarized 22-30] ...
### 22. Multi-Attacker Combat Resolver
### 23. Pursuit / Escape Resolver (Distance/Risk tracking)
### 24. Injury Cascade System (Status effects from low health)
### 25. Resource Crisis Trigger (Forced tradeoffs)
### 26. Travel Risk Engine (Hazard generation)
### 27. Escort Protection Mechanic (Ally bonus in proximity)
### 28. Tactical Retreat Decision (Risk/Reward flee evaluation)
### 29. Environmental Hazard Event (Wolf attack / Storm)
### 30. Asymmetric Power Combat (High-skill vs. Numbers)

---

## 📚 CATEGORY D: EPISTEMIC / PHILOLOGY SYSTEMS (10)

### 31. Conflicting Source Resolver
### 32. Narrative Reliability Scorer
### 33. Rumor vs. Evidence Comparator
### 34. Biographical Gap Filler
### 35. Identity Masking System (Alias mapping)
### 36. Chronology Validator (Timeline consistency check)
### 37. Testimony Bias Model (Source weight adjustment)
### 38. Event Plausibility Filter (Flags improbable actions)
### 39. Multi-Perspective Synthesizer (Merging narratives)
### 40. Evidence Trace Linker (Mechanic-to-Source mapping)

---

## 🧪 CATEGORY E: ALCHEMICAL / MYSTICAL SYSTEMS (10)

### 41. Spirit Conjuration Event
*   **Category**: Encounter / Scene
*   **Source Motif**: The magician summoning a vision of Venetia's spirit.
*   **Primitive Mapping**: `Scene`, `Actor` (Spirit variant)
*   **Input**: `Philology` skill check.
*   **Output**: `DialogueUnit` with hidden truth state.
*   **Lineage**: FF / Ultima

... [Summarized 42-50] ...
### 42. Prophecy Fulfillment Tracker (Long-term event triggers)
### 43. Astral Influence Model (Outcome probability shifts)
### 44. Illusion vs. Reality Engine (Uncertain truth states)
### 45. Symbolic Interpretation Tool (Symbol -> Mechanics)
### 46. Alchemical Transformation State (Internal actor change)
### 47. Ritual Cost Mechanic (Resource tradeoff for insight)
### 48. Fate vs. Agency Resolver (Control override system)
### 49. Vision-Induced Decision Event (Forced choice by vision)
### 50. Epistemic Shock Event (Rapid belief update)
