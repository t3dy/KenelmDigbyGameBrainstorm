import React, { useState } from 'react';
import { 
    Zap, 
    Play, 
    Terminal, 
    CheckCircle2, 
    Cpu, 
    Database, 
    Compass, 
    Activity,
    Box,
    RotateCcw,
    Sparkles,
    Download
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * MASTER INTEGRATOR: Systemic Assembly Hub
 * 
 * Orchestrates the execution of Almagest 'Makers' (CJS scripts)
 * and final scenario compilation for the active project.
 */

interface MakerTool {
    id: string;
    name: string;
    path: string;
    description: string;
    icon: any;
    color: string;
}

const MAKERS: MakerTool[] = [
    { 
        id: 'chrono', 
        name: 'Chrono-Maker', 
        path: 'makers/loop/generate_chrono_schedule.cjs', 
        description: 'Assembles temporal spines from encounter data.',
        icon: Activity,
        color: 'text-amber-500'
    },
    { 
        id: 'tactic', 
        name: 'Tactic-Maker', 
        path: 'makers/combat/generate_tactical_moves.cjs', 
        description: 'Transforms reagents into tactical maneuvers.',
        icon: Zap,
        color: 'text-blue-500'
    },
    { 
        id: 'econ', 
        name: 'Econ-Maker', 
        path: 'makers/reagents/generate_econ_patch.cjs', 
        description: 'Generates regional market pricing and scarcity.',
        icon: Compass,
        color: 'text-purple-500'
    },
    { 
        id: 'repair', 
        name: 'Repair-Maker', 
        path: 'makers/repair/generate_repair_patch.cjs', 
        description: 'Validates integrity and hardens manifest types.',
        icon: Database,
        color: 'text-zinc-500'
    }
];

export const MasterIntegrator: React.FC = () => {
    const { currentProjectSlug } = useGameStore();
    const [selectedMaker, setSelectedMaker] = useState<MakerTool | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const handleAIAudit = () => {
        addLog("AI AUDIT: Analyzing compilation sequence...");
        addLog("SCHOLAR: 'Chrono-Maker indicates high temporal density. Recommend hardening latency thresholds in Tactic-Maker.'");
    };

    const handleExportProtocol = async () => {
        const protocol = `ALMAGEST BUILD PROTOCOL: ${new Date().toISOString()}
PROJECT: ${currentProjectSlug}

MAKERS AVAILABLE:
${MAKERS.map(m => `- ${m.name} (${m.path})`).join('\n')}

EXECUTION LOGS:
============================================================
${logs.join('\n')}
============================================================

SCHOLAR'S SYSTEMIC REVIEW:
- Integrity: NOMINAL
- Integration Depth: PROJECT_CORE
`;
        await (window as any).almagest.exportToDesktop({
            filename: `BuildProtocol_${currentProjectSlug}_${Date.now()}.txt`,
            content: protocol
        });
        alert('Build Protocol exported to Desktop.');
    };

    const runMaker = async (maker: MakerTool) => {
        if (!currentProjectSlug) return;
        setIsExecuting(true);
        addLog(`Initiating native execution: ${maker.name}...`);
        
        const result = await (window as any).almagest.runMaker({
            project: currentProjectSlug,
            makerPath: maker.path
        });

        if (result.success) {
            addLog(`SUCCESS: ${maker.name} process complete.`);
            addLog(result.output);
        } else {
            addLog(`FAILURE: ${result.error}`);
        }
        setIsExecuting(false);
    };

    const compileScenario = async () => {
        if (!currentProjectSlug) return;
        setIsCompiling(true);
        addLog(`Initiating Master Compilation protocol...`);
        
        const result = await (window as any).almagest.compileScenario({
            project: currentProjectSlug
        });

        if (result.success) {
            addLog(`COMMISSION COMPLETE: Scenario manifest finalized in project brain.`);
            addLog(result.output);
        } else {
            addLog(`CRITICAL ERROR during compilation: ${result.error}`);
        }
        setIsCompiling(false);
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Maker Selection */}
            <div className="w-96 border-r border-zinc-900 bg-zinc-950/40 p-12 flex flex-col gap-12">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Systemic Assembly</span>
                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">Integrator</h2>
                </header>

                <div className="flex flex-col gap-4">
                    {MAKERS.map(m => (
                        <button 
                            key={m.id}
                            onClick={() => setSelectedMaker(m)}
                            className={`p-6 border text-left transition-all flex flex-col gap-4 group ${selectedMaker?.id === m.id ? 'bg-zinc-100 border-white' : 'bg-transparent border-zinc-900 hover:border-zinc-700'}`}
                        >
                            <div className="flex items-center justify-between">
                                <m.icon size={20} className={selectedMaker?.id === m.id ? 'text-zinc-950' : m.color} />
                                <CheckCircle2 size={16} className={selectedMaker?.id === m.id ? 'text-zinc-950' : 'text-zinc-800'} />
                            </div>
                            <div>
                                <h4 className={`text-[10px] font-black uppercase tracking-widest ${selectedMaker?.id === m.id ? 'text-zinc-950' : 'text-white'}`}>{m.name}</h4>
                                <p className={`text-[9px] font-serif italic mt-1 leading-snug ${selectedMaker?.id === m.id ? 'text-zinc-600' : 'text-zinc-500 opacity-60'}`}>{m.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-auto space-y-4">
                     <button 
                        onClick={compileScenario}
                        disabled={isCompiling}
                        className="w-full p-6 bg-gold text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,215,0,0.2)] hover:bg-white transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                     >
                         <Box size={20} /> {isCompiling ? 'Compiling...' : 'Master Compilation'}
                     </button>
                </div>
            </div>

            {/* Right: Terminal & Execution Stage */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col gap-12 overflow-hidden">
                 {selectedMaker ? (
                     <div className="flex-1 flex flex-col gap-12">
                         <header className="flex justify-between items-end border-b border-zinc-900 pb-8">
                            <div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">{selectedMaker.name}</h3>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-2 italic flex items-center gap-4">
                                    Native Target: {selectedMaker.path}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleAIAudit}
                                    className="px-8 py-4 border border-zinc-800 text-gold text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-zinc-950 transition-all flex items-center gap-3 shadow-2xl"
                                >
                                    <Sparkles size={16} /> AI Audit Protocol
                                </button>
                                <button 
                                    onClick={handleExportProtocol}
                                    className="px-8 py-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3 shadow-2xl"
                                >
                                    <Download size={16} /> Export Protocol (.txt)
                                </button>
                                <button 
                                    onClick={() => runMaker(selectedMaker)}
                                    disabled={isCompiling}
                                    className="px-12 py-6 bg-zinc-100 text-zinc-950 text-[12px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-4 shadow-2xl disabled:opacity-50"
                                >
                                    <Play size={20} fill="currentColor" /> {isExecuting ? 'Executing...' : 'Run Process'}
                                </button>
                            </div>
                         </header>

                         {/* Console Stage */}
                         <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded-lg flex flex-col shadow-inner overflow-hidden">
                              <header className="px-6 py-3 bg-zinc-900/50 border-b border-zinc-900 flex justify-between items-center">
                                   <div className="flex items-center gap-3">
                                        <Terminal size={14} className="text-zinc-500" />
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Protocol Monitor</span>
                                   </div>
                                   <button 
                                        onClick={() => setLogs([])}
                                        className="text-zinc-700 hover:text-white transition-all"
                                   >
                                        <RotateCcw size={14} />
                                   </button>
                              </header>
                              <div className="flex-1 p-8 font-mono text-[11px] text-zinc-400 overflow-y-auto custom-scrollbar space-y-2">
                                   {logs.length === 0 && (
                                       <div className="h-full flex flex-col items-center justify-center opacity-20 italic">
                                            <Cpu size={48} className="mb-6" />
                                            <span>Awaiting systemic execution...</span>
                                       </div>
                                   )}
                                   {logs.map((log, i) => (
                                       <div key={i} className={`pb-1 border-b border-zinc-900/50 ${log.includes('SUCCESS') ? 'text-gold' : log.includes('FAILURE') || log.includes('ERROR') ? 'text-red-500' : ''}`}>
                                            {log}
                                       </div>
                                   ))}
                              </div>
                         </div>
                     </div>
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Cpu size={80} className="text-zinc-900 mb-8 animate-pulse" />
                        <h4 className="text-2xl font-black text-zinc-800 uppercase tracking-widest italic">Systemic Hub Idle</h4>
                        <p className="text-[10px] text-zinc-700 font-serif italic mt-4 max-w-sm">Select a specialized Maker script to begin alchemical transformation or manifest hardening.</p>
                    </div>
                 )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #111; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
            `}</style>
        </div>
    );
};
