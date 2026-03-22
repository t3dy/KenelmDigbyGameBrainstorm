import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { MessageCircle, Gift, BookOpen, ShieldAlert, Globe } from 'lucide-react';
import movesData from '../../data/moves.json';

export const IntrigueStage: React.FC = () => {
    const { stats, setView, addLog } = useGameStore();
    const [conviction, setConviction] = useState(0); // Player goal: 100
    const [suspicion, setSuspicion] = useState(30);   // Threat: 100 = failure
    const [history, setHistory] = useState<string[]>(["ENCOUNTER: An official from the Council of Ten awaits your explanation."]);

    const executeSocialMove = (move: any) => {
        // Handle costs
        if (move.cost.wealth && stats.wealth < move.cost.wealth) return;
        if (move.cost.knowledge && stats.knowledge < move.cost.knowledge) return;
        
        // Apply impact
        setConviction(prev => Math.min(100, prev + move.impact));
        setSuspicion(prev => Math.max(0, prev - (move.impact / 2)));
        setHistory(prev => [move.message, ...prev].slice(0, 3));
        addLog(`INTRIGUE: ${move.name} performed. Status: ${conviction + move.impact}% Conviction.`);

        // Simple "Opponent" response: Stigma/Suspicion increases over time
        setTimeout(() => {
            setSuspicion(s => Math.min(100, s + 10));
            setHistory(prev => ["The official counters with sharp bureaucratic doubt.", ...prev].slice(0, 3));
        }, 800);
    };

    const success = conviction >= 100;
    const failure = suspicion >= 100;

    if (success || failure) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-20 font-serif relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] grayscale" />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 text-center max-w-2xl"
                >
                    <h2 className={`text-7xl font-light italic mb-6 ${success ? 'text-amber-500' : 'text-red-900'}`}>
                        {success ? 'AUDIENCE CONCLUDED' : 'DIPLOMATIC COLLAPSE'}
                    </h2>
                    <p className="text-zinc-500 text-lg mb-12 italic leading-relaxed">
                        {success ? 'Sir Kenelm\'s silver tongue has secured the passage. The scrolls represent his honor.' : 'The official closes the ledger with a finality that smells of hemp and the gallows.'}
                    </p>
                    <button 
                        onClick={() => setView('nav')}
                        className="px-12 py-5 border-2 border-zinc-100/20 text-white font-black uppercase tracking-[0.5em] text-[10px] hover:bg-amber-500 hover:text-zinc-950 transition-all"
                    >
                        Resume Voyage
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#08080a] p-12 overflow-hidden font-serif relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(90deg,_transparent_0%,_#f59e0b_50%,_transparent_100%)] opacity-20" />
            
            {/* Header Stage Status */}
            <header className="flex justify-between items-start mb-20 z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-[0.6em] text-zinc-500 mb-2">Diplomatic Arena</span>
                    <h2 className="text-4xl italic text-white font-light tracking-widest">Inquisitorial Audience</h2>
                </div>

                <div className="flex gap-16">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 mb-2">Official's Conviction</span>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-mono text-amber-500 font-bold">{conviction}%</span>
                            <div className="w-48 h-1 bg-zinc-900 overflow-hidden">
                                <motion.div className="h-full bg-amber-500" animate={{ width: `${conviction}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Duel Arena */}
            <div className="flex-1 flex items-center justify-between px-20 relative">
                {/* Silhouette Character */}
                <div className="w-1/3 flex flex-col items-center opacity-30 group cursor-default">
                    <div className="w-64 h-96 border-2 border-zinc-800 relative overflow-hidden flex items-center justify-center p-8 bg-zinc-900/20">
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950 to-transparent" />
                         <span className="text-zinc-600 font-black text-xs uppercase tracking-widest">Inquisitive Presence</span>
                    </div>
                </div>

                {/* The Quill & Moves */}
                <div className="flex-1 flex flex-col items-center gap-8">
                    <div className="bg-zinc-900/50 p-10 border border-zinc-800/50 backdrop-blur-xl rounded-sm w-full max-w-xl shadow-2xl">
                        <div className="flex flex-col gap-6 mb-12 min-h-32">
                             {history.map((line, i) => (
                                 <motion.p 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i} 
                                    className={`text-sm italic tracking-tight leading-relaxed ${i === 0 ? 'text-zinc-100 text-lg' : 'text-zinc-600'}`}
                                 >
                                    "{line}"
                                 </motion.p>
                             ))}
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-12 border-t border-zinc-800">
                             {movesData.intrigue_moves.map(move => {
                                 const Icon = move.icon === 'MessageCircle' ? MessageCircle : move.icon === 'Gift' ? Gift : BookOpen;
                                 return (
                                     <button 
                                        key={move.id}
                                        onClick={() => executeSocialMove(move)}
                                        className="flex items-center justify-between group p-6 bg-zinc-950/50 border border-zinc-800 hover:border-amber-500 transition-all hover:translate-x-2"
                                     >
                                        <div className="flex items-center gap-6">
                                            <Icon size={20} className="text-zinc-600 group-hover:text-amber-500" />
                                            <div className="flex flex-col items-start">
                                                <span className="font-bold text-xs uppercase tracking-widest text-zinc-100">{move.name}</span>
                                                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
                                                    Cost: {Object.entries(move.cost).map(([k, v]) => `${v} ${k}`).join(', ')}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-zinc-800 group-hover:text-zinc-400 font-mono text-xs">Execute Artifact</span>
                                     </button>
                                 );
                             })}
                        </div>
                    </div>
                </div>

                {/* Player Suspicion */}
                <div className="w-1/3 flex flex-col items-end gap-6 h-full justify-end pb-20">
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-3 text-red-900 mb-2">
                            <ShieldAlert size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Suspicion</span>
                        </div>
                        <div className="w-1 h-64 bg-zinc-900 relative rounded-full overflow-hidden">
                            <motion.div 
                                className="absolute bottom-0 inset-x-0 bg-red-900"
                                animate={{ height: `${suspicion}%` }}
                            />
                        </div>
                        <span className="font-mono text-lg font-black text-red-950">{suspicion}%</span>
                    </div>
                </div>
            </div>

            {/* Global Footer Navigation */}
            <footer className="mt-auto border-t border-zinc-900/50 pt-8 flex justify-center gap-12 text-zinc-700">
                <div className="flex items-center gap-3">
                    <Globe size={14} />
                    <span className="text-[8px] uppercase font-black tracking-[1em]">The Levant Circuit</span>
                </div>
            </footer>
        </div>
    );
};
