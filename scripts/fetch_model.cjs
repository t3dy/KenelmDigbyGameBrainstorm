const fs = require('fs');
const https = require('https');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MODEL_DIR = path.join(ROOT, 'models');
if (!fs.existsSync(MODEL_DIR)) fs.mkdirSync(MODEL_DIR);

const MODEL_PATH = path.join(MODEL_DIR, 'Phi-3-mini-4k-instruct-q4.gguf');
const URL = 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q4.gguf';

if (fs.existsSync(MODEL_PATH)) {
    console.log(`Model already resident at ${MODEL_PATH}`);
    process.exit(0);
}

console.log(`Scholarly Fetch: ${URL} -> ${MODEL_PATH}`);

const file = fs.createWriteStream(MODEL_PATH);
https.get(URL, (response) => {
    if (response.statusCode !== 200) {
        if (response.statusCode === 302) {
             // Handle redirect
             https.get(response.headers.location, (redirectResponse) => {
                 redirectResponse.pipe(file);
             });
        } else {
             console.error(`Fetch Failure: Status Code ${response.statusCode}`);
             process.exit(1);
        }
    } else {
        response.pipe(file);
    }

    file.on('finish', () => {
        file.close();
        console.log('Ingest Success: Native model resident.');
    });
}).on('error', (err) => {
    fs.unlink(MODEL_PATH, () => {});
    console.error(`Fetch Error: ${err.message}`);
});
