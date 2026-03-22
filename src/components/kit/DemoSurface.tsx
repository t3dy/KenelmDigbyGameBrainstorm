import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, 
    Terminal, 
    Activity, 
    Box,
    Layers
} from 'lucide-react';

interface Experiment {
    id: string;
    name: string;
    description: string;
    type: 'Mock' | 'Logic' | 'Visual';
    state: 'Stub' | 'Partial' | 'Planned';
    mockData?: any;
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 'historical_arbitrage',
        name: 'Historical Arbitrage Engine',
        description: 'Dynamic price volatility based on regional port scarcity and historical drought events.',
        type: 'Logic',
        state: 'Planned',
        mockData: { port: 'Scanderoon', item: 'Silk', basePrice: 100, currentPrice: 145, volatility: 0.4 }
    },
    {
        id: 'tactical_combat',
        name: 'Tactical Combat View',
        description: 'Hex-based engagement between privateers and galleys with wind-driven movement.',
        type: 'Visual',
        state: 'Stub',
        mockData: { unit: 'The Digby', pos: [2, 3], wind: 'NE' }
    },
    {
        id: 'alchemical_infusion',
        name: 'Aetheric Infusion',
        description: 'Experimental overlay for applying the Powder of Sympathy to vessel components.',
        type: 'Visual',
        state: 'Partial',
        mockData: { component: 'Masts', infusionLevel: 0.8 }
    }
];

