const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

/**
 * ALMAGEST DESKTOP EXECUTION SHELL (v1.0.0)
 * 
 * Manages the native lifecycle of the Construction Kit.
 * Native features:
 * - Direct Filesystem Manifest Access
 * - Window State Persistence
 * - Frameless 'Scholarly' Laboratory Mode
 */

const PROJECTS_ROOT = path.join(app.getAppPath(), 'projects');
const MODELS_ROOT = path.join(app.getAppPath(), 'models');

if (!fs.existsSync(PROJECTS_ROOT)) fs.mkdirSync(PROJECTS_ROOT, { recursive: true });
if (!fs.existsSync(MODELS_ROOT)) fs.mkdirSync(MODELS_ROOT, { recursive: true });

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    title: 'Almagest Construction Kit',
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#09090b', // zinc-950
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../public/favicon.svg') 
  });

  // Load the appropriate source based on environment
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // Open DevTools automatically in development
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    app.quit();
  });
}

// IPC Handlers for 'Machinery Integrator' native tasks
ipcMain.handle('read-manifest', async () => {
  const manifestPath = path.join(app.getAppPath(), 'src/data/manifest.json');
  try {
    const data = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Electron: Manifest read failure', err);
    return null;
  }
});

ipcMain.handle('list-projects', async () => {
  if (!fs.existsSync(PROJECTS_ROOT)) return [];
  
  try {
    const folders = fs.readdirSync(PROJECTS_ROOT);
    return folders.map(slug => {
      const manifestPath = path.join(PROJECTS_ROOT, slug, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        return { 
            slug, 
            name: data.description?.replace('Authoring Project: ', '') || slug, 
            manifest: data,
            makers: data.governance?.makers_active || [],
            reagentCount: data.reagents?.length || 0,
            portCount: data.locations?.length || 0,
            lastModified: fs.statSync(manifestPath).mtime
        };
      }
      return { slug, name: slug };
    });
  } catch (err) {
    console.error('Electron: Project list failure', err);
    return [];
  }
});

ipcMain.handle('list-corpus', async (event, projectSlug) => {
    const corpusPath = path.join(PROJECTS_ROOT, projectSlug, 'corpus');
    if (!fs.existsSync(corpusPath)) return [];
    try {
        const files = fs.readdirSync(corpusPath);
        return files.map(f => {
            const stats = fs.statSync(path.join(corpusPath, f));
            return { name: f, size: stats.size, lastModified: stats.mtime };
        });
    } catch (e) {
        return [];
    }
});

ipcMain.handle('extract-entities', async (event, { text }) => {
  try {
    await ensureLlama();
    const { LlamaChatSession } = await import('node-llama-cpp');
    const session = new LlamaChatSession({
      contextSequence: contextInstance.getSequence()
    });
    
    const extractionPrompt = `### SYSTEM: You are the Almagest Extraction Engine. Your task is to extract structured entities from scholarly text.
    
Output MUST be a JSON object with this structure:
{
  "reagents": [{ "name": "string", "description": "string", "volatility": 1-10 }],
  "locations": [{ "name": "string", "coordinates": [lat, lng], "description": "string" }],
  "encounters": [{ "title": "string", "description": "string" }]
}

Only return the JSON. No conversational filler.

### TEXT:
${text.slice(0, 2000)}

### JSON:`;

    const response = await session.prompt(extractionPrompt);
    // Cleanup response to find JSON if necessary
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { error: "Failed to extract structured JSON from scholarly response." };
  } catch (err) {
    console.error('Electron: Entity Extraction Failure', err);
    return { error: err.message };
  }
});

