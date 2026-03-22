const { contextBridge, ipcRenderer } = require('electron');

/**
 * ALMAGEST DESKTOP PRELOADER
 * 
 * Secure bridge between the Almagest React state and the native OS.
 * Exposes a sandboxed 'almagest' API to the frontend.
 */

contextBridge.exposeInMainWorld('almagest', {
  /**
   * Access the native file-system manifest directly.
   * This bypasses browser-tier latent loading for the Machinery Integrator.
   */
  readManifest: () => ipcRenderer.invoke('read-manifest'),

  /**
   * Identity & Env
   */
  isDesktop: true,
  version: '1.0.0-alpha',
  platform: process.platform,

  /**
   * AGENTIC SCHOLAR: Dynamic Project Orchestration
   * Secure IPC bridges for project creation, LLM queries, and PDF ingestion.
   */
  createProject: (params) => ipcRenderer.invoke('create-project', params),
  listProjects: () => ipcRenderer.invoke('list-projects'),
  deleteProject: (slug) => ipcRenderer.invoke('delete-project', slug),
  listCorpus: (slug) => ipcRenderer.invoke('list-corpus', slug),
  saveAsset: (params) => ipcRenderer.invoke('save-asset', params),
  exportToDesktop: (params) => ipcRenderer.invoke('export-to-desktop', params),
  listModels: () => ipcRenderer.invoke('list-models'),
  downloadModel: (params) => ipcRenderer.invoke('download-model', params),
  runMaker: (params) => ipcRenderer.invoke('run-maker', params),
  compileScenario: (params) => ipcRenderer.invoke('compile-scenario', params),
  readProjectManifest: (slug) => ipcRenderer.invoke('read-project-manifest', slug),
  loadPDF: (params) => ipcRenderer.invoke('load-pdf', params),
  queryLLM: (params) => ipcRenderer.invoke('query-llm', params),
  selectDocument: () => ipcRenderer.invoke('select-document'),
  readDocumentText: (params) => ipcRenderer.invoke('read-document-text', params),
  extractEntities: (params) => ipcRenderer.invoke('extract-entities', params),

  /**
   * Send audit results back to the local logs.
   */
  saveAuditLog: (log) => ipcRenderer.send('save-audit-log', log),
});
