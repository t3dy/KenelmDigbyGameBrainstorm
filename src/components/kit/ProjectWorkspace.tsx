import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    PenTool, 
    FlaskConical, 
    Database, 
    ChevronRight, 
    Zap, 
    Plus, 
    Info, 
    ShieldAlert,
    Library,
    MessageSquare,
    Palette,
    Cpu,
    BrainCircuit,
    Compass
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';
import { ExplainerOverlay } from './ExplainerOverlay';
import { NarrativeSculptor } from './NarrativeSculptor';
import { AlchemyLab } from './AlchemyLab';
import { MarketSculptor } from './MarketSculptor';
import { CorpusBrowser } from './CorpusBrowser';
import { ScholarChat } from './ScholarChat';
import { AssetSculptor } from './AssetSculptor';
import { MasterIntegrator } from './MasterIntegrator';
import { ScholarsBrain } from './ScholarsBrain';
import { ScenarioMap } from './ScenarioMap';
import type { Reagent, FleetLocation } from '../../data/schema';

/**
 * PROJECT WORKSPACE: Authoring Interface
 * 
 * Hub for building specific components (Makers, Encounters, Reagents).
 * Integrates the 'ExplainerOverlay' for orientation.
 */

interface Workstation {
    id: string;
    title: string;
    description: string;
    icon: any;
    pillar: 'FF' | 'Ultima' | 'FTL' | 'Almagest';
    instructions: string[];
    aiPrompt?: string;
}

