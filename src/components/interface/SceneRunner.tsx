import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import type { SceneScript, SpriteAction } from '../../data/schema';
import { User, MessageCircle, Info, Heart, Zap, Coffee } from 'lucide-react';

const TILE_SIZE = 32;

// Character Sprites (Simple SVG for now, can be replaced with PNGs)
const ActorSprite: React.FC<{ type: string, emotion?: string }> = ({ type, emotion }) => {
    const colors = {
        digby: '#1e1e1e', // Ink Black
        venetia: '#c5a059', // Gold
        sailor: '#3f3f3f', // Zinc
        scholar: '#4c1d95' // Purple
    };
    
    return (
        <div className="relative">
            {/* Emote Bubble */}
            <AnimatePresence>
                {emotion && (
                     <motion.div 
                        initial={{ opacity: 0, y: 0, scale: 0 }}
                        animate={{ opacity: 1, y: -25, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 border border-zinc-900 shadow-md z-50 text-[10px]"
                     >
                        {emotion === 'surprise' && <Zap size={10} className="text-amber-500 fill-amber-500" />}
                        {emotion === 'heart' && <Heart size={10} className="text-red-500 fill-red-500" />}
                        {emotion === 'idea' && <Info size={10} className="text-blue-500 fill-blue-500" />}
                        {emotion === 'sleep' && <Coffee size={10} /> }
                     </motion.div>
                )}
            </AnimatePresence>
            
            <div 
                className="w-full h-full border-2 border-zinc-900 shadow-lg flex items-center justify-center rounded-sm"
                style={{ backgroundColor: colors[type as keyof typeof colors] || '#000' }}
            >
                <User size={16} className="text-white opacity-50" />
            </div>
        </div>
    );
};

export const SceneRunner: React.FC<{ script: SceneScript, onComplete: () => void }> = ({ script, onComplete }) => {
    const [timelineIndex, setTimelineIndex] = useState(0);
    const [actors, setActors] = useState(script.actors.map(a => ({ ...a, x: a.startX, y: a.startY, currentEmotion: null as string | null })));
    const [currentDialogue, setCurrentDialogue] = useState<{ actor: string, text: string } | null>(null);
    const [isExecuting, setIsExecuting] = useState(true);

    useEffect(() => {
        if (!isExecuting || timelineIndex >= script.timeline.length) {
            setIsExecuting(false);
            return;
        }

        const action = script.timeline[timelineIndex];
        executeAction(action);
    }, [timelineIndex, isExecuting]);

    const { directorMode, nextDirectorialScene, setView } = useGameStore();

    const executeAction = async (action: SpriteAction) => {
        switch (action.type) {
            case 'move':
                if (action.actorId) {
                    setActors(prev => prev.map(a => 
                        a.id === action.actorId 
                        ? { ...a, x: action.targetX || a.x, y: action.targetY || a.y } 
                        : a
                    ));
                }
                setTimeout(() => setTimelineIndex(prev => prev + 1), action.duration || 500);
                break;
            case 'emote':
                setActors(prev => prev.map(a => a.id === action.actorId ? { ...a, currentEmotion: action.emotion || null } : a));
                setTimeout(() => {
                    setActors(prev => prev.map(a => a.id === action.actorId ? { ...a, currentEmotion: null } : a));
                    setTimelineIndex(prev => prev + 1);
                }, action.duration || 1000);
                break;
            case 'say':
                setCurrentDialogue({ actor: action.actorId || 'Mystery', text: action.text || '' });
                // Auto-advance after 4 seconds for "Director Mode"
                setTimeout(() => {
                   setCurrentDialogue(null);
                   setTimelineIndex(prev => prev + 1);
                }, 4000);
                break;
            case 'wait':
                setTimeout(() => setTimelineIndex(prev => prev + 1), action.duration || 1000);
                break;
            case 'vanish':
                setActors(prev => prev.filter(a => a.id !== action.actorId));
                setTimelineIndex(prev => prev + 1);
                break;
            case 'trigger_combat':
                setIsExecuting(false);
                setTimelineIndex(script.timeline.length); // Mark as done for completion button
                setView('combat');
                break;
            case 'trigger_ship_combat':
                setIsExecuting(false);
                setTimelineIndex(script.timeline.length);
                setView('ship_combat');
                break;
            case 'trigger_lab':
                setIsExecuting(false);
                setTimelineIndex(script.timeline.length);
                setView('lab');
                break;
            case 'trigger_nav':
                setIsExecuting(false);
                setTimelineIndex(script.timeline.length);
                setView('nav');
                break;
        }
    };

    const nextStep = () => {
        if (currentDialogue) {
            setCurrentDialogue(null);
            setTimelineIndex(prev => prev + 1);
        }
    };

    // Background Mapper
    const backgrounds: Record<string, string> = {
        scanderoon_clash: 'https://images.unsplash.com/photo-1599408162165-4011409d9494?q=80&w=2000', // Mockup proxy
        milos_refuge: 'https://images.unsplash.com/photo-1502472545331-6419ca66a1a1?q=80&w=2000',
        london_prison: 'https://images.unsplash.com/photo-1549413243-7f72f0db381e?q=80&w=2000',
        madrid_night: 'https://images.unsplash.com/photo-1543783232-f79f0653f419?q=80&w=2000'
    };

    const currentBG = backgrounds[script.background] || 'https://www.transparenttextures.com/patterns/natural-paper.png';

    const handleContinue = () => {
        if (directorMode) {
            nextDirectorialScene();
        } else {
            onComplete();
        }
    };

    return (
        <div 
            className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-12 overflow-hidden relative"
            onClick={nextStep}
        >
            {/* Background Map / Stage */}
            <div className={`relative border-8 border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden bg-cover bg-center transition-all duration-1000`}
                 style={{ 
                    width: TILE_SIZE * 28, 
                    height: TILE_SIZE * 18,
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${currentBG}')`,
                    backgroundColor: '#1a1d23'
                 }}>
                
                {/* Visual Grid for development vibe */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`, backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px` }} />

                {/* Actors Layer */}
                {actors.map(actor => (
                    <motion.div
                        key={actor.id}
                        animate={{ 
                            left: actor.x * TILE_SIZE, 
                            top: actor.y * TILE_SIZE 
                        }}
                        transition={{ duration: 0.5 }}
                        className="absolute"
                        style={{ width: TILE_SIZE, height: TILE_SIZE }}
                    >
                        <ActorSprite type={actor.spriteType} emotion={actor.currentEmotion || undefined} />
                    </motion.div>
                ))}

                {/* Narrative Overlay (If dialogue) */}
                <AnimatePresence>
                    {currentDialogue && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] bg-zinc-950/90 border-2 border-zinc-100 p-8 shadow-2xl text-parchment font-serif italic z-50 text-center"
                        >
                            <div className="absolute -top-4 left-8 bg-zinc-100 text-zinc-950 px-4 py-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] shadow-lg">
                                {currentDialogue.actor.toUpperCase()}
                            </div>
                            <div className="flex items-center gap-6 justify-center">
                                <MessageCircle size={24} className="text-zinc-500 opacity-30" />
                                <p className="text-xl leading-relaxed">
                                    "{currentDialogue.text}"
                                </p>
                            </div>
                            <div className="mt-6 flex justify-center gap-2">
                                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* End of Script / Transition Check */}
                {!isExecuting && !currentDialogue && (
                    <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-12 text-center text-zinc-100 z-[100]">
                         <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-6"
                         >
                            <h3 className="text-4xl italic font-serif opacity-70">The Scene Concludes.</h3>
                            <button 
                                onClick={handleContinue}
                                className="px-12 py-3 bg-zinc-100 text-zinc-950 text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-300 transition-all"
                            >
                                Continue Voyage
                            </button>
                         </motion.div>
                    </div>
                )}
            </div>

            <div className="mt-12 text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em] font-mono">
                 The Almagest Staging Engine / Version 0.1
            </div>
        </div>
    );
};
