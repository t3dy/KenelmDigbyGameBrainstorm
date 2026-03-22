import React, { useState } from 'react';
import { 
    Globe, 
    TrendingUp, 
    Anchor,
    Map,
    Activity,
    Users,
    AlertCircle,
    Sparkles,
    Download
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * MARKET SCULPTOR: Merchant & Portfolio Editor
 * 
 * Allows users to define port economies, trade routes, 
 * and geopolitical tension tiers for 'Almagest Merchant' simulations.
 */

export const MarketSculptor: React.FC = () => {
    const { manifest, currentProjectSlug } = useGameStore();
    const ports = manifest?.locations || [];
    const markets = manifest?.markets || {};

    const [selectedPort, setSelectedPort] = useState(ports[0]?.id || '');
    const [marketAnalysis, setMarketAnalysis] = useState<string | null>(null);
    const [isSeeding, setIsSeeding] = useState(false);

    const handleAISeeding = async () => {
        if (!selectedPort) return;
        setIsSeeding(true);
        const portData = ports.find(p => p.id === selectedPort);
        const prompt = `### SYSTEM: You are the Scholar of Levantine Trade.
Analyze the economic potential and scarcity requirements for the port of ${portData?.name}.
Description: ${portData?.description}

Suggest alchemical scarcity tiers and price fluctuations based on the historical importance of the region.

### ASSESSMENT:`;
        
        const response = await (window as any).almagest.queryLLM({ 
            provider: 'Resident Scholar (Local)', 
            prompt 
        });
        setMarketAnalysis(response);
        setIsSeeding(false);
    };

    const handleExportMarket = async () => {
        const report = `# ALMAGEST MARKET DATA: ${selectedPort}
        
## Project: ${currentProjectSlug}
## Port: ${selectedPort}
## Economic Indicators:
- Trade Volume: High
- Broker Presence: Scant
- Geopolitical Tension: 4.2

## Asset Pricing (Golden Ducats):
${Object.entries(markets[selectedPort] || {}).map(([id, price]) => `- ${id}: ${price}`).join('\n')}

---
Exported for external economic modeling.
`;
        await (window as any).almagest.exportToDesktop({
            filename: `${selectedPort}_market_data_${Date.now()}.md`,
            content: report
        });
        alert('Market Data (.md) exported to Desktop.');
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Port Registry */}
            <div className="w-80 border-r border-zinc-900 bg-zinc-950/40 p-8 flex flex-col gap-8">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Fleet Network</span>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Locations</h2>
                    <p className="text-[9px] text-zinc-600 font-serif italic mt-4 leading-relaxed">
                        "Each port acts as a node in the Levantine trade network. Configure scarcity to drive the piracy simulation and market arbitrage."
                    </p>
                </header>

                <div className="flex flex-col gap-3">
                    {ports.map(port => (
                        <button 
                            key={port.id}
                            onClick={() => setSelectedPort(port.id)}
                            className={`p-4 border text-left transition-all flex items-center justify-between group ${selectedPort === port.id ? 'bg-zinc-100 border-white' : 'bg-transparent border-zinc-800 hover:border-zinc-500'}`}
                        >
                            <div className="flex items-center gap-4">
                                <Anchor size={16} className={selectedPort === port.id ? 'text-zinc-950' : 'text-zinc-600'} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedPort === port.id ? 'text-zinc-950' : 'text-white'}`}>{port.name}</span>
                            </div>
                            <Activity size={12} className={selectedPort === port.id ? 'text-zinc-400' : 'text-zinc-800'} />
                        </button>
                    ))}
                    <button className="p-4 border border-dashed border-zinc-900 text-[9px] font-black uppercase text-zinc-700 hover:text-white hover:border-zinc-700 transition-all text-center">
                        + Discover Port
                    </button>
                </div>
            </div>

            {/* Middle: Economic Landscape */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col gap-12 overflow-y-auto">
                 <header className="flex justify-between items-end border-b border-zinc-900 pb-8">
                    <div>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">Economic Atlas</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-2 italic">Port_Intelligence: {selectedPort || 'NONE'}</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleAISeeding}
                            disabled={isSeeding}
                            className="px-6 py-3 border border-zinc-700 text-[10px] font-black uppercase tracking-widest text-gold hover:bg-gold hover:text-zinc-950 transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                            <Sparkles size={14} className={isSeeding ? 'animate-spin' : ''} /> {isSeeding ? 'Analyzing Routes...' : 'AI Seed'}
                        </button>
                        <button 
                            onClick={handleExportMarket}
                            className="px-6 py-3 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3"
                        >
                            <Download size={14} /> Export Data (.md)
                        </button>
                    </div>
                </header>

                {marketAnalysis && (
                    <div className="bg-gold/5 border border-gold/20 p-8 space-y-4">
                         <div className="flex items-center gap-3">
                              <Sparkles size={14} className="text-gold" />
                              <span className="text-[10px] font-black uppercase text-gold">Scholarly Account</span>
                         </div>
                         <p className="text-[10px] text-zinc-400 font-serif leading-relaxed italic">
                              {marketAnalysis}
                         </p>
                    </div>
                )}

                {selectedPort ? (
                    <div className="space-y-12 pb-24">
                        {/* Market Pulse */}
                        <section className="grid grid-cols-3 gap-8">
                             <div className="p-8 bg-zinc-900/50 border border-zinc-800 flex flex-col items-center gap-4">
                                  <TrendingUp className="text-gold" />
                                  <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Trade Volume</span>
                                  <span className="text-2xl font-black text-white italic">High</span>
                             </div>
                             <div className="p-8 bg-zinc-900/50 border border-zinc-800 flex flex-col items-center gap-4">
                                  <Users className="text-blue-400" />
                                  <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Broker Presence</span>
                                  <span className="text-2xl font-black text-white italic">Scant</span>
                             </div>
                             <div className="p-8 bg-zinc-900/50 border border-zinc-800 flex flex-col items-center gap-4">
                                  <AlertCircle className="text-red-500" />
                                  <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Regional Tension</span>
                                  <span className="text-2xl font-black text-white italic">4.2</span>
                             </div>
                        </section>

                        {/* Local Scarcity Editor */}
                        <section className="space-y-6">
                             <h4 className="text-xs font-black uppercase text-zinc-400 tracking-widest border-l-2 border-gold pl-4 italic">Alchemical Scarcity Rates</h4>
                             <div className="grid grid-cols-1 gap-2">
                                  {Object.entries(markets[selectedPort] || {}).map(([id, price]) => (
                                      <div key={id} className="p-4 bg-zinc-950 border border-zinc-900 flex items-center justify-between group hover:border-gold transition-all">
                                           <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-gold" />
                                                <span className="text-[10px] font-black uppercase text-white tracking-tighter">{id}</span>
                                           </div>
                                           <div className="flex items-center gap-6">
                                                <input 
                                                     type="number" 
                                                     value={price as number} 
                                                     className="w-24 bg-zinc-900 border border-zinc-800 p-2 text-[10px] font-mono text-gold focus:outline-none focus:border-gold"
                                                />
                                                <span className="text-[9px] font-mono text-zinc-700 italic">GOLDEN_DUCATS</span>
                                           </div>
                                      </div>
                                  ))}
                                  {Object.keys(markets[selectedPort] || {}).length === 0 && (
                                      <div className="p-8 border border-dashed border-zinc-900 text-center text-zinc-700 italic text-[10px] uppercase tracking-widest">
                                           No market data mapped for this sector.
                                      </div>
                                  )}
                             </div>
                        </section>

                        {/* Route mapping visualization placeholder */}
                        <section className="h-64 border border-zinc-900 bg-zinc-950 flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
                             <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                  <Map size={300} className="w-full h-full text-gold -translate-y-12" />
                             </div>
                             <Globe size={48} className="text-zinc-900 relative z-10 animate-pulse" />
                             <p className="text-[9px] text-zinc-800 uppercase font-black tracking-[0.5em] relative z-10">Vector Integration Pending</p>
                        </section>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Globe size={64} className="text-zinc-900 mb-8" />
                        <h4 className="text-xl font-black text-zinc-800 uppercase tracking-widest italic">Select Port of Origin</h4>
                        <p className="text-[10px] text-zinc-700 font-serif italic mt-4">"Navigation requires a destination."</p>
                    </div>
                )}
            </div>
        </div>
    );
};
