import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, AlertCircle, Search, Save, Eraser } from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

export const ManuscriptView: React.FC = () => {
    const { stats, completePhilology, resolveVariant, manifest } = useGameStore();
    const [isRestoring, setIsRestoring] = useState(false);
    const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);
    const [condition, setCondition] = useState(0.45);
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

    const fragments = [
        {
            id: 'vitriol',
            title: "On the Soul (Thomas Allan Copy)",
            text: "The [SYMPATHY] of the [VITRIOL] is not mere magic, but a [SALT] found in the very marrow of the [KNOWLEDGE]...",
            keywords: ["SYMPATHY", "VITRIOL", "SALT", "KNOWLEDGE"],
            found: "Oxford (Secret Library)"
        }
    ];

    const currentFrag = fragments[currentFragmentIndex];
    const reagentInfo = manifest.reagents.find(r => r.id === currentFrag.id);

    const handleRestore = () => {
        setIsRestoring(true);
        setTimeout(() => {
            const newCondition = Math.min(1.0, condition + 0.15);
            setCondition(newCondition);
            setIsRestoring(false);
            if (newCondition >= 1.0) {
                completePhilology(currentFrag.id, true);
            }
        }, 1200);
    };

    const handleCommit = () => {
        if (selectedVariantId && currentFrag.id) {
            resolveVariant(currentFrag.id, selectedVariantId);
            // In a real environment, we'd trigger the manifest compiler here.
            alert(`Truth Resolved: ${selectedVariantId}. The Mediterranean world-state has shifted.`);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#1a1412] text-[#e8dcc4] font-serif relative overflow-hidden">
            {/* ... other styles unchanged ... */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

            <header className="h-24 bg-[#2a1d18] border-b border-[#3d2c25] flex items-center px-12 justify-between z-10 shadow-2xl">
                <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-amber-600/60 tracking-[0.4em] mb-1">Philology Module / Archive</span>
                        <h2 className="text-2xl font-black italic tracking-tighter text-[#e8dcc4] flex items-center gap-3">
                            <BookOpen size={24} className="text-amber-500" />
                            RECONSTRUCTION VIEW
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest mb-1">Scholarship Pulse</span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-mono font-bold text-amber-500">{stats.knowledge} KNO</span>
                           <div className="h-1.5 w-32 bg-zinc-900 overflow-hidden rounded-full">
                               <div className="h-full bg-amber-500" style={{ width: `${(stats.knowledge / 100) * 100}%` }} />
                           </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex p-12 gap-12 overflow-hidden items-center justify-center relative">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl w-full aspect-[4/3] bg-[#f4ebd0] text-zinc-900 p-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-8 border-[#2a1d18] relative transform rotate-1 group"
                >
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                    
                    <div 
                      className="absolute inset-0 bg-black/80 flex items-center justify-center transition-all duration-1000"
                      style={{ opacity: 1 - condition }}
                    >
                        <div className="text-center p-12">
                           <AlertCircle size={48} className="mx-auto mb-4 text-amber-600/40" />
                           <p className="text-[12px] uppercase font-black tracking-[0.4em] text-amber-700 font-mono">Silence of the Text</p>
                           <p className="text-[10px] italic text-zinc-500 mt-2">Historical decay detected. Pulse the Vitriol to restore.</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-12 border-b-2 border-zinc-200 pb-6">
                        <h3 className="text-3xl font-black italic tracking-tighter opacity-80">{currentFrag.title}</h3>
                        <div className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-widest bg-zinc-100 px-3 py-1">Condition: {Math.round(condition * 100)}%</div>
                    </div>

                    <div className="relative">
                        <div 
                          className={`text-2xl leading-relaxed italic transition-all duration-700 ${condition < 0.6 ? 'blur-md opacity-20 select-none' : 'blur-0 opacity-100'}`}
                          style={{ fontFamily: "'Crimson Text', serif" }}
                        >
                            {currentFrag.text.split(/(\[.*?\])/).map((part, i) => (
                                part.startsWith('[') ? (
                                    <span key={i} className="text-amber-800 font-black relative px-1 bg-amber-500/10 rounded-sm">
                                        {condition > 0.8 ? part.replace(/[\[\]]/g, '') : '??????'}
                                    </span>
                                ) : part
                            ))}
                        </div>

                        <AnimatePresence>
                            {isRestoring && (
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 1 }}
                                    exit={{ scale: 2, opacity: 0 }}
                                    className="absolute inset-0 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end border-t border-zinc-200 pt-8 opacity-40">
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">Provenance</span>
                            <span className="text-[11px] font-bold">{currentFrag.found}</span>
                         </div>
                         <Search size={16} className="text-zinc-300" />
                    </div>
                </motion.div>

                <div className="w-80 flex flex-col gap-6 h-full py-12">
                    <div className="bg-[#2a1d18]/80 p-6 border border-[#3d2c25] flex flex-col gap-4 shadow-xl backdrop-blur-md">
                        <h4 className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] mb-2 flex items-center gap-2">
                           <Eraser size={14} className="text-amber-500" /> Restoration
                        </h4>
                        
                        <button 
                          disabled={isRestoring || condition >= 1.0}
                          onClick={handleRestore}
                          className="w-full bg-[#e8dcc4] text-[#1a1412] p-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg flex items-center justify-between group disabled:opacity-20 active:translate-y-1"
                        >
                           {isRestoring ? 'Pulsing...' : 'Pulse Vitriol'}
                           <Sparkles size={16} className={`${isRestoring ? 'animate-spin' : 'group-hover:scale-125 transition-transform'}`} />
                        </button>
                    </div>

                    <div className="bg-amber-900/10 p-6 border border-amber-500/20 flex-1 flex flex-col gap-4 italic font-serif text-[#e8dcc4]/60">
                         <div className="text-[10px] uppercase font-black text-amber-500 not-italic tracking-widest mb-2">Competing Variants</div>
                         <div className="space-y-4">
                            {condition >= 1.0 && reagentInfo?.variant_options ? (
                                <div className="flex flex-col gap-3">
                                    {reagentInfo.variant_options.map((v: any) => (
                                        <button 
                                          key={v.id}
                                          onClick={() => setSelectedVariantId(v.id)}
                                          className={`p-3 text-left border transition-all ${selectedVariantId === v.id ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-black/20 border-zinc-800 text-zinc-500 hover:border-zinc-500'}`}
                                        >
                                            <div className="text-[10px] font-black uppercase tracking-widest mb-1">{v.name}</div>
                                            <div className="text-[9px] leading-tight opacity-80">{v.description}</div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-xs opacity-40 italic">Restore text to reveal variant options...</div>
                            )}
                         </div>
                    </div>

                    <button 
                      disabled={!selectedVariantId}
                      onClick={handleCommit}
                      className="w-full py-4 bg-amber-600 text-[#1a1412] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-20"
                    >
                       <Save size={14} /> Resolve Truth
                    </button>
                </div>
            </main>

            {/* View Shortcut HUD */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                <div className="bg-[#2a1d18] px-6 py-2 border border-[#3d2c25] shadow-2xl rounded-sm flex items-center gap-6">
                   <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-amber-500 text-black text-[10px] font-black flex items-center justify-center rounded-sm">P</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Philology Mode</span>
                   </div>
                   <div className="w-[1px] h-4 bg-zinc-800" />
                   <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#3d2c25] text-zinc-500 text-[10px] font-black flex items-center justify-center rounded-sm border border-zinc-800">Esc</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Return to Nav</span>
                   </div>
                </div>
            </div>
        </div>
    );
};
