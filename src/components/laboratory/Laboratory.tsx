import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { 
    Beaker, 
    Flame, 
    Plus, 
    Sparkles, 
    RefreshCw, 
    Database, 
    Crosshair,
    FlaskConical,
    PenTool
} from 'lucide-react';
import reagentsData from '../../data/reagents.json';
import { WeaponSalve } from './WeaponSalve';
import { Philology } from './Philology';

export const Laboratory: React.FC = () => {
    const { 
        inventory, 
        stats, 
        mixReagents, 
    } = useGameStore();

    const [mode, setMode] = useState<'burner' | 'philology' | 'salve'>('burner');
    const [slot1, setSlot1] = useState<string | null>(null);
    const [slot2, setSlot2] = useState<string | null>(null);
    const [isMixing, setIsMixing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    // Get reagents details from inventory IDs
    const availableReagents = reagentsData.filter(r => inventory.includes(r.id));

    // Keyboard handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            
            // Mode switching
            if (key === '1') setMode('burner');
            if (key === '2') setMode('philology');
            if (key === '3') setMode('salve');

            // Reagent selection
            if (mode === 'burner') {
                if (key >= 'a' && key <= 'z') {
                    const index = key.charCodeAt(0) - 97;
                    if (index < availableReagents.length) {
                        const reagentId = availableReagents[index].id;
                        if (!slot1) setSlot1(reagentId);
                        else if (!slot2 && reagentId !== slot1) setSlot2(reagentId);
                    }
                }
                if (key === 'm') handleMix();
                if (key === 'x' || key === 'backspace') {
                    setSlot1(null);
                    setSlot2(null);
                    setResult(null);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mode, slot1, slot2, availableReagents, isMixing]);

    const handleMix = async () => {
        if (!slot1 || !slot2 || isMixing) return;
        
        setIsMixing(true);
        setResult(null);

        // Visual delay for synthesis
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        mixReagents(slot1, slot2);
        
        setResult('PROCESS COMPLETE');
        setIsMixing(false);
        
        setTimeout(() => {
            setSlot1(null);
            setSlot2(null);
            setResult(null);
        }, 2000);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#f4f1ea] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            {/* Global Laboratory Header */}
            <header className="flex justify-between items-center px-12 py-8 bg-zinc-950 text-zinc-100 border-b border-zinc-800 relative z-30">
                <div className="flex items-center gap-8">
                    <div>
                        <h2 className="text-3xl font-serif italic text-zinc-100">Laboratory of Chymical Secrets</h2>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Gresham College Extension / 1633</p>
                    </div>
                    <div className="flex gap-2 bg-zinc-900/50 p-1 border border-zinc-800">
                        <button 
                            onClick={() => setMode('burner')}
                            className={`px-4 py-1.5 text-[10px] uppercase font-bold transition-all flex items-center gap-2 ${mode === 'burner' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <Beaker size={12} /> [S] Synthesis
                        </button>
                        <button
                            onClick={() => setMode('philology')}
                            className={`px-4 py-1.5 text-[10px] uppercase font-bold transition-all flex items-center gap-2 ${mode === 'philology' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <PenTool size={12} /> [P] Philology
                        </button>
                        <button
                            onClick={() => setMode('salve')}
                            className={`px-4 py-1.5 text-[10px] uppercase font-bold transition-all flex items-center gap-2 ${mode === 'salve' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <Crosshair size={12} /> [W] Weapon Salve
                        </button>
                    </div>
                </div>

                <div className="flex gap-12 font-mono">
                    <div className="text-right">
                        <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1">Vital Spirit</p>
                        <div className="flex items-center gap-2">
                             <div className="w-24 h-1.5 bg-zinc-900 border border-zinc-800 overflow-hidden">
                                <motion.div animate={{ width: `${stats.spirit}%` }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             </div>
                             <span className="text-lg font-black text-emerald-500">{stats.spirit.toFixed(0)}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1">Knowledge</p>
                        <p className="text-lg font-black text-amber-500">{stats.knowledge}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1">Stigma</p>
                        <p className="text-lg font-black text-red-500">{stats.stigma}</p>
                    </div>
                </div>
            </header>

            <div className="flex-1 min-h-0 relative z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                    {mode === 'burner' && (
                        <motion.div
                            key="burner"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="h-full flex gap-8 p-12"
                        >
                            {/* Inventory Sidebar */}
                            <div className="w-80 flex flex-col border border-zinc-800 bg-zinc-900/50 p-6">
                                <h3 className="text-xs font-bold uppercase text-zinc-500 mb-6 flex items-center gap-2 font-mono">
                                    <Database size={14} /> Available Reagents
                                </h3>
                                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                    {availableReagents.map((r, i) => (
                                        <button
                                            key={r.id}
                                            onClick={() => {
                                                if (!slot1) setSlot1(r.id);
                                                else if (!slot2 && r.id !== slot1) setSlot2(r.id);
                                            }}
                                            className={`w-full text-left p-4 border transition-all flex items-center justify-between group ${
                                                slot1 === r.id || slot2 === r.id
                                                ? 'bg-amber-500/10 border-amber-500 text-amber-100'
                                                : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-600 text-zinc-400'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-bold font-mono group-hover:text-zinc-300">
                                                    {String.fromCharCode(65 + i)}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold uppercase tracking-tighter">{r.name}</span>
                                                    <span className="text-[10px] opacity-50 lowercase truncate w-32">{r.description}</span>
                                                </div>
                                            </div>
                                            <Plus size={14} className="opacity-20" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Burner Area */}
                            <div className="flex-1 flex flex-col items-center justify-center border border-zinc-800 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-amber-900/10">
                                <div className="flex gap-16 items-center mb-16 relative">
                                    {/* Slot 1 */}
                                    <div className={`w-32 h-32 border-2 border-dashed flex items-center justify-center rounded-full transition-all relative ${slot1 ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-amber-500/5' : 'border-zinc-800'}`}>
                                        {slot1 ? (
                                            <div className="text-center">
                                                <FlaskConical className="mx-auto mb-1 text-amber-500" />
                                                <p className="text-[10px] font-bold uppercase truncate px-2">{reagentsData.find(r => r.id === slot1)?.name}</p>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-zinc-700 uppercase font-black">Slot Alpha</span>
                                        )}
                                        {slot1 && (
                                            <button onClick={() => setSlot1(null)} className="absolute -top-2 -right-2 bg-zinc-900 border border-zinc-700 p-1 hover:text-red-400"><Plus size={12} className="rotate-45" /></button>
                                        )}
                                    </div>

                                    <Plus className="text-zinc-800" />

                                    {/* Slot 2 */}
                                    <div className={`w-32 h-32 border-2 border-dashed flex items-center justify-center rounded-full transition-all relative ${slot2 ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-amber-500/5' : 'border-zinc-800'}`}>
                                        {slot2 ? (
                                            <div className="text-center">
                                                <FlaskConical className="mx-auto mb-1 text-amber-500" />
                                                <p className="text-[10px] font-bold uppercase truncate px-2">{reagentsData.find(r => r.id === slot2)?.name}</p>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-zinc-700 uppercase font-black">Slot Beta</span>
                                        )}
                                        {slot2 && (
                                            <button onClick={() => setSlot2(null)} className="absolute -top-2 -right-2 bg-zinc-900 border border-zinc-700 p-1 hover:text-red-400"><Plus size={12} className="rotate-45" /></button>
                                        )}
                                    </div>

                                    {/* Connection Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent -z-10" />
                                </div>

                                <button
                                    onClick={handleMix}
                                    disabled={!slot1 || !slot2 || isMixing}
                                    className={`relative group px-12 py-5 border-2 transition-all overflow-hidden ${
                                        slot1 && slot2 && !isMixing
                                        ? 'border-amber-500 text-amber-100 hover:bg-amber-500 hover:text-amber-950'
                                        : 'border-zinc-900 text-zinc-700 bg-zinc-950 cursor-not-allowed'
                                    }`}
                                >
                                    <div className="relative z-10 flex items-center gap-3 font-black tracking-[0.2em] uppercase">
                                        {isMixing ? (
                                            <>
                                                <RefreshCw className="animate-spin" size={20} />
                                                Synthesis in progress...
                                            </>
                                        ) : (
                                            <>
                                                <Flame size={20} />
                                                Commence Manifestation [M]
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </button>

                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-12 text-center"
                                    >
                                        <p className="text-amber-500 font-serif italic text-xl mb-1">{result}</p>
                                        <div className="flex items-center justify-center gap-2 text-zinc-500 text-[10px] uppercase font-bold">
                                            <Sparkles size={12} />
                                            Observation: The matter is transmuting
                                        </div>
                                    </motion.div>
                                )}

                                <div className="mt-16 flex gap-12 text-zinc-700 text-[10px] font-black uppercase tracking-widest font-mono">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">X</span> Clear
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">M</span> Mix
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">A-Z</span> Select
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'philology' && (
                        <motion.div key="philology" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="h-full p-12">
                            <Philology />
                        </motion.div>
                    )}

                    {mode === 'salve' && (
                        <motion.div key="salve" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="h-full p-12">
                            <WeaponSalve />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
