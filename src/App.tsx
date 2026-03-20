import React from 'react';
import { Ship, Beaker, Scroll, Zap, Database, Settings, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './state/gameStore';
import { Laboratory } from './components/laboratory/Laboratory';
import { Journal } from './components/interface/Journal';
import { Logbook } from './components/interface/Logbook';
import { NavMap } from './components/interface/NavMap';
import { ConstructionKit } from './components/editor/ConstructionKit';
import { ManuscriptView } from './components/philology/ManuscriptView';
import { SceneRunner } from './components/interface/SceneRunner';
import { InputManager } from './components/interface/InputManager';

function App() {
  const { 
    currentDay, location: locationId, stats, currentEncounter, setView, currentView,
    makeChoice, currentScene, previousView, manifest 
  } = useGameStore();

  const currentLocationName = manifest.locations.find(l => l.id === locationId)?.name || locationId;

  if (currentView === 'intro') {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-8 bg-[#f4f1ea] bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]">
        <InputManager />
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-3xl w-full bg-white p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-zinc-950 relative rounded-sm z-10 text-center"
        >
          <h1 className="text-7xl font-serif italic mb-2 tracking-tighter text-zinc-950">Almagest</h1>
          <p className="text-amber-800 font-display font-black text-[10px] tracking-[0.5em] mb-12 uppercase opacity-60">A Kenelm Digby Simulation</p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-12" />
          
          <div className="space-y-4">
             <button onClick={() => setView('nav')} className="w-full py-6 border-4 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all font-black text-2xl uppercase tracking-tighter shadow-xl transform active:scale-95">
                Begin Voyage [A]
             </button>
             <button onClick={() => setView('editor')} className="w-full py-3 border border-zinc-300 text-zinc-400 hover:text-zinc-900 transition-all text-xs font-bold uppercase tracking-widest hover:border-zinc-900">
                Access Construction Kit [E]
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentView === 'staging' && currentScene) {
        return <SceneRunner script={currentScene} onComplete={() => setView(previousView)} />;
    }

    switch (currentView) {
      case 'nav': return <NavMap />;
      case 'lab': return <Laboratory />;
      case 'journal': return <Journal />;
      case 'log': return <Logbook />;
      case 'editor': return <ConstructionKit />;
      case 'philology': return <ManuscriptView />;
      default: return <NavMap />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 font-serif">
      <InputManager />
      
      {/* Global Header */}
      <header className="bg-zinc-950 text-white p-6 shadow-2xl z-40 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-8">
           <div onClick={() => setView('intro')} className="cursor-pointer group">
              <h2 className="text-2xl italic tracking-tighter group-hover:text-amber-500 transition-colors">Almagest</h2>
           </div>
           
           <div className="h-8 w-px bg-zinc-700 mx-4" />
           
           <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-zinc-500 tracking-[0.2em] mb-0.5">Mediterranean Orbit</span>
              <span className="text-sm font-mono font-bold text-amber-500">{currentLocationName} • DAY {currentDay}</span>
           </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-3 mb-1">
                 <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em]">Vital Spirit</span>
                 <span className="text-xs font-mono font-bold text-amber-500">{Math.round(stats.spirit)}%</span>
              </div>
              <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.spirit}%` }}
                    className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                 />
              </div>
           </div>

           <div className="flex gap-8 border-l border-zinc-800 pl-10">
              <div className="flex flex-col items-center">
                 <span className="text-amber-500 font-mono text-xl font-bold">{stats.knowledge}</span>
                 <span className="text-[8px] uppercase font-black text-zinc-500 tracking-widest text-center">Knowledge</span>
              </div>
              <div className="flex flex-col items-center">
                 <span className="text-white font-mono text-xl font-bold">{stats.stigma}%</span>
                 <span className="text-[8px] uppercase font-black text-zinc-500 tracking-widest text-center">Stigma</span>
              </div>
           </div>
        </div>
      </header>

      {/* Main View Port */}
      <main className="flex-1 relative flex flex-col overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Narrative Encounter Overlay */}
        <AnimatePresence>
          {currentEncounter && currentView !== 'staging' && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-x-0 bottom-12 flex justify-center z-50 px-12"
            >
              <div className="w-full max-w-5xl bg-white border-4 border-zinc-950 p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-sm flex gap-12">
                 <div className="flex-1">
                    <header className="mb-6 border-b border-zinc-100 pb-4 flex justify-between items-end">
                       <div>
                          <p className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1">Historical Incident</p>
                          <h3 className="text-4xl italic uppercase tracking-tight">{currentEncounter.id.replace('_', ' ')}</h3>
                       </div>
                       <Zap className="text-amber-500 mb-1" size={32} />
                    </header>
                    <p className="text-2xl leading-relaxed text-zinc-800 italic mb-10 pr-12">
                       "{currentEncounter.description}"
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                       {currentEncounter.choices.map((choice, i) => (
                          <button 
                            key={i}
                            onClick={() => makeChoice(i)}
                            className="w-full text-left p-6 border-2 border-zinc-100 hover:border-zinc-950 hover:bg-zinc-50 transition-all group flex items-start gap-4 relative overflow-hidden"
                          >
                             <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                             <span className="w-8 h-8 rounded-full border-2 border-zinc-200 flex items-center justify-center font-mono font-bold text-sm group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                                {String.fromCharCode(65 + i)}
                             </span>
                             <span className="flex-1 font-serif text-xl italic">{choice.text}</span>
                          </button>
                       ))}
                    </div>
                 </div>
                 
                 <aside className="w-72 bg-zinc-50 p-8 border border-zinc-100 flex flex-col justify-between italic text-center">
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-200 pb-2 flex items-center gap-2 justify-center">
                          <Scroll size={14} /> Scholarly Risk
                       </h4>
                       <p className="text-xs leading-relaxed text-zinc-500">
                          "Each decision is a variant in the manuscript of my return. Some lead to the court, others to the gallows."
                       </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-zinc-200 text-amber-600 font-mono text-[10px] font-bold space-y-2 uppercase tracking-widest">
                       <p className="text-[9px] uppercase font-black text-zinc-400 tracking-widest mb-4">Potential Impact:</p>
                       <div className="flex justify-between"><span>HONOR</span> <span>+/- {currentEncounter.stakes?.honor || 0}</span></div>
                       <div className="flex justify-between"><span>WEALTH</span> <span>+/- {currentEncounter.stakes?.wealth || 0}</span></div>
                    </div>
                 </aside>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Nav Footer */}
      <footer className="bg-zinc-950 text-zinc-500 p-3 flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.3em] font-mono border-t border-zinc-800">
        <button onClick={() => setView('nav')} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'nav' ? 'text-amber-500' : ''}`}>
           <Ship size={14} /> [A] Naval
        </button>
        <button onClick={() => setView('lab')} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'lab' ? 'text-amber-500' : ''}`}>
           <Beaker size={14} /> [C] Lab
        </button>
        <button onClick={() => setView('philology')} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'philology' ? 'text-amber-500' : ''}`}>
           <BookOpen size={14} /> [P] Philology
        </button>
        <button onClick={() => setView('journal')} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'journal' ? 'text-amber-500' : ''}`}>
           <Scroll size={14} /> [J] Journal
        </button>
        <button onClick={() => setView('log')} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'log' ? 'text-amber-500' : ''}`}>
           <Database size={14} /> [V] Log
        </button>
        <button onClick={() => setView('editor')} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'editor' ? 'text-amber-500' : ''}`}>
           <Settings size={14} /> [E] ACK
        </button>
      </footer>
    </div>
  );
}

export default App;
