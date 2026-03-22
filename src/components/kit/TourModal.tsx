import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronRight, 
    ChevronLeft, 
    X, 
    Star, 
    BookOpen, 
    Zap, 
    Compass, 
    CheckCircle2 
} from 'lucide-react';
import { TOUR_STEPS } from '../../data/kitRegistry';

interface TourModalProps {
    onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ onClose }) => {
    const [stepIdx, setStepIdx] = useState(0);
    const step = TOUR_STEPS[stepIdx];

    const icons = [Compass, BookOpen, Zap, Star, CheckCircle2];
    const Icon = icons[stepIdx % icons.length];

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-md"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="w-[600px] bg-zinc-900 border border-zinc-800 shadow-[0_0_100px_rgba(255,215,0,0.1)] relative overflow-hidden flex flex-col"
            >
                {/* Visual Header */}
                <div className="h-48 bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                         <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,215,0,0.2)]" />
                         <div className="w-full h-full animate-[pulse_10s_linear_infinite]" 
                              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </div>
                    
                    <motion.div 
                        key={stepIdx}
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 flex flex-col items-center gap-4"
                    >
                        <div className="p-4 rounded-full bg-gold/10 border border-gold/20 text-gold shadow-[0_0_40px_rgba(255,215,0,0.2)]">
                             <Icon size={32} />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">Phase 0{stepIdx + 1} :: Protocol</span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-12 space-y-8 min-h-[300px] flex flex-col">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={stepIdx}
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 flex-1"
                        >
                            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">{step.title}</h2>
                            <p className="text-sm font-serif italic italic text-zinc-400 leading-relaxed italic pr-8">
                                "{step.content}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Controls */}
                    <footer className="flex justify-between items-center pt-8 border-t border-zinc-800">
                        <div className="flex gap-2">
                            {TOUR_STEPS.map((_, i) => (
                                <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === stepIdx ? 'w-8 bg-gold' : 'w-2 bg-zinc-800'}`} />
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
                                disabled={stepIdx === 0}
                                className="text-zinc-600 hover:text-white transition-all disabled:opacity-30 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>

                            {stepIdx < TOUR_STEPS.length - 1 ? (
                                <button 
                                    onClick={() => setStepIdx(stepIdx + 1)}
                                    className="px-8 py-3 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3 shadow-2xl"
                                >
                                    Proceed <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button 
                                    onClick={onClose}
                                    className="px-8 py-3 bg-gold text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                                >
                                    Complete Tour <CheckCircle2 size={16} />
                                </button>
                            )}
                        </div>
                    </footer>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-zinc-700 hover:text-white p-2 transition-all"
                >
                    <X size={20} />
                </button>
            </motion.div>
        </motion.div>
    );
};
