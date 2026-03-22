# ENVIRONMENT.md: Almagest Project Orchestration & LLM Integration

This report outlines the structural and philosophical evolution required to transform the **Almagest Construction Kit (ACK)** from a static dashboard into a **Dynamic Project Engine**.

## 1. Structural Evolution: The Project-Centric Workspace

To support "Start New Project" functionality, we are moving from a single-manifest codebase to a **Multitenant Workspace**.

### Revised Folder Architecture
```text
digby-game/
├── projects/               [NEW] User-created project directories
│   ├── project-alpha/
│   │   ├── manifest.json   <- Project-specific data contract
│   │   ├── corpus/         <- Ingested PDFs and text sources
│   │   └── brains/         <- Local LLM conversation states
├── src/
│   ├── components/
│   │   ├── kit/            <- Core Dashboard & Tooling
│   │   ├── authoring/      [NEW] "Start New Project" UI flow
│   │   └── intelligence/   [NEW] Local LLM & PDF Interface
├── electron/
│   ├── bridge/             [NEW] Native PDF parser & LLM socket logic
├── models/                 [NEW] Local model binaries (linkable)
└── storage/                [NEW] Persistence layer for project metadata
```

## 2. Updated Initialization & Planning Documents

The following documents will be synchronized with the new "Brainstorming" direction:

### A. Initialization Protocols (`init/`)
*   **Project Bootstrapper**: A new script `scripts/init-project.sh` to scaffold the `projects/` subdirectories.
*   **Asset Linker**: Automatic symlinking of common assets (icons, alchemical palettes) from the core `src/data` to new project folders.

### B. Planning Documents (`planning/`)
*   **[`CONSTRUCTION_KIT_SCOPE.md`](file:///C:/Users/PC/.gemini/antigravity/brain/e3e52694-f7c2-4b25-a04b-fe45173d4ae7/CONSTRUCTION_KIT_SCOPE.md)**: Expanded to include "Phase 3: The Agentic Scholar (Local LLM)".
*   **[`DESKTOP_PLAN.md`](file:///C:/Users/PC/.gemini/antigravity/brain/e3e52694-f7c2-4b25-a04b-fe45173d4ae7/DESKTOP_PLAN.md)**: Updated with IPC handlers for **PDF ingest** and **Ollama/LMStudio bridges**.

## 3. The "Start New Project" Logic Flow

The frontend will implement a **Wizard Pattern** for orchestration:

1.  **Identity Definition**: Title, Era (e.g., 1622), and Scholarly Objective.
2.  **Maker Selection**: Choose which "Makers" (Historical, Econ, Alchemical) to activate for the project.
3.  **Knowledge Ingestion**: Upload PDFs directly. Electron pre-processes these via `pdf-parse` or similar, extracting text into a `corpus/` folder.
4.  **Local LLM Linkage**: Selecting a local model (Ollama, LM Studio) to act as the "Project Philologist".

## 4. Native Interface: The PDF & LLM Bridge

Since we are in an **Electron environment**, we gain massive advantages over web-based tools:

*   **Native PDF Processing**: Bypassing CORS and upload limits to handle multi-hundred-page scholarly texts.
*   **Local LLM Socket**: The Electron main process maintains a permanent socket to local LLM providers, ensuring zero-latency brainstorming.
*   **Persistence**: Projects are saved as filesystem-ready folders, making them portable and version-controllable.

## 5. Implementation Roadmap for Phase 2

1.  **Build the Project Wizard**: React components for maker selection.
2.  **Implement IPC PDF Handlers**: Electron scripts to save and index PDF text.
3.  **Local LLM Connector**: A `useIntelligence` hook in React that speaks to the Electron bridge.
4.  **Unified File Registry**: Refactor `useGameStore` to support switching between the "System Default" manifest and "User Project" manifests.
