# ⛩️ Almagest System Boundaries (The Wall)

**Purpose**: To define precisely what lives in the **Engine**, the **Kit**, and the **Scenario** at any time.

## 🏗️ 1. THE ARCHITECTURAL LAYERS

| Layer | Responsibility | Validated By | Path |
| :--- | :--- | :--- | :--- |
| **ENGINE** | Runtime, State (Zustand), Converters, Renderers. | Unit Tests, Build Status. | `src/engine/` |
| **THE KIT** | Reusable Primitives (`Scene`, `Actor`, `Patronage`). | `schemas/` (JSON Schema). | `src/components/kit/` |
| **THE MAKER** | Authoring Tools (`PortEditor`, `AssetPainter`). | Bi-Directional Save test. | `src/components/editor/` |
| **SCENARIO PACK** | Lore, Dialogue, Ports, Resources. | Manifest Loader. | `scenario-packs/` |
| **SOURCE PIPELINE** | Scholarly notes -> Mechanic seeds. | Evidence traceability. | `source-pipeline/` |

## ⚖️ 2. RULES OF THE BORDER

1.  **NO BESPOKE STATE**: `gameStore.ts` (Engine) may not have properties that *only* apply to one scenario (e.g., `weaponsalve_level`). It must have a generic `Resource` container.
2.  **CONVERSION IS ENGINE**: Transforming CSV/Excel/PDF into JSON is part of `source-pipeline/tools`.
3.  **UI IS KIT-DRIVEN**: A UI element (like the "Laboratory") must be a **Kit Primitive** that others could use for another purpose (e.g., a "Smithy").

---

**Boundary Violation Policy**: Any PR adding bespoke lore-logic to `src/` without an equivalent change to `schemas/` will be **Auto-Rejected**.
