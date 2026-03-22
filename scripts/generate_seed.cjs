const fs = require('fs');
const path = require('path');

/**
 * Almagest Mechanic Seed Generator (Tool #02)
 * 
 * Automates the transition from Source Note (Research) to Mechanic Seed (Design).
 * Status: Implemented
 */

const notePath = process.argv[2];
const seedName = process.argv[3];

if (!notePath || !seedName) {
    console.error("Usage: node scripts/generate_seed.cjs <path_to_source_note.md> <seed_filename_no_ext>");
    process.exit(1);
}

try {
    const rawNote = fs.readFileSync(notePath, 'utf8');
    const templatePath = path.join(__dirname, '..', 'templates', 'MECHANIC_SEED_TEMPLATE.md');
    let template = fs.readFileSync(templatePath, 'utf8');

    // Simple heuristic-based placeholder extraction from the Source Note
    // Looking for the "Source Excerpt" block (wrapped in >)
    const excerptMatch = rawNote.match(/\*\*Source Excerpt\*\*:\s*> (.*)/i);
    const excerpt = excerptMatch ? excerptMatch[1] : "Manual Extraction Required";
    
    // Injecting into Seed Template
    const outputContent = template
        .replace('[NAME]', seedName.replace(/_/g, ' ').toUpperCase())
        .replace('[Relationship to the **Source Note**]', excerpt.slice(0, 100) + "...")
        .replace('[Detail 1]', "Scholarly Fact from Source Note")
        .replace('[Primitive]', "Encounter / Scene")
        .replace('[`manifest.json` path]', "encounters / scenes");

    const outputPath = path.join(__dirname, '..', 'source-pipeline', 'seeds', `${seedName}.md`);
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, outputContent);
    console.log(`\x1b[32mSUCCESS: Mechanic Seed created at ${outputPath}\x1b[0m`);
    console.log(`Next Step: Refine the primitive mapping and lineage selection before toolizing the Manifest update.`);

} catch (err) {
    console.error(`Execution Error: ${err.message}`);
    process.exit(1);
}
