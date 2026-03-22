const fs = require('fs');
const path = require('path');

/**
 * Almagest Repair-Maker (Tool #Repair-01)
 * 
 * Automates the rectification of manifest lint errors by mapping invalid data to valid literals.
 * Status: Implemented
 */

const manifestPath = process.argv[2];
const reportPath = process.argv[3];

if (!manifestPath || !reportPath) {
    console.error("Usage: node makers/repair/generate_repair_patch.cjs <path_to_manifest.json> <path_to_lint_report.json>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    if (!report.errors || report.errors.length === 0) {
        console.log("No errors found in lint report. No repair patch needed.");
        process.exit(0);
    }

    const validBackgrounds = ['eagle_deck', 'milos_refuge', 'scanderoon_clash', 'gresham_library', 'london_studio', 'christ_church', 'florence_court', 'algiers_port', 'med_sea_passage'];
    
    // Create Repair Object
    const repairNodes = [];

    report.errors.forEach(err => {
        // Simple mapping for background errors: 
        // ERROR: Scene '1603_everard_legacy' has invalid background: 'london_prison'
        const match = err.match(/Scene '(.*)' has invalid background: '(.*)'/);
        if (match) {
            const sceneId = match[1];
            const invalidVal = match[2];
            
            // Heuristic Fixes
            let replacement = 'eagle_deck'; // Default
            if (invalidVal.includes('london') || invalidVal.includes('gresham')) replacement = 'gresham_library';
            if (invalidVal.includes('madrid') || invalidVal.includes('scanderoon')) replacement = 'scanderoon_clash';
            if (invalidVal.includes('italy') || invalidVal.includes('florence')) replacement = 'florence_court';
            if (invalidVal.includes('algiers') || invalidVal.includes('port')) replacement = 'algiers_port';

            repairNodes.push({
                type: 'scene',
                id: sceneId,
                property: 'background',
                old: invalidVal,
                new: replacement
            });
        }
    });

    const patch = {
        repairs: repairNodes,
        metadata: {
            maker_id: "REPAIR_MAKER_01",
            timestamp: new Date().toISOString(),
            source_report: reportPath
        }
    };

    const outputPath = path.join(path.dirname(manifestPath), 'repair_patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));

    console.log(`\x1b[32mSUCCESS: Repair patch for ${repairNodes.length} errors generated.\x1b[0m`);
    console.log(`Path: ${outputPath}`);

} catch (err) {
    console.error(`Repair-Execution Error: ${err.message}`);
    process.exit(1);
}
