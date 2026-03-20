const fs = require('fs');
const path = require('path');

const ONTOLOGY_DIR = path.join(__dirname, '../docs/ontology');
const DESIGN_DIR = path.join(__dirname, '../docs/design');
const OUTPUT_FILE = path.join(__dirname, '../src/data/manifest.json');

function buildManifest() {
    console.log("🚀 INITIALIZING KDSC COMPILATION CYCLE...");

    // 1. Load Data Layers
    const ontologyFiles = fs.readdirSync(ONTOLOGY_DIR).filter(f => f.endsWith('.json'));
    let entities = [];
    ontologyFiles.forEach(file => {
        entities = entities.concat(JSON.parse(fs.readFileSync(path.join(ONTOLOGY_DIR, file), 'utf-8')));
    });

    const resolutions = JSON.parse(fs.readFileSync(path.join(DESIGN_DIR, 'variant_resolutions.json'), 'utf-8'));

    // 2. Resolve Reagents (The Philology Gate)
    const resolvedReagents = entities.filter(e => e.type === 'reagent').map(e => {
        const resolutionId = resolutions[e.id];
        const base = e.mechanical_affordances.base_modifiers;
        
        let finalName = e.metadata.name;
        let finalDesc = e.philology.current_resolution || "Unresolved text.";
        let finalPotency = base.potency;
        let finalInstability = base.instability;

        if (resolutionId) {
            const variant = e.philology.variants.find(v => v.variant_id === resolutionId);
            if (variant) {
                finalName = variant.name;
                finalDesc = variant.description;
                finalPotency += variant.modifiers.potency;
                finalInstability += variant.modifiers.instability;
                console.log(`🧬 Resolved '${e.id}' via variant: ${resolutionId}`);
            }
        }

        return {
            id: e.id,
            name: finalName,
            description: finalDesc,
            potency: finalPotency,
            instability: finalInstability,
            variant_options: e.philology.variants.map(v => ({
                id: v.variant_id,
                name: v.name,
                description: v.description
            }))
        };
    });

    const marketPricing = JSON.parse(fs.readFileSync(path.join(DESIGN_DIR, 'market_pricing.json'), 'utf-8'));
    const commodities = entities.filter(e => e.type === 'commodity');

    // 3. Build Markets (Design Layer Over Ontology)
    const markets = {};
    Object.keys(marketPricing).forEach(portId => {
        markets[portId] = commodities.map(c => {
            const pricing = marketPricing[portId][c.id] || { buy: 1.0, sell: 1.0 };
            return {
                id: c.id,
                name: c.metadata.name,
                buy_price: Math.round(c.base_price * pricing.buy),
                sell_price: Math.round(c.base_price * pricing.sell),
                description: c.description
            };
        });
    });

    // 4. Output Manifest
    const worldState = {
        reagents: resolvedReagents,
        commodities: commodities,
        markets: markets,
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
        })),
        recipes: JSON.parse(fs.readFileSync(path.join(ONTOLOGY_DIR, 'recipes.json'), 'utf8')),
        encounters: JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/encounters.json'), 'utf8'))
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(worldState, null, 2));
    console.log(`✅ MANIFEST EMITTED TO: ${OUTPUT_FILE}`);
}

try {
    buildManifest();
} catch (e) {
    console.error(`❌ COMPILATION FAILED: ${e.message}`);
    process.exit(1);
}
