const fs = require('fs');
const path = require('path');

/**
 * Almagest Chrono-Maker (Tool #Loop-01)
 * 
 * Automates the generation of an event-schedule from a list of historical encounters.
 * Status: Implemented
 */

const manifestPath = process.argv[2];

if (!manifestPath) {
    console.error("Usage: node makers/loop/generate_chrono_schedule.cjs <path_to_manifest.json>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    if (!data.encounters || data.encounters.length === 0) {
        throw new Error("No encounters found in manifest to generate a schedule.");
    }

    // Sort encounters by date
    const sortedEncounters = [...data.encounters].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    // Map to Chrono Primitives
    const schedule = sortedEncounters.map((e, index) => {
        return {
            id: `sch_${e.id}`,
            frequency: 'once',
            trigger_date: e.date,
            action_id: e.id,
            type: 'mandatory'
        };
    });

    const patch = {
        chrono_schedule: schedule,
        metadata: {
            maker_id: "CHRONO_LOOP_01",
            timestamp: new Date().toISOString(),
            source_manifest: data.id || "unknown_pack"
        }
    };

    const outputPath = path.join(path.dirname(manifestPath), 'chrono_patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));

    console.log(`\x1b[32mSUCCESS: Chronological Spine for ${sortedEncounters.length} events generated.\x1b[0m`);
    console.log(`Path: ${outputPath}`);
    console.log(`Summary Node: October 1622 (Start) ➔ February 1628 (Active Range)`);

} catch (err) {
    console.error(`Chrono-Execution Error: ${err.message}`);
    process.exit(1);
}
