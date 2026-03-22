import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Database, 
    Settings, 
    Save, 
    Play, 
    Monitor
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';
import { EncounterEditor } from './EncounterEditor';
import { DigbyData } from './DigbyData';
import { StageEditor } from './StageEditor';
// import { VerificationHarness } from './VerificationHarness';
import { PortEditor } from './PortEditor';
import { AssetPainter } from './AssetPainter';

export const ConstructionKit: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'encounters' | 'data' | 'staging' | 'verify' | 'ports' | 'assets'>('encounters');
    const { setView } = useGameStore();

    return (
        <div className="flex-1 flex flex-col h-full bg-zinc-950 text-zinc-100 font-mono">
            {/* Header / Sub-Nav */}
            <header className="h-20 bg-zinc-900 border-b border-zinc-800 flex items-center px-12 justify-between shadow-2xl">
                <div className="flex items-center gap-12">
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.4em] mb-1 italic">Project Root</span>
                      <h3 className="text-xl font-bold italic tracking-tighter text-zinc-100 flex items-center gap-3">
                         <Settings size={20} className="text-zinc-600" />
                         ALMAGEST.ACK / v0.1
                      </h3>
                   </div>

                   <nav className="flex gap-1 bg-zinc-950 p-1 rounded-sm border border-zinc-800">
                      <button 
                        onClick={() => setActiveTab('encounters')}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeTab === 'encounters' ? 'bg-zinc-800 text-gold shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
                      >
                         [W] Writes
                      </button>
                      <button 
                        onClick={() => setActiveTab('data')}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeTab === 'data' ? 'bg-zinc-800 text-gold shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
                      >
                         [D] Data
                      </button>
                      <button 
                        onClick={() => setActiveTab('staging')}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeTab === 'staging' ? 'bg-zinc-800 text-gold shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
                      >
                         [S] Staging
                      </button>
                      <button 
                        onClick={() => setActiveTab('verify')}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeTab === 'verify' ? 'bg-zinc-800 text-gold shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
                      >
                         [V] Verify
                      </button>
                      <button 
                        onClick={() => setActiveTab('ports')}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeTab === 'ports' ? 'bg-zinc-800 text-gold shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
                      >
                         [P] Ports
                      </button>
                      <button 
                        onClick={() => setActiveTab('assets')}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeTab === 'assets' ? 'bg-zinc-800 text-gold shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
                      >
                         [A] Assets
                      </button>
                   </nav>
                </div>

                <div className="flex items-center gap-6">
                   <button className="flex items-center gap-2 px-6 py-2 border border-zinc-700 hover:border-zinc-100 transition-all text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
                      <Save size={14} /> Commit Changes
                   </button>
                   <button 
                     onClick={() => setView('nav')}
                     className="flex items-center gap-2 px-6 py-2 bg-gold text-zinc-950 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                   >
                      <Play size={14} /> Live Simulation
                   </button>
                </div>
            </header>

            {/* Editor Workspace */}
            <main className="flex-1 flex overflow-hidden">
                <AnimatePresence mode="wait">
                   <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex overflow-hidden"
                   >
                      {activeTab === 'encounters' && <EncounterEditor />}
                      {activeTab === 'data' && <DigbyData />}
                      {activeTab === 'staging' && <StageEditor />}
                      {/* {activeTab === 'verify' && <VerificationHarness />} */}
                      {activeTab === 'ports' && <PortEditor />}
                      {activeTab === 'assets' && <AssetPainter />}
                   </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer / Console */}
            <footer className="h-10 bg-zinc-900 border-t border-zinc-800 flex items-center px-12 justify-between text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
               <div className="flex items-center gap-8">
                  <span className="flex items-center gap-2 italic"><Database size={12} /> db_connected: almagest_dev_03</span>
                  <span className="flex items-center gap-2 italic"><Monitor size={12} /> staging_engine: active (32px_grid)</span>
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-zinc-500">Working Directory: /src/components/laboratory/</span>
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
               </div>
            </footer>
        </div>
    );
};
