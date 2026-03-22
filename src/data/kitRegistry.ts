/**
 * Almagest Construction Kit (ACK) Registry
 * 
 * Provides an honest mapping of the project's current state.
 * Status: Validated
 */

export type ProjectStatus = 'Working' | 'Partial' | 'Stub' | 'Planned' | 'Legacy';
export type DocTrust = 'Primary' | 'Aspirational' | 'Stale';

export interface KitNode {
    id: string;
    name: string;
    type: 'tool' | 'doc' | 'system' | 'primitive';
    status: ProjectStatus;
    description: string;
    path?: string;
    related?: string[];
    trust?: DocTrust;
    relevance?: number; // 0-10
}

export const KIT_REGISTRY: KitNode[] = [
    // --- Primitives ---
    {
        id: 'schema_ts',
        name: 'Core Schema (schema.ts)',
        type: 'primitive',
        status: 'Working',
        description: 'TypeScript interfaces defining the Almagest data contract.',
        path: '/src/data/schema.ts'
    },
    {
        id: 'manifest_json',
        name: 'Scenario Manifest',
        type: 'primitive',
        status: 'Working',
        description: 'The unified JSON source of truth for scenario packs.',
        path: '/scenario-packs/digby-1628/manifest.json'
    },

    // --- Makers ---
    {
        id: 'chrono_maker',
        name: 'Chrono-Maker (Tool #Loop-01)',
        type: 'tool',
        status: 'Working',
        description: 'Generates historical temporal schedules from encounter data.',
        path: '/makers/loop/generate_chrono_schedule.cjs'
    },
    {
        id: 'tactic_maker',
        name: 'Tactic-Maker (Tool #Combat-01)',
        type: 'tool',
        status: 'Working',
        description: 'Transforms alchemical reagents into tactical movesets.',
        path: '/makers/combat/generate_tactical_moves.cjs'
    },
    {
        id: 'econ_maker',
        name: 'Econ-Maker (Tool #Econ-01)',
        type: 'tool',
        status: 'Working',
        description: 'Generates regional market data based on historical heuristics.',
        path: '/makers/reagents/generate_econ_patch.cjs'
    },
    {
        id: 'repair_maker',
        name: 'Repair-Maker (Tool #Repair-01)',
        type: 'tool',
        status: 'Working',
        description: 'Automates manifest hardening and literal-type verification.',
        path: '/makers/repair/generate_repair_patch.cjs'
    },
    {
        id: 'dedup_maker',
        name: 'Deduplication-Maker (Tool #52)',
        type: 'tool',
        status: 'Working',
        description: 'Identifies and rectifies ID collisions in the manifest.',
        path: '/makers/repair/generate_deduplication_patch.cjs'
    },

    // --- Systems ---
    {
        id: 'audit_coverage',
        name: 'Source Coverage Auditor',
        type: 'system',
        status: 'Working',
        description: 'CLI tool to measure scholarship-to-gameplay ratios.',
        path: '/scripts/audit_source_coverage.cjs'
    },
    {
        id: 'integrator',
        name: 'Machinery Integrator',
        type: 'system',
        status: 'Working',
        description: 'Merges systemic patches into the master manifest.',
        path: '/scripts/integrate_machinery.cjs'
    },
    {
        id: 'lab_engine',
        name: 'Alchemical Laboratory',
        type: 'system',
        status: 'Partial',
        description: 'Interactive UI for reagent synthesis. Needs closer manifest tethering.',
        related: ['tactic_maker']
    },
    {
        id: 'combat_engine',
        name: 'Tactical Combat View',
        type: 'system',
        status: 'Stub',
        description: 'Naval UI for moveset execution. Currently uses hardcoded cards.',
        related: ['tactic_maker']
    },
    {
        id: 'market_oscillator',
        name: 'Historical Arbitrage Engine',
        type: 'system',
        status: 'Planned',
        description: 'Runtime calculation of price drifts and trade routes.',
        related: ['econ_maker']
    },

    // --- Docs ---
    {
        id: 'serious_mandate',
        name: 'SERIOUS.md',
        type: 'doc',
        status: 'Working',
        description: 'The projects primary governance charter.',
        path: '/SERIOUS.md'
    },
    {
        id: 'deep_dives',
        name: 'The Deep Dive Library',
        type: 'doc',
        status: 'Working',
        description: '20 detailed manuals on how to build scholarly RPGs.',
        path: '/docs/deep_dives/',
        trust: 'Primary',
        relevance: 10
    }
];

