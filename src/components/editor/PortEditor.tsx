import React, { useState, useEffect } from 'react';
import { 
    ShoppingBag, 
    BookOpen, 
    Anchor, 
    Cpu,
    Save,
    Trash2,
    MapPin
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

const GRID_W = 24;
const GRID_H = 15;

type ToolType = 'merchant' | 'manuscript' | 'exit' | 'delete';

export const PortEditor: React.FC = () => {
    const { manifest, saveLocationConfig } = useGameStore();
    const [selectedLocId, setSelectedLocId] = useState(manifest.locations[0]?.id);
    const [activeTool, setActiveTool] = useState<ToolType>('merchant');
    
    const locationData = manifest.locations.find(l => l.id === selectedLocId);
    const [config, setConfig] = useState<any>(locationData?.port_config || {
        merchants: [],
        manuscripts: [],
        exit: [2, 7],
        messages: {
            merchant: "A merchant offering local goods.",
            manuscript: "An ancient text fragment.",
            exit: "Return to the ship."
        }
    });

    useEffect(() => {
        if (locationData) {
            setConfig(locationData.port_config || {
                merchants: [],
                manuscripts: [],
                exit: [2, 7],
                messages: {
                    merchant: "A merchant offering local goods.",
                    manuscript: "An ancient text fragment.",
                    exit: "Return to the ship."
                }
            });
        }
    }, [selectedLocId, manifest.locations]);

    const handleGridClick = (x: number, y: number) => {
        const newConfig = { ...config };
        
        // Remove existing items at this location
        newConfig.merchants = newConfig.merchants.filter((m: any) => m[0] !== x || m[1] !== y);
        newConfig.manuscripts = newConfig.manuscripts.filter((m: any) => m[0] !== x || m[1] !== y);
        
        if (activeTool === 'merchant') {
            newConfig.merchants.push([x, y]);
        } else if (activeTool === 'manuscript') {
            newConfig.manuscripts.push([x, y]);
        } else if (activeTool === 'exit') {
            newConfig.exit = [x, y];
        }
        
        setConfig(newConfig);
    };

    const handleSave = () => {
        saveLocationConfig(selectedLocId, config);
        alert(`Saved configuration for ${selectedLocId}`);
    };

    return (
        <div className="flex-1 flex overflow-hidden bg-zinc-950">
            {/* Sidebar: Location Selection & Tools */}
            <aside className="w-80 border-r border-zinc-900 overflow-y-auto p-6 flex flex-col gap-8">
                <section>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <MapPin size={12} /> Target Location
                    </h4>
                    <div className="space-y-1">
                        {manifest.locations.map(loc => (
                            <button
                                key={loc.id}
                                onClick={() => setSelectedLocId(loc.id)}
                                className={`w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded-sm ${selectedLocId === loc.id ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900'}`}
                            >
                                {loc.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <Cpu size={12} /> Staging Tools
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        {(['merchant', 'manuscript', 'exit', 'delete'] as ToolType[]).map(tool => (
                            <button
                                key={tool}
                                onClick={() => setActiveTool(tool)}
                                className={`flex flex-col items-center justify-center p-4 border transition-all rounded-sm gap-2 ${activeTool === tool ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-zinc-800 text-zinc-500 hover:border-zinc-100 hover:text-zinc-100'}`}
                            >
                                {tool === 'merchant' && <ShoppingBag size={20} />}
                                {tool === 'manuscript' && <BookOpen size={20} />}
                                {tool === 'exit' && <Anchor size={20} />}
                                {tool === 'delete' && <Trash2 size={20} />}
                                <span className="text-[9px] font-black uppercase tracking-tighter">{tool}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mt-auto">
                    <button 
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-zinc-100 text-zinc-950 text-xs font-black uppercase tracking-widest hover:bg-amber-500 transition-all rounded-sm shadow-xl"
                    >
                        <Save size={16} /> Save Manifest
                    </button>
                </section>
            </aside>

            {/* Main: Visual Grid */}
            <div className="flex-1 p-12 overflow-auto flex flex-col">
                <header className="mb-8 border-b border-zinc-900 pb-4">
                    <h3 className="text-3xl font-bold italic tracking-tighter uppercase italic">{locationData?.name} Layout</h3>
                    <p className="text-zinc-500 text-[10px] uppercase font-mono mt-1 tracking-[0.2em]">{GRID_W} x {GRID_H} Grid / KDSC_v1</p>
                </header>

                <div className="relative inline-block border border-zinc-800 p-1 bg-zinc-900 rounded-sm self-start">
                    <div 
                        className="grid"
                        style={{ 
                            gridTemplateColumns: `repeat(${GRID_W}, 30px)`,
                            gridTemplateRows: `repeat(${GRID_H}, 30px)`
                        }}
                    >
                        {Array.from({ length: GRID_H }).map((_, y) => (
                            Array.from({ length: GRID_W }).map((_, x) => {
                                const isMerchant = config.merchants.some((m: any) => m[0] === x && m[1] === y);
                                const isManuscript = config.manuscripts.some((m: any) => m[0] === x && m[1] === y);
                                const isExit = config.exit[0] === x && config.exit[1] === y;
                                const isBoundary = x === 0 || x === GRID_W - 1 || y === 0 || y === GRID_H - 1;
                                const isWater = x < 3;
                                
                                return (
                                    <div 
                                        key={`${x}-${y}`}
                                        onClick={() => handleGridClick(x, y)}
                                        className={`w-full h-full border border-zinc-800/30 flex items-center justify-center transition-all cursor-crosshair relative group ${isBoundary ? 'bg-zinc-800' : isWater ? 'bg-blue-900/10' : 'bg-zinc-950 hover:bg-zinc-800'}`}
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-amber-500/10 transition-opacity" />
                                        
                                        {isMerchant && <ShoppingBag size={14} className="text-amber-500 shadow-glow" />}
                                        {isManuscript && <BookOpen size={14} className="text-blue-400" />}
                                        {isExit && <Anchor size={14} className="text-zinc-100" />}
                                    </div>
                                );
                            })
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 max-w-xl">
                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest border-b border-zinc-900 pb-2">Interaction Messages</h5>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-zinc-600 mb-1 uppercase tracking-widest">Merchant Prompt</label>
                                <input 
                                    className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs italic text-zinc-300 focus:border-amber-500 outline-none rounded-sm"
                                    value={config.messages.merchant}
                                    onChange={(e) => setConfig({ ...config, messages: { ...config.messages, merchant: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-[9px] font-black text-zinc-600 mb-1 uppercase tracking-widest">Manuscript Discovery</label>
                                <input 
                                    className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs italic text-zinc-300 focus:border-amber-500 outline-none rounded-sm"
                                    value={config.messages.manuscript}
                                    onChange={(e) => setConfig({ ...config, messages: { ...config.messages, manuscript: e.target.value } })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .shadow-glow { filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.5)); }
            `}} />
        </div>
    );
};