export const DemoSurface: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    const activeExperiment = EXPERIMENTS.find(e => e.id === selectedId);

    const runSimulation = () => {
        if (!activeExperiment) return;
        setIsRunning(true);
        setLog(prev => [`[CORE] Initiating ${activeExperiment.name} protocol...`, ...prev]);
        
        setTimeout(() => {
            setLog(prev => [`[${activeExperiment.id.toUpperCase()}] Sampling stochastic vectors...`, ...prev]);
        }, 1000);

        setTimeout(() => {
            setLog(prev => [`[${activeExperiment.id.toUpperCase()}] SUCCESS: Mock state generated.`, ...prev]);
            setIsRunning(false);
        }, 2500);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-zinc-950 p-12 overflow-hidden">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <h2 className="text-4xl font-serif italic mb-2">Staging Ground</h2>
                <p className="text-zinc-500 text-sm">Interactive demos for partial, stubbed, or planned systems.</p>
            </header>

            <div className="flex-1 flex gap-12 overflow-hidden">
                {/* Experiment List */}
                <div className="w-80 flex flex-col gap-3 overflow-y-auto pr-4">
                    {EXPERIMENTS.map(exp => (
                        <button
                            key={exp.id}
                            onClick={() => setSelectedId(exp.id)}
                            className={`p-5 text-left border rounded-sm transition-all group ${selectedId === exp.id ? 'bg-zinc-900 border-amber-500/50 shadow-lg' : 'bg-transparent border-zinc-800 hover:border-zinc-500'}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{exp.type}</span>
                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${exp.state === 'Stub' ? 'text-zinc-500 border-zinc-500/20' : exp.state === 'Partial' ? 'text-amber-500 border-amber-500/20' : 'text-zinc-700 border-zinc-700/20'}`}>
                                    {exp.state}
                                </span>
                            </div>
                            <h4 className={`text-sm font-bold transition-colors ${selectedId === exp.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{exp.name}</h4>
                        </button>
                    ))}
                </div>

                {/* Demo Viewport */}
                <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-sm flex flex-col overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeExperiment ? (
                            <motion.div 
                                key={activeExperiment.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 flex flex-col"
                            >
                                <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80">
                                    <div>
                                        <h3 className="text-xl font-bold italic tracking-tight">{activeExperiment.name}</h3>
                                        <p className="text-xs text-zinc-500 mt-1">{activeExperiment.description}</p>
                                    </div>
                                    <button 
                                        disabled={isRunning}
                                        onClick={runSimulation}
                                        className="px-6 py-2 bg-amber-600 text-zinc-950 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-20 flex items-center gap-2"
                                    >
                                        <Play size={14} fill="currentColor" /> {isRunning ? 'Running...' : 'Run Simulation'}
                                    </button>
                                </div>

                                <div className="flex-1 p-12 flex items-center justify-center">
                                    {activeExperiment.id === 'tactical_combat' && (
                                        <div className="w-full max-w-lg aspect-square border border-zinc-800 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] overflow-hidden">
                                           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                                           {/* Mock Hex Grid */}
                                           <div className="absolute inset-0 opacity-10" style={{ backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, #777 1px, transparent 1px)' }} />
                                           <motion.div 
                                                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                                                transition={{ duration: 10, repeat: Infinity }}
                                                className="absolute left-1/4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                                           >
                                                <div className="w-8 h-12 bg-zinc-200" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                                                <span className="text-[8px] font-black text-white bg-zinc-950 px-2 py-0.5">THE DIGBY</span>
                                           </motion.div>
                                           <div className="absolute right-12 top-12 p-4 bg-zinc-950/80 border border-zinc-800 font-mono text-[9px] text-amber-500">
                                                WIND: {activeExperiment.mockData.wind}<br/>
                                                DIST: 4.2 nautical miles
                                           </div>
                                        </div>
                                    )}

                                    {activeExperiment.id === 'historical_arbitrage' && (
                                        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 space-y-8">
                                            <div className="flex justify-between items-end">
                                                <span className="text-4xl font-serif italic">{activeExperiment.mockData.port}</span>
                                                <span className="text-xs font-mono text-green-500 flex items-center gap-1"><Activity size={12} /> VOLATILITY: {activeExperiment.mockData.volatility}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-zinc-950 border border-zinc-800">
                                                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Base Price / Silk</span>
                                                    <span className="text-2xl font-bold">{activeExperiment.mockData.basePrice} <span className="text-xs text-zinc-600">G</span></span>
                                                </div>
                                                <div className="p-4 bg-zinc-950 border border-zinc-800">
                                                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Current Price</span>
                                                    <span className="text-2xl font-bold text-amber-500">{activeExperiment.mockData.currentPrice} <span className="text-xs text-zinc-600">G</span></span>
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-zinc-600 italic leading-relaxed">
                                                "Drought in the Persian highlands has slowed the caravans to Scanderoon. Speculators at the Venetian galley expect further rises."
                                            </div>
                                        </div>
                                    )}

                                    {activeExperiment.id === 'alchemical_infusion' && (
                                        <div className="flex flex-col items-center gap-8">
                                            <div className="w-64 h-64 border-2 border-dashed border-amber-500/20 rounded-full flex items-center justify-center relative">
                                                <motion.div 
                                                    animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    className="w-48 h-48 border border-amber-500/50 rounded-full flex items-center justify-center"
                                                >
                                                    <Layers size={40} className="text-amber-500 opacity-50" />
                                                </motion.div>
                                                <div className="absolute inset-0 bg-amber-500/5 animate-pulse rounded-full" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Infusion Target: {activeExperiment.mockData.component}</h4>
                                                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: activeExperiment.mockData.infusionLevel * 100 + '%' }} className="h-full bg-amber-500" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Simulation Log */}
                                <div className="h-40 bg-zinc-950 border-t border-zinc-800 p-4 font-mono text-[10px] text-zinc-500 overflow-y-auto">
                                    <div className="flex items-center gap-2 mb-2 text-zinc-700">
                                        <Terminal size={12} /> STAGING_CONSOLE v1.0
                                    </div>
                                    {log.map((line, i) => (
                                        <p key={i} className={i === 0 ? 'text-zinc-200' : ''}>{line}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
                                <Box size={64} className="mb-6" />
                                <h3 className="text-xl font-bold uppercase tracking-widest font-serif italic mb-2">Select an Experiment</h3>
                                <p className="max-w-xs text-sm">Review stubs and planned systems before they are integrated into the primary simulation.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
