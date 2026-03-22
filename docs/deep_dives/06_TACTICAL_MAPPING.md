# ⚔️ Deep Dive: Tactical Mapping (Combat #1)

**Status**: **Validated** | **Layer**: 5 (Systemic Machinery)

## 🏗️ How it Works
The **Tactic-Maker (`generate_tactical_moves.cjs`)** is the primary link between the **Alchemical Laboratory** and the **Naval Tactical Engine**. It ensures that "Scholarship has systemic power."

*   **Move Synthesis**: It reads the `reagents` in the manifest (e.g., Vitriol, Nitre, Antimony).
*   **Archetype Rules**: It identifies that **Vitriol** should be a hull-corrosive attack, while **Antimony** is a crew-debuffing poison.
*   **Resource Tethering**: It applies a `reagent_cost` to every move (e.g., 1 Nitre), ensuring combat is limited by the player's economic and lab success.

## 🛠️ Tips for Human Designers
1.  **Move Utility**: Don't just make every move "Hull Damage." Use debuffs (`stigma_impact`), heals (`Hull Repair`), and buffs (`Speed increase`). This makes the Alchemical choice more interesting.
2.  **Move Descriptions**: Ensure the `message` field (what the player sees in the combat log) matches the Alchemical flavor (e.g., "The Vitriol smokes as it hits the timber").

## 🤖 Tips for LLMs
1.  **Reagent Archetypes**: If you find a "New Reagent" in scholarship (e.g., Powder of Sympathy), decide if it is a "Tactical Payload" (attack) or "Systemic Medico" (heal).
2.  **Charge Logic**: Use the `charge_time` field to balance powerful moves. Higher damage should require more turns to prepare the alchemical payload.

---
**Generality Note**: The Tactic-Maker translates any scholarly "Resource" into a "Tactical Utility," essential for any Almagest-style combat or conflict simulation.
