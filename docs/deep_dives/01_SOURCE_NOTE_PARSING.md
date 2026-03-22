# 🔬 Deep Dive: Source Note Parsing (Tool #01)

**Status**: **Validated** | **Layer**: 1 (Scholarship)

## 🏗️ How it Works
The **Source Note Parser (`parse_source.cjs`)** is the primary ingestion gate for the Almagest Construction Kit. It transforms raw historical excerpts (e.g., from a PDF or scholarly article) into a structured markdown "Note."

*   **Extraction Logic**: Identifies the primary actor, date, and location.
*   **The Excerpt**: Preserves the original scholarly quote to ensure provenance is never lost during game development.
*   **ID Mapping**: Generates a canonical `SourceNoteID` (e.g., `SPIRIT_VISION_1622`) that serves as the permanent anchor for all future game machinery.

## 🛠️ Tips for Human Designers
1.  **Context preservation**: When copying text from a scholarly source, include the sentence before and after the "interesting" event. This helps the LLM generators understand the *cause* and *consequence* later in the pipeline.
2.  **ID naming**: Use `TOPIC_YEAR` format. It makes the `provenance` field in the manifest human-readable.

## 🤖 Tips for LLMs
1.  **Format Rigor**: When generating a Source Note, ensure the frontmatter exactly matches the schema. Any missing `location` or `date` will break the **Chrono-Maker** down the line.
2.  **Philological Sensitivity**: If the source mentions a year like "1622/3" (Old Style vs. New Style), convert it to the standardized Gregorian date for manifest compatibility.

---
**Generality Note**: This tool can be used for any historical period, from 17th-century privateers to 20th-century exegesis databases.
