const fs = require('fs');
const path = require('path');

/**
 * Almagest Scenario Pack Linter (Tool #27)
 * 
 * Validates a Scenario Pack JSON against the Primitive Registry rules.
 * Status: Implemented
 */

const targetPath = process.argv[2];

if (!targetPath) {
    console.error("Usage: node scripts/lint_scenario.cjs <path_to_manifest.json>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const report = {
        scan_id: data.id || 'unnamed_scenario',
        timestamp: new Date().toISOString(),
        errors: [],
        warnings: [],
        stats: {
            locations: data.locations?.length || 0,
            encounters: data.encounters?.length || 0,
            reagents: data.reagents?.length || 0,
            assets: Object.keys(data.assets || {}).length || 0
        }
    };

    // 1. Mandatory Root Fields
    const mandatory = ['id', 'description'];
    mandatory.forEach(field => {
        if (!data[field]) report.errors.push(`Missing mandatory root field: ${field}`);
    });

    // 2. Strict Type Validation (The 'Serious' Mandate)
    const validJurisdictions = new Set(['ottoman', 'venetian', 'english', 'papal', 'neutral']);
    const validBackgrounds = new Set(['eagle_deck', 'milos_refuge', 'scanderoon_clash', 'gresham_library', 'london_studio', 'christ_church', 'florence_court', 'algiers_port', 'med_sea_passage']);
    const validSprites = new Set(['digby', 'venetia', 'sailor', 'scholar', 'spirit', 'official']);
    const validEncounterTypes = new Set(['naval', 'alchemy', 'diplomatic', 'romance', 'scholarly']);
    const validLocationTypes = new Set(['port', 'capital', 'refuge', 'battleground', 'sea_lane']);

    (data.locations || []).forEach(l => {
        if (l.jurisdiction && !validJurisdictions.has(l.jurisdiction)) {
            report.errors.push(`Location '${l.id}' has invalid jurisdiction: '${l.jurisdiction}'`);
        }
        if (l.type && !validLocationTypes.has(l.type)) {
            report.errors.push(`Location '${l.id}' has invalid type: '${l.type}'`);
        }
    });

    (data.encounters || []).forEach(e => {
        if (e.type && !validEncounterTypes.has(e.type)) {
            report.errors.push(`Encounter '${e.id}' has invalid type: '${e.type}'`);
        }
    });

    (data.scenes || []).forEach(s => {
        if (s.background && !validBackgrounds.has(s.background)) {
            report.errors.push(`Scene '${s.id}' has invalid background: '${s.background}'`);
        }
        (s.actors || []).forEach(a => {
            if (a.spriteType && !validSprites.has(a.spriteType)) {
                report.errors.push(`Scene '${s.id}' actor '${a.id}' has invalid spriteType: '${a.spriteType}'`);
            }
        });
    });

    // 3. ID Reference Integrity (Locations -> Encounters)
    const locationIds = new Set((data.locations || []).map(l => l.id));
    (data.encounters || []).forEach(e => {
        if (e.location && !locationIds.has(e.location)) {
            report.errors.push(`Encounter '${e.id}' references non-existent location ID: '${e.location}'`);
        }
    });

    // 4. Asset Integrity (Reagents -> Assets)
    const assetIds = new Set(Object.keys(data.assets || {}));
    (data.reagents || []).forEach(r => {
        if (r.iconId && !assetIds.has(r.iconId)) {
            report.warnings.push(`Reagent '${r.id}' references missing asset ID: '${r.iconId}'`);
        }
    });

    // Output Result
    console.log("=== Almagest Scenario Lint Report ===");
    console.log(`ID: ${report.scan_id}`);
    console.log(`Summary: ${report.stats.locations} Locations, ${report.stats.encounters} Encounters`);
    
    if (report.errors.length === 0 && report.warnings.length === 0) {
        console.log("\x1b[32mPASS: No structural defects found.\x1b[0m");
    } else {
        if (report.errors.length > 0) {
            console.log(`\x1b[31mFAILED: ${report.errors.length} errors found.\x1b[0m`);
            report.errors.forEach(err => console.log(` - ERROR: ${err}`));
        }
        if (report.warnings.length > 0) {
            console.log(`\x1b[33mWARNING: ${report.warnings.length} warnings found.\x1b[0m`);
            report.warnings.forEach(wrn => console.log(` - WARN: ${wrn}`));
        }
    }

    // Write report artifact
    const reportPath = path.join(path.dirname(targetPath), 'lint_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Report written to: ${reportPath}`);

} catch (err) {
    console.error(`Execution Error: ${err.message}`);
    process.exit(1);
}