const WORKSTATIONS: Workstation[] = [
    { 
        id: 'narrative-maker', 
        title: 'Narrative Sculptor', 
        description: 'Build branching dialogue and character actions (FF-Pacing).', 
        icon: PenTool, 
        pillar: 'FF',
        instructions: [
            'Initialize a new Scene-ID in the manifest.',
            'Place actors on the coordinate grid (0-100 x/y).',
            'Sequence actions (Say, Move, Transition) in the Timeline.',
            'Use the "AI Script Doctor" button to refine your historical dialogue.'
        ],
        aiPrompt: 'Draft a dialogue for Kenelm Digby after failing an alchemical synthesis, tone: melancholic but resolute, use 17th-century vernacular.'
    },
    { 
        id: 'merchant-agent', 
        title: 'The Merchant Agent', 
        description: 'Configure market pricing, scarcity, and regional arbitrage (Ultima-Systemic).', 
        icon: Database, 
        pillar: 'Ultima',
        instructions: [
            'Define commodity-id and base_loyalty mapping.',
            'Assign scarcity triggers to global Reputation-Axes.',
            'Use "AI Seed" to generate historically accurate scarcity for specific ports.',
            'Test the "Wealth/Bounty" flow through the Simulator.'
        ],
        aiPrompt: 'Predict the scarcity of Mercury in a Mediterranean port during a plague outbreak, suggest 3 economic triggers.'
    },
    { 
        id: 'alchemy-lab', 
        title: 'Alchemy Integrator', 
        description: 'Design alchemical reagents, stability recipes, and synthesis (FTL-Crisis).', 
        icon: FlaskConical, 
        pillar: 'FTL',
        instructions: [
            'Register a new Reagent-ID with Potency/Instability caps.',
            'Define synthesis recipes using the "Mix-Logic" engine.',
            'Use "AI Predict" to forecast reaction stability and discover new recipes.',
            'Validate reagent decay logic through the Chrono-Schedule.'
        ],
        aiPrompt: 'Create a recipe for "Vitriol of Venus" combining Copper and Acid, including 3 instability triggers related to temperature.'
    },
    {
        id: 'corpus-browser',
        title: 'Corpus Browser',
        description: 'Browse, manage, and analyze ingested project manuscripts (Scholarly).',
        icon: Library,
        pillar: 'Almagest',
        instructions: [
            'Explore the /corpus/ directory of the active project.',
            'Click "Trigger Full Extraction" to ingest manuscript text.',
            'Use "AI Alchemical Synthesis" to automatically extract new project entities.',
            'Click "Incorporate into Manifest" to add AI findings to your project.'
        ],
        aiPrompt: 'Identify key themes in the attached OCR scraps from Digby\'s Journal, focus on mentions of "The Gunpowder Plot".'
    },
    {
        id: 'scholar-chat',
        title: 'Scholar Chat',
        description: 'Consult the agentic intelligence using project context and corpus (Agentic).',
        icon: MessageSquare,
        pillar: 'Almagest',
        instructions: [
            'Initiate direct dialogue with the Scholar Agent.',
            'Consult the current manifest (Reagents, Ports, Scenes).',
            'Point the Scholar at specific manuscripts using the attachment selector.',
            'Trigger complex data transformations via chat.'
        ],
        aiPrompt: 'Review the current manifest and identify 3 potential narrative contradictions between the reagent scarcity and the active scenes.'
    },
    {
        id: 'asset-sculptor',
        title: 'Asset Sculptor',
        description: 'Create pixel-art icons for reagents, ports, and actor busts (Visual).',
        icon: Palette,
        pillar: 'FF',
        instructions: [
            'Define a 16x16 or 32x32 icon on the grid.',
            'Use "AI Alchemical Suggest" to get visual inspiration for alchemical symbols.',
            'Preview the icon in game-scale (x4).',
            'Commit the asset to the project manifest.'
        ],
        aiPrompt: 'Describe a 16x16 pixel icon for a "Lunar Tincture" using only shades of Silver and Deep Purple.'
    },
    {
        id: 'master-integrator',
        title: 'Master Integrator',
        description: 'Automate alchemical maker scripts and compile scenario manifests (Systemic).',
        icon: Cpu,
        pillar: 'Almagest',
        instructions: [
            'Select a specialized Maker script (Chrono, Tactic, Econ).',
            'Initiate native execution via the Protocol Monitor.',
            'Review terminal logs for systemic validation.',
            'Trigger the "Master Compilation" for production delivery.'
        ],
        aiPrompt: 'Explain the purpose of the "Econ_Compiler" script in the context of a 1628 naval simulation.'
    },
    {
        id: 'scholars-brain',
        title: "Scholar's Brain",
        description: 'Manage locally integrated LLM models and hardware settings.', 
        icon: BrainCircuit,
        pillar: 'Almagest',
        instructions: [
            'Resident Scholar (Local) is the primary engine.',
            'Monitor inference confidence and hardware usage.',
            'Fetch GGUF models directly within the hub.',
            'Eliminate external software dependencies (Ollama).'
        ],
        aiPrompt: 'Benchmark the current Llama-3 model for 17th-century linguistic accuracy, provide a confidence score.'
    },
    {
        id: 'scenario-map',
        title: 'Scenario Map',
        description: 'Live spatial manifest visualizer for geographic tethers (Spatial).',
        icon: Compass,
        pillar: 'Ultima',
        instructions: [
            'Review the distribution of ports across the 1628 Mediterranean.',
            'Check Lat/Lon tethers for alchemical integrity.',
            'Use "AI Cartographic Survey" to analyze the strategic weight of your map.',
            'Contextualize every port in the project manifest.'
        ],
        aiPrompt: 'Suggest 5 strategic locations for "Smuggler Dens" between Scanderoon and Algiers based on maritime trade routes.'
    }
];

