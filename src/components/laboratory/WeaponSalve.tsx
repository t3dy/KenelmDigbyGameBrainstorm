import React, { useState } from 'react';
import { Heart, Activity, ShieldCheck, Crosshair, Beaker, RefreshCw, Ship } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { useEngineStore } from '../../state/engineStore';

export const WeaponSalve: React.FC<{ mode?: 'character' | 'ship' }> = ({ mode = 'character' }) => {
    const { characters, healCharacter, stats } = useGameStore();
    const { ship, repairShipComponent } = useEngineStore();
    const [currentMode, setCurrentMode] = useState<'character' | 'ship'>(mode);
    const [selectedId, setSelectedId] = useState<string>(
        currentMode === 'character' ? characters[0]?.id : ship.components[0]?.id
    );
    const [selectedItem] = useState<string | null>('powder_of_sympathy');
    const [isApplying, setIsApplying] = useState(false);

    const targetChar = characters.find(c => c.id === selectedId);
    const targetComp = ship.components.find(c => c.id === selectedId);

    const handleApply = async (logic: 'direct' | 'sympathy') => {
        if (!selectedItem || isApplying) return;
        
        setIsApplying(true);
        // Simulated application time between London and the Mediterranean
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (currentMode === 'character' && targetChar) {
            healCharacter(targetChar.id, selectedItem, logic);
        } else if (currentMode === 'ship' && targetComp) {
            repairShipComponent(targetComp.id, 25);
        }
        
        setIsApplying(false);
    };

    return (
        <div className="flex-1 flex flex-col p-8 font-serif bg-[#fdfaf6] bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] min-h-0 overflow-hidden">
            <header className="mb-8 border-b-2 border-zinc-950 pb-4 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl italic mb-1 uppercase tracking-tighter">Sympathetic Workbench</h2>
                    <p className="text-amber-700 font-display uppercase tracking-[0.2em] text-[10px] font-bold">Action at a Distance (Librarian Verified)</p>
                </div>
                <div className="flex bg-zinc-100 p-1 rounded-sm border border-zinc-200">
                    <button 
                        onClick={() => setCurrentMode('character')}
                        className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest transition-all ${currentMode === 'character' ? 'bg-zinc-950 text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                        Mortal Frame
                    </button>
                    <button 
                        onClick={() => setCurrentMode('ship')}
                        className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest transition-all ${currentMode === 'ship' ? 'bg-zinc-950 text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                        Naval Integrity
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 h-full min-h-0">
                {/* Left: Target Domain */}
                <main className="col-span-5 bg-white p-8 border-2 border-zinc-950 shadow-[10px_10px_0_rgba(0,0,0,0.05)] flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-10">
                        <span className="font-display uppercase tracking-[0.2em] text-[10px] font-black flex items-center gap-2">
                             {currentMode === 'character' ? <Activity size={16} className="text-red-600" /> : <Ship size={16} className="text-amber-600" />}
                             Target Domain: {currentMode === 'character' ? 'Mortal Body' : 'The Fleet'}
                        </span>
                    </div>

                    <div className="relative mb-12">
                        <div className="w-48 h-48 bg-zinc-50 border-2 border-zinc-100/50 rounded-sm flex items-center justify-center relative overflow-hidden group">
                           <motion.div
                             animate={isApplying ? { scale: [1, 1.1, 1], opacity: [0.1, 0.4, 0.1] } : {}}
                             className="absolute inset-0 bg-amber-500/10 pointer-events-none"
                           />
                           {currentMode === 'character' ? (
                               <Heart size={64} className="text-zinc-200 group-hover:text-red-100 transition-colors" />
                           ) : (
                               <Ship size={64} className="text-zinc-200 group-hover:text-amber-100 transition-colors" />
                           )}
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                            {currentMode === 'character' ? targetChar?.name : targetComp?.name}
                        </div>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                            <span>Integrity</span>
                            <span className="font-mono">{(currentMode === 'character' ? targetChar?.health : targetComp?.health) || 0}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ width: `${(currentMode === 'character' ? targetChar?.health : targetComp?.health) || 0}%` }}
                                className={`h-full ${currentMode === 'character' ? 'bg-red-500' : 'bg-amber-500'}`}
                            />
                        </div>
                    </div>
                </main>

                {/* Center: Aetheric Flux */}
                <div className="col-span-2 flex flex-col justify-center items-center relative">
                    <div className="w-px h-full bg-zinc-200 relative">
                        <motion.div 
                          animate={{ y: [0, 400], opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute top-0 -left-1 w-2 h-12 bg-amber-400/40 blur-sm"
                        />
                    </div>
                </div>

                {/* Right: The Relic (Powder of Sympathy) */}
                <main className="col-span-5 bg-white p-8 border-2 border-zinc-950 shadow-[10px_10px_0_rgba(0,0,0,0.05)] flex flex-col items-center">
                    <div className="w-full mb-10 flex justify-between items-center">
                        <span className="font-display uppercase tracking-[0.2em] text-[10px] font-black flex items-center gap-2">
                             <Crosshair size={16} className="text-amber-600" /> Sympathetic Relic
                        </span>
                        <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold">
                             <Beaker size={14} /> Powder of Sympathy
                        </div>
                    </div>

                    <div className="relative mb-12">
                        <div className="w-48 h-48 bg-amber-50/20 border-2 border-amber-600/30 rounded-sm flex items-center justify-center shadow-inner group cursor-pointer hover:border-amber-600/60 transition-colors">
                           <motion.div
                             animate={isApplying ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                             className="text-amber-600"
                           >
                              <ShieldCheck size={80} strokeWidth={1} />
                           </motion.div>
                        </div>
                    </div>

                    <button
                        onClick={() => handleApply('sympathy')}
                        disabled={!selectedItem || isApplying}
                        className={`w-full p-6 bg-amber-600 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-amber-700 active:translate-y-1 transition-all flex items-center justify-center gap-3 shadow-xl ${isApplying ? 'animate-pulse' : ''}`}
                    >
                        {isApplying ? <RefreshCw className="animate-spin" size={18} /> : <span>Activate Resonance</span>}
                    </button>
                    
                    <div className="mt-8 flex flex-col items-center gap-2 italic text-zinc-400 text-[10px] text-center px-4 leading-relaxed">
                        "As the weapon is anointed in London, the molecules of the Mediterranean fleet shall coalesce in sympathetic repair."
                    </div>
                </main>
            </div>
            
            {/* Real-time Telemetry Log */}
            <div className="mt-8 p-4 bg-zinc-950 text-amber-500/80 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-4">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                {isApplying ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        [STATUS] TRANSMITTING SYMPATHETIC FLUX... WAIT FOR RESONANCE
                    </motion.span>
                ) : (
                    <span>[SYSTEM] STANDBY. CHANNEL CLEAR. STIGMA AT {stats.stigma}%</span>
                )}
            </div>
        </div>
    );
};
