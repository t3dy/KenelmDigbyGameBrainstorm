import React from 'react';
import { useGameStore } from '../../state/gameStore';
import { Scroll, Terminal } from 'lucide-react';

export const AlmagestLog: React.FC = () => {
    const { log } = useGameStore();

    return (
        <div className="flex-1 bg-zinc-950 p-12 overflow-y-auto font-mono text-zinc-400">
            <header className="mb-8 border-b border-zinc-900 pb-4 flex items-center gap-4">
                <Terminal size={20} className="text-amber-500" />
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-100">Voyage Manifest / Chronological Log</h3>
            </header>

            <div className="space-y-4">
                {log.length > 0 ? log.map((entry, i) => (
                    <div key={i} className="flex gap-4 group">
                        <span className="text-zinc-700 select-none">[{i.toString().padStart(3, '0')}]</span>
                        <p className="group-hover:text-zinc-100 transition-colors uppercase text-[10px] tracking-widest">{entry}</p>
                    </div>
                )) : (
                    <div className="p-8 border-2 border-dashed border-zinc-900 text-center opacity-30 italic">
                       No entries recorded. The Mediterranean is silent today.
                    </div>
                )}
            </div>
            
            <div className="mt-12 opacity-10 flex flex-col items-center">
                 <Scroll size={64} />
                 <span className="text-[8px] mt-2">ALMAGEST LOG_SYS V1.0</span>
            </div>
        </div>
    );
};
