const fs = require('fs');
const path = require('path');

/**
 * Almagest Scene Skeleton Generator (Tool #11)
 * 
 * Automates the creation of visual Scene data from a validated Encounter ID.
 * Status: Implemented
 */

const manifestPath = process.argv[2];
const encounterId = process.argv[3];

if (!manifestPath || !encounterId) {
    console.error("Usage: node scripts/generate_scene.cjs <path_to_manifest.json> <encounter_id>");
    process.exit(1);
}

try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Find matching encounter
    const encounter = (data.encounters || []).find(e => e.id === encounterId);
    if (!encounter) {
        throw new Error(`Encounter '${encounterId}' not found in manifest.`);
    }

    // Check if scene already exists
    const sceneId = `scene_${encounterId}`;
    if ((data.scenes || []).some(s => s.id === sceneId)) {
        console.warn(`Warning: Scene '${sceneId}' already exists. Overwriting.`);
    }

    // Create Skeleton
    const newScene = {
        id: sceneId,
        background: 'gresham_library', // Default until background mapping tool exists
        actors: [
            { id: 'kenelm', startX: 5, startY: 8, spriteType: 'digby' }
        ],
        timeline: [
            { type: 'say', actorId: 'kenelm', text: encounter.description },
            { type: 'emote', actorId: 'kenelm', emotion: 'idea', duration: 2000 }
        ]
    };

    // Filter out existing and add new
    data.scenes = (data.scenes || []).filter(s => s.id !== sceneId);
    data.scenes.push(newScene);

    // Save
    fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2));
    
    console.log(`\x1b[32mSUCCESS: Scene Skeleton '${sceneId}' generated in ${manifestPath}\x1b[0m`);
    console.log(`Action: Edit the 'timeline' for dramatic pacing.`);

} catch (err) {
    console.error(`Execution Error: ${err.message}`);
    process.exit(1);
}
