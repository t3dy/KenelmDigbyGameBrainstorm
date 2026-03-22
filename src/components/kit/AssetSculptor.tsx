import React, { useState } from 'react';
import { 
    Grid, 
    Eraser, 
    Paintbrush, 
    Undo, 
    Download, 
    Save, 
    Package,
    Sparkles
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * ASSET SCULPTOR: Icon & Sprite Editor
 * 
 * Provides a pixel-level authoring environment for creating
 * reagents, port icons, and actor busts for the Almagest project.
 */

const GRID_SIZE = 16;

export const AssetSculptor: React.FC = () => {
    const { currentProjectSlug } = useGameStore();
    const [grid, setGrid] = useState<string[][]>(
        Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('transparent'))
    );
    const [selectedColor, setSelectedColor] = useState('#FFD700');
    const [isErasing, setIsErasing] = useState(false);
    const [assetName, setAssetName] = useState('ICON_REAGENT_NEW');
    const [isSaving, setIsSaving] = useState(false);
    const [aiAssetAdvice, setAiAssetAdvice] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAIGenerationSuggest = async () => {
        setIsGenerating(true);
        const prompt = `### SYSTEM: You are the Scholar analyzing Alchemical Symbols.
Suggest a pixel-art symbol and primary color for a reagent named "${assetName}".
Analyze the historical weight of its components and recommend a visual direction.

### ADVICE:`;
        
        const response = await (window as any).almagest.queryLLM({ 
            provider: 'Resident Scholar (Local)', 
            prompt 
        });
        setAiAssetAdvice(response);
        setIsGenerating(false);
    };

    const handlePixelClick = (r: number, c: number) => {
        const newGrid = [...grid];
        newGrid[r][c] = isErasing ? 'transparent' : selectedColor;
        setGrid(newGrid);
    };

    const clearGrid = () => {
        setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('transparent')));
    };

    const handleSave = async () => {
        if (!currentProjectSlug) return;
        setIsSaving(true);
        const assetData = {
            id: assetName.toLowerCase().replace(/ /g, '_'),
            name: assetName,
            color: selectedColor,
            pixels: grid
        };
        
        const result = await (window as any).almagest.saveAsset({
            project: currentProjectSlug,
            asset: assetData
        });
        setIsSaving(false);
        if (result.success) {
            alert(`Asset "${assetName}" saved to project repository.`);
        } else {
            alert(`Error saving asset: ${result.error}`);
        }
    };

    const handleExport = async () => {
        const markdown = `# ALMAGEST ASSET: ${assetName}
        
## Metadata
- Type: 16x16 Pixel Icon
- Primary Color: ${selectedColor}
- Project: ${currentProjectSlug}

## Scholar's Visual Advice:
${aiAssetAdvice || 'NO ADVICE RECORDED'}

## Pixel Data (Hex LUT)
\`\`\`json
${JSON.stringify(grid, null, 2)}
\`\`\`
`;
        await (window as any).almagest.exportToDesktop({
            filename: `${assetName.toLowerCase().replace(/ /g, '_')}_design_${Date.now()}.md`,
            content: markdown
        });
        alert('Design Document (.md) exported to Desktop.');
    };

    const colors = [
        '#FFD700', // Gold
        '#FFFFFF', // White
        '#4299E1', // Blue
        '#F56565', // Red
        '#48BB78', // Green
        '#9F7AEA', // Purple
        '#718096', // Slate
        '#1A202C'  // Dark
    ];

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Tool Palette */}
            <div className="w-80 border-r border-zinc-900 bg-zinc-950/40 p-8 flex flex-col gap-12">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Asset Fabrication</span>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Icon Lab</h2>
                    <p className="text-[9px] text-zinc-600 font-serif italic mt-4 leading-relaxed">
                        "Sculpt the visual identity of your reagents and ports. Use the pixel grid to forge symbols that the Scholar can recognize and the fleet can track."
                    </p>
                </header>

                <div className="space-y-8">
                    {/* Tools */}
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => setIsErasing(false)}
                            className={`p-4 border flex flex-col items-center gap-2 transition-all ${!isErasing ? 'bg-zinc-100 border-white text-zinc-950' : 'border-zinc-800 text-zinc-600 hover:border-zinc-500'}`}
                        >
                            <Paintbrush size={18} />
                            <span className="text-[8px] font-black uppercase">Draw</span>
                        </button>
                        <button 
                            onClick={() => setIsErasing(true)}
                            className={`p-4 border flex flex-col items-center gap-2 transition-all ${isErasing ? 'bg-zinc-100 border-white text-zinc-950' : 'border-zinc-800 text-zinc-600 hover:border-zinc-500'}`}
                        >
                            <Eraser size={18} />
                            <span className="text-[8px] font-black uppercase">Erase</span>
                        </button>
                    </div>

                    {/* Colors */}
                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block">Palette</span>
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map(c => (
                                <button 
                                    key={c}
                                    onClick={() => { setSelectedColor(c); setIsErasing(false); }}
                                    className={`w-full aspect-square border-2 transition-all ${selectedColor === c && !isErasing ? 'border-white scale-110 z-10' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block">Identity</span>
                        <input 
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-[10px] font-mono text-white focus:border-gold transition-all"
                        />
                        <p className="text-[8px] text-zinc-700 font-mono tracking-widest px-1">Define the unique Almagest ID for this fabrication.</p>
                    </div>

                    <button 
                        onClick={handleAIGenerationSuggest}
                        disabled={isGenerating}
                        className="w-full p-4 border border-zinc-700 bg-zinc-950 flex items-center justify-center gap-3 text-[9px] font-black uppercase text-gold hover:bg-gold hover:text-zinc-950 transition-all shadow-lg group disabled:opacity-50"
                    >
                        <Sparkles size={14} className={isGenerating ? 'animate-spin' : 'group-hover:animate-spin'} /> {isGenerating ? 'Consulting Glyphs...' : 'AI Alchemical Suggest'}
                    </button>

                    {aiAssetAdvice && (
                         <div className="p-4 bg-gold/5 border border-gold/20 space-y-2">
                              <span className="text-[8px] font-black uppercase text-gold">Scholarly Advice</span>
                              <p className="text-[9px] text-zinc-500 font-serif italic leading-relaxed">{aiAssetAdvice}</p>
                         </div>
                    )}
                </div>

                <div className="mt-auto space-y-4">
                     <button onClick={clearGrid} className="w-full p-4 border border-zinc-900 text-[9px] font-black uppercase text-zinc-700 hover:text-white transition-all flex items-center justify-center gap-3">
                         <Undo size={14} /> Reset Canvas
                     </button>
                     <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full p-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase flex items-center justify-center gap-3 hover:bg-gold transition-all shadow-2xl disabled:opacity-50"
                    >
                         <Save size={14} /> {isSaving ? 'Saving...' : 'Commit Asset'}
                     </button>
                </div>
            </div>

            {/* Middle: Canvas Stage */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <Grid size={1000} className="w-full h-full text-zinc-100" />
                 </div>

                 {/* Pixel Grid */}
                 <div className="relative p-8 bg-zinc-900 border border-zinc-800 shadow-[0_0_100px_rgba(255,215,0,0.05)]">
                    <div 
                        className="grid gap-px bg-zinc-800 border border-zinc-800"
                        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                    >
                        {grid.map((row, r) => (
                            row.map((color, c) => (
                                <div 
                                    key={`${r}-${c}`}
                                    onMouseDown={() => handlePixelClick(r, c)}
                                    onMouseEnter={(e) => e.buttons === 1 && handlePixelClick(r, c)}
                                    className="w-8 h-8 cursor-crosshair transition-colors duration-75"
                                    style={{ backgroundColor: color === 'transparent' ? '#09090b' : color }}
                                />
                            ))
                        ))}
                    </div>

                    {/* Ruler markers */}
                    <div className="absolute -left-12 top-8 bottom-8 flex flex-col justify-between text-[8px] font-mono text-zinc-700">
                        <span>0</span><span>8</span><span>16</span>
                    </div>
                    <div className="absolute -top-12 left-8 right-8 flex justify-between text-[8px] font-mono text-zinc-700">
                        <span>0</span><span>8</span><span>16</span>
                    </div>
                 </div>
            </div>

            {/* Right: Preview & Export */}
            <div className="w-80 border-l border-zinc-900 bg-zinc-950/40 p-12 flex flex-col gap-12">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Result Preview</span>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Output</h2>
                </header>

                {/* 1:1 Preview */}
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block">16x16 Raw</span>
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                         <div 
                            className="grid"
                            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1px)` }}
                        >
                            {grid.map((row) => row.map((color, i) => (
                                <div key={i} className="w-px h-px" style={{ backgroundColor: color }} />
                            )))}
                        </div>
                    </div>
                </div>

                {/* 64x64 In-Game */}
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block">Game Scale</span>
                    <div className="w-24 h-24 bg-zinc-950 border border-gold/10 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.05)]">
                         <div 
                            className="grid"
                            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 4px)` }}
                        >
                            {grid.map((row) => row.map((color, i) => (
                                <div key={i} className="w-[4px] h-[4px]" style={{ backgroundColor: color }} />
                            )))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                     <section className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                          <div className="flex items-center gap-3 mb-4">
                               <Package size={14} className="text-gold" />
                               <span className="text-[9px] font-black uppercase text-zinc-500">Fabrication Specs</span>
                          </div>
                          <p className="text-[9px] text-zinc-600 font-mono">Format: .JSON_SPRITE<br/>Depth: 8-BIT_LUT<br/>Integrity: NOMINAL</p>
                     </section>
                     <button 
                        onClick={handleExport}
                        className="w-full p-4 border border-zinc-800 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                         <Download size={14} /> Export Design Doc (.md)
                     </button>
                </div>
            </div>
        </div>
    );
};
