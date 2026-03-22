import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { PenTool, Feather, BookOpen, Shield, AlertTriangle, Zap } from 'lucide-react';

export const NarrativeCuration: React.FC = () => {
    const { pendingCuration, curateRomance } = useGameStore();

    if (!pendingCuration) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-zinc-950/90 backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-4xl w-full bg-[#fdfaf3] border-8 border-double border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.5)] p-12 relative font-serif text-zinc-900"
            >
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 p-2 border border-zinc-200">
                    <PenTool size={20} className="text-zinc-300" />
                </div>
                <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400">
                    Loose Fantasies / Vol 1
                </div>

                <header className="mb-12 text-center">
                    <h2 className="text-4xl italic mb-4">The Lived Romance</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent w-full mb-6" />
                    <p className="text-sm uppercase tracking-widest font-bold text-zinc-500">
                        Event Observed: <span className="text-zinc-800">{pendingCuration.event}</span>
                    </p>
                </header>

                <div className="mb-12">
                    <p className="text-xl leading-relaxed italic text-zinc-700 text-center px-12">
                        "How shall this thread be woven into the tapestry of our history? Choose the lens through which posterity shall view these actions."
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {pendingCuration.options.map((opt: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => curateRomance(i)}
                            className="flex flex-col text-left p-6 border-2 border-zinc-200 hover:border-amber-600 hover:bg-amber-50/50 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute -top-12 -right-12 group-hover:top-2 group-hover:right-2 transition-all opacity-0 group-hover:opacity-10 text-amber-900">
                                <Feather size={120} />
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-zinc-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
                                    {i + 1}
                                </span>
                                <h4 className="font-bold text-xs uppercase tracking-tighter">
                                    {opt.text.split(':')[0]}
                                </h4>
                            </div>

                            <p className="text-lg italic leading-snug mb-6 flex-1 text-zinc-800">
                                {opt.text.split(':')[1]?.replace(/"/g, '') || opt.text}
                            </p>

                            <div className="pt-4 border-t border-zinc-200 space-y-3">
                                <p className="text-[10px] text-zinc-500 italic mb-2 leading-tight">
                                    {opt.consequence}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {opt.impact.honor && (
                                        <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 whitespace-nowrap">
                                            <Shield size={10} /> Honor {opt.impact.honor > 0 ? '+' : ''}{opt.impact.honor}
                                        </div>
                                    )}
                                    {opt.impact.stigma && (
                                        <div className={`flex items-center gap-1 text-[9px] font-bold border px-1.5 py-0.5 whitespace-nowrap ${opt.impact.stigma < 0 ? 'text-blue-700 border-blue-100 bg-blue-50' : 'text-red-700 border-red-100 bg-red-50'}`}>
                                            <AlertTriangle size={10} /> Stigma {opt.impact.stigma > 0 ? '+' : ''}{opt.impact.stigma}
                                        </div>
                                    )}
                                    {opt.impact.spirit && (
                                        <div className={`flex items-center gap-1 text-[9px] font-bold border px-1.5 py-0.5 whitespace-nowrap ${opt.impact.spirit < 0 ? 'text-orange-700 border-orange-100 bg-orange-50' : 'text-emerald-700 border-emerald-100 bg-emerald-50'}`}>
                                            <Zap size={10} /> Spirit {opt.impact.spirit > 0 ? '+' : ''}{opt.impact.spirit}
                                        </div>
                                    )}
                                     {opt.impact.knowledge && (
                                        <div className="flex items-center gap-1 text-[9px] font-bold text-amber-700 border border-amber-100 bg-amber-50 px-1.5 py-0.5 whitespace-nowrap">
                                            <BookOpen size={10} /> Knowledge {opt.impact.knowledge > 0 ? '+' : ''}{opt.impact.knowledge}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </button>
                    ))}
                </div>

                <div className="mt-12 text-center text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center justify-center gap-4">
                    <div className="h-px bg-zinc-200 flex-1" />
                    Memoria est custos omnium rerum
                    <div className="h-px bg-zinc-200 flex-1" />
                </div>
            </motion.div>
        </div>
    );
};
