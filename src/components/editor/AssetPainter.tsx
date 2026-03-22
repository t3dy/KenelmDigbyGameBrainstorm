import React, { useState } from 'react';
import { 
    FlaskConical, 
    Skull, 
    Crown, 
    Gem, 
    Waves, 
    Compass, 
    Save, 
    Palette, 
    Grid3X3,
    Check,
    Edit3
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

const ICON_REGISTRY = [
    { id: 'flask', component: FlaskConical },
    { id: 'skull', component: Skull },
    { id: 'crown', component: Crown },
    { id: 'gem', component: Gem },
    { id: 'waves', component: Waves },
    { id: 'compass', component: Compass },
];

const ALCHEMICAL_PALETTE = [
    { name: 'Mercury Silver', hex: '#e2e8f0' },
    { name: 'Sulphur Gold', hex: '#fbbf24' },
    { name: 'Vitriol Green', hex: '#10b981' },
    { name: 'Cinnabar Red', hex: '#ef4444' },
    { name: 'Lead Blue', hex: '#3b82f6' },
    { name: 'Obsidian Black', hex: '#000000' }
];

export const AssetPainter: React.FC = () => {
    const { manifest, saveAsset } = useGameStore();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editorType, setEditorType] = useState<'icon' | 'pixel'>('icon');
    
    // Pixel state: 12x12 grid
    const [pixelGrid, setPixelGrid] = useState<number[][]>(
        Array(12).fill(0).map(() => Array(12).fill(0))
    );

    const selectedReagent = manifest.reagents.find(r => r.id === selectedId);
    const assetMeta = (manifest as any).assets?.[selectedId || ''] || { icon: 'flask', color: '#fbbf24' };

    const handleCellClick = (r: number, c: number) => {
        const newGrid = [...pixelGrid.map(row => [...row])];
        newGrid[r][c] = newGrid[r][c] === 1 ? 0 : 1;
        setPixelGrid(newGrid);
    };

    const handleSave = () => {
        if (!selectedId) return;
        saveAsset(selectedId, {
            icon: assetMeta.icon,
            color: assetMeta.color,
            pixels: editorType === 'pixel' ? pixelGrid : undefined
        });
        alert(`Asset ${selectedId} committed to manifest.`);
    };

    return (
        <div className="flex-1 flex overflow-hidden bg-zinc-950 font-mono">
            {/* Asset Sidebar */}
            <aside className="w-80 border-r border-zinc-900 bg-zinc-950/50 flex flex-col">
                <header className="p-6 border-b border-zinc-900">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Asset Registry</span>
                </header>
                <div className="flex-1 overflow-y-auto">
                    {manifest.reagents.map(reagent => (
                        <div 
                            key={reagent.id}
                            onClick={() => setSelectedId(reagent.id)}
                            className={`p-6 border-b border-zinc-900 cursor-pointer transition-all ${selectedId === reagent.id ? 'bg-zinc-900 border-l-2 border-l-gold' : 'hover:bg-zinc-900/30'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-sm bg-zinc-800 flex items-center justify-center">
                                    {React.createElement(ICON_REGISTRY.find(i => i.id === ((manifest as any).assets?.[reagent.id]?.icon || 'flask'))?.component || FlaskConical, {
                                        size: 16,
                                        style: { color: (manifest as any).assets?.[reagent.id]?.color || '#555' }
                                    })}
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">{reagent.name}</h4>
                                    <p className="text-[8px] text-zinc-600 font-black">{reagent.id}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Editing Canvas */}
            {selectedId ? (
                <main className="flex-1 flex flex-col p-16 overflow-y-auto bg-[#050505]">
                    <div className="max-w-5xl mx-auto w-full">
                        <header className="flex justify-between items-end mb-16 border-b border-zinc-900 pb-12">
                            <div>
                                <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase mb-2">
                                    Visual Identity: <span className="text-gold">{selectedReagent?.name}</span>
                                </h2>
                                <p className="text-[10px] text-zinc-500 tracking-[0.3em] font-black uppercase">Entity.Asset_Editor :: Revision_04</p>
                            </div>
                            <button onClick={handleSave} className="flex items-center gap-3 px-8 py-4 bg-zinc-100 text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-2xl">
                                <Save size={16} /> Save Asset
                            </button>
                        </header>

                        <div className="grid grid-cols-[1fr_350px] gap-16">
                            {/* Editor Body */}
                            <div className="space-y-12">
                                <nav className="flex gap-4 border-b border-zinc-900 pb-6">
                                    <button 
                                        onClick={() => setEditorType('icon')}
                                        className={`flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-zinc-800 rounded-sm transition-all ${editorType === 'icon' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-600 hover:text-white'}`}
                                    >
                                        <Grid3X3 size={14} /> Icon Selector
                                    </button>
                                    <button 
                                        onClick={() => setEditorType('pixel')}
                                        className={`flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-zinc-800 rounded-sm transition-all ${editorType === 'pixel' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-600 hover:text-white'}`}
                                    >
                                        <Edit3 size={14} /> Pixel Painter
                                    </button>
                                </nav>

                                {editorType === 'icon' ? (
                                    <section>
                                        <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-8">Lucide Icon Registry</h5>
                                        <div className="grid grid-cols-6 gap-6">
                                            {ICON_REGISTRY.map(icon => (
                                                <button 
                                                    key={icon.id}
                                                    onClick={() => saveAsset(selectedId, { ...assetMeta, icon: icon.id })}
                                                    className={`aspect-square flex flex-col items-center justify-center border transition-all hover:scale-110 ${assetMeta.icon === icon.id ? 'bg-zinc-900 border-gold shadow-[0_0_20px_rgba(251,191,36,0.2)]' : 'bg-transparent border-zinc-900 text-zinc-700'}`}
                                                >
                                                    <icon.component size={24} style={{ color: assetMeta.icon === icon.id ? assetMeta.color : undefined }} />
                                                    <span className="mt-3 text-[8px] font-black uppercase tracking-tighter opacity-50">{icon.id}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                ) : (
                                    <section>
                                        <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-8">8-Bit Sprite Canvas (12x12)</h5>
                                        <div className="bg-zinc-950 p-8 border border-zinc-900 inline-block">
                                            <div className="grid grid-cols-12 gap-1 bg-zinc-900 p-1">
                                                {pixelGrid.map((row, r) => row.map((cell, c) => (
                                                    <div 
                                                        key={`${r}-${c}`}
                                                        onClick={() => handleCellClick(r, c)}
                                                        className={`w-8 h-8 cursor-crosshair transition-all ${cell === 1 ? 'shadow-[inset_0_0_8px_rgba(255,255,255,0.4)]' : 'hover:bg-zinc-800'}`}
                                                        style={{ backgroundColor: cell === 1 ? assetMeta.color : '#050505' }}
                                                    />
                                                )))}
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Controls Sidebar */}
                            <div className="space-y-12">
                                <section>
                                    <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-6 flex items-center gap-3">
                                        <Palette size={14} /> Color Palette
                                    </h5>
                                    <div className="grid grid-cols-1 gap-3">
                                        {ALCHEMICAL_PALETTE.map(color => (
                                            <button 
                                                key={color.hex}
                                                onClick={() => saveAsset(selectedId, { ...assetMeta, color: color.hex })}
                                                className={`flex items-center gap-4 p-4 border transition-all ${assetMeta.color === color.hex ? 'bg-zinc-900 border-zinc-500 translate-x-2' : 'border-zinc-900/50 hover:border-zinc-800'}`}
                                            >
                                                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color.hex }} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${assetMeta.color === color.hex ? 'text-white' : 'text-zinc-600'}`}>
                                                    {color.name}
                                                </span>
                                                {assetMeta.color === color.hex && <Check size={12} className="ml-auto text-gold" />}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-6">Live Outlook</h5>
                                    <div className="aspect-square bg-zinc-950 border border-dotted border-zinc-800 flex flex-col items-center justify-center p-12">
                                        <div className="p-12 bg-zinc-900/50 rounded-lg shadow-2xl animate-pulse">
                                             {editorType === 'icon' ? (
                                                React.createElement(ICON_REGISTRY.find(i => i.id === assetMeta.icon)?.component || FlaskConical, {
                                                    size: 64,
                                                    style: { color: assetMeta.color }
                                                })
                                             ) : (
                                                 <div className="grid grid-cols-12 gap-[1px]">
                                                     {pixelGrid.map((row, r) => row.map((cell, c) => (
                                                         <div 
                                                             key={`${r}-${c}`}
                                                             className="w-1.5 h-1.5"
                                                             style={{ backgroundColor: cell === 1 ? assetMeta.color : 'transparent' }}
                                                         />
                                                     )))}
                                                 </div>
                                             )}
                                        </div>
                                        <p className="mt-8 text-[9px] font-serif italic text-zinc-600">"As the alchemist sees, so the world becomes."</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-20 italic font-serif p-24 text-center">
                    <Palette size={64} className="mb-6" />
                    <p className="text-2xl">"Design the visual essence of your elements."</p>
                    <p className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gold/50 tracking-[0.5em]">BUFFER_EMPTY</p>
                </div>
            )}
        </div>
    );
};
