const path = require('path');

async function testInference() {
    console.log('Scholarly Initialization: Loading Native GGUF via ESM Import...');
    const { getLlama, LlamaChatSession } = await import('node-llama-cpp');
    
    const llama = await getLlama();
    const model = await llama.loadModel({
        modelPath: path.join(__dirname, '..', 'models', 'Phi-3-mini-4k-instruct-q4.gguf')
    });

    const context = await model.createContext();
    const session = new LlamaChatSession({
        contextSequence: context.getSequence()
    });

    console.log('Dialogue Initiated. Prompting scholar...');
    const result = await session.prompt("Draft a 17th-century dialogue for Kenelm Digby after failing an alchemical synthesis.", {
        onToken: (tokens) => {
            const tokenStr = model.detokenize(tokens);
            process.stdout.write(tokenStr);
        }
    });
    
    console.log('\n-------------------');
    console.log('Inference Complete.');
    console.log('-------------------');
}

testInference().catch(console.error);
