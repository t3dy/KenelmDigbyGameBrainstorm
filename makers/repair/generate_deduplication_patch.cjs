const fs = require('fs');
const path = require('path');

/**
 * Almagest Deduplication Maker (Tool #52)
 * 
 * Identifies and rectifies ID collisions in the Scenario Manifest.
 * Status: Implemented
 */

const manifestPath = process.argv[2];

if (!manifestPath) {
    console.error("Usage: node makers/repair/generate_deduplication_patch.cjs <path_to_manifest.json>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const collections = ['encounters', 'locations', 'scenes', 'reagents'];
    const idMap = new Map();
    const repairNodes = [];

    collections.forEach(col => {
        (data[col] || []).forEach((item, index) => {
            if (idMap.has(item.id)) {
                // Collision found!
                const oldId = item.id;
                const newId = `${oldId}_${index}`;
                
                repairNodes.push({
                    type: col.slice(0, -1), // e.g. encounter, location
                    index: index,
                    oldId: oldId,
                    newId: newId,
                    property: 'id'
                });
                
                console.log(`\x1b[33mCollision Found: ${oldId} in ${col}. Automated Rename: ${newId}\x1b[0m`);
            } else {
                idMap.set(item.id, true);
            }
        });
    });

    const patch = {
        repairs: repairNodes,
        metadata: {
            maker_id: "DEDUPLICATION_MAKER_52",
            timestamp: new Date().toISOString()
        }
    };

    const outputPath = path.join(path.dirname(manifestPath), 'dedup_patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));

    console.log(`\x1b[32mSUCCESS: Deduplication patch for ${repairNodes.length} collisions generated.\x1b[0m`);

} catch (err) {
    console.error(`Dedup-Execution Error: ${err.message}`);
    process.exit(1);
}
