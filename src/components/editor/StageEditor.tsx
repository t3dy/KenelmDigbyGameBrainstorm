import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import type { SceneScript } from '../../data/schema';
import { MousePointer2, Play, Save, UserPlus, Map as MapIcon, Trash2 } from 'lucide-react';

const TILE_SIZE = 32;

export const StageEditor: React.FC = () => {
    const { currentScene, triggerScene, saveScene } = useGameStore();
    const [editingScene, setEditingScene] = useState<SceneScript>(currentScene || {
        id: 'new_scene',
        background: 'eagle_deck',
        actors: [],
        timeline: []
    });

    const [selectedActorId, setSelectedActorId] = useState<string | null>(null);

    const handleSave = () => {
        saveScene(editingScene);
    };

    const addActor = (type: 'digby' | 'venetia' | 'sailor' | 'scholar') => {
        const newActor = {
            id: `${type}_${Date.now()}`,
            startX: 10,
            startY: 7,
            spriteType: type
        };
        setEditingScene(prev => ({ ...prev, actors: [...prev.actors, newActor] }));
    };

    const updateActorPosition = (id: string, x: number, y: number) => {
        setEditingScene(prev => ({
            ...prev,
            actors: prev.actors.map(a => a.id === id ? { ...a, startX: x, startY: y } : a)
        }));
    };

    const deleteActor = (id: string) => {
        setEditingScene(prev => ({ ...prev, actors: prev.actors.filter(a => a.id !== id) }));
        if (selectedActorId === id) setSelectedActorId(null);
    };

    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!selectedActorId) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
        const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);
        updateActorPosition(selectedActorId, x, y);
    };

    return (
        <div className="flex-1 flex bg-zinc-900 overflow-hidden">
            {/* Toolbar */}
            <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col gap-8 bg-zinc-950/50">
                <header>
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Stage Controls</h3>
                   <div className="space-y-2">
                       <button onClick={() => triggerScene(editingScene.id)} className="w-full flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 hover:border-gold-dark text-gold transition-all rounded-sm font-mono text-[10px] uppercase font-bold tracking-widest">
                           Play Scene <Play size={14} />
                       </button>
                       <button onClick={handleSave} className="w-full flex items-center justify-between p-3 bg-gold text-zinc-950 font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg transform active:scale-95 transition-all">
                           Save Manifest <Save size={14} />
                       </button>
                   </div>
                </header>

                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4 border-b border-zinc-800 pb-2">Actors</h3>
                   <div className="grid grid-cols-2 gap-2 mb-4">
                       {(['digby', 'venetia', 'sailor', 'scholar'] as const).map(type => (
                           <button 
                                key={type} 
                                onClick={() => addActor(type)}
                                className="p-2 border border-zinc-800 hover:border-zinc-100 hover:text-white text-zinc-400 transition-all font-mono text-[8px] uppercase font-bold flex flex-col items-center gap-1"
                           >
                               <UserPlus size={14} />
                               {type}
                           </button>
                       ))}
                   </div>
                   
                   <div className="space-y-1">
                       {editingScene.actors.map(actor => (
                           <div 
                                key={actor.id} 
                                onClick={() => setSelectedActorId(actor.id)}
                                className={`flex items-center justify-between px-3 py-2 border rounded-sm cursor-pointer transition-all ${selectedActorId === actor.id ? 'border-gold bg-gold/10 text-white' : 'border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
                           >
                               <span className="text-[9px] font-mono font-bold uppercase truncate pr-4">{actor.id.split('_')[0]}</span>
                               <div className="flex items-center gap-2">
                                  <span className="text-[8px] opacity-40">({actor.startX},{actor.startY})</span>
                                  <Trash2 size={12} className="hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); deleteActor(actor.id); }} />
                               </div>
                           </div>
                       ))}
                   </div>
                </div>

                <div className="mt-auto opacity-20 pointer-events-none italic font-serif text-[10px] border-t border-zinc-800 pt-4">
                    "The staging of history is the primary engine of its re-writing."
                </div>
            </aside>

            {/* Canvas */}
            <main className="flex-1 p-12 overflow-auto flex flex-col items-center justify-center bg-[radial-gradient(#1a1d23_1px,transparent_1px)] bg-[size:32px_32px]">
                <div 
                    className="relative border-2 border-zinc-800 shadow-2xl bg-zinc-950/20"
                    style={{ width: TILE_SIZE * 20, height: TILE_SIZE * 15 }}
                    onClick={handleGridClick}
                >
                    {/* Visual Grid */}
                    <div className="absolute inset-0 pointer-events-none grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(15,minmax(0,1fr))]">
                        {Array.from({ length: 20 * 15 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-zinc-900/50" />
                        ))}
                    </div>

                    {/* Actors */}
                    {editingScene.actors.map(actor => (
                        <motion.div
                            key={actor.id}
                            animate={{ left: actor.startX * TILE_SIZE, top: actor.startY * TILE_SIZE }}
                            className={`absolute border-2 shadow-lg rounded-sm cursor-move flex items-center justify-center ${selectedActorId === actor.id ? 'border-gold z-50 ring-4 ring-gold/20' : 'border-zinc-900'}`}
                            style={{ width: TILE_SIZE, height: TILE_SIZE, backgroundColor: actor.spriteType === 'digby' ? '#1e1e1e' : actor.spriteType === 'venetia' ? '#c5a059' : '#3f3f3f' }}
                        >
                            <span className="text-white opacity-40 pointer-events-none font-mono text-[8px] uppercase font-bold text-center leading-none">
                                {actor.spriteType[0]}
                            </span>
                        </motion.div>
                    ))}

                    {/* Cursor Guide */}
                    {selectedActorId && (
                        <div className="absolute pointer-events-none border-2 border-gold-dark/40 border-dashed" 
                             style={{ width: TILE_SIZE, height: TILE_SIZE }} />
                    )}
                </div>
                
                <div className="mt-8 flex gap-8 items-center opacity-40">
                    <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">
                        <MousePointer2 size={12} /> Click grid to place
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">
                       <MapIcon size={12} /> Staging Resolution: {TILE_SIZE}px/unit
                    </div>
                </div>
            </main>
        </div>
    );
};