export const DEEP_DIVES: KitNode[] = [
    { id: 'dd_01', name: '01 Source Note Parsing', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'Deep dive into Tool #01 (raw excerpt transformation).', path: '/docs/deep_dives/01_SOURCE_NOTE_PARSING.md' },
    { id: 'dd_02', name: '02 Manuscript Diffing', type: 'doc', status: 'Working', trust: 'Primary', relevance: 8, description: 'Techniques for resolving conflicting historical sources.', path: '/docs/deep_dives/02_MANUSCRIPT_DIFFING.md' },
    { id: 'dd_03', name: '03 The Alchemical Manifest', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'The data contract for all reagents and procedures.', path: '/docs/deep_dives/03_ALCHEMICAL_MANIFEST.md' },
    { id: 'dd_04', name: '04 Geographic Tethers', type: 'doc', status: 'Working', trust: 'Primary', relevance: 7, description: 'Mapping 1628 port names to modern coordinates.', path: '/docs/deep_dives/04_GEOGRAPHIC_TETHERS.md' },
    { id: 'dd_05', name: '05 Chrono-Scheduling', type: 'doc', status: 'Working', trust: 'Primary', relevance: 9, description: 'Deep dive into Tool #Loop-01 (temporal spine).', path: '/docs/deep_dives/05_CHRONO_SCHEDULING.md' },
    { id: 'dd_06', name: '06 Tactic-Maker Systems', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'Assembly of combat and movement schemas.', path: '/docs/deep_dives/06_TACTIC_MAKER.md' },
    { id: 'dd_07', name: '07 Regional Econ-Modeling', type: 'doc', status: 'Working', trust: 'Primary', relevance: 8, description: 'Dynamic supply/demand in the 17th-century Levant.', path: '/docs/deep_dives/07_ECON_MODELING.md' },
    { id: 'dd_08', name: '08 Repair-Maker Logic', type: 'doc', status: 'Working', trust: 'Primary', relevance: 7, description: 'Governance for code and data self-healing.', path: '/docs/deep_dives/08_REPAIR_MAKER.md' },
    { id: 'dd_09', name: '09 Deduplication Swarms', type: 'doc', status: 'Working', trust: 'Primary', relevance: 6, description: 'Managing redundant lore fragments across builds.', path: '/docs/deep_dives/09_DEDUPLICATION.md' },
    { id: 'dd_10', name: '10 The Intimacy of Letters', type: 'doc', status: 'Working', trust: 'Primary', relevance: 9, description: 'Social simulation via epistolary interaction.', path: '/docs/deep_dives/10_LETTERS_SYSTEM.md' },
    { id: 'dd_11', name: '11 Stigma & Honor Math', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: "The arithmetic of Digby's social status.", path: '/docs/deep_dives/11_STIGMA_HONOR.md' },
    { id: 'dd_12', name: '12 Alchemical Laboratory UI', type: 'doc', status: 'Partial', trust: 'Primary', relevance: 9, description: "Design guide for the 'Laboratory' interaction.", path: '/docs/deep_dives/12_LAB_UI.md' },
    { id: 'dd_13', name: '13 Nautical Simulation', type: 'doc', status: 'Working', trust: 'Primary', relevance: 8, description: 'Wind, water, and hull integrity mechanics.', path: '/docs/deep_dives/13_NAUTICAL_SIM.md' },
    { id: 'dd_14', name: '14 The Pursuer Algorithm', type: 'doc', status: 'Working', trust: 'Primary', relevance: 8, description: 'Procedural tension through the Serene Pursuer.', path: '/docs/deep_dives/14_PURSUER_ALGO.md' },
    { id: 'dd_15', name: '15 Scenario Branching', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'Building the narrative tree from Layer 1 seeds.', path: '/docs/deep_dives/15_BRANCHING.md' },
    { id: 'dd_16', name: '16 Agentic Governance', type: 'doc', status: 'Working', trust: 'Primary', relevance: 9, description: 'How LLM-Agents maintain the project soul.', path: '/docs/deep_dives/16_GOVERNANCE.md' },
    { id: 'dd_17', name: '17 The 7-Layer Architecture', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'The master strategy for construction.', path: '/docs/deep_dives/17_ARCHITECTURE.md' },
    { id: 'dd_18', name: '18 Serious Almagest Vision', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'The philosophical core of the toolset.', path: '/docs/deep_dives/18_VISION.md' },
    { id: 'dd_19', name: '19 LLM-Human Collaboration', type: 'doc', status: 'Working', trust: 'Primary', relevance: 10, description: 'Tips for working with the Almagest swarm.', path: '/docs/deep_dives/19_COLLABORATION.md' },
    { id: 'dd_20', name: '20 The Future of History', type: 'doc', status: 'Planned', trust: 'Aspirational', relevance: 7, description: 'The roadmap toward a final, executable record.', path: '/docs/deep_dives/20_ROADMAP.md' }
];

export const TOUR_STEPS = [
    {
        id: 'vision',
        title: "The Scholar's Laboratory",
        content: "Welcome to the Almagest Construction Kit (ACK). This is an agentic authorship environment where historical scholarship is transformed into systemic play."
    },
    {
        id: 'agentic-authorship',
        title: "Agentic Collaboration",
        content: "Every workstation is tethered to 'The Scholar'—a locally embedded LLM. Use 'AI Assist' to draft dialogue, predict alchemical reactions, and suggest strategic port placements."
    },
    {
        id: 'instructional-overlay',
        title: "Scholarly Orientation",
        content: "Unsure of a module's parameters? Use the 'Info' toggle in any workstation to access detailed instructions and recommended AI prompt patterns."
    },
    {
        id: 'tangible-assets',
        title: "Asset Export & Persistence",
        content: "Your work is not locked in the tool. Export scripts, lab reports, and market data as high-fidelity .md artifacts directly to your physical desktop for external review."
    },
    {
        id: 'makers',
        title: "Systemic Assembly",
        content: "Coordinate the swarm of Makers—Chrono, Tactic, Econ—to compile your designs into a unified, historical manifest for the 1628 Mediterranean."
    },
    {
        id: 'voyage',
        title: "Launch Simulation",
        content: "Once your manifest is hardened and your assets are exported, step into the portal. The voyage of Sir Kenelm Digby awaits your direction."
    }
];
