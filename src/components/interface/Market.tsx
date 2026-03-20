import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Coins, TrendingUp, Package, ArrowRight, ArrowLeft, Info, Plus, Minus } from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

export const Market: React.FC = () => {
    const { stats, buyReagent, sellReagent, location: locId, manifest, setView, previousView } = useGameStore();
    const [selectedReagent, setSelectedReagent] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const locationName = manifest.locations.find(l => l.id === locId)?.name || locId;

    const marketReagents = [
        { id: 'vitriol', name: 'Raw Vitriol', price: 20, description: 'Fundamental acidic salt for all transformations.' },
        { id: 'nitre', name: 'Nitre', price: 15, description: 'Potent oxidizer for explosive reactions.' },
        { id: 'antimony', name: 'Antimony', price: 150, description: 'Rare semi-metal. Essential for specific tinctures.' },
        { id: 'mercury', name: 'Quicksilver', price: 80, description: 'Fluid metal. The philosopher\'s root.' }
    ];

    const currentItem = marketReagents.find(r => r.id === selectedReagent);
    const inventoryItem = stats.reagents.find(r => r.id === selectedReagent);
    const totalPrice = (currentItem?.price || 0) * quantity;

    return (
        <div className="flex-1 flex flex-col p-12 bg-[#fdfaf6] font-serif relative overflow-hidden h-full">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabic-bazars.png')]" />

            <header className="mb-12 border-b-4 border-zinc-950 pb-6 flex justify-between items-end relative z-10">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-zinc-950 text-amber-500 rounded-sm shadow-2xl">
                        <ShoppingBag size={32} />
                    </div>
                    <div>
                        <h2 className="text-5xl italic tracking-tighter uppercase">Levantine Bazaar</h2>
                        <p className="text-amber-700 font-display font-black text-[10px] tracking-[0.4em] uppercase">Trading at: {locationName}</p>
                    </div>
                </div>
                
                <button 
                  onClick={() => setView(previousView)}
                  className="px-6 py-3 border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl"
                >
                    <ArrowLeft size={14} /> Exit to NavMap
                </button>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1 min-h-0 relative z-10">
                {/* Available Goods */}
                <aside className="col-span-5 flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2 flex items-center gap-2">
                        <TrendingUp size={14} /> Current Market Availability
                    </h4>
                    {marketReagents.map(reagent => (
                        <button
                            key={reagent.id}
                            onClick={() => { setSelectedReagent(reagent.id); setQuantity(1); }}
                            className={`p-6 border-2 transition-all flex items-center justify-between group shadow-sm ${selectedReagent === reagent.id ? 'bg-zinc-950 border-zinc-950 text-white translate-x-3' : 'bg-white border-zinc-100 hover:border-zinc-950'}`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 flex items-center justify-center border-2 ${selectedReagent === reagent.id ? 'border-amber-500/30' : 'border-zinc-100 group-hover:border-zinc-950'}`}>
                                    <Package size={20} className={selectedReagent === reagent.id ? 'text-amber-500' : 'text-zinc-300'} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-lg leading-tight uppercase tracking-tight">{reagent.name}</p>
                                    <p className={`text-[9px] uppercase font-black tracking-widest ${selectedReagent === reagent.id ? 'text-amber-500' : 'text-zinc-400'}`}>Price: {reagent.price} Gold</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className={selectedReagent === reagent.id ? 'opacity-100' : 'opacity-0'} />
                        </button>
                    ))}
                </aside>

                {/* Transaction Panel */}
                <main className="col-span-7 bg-white border-2 border-zinc-950 shadow-[20px_20px_0_rgba(0,0,0,0.05)] p-12 flex flex-col relative">
                    <AnimatePresence mode="wait">
                        {selectedReagent && currentItem ? (
                            <motion.div
                                key={selectedReagent}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col h-full"
                            >
                                <div className="mb-10 flex justify-between items-start">
                                    <div className="max-w-md">
                                        <h3 className="text-4xl italic mb-4 uppercase tracking-tighter">{currentItem.name}</h3>
                                        <p className="text-zinc-500 italic text-sm leading-relaxed pr-8">"{currentItem.description}"</p>
                                    </div>
                                    <div className="bg-zinc-50 p-6 border border-zinc-100 text-center">
                                        <span className="text-[9px] font-black uppercase text-zinc-400 block mb-2 tracking-widest italic">Current Stock</span>
                                        <span className="text-3xl font-bold font-mono text-zinc-950">{inventoryItem?.quantity || 0}</span>
                                    </div>
                                </div>

                                <div className="mt-auto space-y-10">
                                    {/* Wealth Counter */}
                                    <div className="flex items-center gap-6 p-6 border-2 border-dashed border-zinc-200 bg-zinc-50/50">
                                        <Coins className="text-amber-600" size={24} />
                                        <div className="flex-1">
                                            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-1">Available Capital</span>
                                            <span className="text-2xl font-bold font-mono">{stats.wealth} GOLD</span>
                                        </div>
                                        {totalPrice > 0 && (
                                            <div className="text-right">
                                                <span className="text-[9px] font-black uppercase text-red-400 tracking-widest block mb-1">Transaction Price</span>
                                                <span className="text-2xl font-bold font-mono">-{totalPrice}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="flex-1 flex items-center border-2 border-zinc-950 overflow-hidden">
                                            <button 
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-8 py-6 bg-zinc-50 hover:bg-zinc-100 transition-colors border-r-2 border-zinc-950"
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <div className="flex-1 text-center text-4xl font-bold font-mono bg-white">
                                                {quantity}
                                            </div>
                                            <button 
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="px-8 py-6 bg-zinc-50 hover:bg-zinc-100 transition-colors border-l-2 border-zinc-950"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                        
                                        <button 
                                            disabled={totalPrice > stats.wealth}
                                            onClick={() => buyReagent(currentItem.id, currentItem.name, quantity, totalPrice)}
                                            className={`flex-[1.5] py-6 font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl relative overflow-hidden group ${totalPrice > stats.wealth ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
                                        >
                                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            {totalPrice > stats.wealth ? 'Insufficient Funds' : 'Execute Exchange'}
                                        </button>
                                    </div>

                                    <div className="flex justify-center gap-12 pt-6 opacity-30">
                                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest">
                                            <Info size={14} /> Trade Ethics: Levantine Balance
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest">
                                            <ArrowRight size={14} /> Handshake: Librarian Verified
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 italic">
                                <ShoppingBag size={64} className="mb-6" />
                                <p className="text-xl">Select a commodity from the market manifest<br />to initiate an exchange.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};
