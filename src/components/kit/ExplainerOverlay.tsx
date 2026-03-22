import React from 'react';
import { motion } from 'framer-motion';
import { Info, X, BookOpen, Sparkles, Shield, FlaskConical } from 'lucide-react';

/**
 * SCHOLARLY EXPLAINER: Orientation Template
 * 
 * A reusable component to provide instructional context for complex system layers.
 * Uses the 'Scholarly-Industrial' aesthetic (Zinc, Gold, Serif).
 */

interface ExplainerProps {
    id: string;
    title: string;
    description: string;
    pillar: 'FF' | 'Ultima' | 'FTL' | 'Almagest';
    instructions: string[];
    aiPrompt?: string;
    onClose: () => void;
}

export const ExplainerOverlay: React.FC<ExplainerProps> = ({ 
    id, title, description, pillar, instructions, aiPrompt, onClose 
}) => {
    const pillarIcon = {
        FF: <BookOpen size={20} className="text-blue-400" />,
        Ultima: <Shield size={20} className="text-amber-500" />,
        FTL: <FlaskConical size={20} className="text-red-500" />,
        Almagest: <Sparkles size={20} className="text-gold" />
    };

    const pillarName = {
        FF: 'Narrative & Pacing',
        Ultima: 'Systemic World',
        FTL: 'Crisis & Tactics',
        Almagest: 'Scholarly Agentic'
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-[480px] bg-zinc-950 border-l border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-y-auto font-mono flex flex-col h-full z-50 fixed right-0 top-0 backdrop-blur-3xl"
        >
            {/* Header */}
            <header className="p-12 border-b border-zinc-900 bg-zinc-900/10 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                         <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                            {pillarIcon[pillar]}
                         </div>
                        <span className="text-[12px] uppercase font-black tracking-[0.3em] text-zinc-600">{pillarName[pillar]}</span>
                    </div>
                    <button onClick={onClose} className="text-zinc-700 hover:text-white transition-all bg-zinc-900 p-3 border border-zinc-800 rounded-full"><X size={16} /></button>
                </div>
                <h2 className="text-4xl font-serif italic text-white tracking-tighter uppercase leading-none">{title}</h2>
                <div className="flex items-center gap-3">
                     <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Section_ID: {id}</span>
                     <div className="h-px flex-1 bg-zinc-900" />
                     <span className="text-[9px] text-gold font-black uppercase">v2.4_NOMINAL</span>
                </div>
            </header>

            <div className="p-12 space-y-16">
                {/* Abstract */}
                <section>
                    <h3 className="text-[11px] font-black uppercase text-gold tracking-widest mb-6 flex items-center gap-3">
                        <Info size={14} /> Scholarly Intent
                    </h3>
                    <p className="text-[14px] text-zinc-300 font-serif leading-relaxed italic border-l-2 border-zinc-800 pl-8">
                        "{description}"
                    </p>
                </section>

                {/* Operations */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-[11px] font-black uppercase text-zinc-500 tracking-widest leading-none">Standard Operations</h3>
                        <div className="h-px flex-1 bg-zinc-900 mx-6 mb-1" />
                    </div>
                    <div className="space-y-8">
                        {instructions.map((step, i) => (
                            <div key={i} className="flex gap-6 group">
                                <span className="text-[10px] font-black text-zinc-800 transition-colors group-hover:text-gold">{String(i + 1).padStart(2, '0')}</span>
                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed group-hover:text-zinc-300 transition-colors">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Knowledge Base Connection */}
                {aiPrompt && (
                    <section className="space-y-6">
                        <div className="flex justify-between items-end mb-8">
                            <h3 className="text-[11px] font-black uppercase text-gold tracking-widest leading-none">Consult Scholar</h3>
                            <div className="h-px flex-1 bg-zinc-900/50 mx-6 mb-1" />
                        </div>
                        <div className="p-8 bg-gold/5 border border-gold/10 rounded-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Sparkles size={100} />
                            </div>
                            <span className="text-[9px] font-black text-amber-500/50 uppercase block mb-4 tracking-widest">Recommended AI Prompt Pattern</span>
                            <p className="text-[12px] text-zinc-400 font-mono italic leading-relaxed">
                                "{aiPrompt}"
                            </p>
                        </div>
                    </section>
                )}

                {/* Automation Note */}
                <section className="p-8 bg-zinc-900 border border-zinc-800 rounded-sm">
                    <div className="flex items-center gap-3 text-zinc-500 mb-4">
                        <BookOpen size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Export Strategy</span>
                    </div>
                    <p className="text-[10px] text-zinc-600 italic font-serif leading-relaxed">
                        Assets saved here are versioned within the project manifest. Use the <span className="text-white">"Export"</span> function to generate high-fidelity .md artifacts for external knowledge synthesis or peer review.
                    </p>
                </section>
            </div>

            <footer className="mt-auto p-12 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
                <p className="text-[10px] text-zinc-700 uppercase font-black text-center tracking-[0.4em] italic mb-2">
                    "Memoria est custos omnium rerum"
                </p>
                <p className="text-[8px] text-zinc-800 uppercase font-black text-center tracking-[0.2em]">
                    Construction Kit :: Scholar-Industrial Access
                </p>
            </footer>
        </motion.div>
    );
};
