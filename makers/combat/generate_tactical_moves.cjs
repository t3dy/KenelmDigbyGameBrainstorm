const fs = require('fs');
const path = require('path');

/**
 * Almagest Tactic-Maker (Tool #Combat-01)
 * 
 * Automates the generation of a moveset from historical alchemical reagents.
 * Status: Implemented
 */

const manifestPath = process.argv[2];

if (!manifestPath) {
    console.error("Usage: node makers/combat/generate_tactical_moves.cjs <path_to_manifest.json>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    if (!data.reagents || data.reagents.length === 0) {
        throw new Error("No reagents found in manifest to generate a moveset.");
    }

    // Mapping Logic: Reagent -> Move Archetype
    const combatMoves = data.reagents.map(r => {
        const id = r.id.toLowerCase();
        let move = {
            id: `move_${id}`,
            name: `${r.name} Discharge`,
            type: 'attack',
            damage: 20,
            reagent_cost: { [r.id]: 1 },
            message: `The Eagle fires a payload of ${r.name}.`,
            charge_time: 2
        };

        // Heuristic based on reagent name/description
        if (id.includes('vitriol')) {
            move.name = "Vitriolic Corrosive Burst";
            move.component_damage = 30; // Hull Focus
            move.message = "The enemy's hull smokes as the Vitriol eats the timber.";
        } else if (id.includes('nitre') || id.includes('sulfur')) {
            move.name = "Fulminating Volley";
            move.damage = 40; 
            move.message = "A deafening explosion rocks the enemy deck.";
        } else if (id.includes('sympathy') || id.includes('healing')) {
            move.name = "Sympathetic Remote Mend";
            move.type = "heal";
            move.damage = 0;
            move.power = 25;
            move.message = "Cracks in the Eagle's hull close through sympathetic attraction.";
        } else if (id.includes('antimony') || id.includes('mercury')) {
            move.name = "Metallic Poison Fog";
            move.type = "debuff";
            move.message = "The enemy crew falls into a lethargic stupor.";
        }

        return move;
    });

    const patch = {
        combat_moves: combatMoves,
        metadata: {
            maker_id: "TACTIC_MAKER_01",
            timestamp: new Date().toISOString(),
            source_manifest: data.id || "unknown_pack"
        }
    };

    const outputPath = path.join(path.dirname(manifestPath), 'tactical_patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));

    console.log(`\x1b[32mSUCCESS: Tactical moveset for ${combatMoves.length} reagents generated.\x1b[0m`);
    console.log(`Path: ${outputPath}`);

} catch (err) {
    console.error(`Tactic-Execution Error: ${err.message}`);
    process.exit(1);
}
