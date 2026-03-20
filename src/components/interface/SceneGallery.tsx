import React from 'react';
import { Play, Book, Calendar, Shield, MapPin } from 'lucide-react';
import { useGameStore } from '../../state/gameStore';
import { motion } from 'framer-motion';

export const SceneGallery: React.FC = () => {
    const { manifest, triggerScene, setView, startDirector } = useGameStore();

    const handlePlayScene = (id: string) => {
        triggerScene(id);
        setView('staging');
    };

    const handlePlayAll = () => {
        const allIds = manifest.scenes.map(s => s.id);
        startDirector(allIds);
    };

    return (
        <div className="flex-1 bg-[#1a1412] text-[#e8dcc4] p-12 overflow-y-auto">
            <header className="mb-12 border-b border-[#3d2c25] pb-8 flex justify-between items-end">
                <div>
                    <span className="text-[10px] uppercase font-black text-amber-500 tracking-[0.4em] mb-2 block">Archive / Chronicles</span>
                    <h2 className="text-5xl font-black italic tracking-tighter">THE DIGBY CHRONICLES</h2>
                    <p className="mt-4 text-sm opacity-60 font-serif italic max-w-2xl">
                        "From the gunpowder shadow of 1603 to the alchemical maturity of 1665. Every scene is a stitch in the tapestry of a life lived between the sword and the soul."
                    </p>
                    <button 
                        onClick={handlePlayAll}
                        className="mt-8 px-8 py-4 bg-amber-500 text-zinc-950 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-amber-400 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] transform hover:-translate-y-1"
                    >
                        <Play size={16} fill="currentColor" /> Play Full Legacy Reel (20 Scenes)
                    </button>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-mono font-bold text-[#3d2c25]">{manifest.scenes.length}</span>
                    <span className="block text-[8px] uppercase tracking-widest opacity-40">Resolved Timeline Entries</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {manifest.scenes.map((scene, idx) => (
                    <motion.div 
                        key={scene.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-[#2a1d18]/40 border border-[#3d2c25] p-6 hover:bg-[#2a1d18] hover:border-amber-500/50 transition-all shadow-xl cursor-pointer relative overflow-hidden"
                        onClick={() => handlePlayScene(scene.id)}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Book size={64} />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-[#3d2c25] flex items-center justify-center text-amber-500 font-mono font-bold text-xs ring-4 ring-black/20">
                                {idx + 1}
                            </div>
                            <div>
                                <h3 className="text-lg font-black tracking-tight leading-none group-hover:text-amber-500 transition-colors">
                                    {scene.id.replace(/_/g, ' ').toUpperCase()}
                                </h3>
                                <span className="text-[9px] uppercase tracking-widest opacity-40 font-mono">
                                    Epoch: {scene.id.split('_')[0]}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-[10px] opacity-60 italic">
                                <MapPin size={10} />
                                <span>Background: {scene.background}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] opacity-60 italic">
                                <Shield size={10} />
                                <span>Actors: {scene.actors.length}</span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-[#e8dcc4] text-[#1a1412] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white transition-all transform group-active:scale-95">
                            <Play size={14} fill="currentColor" /> Replay Memory
                        </button>
                    </motion.div>
                ))}
            </div>

            <footer className="mt-20 pt-12 border-t border-[#3d2c25] opacity-20 text-[9px] uppercase tracking-[0.5em] text-center font-mono">
                The Almagest Chronicle Engine // Deterministic Memory Access
            </footer>
        </div>
    );
};
