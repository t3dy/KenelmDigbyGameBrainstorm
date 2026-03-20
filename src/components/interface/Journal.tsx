import React, { useState } from 'react';
import { PenTool, User, Globe, Mail, ShieldOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';

export const Journal: React.FC = () => {
    const { log, stats, setView, characters, letters, selectedLetterId, selectLetter } = useGameStore();
    const [tab, setTab] = useState<'log' | 'letters' | 'people'>('log');

    const selectedLetter = letters.find(l => l.id === selectedLetterId);

    return (
        <div className="flex-1 flex flex-col p-12 font-serif bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-parchment overflow-hidden">
            <header className="mb-8 border-b-2 border-ink pb-6 flex justify-between items-end">
                <div className="max-w-xl">
                    <h2 className="text-5xl italic mb-2 tracking-tight">The Lived Romance</h2>
                    <p className="text-gold-dark font-display uppercase tracking-widest text-xs font-bold leading-loose">
                        Sir Kenelm Digby’s Grand Repository of Memory & Social Proof.
                    </p>
                </div>
                <div className="flex gap-4 mb-2">
                    <button 
                        onClick={() => setTab('log')}
                        className={`px-6 py-2 font-display uppercase tracking-widest text-[10px] font-bold border-2 transition-all ${tab === 'log' ? 'bg-ink text-parchment border-ink shadow-lg' : 'border-ink/20 hover:border-ink'}`}
                    >
                        Journal Log
                    </button>
                    <button 
                        onClick={() => setTab('letters')}
                        className={`px-6 py-2 font-display uppercase tracking-widest text-[10px] font-bold border-2 transition-all ${tab === 'letters' ? 'bg-ink text-parchment border-ink shadow-lg' : 'border-ink/20 hover:border-ink'}`}
                    >
                        Correspondence ({letters.filter(l => !l.read).length})
                    </button>
                    <button 
                        onClick={() => setTab('people')}
                        className={`px-6 py-2 font-display uppercase tracking-widest text-[10px] font-bold border-2 transition-all ${tab === 'people' ? 'bg-ink text-parchment border-ink shadow-lg' : 'border-ink/20 hover:border-ink'}`}
                    >
                        Advisors & Rivals
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-hidden grid grid-cols-12 gap-12">
                {/* Left: Identity Summary / Stats */}
                <aside className="col-span-3 space-y-6">
                    <div className="p-6 bg-white border-4 border-ink shadow-2xl relative">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-gold transform rotate-45 flex items-center justify-center">
                            <User className="text-white -rotate-45" size={20} />
                        </div>
                        <h3 className="text-xl italic mb-4">Reputation Hub</h3>
                        
                        {/* Stigma Meter */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-display uppercase font-bold text-ink/60 flex items-center gap-1">
                                    <ShieldOff size={12} className="text-gold-dark" /> Social Stigma
                                </span>
                                <span className="text-sm font-bold">{stats.stigma}%</span>
                            </div>
                            <div className="w-full h-4 bg-parchment-dark rounded-full overflow-hidden border border-ink/10 shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats.stigma}%` }}
                                    className="h-full bg-gradient-to-r from-gold-dark to-ink"
                                />
                            </div>
                            <p className="text-[9px] mt-2 italic text-ink/40">Higher stigma limits access to Royal circles.</p>
                        </div>

                        <div className="space-y-3 font-display uppercase tracking-widest text-[10px] font-bold opacity-70">
                            <div className="flex justify-between border-b border-ink/10 pb-2">
                                <span>Ambition</span>
                                <span className={stats.honor > 70 ? 'text-gold-dark' : 'text-ink'}>{stats.honor > 70 ? 'High' : 'Moderate'}</span>
                            </div>
                            <div className="flex justify-between border-b border-ink/10 pb-2">
                                <span>Status</span>
                                <span>Privateer Noble</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-ink text-parchment italic text-base leading-relaxed shadow-xl border-l-4 border-gold">
                        "If the Powder of Sympathy cures the wound, my names shall be cleared of my father's shadow."
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="col-span-9 flex flex-col overflow-hidden bg-white/40 border-2 border-ink/5 p-6 rounded-sm shadow-inner overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {tab === 'log' && (
                            <motion.div 
                                key="log"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {log.slice().reverse().map((entry, idx) => (
                                    <div key={idx} className="bg-white p-8 border-l-4 border-gold shadow-sm group hover:border-ink transition-all">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-[10px] font-display font-bold opacity-30 italic">RECORD #{log.length - idx}</span>
                                            <PenTool size={16} className="text-gold-dark opacity-20" />
                                        </div>
                                        <p className="text-xl text-ink italic leading-snug">{entry}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {tab === 'letters' && (
                            <motion.div 
                                key="letters"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1 grid grid-cols-12 gap-8 overflow-hidden"
                            >
                                {/* Letter List */}
                                <div className="col-span-4 space-y-4 overflow-y-auto pr-4">
                                    {letters.map(letter => (
                                        <button
                                            key={letter.id}
                                            onClick={() => selectLetter(letter.id)}
                                            className={`w-full text-left p-4 border-2 transition-all relative ${selectedLetterId === letter.id ? 'bg-gold/10 border-gold' : 'bg-white border-ink/10 hover:border-gold/50'}`}
                                        >
                                            {!letter.read && <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-dark rounded-full animate-pulse shadow-md" />}
                                            <div className="flex items-center gap-3 mb-1">
                                                <Mail size={16} className={letter.read ? 'text-ink/30' : 'text-gold-dark'} />
                                                <span className="text-[10px] font-display font-bold uppercase tracking-widest">{letter.subject.substring(0, 20)}...</span>
                                            </div>
                                            <div className="text-[9px] opacity-40 uppercase tracking-tighter italic">From: {characters.find(c => c.id === letter.sender_id)?.name}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Letter View */}
                                <div className="col-span-8 bg-white p-12 shadow-2xl border-4 border-ink relative overflow-y-auto min-h-[500px]">
                                    {selectedLetter ? (
                                        <div className="animate-fade-in relative">
                                            <div className="absolute top-0 right-0 p-4 border border-ink/10 font-display text-[10px] opacity-40 transform rotate-2">
                                                EX LIBRIS DIGBY
                                            </div>
                                            <h4 className="text-4xl italic mb-8 border-b border-parchment pb-4">{selectedLetter.subject}</h4>
                                            <p className="text-2xl text-ink leading-loose italic whitespace-pre-wrap mb-12">
                                                {selectedLetter.content}
                                            </p>
                                            <div className="mt-8 pt-8 border-t-2 border-parchment-dark flex justify-between items-center italic">
                                                <div className="text-xl text-gold-dark font-semibold">Your servant, {characters.find(c => c.id === selectedLetter.sender_id)?.name}</div>
                                                {selectedLetter.impact_stat && (
                                                    <div className="p-3 bg-gold-light/10 border border-gold rounded-sm text-xs font-display uppercase tracking-widest font-bold">
                                                        Effect: {selectedLetter.impact_stat} {selectedLetter.impact_value && (selectedLetter.impact_value > 0 ? '+' : '')}{selectedLetter.impact_value}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full opacity-20 italic text-2xl gap-4">
                                            <Mail size={64} />
                                            <p>Select a letter to read its contents.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {tab === 'people' && (
                            <motion.div 
                                key="people"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                {characters.map(char => (
                                    <div key={char.id} className="bg-white p-8 border-2 border-ink relative group hover:border-gold-dark transition-all shadow-md">
                                        <div className="absolute top-4 right-4 text-gold-dark opacity-10 group-hover:opacity-100 transition-all font-display text-[10px] uppercase font-black">
                                            {char.role}
                                        </div>
                                        <h4 className="text-2xl italic mb-2">{char.name}</h4>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-[9px] font-display uppercase font-bold mb-1 opacity-50">
                                                <span>Affinity</span>
                                                <span>{char.reputation}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-parchment-dark rounded-full overflow-hidden">
                                                <div className="h-full bg-gold-dark" style={{ width: `${char.reputation}%` }} />
                                            </div>
                                        </div>
                                        <p className="text-sm italic leading-relaxed text-ink/80">{char.bio}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
            
            <footer className="mt-8 flex justify-center gap-4">
                 <button 
                    onClick={() => setView('naval')}
                    className="px-12 py-3 bg-gold text-white font-bold text-lg hover:shadow-2xl active:translate-y-1 transition-all flex items-center gap-3 uppercase tracking-widest font-display"
                >
                    <Globe size={20} /> Resume Voyage
                </button>
            </footer>
        </div>
    );
};
