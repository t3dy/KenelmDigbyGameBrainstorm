# 📋 Implementation Plan: Scenario Pack Linter (Tool #27)

**Milestone**: Transition from Specified -> Validated
**Owner**: Antigravity (Assistant)
**Status**: Specified

---

## 🏛️ 1. ARCHITECTURAL GATE (CONSTRUCTION_KIT)
- **Classification**: **tool**
- **Target Lineage**: Shared (Stability)
- **Primitive Affected**: `AlmagestManifest` (`schema.ts`)
- **Generality Check**: MUST validate the `court_intrigue_micro` (Ultima) and `digby_scanderoon_micro` (FTL) without any code-forks.

## 🧬 2. SCHEMATIC Contract
The tool will check:
- Is it a valid JSON?
- Does it have `id`, `locations[]`, `encounters[]`?
- Are all `locationIds` in encounters present in the `locations` array?
- Are all `iconIds` defined in the global `assets` registry?

## 🏗️ 3. VERTICAL SLICE (IMPLEMENTATION)
1.  **SCRIPT**: Create `scripts/lint_scenario.ts` using Node/TypeScript.
2.  **RULESET**: Implement the core structural checks (ID uniqueness, reference integrity).
3.  **TEST**: Run the script against `/examples/court_intrigue_micro/manifest.json`.
4.  **LOG**: Produce a `lint_report.json` as Evidence of validation.

## 🛑 4. OUT OF SCOPE (DEFERRED)
- Deep logic validation (e.g. "is this encounter mathematically winnable?").
- Visual preview inside the CLI tool (CLI text-output only).

## ✅ 5. COMPLETION EVIDENCE
- [ ] `scripts/lint_scenario.ts` exists and runs without crashing.
- [ ] Correctly identifies the broken `medici_eval` encounter if the `florence` location is deleted.
- [ ] Evidence Block confirms **Status: Validated**.
