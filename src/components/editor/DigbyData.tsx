import React from 'react';
import { Database, Zap } from 'lucide-react';

export const DigbyData: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-24 text-center">
            <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 mb-8 rounded-sm shadow-2xl">
                <Database size={48} />
            </div>
            <h3 className="text-3xl font-black italic tracking-tighter text-zinc-100 mb-4 uppercase">Ontological Archive / Ingest</h3>
            <p className="max-w-md text-zinc-500 text-sm font-light leading-relaxed mb-12 italic">
               "Automated ingestion of PDF/Source research via KDSC compiler is currently handled at the CLI level."
            </p>
            <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-2 px-6 py-2 bg-zinc-900 border border-zinc-700 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                     <Zap size={14} className="text-zinc-700" /> CLI Compiler: Active (KDSC_EMIT_v1)
                 </div>
            </div>
        </div>
    );
};
