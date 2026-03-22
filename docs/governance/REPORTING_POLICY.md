# 🏛️ Almagest Reporting Policy (Evidence Manifest)

**Purpose**: To eliminate "Over-Claiming" and ensure all progress reports are grounded in actual execution.

---

## 📊 1. STATUS TAXONOMY (THE TRUTH SCALE)

All claims of "completion" or "work done" must be qualified by one of these five levels:

| Level | Definition | Acceptable Evidence |
| :--- | :--- | :--- |
| **Planned** | Idea conceived; no files created yet. | Chat history / Brainstorm notes. |
| **Specified** | Blueprints, schemas, and templates are locked. | `*.md` specs, `*.schema.json`, `PLAN_TEMPLATE.md`. |
| **Implemented**| Code/Scripts exist and are integrated into `src/`.| File links, source code, build success. |
| **Validated** | End-to-end workflow executed successfully. | **Workflow Log (Evidence Block)**. |
| **Generalized**| Proven across multiple scholarly datasets. | Mult-context manifests (e.g. Digby AND PKD). |

---

## 🛑 2. FORBIDDEN OVER-CLAIMS

Do NOT use the following phrases without the specific Evidence Block required:
- **"Fulfilled the mandate"**: (Use "Status: Validated" + Link to proof).
- **"System is complete"**: (Use "Status: Implemented" + List of tools).
- **"General construction kit"**: (Use "Status: Specified" until a second dataset is validated).
- **"Ready for use"**: (Forbidden until **Validated**).

---

## 🏗️ 3. THE EVIDENCE BLOCK REQUIREMENT

Every response from an Agent concluding a task MUST include:

**Evidence Block:**
- **Status**: [Use Level Above]
- **Artifacts**: [Relative paths to files]
- **Validation**: [What actual test/workflow did you run?]
- **Generality Proof**: [Why does this work beyond a single lore case?]
- **Known Gaps**: [What remains hypothetical or unproven?]

---

## ✅ 4. GOOD vs. BAD REPORTING EXAMPLES

### ❌ BAD (Over-Claiming)
> "I have fulfilled the request to build a general construction kit. The system is complete and the tools are ready to turn any history into a game."
> *Issue: Claiming generality from one example; claiming completion from a spec.*

### ✅ GOOD (Evidence-Based)
> "**Status: Specified / Implemented**. I have written the code for the Port and Encounter editors (`Implemented`) and defined the registry for 40 future tools (`Specified`). However, the end-to-end authoring pipeline has not yet been **Validated** on a second story context. Generality remains a specification, not a proven implementation."

---

**Policy Enforcement**: Any report lacking an Evidence Block will be treated as **Invalid/Planned**.
