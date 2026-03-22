const fs = require('fs');
const path = require('path');

/**
 * Almagest Port Config Generator (Tool #12)
 * 
 * Automates the creation of location layouts (merchants, manuscripts, coordinates).
 * Status: Implemented
 */

const manifestPath = process.argv[2];
const locationId = process.argv[3];

if (!manifestPath || !locationId) {
    console.error("Usage: node scripts/generate_port_config.cjs <path_to_manifest.json> <location_id>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Find target location
    const locIdx = data.locations.findIndex(l => l.id === locationId);
    if (locIdx === -1) {
        throw new Error(`Location '${locationId}' not found in manifest.`);
    }

    const type = data.locations[locIdx].type || 'standard';
    
    // Layout Logic (Heuristic/Grid)
    const port_config = {
        merchants: [
            [8, 10], [18, 5], [25, 12]
        ],
        manuscripts: [
            [5, 15], [30, 2]
        ],
        exit: [2, 7],
        messages: {
            merchant: "A local trader waits for an audience.",
            manuscript: "Ancient records are archived here.",
            exit: "Return to the main fleet."
        }
    };

    // Override based on type
    if (type === 'capital') {
        port_config.messages.merchant = "A broker of the court weighs the terms.";
        port_config.messages.manuscript = "The official archives of the city-state.";
    } else if (type === 'refuge' || type === 'secret') {
        port_config.messages.merchant = "A cautious islander offers their trade.";
        port_config.messages.manuscript = "Hidden alchemical fragments await recovery.";
    }

    // Update manifest
    data.locations[locIdx].port_config = port_config;

    // Save
    fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2));
    
    console.log(`\x1b[32mSUCCESS: Port Configuration for '${locationId}' generated in ${manifestPath}\x1b[0m`);
    console.log(`Next Step: Refine the coordinates visually in the Port Editor UI.`);

} catch (err) {
    console.error(`Execution Error: ${err.message}`);
    process.exit(1);
}
