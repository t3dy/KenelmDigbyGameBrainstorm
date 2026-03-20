import React, { useState } from 'react';
import { PenTool, CheckCircle, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import manuscriptsData from '../../data/manuscripts.json';
import type { Manuscript } from '../../data/schema';

export const Philology: React.FC = () => {
    const { stats, completePhilology } = useGameStore();
    const manuscripts = manuscriptsData as Manuscript[];
    
    // UI State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
    const [isReconstructing, setIsReconstructing] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const activeM = manuscripts[currentIndex];

    const handleReconstruct = async () => {
        if (selectedVariant === null || !activeM) return;
        
        setIsReconstructing(true);
        setIsSuccess(null);
        
        // Simulation of scholarly comparison
        await new Promise(resolve => setTimeout(resolve, 2000));

        let success = false;
        // Alkahest specific logic
        if (activeM.id === 'ms_alkahest') {
            // Variant B (1) or C (2) are both 'true' relative to the Hartmann error (0)
            // But Variant B (Duclos) is the operational truth we need
            success = selectedVariant === 1 || selectedVariant === 2;
        } else {
            success = selectedVariant > 0;
        }

        setIsSuccess(success);
        completePhilology(activeM.title, success);
        setIsReconstructing(false);
    };

    return (
        <div className="flex-1 flex flex-col font-serif bg-[#fdfaf3] overflow-hidden shadow-inner h-full border-t-4 border-zinc-900">
            <div className="flex-1 grid grid-cols-12 gap-0">
                {/* Left Sidebar: Archive List */}
                <div className="col-span-3 border-r border-zinc-200 bg-zinc-50 p-8 space-y-8">
                    <header>
                        <h3 className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.3em] mb-2">Gresham Archive</h3>
                        <div className="h-px bg-zinc-300 w-12" />
                    </header>
                    
                    <div className="space-y-3">
                        {manuscripts.map((m, i) => (
                            <button
                                key={m.id}
                                onClick={() => {
                                    setCurrentIndex(i);
                                    setSelectedVariant(null);
                                    setIsSuccess(null);
                                }}
                                className={`w-full text-left p-4 transition-all group border-l-4 ${
                                    currentIndex === i 
                                    ? 'border-zinc-900 bg-white shadow-sm ring-1 ring-zinc-200 -mr-8 translate-x-2' 
                                    : 'border-transparent text-zinc-400 hover:text-zinc-800'
                                }`}
                            >
                                <p className="text-[9px] uppercase font-bold tracking-tighter opacity-50 mb-1">{m.author}</p>
                                <p className="text-sm font-bold leading-tight italic">{m.title}</p>
                            </button>
                        ))}
                    </div>

                    <div className="pt-12 border-t border-zinc-200">
                         <div className="p-4 bg-zinc-100/50 border border-zinc-200 text-zinc-600 text-[10px] leading-relaxed italic">
                            "The scholar must not merely read, but interpret the silence between the words."
                            <p className="text-right text-zinc-900 mt-2">— Digby, 'On the Soul'</p>
                         </div>
                    </div>
                </div>

                {/* Center: Manuscript View */}
                <main className="col-span-9 p-12 overflow-y-auto custom-scrollbar relative flex flex-col bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
                    <div className="max-w-3xl mx-auto w-full flex-1">
                        <header className="mb-12 text-center relative">
                            <h2 className="text-4xl italic text-zinc-900 mb-2">{activeM?.title}</h2>
                            <p className="text-zinc-500 text-xs uppercase tracking-widest">A comparative study of fragmentary observations</p>
                        </header>

                        <div className="space-y-8 mb-24">
                            {activeM?.variants.map((v, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedVariant(i)}
                                    className={`w-full text-left p-8 border transition-all group relative ${
                                        selectedVariant === i 
                                        ? 'border-zinc-900 bg-white shadow-2xl scale-[1.01] z-10' 
                                        : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800'
                                    }`}
                                >
                                    <div className="absolute -left-3 -top-3 bg-zinc-900 text-white w-6 h-6 flex items-center justify-center text-[10px] font-bold font-mono">
                                        {i+1}
                                    </div>
                                    <p className="text-lg leading-relaxed italic pr-12">
                                        "{v}"
                                    </p>
                                    <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Variant Analysis</span>
                                        <CheckCircle size={14} className={selectedVariant === i ? 'text-zinc-900' : 'text-zinc-300'} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-8 border-t border-zinc-200 flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="bg-zinc-50 px-4 py-2 border border-zinc-200">
                                <p className="text-[9px] uppercase font-black text-zinc-400 mb-0.5">Philology Score</p>
                                <p className="text-sm font-bold font-mono">{stats.philology}%</p>
                            </div>
                        </div>

                        <button
                            onClick={handleReconstruct}
                            disabled={selectedVariant === null || isReconstructing}
                            className={`px-12 py-4 bg-zinc-950 text-white text-[10px] uppercase font-bold tracking-[0.2em] shadow-xl transition-all flex items-center gap-3 ${
                                selectedVariant === null ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:bg-zinc-800'
                            }`}
                        >
                            {isReconstructing ? <RefreshCw className="animate-spin" size={14} /> : <PenTool size={14} />}
                            {isReconstructing ? 'Comparing Manuscripts...' : 'Unify Historical Text'}
                        </button>
                    </div>

                    {/* Result Overlay */}
                    <AnimatePresence>
                        {isSuccess !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`fixed bottom-12 right-12 max-w-sm p-8 border-2 border-zinc-950 shadow-2xl z-50 ${
                                    isSuccess ? 'bg-white' : 'bg-red-50'
                                }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    {isSuccess ? <Sparkles className="text-gold-dark" size={24} /> : <AlertCircle className="text-red-500" size={24} />}
                                    <h4 className="text-lg italic font-bold">
                                        {isSuccess ? 'Truth Uncovered' : 'Textual Impurity'}
                                    </h4>
                                </div>
                                <p className="text-[11px] leading-relaxed text-zinc-600 mb-6">
                                    {isSuccess 
                                        ? "The variants have harmonized. By isolating the linguistic deviation, you have revealed a superior procedure." 
                                        : "The chosen variant contains a structural contradiction. The process fails to stabilize."}
                                </p>
                                {isSuccess && (
                                    <div className="p-3 bg-zinc-950 text-white text-center text-[9px] uppercase font-black tracking-widest">
                                        Unlocked: Refined Calcination
                                    </div>
                                )}
                                <button 
                                    onClick={() => setIsSuccess(null)}
                                    className="mt-6 w-full py-2 text-[10px] uppercase font-bold text-zinc-400 hover:text-zinc-950"
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
;
