# 🏛️ Deep Dive: Port Configuration (Tool #12)

**Status**: **Validated** | **Layer**: 4 (Environment Staging)

## 🏗️ How it Works
The **Port Configurator (`generate_port_config.cjs`)** is the primary generator for **Spatial Infrastructure**. It populates a `Location` with its situational machinery (Merchants, Manuscripts, Coordinates).

*   **Type Heuristics**: If the location is a `port`, the tool generates a Merchant node. If it is a `capital`, it generates a Library or Scholarly Node.
*   **Coordinate Staging**: It assigns 2D pixel coordinates for "Interactive Hotspots" on the destination's background.
*   **Asset Infilling**: It specifies the icons and names of local merchants (e.g., "The Venetian Factor") based on the `jurisdiction`.

## 🛠️ Tips for Human Designers
1.  **Merchant Variance**: Diversify the reagents and manuscripts available at different ports. Florence should sell high-purity vitriol, while Algiers should sell nitre.
2.  **Visual Alignment**: Coordinate with the **Background Registry**. Ensure that `startX` and `startY` correspond to visible doors or paths in the 2D pixel-art background.

## 🤖 Tips for LLMs
1.  **Jurisdictional Consistency**: When generating a merchant, check the location's `jurisdiction` (Ottoman, Venetian, etc.). Ensure the merchant's name and stock match that political context.
2.  **Item Sourcing**: Use the `reagents` list for any merchant inventory. Don't invent "new" reagents that aren't in the manifest.

---
**Generality Note**: This tool automates the population of any location-based gameplay area, from a 17th-century port to a 20th-century exegesis library node.
