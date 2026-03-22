# 🧪 Almagest: Data Ontology for PDF Insight Discovery (320)

**Objective**: To refine the **Source-to-Scenario Pipeline** from arbitrary "Key Historical Claims" into a structured, axiomatic ontology that an LLM or a search engine can use to auto-generate gameplay machinery from PDFs.

---

## 🏛️ 1. FROM LABELS TO TRIPLES
1.  **Semantic Triples**: The search tool MUST find triples, not just keywords.
    - **Current**: Search for "Ransom" in the Digby PDF.
    - **Ontological**: Search for `(Actor: Alchemist) -[Negotiates]-> (Action: Ransom) -[Impacts]-> (Resource: Wealth)`.
2.  **Entity Resolution**:
    - The ontology must identify that "Sir Kenelm," "Digby," and "The English Pirate" in the **Scanderoon** section are the SAME `ActorID`.
    - Automated `ID_Consolidator` script needed in the Philology Layer.

## 🏺 2. AXIOMATIC DEFINITIONS (THE "LEGO" ONTOLOGY)
1.  **Define Assets in the Search**:
    - An "Ambush" search should look for `Time: Night` + `Location: Narrow Path` + `Force A > Force B`. The search engine then "Flags" the PDF chunk as an `AMBUSH_ASSET_CANDIDATE`.
2.  **Resource In-Flow/Out-Flow**:
    - Quantify the PDF's text into delta values. "He gave fifty crowns" becomes `wealth: -50`. "He gained a great reputation" becomes `honor: +20`.
    - **Impact Scale**: Define `Low | Medium | High` for every claim found.

## 🎲 3. CHRONO-SPATIAL ANCHORING
1.  **Automatic "Map" generation from PDF**:
    - Ingest the PDF's index or date mentions to build the `locations` array automatically.
    - **Logic**: IF a PDF chunk mentions `1628` AND `Algiers`, auto-generate `manifest.locations.push({ id: 'algiers', date: '1628' })`.

## 🧬 4. SUCCESSES & MISTAKES (LESSONS LEARNED)
*   **Success**: The `SourceExcerptParser` tool works for structure, but it lacks "Inference."
*   **Success**: The `SceneSkeletonGenerator` correctly maps IDs, but it doesn't "know" what a `court` looks like based on the source text.
*   **Mistake**: Manual manifest editing for Algiers caused ID misalignment.
*   ** takeaway**: The **Ontology** must be the "ID Source of Truth." If the PDF says "Algiers," the ontology ensures every tool uses the ID `algiers` without human intervention.

---

**Status**: **Specified**. The next tool in this chain is the **EntityExtractor (Tool #10)**, using this ontology to refine raw source notes into structured triples.
