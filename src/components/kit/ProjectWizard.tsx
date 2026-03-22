import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, 
    Book, 
    ChevronRight, 
    FileText, 
    Globe, 
    Cpu, 
    Shield, 
    FlaskConical,
    X,
    FolderPlus,
    CheckCircle2
} from 'lucide-react';

/**
 * PROJECT WIZARD: Authoring Bootstrapper
 * 
 * Flow:
 * 1. Identity (Name, Era)
 * 2. Maker Configuration (Econ, Historical, Alchemical)
 * 3. Scholarship Ingestion (PDFs)
 * 4. Model Selection (Local LLM Hook)
 */

interface Maker {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
}

const MAKERS: Maker[] = [
    { id: 'historical', name: 'Historical Philologist', description: 'Enforces 1600s terminology and etymological integrity.', icon: Book, color: '#fbbf24' },
    { id: 'economic', name: 'Almagest Merchant', description: 'Orchestrates the naval arbitrage and scarcity systems.', icon: Globe, color: '#3b82f6' },
    { id: 'alchemical', name: 'Tincture Master', description: 'Manages the reagent stability and synthesis recipes.', icon: FlaskConical, color: '#ef4444' }
];

export const ProjectWizard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedMakers, setSelectedMakers] = useState<string[]>(['historical']);
    const [pdfFiles, setPdfFiles] = useState<any[]>([]);
    const [model, setModel] = useState('Resident Scholar (Local)');
    const [isCreating, setIsCreating] = useState(false);
    const [completed, setCompleted] = useState(false);

    const toggleMaker = (id: string) => {
        setSelectedMakers(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
    };

    const handleCreate = async () => {
        setIsCreating(true);
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        
        // 1. Create Folder & Manifest
        const result = await (window as any).almagest.createProject({ name, slug, makers: selectedMakers });
        
        if (result.success) {
            // 2. Ingest selected files
            for (const file of pdfFiles) {
                await (window as any).almagest.loadPDF({ 
                    name: file.name, 
                    project: slug, 
                    path: file.path 
                });
            }
            setCompleted(true);
        } else {
            alert(`Project Creation Failure: ${result.error}`);
        }
        setIsCreating(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-8 font-mono">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col h-[700px]"
            >
                {/* Header */}
                <header className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-800/20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gold/10 flex items-center justify-center border border-gold/20">
                            <FolderPlus size={20} className="text-gold" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-widest italic">Project Orchestrator</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Status: Initialization_Sequence_v4</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-all"><X size={20} /></button>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Stepper Sidebar */}
                    <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 p-8 flex flex-col gap-8">
                        {[
                            { step: 1, name: 'Identity', icon: Shield },
                            { step: 2, name: 'Architecture', icon: Cpu },
                            { step: 3, name: 'Scholarship', icon: FileText },
                            { step: 4, name: 'Intelligence', icon: Sparkles }
                        ].map(s => (
                            <div key={s.step} className={`flex items-center gap-4 transition-all ${step === s.step ? 'opacity-100 translate-x-2' : 'opacity-30'}`}>
                                <div className={`w-1 h-8 rounded-full ${step === s.step ? 'bg-gold' : 'bg-zinc-800'}`} />
                                <s.icon size={16} className={step === s.step ? 'text-white' : 'text-zinc-600'} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{s.name}</span>
                            </div>
                        ))}
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 p-16 flex flex-col">
                        <AnimatePresence mode="wait">
                            {completed ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <CheckCircle2 size={64} className="text-gold animate-pulse" />
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Project Initialized</h3>
                                    <p className="text-xs text-zinc-500 max-w-sm font-serif">
                                        Your scholarly workspace has been mapped to <code className="text-gold bg-zinc-950 px-2">/projects/{name.toLowerCase().replace(/\s+/g, '-')}</code>. 
                                        Reputation axes and alchemical registries synchronized.
                                    </p>
                                    <button 
                                        onClick={onClose}
                                        className="px-12 py-4 bg-zinc-100 text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gold transition-all"
                                    >
                                        Enter Scriptorium
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex-1 flex flex-col"
                                >
                                    {step === 1 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">Primary Identity</h3>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase text-gold tracking-widest">Project Title</label>
                                                <input 
                                                    autoFocus
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="e.g. The Venetian Ledger..."
                                                    className="w-full bg-zinc-950 border border-zinc-800 p-6 text-xl text-white font-serif outline-none focus:border-gold transition-all"
                                                />
                                            </div>
                                            <p className="text-[10px] text-zinc-600 font-serif leading-relaxed italic">
                                                "A project is not merely a file; it is a conceptual tether between the researcher and the historical possible."
                                            </p>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">Maker Configuration</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                {MAKERS.map(maker => (
                                                    <div 
                                                        key={maker.id}
                                                        onClick={() => toggleMaker(maker.id)}
                                                        className={`p-6 border cursor-pointer transition-all flex items-center gap-6 ${selectedMakers.includes(maker.id) ? 'bg-zinc-800 border-zinc-600' : 'bg-zinc-950/20 border-zinc-800 opacity-40 hover:opacity-100'}`}
                                                    >
                                                        <div className="p-3 bg-zinc-900 rounded-sm" style={{ color: maker.color }}>
                                                            <maker.icon size={20} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{maker.name}</h4>
                                                            <p className="text-[9px] text-zinc-500 font-serif italic mt-1">{maker.description}</p>
                                                        </div>
                                                        <div className={`w-4 h-4 rounded-full border ${selectedMakers.includes(maker.id) ? 'bg-gold border-gold' : 'border-zinc-700'}`} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">Knowledge Corpus</h3>
                                            <div 
                                                onClick={async () => {
                                                    const doc = await (window as any).almagest.selectDocument();
                                                    if (doc) {
                                                        setPdfFiles(prev => [...prev, doc]);
                                                    }
                                                }}
                                                className="flex-1 border-2 border-dashed border-zinc-800 rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-6 hover:border-gold transition-all cursor-pointer"
                                            >
                                                <FileText size={48} className="text-zinc-700" />
                                                <div>
                                                    <p className="text-sm font-black uppercase text-zinc-400">Ingest Scholarly PDFs</p>
                                                    <p className="text-[9px] text-zinc-600 mt-2 italic font-serif">Supported: Research papers, scanned manuscripts (OCR-ready).</p>
                                                </div>
                                                <button className="px-6 py-2 border border-zinc-700 text-[9px] font-black uppercase text-zinc-400 hover:text-white transition-all">Select Files</button>
                                            </div>
                                            <div className="flex gap-4 p-4 bg-zinc-950/50 border border-zinc-800 rounded-sm overflow-x-auto min-h-[80px]">
                                                 {pdfFiles.length > 0 ? pdfFiles.map((f, i) => (
                                                     <div key={i} className="px-4 py-2 bg-zinc-900 border border-zinc-800 flex items-center gap-3 whitespace-nowrap">
                                                         <FileText size={12} className="text-gold" />
                                                         <span className="text-[9px] text-zinc-400 font-bold">{f.name}</span>
                                                     </div>
                                                 )) : (
                                                     <p className="text-[10px] text-zinc-700 m-auto uppercase font-black">Buffer Empty</p>
                                                 )}
                                             </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">Local Intelligence</h3>
                                            <div className="space-y-6">
                                                <div className="p-6 bg-zinc-950 border border-zinc-800 flex items-center gap-4">
                                                    <div className="p-3 bg-zinc-900 border border-zinc-800 text-gold">
                                                        <Sparkles size={20} />
                                                    </div>
                                                    <select 
                                                        value={model}
                                                        onChange={e => setModel(e.target.value)}
                                                        className="flex-1 bg-transparent text-white text-lg font-serif outline-none border-none cursor-pointer"
                                                    >
                                                        <option className="bg-zinc-900">Ollama (Mistral-7B)</option>
                                                        <option className="bg-zinc-900">LM Studio (Llama-3-8B)</option>
                                                        <option className="bg-zinc-900">Local GPT-4o-mini (Proxied)</option>
                                                    </select>
                                                </div>
                                                <p className="text-[10px] text-zinc-600 leading-relaxed italic font-serif px-2">
                                                    The intelligence layer connects directly to local inference endpoints. 
                                                    Your scholarship remains private, executed locally on the host machine.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Footer */}
                        {!completed && (
                            <footer className="mt-auto pt-8 border-t border-zinc-800 flex justify-between items-center">
                                <button 
                                    onClick={() => setStep(s => Math.max(1, s - 1))}
                                    className={`text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white ${step === 1 && 'invisible'}`}
                                >
                                    Back
                                </button>
                                
                                {step < 4 ? (
                                    <button 
                                        disabled={step === 1 && !name}
                                        onClick={() => setStep(s => s + 1)}
                                        className="flex items-center gap-3 px-8 py-3 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-xl disabled:opacity-20"
                                    >
                                        Next Component <ChevronRight size={14} />
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleCreate}
                                        disabled={isCreating}
                                        className="flex items-center gap-3 px-12 py-4 bg-gold text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-100 transition-all shadow-2xl overflow-hidden relative"
                                    >
                                        {isCreating ? 'Synchronizing Manifest...' : 'Initialize Project'}
                                        {isCreating && (
                                            <motion.div 
                                                className="absolute bottom-0 left-0 h-1 bg-white"
                                                initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2 }}
                                            />
                                        )}
                                    </button>
                                )}
                            </footer>
                        )}
                    </main>
                </div>
            </motion.div>
        </div>
    );
};
