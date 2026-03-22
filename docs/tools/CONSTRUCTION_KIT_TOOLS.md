# 🛠️ Almagest Construction-Kit Tool Registry (~40 Tools)

**Purpose**: To provide a portfolio of 40 granular, composable tools that allow human and LLM designers to transform scholarly sources into playable Renaissance RPG scenarios.

---

## 🏛️ CATEGORY 1: SOURCE INGESTION & PARSING (Source -> Note)

1.  **Tool: SourceExcerptParser**
    *   **Category**: Ingestion
    *   **Primitive**: `SourceExcerpt`
    *   **Input**: PDF / Text file.
    *   **Output**: Structured JSON list of notable historical claims.
    *   **Purpose**: Identify discrete historical units.
    *   **Human Use**: Select high-impact text blocks.
    *   **LLM Use**: Auto-tag dates, figures, and locations.
    *   **Example**: Digby’s duel with Mountpessulanus becomes a `SourceExcerpt` with `date: 1621` and `actors: [Digby, Mountpessulanus]`.

2.  **Tool: EvidenceTraceabilityLinker**
    *   **Category**: Ingestion
    *   **Primitive**: `SourceExcerpt`
    *   **Input**: `SourceExcerpt`, `HistoricalClaim`.
    *   **Output**: A many-to-one mapping for verification.
    *   **Purpose**: Ensure every game mechanic has a footnote to the source.
    *   **Human Use**: Drag claims onto source text.
    *   **LLM Use**: Auto-generate `source_ref` IDs in the manifest.

3.  **Tool: ClaimSentimentClassifier**
    *   **Category**: Ingestion
    *   **Primitive**: `HistoricalClaim`
    *   **Input**: Claim text.
    *   **Output**: `Ultima`, `FF`, or `FTL` alignment.
    *   **Purpose**: Determine which gameplay lineage the fact supports best.

---

## 🏛️ CATEGORY 2: STRUCTURAL EXTRACTION (Note -> Seed)

4.  **Tool: PatronageNetworkBuilder**
    *   **Category**: Structural
    *   **Primitive**: `FactionRelationship`, `ReputationAxis`
    *   **Input**: List of historical figures and their allegiances.
    *   **Output**: A directed graph of `Influence` and `Debt` values.
    *   **Purpose**: Model the political status-game of the Renaissance.
    *   **Example**: Mapping Digby’s standing with King Charles I vs. Parliament.

5.  **Tool: ReputationAxisDefiner**
    *   **Category**: Structural
    *   **Primitive**: `ReputationAxis`
    *   **Input**: Conflict nodes (e.g., Duel, Debate).
    *   **Output**: A bi-directional stat (e.g., Roman Catholic <-> Anglican).

6.  **Tool: JurisdictionMapper**
    *   **Category**: Structural
    *   **Primitive**: `Location`, `Jurisdiction`
    *   **Input**: Historical port list and respective empires.
    *   **Output**: Overlaid `Jurisdiction` data for the Port Editor.

7.  **Tool: ActorArchetypeAssigner**
    *   **Category**: Structural
    *   **Primitive**: `Actor`
    *   **Input**: Historical figure bio.
    *   **Output**: `Merchant`, `Scholar`, `Corsair`, `Noble`.

8.  **Tool: EventChainInferrer** (Extracts FF-sequence)
9.  **Tool: ResourceStakeDefiner** (Extracts Wealth/Knowledge values)
10. **Tool: EpistemicUncertaintyWrapper** (Identifies "hidden" facts)

---

## 🏛️ CATEGORY 3: SCENARIO ASSEMBLY (Seed -> JSON)

11. **Tool: SceneSkeletonGenerator**
    *   **Category**: Assembly
    *   **Primitive**: `Scene`
    *   **Input**: Location + Actor list from `SourceExcerpt`.
    *   **Output**: Basic `SceneScript` with `startX/Y` and empty `Timeline`.
    *   **Purpose**: Rapidly stage a dramatic "FF-style" encounter.

12. **Tool: DialogueTreePruner**
13. **Tool: ChoiceConsequenceMapper**
14. **Tool: ActorPositioningAutoGrid**
15. **Tool: EncounterTriggerLogicBuilder**
16. **Tool: RewardDistributionCalculator**
17. **Tool: PortConfigGenerator**
18. **Tool: AlchemicalRecipeDraftingTool**
19. **Tool: ManuscriptFragmentDefogger** (Knowledge -> Philology)
20. **Tool: VesselComponentStatDefiner**

---

## 🏛️ CATEGORY 4: SYSTEMIC BALANCING (Crisis/Stakes Tuning)

21. **Tool: DifficultyScaler** (FTL logic)
    *   **Category**: Balancing
    *   **Primitive**: `Encounter`
    *   **Input**: Player's current `wealth` and `knowledge`.
    *   **Output**: Normalized `hull` and `components` health for adversary.
    *   **Purpose**: Prevent "early-game death" or "late-game boredom."

22. **Tool: RiskProbabilityDistributor**
23. **Tool: PatronageDecayRateCalculator**
24. **Tool: ResourceDepletionSimulator**
25. **Tool: StakeVolatilityWeightingTool**
26. **Tool: SuccessProbabilityLinter**

---

## 🏛️ CATEGORY 5: VALIDATION & LINTERS (Harnessing)

27. **Tool: ScenarioPackLinter**
    *   **Category**: Validation
    *   **Primitive**: `AlmagestManifest`
    *   **Input**: Full JSON Pack.
    *   **Output**: List of broken `id` references or missing icons.

28. **Tool: OrphanedActorDetector**
29. **Tool: FactionRelationshipConsistencyChecker**
30. **Tool: ParadoxIdentifier** (Conflicting choices)
31. **Tool: SourceCoverageValidator**
32. **Tool: SchemaContractVerify**

---

## 🏛️ CATEGORY 6: NARRATIVE STAGING (FF/Dramatic Layer)

33. **Tool: EmotionKeyframingAssistant**
    *   **Category**: Narrative
    *   **Primitive**: `SpriteAction`
    *   **Input**: Dialogue tone (`anger`, `surprise`).
    *   **Output**: EMOTE sequence for the Actor.

34. **Tool: CameraBlockingAutoAlign** (Actor placement)
35. **Tool: DramaticBeatSequencer**
36. **Tool: ExitConditionValidator**

---

## 🏛️ CATEGORY 7: REPUTATION & MORAL MODELING (Ultima Layer)

37. **Tool: MoralAlignmentTracker**
    *   **Category**: Morality
    *   **Primitive**: `ReputationAxis`
    *   **Input**: Choice texts.
    *   **Output**: Projected `Honor` vs `Stigma` shift.
    *   **Purpose**: Help LLMs author Ultima-like moral consequences.

38. **Tool: GateRequirementAnalyzer**
39. **Tool: StatusThresholdInferrer**
40. **Tool: FactionBetrayalWarningGenerator**

---

**Generality Note**: None of these tools mention "The Powder of Sympathy" or "Scanderoon." They operate on the **Primitives of Renaissance RPG Simulation**.
