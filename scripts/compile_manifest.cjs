const fs = require('fs');
const path = require('path');

/**
 * Almagest Manifest Compiler v1.0
 * INGEST → ONTOLOGY → DESIGN → COMPILE → RUNTIME
 */

const ONTOLOGY_DIR = path.join(__dirname, '../docs/ontology');
const DESIGN_DIR = path.join(__dirname, '../docs/design');
const OUTPUT_FILE = path.join(__dirname, '../src/data/manifest.json');

function buildManifest() {
    console.log("🚀 INITIALIZING ALMAGEST COMPILATION CYCLE...");

    // 1. Load Ontology
    const ontologyFiles = fs.readdirSync(ONTOLOGY_DIR).filter(f => f.endsWith('.json'));
    let entities = [];
    ontologyFiles.forEach(file => {
        const content = JSON.parse(fs.readFileSync(path.join(ONTOLOGY_DIR, file), 'utf-8'));
        entities = entities.concat(content);
    });

    // 2. Validate Entities (The Tether Gate)
    console.log("🛡️  VALIDATING ONTOLOGICAL INTEGRITY...");
    entities.forEach(entity => {
        if (!entity.metadata.sources || entity.metadata.sources.length === 0) {
            throw new Error(`CRITICAL: Entity '${entity.id}' lacks provenance (sources required).`);
        }
        if (entity.metadata.confidence < 0.5) {
            console.warn(`[WARNING] Low Confidence Entity: '${entity.id}' (score: ${entity.metadata.confidence})`);
        }
    });

    // 3. Apply Design Mappings (The Affordance Gate)
    // For this prototype, we'll assume the mechanical_affordances in ontology are correct.
    // In later phases, this will resolve from DESIGN_DIR.
    const resolvedWorldState = {
        reagents: entities.filter(e => e.type === 'reagent').map(e => ({
            id: e.id,
            name: e.metadata.name,
            description: e.philology.current_resolution,
            potency: e.mechanical_affordances.modifiers.potency,
            instability: e.mechanical_affordances.modifiers.instability
        })),
        locations: entities.filter(e => e.type === 'location').map(e => ({
            id: e.id,
            name: e.metadata.name,
            x: e.mechanical_affordances.coordinates.x,
            y: e.mechanical_affordances.coordinates.y,
            description: e.mechanical_affordances.description,
            type: e.mechanical_affordances.type,
            unlocked: e.mechanical_affordances.unlocked
        })),
        characters: entities.filter(e => e.type === 'character').map(e => ({
            id: e.id,
            name: e.metadata.name,
            role: e.mechanical_affordances.role,
            health: e.mechanical_affordances.health,
            reputation: e.mechanical_affordances.reputation,
            bio: e.mechanical_affordances.bio
        })),
        scenes: entities.filter(e => e.type === 'scene').map(e => ({
            id: e.id,
            background: e.mechanical_affordances.background,
            actors: e.mechanical_affordances.actors,
            timeline: e.mechanical_affordances.timeline
        }))
    };

    // 4. Resolve Philology Variants
    // In a multi-agent mode, this would look at variant resolution flags.

    // 5. Output Manifest
    console.log("💾 EMITTING DETERMINISTIC MANIFEST...");
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resolvedWorldState, null, 2));
    console.log(`✅ COMPILATION SUCCESSFUL. MANIFEST WRITTEN TO: ${OUTPUT_FILE}`);
}

try {
    buildManifest();
} catch (e) {
    console.error(`❌ COMPILATION FAILED: ${e.message}`);
    process.exit(1);
}
