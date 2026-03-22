import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Zap, Shield, AlertTriangle, Wind, Flame } from 'lucide-react';
import { useGameStore } from '../../state/gameStore';
import movesData from '../../data/moves.json';
import type { CombatMove, CombatVessel } from '../../data/schema';

export const ShipCombat: React.FC = () => {
    const { ship, damageComponent, setView, addLog, stats, consumeReagents, currentEncounter } = useGameStore();
    const [enemy, setEnemy] = useState<CombatVessel>(currentEncounter?.vessel || {
        id: 'generic_hostile',
        name: 'Unidentified Sail',
        hull: 100,
        maxHull: 100,
        components: [
            { id: 'sails', name: 'Main Mast', health: 100 },
            { id: 'hold', name: 'Cargo Hold', health: 100 }
        ]
    });

    const [charging, setCharging] = useState<Record<string, number>>(
        Object.fromEntries(movesData.ship_moves.map(m => [m.id, 0]))
    );
    const [log, setLog] = useState<string[]>(["ENGAGEMENT: Enemy vessel within culverin range!"]);
    const [isFiring, setIsFiring] = useState(false);

    // Tactical Timer
    useEffect(() => {
        const timer = setInterval(() => {
            if (enemy.hull <= 0) return;

            setCharging(prev => {
                const next = { ...prev };
                movesData.ship_moves.forEach(m => {
                    if (next[m.id] < 100) {
                        next[m.id] = Math.min(100, next[m.id] + 5); // 5% per tick
                    }
                });
                return next;
            });

            // Enemy AI logic: Focus fire on damaged systems
            if (Math.random() > 0.90) {
                // Find most damaged component
                const damagedComps = [...ship.components].sort((a, b) => a.health - b.health);
                const targetComp = Math.random() > 0.3 ? damagedComps[0] : damagedComps[Math.floor(Math.random() * damagedComps.length)];
                
                damageComponent(targetComp.id, 10);
                setLog(prev => [...prev.slice(-4), `IMPACT: Enemy fire focus on our ${targetComp.name}!`]);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [enemy.hull, ship.components, damageComponent]);

    const fireWeapon = useCallback((weaponId: string) => {
        const weapon = movesData.ship_moves.find(m => m.id === weaponId) as CombatMove;
        if (!weapon || charging[weaponId] < 100) return;

        let potencyMultiplier = 1.0;

        // Check and consume reagents
        if (weapon.reagent_cost) {
            let totalPotency = 0;
            let reagentCount = 0;

            for (const [rid, qty] of Object.entries(weapon.reagent_cost)) {
                const reagent = stats.reagents.find(r => r.id === rid);
                const available = reagent?.quantity || 0;
                if (available < qty) {
                    addLog(`MISFIRE: Insufficient ${rid} for ${weapon.name}.`);
                    return;
                }
                
                // Average potency of used reagents (default to 50 if missing)
                totalPotency += (reagent?.potency || 50) * qty;
                reagentCount += qty;
            }
            
            // Scaled multiplier: 50 potency = 1.0x, 100 potency = 2.0x, 0 potency = 0.5x
            if (reagentCount > 0) {
                const avgPotency = totalPotency / reagentCount;
                potencyMultiplier = 0.5 + (avgPotency / 50); 
            }

            consumeReagents(weapon.reagent_cost);
        }

        setIsFiring(true);
        const damage = (weapon.damage || 15) * potencyMultiplier;
        const componentDmgCount = (weapon.component_damage || 0) * potencyMultiplier;

        addLog(`>> FIRING: ${weapon.name}! (Potency: ${Math.round(potencyMultiplier * 100)}%)`);
        
        // Random component hit
        const randomCompIdx = Math.floor(Math.random() * enemy.components.length);
        const hitComp = enemy.components[randomCompIdx];
        
        setTimeout(() => {
            setEnemy((prev: CombatVessel) => ({
                ...prev,
                hull: Math.max(0, prev.hull - damage),
                components: prev.components.map((c: any) => 
                    c.id === hitComp.id ? { ...c, health: Math.max(0, c.health - componentDmgCount) } : c
                )
            }));
            setLog(prev => [...prev.slice(-4), `IMPACT: ${weapon.name} scores a hit on their ${hitComp.name}!`]);
            setCharging(prev => ({ ...prev, [weaponId]: 0 }));
            setIsFiring(false);
        }, 600);
    }, [charging, enemy.components, stats.reagents, consumeReagents, addLog]);

    const handleVictory = () => {
        addLog("VICTORY: The enemy prize has been scuttled or surrendered.");
        setView('nav');
    };

    const handleBoarding = () => {
        addLog("BOARDING: Prepare the grapple hooks! We take them by force.");
        setView('combat');
    };

    return (
        <div className="flex-1 flex flex-col bg-zinc-950 text-white font-mono overflow-hidden h-full">
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Combat Header */}
            <header className="h-20 bg-zinc-900 border-b-2 border-amber-500/50 flex items-center px-12 justify-between z-10 shadow-2xl">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em] mb-1">Engagements / 1628 / Ship-to-Ship</span>
                    <h2 className="text-2xl font-bold italic tracking-tighter text-white">THE ADMIRAL'S DOCTRINE</h2>
                </div>
                <div className="flex items-center gap-8">
                     <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Wind Conditions</span>
                        <div className="flex items-center gap-2 text-zinc-300 italic font-serif">
                            <Wind size={16} className="text-blue-400" /> NW Force 4 (Moderate Sea)
                        </div>
                     </div>
                </div>
            </header>

            {/* Battle Arena */}
            <main className="flex-1 flex p-12 gap-12 relative">
                {/* Player Ship Sidebar */}
                <aside className="w-80 flex flex-col gap-6">
                    <header className="p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                        <h4 className="text-[10px] font-black uppercase text-gold tracking-widest mb-4">THE EAGLE (State)</h4>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="text-xs font-bold w-12 text-zinc-500">HULL</span>
                             <div className="flex-1 h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                                 <motion.div animate={{ width: `${ship.hull}%` }} className="h-full bg-emerald-500" />
                             </div>
                             <span className="text-[10px] font-bold w-8">{ship.hull}%</span>
                        </div>
                    </header>

                    <div className="space-y-3">
                        {ship.components.map(comp => (
                            <div key={comp.id} className="p-4 bg-zinc-900/50 border border-zinc-800 flex justify-between items-center group">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${comp.health < 30 ? 'text-red-500' : 'text-zinc-400'}`}>{comp.name}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-1 bg-zinc-950 rounded-full overflow-hidden">
                                        <motion.div animate={{ width: `${comp.health}%` }} className={`h-full ${comp.health < 30 ? 'bg-red-500' : 'bg-gold'}`} />
                                    </div>
                                    <span className="text-[9px] font-bold w-6">{comp.health}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Tactical Visuals (Two Ships Side-by-Side) */}
                <div className="flex-1 flex items-center justify-center gap-24 relative">
                    <AnimatePresence>
                        {isFiring && (
                            <motion.div 
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 200, opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8 }}
                                className="absolute top-1/2 left-1/4 z-50 pointer-events-none"
                            >
                                <div className="w-12 h-12 bg-white rounded-full blur-xl shadow-[0_0_50px_#fff]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* PC SHIP */}
                    <div className="flex flex-col items-center gap-8 scale-110">
                         <div className="relative group">
                            <Ship size={180} className="text-zinc-500 drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)] cursor-pointer hover:text-white transition-all" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="p-4 bg-zinc-950/80 border border-zinc-800 text-[10px] uppercase font-bold tracking-widest text-emerald-500">
                                    Flagship Integrity
                                </div>
                            </div>
                         </div>
                         <div className="px-8 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">
                            Sir Kenelm Digby, Cmdr.
                         </div>
                    </div>

                    <div className="flex flex-col items-center gap-6 opacity-30 italic text-zinc-700">
                        <div className="w-0.5 h-32 bg-zinc-800" />
                        <span className="text-[10px] uppercase tracking-widest">Tactical Threshold</span>
                        <div className="w-0.5 h-32 bg-zinc-800" />
                    </div>

                    {/* NPC SHIP */}
                    <div className="flex flex-col items-center gap-8 scale-110">
                        <div className="relative">
                            <Ship size={180} className="text-zinc-500 -scale-x-100 drop-shadow-[0_20px_50px_rgba(239,68,68,0.1)]" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {enemy.hull < 50 && <Flame size={64} className="text-red-500 animate-pulse opacity-50" />}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em] mb-4">Target: {enemy.name}</span>
                            <div className="w-64 h-3 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden mb-8 shadow-inner">
                                <motion.div animate={{ width: `${(enemy.hull / enemy.maxHull) * 100}%` }} className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                {enemy.components.map(comp => (
                                    <div key={comp.id} className="flex items-center gap-3">
                                        <div className="w-24 h-1 bg-zinc-900 overflow-hidden">
                                            <div className="h-full bg-red-500" style={{ width: `${comp.health}%` }} />
                                        </div>
                                        <span className="text-[8px] font-black uppercase text-zinc-600">{comp.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weapons Console */}
                <aside className="w-96 flex flex-col gap-6">
                    <header className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                        <h4 className="text-[10px] font-black uppercase text-gold tracking-widest mb-6 flex items-center gap-3">
                             <Shield size={16} /> Arsenal Control
                        </h4>
                        
                        <div className="flex flex-col gap-4">
                            {movesData.ship_moves.map(weapon => {
                                const isReady = charging[weapon.id] >= 100;
                                return (
                                    <div key={weapon.id} className="space-y-2">
                                        <div className="flex justify-between text-[9px] font-black uppercase text-zinc-500">
                                            <span>{weapon.name}</span>
                                            <span>{Math.floor(charging[weapon.id])}%</span>
                                        </div>
                                        <button 
                                            onClick={() => fireWeapon(weapon.id)}
                                            disabled={!isReady}
                                            className={`w-full py-4 border shadow-lg transition-all flex flex-col items-center ${isReady ? 'bg-zinc-100 text-zinc-950 border-white hover:bg-gold' : 'bg-zinc-950 text-zinc-700 border-zinc-800 opacity-20'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Zap size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isReady ? 'READY TO FIRE' : 'PRIMING...'}</span>
                                            </div>
                                            {weapon.reagent_cost && (
                                                <span className="text-[7px] font-bold mt-1 opacity-60">
                                                    Cost: {Object.entries(weapon.reagent_cost).map(([id, q]) => `${q} ${id}`).join(', ')}
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                            
                            <div className="h-px bg-zinc-800 my-2" />
                            
                            <button 
                                onClick={handleBoarding}
                                className="py-3 bg-zinc-800 border-2 border-amber-500/20 text-[10px] font-bold uppercase text-amber-500 hover:bg-amber-500 hover:text-zinc-950 transition-all flex items-center justify-center gap-2"
                            >
                                Grapple Ship
                            </button>
                        </div>
                    </header>

                    {/* Battle Log */}
                    <div className="flex-1 bg-zinc-950 border border-zinc-900 p-6 font-mono text-zinc-500 flex flex-col">
                        <div className="flex items-center gap-2 mb-4 text-[9px] font-black uppercase text-zinc-700">
                             <AlertTriangle size={12} /> Live Signal / Tactical Log
                        </div>
                        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                            {log.map((entry, idx) => (
                                <p key={idx} className="text-[10px] tracking-wide leading-relaxed animate-in fade-in slide-in-from-left-1 select-none">
                                    <span className="text-zinc-800 mr-2">[{idx}]</span>
                                    <span className={entry.includes('HIT') ? 'text-amber-500 font-black' : entry.includes('IMPACT') ? 'text-red-500' : 'text-zinc-500'}>
                                        {entry}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    {enemy.hull <= 0 && (
                        <motion.button 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={handleVictory}
                            className="w-full py-4 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
                        >
                            Claim Prize / Conclude
                        </motion.button>
                    )}
                </aside>
            </main>
        </div>
    );
};
