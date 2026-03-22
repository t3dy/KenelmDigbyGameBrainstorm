# 🧪 Deep Dive: Economic Scarcity (Econ #1)

**Status**: **Validated** | **Layer**: 5 (Systemic Machinery)

## 🏗️ How it Works
The **Econ-Maker (`generate_econ_patch.cjs`)** is the primary engine of **Regional Simulation**. It simulates the alchemical business loop of any "Travel" game.

*   **Regional Heuristics**: If the location is `Algiers`, it applies high demand for `Nitre` (gunpowder). If it is `London`, it multiplies the supply of `Glass Antimony`.
*   **Market Oscillator**: It generates randomized but bounded price and stock nodes for every port.
*   **Stability Factor**: It assigns higher market `stability` to capitals (e.g., Venice, London) than to frontier ports (e.g., Milos).

## 🛠️ Tips for Human Designers
1.  **Profit Gap Mapping**: When designing the `locations` list, create "Distance Price Gaps." Buy something cheap in one port, then sell it in a high-demand port (e.g., Nitre: London(4) -> Algiers(40)).
2.  **Economic Risk**: Use the `stability` field to influence how much prices change during the game's loop. Low-stability ports should have high-volatility markets.

## 🤖 Tips for LLMs
1.  **Jurisdictional Influence**: Check the `jurisdiction` of a location (Ottoman, Papal, etc.). Use that to decide if a specific reagent (e.g., Philosophers Lead) should be "Controlled" or "Ubiquitous."
2.  **Stock Ratios**: Maintain a 1:3 ratio for high-power vs. common reagents in a market's inventory. Don't flood the market with Vitriol.

---
**Generality Note**: This tool creates the "Supply Chain" of any Almagest-style world, essential for mercantile and industrial simulators.
