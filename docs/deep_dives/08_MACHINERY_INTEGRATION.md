# 🏗️ Deep Dive: Machinery Integration (Tool #51)

**Status**: **Validated** | **Layer**: 6 (Assembly)

## 🏗️ How it Works
The **Machinery Integrator (`integrate_machinery.cjs`)** is the final **Assembly Line** of the Almagest Construction Kit. It is the tool that ensures that multiple generated "Patches" (Chrono, Tactic, Econ, Repair) are merged into a single, hardened manifest.

*   **Patch-Based Assembly**: It follows the **Maker Contract**, requiring generators to output `.json` patches instead of modifying the master manifest directly.
*   **Sequential Logic**: It applies **Repairs** FIRST, then injects **Systemic Machinery**, and finally inserts **Governance Metrics**.
*   **Merge Persistence**: It ensures that no duplication occurs when multiple Makers targeting the same collection are executed.

## 🛠️ Tips for Human Designers
1.  **Staging Review**: Before running the Integrator, manually scan the `repair_patch` and `chrono_patch`. This is your "Final Editorial Gate."
2.  **Backup Protocol**: Always keep a copy of your "Raw Manifest" (without integrated machinery) as your development source. The Integrated Manifest is for the Playable Build.

## 🤖 Tips for LLMs
1.  **Attribute Integrity**: When generating a patch, ensure the `id` and `type` fields exactly match the master manifest's target node. The Integrator uses these for its mapping logic.
2.  **Metadata Attribution**: Always include a `metadata` node in every patch, specifying the `maker_id` and `timestamp`. This is critical for long-term project auditability.

---
**Generality Note**: This tool is the foundation of any Almagest "Recursive System Improvement" loop, from one-off content additions to total architectural overhauls.
