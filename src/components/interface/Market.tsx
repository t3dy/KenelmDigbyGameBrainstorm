import React from 'react';
import { useGameStore } from '../../state/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, ShoppingBag, ArrowLeftRight, Package, Info } from 'lucide-react';

export const Market: React.FC = () => {
    const { 
        location: locationId, stats, manifest, buyReagent, sellReagent, setView 
    } = useGameStore();

    const marketData = (manifest.markets as any)[locationId] || [];
    const locationName = manifest.locations.find(l => l.id === locationId)?.name || locationId;

    return (
        <div className="flex-1 bg-[#0c0c0e] flex flex-col p-8 overflow-hidden">
            {/* Header */}
            <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-500 flex items-center justify-center rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        <ShoppingBag size={32} className="text-zinc-950" />
                    </div>
                    <div>
                         <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.4em] mb-1 block">Levantine Exchange</span>
                         <h2 className="text-4xl font-black italic tracking-tighter text-zinc-100">{locationName.toUpperCase()}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-10 bg-zinc-900/50 p-6 border border-zinc-800 rounded-sm">
                    <div className="text-right">
                        <span className="block text-[8px] uppercase tracking-widest text-zinc-500">Current Wealth</span>
                        <span className="text-3xl font-mono font-bold text-amber-500 flex items-center gap-2">
                             <Coins size={20} /> {stats.wealth}
                        </span>
                    </div>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-12 overflow-hidden">
                {/* Buy Section */}
                <section className="col-span-12 lg:col-span-8 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-4 mb-6">
                        <ArrowLeftRight className="text-amber-500" size={18} />
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400">Merchant Stock</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                        {marketData.length > 0 ? marketData.map((item: any) => (
                            <motion.div 
                                key={item.id}
                                className="bg-zinc-900/30 border border-zinc-800 p-6 flex items-center justify-between hover:bg-zinc-900/60 transition-all border-l-4 border-l-transparent hover:border-l-amber-500"
                            >
                                <div className="flex gap-6 items-center">
                                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-500/50">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-100 leading-tight mb-1">{item.name}</h4>
                                        <p className="text-[10px] text-zinc-500 italic max-w-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                         <span className="block text-[8px] uppercase tracking-widest text-zinc-600 mb-1">Buy Price</span>
                                         <span className="text-xl font-mono font-bold text-zinc-300">{item.buy_price} <span className="text-[10px] opacity-40">GP</span></span>
                                    </div>
                                    <button 
                                        onClick={() => buyReagent(item.id, item.name, 1, item.buy_price)}
                                        disabled={stats.wealth < item.buy_price}
                                        className="px-8 py-3 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all disabled:opacity-20 disabled:grayscale"
                                    >
                                        Procure
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 border-2 border-dashed border-zinc-800 p-12">
                                <Info size={48} />
                                <span className="mt-4 font-mono uppercase text-xs tracking-widest">No merchant presence in this port.</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Sell / Inventory Section */}
                <aside className="col-span-12 lg:col-span-4 flex flex-col bg-zinc-950/50 border border-zinc-800 p-8 rounded-sm overflow-hidden">
                    <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800">
                         <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-100 mb-2">Ship's Hold</h3>
                         <div className="h-1 w-full bg-zinc-800">
                             <div className="h-full bg-amber-500" style={{ width: '40%' }} />
                         </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3">
                         {stats.reagents.map(r => (
                            <div key={r.id} className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 transition-colors group">
                                <div>
                                    <span className="text-xs font-black text-zinc-300 group-hover:text-amber-500 transition-colors uppercase tracking-tighter">{r.name}</span>
                                    <span className="block text-[10px] font-mono text-zinc-600">Qty: {r.quantity}</span>
                                </div>
                                <button 
                                    onClick={() => sellReagent(r.id, 1, 10)} // Placeholder sell logic
                                    className="p-2 text-zinc-600 hover:text-white transition-colors"
                                >
                                    <ArrowLeftRight size={14} />
                                </button>
                            </div>
                         ))}
                    </div>

                    <button 
                         onClick={() => setView('nav')}
                         className="mt-8 w-full py-4 border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 transition-all text-[9px] uppercase font-black tracking-[0.5em]"
                    >
                         Depart Market
                    </button>
                </aside>
            </div>
        </div>
    );
};
