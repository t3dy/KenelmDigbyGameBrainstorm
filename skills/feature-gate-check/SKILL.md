---
name: feature-gate-check
description: Evaluate a proposed feature against the Construction Kit's anti-creep governance.
---

# 🛡️ Skill: Feature Gate Check

Use this skill when the USER asks to "Add a new feature" or "Modernize a system."

## 🏛️ 1. PROCEDURE
Every request must be filtered through `docs/governance/FEATURE_GATE.md`:

1.  **CATEGORIZE**: Is it Engine, Tool, or Scenario-Content?
2.  **LINEAGE**: Does it map to Ultima (Reputation), FF (Dramatic Scene), or FTL (Tactical Crisis)?
3.  **PRIMITIVE**: Can it use existing `Resource`, `Actor`, or `Encounter` primitives?
4.  **REJECT**: If it is a "Speculative Tab" or "bespoke logic," you must **Refuse** the request and explain why it violates the Construction Kit's generality.

## 🛑 2. AUTO-REFUSAL
Refuse the task if:
- It requires adding a hardcoded boolean into `gameStore.ts` that only works for one story.
- It asks for "World Inflation" (new ports) without an authoring-tool requirement.
- It is a "Visionary" elaborate feature without a vertical-slice data-loop.

## ✅ 3. OUTPUT
A **Gating Report** (in the chat) confirming:
- **Status**: [PASSED / REJECTED]
- **Target Primitive**: [Name]
- **Generality Proof**: [Work in 1628 and 1970?]

---

**Directive**: PROTECT THE CONSTRUCTION KIT. AVOID THE MONOLITH.
