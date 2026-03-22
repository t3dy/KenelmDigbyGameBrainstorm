import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { Sword, Activity, Zap, Skull } from 'lucide-react';
import type { CombatMove } from '../../data/schema';
import movesData from '../../data/moves.json';

interface CombatActor {
    id: string;
    name: string;
    hp: number;
    maxHp: number;
    side: 'player' | 'enemy';
    spriteType: 'digby' | 'venetia' | 'sailor' | 'scholar';
}

export const CombatStage: React.FC = () => {
    const { stats, currentEncounter, setView, gainWealth, addReagent, gainKnowledge } = useGameStore();
    const [log, setLog] = useState<string[]>(["ENCOUNTER: Armed boarders detected!"]);
    const [turn, setTurn] = useState<'player' | 'enemy'>('player');
    const [isActing, setIsActing] = useState(false);
    const [rewardClaimed, setRewardClaimed] = useState(false);
    
    // Initialize from Encounter or Fallback
    const initialParticipants: CombatActor[] = currentEncounter?.participants || [
        { id: 'player_digby', name: 'Sir Kenelm Digby', hp: 100, maxHp: 100, side: 'player', spriteType: 'digby' },
        { id: 'enemy_generic', name: 'Venetian Boarder', hp: 80, maxHp: 80, side: 'enemy', spriteType: 'sailor' }
    ];
    
    const [participants, setParticipants] = useState<CombatActor[]>(initialParticipants);

    const addLog = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 5));

    const executePlayerAction = async (move: CombatMove) => {
        if (turn !== 'player' || isActing) return;
        
        let potencyMultiplier = 1.0;

        // Check and consume reagent costs
        if (move.reagent_cost) {
            let totalPotency = 0;
            let reagentCount = 0;

            for (const [rid, qty] of Object.entries(move.reagent_cost)) {
                const reagent = stats.reagents.find(r => r.id === rid);
                const available = reagent?.quantity || 0;
                if (available < qty) {
                    addLog(`VOID: Insufficient ${rid} for this maneuver.`);
                    return;
                }
                totalPotency += (reagent?.potency || 50) * qty;
                reagentCount += qty;
            }

            if (reagentCount > 0) {
                const avgPotency = totalPotency / reagentCount;
                potencyMultiplier = 0.5 + (avgPotency / 50); 
            }
        }

        setIsActing(true);
        const target = participants.find(p => p.side === 'enemy' && p.hp > 0);
        if (!target) return;

        addLog(`${move.message} (Potency: ${Math.round(potencyMultiplier * 100)}%)`);
        
        if (move.type === 'attack') {
            const damage = (move.damage || 25) * potencyMultiplier;
            setParticipants(prev => prev.map(p => p.id === target.id ? { ...p, hp: Math.max(0, p.hp - damage) } : p));
        } else if (move.type === 'heal') {
            const power = (move.power || 30) * potencyMultiplier;
            setParticipants(prev => prev.map(p => p.side === 'player' ? { ...p, hp: Math.min(p.maxHp, p.hp + power) } : p));
        }

        setTimeout(() => {
            setIsActing(false);
            setTurn('enemy');
        }, 1200);
    };

    // Simple Enemy AI
    useEffect(() => {
        if (turn === 'enemy' && !isActing) {
            setIsActing(true);
            setTimeout(() => {
                const activeEnemy = participants.find(p => p.side === 'enemy' && p.hp > 0);
                const target = participants.find(p => p.side === 'player' && p.hp > 0);
                
                if (activeEnemy && target) {
                    const move = (movesData as any).enemy_moves[Math.floor(Math.random() * (movesData as any).enemy_moves.length)];
                    addLog(`${activeEnemy.name}: ${move.message}`);
                    setParticipants(prev => prev.map(p => p.id === target.id ? { ...p, hp: Math.max(0, p.hp - move.damage) } : p));
                }
                
                setIsActing(false);
                setTurn('player');
            }, 1500);
        }
    }, [turn, isActing]);

    const victory = participants.every(p => p.side !== 'enemy' || p.hp <= 0);
    const defeat = participants.every(p => p.side !== 'player' || p.hp <= 0);

    const claimPrize = () => {
        if (rewardClaimed) return;
        gainWealth(350);
        gainKnowledge(10);
        addReagent('vitriol', 5, 80);
        setRewardClaimed(true);
        setView('nav');
    };

    if (victory || defeat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-20 font-mono relative overflow-hidden">
                <div className="absolute inset-0 bg-red-950/20 mix-blend-overlay" />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center z-10"
                >
                    <h2 className={`text-7xl font-black italic tracking-tighter mb-4 ${victory ? 'text-amber-500' : 'text-red-900'}`}>
                        {victory ? 'THE PRIZE IS WON' : 'THE EAGLE IS LOST'}
                    </h2>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.5em] mb-12">
                        {victory ? 'Sir Kenelm\'s honor is defended by blood.' : 'Digby\'s voyage ends in a watery grave.'}
                    </p>
                    
                    {victory && (
                        <div className="mb-12 p-8 bg-zinc-900 border border-amber-500/20 rounded-sm">
                            <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-widest mb-6">Spoils of War</h4>
                            <div className="flex justify-center gap-12">
                                <div className="text-center">
                                    <span className="block text-[8px] uppercase text-zinc-500 mb-1">Gold Scudi</span>
                                    <span className="text-2xl font-bold">+350</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[8px] uppercase text-zinc-500 mb-1">Knowledge</span>
                                    <span className="text-2xl font-bold">+10</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[8px] uppercase text-zinc-500 mb-1">Reagents</span>
                                    <span className="text-2xl font-bold">5x Vitriol</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={victory ? claimPrize : () => setView('nav')}
                        className="px-12 py-5 bg-zinc-100 text-zinc-950 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform active:scale-95"
                    >
                        {victory ? 'Claim Spoils & Weigh Anchor' : 'Accept Fate'}
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#050505] p-12 overflow-hidden font-mono">
            {/* Header Battle Status */}
            <div className="flex justify-between items-center mb-12 border-b border-zinc-900 pb-6">
                <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Combat Staging</span>
                        <h2 className="text-2xl text-white italic font-bold tracking-tight">Abordage: Levant Sea</h2>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    {log.map((m, i) => (
                        <span key={i} className={`text-[8px] font-bold uppercase transition-opacity ${i === 0 ? 'text-amber-500 opacity-100' : 'text-zinc-700 opacity-40'}`}>
                            {m}
                        </span>
                    )).reverse()}
                </div>
            </div>

            {/* Battle Arena */}
            <div className="flex-1 flex justify-between items-center px-32 relative">
                {/* Visual Background (Symbolic) */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                    <div className="w-[800px] h-1 bg-zinc-200 blur-sm transform rotate-[30deg]" />
                    <div className="w-[800px] h-1 bg-zinc-200 blur-sm transform -rotate-[30deg]" />
                </div>

                {/* Player Party */}
                <div className="flex-1 flex flex-col gap-12">
                    {participants.filter(p => p.side === 'player').map(p => (
                        <div key={p.id} className={`flex items-center gap-6 group ${p.hp <= 0 ? 'opacity-20 grayscale' : ''}`}>
                             <div 
                                className={`w-16 h-16 border-2 transition-all flex items-center justify-center relative ${turn === 'player' && !isActing && p.id === 'player_digby' ? 'border-gold shadow-[0_0_30px_rgba(197,160,89,0.3)] animate-pulse' : 'border-zinc-800'}`}
                                style={{ backgroundColor: p.spriteType === 'digby' ? '#1e1e1e' : '#3f3f3f' }}
                             >
                                <span className="text-white font-black text-xl">{p.spriteType[0].toUpperCase()}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-[10px] font-black uppercase text-zinc-400">{p.name}</span>
                                 <div className="w-32 h-1 bg-zinc-900 overflow-hidden rounded-full border border-zinc-800">
                                     <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(p.hp / p.maxHp) * 100}%` }}
                                        className="h-full bg-blue-500" 
                                     />
                                 </div>
                                 <span className="text-[9px] text-zinc-600 font-bold uppercase">{p.hp} / {p.maxHp} HP</span>
                             </div>
                        </div>
                    ))}
                </div>

                {/* Action Menu (Fixed Positioning for Player) */}
                <AnimatePresence>
                    {turn === 'player' && !isActing && (
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="bg-zinc-950/80 border border-zinc-900 p-8 shadow-2xl backdrop-blur-md flex flex-col gap-3 rounded-sm z-50 ring-1 ring-zinc-800 shadow-gold/5 mx-12"
                        >
                            <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-900 pb-2">Magical Utensils</h3>
                            {movesData.character_moves.map((move) => {
                                const Icon = move.icon === 'Sword' ? Sword : move.icon === 'Activity' ? Activity : Zap;
                                return (
                                    <button 
                                        key={move.id}
                                        onClick={() => executePlayerAction(move as any)} 
                                        className="flex items-center justify-between gap-8 px-6 py-2 hover:bg-zinc-100 hover:text-zinc-950 transition-all border border-zinc-800 group"
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className="text-[10px] font-black uppercase tracking-widest">{move.name}</span>
                                            {move.reagent_cost && (
                                                <span className="text-[6px] text-amber-500 font-bold uppercase mt-0.5">
                                                    Cost: {Object.entries(move.reagent_cost).map(([id, q]) => `${q} ${id}`).join(', ')}
                                                </span>
                                            )}
                                        </div>
                                        <Icon size={14} className="group-hover:scale-125 transition-transform" />
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Enemy Party */}
                <div className="flex-1 flex flex-col gap-16 items-end">
                    {participants.filter(p => p.side === 'enemy').map(p => (
                        <div key={p.id} className={`flex items-center gap-6 group ${p.hp <= 0 ? 'opacity-20 grayscale' : ''}`}>
                             <div className="flex flex-col gap-1 items-end">
                                 <span className="text-[10px] font-black uppercase text-zinc-400">{p.name}</span>
                                 <div className="w-32 h-1 bg-zinc-900 overflow-hidden rounded-full border border-zinc-800">
                                     <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(p.hp / p.maxHp) * 100}%` }}
                                        className="h-full bg-red-800"
                                     />
                                 </div>
                                 <span className="text-[9px] text-zinc-600 font-bold uppercase">{p.hp} / {p.maxHp} HP</span>
                             </div>
                             <div className={`w-16 h-16 border-2 flex items-center justify-center transition-all ${turn === 'enemy' && !isActing ? 'border-red-900 shadow-[0_0_30px_rgba(153,27,27,0.3)] animate-pulse' : 'border-zinc-800'}`}>
                                <Skull size={24} className="text-zinc-600" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alchemical Gauge Bottom */}
            <footer className="mt-auto border-t border-zinc-900 pt-8 flex justify-between items-end">
                <div className="flex gap-16">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase text-zinc-600 mb-2">Reagent Inventory</span>
                        <div className="flex gap-4">
                            {stats.reagents.map(r => (
                                <div key={r.id} className="flex flex-col px-3 py-1 bg-zinc-900/40 border border-zinc-800">
                                   <span className="text-[9px] font-black text-amber-500 uppercase">{r.id[0]}</span>
                                   <span className="text-[7px] text-zinc-500 font-bold">{r.quantity}u</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-gold/40 uppercase tracking-[0.5em] mb-2">Stigma Threat</span>
                    <div className="h-0.5 w-64 bg-zinc-900 overflow-hidden rounded-full">
                         <div className="h-full bg-gold/30" style={{ width: `${stats.stigma}%` }} />
                    </div>
                </div>
            </footer>
        </div>
    );
};
