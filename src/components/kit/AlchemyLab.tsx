import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FlaskConical, 
    Zap, 
    Trash2, 
    Flame,
    ShieldAlert,
    Book,
    Sparkles,
    Download
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';
import type { Reagent, Recipe } from '../../data/schema';

/**
 * ALCHEMY LAB: Reagent & Synthesis Editor
 * 
 * Allows users to define chemical properties, instability triggers,
 * and valid alchemical combinations for the simulation.
 */

export const AlchemyLab: React.FC = () => {
    const { manifest, currentProjectSlug } = useGameStore();
    const [selectedReagents, setSelectedReagents] = useState<string[]>([]);
    const [instability, setInstability] = useState(25);
    const [temperature, setTemperature] = useState(50);
    
    const recipes = (manifest?.recipes || []) as Recipe[];
    const reagents = (manifest?.reagents || []) as Reagent[];

    const toggleReagent = (id: string) => {
        if (selectedReagents.includes(id)) {
            setSelectedReagents(selectedReagents.filter(r => r !== id));
        } else if (selectedReagents.length < 3) {
            setSelectedReagents([...selectedReagents, id]);
        }
    };

    const [aiPrediction, setAiPrediction] = useState<string | null>(null);
    const [isPredicting, setIsPredicting] = useState(false);

    const handleAIPredict = async () => {
        if (selectedReagents.length < 1) {
            alert('Select reagents for prediction.');
            return;
        }
        setIsPredicting(true);
        const prompt = `### SYSTEM: You are the Scholar analyzing an alchemical reaction.
Selected Reagents: ${selectedReagents.join(', ')}
Temperature: ${temperature}°C
Instability: ${instability}%

Predict the result and provide a brief historical justification in the style of Sir Kenelm Digby.

### PREDICTION:`;
        
        const response = await (window as any).almagest.queryLLM({ 
            provider: 'Resident Scholar (Local)', 
            prompt 
        });
        setAiPrediction(response);
        setIsPredicting(false);
    };

    const handleExportReport = async () => {
        const report = `# ALMAGEST LAB REPORT: ${new Date().toISOString()}
        
## Project: ${currentProjectSlug}
## Selected Reagents: ${selectedReagents.join(', ')}
## Reaction Parameters:
- Temperature: ${temperature}°C
- Instability: ${instability}%

## Synthesis Result:
${currentMatch ? `SUCCESS: ${currentMatch.result_reagent_id}` : 'STABLE / NO REACTION'}

## Scholar's Prediction:
${aiPrediction || 'NO PREDICTION RECORDED'}

## Historical Context:
"The scholar observed a deep resonance between the planetary alignment and the mercury levels."
`;
        await (window as any).almagest.exportToDesktop({
            filename: `Lab_Report_${Date.now()}.md`,
            content: report
        });
        alert('Laboratory Report (.md) exported to Desktop.');
    };

    const currentMatch = recipes.find(r => 
        r.ingredients.length === selectedReagents.length &&
        selectedReagents.every(i => r.ingredients.includes(i))
    );

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Reagent Supply */}
            <div className="w-80 border-r border-zinc-900 bg-zinc-950/40 p-8 flex flex-col gap-8">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Source Material</span>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Inventory</h2>
                    <p className="text-[9px] text-zinc-600 font-serif italic mt-4 leading-relaxed">
                        "Select up to three reagents to place in the Crucible. Adjust the external heat and observe the potential outcomes."
                    </p>
                </header>

                <div className="flex flex-col gap-3">
                    {reagents.map(re => (
                        <button 
                            key={re.id}
                            onClick={() => toggleReagent(re.id)}
                            className={`p-4 border text-left transition-all flex items-center justify-between group ${selectedReagents.includes(re.id) ? 'bg-zinc-100 border-white' : 'bg-transparent border-zinc-800 hover:border-zinc-500'}`}
                        >
                            <div className="flex items-center gap-4">
                                <FlaskConical size={16} className={selectedReagents.includes(re.id) ? 'text-zinc-950' : 'text-zinc-600'} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedReagents.includes(re.id) ? 'text-zinc-950' : 'text-white'}`}>{re.name}</span>
                            </div>
                            {selectedReagents.includes(re.id) && <Trash2 size={12} className="text-zinc-400" />}
                        </button>
                    ))}

                    <button className="p-4 border border-dashed border-zinc-900 text-[9px] font-black uppercase text-zinc-700 hover:text-white hover:border-zinc-700 transition-all text-center">
                        + Register Reagent
                    </button>
                </div>
            </div>

            {/* Middle: The Crucible */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col gap-12 relative overflow-hidden">
                 <header className="flex justify-between items-end border-b border-zinc-900 pb-8">
                    <div>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">The Crucible</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-2 italic">Synthesis_Engine :: active</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleAIPredict}
                            className="px-6 py-3 border border-zinc-700 text-[10px] font-black uppercase tracking-widest text-gold hover:bg-gold hover:text-zinc-950 transition-all flex items-center gap-3"
                        >
                            <Sparkles size={14} /> AI Predict
                        </button>
                        <button 
                            onClick={handleExportReport}
                            className="px-6 py-3 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3"
                        >
                            <Download size={14} /> Export Report (.md)
                        </button>
                    </div>
                </header>
                
                {aiPrediction && (
                    <div className="bg-gold/5 border border-gold/20 p-8 space-y-4">
                         <div className="flex items-center gap-3">
                              <Sparkles size={14} className="text-gold" />
                              <span className="text-[10px] font-black uppercase text-gold">Scholar's Prediction</span>
                         </div>
                         <p className="text-[10px] text-zinc-400 font-serif leading-relaxed italic">
                              {aiPrediction}
                         </p>
                    </div>
                )}

                <div className="flex-1 flex items-center justify-center">
                    {/* Visual Mixing Circle */}
                    <div className="relative w-96 h-96 flex items-center justify-center">
                         <div className="absolute inset-0 border-2 border-zinc-900 rounded-full animate-[spin_20s_linear_infinite] opacity-20" />
                         <div className="absolute inset-8 border border-zinc-800 rounded-full opacity-10" />
                         
                         {selectedReagents.map((id, index) => {
                             const angle = (index / selectedReagents.length) * (Math.PI * 2);
                             const x = Math.cos(angle) * 140;
                             const y = Math.sin(angle) * 140;
                             return (
                                 <motion.div 
                                      key={id} 
                                      initial={{ scale: 0 }} animate={{ scale: 1, x, y }}
                                      className="absolute w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-white text-zinc-950"
                                 >
                                      <FlaskConical size={24} />
                                 </motion.div>
                             );
                         })}

                         <div className="z-10 text-center">
                             <AnimatePresence mode="wait">
                                 {currentMatch ? (
                                     <motion.div key="match" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4">
                                          <div className="w-32 h-32 bg-gold rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.4)] border-4 border-white animate-pulse">
                                               <Zap size={48} className="text-zinc-950" />
                                          </div>
                                          <h4 className="text-xl font-black uppercase italic tracking-tighter text-gold">{currentMatch.result_reagent_id} Uncovered</h4>
                                          <p className="text-[9px] text-zinc-500 font-serif italic max-w-[150px]">"Stability verified within historical parameters."</p>
                                     </motion.div>
                                 ) : (
                                     <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                                          <div className="w-32 h-32 border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                                               {isPredicting ? <Sparkles size={48} className="text-gold animate-spin" /> : <Flame size={48} className="text-zinc-900" />}
                                          </div>
                                          <p className="text-[10px] text-zinc-700 uppercase font-black tracking-widest italic">{isPredicting ? 'Consulting Scholarly Records...' : 'Idle Reactor'}</p>
                                     </motion.div>
                                 )}
                             </AnimatePresence>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 bg-zinc-950/50 p-8 border border-zinc-900 rounded-sm">
                    <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                              <label className="flex items-center gap-2"><Flame size={12} className="text-amber-500" /> Reaction Temperature</label>
                              <span>{temperature}°C</span>
                         </div>
                         <input type="range" value={temperature} onChange={(e) => setTemperature(parseInt(e.target.value))} className="w-full accent-amber-500" />
                         <p className="text-[8px] text-zinc-700 font-mono tracking-widest px-1">Adjust external caloric input to stabilize or destabilize the mix.</p>
                    </div>
                    <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                              <label className="flex items-center gap-2"><ShieldAlert size={12} className="text-red-500" /> Mix Instability</label>
                              <span className="text-red-500">{instability}%</span>
                         </div>
                         <input type="range" value={instability} onChange={(e) => setInstability(parseInt(e.target.value))} className="w-full accent-red-500" />
                         <p className="text-[8px] text-zinc-700 font-mono tracking-widest px-1">Internal friction between incompatible planetary correspondences.</p>
                    </div>
                </div>
            </div>

            {/* Right: Reference Book */}
            <div className="w-80 border-l border-zinc-900 bg-zinc-950/40 p-8 flex flex-col gap-8">
                 <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Codex Alchemica</span>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Recipes</h2>
                    <p className="text-[9px] text-zinc-600 font-serif italic mt-4 leading-relaxed">
                        "Documented procedures for synthesizing higher reagents from base materials."
                    </p>
                </header>

                <div className="flex flex-col gap-4">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="p-6 border border-zinc-900 bg-zinc-900/20 flex flex-col gap-4 group hover:border-zinc-700 transition-all">
                             <div className="flex justify-between items-start">
                                  <h4 className="text-[10px] font-black uppercase text-zinc-300 tracking-widest break-words flex-1 pr-4">{recipe.result_reagent_id}</h4>
                                  <Book size={12} className="text-gold" />
                             </div>
                             <div className="flex flex-wrap gap-2">
                                  {recipe.ingredients.map(ing => (
                                      <span key={ing} className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[8px] font-mono text-zinc-600 uppercase">{ing}</span>
                                  ))}
                             </div>
                        </div>
                    ))}
                    {!recipes.length && <p className="text-[10px] text-zinc-700 italic">No recipes documented in manifest. Use AI Predict to discover new ones.</p>}
                </div>
            </div>
        </div>
    );
};
