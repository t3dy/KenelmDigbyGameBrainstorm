import React, { useState, useEffect } from 'react';
import { Ship, Anchor, AlertCircle, Shield, Droplets, Zap, X, ArrowLeftRight, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { WeaponSalve } from '../laboratory/WeaponSalve';

export const NavMap: React.FC = () => {
    const { 
        location: currentLoc, travelTo, stats, manifest, setView, setEncounter, addLog,
        ship, pursuer, tick
    } = useGameStore();
    const [hoveredLoc, setHoveredLoc] = useState<string | null>(null);
    const [isRepairOpen, setIsRepairOpen] = useState(false);

    const hasMarket = !!(manifest as any).markets[currentLoc];
    const locationName = manifest.locations.find(l => l.id === currentLoc)?.name || currentLoc;

    // Tactical Pursuit Loop (Driven by Store Tick)
    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 1000);
        return () => clearInterval(timer);
    }, [tick]);

    // Synergy Loop: Sync Stigma to Pursuer Aggro
    // Collision Check: Pursuit Interception (Systemic)
    useEffect(() => {
        const dx = ship.x - pursuer.x;
        const dy = ship.y - pursuer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.5 && pursuer.active) {
            setEncounter('pursuit_confrontation');
            addLog("⚠️ PURSUIT: The Serene fleet has intercepted the Eagle!");
        }
    }, [ship.x, ship.y, pursuer.x, pursuer.y, pursuer.active, setEncounter, addLog]);

    return (
        <div className="flex-1 flex flex-col bg-zinc-50 relative overflow-hidden h-full">
            {/* Map Canvas */}
            <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-[#f4f1ea] border-b-2 border-zinc-200">
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Locations */}
                {manifest.locations.map((loc) => (
                    <div 
                        key={loc.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        onClick={() => travelTo(loc.id)}
                        onMouseEnter={() => setHoveredLoc(loc.id)}
                        onMouseLeave={() => setHoveredLoc(null)}
                    >
                        <div className={`p-2 rounded-full border-2 transition-all ${currentLoc === loc.id ? 'bg-amber-500 border-zinc-950 scale-125 shadow-2xl' : 'bg-white border-zinc-300 group-hover:border-amber-500 shadow-sm'}`}>
                            {loc.type === 'capital' ? <Shield size={16} /> : <Anchor size={16} />}
                        </div>
                        {hoveredLoc === loc.id && (
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-zinc-950 text-white p-4 rounded-sm shadow-2xl w-56 text-[10px] font-mono z-50 border border-zinc-700">
                                <p className="font-bold uppercase mb-1 tracking-[0.2em] text-amber-500">{loc.name}</p>
                                <p className="opacity-60 italic mb-4 leading-relaxed">"{loc.description}"</p>
                                <div className="border-t border-zinc-800 pt-3 flex justify-between items-center">
                                    <span className="text-zinc-500 uppercase tracking-widest text-[8px]">Coordinates</span>
                                    <span className="font-bold text-zinc-300">{loc.x}N, {loc.y}E</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Pursuer Indicator */}
                <motion.div 
                    animate={{ left: `${pursuer.x}%`, top: `${pursuer.y}%` }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-red-500/10 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                            <AlertCircle className="text-red-500" size={20} />
                        </div>
                        <div className="mt-2 bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded-sm shadow-lg">
                           The Pursuer
                        </div>
                    </div>
                </motion.div>

                {/* Current Ship Icon (Eagle) */}
                <motion.div
                    animate={{ 
                        left: `${ship.x}%`, 
                        top: `${ship.y}%` 
                    }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    className="absolute transform -translate-x-1/2 -translate-y-12 z-20 pointer-events-none text-zinc-950"
                >
                    <Ship size={32} className="drop-shadow-2xl" />
                </motion.div>

            </div>

            {/* Tactical Ship Status Footer */}
            <div className="h-56 bg-zinc-950 text-white p-10 flex gap-12 border-t-4 border-amber-500 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-30">
                <div className="w-[450px] border-r border-zinc-800 pr-12 flex items-center gap-12">
                   <div className="w-48">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-2">
                            <Ship size={14} className="text-amber-500" /> Naval Integrity
                        </h4>
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-5xl font-mono font-bold tracking-tighter text-white">{ship.hull}%</span>
                            <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase tracking-widest">Structure</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${ship.hull}%` }}
                                className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            />
                        </div>
                   </div>

                   {/* Port Interaction */}
                   <div className="flex-1 border-l border-zinc-900 pl-12">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-2">
                            <Anchor size={14} className="text-amber-500" /> Current Mooring
                        </h4>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-100 italic mb-4">Port of {locationName.toUpperCase()}</p>
                        <button 
                            disabled={!hasMarket}
                            onClick={() => setView('market')}
                            className="w-full py-4 bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-400 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-2 mb-2"
                        >
                            <ArrowLeftRight size={14} /> Dock & Trade
                        </button>
                        <button 
                            onClick={() => setView('port')}
                            className="w-full py-4 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-700 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <MapIcon size={14} className="text-amber-500" /> Venture Ashore
                        </button>
                   </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-8 items-center">
                   {ship.components.map(comp => (
                       <div key={comp.id} className="bg-zinc-900/50 p-5 border border-zinc-800 group hover:border-amber-500/50 transition-all rounded-sm relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
                           <div className="flex justify-between items-start mb-4">
                               <div className="flex flex-col">
                                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-1">Component</span>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-100 group-hover:text-amber-500 transition-colors">{comp.name}</span>
                               </div>
                               <span className="text-xs font-mono font-black text-white">{comp.health}%</span>
                           </div>
                           <div className="w-full h-1 bg-zinc-950 overflow-hidden rounded-full mb-6">
                               <motion.div 
                                 animate={{ width: `${comp.health}%` }}
                                 className={`h-full ${comp.health < 40 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}
                               />
                           </div>
                           <div className="flex gap-2">
                               <button 
                                   onClick={() => setIsRepairOpen(true)}
                                   className="flex-1 py-1.5 bg-zinc-950 border border-zinc-800 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:border-zinc-500 transition-all rounded-sm flex items-center justify-center gap-2"
                               >
                                   [H] Repair
                               </button>
                               <button className="w-8 h-8 bg-zinc-950 border border-zinc-800 text-zinc-700 hover:text-amber-500 hover:border-amber-500 transition-all rounded-sm flex items-center justify-center">
                                   <Droplets size={12} />
                               </button>
                           </div>
                       </div>
                   ))}
                </div>

                <aside className="w-80 border-l border-zinc-800 pl-12 flex flex-col justify-center">
                   <div className="flex items-center gap-3 mb-4">
                       <Zap size={18} className="text-amber-500 animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic font-mono">Spirit Resonance</span>
                   </div>
                   <p className="text-[11px] leading-relaxed text-zinc-400 font-serif italic pr-8">
                       "The ship is but a heavy vessel for the spirit's light. Protect the athanor, or the voyage into the unknown will freeze in the Mediterranean night."
                   </p>
                   <div className="mt-6 flex items-baseline gap-2">
                       <span className="text-xs font-mono font-bold text-amber-500">STIGMA STATUS:</span>
                       <span className="text-xs font-mono font-bold text-red-500 uppercase">{stats.stigma > 30 ? 'SUSPECT' : 'STEALTH'}</span>
                   </div>
                </aside>
            </div>

            {/* Remote Repair Modal */}
            <AnimatePresence>
                {isRepairOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-zinc-950/90 z-50 flex items-center justify-center p-12 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-6xl h-[80vh] bg-white border-4 border-zinc-950 relative shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <button 
                                onClick={() => setIsRepairOpen(false)}
                                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-950 transition-colors z-[60]"
                            >
                                <X size={32} />
                            </button>
                            <div className="h-full">
                                <WeaponSalve mode="ship" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
