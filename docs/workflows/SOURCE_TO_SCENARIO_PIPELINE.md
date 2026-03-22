# 📚 Source-to-Scenario Pipeline

**Purpose**: To provide a standardized methodology for converting scholarly source material (PDFs, Manuscripts) into playable **Almagest Scenarios** without hallucinating logic or mechanics.

---

## 🏛️ 1. THE CANONICAL FLOW

| Stage | Input | Action | Output |
| :--- | :--- | :--- | :--- |
| **0. SOURCE** | Scholarly PDF/Note. | Read & Extract. | **SOURCE_NOTE.md** |
| **1. CLAIM** | Source Note. | Identify Historical Claim. | **HISTORICAL_CLAIM.md** |
| **2. SEED** | Historical Claim. | Map to RPG Primitives. | **MECHANIC_SEED.md** |
| **3. PACK** | Mechanic Seed. | Author JSON Manifest. | **SCENARIO_PACK.json** |
| **4. VERIFY** | Scenario Pack. | Run in ACK Harness. | **VALIDATED_SLICE** |

---

## ⚖️ 2. RULES FOR LLM DESIGNERS

1.  **NEVER HALLUCINATE**: If the source says "Digby felt ill," do not add a "Plague System." Use the existing `Spirit` or `Resource` primitive.
2.  **PRESERVE EVIDENCE**: Every prompt generating a scenario pack must include the `source_excerpt` as a JSON field in the manifest for traceability.
3.  **MARK SPECULATION**: If a mechanism is not explicitly in the source (e.g., "Venetian combat stats"), mark the draft as `[SPECULATIVE]`.

## 🛑 3. ANTI-CREEP CHECKPOINT
- Does this source note *require* a new primitive?
- **IF YES**: Stop and propose the primitive in `plans/PLAN_TEMPLATE.md`.
- **IF NO**: Map it to an existing `Encounter`, `Conversation`, or `Resource` change.

---

**Status**: SYSTEMIC BRIDGE ACTIVE. SOURCE-TRACED.
**Reference**: [PRIMITIVE_REGISTRY.md](file:///docs/architecture/PRIMITIVE_REGISTRY.md)
