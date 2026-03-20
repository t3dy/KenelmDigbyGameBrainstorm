# SWARM_ROLES: Almagest Multi-Agent Swarm v2.0

## 🏗️ 1. ARCHITECT (Foreman)
*   **Input**: Research PDFs/Keywords.
*   **Output**: Ontology/Design Changes in `/docs/ontology/` and `/docs/design/`.
*   **Constraint**: No direct React coding. No `manifest.json` writes.

## 🛠️ 2. CODER (Worker)
*   **Input**: Approved `IMP-xxxx` + `src/data/manifest.json`.
*   **Output**: TypeScript/JSX in `/src/`.
*   **Constraint**: CANNOT interpret PDFs or Ontology. Reads `manifest.json` ONLY.

## 📚 3. PRODUCER (Librarian)
*   **Input**: Research Documents.
*   **Output**: Structured JSON in `/docs/ontology/`.
*   **Action**: Keyword mapping, provenance tracking, source citation.
*   **Constraint**: NO mechanics definition.

## 🧬 4. RESOLVER (Philologist)
*   **Input**: Conflicting Manuscripts/Variants in Ontology.
*   **Output**: Variant resolution flags in `/docs/design/`.
*   **Constraint**: Does not write code; defines which "Truth" is currently resolved.

## 🚦 5. VALIDATOR (Orchestrator)
*   **Input**: Proposed Ontology + Design changes.
*   **Action**: Execute `/scripts/compile_manifest.js`.
*   **Output**: Built `manifest.json`.
*   **Constraint**: Blocks the turn if provenance is missing or validation fails.

---
**Status**: ENFORCED
**Goal**: Zero Ontological Drift.
