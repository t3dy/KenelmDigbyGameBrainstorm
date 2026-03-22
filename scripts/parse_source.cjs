const fs = require('fs');
const path = require('path');

/**
 * Almagest Source Excerpt Parser (Tool #01)
 * 
 * Automates the conversion of raw text into structured Source Notes.
 * Status: Implemented
 */

const inputPath = process.argv[2];
const outputName = process.argv[3];

if (!inputPath || !outputName) {
    console.error("Usage: node scripts/parse_source.cjs <input_text_file> <output_filename_no_ext>");
    process.exit(1);
}

try {
    const rawText = fs.readFileSync(inputPath, 'utf8');
    const templatePath = path.join(__dirname, '..', 'templates', 'SOURCE_NOTE_TEMPLATE.md');
    let template = fs.readFileSync(templatePath, 'utf8');

    // Simple heuristic-based placeholder filling (intended for LLM-augmentation or manual refinement)
    // For now, this tool enforces the structure and places the raw text in the excerpt block.
    
    const timestamp = new Date().toISOString().split('T')[0];
    const outputContent = template
        .replace('[TOPIC]', outputName.replace(/_/g, ' ').toUpperCase())
        .replace('[Insert Text Here]', rawText.trim())
        .replace('[Page Number / Document ID]', `Auto-Generated: ${timestamp}`);

    const outputPath = path.join(__dirname, '..', 'source-pipeline', 'notes', `${outputName}.md`);
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, outputContent);
    console.log(`\x1b[32mSUCCESS: Source Note created at ${outputPath}\x1b[0m`);
    console.log(`Next Step: Manually refine the 'Key Historical Claims' and 'Primitives Inferred'.`);

} catch (err) {
    console.error(`Execution Error: ${err.message}`);
    process.exit(1);
}
