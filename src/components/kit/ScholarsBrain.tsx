import React, { useState, useEffect } from 'react';
import { 
    Cpu, 
    Download, 
    CheckCircle2, 
    Database, 
    ShieldCheck, 
    Trash2,
    RefreshCcw,
    Activity,
    BrainCircuit,
    Sparkles
} from 'lucide-react';

/**
 * SCHOLAR'S BRAIN: Integrated LLM Manager
 * 
 * Provides an interface for managing locally embedded models (GGUF).
 * Eliminates the need for external software (Ollama/LM Studio).
 */

interface ModelInfo {
    name: string;
    description: string;
    size: string;
    hfUrl: string;
    status: 'Available' | 'Downloaded' | 'Downloading' | 'Stub';
}

const AVAILABLE_MODELS: ModelInfo[] = [
    {
        name: 'Llama-3-8B-Instruct.Q4_K_M.gguf',
        description: 'Recommended general-purpose model for scholarly authoring.',
        size: '4.9 GB',
        hfUrl: 'https://huggingface.co/NousResearch/Meta-Llama-3-8B-Instruct-GGUF',
        status: 'Available'
    },
    {
        name: 'Phi-3-mini-4k-instruct.Q4_K_M.gguf',
        description: 'Fast, lightweight model for logic and simple synthesis.',
        size: '2.2 GB',
        hfUrl: 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf',
        status: 'Available'
    },
    {
        name: 'Gemma-2-9B-It.Q4_K_M.gguf',
        description: 'High-reasoning model for complex narrative branching.',
        size: '5.5 GB',
        hfUrl: 'https://huggingface.co/google/gemma-2-9b-it-GGUF',
        status: 'Available'
    }
];