export const ProjectWorkspace: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showExplainer, setShowExplainer] = useState(true);
    const { manifest } = useGameStore();

    const activeStation = WORKSTATIONS.find(w => w.id === selectedId);

    return (
        <div className="flex-1 flex overflow-hidden -m-12 bg-[#050505]">
            {/* Workbench Navigation */}
            <aside className="w-80 border-r border-zinc-900 bg-zinc-950/50 p-8 flex flex-col gap-12">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Workspace</span>
                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">The Scriptorium</h2>
                </header>

                <div className="flex flex-col gap-4">
                    {WORKSTATIONS.map(station => (
                        <button 
                            key={station.id}
                            onClick={() => { setSelectedId(station.id); setShowExplainer(true); }}
                            className={`p-6 border text-left transition-all flex flex-col gap-4 group ${selectedId === station.id ? 'bg-zinc-100 border-white translate-x-3' : 'bg-transparent border-zinc-900 hover:border-zinc-700'}`}
                        >
                            <div className="flex items-center justify-between">
                                <station.icon size={20} className={selectedId === station.id ? 'text-zinc-950' : 'text-zinc-500'} />
                                <ChevronRight size={16} className={selectedId === station.id ? 'text-zinc-950' : 'text-zinc-700'} />
                            </div>
                            <div>
                                <h4 className={`text-[10px] font-black uppercase tracking-widest ${selectedId === station.id ? 'text-zinc-950' : 'text-white'}`}>{station.title}</h4>
                                <p className={`text-[9px] font-serif italic mt-1 leading-snug ${selectedId === station.id ? 'text-zinc-600' : 'text-zinc-500 opacity-60'}`}>{station.description}</p>
                            </div>
                        </button>
                    ))}
                    <button 
                        onClick={() => { setSelectedId('manifest-sculptor'); setShowExplainer(true); }}
                        className={`p-6 border text-left transition-all flex flex-col gap-4 group ${selectedId === 'manifest-sculptor' ? 'bg-zinc-100 border-white translate-x-3' : 'bg-amber-950/20 border-amber-900/40 hover:border-gold'}`}
                    >
                         <div className="flex items-center justify-between">
                             <Database size={20} className={selectedId === 'manifest-sculptor' ? 'text-zinc-950' : 'text-amber-500'} />
                             <ChevronRight size={16} className={selectedId === 'manifest-sculptor' ? 'text-zinc-950' : 'text-amber-900'} />
                         </div>
                         <div>
                             <h4 className={`text-[10px] font-black uppercase tracking-widest ${selectedId === 'manifest-sculptor' ? 'text-zinc-950' : 'text-gold'}`}>Manifest Sculptor</h4>
                             <p className={`text-[9px] font-serif italic mt-1 leading-snug ${selectedId === 'manifest-sculptor' ? 'text-zinc-600' : 'text-amber-500/60'}`}>Bridge the raw data contract with historical reality.</p>
                         </div>
                    </button>
                </div>

                <div className="mt-auto space-y-4">
                    <button className="w-full p-4 border border-zinc-800 text-[9px] font-black uppercase text-zinc-500 hover:text-white transition-all flex items-center justify-center gap-3">
                        <Plus size={14} /> Commit Changes
                    </button>
                    <button className="w-full p-4 bg-zinc-900 text-gold text-[9px] font-black uppercase text-center border border-zinc-800 flex items-center justify-center gap-3">
                        <Zap size={14} /> Validate Integrity
                    </button>
                </div>
            </aside>

            {/* Main Stage */}
            <main className="flex-1 overflow-hidden flex relative">
                <AnimatePresence mode="wait">
                    {selectedId === 'narrative-maker' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <NarrativeSculptor />
                         </div>
                    ) : selectedId === 'alchemy-lab' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <AlchemyLab />
                         </div>
                    ) : selectedId === 'merchant-agent' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <MarketSculptor />
                         </div>
                    ) : selectedId === 'corpus-browser' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <CorpusBrowser />
                         </div>
                    ) : selectedId === 'scholar-chat' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <ScholarChat />
                         </div>
                    ) : selectedId === 'asset-sculptor' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <AssetSculptor />
                         </div>
                    ) : selectedId === 'master-integrator' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <MasterIntegrator />
                         </div>
                    ) : selectedId === 'scholars-brain' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <ScholarsBrain />
                         </div>
                    ) : selectedId === 'scenario-map' ? (
                         <div className="flex-1 overflow-hidden flex">
                             <ScenarioMap />
                         </div>
                    ) : selectedId === 'manifest-sculptor' ? (
                        <motion.div 
                            key="manifest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col p-16 overflow-y-auto"
                        >
                             <header className="mb-12 border-b border-zinc-900 pb-8 flex justify-between items-end">
                                <div>
                                    <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">Manifest Sculptor</h2>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Current_Project_Revision: 1.0.0-Beta</p>
                                </div>
                                <button className="px-6 py-2 bg-gold text-zinc-950 text-[10px] font-black uppercase tracking-widest shadow-xl">Save Manifest</button>
                            </header>

                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase text-gold tracking-[0.4em] border-b border-zinc-900 pb-2">Active Reagents</h3>
                                    <div className="flex flex-col gap-2">
                                        {manifest?.reagents?.map((re: Reagent) => (
                                            <div key={re.id} className="p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between group hover:border-zinc-500 transition-all">
                                                <span className="text-xs font-bold font-serif text-white">{re.name}</span>
                                                <div className="flex gap-4">
                                                    <span className="text-[8px] font-mono text-zinc-600">ID: {re.id}</span>
                                                    <PenTool size={12} className="text-zinc-700 group-hover:text-zinc-300" />
                                                </div>
                                            </div>
                                        ))}
                                        <button className="p-4 border border-dashed border-zinc-800 text-[9px] font-black uppercase text-zinc-500 hover:text-white hover:border-gold transition-all text-center">
                                            + Register New Reagent
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase text-gold tracking-[0.4em] border-b border-zinc-900 pb-2">Port Configuration</h3>
                                    <div className="flex flex-col gap-2">
                                        {manifest?.locations?.map((loc: FleetLocation) => (
                                            <div key={loc.id} className="p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between group hover:border-zinc-500 transition-all">
                                                <span className="text-xs font-bold font-serif text-white">{loc.name}</span>
                                                <span className="text-[9px] font-mono text-amber-500 uppercase italic">{(loc as any).type || 'Standard'}</span>
                                            </div>
                                        ))}
                                        <button className="p-4 border border-dashed border-zinc-800 text-[9px] font-black uppercase text-zinc-500 hover:text-white hover:border-gold transition-all text-center">
                                            + Establish Port Location
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : selectedId ? (
                        <motion.div 
                            key={selectedId}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col overflow-y-auto p-16"
                        >
                            <header className="mb-16 border-b border-zinc-900 pb-12 flex justify-between items-end">
                                <div>
                                    <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">{activeStation?.title}</h2>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Operating_System :: Revision_04</p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setShowExplainer(!showExplainer)} className={`p-4 rounded-full border transition-all ${showExplainer ? 'bg-zinc-100 text-zinc-950 border-white' : 'bg-transparent border-zinc-800 text-zinc-500 hover:text-white'}`}>
                                        <Info size={16} />
                                    </button>
                                </div>
                            </header>

                            {/* Authoring Placeholder */}
                            <div className="flex-1 border-2 border-dashed border-zinc-900 rounded-lg flex flex-col items-center justify-center text-center p-24 bg-zinc-950/20">
                                <BrainCircuit size={64} className="text-zinc-800 mb-8 animate-pulse" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-400">Station Awaiting Connection</h3>
                                <p className="text-[10px] text-zinc-600 mt-4 max-w-sm font-serif italic">
                                    "The modules are primed. Open the Orientation Layer via the (i) icon in the header to view the alchemical operations and AI prompt patterns for this domain."
                                </p>
                                <button 
                                    onClick={() => setShowExplainer(true)}
                                    className="mt-12 px-12 py-4 bg-zinc-100 text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-2xl flex items-center gap-3"
                                >
                                    <Info size={14} /> Open Orientation
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 italic font-serif">
                             <ShieldAlert size={64} className="mb-6" />
                             <p className="text-2xl">"Select a workstation to begin your authorship."</p>
                             <p className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gold/50 tracking-[0.5em]">BUFFER_IDLE</p>
                        </div>
                    )}
                </AnimatePresence>

                {/* Integrated Explainer Sidebar */}
                <AnimatePresence>
                    {selectedId && showExplainer && (
                        <ExplainerOverlay 
                             id={activeStation!.id}
                             title={activeStation!.title}
                             description={activeStation!.description}
                             pillar={activeStation!.pillar}
                             instructions={activeStation!.instructions}
                             onClose={() => setShowExplainer(false)}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};
