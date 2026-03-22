const fs = require('fs');
const path = require('path');

/**
 * Almagest Machinery Integrator (Tool #51)
 * 
 * Merges Chrono, Tactical, and Repair patches into the Scenario Manifest.
 * Status: Implemented
 */

const manifestPath = process.argv[2];

if (!manifestPath) {
    console.error("Usage: node scripts/integrate_machinery.cjs <path_to_manifest.json>");
    process.exit(1);
}

const dir = path.dirname(manifestPath);
const chronoPatch = path.join(dir, 'chrono_patch.json');
const tacticalPatch = path.join(dir, 'tactical_patch.json');
const repairPatch = path.join(dir, 'repair_patch.json');
const dedupPatch = path.join(dir, 'dedup_patch.json');
const econPatch = path.join(dir, 'econ_patch.json');
const governancePatch = path.join(dir, 'governance_patch.json');

try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // 0. Deduplication Pass (ID Re-indexing)
    if (fs.existsSync(dedupPatch)) {
        const patch = JSON.parse(fs.readFileSync(dedupPatch, 'utf8'));
        (patch.repairs || []).forEach(rep => {
            const col = `${rep.type}s`;
            if (manifest[col] && manifest[col][rep.index]) {
                manifest[col][rep.index].id = rep.newId;
            }
        });
        console.log(`- Applied ${patch.repairs.length} Dedup Re-indexes.`);
    }

    // 1. Apply Repairs (Attribute fixes)
    if (fs.existsSync(repairPatch)) {
        const patch = JSON.parse(fs.readFileSync(repairPatch, 'utf8'));
        (patch.repairs || []).forEach(rep => {
            if (rep.type === 'scene') {
                const scene = (manifest.scenes || []).find(s => s.id === rep.id);
                if (scene) scene[rep.property] = rep.new;
            }
        });
        console.log(`- Applied ${patch.repairs.length} Repairs.`);
    }

    // 2. Integrate Chrono Schedule
    if (fs.existsSync(chronoPatch)) {
        const patch = JSON.parse(fs.readFileSync(chronoPatch, 'utf8'));
        manifest.chrono_schedule = patch.chrono_schedule;
        console.log(`- Integrated ${patch.chrono_schedule.length} Schedule Nodes.`);
    }

    // 3. Integrate Combat Moves
    if (fs.existsSync(tacticalPatch)) {
        const patch = JSON.parse(fs.readFileSync(tacticalPatch, 'utf8'));
        manifest.combat_moves = patch.combat_moves;
        console.log(`- Integrated ${patch.combat_moves.length} Tactical Moves.`);
    }

    // 4. Integrate Markets (Econ)
    if (fs.existsSync(econPatch)) {
        const patch = JSON.parse(fs.readFileSync(econPatch, 'utf8'));
        manifest.markets = patch.markets;
        console.log(`- Integrated Regional Markets.`);
    }

    // 5. Integrate Governance Metadata
    if (fs.existsSync(governancePatch)) {
        const patch = JSON.parse(fs.readFileSync(governancePatch, 'utf8'));
        manifest.governance = patch.governance;
        console.log(`- Integrated Scholarly Coverage Dashboard (${patch.governance.scholarly_coverage}%).`);
    }

    // Save final manifest
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\x1b[32mSUCCESS: Machinery successfully integrated into ${manifestPath}\x1b[0m`);

} catch (err) {
    console.error(`Integration Error: ${err.message}`);
    process.exit(1);
}
