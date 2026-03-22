import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Anchor, 
    Navigation, 
    Activity, 
    Box, 
    Crosshair, 
    Maximize,
    Wind,
    Compass,
    Sparkles,
    Download
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * SCENARIO MAP: Live Spatial Manifest Visualizer
 * 
 * Renders the project's geographic tethers and fleet positions
 * onto a stylized, 17th-century Mediterranean digital chart.
 */

export const ScenarioMap: React.FC = () => {
    const { manifest } = useGameStore();
    
    // Map bounds for the Levant (approximate)
    const locations = manifest?.locations || [];
    
    const ports = useMemo(() => {
        return locations.map(loc => ({
            ...loc,
            projX: (loc.x - 20) * 40,
            projY: (45 - loc.y) * 50
        }));
    }, [locations]);

    const [mapAnalysis, setMapAnalysis] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAIAnalysis = async () => {
        setIsAnalyzing(true);
        const prompt = `### SYSTEM: You are the Almagest Cartographer.
Analyze the following port distribution for strategic balance and historical drift:
${JSON.stringify(ports.map(p => ({ name: p.name, x: p.x, y: p.y })))}

Provide a brief strategic assessment.

### ASSESSMENT:`;
        
        const response = await (window as any).almagest.queryLLM({ 
            provider: 'Resident Scholar (Local)', 
            prompt 
        });
        setMapAnalysis(response);
        setIsAnalyzing(false);
    };

    const handleExportTethers = async () => {
        const content = JSON.stringify(ports, null, 2);
        await (window as any).almagest.exportToDesktop({
            filename: `Map_Tethers_${Date.now()}.json`,
            content
        });
        alert('Geographic Tethers exported to Desktop.');
    };

    return (
        <div className="flex-1 flex flex-col bg-[#08080a] relative overflow-hidden">
            {/* Map Header HUD */}
            <div className="absolute top-48 left-12 w-80 z-20 space-y-4">
                 <p className="text-[9px] text-zinc-600 font-serif italic leading-relaxed bg-zinc-950/80 p-4 border border-zinc-900">
                    "Tethers represent the physical anchor points of your narrative. Move nodes to adjust the friction of travel and the density of alchemical trade."
                 </p>
                 {mapAnalysis && (
                     <div className="p-6 bg-gold/5 border border-gold/20 space-y-3">
                         <div className="flex items-center gap-2">
                             <Sparkles size={12} className="text-gold" />
                             <span className="text-[9px] font-black uppercase text-gold">Cartographic Insight</span>
                         </div>
                         <p className="text-[10px] text-zinc-400 font-serif italic leading-relaxed">
                             {mapAnalysis}
                         </p>
                     </div>
                 )}
            </div>
            {/* Map Background with Noise/Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
            </div>

            {/* Map Header HUD */}
            <header className="absolute top-12 left-12 right-12 flex justify-between items-start z-10 pointer-events-none">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Compass size={14} className="text-gold animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-gold tracking-widest block">Spatial Manifest</span>
                    </div>
                    <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">Levant Chart 1628</h2>
                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
                            <Anchor size={12} className="text-gold" /> {ports.length} Tethered Ports
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
                            <Navigation size={12} className="text-blue-500" /> Active Fleets: 0
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                     <button 
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing}
                        className="px-8 py-4 border border-zinc-900 text-gold text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-zinc-950 transition-all flex items-center gap-3 shadow-2xl disabled:opacity-50"
                     >
                        <Sparkles size={16} className={isAnalyzing ? 'animate-spin' : ''} /> {isAnalyzing ? 'Surveying Coastlines...' : 'AI Cartographic Survey'}
                     </button>
                     <button className="p-4 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white transition-all">
                        <Maximize size={18} />
                     </button>
                     <button 
                        onClick={handleExportTethers}
                        className="px-8 py-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3 shadow-2xl"
                    >
                         <Download size={16} /> Export Tethers (.json)
                     </button>
                </div>
            </header>

            {/* SVG Visualizer Canvas */}
            <div className="flex-1 flex items-center justify-center p-24">
                <div className="w-full aspect-[4/3] max-h-full border border-zinc-900 bg-zinc-950/40 relative shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
                    <svg 
                        viewBox="0 0 1000 800" 
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Decorative Compass Rose */}
                        <g transform="translate(150, 650)" className="opacity-10 scale-50">
                             <circle cx="0" cy="0" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                             <path d="M-120 0 L120 0 M0 -120 L0 120" stroke="white" strokeWidth="0.5" />
                             <text x="130" y="5" fill="white" fontSize="12" fontWeight="bold">E</text>
                             <text x="-150" y="5" fill="white" fontSize="12" fontWeight="bold">W</text>
                             <text x="-5" y="-130" fill="white" fontSize="12" fontWeight="bold">N</text>
                             <text x="-5" y="145" fill="white" fontSize="12" fontWeight="bold">S</text>
                        </g>

                        {/* Latitude / Longitude lines */}
                        <g className="opacity-5">
                            {[0, 200, 400, 600, 800].map(y => (
                                <line key={`y-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="white" strokeWidth="0.5" />
                            ))}
                            {[0, 250, 500, 750, 1000].map(x => (
                                <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="800" stroke="white" strokeWidth="0.5" />
                            ))}
                        </g>

                        {/* Connection Traces */}
                        <g className="opacity-10">
                            {ports.map((p, i) => (
                                ports.slice(i + 1, i + 3).map((target, j) => (
                                    <line 
                                        key={`${i}-${j}`} 
                                        x1={p.projX} y1={p.projY} x2={target.projX} y2={target.projY} 
                                        stroke="#FFD700" strokeWidth="0.5" strokeDasharray="10 5"
                                    />
                                ))
                            ))}
                        </g>

                        {/* Port Nodes */}
                        {ports.map((port) => (
                            <g 
                                key={port.id} 
                                transform={`translate(${port.projX}, ${port.projY})`}
                                className="group cursor-pointer"
                            >
                                <circle r="4" fill="#FFD700" className="opacity-40" />
                                <circle r="2" fill="white" />
                                <motion.circle 
                                    r="12" 
                                    className="opacity-0 group-hover:opacity-10" 
                                    fill="#FFD700"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <text 
                                    y="-12" 
                                    textAnchor="middle" 
                                    className="text-[10px] fill-zinc-600 group-hover:fill-white font-black uppercase tracking-tighter pointer-events-none transition-all"
                                >
                                    {port.name}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* Simulation HUD Overlays */}
                    <div className="absolute bottom-8 right-8 w-64 bg-zinc-950/90 border border-zinc-900 p-6 space-y-6 shadow-2xl">
                         <section>
                              <div className="flex items-center justify-between mb-3">
                                   <span className="text-[9px] font-black text-zinc-600 uppercase">Atmosphere</span>
                                   <Wind size={14} className="text-zinc-700" />
                              </div>
                              <div className="flex items-end gap-3">
                                   <span className="text-xl font-black text-white italic">14.2 kn</span>
                                   <span className="text-[9px] font-mono text-zinc-700 mb-1">Vector: NE-32</span>
                              </div>
                         </section>
                         <section className="pt-6 border-t border-zinc-900">
                              <div className="flex items-center justify-between mb-3">
                                   <span className="text-[9px] font-black text-zinc-600 uppercase">Temporal Drift</span>
                                   <Activity size={14} className="text-amber-500/50" />
                              </div>
                              <div className="text-lg font-black text-amber-500 italic uppercase">June 24, 1628</div>
                         </section>
                    </div>

                    <div className="absolute top-8 right-8 flex flex-col gap-2">
                         <div className="p-3 bg-zinc-900/80 border border-zinc-800 text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                              <Box size={14} /> Layer 1 :: Live
                         </div>
                         <div className="p-3 bg-zinc-900/80 border border-zinc-800 text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                              <Crosshair size={14} /> Scan Center: {ports[0]?.name || 'N/A'}
                         </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Contextual Entity Feed */}
            <div className="h-48 bg-zinc-950 border-t border-zinc-900 p-8 flex gap-12 overflow-x-auto custom-scrollbar">
                {ports.map((p) => (
                    <div key={p.id} className="min-w-[200px] flex flex-col gap-2 opacity-40 hover:opacity-100 transition-all cursor-default group">
                         <header className="flex justify-between items-center border-b border-zinc-900 pb-2">
                              <span className="text-[9px] font-black text-zinc-500 uppercase group-hover:text-gold">{p.id}</span>
                              <Activity size={10} className="text-zinc-800" />
                         </header>
                         <h4 className="text-sm font-bold text-white uppercase italic">{p.name}</h4>
                         <p className="text-[9px] text-zinc-700 font-serif italic truncate">Lat: {p.x} | Lon: {p.y}</p>
                    </div>
                ))}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #111; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
            `}</style>
        </div>
    );
};
