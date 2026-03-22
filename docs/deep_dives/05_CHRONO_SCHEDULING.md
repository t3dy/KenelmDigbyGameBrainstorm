# ⚙️ Deep Dive: Chrono-Scheduling (Loop #01)

**Status**: **Validated** | **Layer**: 5 (Systemic Machinery)

## 🏗️ How it Works
The **Chrono-Maker (`generate_chrono_schedule.cjs`)** builds the **Historical Spinal Cord** of any Almagest game. It is the tool that transforms a list of "Encounters" into an "Automated Voyage."

*   **Temporal Sorting**: It reads the `date` of every encounter and sorts them chronologically.
*   **Trigger Mapping**: It generates a `ChronoSchedule` node (frequency: once, trigger_date: date).
*   **Systemic Flow**: It ensures that the player doesn't "Discover" the Algiers Ransom before the Spirit Vision of 1622.

## 🛠️ Tips for Human Designers
1.  **Clustering**: If you have multiple events on the same day, set their `priority`. This is crucial for controlling the narrative pacing during the "Tick" through time.
2.  **Gap Analysis**: If the schedule jumps years (e.g., 1622 -> 1628), that is a prime opportunity to insert **Automated Passives** or "Generic Sea Encounters" to fill the temporal gap.

## 🤖 Tips for LLMs
1.  **Date Normalization**: Ensure all dates in the manifest use the `YYYY-MM-DD` format. The Chrono-Maker's `Date` object sorting relies on this standardized structure.
2.  **Repetition Logic**: While most historical events are `frequency: once`, use the Chrono-Maker to suggest "Repeated Rituals" (e.g., Every Sunday: Letter Reading) for a character-driven game loop.

---
**Generality Note**: This tool is the engine of any "Chronological Portal," from a voyage across the Mediterranean to the timeline of a philosopher's exegesis.
