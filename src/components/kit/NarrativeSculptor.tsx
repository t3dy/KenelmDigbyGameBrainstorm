import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    Move, 
    Plus, 
    Trash2, 
    Save, 
    Activity,
    MapPin,
    Sparkles,
    Download
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * NARRATIVE SCULPTOR: Scene Authoring Engine
 * 
 * Allows users to visually sequence scenes, map character positions, 
 * and define branching outcomes for historical encounters.
 */

interface NarrativeStep {
    id: string;
    type: 'say' | 'move' | 'transition';
    actorId: string;
    content: string;
    x?: number;
    y?: number;
}

export const NarrativeSculptor: React.FC = () => {
    const { currentProjectSlug } = useGameStore();
    const [sceneId, setSceneId] = useState('SCENE_NEW_01');
    const [steps, setSteps] = useState<NarrativeStep[]>([
        { id: '1', type: 'say', actorId: 'digby', content: 'The reagents must be found.' }
    ]);
    const [selectedActor, setSelectedActor] = useState('digby');
    const [aiCritique, setAiCritique] = useState<string | null>(null);
    const [isDoctoring, setIsDoctoring] = useState(false);

    const handleAIScriptDoctor = async () => {
        setIsDoctoring(true);
        const scriptBody = steps.map((s, i) => `${i + 1}. ${s.actorId}: ${s.content}`).join('\n');
        const prompt = `### SYSTEM: You are the Almagest Script Doctor.
Critique the following dialogue sequence for historical weight and emotional resonance.
Actor Focus: ${selectedActor}

SCRIPT:
${scriptBody}

Provide a brief, intense critique and suggested refinement.

### CRITIQUE:`;
        
        const response = await (window as any).almagest.queryLLM({ 
            provider: 'Resident Scholar (Local)', 
            prompt 
        });
        setAiCritique(response);
        setIsDoctoring(false);
    };

    const handleExportScript = async () => {
        const script = `# ALMAGEST SCENE SCRIPT: ${sceneId}
        
## Project: ${currentProjectSlug}

## Narrative Sequence:
${steps.map((s, i) => `${i + 1}. [${s.type.toUpperCase()}] ${s.actorId}: ${s.content}${s.x ? ` (POS: ${s.x}, ${s.y})` : ''}`).join('\n')}

---
Exported for external LLM ingestion or table-read.
`;
        await (window as any).almagest.exportToDesktop({
            filename: `${sceneId.toLowerCase()}_script_${Date.now()}.md`,
            content: script
        });
        alert('Scene Script (.md) exported to Desktop.');
    };
    
    // Grid State
    const [previewX, setPreviewX] = useState(50);
    const [previewY, setPreviewY] = useState(50);

    const addStep = (type: 'say' | 'move' | 'transition') => {
        const newStep: NarrativeStep = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            actorId: selectedActor,
            content: type === 'say' ? 'Enter dialogue...' : type === 'move' ? 'Destination_ID' : 'Next_Scene_ID',
            x: type === 'move' ? previewX : undefined,
            y: type === 'move' ? previewY : undefined
        };
        setSteps([...steps, newStep]);
    };

    const removeStep = (id: string) => {
        setSteps(steps.filter(s => s.id !== id));
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Sequence Editor */}
            <div className="w-1/2 border-r border-zinc-900 bg-zinc-950/20 p-8 flex flex-col gap-8 overflow-y-auto">
                <header className="flex justify-between items-center bg-zinc-900/40 p-6 border border-zinc-800 rounded-sm">
                    <div className="flex items-center gap-4">
                        <Activity size={18} className="text-gold" />
                        <input 
                            value={sceneId}
                            onChange={(e) => setSceneId(e.target.value)}
                            className="bg-transparent text-xl font-black uppercase italic tracking-tighter text-white border-none focus:outline-none w-48"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleAIScriptDoctor}
                            disabled={isDoctoring}
                            className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-gold text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-zinc-950 transition-all disabled:opacity-50"
                        >
                            <Sparkles size={14} className={isDoctoring ? 'animate-spin' : ''} /> {isDoctoring ? 'Consulting Muse...' : 'AI Script Doctor'}
                        </button>
                        <button 
                            onClick={handleExportScript}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-100 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all border border-zinc-700"
                        >
                            <Download size={14} /> Export Script (.md)
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all">
                            <Save size={14} /> Commit Scene
                        </button>
                    </div>
                </header>

                <p className="text-[9px] text-zinc-600 font-serif italic leading-relaxed px-6">
                    "Arrange the dialogue and movements of your actors. The sequence is the backbone of the historical drama; ensure every word carries the weight of 1628."
                </p>

                {aiCritique && (
                    <div className="bg-gold/5 border border-gold/20 p-8 space-y-4 mx-6">
                         <div className="flex items-center gap-3">
                              <Sparkles size={14} className="text-gold" />
                              <span className="text-[10px] font-black uppercase text-gold">Scholarly Critique</span>
                         </div>
                         <p className="text-[10px] text-zinc-400 font-serif leading-relaxed italic">
                              {aiCritique}
                         </p>
                    </div>
                )}

                <div className="space-y-4">
                    <AnimatePresence initial={false}>
                        {steps.map((step, index) => (
                            <motion.div 
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between group hover:border-zinc-500 transition-all shadow-lg"
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-[10px] font-black text-zinc-700 font-mono w-4">{index + 1}</span>
                                    <div className={`p-2 rounded-sm ${step.type === 'say' ? 'text-blue-400' : 'text-amber-500'}`}>
                                        {step.type === 'say' ? <MessageSquare size={16} /> : <Move size={16} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{step.actorId}</span>
                                        <input 
                                             value={step.content}
                                             onChange={(e) => {
                                                 const newSteps = [...steps];
                                                 newSteps[index].content = e.target.value;
                                                 setSteps(newSteps);
                                             }}
                                             className="bg-transparent text-xs font-serif italic text-zinc-300 border-none focus:outline-none w-64"
                                        />
                                    </div>
                                </div>
                                <button onClick={() => removeStep(step.id)} className="text-zinc-700 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 p-2">
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-auto grid grid-cols-3 gap-4">
                    <button onClick={() => addStep('say')} className="p-4 border border-zinc-900 text-[9px] font-black uppercase text-zinc-600 hover:text-blue-400 hover:border-blue-400 transition-all flex items-center justify-center gap-2">
                        <Plus size={14} /> Add Say
                    </button>
                    <button onClick={() => addStep('move')} className="p-4 border border-zinc-900 text-[9px] font-black uppercase text-zinc-600 hover:text-amber-400 hover:border-amber-400 transition-all flex items-center justify-center gap-2">
                        <Plus size={14} /> Add Move
                    </button>
                    <button onClick={() => addStep('transition')} className="p-4 border border-zinc-900 text-[9px] font-black uppercase text-zinc-600 hover:text-purple-400 hover:border-purple-400 transition-all flex items-center justify-center gap-2">
                        <Plus size={14} /> Add Branch
                    </button>
                </div>
            </div>

            {/* Right: Stage Preview */}
            <div className="flex-1 p-16 flex flex-col gap-12 bg-[#0a0a0c]">
                <header className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-600">Stage Coordination</h3>
                        <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.4em] mt-2 italic">Active_Actor: {selectedActor}</p>
                    </div>
                </header>

                {/* Coordinate Grid */}
                <div className="flex-1 relative border border-zinc-900 bg-zinc-950/50 rounded-lg overflow-hidden grid-background">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                         <Activity size={300} className="text-gold" />
                    </div>

                    {/* Interactive Grid Surface */}
                    <div 
                         className="absolute inset-0 cursor-crosshair"
                         onClick={(e) => {
                             const rect = e.currentTarget.getBoundingClientRect();
                             const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                             const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                             setPreviewX(x);
                             setPreviewY(y);
                         }}
                    >
                         {/* Coordinates Tooltip */}
                         <div className="absolute top-8 left-8 p-4 bg-zinc-900/80 border border-zinc-800 rounded-sm font-mono text-[10px] text-zinc-500 shadow-2xl backdrop-blur-md">
                              <span className="block mb-2 text-gold font-bold">GRID_LOCATOR</span>
                              X: {previewX} / Y: {previewY}
                         </div>

                         {/* Actor Ghost */}
                         <motion.div 
                              animate={{ top: `${previewY}%`, left: `${previewX}%` }}
                              className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                         >
                              <div className="absolute w-24 h-24 border border-gold/20 rounded-full animate-ping" />
                              <div className="bg-gold p-3 rounded-full text-zinc-950 shadow-2xl z-10 border-2 border-white shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                                   <MapPin size={18} />
                              </div>
                         </motion.div>
                    </div>

                    <div className="absolute bottom-8 right-8 flex gap-4">
                         <button onClick={() => setSelectedActor('digby')} className={`px-6 py-2 border text-[9px] font-black uppercase transition-all ${selectedActor === 'digby' ? 'bg-zinc-100 text-zinc-950 border-white' : 'border-zinc-800 text-zinc-600'}`}>Digby</button>
                         <button onClick={() => setSelectedActor('venetia')} className={`px-6 py-2 border text-[9px] font-black uppercase transition-all ${selectedActor === 'venetia' ? 'bg-zinc-100 text-zinc-950 border-white' : 'border-zinc-800 text-zinc-600'}`}>Venetia</button>
                         <button onClick={() => setSelectedActor('scholar')} className={`px-6 py-2 border text-[9px] font-black uppercase transition-all ${selectedActor === 'scholar' ? 'bg-zinc-100 text-zinc-950 border-white' : 'border-zinc-800 text-zinc-600'}`}>Scholar Agent</button>
                    </div>
                </div>

                <footer className="p-8 border-t border-zinc-900 bg-zinc-950 flex justify-between items-center rounded-b-lg">
                    <p className="text-[10px] text-zinc-700 uppercase font-black tracking-[0.3em]">Coordination Integrity: 100%</p>
                    <div className="flex items-center gap-3">
                         <div className="w-16 h-1 bg-zinc-900 rounded-full overflow-hidden">
                              <div className="w-2/3 h-full bg-gold" />
                         </div>
                         <span className="text-[10px] text-gold font-black uppercase italic">Scene Buffer Ready</span>
                    </div>
                </footer>
            </div>

            <style>{`
                .grid-background {
                    background-image: 
                        linear-gradient(to right, #111 1px, transparent 1px),
                        linear-gradient(to bottom, #111 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>
        </div>
    );
};
