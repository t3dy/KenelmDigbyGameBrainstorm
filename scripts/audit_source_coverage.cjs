const fs = require('fs');
const path = require('path');

/**
 * Almagest Source Coverage Validator (Tool #26)
 * 
 * Audits the relationship between historical Source Notes and the Scenario Manifest.
 * Status: Implemented
 */

const notesDir = path.join(__dirname, '..', 'source-pipeline', 'notes');
const manifestPath = path.join(__dirname, '..', 'scenario-packs', 'digby-1628', 'manifest.json');

if (!fs.existsSync(notesDir) || !fs.existsSync(manifestPath)) {
    console.error("Error: Missing source notes directory or manifest file.");
    process.exit(1);
}

try {
    const noteFiles = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    const sourceIds = noteFiles.map(f => path.basename(f, '.md'));
    const manifestNodes = [
        ...(manifest.encounters || []),
        ...(manifest.locations || []),
        ...(manifest.scenes || [])
    ];

    const coveredSources = new Set();
    const unprovenancedNodes = [];

    manifestNodes.forEach(node => {
        const prov = node.provenance || "";
        if (prov && sourceIds.includes(prov)) {
            coveredSources.add(prov);
        } else if (prov) {
            // Provenance provided but no matching file
            unprovenancedNodes.push(`${node.id} -> BROKEN_LINK (${prov})`);
        } else {
            // Check if ID matches a source name roughly
            const match = sourceIds.find(id => node.id.includes(id.toLowerCase()));
            if (match) {
                coveredSources.add(match);
            } else {
                unprovenancedNodes.push(`${node.id} -> MISSING_PROVENANCE`);
            }
        }
    });

    const uncoveredSources = sourceIds.filter(id => !coveredSources.has(id));

    console.log(`=== Almagest Source Coverage Audit ===`);
    console.log(`Sources Found: ${sourceIds.length}`);
    console.log(`Manifest Nodes: ${manifestNodes.length}`);
    console.log(`\x1b[32mCovered Sources (${coveredSources.size}):\x1b[0m`);
    coveredSources.forEach(s => console.log(` - [OK] ${s}`));
    
    console.log(`\n\x1b[31mUncovered Sources (${uncoveredSources.length}):\x1b[0m`);
    uncoveredSources.forEach(s => console.log(` - [!] ${s}`));
    
    console.log(`\n\x1b[33mUnprovenanced Manifest Nodes (${unprovenancedNodes.length}):\x1b[0m`);
    unprovenancedNodes.forEach(n => console.log(` - [?] ${n}`));

    const coverage = parseFloat(((coveredSources.size / sourceIds.length) * 100).toFixed(1));
    console.log(`\nFinal Coverage Score: ${coverage}%`);

    const patch = {
        governance: {
            scholarly_coverage: coverage,
            last_audit: new Date().toISOString(),
            unprovenanced_count: unprovenancedNodes.length
        }
    };

    const outputPath = path.join(path.dirname(manifestPath), 'governance_patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));
    console.log(`Governance Dashboard Patch generated at: ${outputPath}`);

} catch (err) {
    console.error(`Audit Error: ${err.message}`);
    process.exit(1);
}
