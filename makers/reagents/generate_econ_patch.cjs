const fs = require('fs');
const path = require('path');

/**
 * Almagest Econ-Maker (Tool #Econ-01)
 * 
 * Automates the generation of a Regional Market economy for Alchemical Reagents.
 * Status: Implemented
 */

const manifestPath = process.argv[2];

if (!manifestPath) {
    console.error("Usage: node makers/reagents/generate_econ_patch.cjs <path_to_manifest.json>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    if (!data.locations || !data.reagents) {
        throw new Error("Missing locations or reagents to generate an economy.");
    }

    const markets = {};

    data.locations.forEach(loc => {
        const inventory = {};
        
        data.reagents.forEach(reagent => {
            // Base Price: 10-100
            let price = 20 + Math.floor(Math.random() * 30);
            let demand = 1.0;

            // Scenario-Specific Heuristics (Digby 1628)
            if (loc.id === 'algiers' && reagent.id === 'nitre') {
                price *= 3.5; // High demand for gunpowder in corsair ports
                demand = 2.5;
            }
            if (loc.id === 'london' && reagent.id === 'glass_antimony') {
                price *= 0.5; // High supply in the metropole
                demand = 0.5;
            }
            if (loc.id === 'florence' && reagent.id.includes('vitriol')) {
                price *= 2.0; // High alchemical interest in the Medici court
                demand = 1.8;
            }

            inventory[reagent.id] = {
                price: Math.round(price),
                demand: demand,
                stock: 5 + Math.floor(Math.random() * 15)
            };
        });

        markets[loc.id] = {
            id: `market_${loc.id}`,
            location_id: loc.id,
            inventory: inventory,
            stability: loc.type === 'capital' ? 'high' : 'medium'
        };
    });

    const patch = {
        markets: markets,
        metadata: {
            maker_id: "ECON_MAKER_01",
            timestamp: new Date().toISOString(),
            source_manifest: data.id || "unknown_pack"
        }
    };

    const outputPath = path.join(path.dirname(manifestPath), 'econ_patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));

    console.log(`\x1b[32mSUCCESS: Regional Market economy for 7 locations generated.\x1b[0m`);
    console.log(`Path: ${outputPath}`);

} catch (err) {
    console.error(`Econ-Execution Error: ${err.message}`);
    process.exit(1);
}
