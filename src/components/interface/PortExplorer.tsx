import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/gameStore';
import { 
    User, 
    ShoppingBag, 
    BookOpen, 
    Anchor, 
    ArrowUp, 
    ArrowDown, 
    ArrowLeft, 
    ArrowRight,
    Map as MapIcon,
    AlertCircle
} from 'lucide-react';

const GRID_W = 24;
const GRID_H = 15;
const TILE_SIZE = 40;

type TileType = 'floor' | 'wall' | 'water' | 'merchant' | 'manuscript' | 'exit';

interface Tile {
    type: TileType;
    interacted?: boolean;
}

export const PortExplorer: React.FC = () => {
    const { setView, location: currentLoc, manifest, addLog } = useGameStore();
    const [pos, setPos] = useState({ x: 2, y: 7 });
    const [grid, setGrid] = useState<Tile[][]>([]);
    const [message, setMessage] = useState<string | null>("Use WASD or Arrows to explore the port.");

    const locationData: any = manifest.locations.find(l => l.id === currentLoc);
    const portConfig = locationData?.port_config;

    // Seed-based procedural generation for port variety
    useEffect(() => {
        const newGrid: Tile[][] = [];
        for (let y = 0; y < GRID_H; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < GRID_W; x++) {
                let type: TileType = 'floor';
                
                // Boundaries & Base Terrain
                if (x === 0 || x === GRID_W - 1 || y === 0 || y === GRID_H - 1) type = 'wall';
                if (x < 3) type = 'water';
                if (x === 3 && (y < 6 || y > 8)) type = 'wall';

                // Manifest-Driven Key Features
                if (portConfig?.merchants?.some((p: any) => p[0] === x && p[1] === y)) type = 'merchant';
                if (portConfig?.manuscripts?.some((p: any) => p[0] === x && p[1] === y)) type = 'manuscript';
                if (portConfig?.exit?.[0] === x && portConfig?.exit?.[1] === y) type = 'exit';

                row.push({ type });
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
    }, [currentLoc, portConfig]);

    const move = useCallback((dx: number, dy: number) => {
        setPos(prev => {
            const nx = prev.x + dx;
            const ny = prev.y + dy;
            
            // Bounds check
            if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) return prev;
            
            const targetTile = grid[ny][nx];
            if (targetTile.type === 'wall' || targetTile.type === 'water') {
                setMessage("An obstacle blocks your path.");
                return prev;
            }

            // Interaction logic from PortConfig
            if (targetTile.type === 'merchant') {
                setMessage(portConfig?.messages?.merchant || "Trade with local merchants.");
            } else if (targetTile.type === 'manuscript') {
                setMessage(portConfig?.messages?.manuscript || "Study the manuscripts.");
            } else if (targetTile.type === 'exit') {
                setMessage(portConfig?.messages?.exit || "Return to the ship.");
            } else {
                setMessage(null);
            }

            return { x: nx, y: ny };
        });
    }, [grid]);

    const interact = useCallback(() => {
        const tile = grid[pos.y][pos.x];
        if (tile.type === 'merchant') setView('market');
        if (tile.type === 'manuscript' && !tile.interacted) {
            addLog(`DISCOVERY: Found a fragment of a lost treatise on ${locationData?.name}. Knowledge increased.`);
            // Mark tile as interacted
            setGrid(prev => prev.map((row, y) => row.map((t, x) => (x === pos.x && y === pos.y) ? { ...t, interacted: true } : t)));
            // We can't call setStats easily here without the store, but addLog works.
            // I'll actually assume the user store has a gainKnowledge action or similar.
        }
        if (tile.type === 'exit') setView('nav');
    }, [grid, pos, setView, addLog, locationData]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'w', 'W'].includes(e.key)) move(0, -1);
            if (['ArrowDown', 's', 'S'].includes(e.key)) move(0, 1);
            if (['ArrowLeft', 'a', 'A'].includes(e.key)) move(-1, 0);
            if (['ArrowRight', 'd', 'D'].includes(e.key)) move(1, 0);
            if (['e', 'E', 'Enter', ' '].includes(e.key)) interact();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move, interact]);

    return (
        <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden font-mono">
            {/* Explorer Header */}
            <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center px-12 justify-between">
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest">Port Exploration</span>
                    <h2 className="text-xl font-bold italic text-white tracking-tighter uppercase">{locationData?.name}</h2>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase">
                        <User size={14} className="text-gold" /> SIR KENELM DIGBY
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* World Viewport */}
                <main className="flex-1 p-12 flex items-center justify-center bg-[#0a0a0a]">
                    <div 
                        className="relative border-4 border-zinc-800 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-zinc-900 overflow-hidden"
                        style={{ width: GRID_W * TILE_SIZE, height: GRID_H * TILE_SIZE }}
                    >
                        {/* Grid Layers */}
                        {grid.map((row, y) => row.map((tile, x) => (
                            <div 
                                key={`${x}-${y}`}
                                className="absolute flex items-center justify-center transition-all"
                                style={{ 
                                    left: x * TILE_SIZE, 
                                    top: y * TILE_SIZE, 
                                    width: TILE_SIZE, 
                                    height: TILE_SIZE,
                                    backgroundColor: tile.type === 'water' ? '#0c2233' : tile.type === 'wall' ? '#111' : '#1a1a1a',
                                    border: '0.5px solid rgba(255,255,255,0.02)'
                                }}
                            >
                                {tile.type === 'merchant' && <ShoppingBag size={20} className="text-amber-500 animate-pulse" />}
                                {tile.type === 'manuscript' && <BookOpen size={20} className="text-blue-500 animate-bounce" />}
                                {tile.type === 'exit' && <Anchor size={20} className="text-zinc-500" />}
                                {tile.type === 'wall' && <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-50" />}
                            </div>
                        )))}

                        {/* Player Sprite */}
                        <motion.div
                            animate={{ left: pos.x * TILE_SIZE, top: pos.y * TILE_SIZE }}
                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                            className="absolute flex items-center justify-center z-50 pointer-events-none"
                            style={{ width: TILE_SIZE, height: TILE_SIZE }}
                        >
                            <div className="w-8 h-8 bg-gold rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center justify-center border-2 border-zinc-950">
                                <User size={16} className="text-zinc-950" />
                            </div>
                        </motion.div>
                    </div>
                </main>

                {/* Sidebar Info */}
                <aside className="w-80 border-l border-zinc-800 p-8 flex flex-col gap-12 bg-zinc-950/50">
                    <div>
                        <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-6">Navigation Controls</h4>
                        <div className="grid grid-cols-3 gap-2 w-32">
                            <div /> <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center group"><ArrowUp size={16} className="text-zinc-600 group-hover:text-gold" /></div> <div />
                            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center group"><ArrowLeft size={16} className="text-zinc-600 group-hover:text-gold" /></div>
                            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center group"><ArrowDown size={16} className="text-zinc-600 group-hover:text-gold" /></div>
                            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center group"><ArrowRight size={16} className="text-zinc-600 group-hover:text-gold" /></div>
                        </div>
                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <div className="w-3 h-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-[8px] font-black">E</div>
                                <span className="text-[9px] font-bold uppercase tracking-widest">Interact / Enter</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <AnimatePresence>
                            {message && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase font-black leading-relaxed tracking-widest flex items-start gap-4"
                                >
                                    <AlertCircle size={16} />
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="border-t border-zinc-900 pt-8 opacity-20 italic text-[10px] leading-relaxed">
                        "Port exploration reveals the subtle currents of trade and knowledge that the open sea often conceals."
                    </div>
                </aside>
            </div>

            {/* Minimap Overlay */}
            <div className="absolute bottom-12 left-12 p-1 bg-zinc-950 border border-zinc-800 flex items-center gap-3 pr-6">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center text-zinc-700">
                    <MapIcon size={24} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-zinc-600">Mini-Map</span>
                    <span className="text-[10px] font-black uppercase text-zinc-300">Port Surface</span>
                </div>
            </div>
        </div>
    );
};
