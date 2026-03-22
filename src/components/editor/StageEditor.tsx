import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import type { SceneScript, SpriteAction } from '../../data/schema';
import { 
    MousePointer2, 
    Play, 
    Save, 
    UserPlus, 
    Map as MapIcon, 
    Trash2, 
    Plus, 
    MessageCircle, 
    Move, 
    Smile, 
    Clock, 
    XOctagon,
    Sword,
    Anchor,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

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
    const [activeTab, setActiveTab] = useState<'actors' | 'timeline'>('actors');

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

    const addAction = (type: SpriteAction['type']) => {
        const newAction: SpriteAction = {
            type,
            actorId: selectedActorId || editingScene.actors[0]?.id || 'Mystery',
            duration: 1000
        };

        if (type === 'move') {
            newAction.targetX = 10;
            newAction.targetY = 7;
        } else if (type === 'say') {
            newAction.text = "New dialogue entry...";
        } else if (type === 'emote') {
            newAction.emotion = "idea";
        }

        setEditingScene(prev => ({ ...prev, timeline: [...prev.timeline, newAction] }));
        setActiveTab('timeline');
    };

    const updateAction = (index: number, updates: Partial<SpriteAction>) => {
        setEditingScene(prev => ({
            ...prev,
            timeline: prev.timeline.map((a, i) => i === index ? { ...a, ...updates } as SpriteAction : a)
        }));
    };

    const moveAction = (index: number, direction: 'up' | 'down') => {
        const newTimeline = [...editingScene.timeline];
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= newTimeline.length) return;
        
        [newTimeline[index], newTimeline[target]] = [newTimeline[target], newTimeline[index]];
        setEditingScene(prev => ({ ...prev, timeline: newTimeline }));
    };

    const deleteAction = (index: number) => {
        setEditingScene(prev => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }));
    };

    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (activeTab !== 'actors' || !selectedActorId) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
        const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);
        updateActorPosition(selectedActorId, x, y);
    };

    return (
        <div className="flex-1 flex bg-zinc-900 overflow-hidden">
            {/* Sidebar Controls */}
            <aside className="w-80 border-r border-zinc-800 p-6 flex flex-col gap-6 bg-zinc-950/80 shadow-2xl z-10 overflow-y-auto">
                <header>
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] uppercase font-black text-gold tracking-widest">Staging Engine</span>
                        <div className="flex gap-2">
                           <button onClick={() => triggerScene(editingScene.id)} className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-sm text-zinc-300">
                               <Play size={14} />
                           </button>
                           <button onClick={handleSave} className="p-2 bg-gold hover:bg-white text-zinc-950 rounded-sm shadow-lg transition-all">
                               <Save size={14} />
                           </button>
                        </div>
                    </div>
                </header>

                {/* Sub-Tabs */}
                <div className="flex border-b border-zinc-800 mb-4">
                    <button 
                        onClick={() => setActiveTab('actors')}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'actors' ? 'border-gold text-gold' : 'border-transparent text-zinc-600'}`}
                    >
                        Cast
                    </button>
                    <button 
                        onClick={() => setActiveTab('timeline')}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'timeline' ? 'border-gold text-gold' : 'border-transparent text-zinc-600'}`}
                    >
                        Script
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'actors' ? (
                        <motion.div key="actors" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                {(['digby', 'venetia', 'sailor', 'scholar'] as const).map(type => (
                                    <button 
                                        key={type} 
                                        onClick={() => addActor(type)}
                                        className="p-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white transition-all text-[8px] uppercase font-bold flex flex-col items-center gap-2 rounded-sm"
                                    >
                                        <UserPlus size={16} />
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {editingScene.actors.map(actor => (
                                    <div 
                                        key={actor.id} 
                                        onClick={() => setSelectedActorId(actor.id)}
                                        className={`p-3 border rounded-sm cursor-pointer transition-all flex items-center justify-between ${selectedActorId === actor.id ? 'border-gold bg-gold/5 text-white shadow-[0_0_15px_rgba(197,160,89,0.1)]' : 'border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-sm ring-1 ring-zinc-700" style={{ backgroundColor: actor.spriteType === 'digby' ? '#1e1e1e' : actor.spriteType === 'venetia' ? '#c5a059' : '#3f3f3f' }} />
                                            <span className="text-[10px] font-mono font-bold uppercase">{actor.id.split('_')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                           <span className="text-[9px] font-mono opacity-40">({actor.startX},{actor.startY})</span>
                                           <Trash2 size={12} className="hover:text-red-500" onClick={(e) => { e.stopPropagation(); deleteActor(actor.id); }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="timeline" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                                <button onClick={() => addAction('say')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-blue-500 text-blue-500 rounded-sm"><MessageCircle size={14} /></button>
                                <button onClick={() => addAction('move')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-green-500 text-green-500 rounded-sm"><Move size={14} /></button>
                                <button onClick={() => addAction('emote')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-amber-500 rounded-sm"><Smile size={14} /></button>
                                <button onClick={() => addAction('wait')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-300 text-zinc-300 rounded-sm"><Clock size={14} /></button>
                                <button onClick={() => addAction('vanish')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-red-500 rounded-sm"><XOctagon size={14} /></button>
                                <button onClick={() => addAction('trigger_combat')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-red-600 text-red-600 rounded-sm"><Sword size={14} /></button>
                                <button onClick={() => addAction('trigger_ship_combat')} className="flex-shrink-0 p-2 bg-zinc-900 border border-zinc-800 hover:border-blue-400 text-blue-400 rounded-sm"><Anchor size={14} /></button>
                            </div>

                            <div className="space-y-3 pb-24">
                                {editingScene.timeline.map((action, idx) => (
                                    <div key={idx} className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-sm group">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono text-zinc-700">#{idx+1}</span>
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${action.type === 'say' ? 'text-blue-500' : action.type === 'move' ? 'text-green-500' : 'text-zinc-500'}`}>
                                                    {action.type}
                                                </span>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => moveAction(idx, 'up')} className="p-1 hover:text-white"><ChevronUp size={12} /></button>
                                                <button onClick={() => moveAction(idx, 'down')} className="p-1 hover:text-white"><ChevronDown size={12} /></button>
                                                <button onClick={() => deleteAction(idx)} className="p-1 hover:text-red-500"><Trash2 size={12} /></button>
                                            </div>
                                        </div>

                                        {/* Action Specific Fields */}
                                        <div className="space-y-3">
                                            {(['say', 'move', 'emote', 'vanish'] as const).includes(action.type as any) && (
                                                <select 
                                                    value={action.actorId}
                                                    onChange={(e) => updateAction(idx, { actorId: e.target.value })}
                                                    className="w-full bg-zinc-950 border border-zinc-800 text-[10px] p-2 font-mono uppercase font-bold text-zinc-400"
                                                >
                                                    {editingScene.actors.map(a => <option key={a.id} value={a.id}>{a.id.split('_')[0]}</option>)}
                                                    <option value="Mystery">Mystery</option>
                                                </select>
                                            )}

                                            {action.type === 'say' && (
                                                <textarea 
                                                    value={action.text || ''}
                                                    onChange={(e) => updateAction(idx, { text: e.target.value })}
                                                    className="w-full bg-zinc-950 border border-zinc-800 text-[11px] p-3 font-serif italic text-zinc-300 min-h-[60px]"
                                                />
                                            )}

                                            {action.type === 'move' && (
                                                <div className="flex gap-2">
                                                    <input type="number" value={action.targetX} onChange={(e) => updateAction(idx, { targetX: parseInt(e.target.value) })} className="w-1/2 bg-zinc-950 border border-zinc-800 text-[10px] p-2 font-mono text-zinc-300" placeholder="X" />
                                                    <input type="number" value={action.targetY} onChange={(e) => updateAction(idx, { targetY: parseInt(e.target.value) })} className="w-1/2 bg-zinc-950 border border-zinc-800 text-[10px] p-2 font-mono text-zinc-300" placeholder="Y" />
                                                </div>
                                            )}

                                            {action.type === 'emote' && (
                                                <select 
                                                    value={action.emotion}
                                                    onChange={(e) => updateAction(idx, { emotion: e.target.value as any })}
                                                    className="w-full bg-zinc-950 border border-zinc-800 text-[10px] p-2 font-mono uppercase text-zinc-300"
                                                >
                                                    <option value="idea">Idea</option>
                                                    <option value="surprise">Surprise</option>
                                                    <option value="heart">Heart</option>
                                                    <option value="sleep">Sleep</option>
                                                </select>
                                            )}

                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] font-black uppercase text-zinc-600 tracking-tighter">Duration (ms)</span>
                                                <input type="number" value={action.duration} onChange={(e) => updateAction(idx, { duration: parseInt(e.target.value) })} className="flex-1 bg-zinc-950 border border-zinc-800 text-[9px] p-1.5 font-mono text-zinc-400" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </aside>

            {/* Stage Canvas */}
            <main className="flex-1 p-12 overflow-auto flex flex-col items-center justify-center bg-[#0a0a0a]">
                <div className="mb-4 flex flex-col items-center text-center">
                   <h2 className="text-2xl font-black italic tracking-tighter text-zinc-100 flex items-center gap-3">
                      <MapIcon size={24} className="text-gold" />
                      {editingScene.id.replace(/_/g, ' ').toUpperCase()}
                   </h2>
                   <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-2">Staging Stage / Active Buffers</p>
                </div>

                <div 
                    className="relative border-2 border-zinc-800 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-[#111] overflow-hidden group/stage"
                    style={{ width: TILE_SIZE * 24, height: TILE_SIZE * 15 }}
                    onClick={handleGridClick}
                >
                    {/* Visual Grid Layer */}
                    <div className="absolute inset-0 pointer-events-none grid grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-[repeat(15,minmax(0,1fr))] opacity-20">
                        {Array.from({ length: 24 * 15 }).map((_, i) => (
                            <div key={i} className="border-[0.2px] border-zinc-500/30" />
                        ))}
                    </div>

                    {/* Actors Layer */}
                    {editingScene.actors.map(actor => (
                        <motion.div
                            key={actor.id}
                            animate={{ left: actor.startX * TILE_SIZE, top: actor.startY * TILE_SIZE }}
                            className={`absolute border-2 shadow-2xl rounded-sm cursor-move flex items-center justify-center transition-shadow ${selectedActorId === actor.id ? 'border-gold z-50 ring-[8px] ring-gold/10' : 'border-zinc-900 group-hover/stage:border-zinc-700'}`}
                            style={{ width: TILE_SIZE, height: TILE_SIZE, backgroundColor: actor.spriteType === 'digby' ? '#1e1e1e' : actor.spriteType === 'venetia' ? '#c5a059' : '#3f3f3f' }}
                        >
                            <span className="text-white opacity-20 pointer-events-none font-mono text-[8px] uppercase font-black text-center leading-none">
                                {actor.spriteType[0]}
                            </span>
                            
                            {/* Actor Label Overlay */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900 px-1 py-0.5 text-[6px] font-mono text-zinc-500 uppercase whitespace-nowrap opacity-0 group-hover/stage:opacity-100 transition-opacity">
                                {actor.id.split('_')[0]}
                            </div>
                        </motion.div>
                    ))}

                    {/* Cursor Interaction Guide */}
                    {selectedActorId && activeTab === 'actors' && (
                        <div className="absolute pointer-events-none border-2 border-gold/40 border-dashed animate-pulse" 
                             style={{ width: TILE_SIZE, height: TILE_SIZE }} />
                    )}
                </div>
                
                <footer className="mt-12 flex gap-12 items-center text-zinc-600 font-mono text-[9px] font-bold uppercase tracking-[0.3em] bg-zinc-900/40 px-8 py-3 rounded-full border border-zinc-800">
                    <div className="flex items-center gap-3">
                        <MousePointer2 size={12} className="text-gold" /> [Click] Placement
                    </div>
                    <div className="flex items-center gap-3">
                        <Plus size={12} className="text-gold" /> [Script] Sequence
                    </div>
                    <div>
                       Current Scene ID: <span className="text-zinc-400">{editingScene.id}</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};
