# 🤖 LLM Design Workflow (The Automated Maker)

**Purpose**: To guide Antigravity and other LLM agents in safely authoring **Almagest Scenario Pack** content from scholarly notes without manual code edits.

---

## 🏛️ 1. THE COMMANDER PROTOCOL
Every LLM-authored scenario must be **Evidence-Driven** and **Primitive-Constrained**:

1.  **READ SOURCE**: Review the scholarly input (Source Note).
2.  **IDENTIFY PRIMITIVES**: Choose the appropriate **ACK Primitives** (from `PRIMITIVE_REGISTRY.md`).
3.  **VALIDATE SCHEMA**: Check the current structure in `src/data/schema.ts` or `/schemas/`.
4.  **DRAFT SEED**: Create a `MECHANIC_SEED.md` to map Note -> RPG.
5.  **EXECUTE MANIFEST**: Update the active **Scenario Pack** (JSON) using the `saveEncounters` / `saveLocationConfig` / `saveAsset` state actions.
6.  **PREVIEW**: Instruct the human designer to run the **ACK Harness** (Construction Kit) to verify the result.

---

## ⚖️ 2. RULES FOR LLM-DESIGNED CONTENT
- **NO BESPOKE CODE**: The LLM must NOT modify `.tsx` or `.ts` files to add content.
- **NO HALLUCINATIONS**: All dialogue and choices must be grounded in the source text.
- **TRACEABILITY**: Ensure the `id` of each encounter relates to the scholarly topic (e.g., `enc_scanderoon_venice`).
- **SCALING**: Use existing templates in `/templates/` to avoid schema drift.

## 🛑 3. ESCALATION PATH (THE RED LINE)
If the scholarly source *requires* a mechanic that is not in the primitives (e.g., "Digby uses a telescope"), the LLM MUST **stop** and propose a new primitive to the Architect via a `plans/PLAN_TEMPLATE.md`.

---

**Directive**: AUTO-MAKER. STATED-BASED. LOGIC-GATED.
**Strategic Reference**: [SOURCE_TO_SCENARIO_PIPELINE.md](file:///docs/workflows/SOURCE_TO_SCENARIO_PIPELINE.md)
