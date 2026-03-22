const fs = require('fs');
const path = require('path');

/**
 * Almagest Entity Extractor (Tool #10)
 * 
 * Auto-resolves historical names into RPG IDs using the Entity Registry.
 * Status: Implemented
 */

const inputPath = process.argv[2];

if (!inputPath) {
    console.error("Usage: node scripts/extract_entities.cjs <input_text_file>");
    process.exit(1);
}

try {
    const rawText = fs.readFileSync(inputPath, 'utf8');
    const registry = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'docs', 'architecture', 'ENTITY_REGISTRY.json'), 'utf8'));
    
    const results = {
        actors: new Set(),
        locations: new Set()
    };

    // Actors Search
    for (const [name, id] of Object.entries(registry.actors)) {
        if (rawText.toLowerCase().includes(name.toLowerCase())) {
            results.actors.add(id);
        }
    }

    // Locations Search
    for (const [name, id] of Object.entries(registry.locations)) {
        if (rawText.toLowerCase().includes(name.toLowerCase())) {
            results.locations.add(id);
        }
    }

    const output = {
        found_actors: Array.from(results.actors),
        found_locations: Array.from(results.locations),
        confidence: results.actors.size > 0 || results.locations.size > 0 ? 0.95 : 0
    };

    console.log(JSON.stringify(output, null, 2));

} catch (err) {
    console.error(`Execution Error: ${err.message}`);
    process.exit(1);
}
