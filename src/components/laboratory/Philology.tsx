import React, { useState } from 'react';
import { PenTool, CheckCircle, AlertCircle, RefreshCw, Sparkles, Book, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';

export const Philology: React.FC = () => {
    const { stats, manifest, resolveVariant } = useGameStore();
    
    // Filter reagents that have variants to resolve
    const analysableReagents = manifest.reagents.filter(r => r.variant_options && (r.variant_options as any).length > 0);
    
    // UI State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [isReconstructing, setIsReconstructing] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const activeR = analysableReagents[currentIndex];

    const handleResolve = async () => {
        if (!selectedVariantId || !activeR) return;
        
        setIsReconstructing(true);
        setIsSuccess(null);
        
        // Scholarly simulation
        await new Promise(resolve => setTimeout(resolve, 2000));

        resolveVariant(activeR.id, selectedVariantId);
        
        setIsSuccess(true);
        setIsReconstructing(false);
        setSelectedVariantId(null);
    };

    return (
        <div className="flex-1 flex flex-col font-serif bg-[#fdfaf3] overflow-hidden shadow-inner h-full border-t-4 border-zinc-900 rounded-sm">
            <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
                {/* Left Sidebar: Reagent Repository */}
                <div className="col-span-3 border-r border-zinc-200 bg-zinc-50 p-8 space-y-8 overflow-y-auto">
                    <header>
                        <h3 className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.4em] mb-2 flex items-center gap-2">
                            <Book size={14} /> Critical Apparatus
                        </h3>
                        <div className="h-0.5 bg-zinc-900 w-12" />
                    </header>
                    
                    <div className="space-y-3">
                        {analysableReagents.map((r, i) => (
                            <button
                                key={r.id}
                                onClick={() => {
                                    setCurrentIndex(i);
                                    setSelectedVariantId(null);
                                    setIsSuccess(null);
                                }}
                                className={`w-full text-left p-4 transition-all group border-l-4 ${
                                    currentIndex === i 
                                    ? 'border-zinc-900 bg-white shadow-md ring-1 ring-zinc-200 translate-x-1' 
                                    : 'border-transparent text-zinc-400 hover:text-zinc-800'
                                }`}
                            >
                                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1 leading-none">Manuscript Conflict</p>
                                <p className="text-sm font-black leading-tight italic text-zinc-900">{r.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Center: Variant Comparison View */}
                <main className="col-span-9 p-16 overflow-y-auto custom-scrollbar relative flex flex-col bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeR?.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-3xl mx-auto w-full flex-1"
                        >
                            <header className="mb-16 text-center">
                                <span className="inline-block px-3 py-1 bg-zinc-950 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-6">Comparative Philology</span>
                                <h2 className="text-5xl italic text-zinc-900 mb-4 tracking-tighter">Variants of {activeR?.name}</h2>
                                <p className="text-zinc-500 text-xs uppercase tracking-widest max-w-md mx-auto leading-relaxed opacity-60">
                                    "Common recipe is but a veil. The true philosopher resolves the friction between the ancients and the moderns."
                                </p>
                            </header>

                            <div className="space-y-8 mb-32">
                                {(activeR?.variant_options as any[])?.map((v: any) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariantId(v.id)}
                                        className={`w-full text-left p-10 border-2 transition-all group relative ${
                                            selectedVariantId === v.id 
                                            ? 'border-zinc-950 bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.05)] scale-[1.02] z-10' 
                                            : 'border-zinc-100 bg-white/50 text-zinc-500 hover:border-zinc-300 hover:text-zinc-800'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2">
                                                 <FileText className="text-zinc-400" size={16} />
                                                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">{v.name}</span>
                                            </div>
                                            <CheckCircle size={20} className={selectedVariantId === v.id ? 'text-zinc-950' : 'text-zinc-100'} />
                                        </div>
                                        <p className="text-2xl leading-relaxed italic pr-8 text-zinc-800">
                                            "{v.description}"
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Scholarly Action Bar */}
                    <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-10 border-t-2 border-zinc-900 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[9px] uppercase font-black text-zinc-400 mb-1 tracking-widest">Philological Insight</p>
                                <p className="text-2xl font-black font-mono text-zinc-900">{stats.philology}%</p>
                            </div>
                        </div>

                        <button
                            onClick={handleResolve}
                            disabled={!selectedVariantId || isReconstructing}
                            className={`px-16 py-5 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center gap-4 ${
                                !selectedVariantId ? 'opacity-20 cursor-not-allowed' : 'hover:bg-zinc-800'
                            }`}
                        >
                            {isReconstructing ? <RefreshCw className="animate-spin" size={16} /> : <PenTool size={16} />}
                            {isReconstructing ? 'Unifying Textual Variants...' : 'Confirm Resolution'}
                        </button>
                    </div>

                    {/* Discovery Overlay */}
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed top-32 right-12 max-w-sm p-10 bg-white border-4 border-zinc-950 shadow-[40px_40px_0px_rgba(0,0,0,0.1)] z-50"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <Sparkles className="text-amber-500" size={28} />
                                    <h4 className="text-2xl italic font-black text-zinc-900">Truth Resolved</h4>
                                </div>
                                <p className="text-sm leading-relaxed text-zinc-600 mb-8 font-serif">
                                    The fragments have harmonized. By adopting this procedure, you have reduced the ontological noise in the manifest. The Great Work proceeds with clarity.
                                </p>
                                <button 
                                    onClick={() => setIsSuccess(null)}
                                    className="w-full py-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                                >
                                    Dismiss Analysis
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};