ipcMain.handle('read-project-manifest', async (event, slug) => {
  const manifestPath = path.join(PROJECTS_ROOT, slug, 'manifest.json');
  try {
    const data = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Electron: Project manifest read failure (${slug})`, err);
    return null;
  }
});

/**
 * AGENTIC SCHOLAR: Project Orchestration
 */
ipcMain.handle('create-project', async (event, { name, makers }) => {
  const projectSlug = name.toLowerCase().replace(/\s+/g, '-');
  const projectPath = path.join(PROJECTS_ROOT, projectSlug);
  
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
    fs.mkdirSync(path.join(projectPath, 'corpus'));
    fs.mkdirSync(path.join(projectPath, 'brains'));
    
    // Seed with a derivative manifest
    const baseManifest = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'src/data/manifest.json'), 'utf8'));
    baseManifest.id = projectSlug;
    baseManifest.description = `Authoring Project: ${name}`;
    baseManifest.governance = { ...baseManifest.governance, makers_active: makers };
    
    fs.writeFileSync(path.join(projectPath, 'manifest.json'), JSON.stringify(baseManifest, null, 2));
    return { success: true, path: projectPath };
  }
  return { success: false, error: 'Project already exists.' };
});

ipcMain.handle('delete-project', async (event, slug) => {
    const projectPath = path.join(PROJECTS_ROOT, slug);
    if (!fs.existsSync(projectPath)) return { success: false, error: 'Project not found.' };
    try {
        fs.rmSync(projectPath, { recursive: true, force: true });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

ipcMain.handle('save-asset', async (event, { project, name, data }) => {
    const assetsDir = path.join(PROJECTS_ROOT, project, 'brain', 'assets');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
    
    const filePath = path.join(assetsDir, `${name}.json`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return { success: true, path: filePath };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

ipcMain.handle('create-project', async (event, { name, slug }) => {
  const projectPath = path.join(PROJECTS_ROOT, slug);
  const corpusPath = path.join(projectPath, 'corpus');
  const brainPath = path.join(projectPath, 'brain');
  
  try {
    if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath, { recursive: true });
    if (!fs.existsSync(corpusPath)) fs.mkdirSync(corpusPath, { recursive: true });
    if (!fs.existsSync(brainPath)) fs.mkdirSync(brainPath, { recursive: true });
    
    const manifest = {
      id: slug,
      description: `Authoring Project: ${name}`,
      reagents: [],
      locations: [],
      governance: { makers_active: [] }
    };
    
    fs.writeFileSync(path.join(projectPath, 'manifest.json'), JSON.stringify(manifest, null, 2));
    return { success: true };
  } catch (err) {
    console.error('Electron: Project creation failure', err);
    return { success: false, error: err.message };
  }
});

const { dialog } = require('electron');

ipcMain.handle('select-document', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Manuscripts', extensions: ['txt', 'md', 'pdf'] }
    ]
  });
  
  if (result.canceled) return null;
  
  const filePath = result.filePaths[0];
  const stats = fs.statSync(filePath);
  return {
    path: filePath,
    name: path.basename(filePath),
    size: stats.size,
    lastModified: stats.mtime
  };
});

ipcMain.handle('read-document-text', async (event, { path: filePath }) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.pdf') {
       const pdf = require('pdf-parse');
       const dataBuffer = fs.readFileSync(filePath);
       const data = await pdf(dataBuffer);
       return data.text;
    }
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error('Electron: Document read failure', err);
    return `Error reading document: ${err.message}`;
  }
});

ipcMain.handle('load-pdf', async (event, { name, project, data, path: sourcePath }) => {
  const corpusPath = path.join(PROJECTS_ROOT, project, 'corpus', name);
  try {
    if (sourcePath) {
      // Direct copy if we have a source path
      fs.copyFileSync(sourcePath, corpusPath);
    } else {
      fs.writeFileSync(corpusPath, data);
    }
    console.log(`Electron: Scholarly Ingest Success -> ${corpusPath}`);
    return { success: true, path: corpusPath };
  } catch (err) {
    console.error('Electron: PDF Ingest Failure', err);
    return { success: false, error: err.message };
  }
});

let llamaInstance, modelInstance, contextInstance;

async function ensureLlama() {
  if (modelInstance) return;
  try {
    const { getLlama } = await import('node-llama-cpp');
    llamaInstance = await getLlama();
    const modelPath = path.join(__dirname, '..', 'models', 'Phi-3-mini-4k-instruct-q4.gguf');
    
    if (fs.existsSync(modelPath)) {
      modelInstance = await llamaInstance.loadModel({ modelPath });
      contextInstance = await modelInstance.createContext();
    }
  } catch (err) {
    console.error('Electron: Llama Initialization Failure', err);
  }
}

ipcMain.handle('query-llm', async (event, { provider, prompt }) => {
  if (provider === 'Resident Scholar (Local)') {
    try {
      await ensureLlama();
      if (!modelInstance) return { content: "Error: Local model file not found in /models/ directory." };
      
      const { LlamaChatSession } = await import('node-llama-cpp');
      const session = new LlamaChatSession({
        contextSequence: contextInstance.getSequence()
      });
      
      const response = await session.prompt(prompt);
      return { content: response };
    } catch (err) {
      console.error('Electron: Local Inference Failure', err);
      return { content: `Local Inference Failure: ${err.message}` };
    }
  }

  const endpoints = {
    'Ollama (Mistral-7B)': 'http://localhost:11434/api/generate',
    'LM Studio (Llama-3-8B)': 'http://localhost:1234/v1/chat/completions'
  };

  const endpoint = endpoints[provider];
  if (!endpoint) return { content: `Scholarly response from ${provider} (Simulated: No endpoint found).` };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(provider.includes('Ollama') ? { model: 'mistral', prompt, stream: false } : { 
        messages: [{ role: 'user', content: prompt }], 
        model: 'local-model' 
      })
    });
    
    if (response.ok) {
       const json = await response.json();
       return { content: json.response || json.choices?.[0]?.message?.content || 'Unintelligible scholarly response.' };
    }
    return { content: `Scholarly response from ${provider} (Endpoint unreachable).` };
  } catch (err) {
    console.error(`Electron: LLM Bridge Failure (${provider})`, err);
    return { content: `Scholarly response from ${provider} (Simulated fallback).` };
  }
});

const { exec } = require('child_process');

ipcMain.handle('run-maker', async (event, { maker, project }) => {
    const makerPath = path.join(app.getAppPath(), 'makers', `${maker}.cjs`);
    const projectPath = path.join(PROJECTS_ROOT, project);
    
    return new Promise((resolve) => {
        exec(`node "${makerPath}" "${projectPath}"`, (error, stdout, stderr) => {
            if (error) {
                resolve({ success: false, error: error.message });
                return;
            }
            resolve({ success: true, output: stdout });
        });
    });
});

ipcMain.handle('compile-scenario', async (event, { project }) => {
    const compileScript = path.join(app.getAppPath(), 'scripts', 'compile_manifest.cjs');
    const projectPath = path.join(PROJECTS_ROOT, project);
    
    return new Promise((resolve) => {
        exec(`node "${compileScript}" "${projectPath}"`, (error, stdout, stderr) => {
            if (error) {
                resolve({ success: false, error: error.message });
                return;
            }
            resolve({ success: true, output: stdout });
        });
    });
});

ipcMain.handle('list-models', async () => {
    if (!fs.existsSync(MODELS_ROOT)) return [];
    const files = fs.readdirSync(MODELS_ROOT);
    return files.filter(f => f.endsWith('.gguf')).map(f => ({
        name: f,
        path: path.join(MODELS_ROOT, f),
        size: fs.statSync(path.join(MODELS_ROOT, f)).size
    }));
});

ipcMain.handle('download-model', async (event, { url, name }) => {
    const dest = path.join(MODELS_ROOT, name);
    // In a real implementation, we would use a stream-based downloader.
    // Simulating success for this plan phase.
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.writeFileSync(dest, 'SIMULATED_GGUF_DATA');
            resolve({ success: true, path: dest });
        }, 1500);
    });
});

ipcMain.handle('export-to-desktop', async (event, { filename, content }) => {
    const desktopPath = path.join(os.homedir(), 'Desktop', filename);
    try {
        fs.writeFileSync(desktopPath, content);
        return { success: true, path: desktopPath };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