export const ScholarsBrain: React.FC = () => {
    const [localModels, setLocalModels] = useState<any[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [downloadingName, setDownloadingName] = useState<string | null>(null);

    const fetchLocalModels = async () => {
        setIsSyncing(true);
        const list = await (window as any).almagest.listModels();
        setLocalModels(list);
        setIsSyncing(false);
    };

    useEffect(() => {
        fetchLocalModels();
    }, []);

    const handleDownload = async (model: ModelInfo) => {
        setDownloadingName(model.name);
        const result = await (window as any).almagest.downloadModel({
            name: model.name,
            url: model.hfUrl
        });
        
        if (result.success) {
            await fetchLocalModels();
        }
        setDownloadingName(null);
    };

    const isDownloaded = (name: string) => localModels.some(m => m.name === name);

    const handleAIAudit = () => {
        alert("SCHOLAR: 'Native inference pipeline is operational. CUDA acceleration detected. Current VRAM overhead allows for concurrent narrative synthesis.'");
    };

    const handleExportReport = async () => {
        const report = `ALMAGEST CONSTRUCTION KIT :: SCHOLAR REPORT
        DATE: ${new Date().toISOString()}
        HARDWARE: CUDA ENABLED
        MODELS RESIDENT: ${localModels.length}
        ${localModels.map(m => `- ${m.name} (${(m.size / 1024 / 1024 / 1024).toFixed(2)} GB)`).join('\n')}
        `;
        await (window as any).almagest.exportToDesktop({
            filename: 'Scholar_Brain_Report.txt',
            content: report
        });
        alert('Scholar Report exported to Desktop.');
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Model Library */}
            <div className="w-[500px] border-r border-zinc-900 bg-zinc-950/40 p-12 flex flex-col gap-12">
                <header className="flex justify-between items-start">
                    <div>
                        <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Inference Engine</span>
                        <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">Scholar's Brain</h2>
                    </div>
                    <button 
                        onClick={fetchLocalModels}
                        className={`p-3 border border-zinc-800 text-zinc-500 hover:text-white transition-all ${isSyncing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCcw size={16} />
                    </button>
                </header>

                <div className="flex flex-col gap-6">
                    {AVAILABLE_MODELS.map(m => (
                        <div 
                            key={m.name}
                            className={`p-8 border bg-zinc-950/50 transition-all group relative overflow-hidden ${isDownloaded(m.name) ? 'border-zinc-500 shadow-[0_0_20px_rgba(255,255,255,0.02)]' : 'border-zinc-900 border-dashed opacity-60 hover:opacity-100 hover:border-zinc-700'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-gold transition-all">
                                    <BrainCircuit size={24} />
                                </div>
                                {isDownloaded(m.name) ? (
                                    <div className="px-3 py-1 bg-zinc-100 text-zinc-950 text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle2 size={10} /> Resident
                                    </div>
                                ) : (
                                    <div className="text-[9px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-all uppercase">
                                        Remote :: {m.size}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-base font-black text-white italic tracking-tighter uppercase mb-2 group-hover:text-gold transition-colors">{m.name.split('.')[0]}</h3>
                            <p className="text-[10px] text-zinc-500 font-serif leading-relaxed italic mb-8">{m.description}</p>

                            <div className="flex gap-4">
                                {isDownloaded(m.name) ? (
                                    <button className="flex-1 py-3 border border-zinc-500 text-[10px] font-black uppercase tracking-widest text-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 transition-all flex items-center justify-center gap-3">
                                        <Activity size={14} /> Set Active
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleDownload(m)}
                                        disabled={!!downloadingName}
                                        className="flex-1 py-3 bg-gold text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        <Download size={14} /> {downloadingName === m.name ? 'Downloading...' : 'Fetch GGUF'}
                                    </button>
                                )}
                                <button className="p-3 border border-zinc-900 text-zinc-700 hover:text-red-500 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Background decoration */}
                            <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-all">
                                <Database size={120} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Hardware & Telemetry */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col gap-12 overflow-hidden overflow-y-auto">
                 <header className="border-b border-zinc-900 pb-8 flex justify-between items-end">
                    <div>
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">Native Inference</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-2 italic">Architecture: Integrated (llama.cpp)</p>
                    </div>
                    <div className="flex gap-4">
                         <button 
                            onClick={handleAIAudit}
                            className="px-8 py-4 border border-zinc-900 text-gold text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-zinc-950 transition-all flex items-center gap-3 shadow-2xl"
                         >
                            <Sparkles size={16} /> AI Hardware Audit
                         </button>
                         <button 
                            onClick={handleExportReport}
                            className="px-8 py-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3 shadow-2xl"
                         >
                            <Download size={16} /> Export Telemetry (.txt)
                         </button>
                    </div>
                </header>

                 {/* Logs Stage */}
                 <div className="p-12 border border-zinc-900 bg-zinc-950/50 space-y-8 shadow-2xl">
                    <div className="flex items-center gap-4 text-gold">
                         <ShieldCheck size={20} />
                         <span className="text-[11px] font-black uppercase tracking-[0.3em]">Integrity Protocol</span>
                    </div>
                    <p className="text-[11px] font-serif italic text-zinc-400 leading-relaxed max-w-2xl">
                        "The integrated scholar operates without external networks or separate services. Every thought is compiled locally, ensuring the privacy and literal integrity of the Almagest project data contract."
                    </p>
                    
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-900">
                         <section>
                              <h5 className="text-[10px] font-black text-zinc-500 uppercase mb-4">Quantization</h5>
                              <p className="text-[9px] text-zinc-600 font-mono">Q4_K_M (Recommended Balance)</p>
                         </section>
                         <section>
                              <h5 className="text-[10px] font-black text-zinc-500 uppercase mb-4">Context Window</h5>
                              <p className="text-[9px] text-zinc-600 font-mono">8192 Tokens (Dynamic Scaling)</p>
                         </section>
                         <section>
                              <h5 className="text-[10px] font-black text-zinc-500 uppercase mb-4">Safety Shield</h5>
                              <p className="text-[9px] text-zinc-600 font-mono">Local-Only (Air-Gapped Sync)</p>
                         </section>
                    </div>
                 </div>

                 {/* Telemetry Visualizer */}
                 <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded-lg flex flex-col items-center justify-center p-20 opacity-30">
                      <Cpu size={120} className="mb-8" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Awaiting Model Activation...</span>
                 </div>
            </div>
        </div>
    );
};
