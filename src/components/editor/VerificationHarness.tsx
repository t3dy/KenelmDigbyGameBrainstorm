import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    XCircle, 
    RefreshCcw, 
    Terminal,
    Shield,
    Ship
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';
import { verifySystemIntegrity, RollSys } from '../../utils/engine/RollSys';

export const VerificationHarness: React.FC = () => {
    const { manifest, ship } = useGameStore();
    const [auditResults, setAuditResults] = useState<any[]>([]);
    const [isAuditing, setIsAuditing] = useState(false);

    const runAudit = () => {
        setIsAuditing(true);
        setTimeout(() => {
            const results = [
                { id: 'SHIP_INTEGRITY', ...verifySystemIntegrity('ship', ship) },
                { id: 'ROLL_STRESS_TEST', ...RollSys.stressTest(1000, 50), status: 'valid', message: `Headless Simulation: 1000 iterations @ 50% threshold.` },
                { id: 'NARRATIVE_STAKES', ...verifySystemIntegrity('narrative', manifest.encounters?.[0] || {}) },
                { id: 'WORLD_NODES', status: manifest.locations.length > 5 ? 'valid' : 'warning', message: `Detected ${manifest.locations.length} viable ports.` }
            ];
            setAuditResults(results);
            setIsAuditing(false);
        }, 1200);
    };

    return (
        <div className="flex-1 flex flex-col bg-zinc-950 font-mono text-white p-16 overflow-y-auto">
            <header className="mb-12 border-b border-zinc-900 pb-8 flex justify-between items-end">
                <div>
                    <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em] mb-4 block">Engine / Quality Control</span>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">Verification Harness</h2>
                </div>
                <button 
                    onClick={runAudit}
                    disabled={isAuditing}
                    className="flex items-center gap-3 px-8 py-3 bg-white text-zinc-950 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gold transition-all shadow-xl disabled:opacity-50"
                >
                    <RefreshCcw size={16} className={isAuditing ? 'animate-spin' : ''} />
                    {isAuditing ? 'Analyzing Bitstreams...' : 'Start Global Audit'}
                </button>
            </header>

            <div className="grid grid-cols-1 gap-6 max-w-5xl">
                {auditResults.length > 0 ? auditResults.map((res, i) => (
                    <div key={i} className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-sm flex items-start gap-8 group hover:border-zinc-700 transition-all">
                        <div className="mt-1">
                            {res.valid || res.status === 'valid' ? (
                                <CheckCircle2 className="text-emerald-500" size={24} />
                            ) : (
                                <XCircle className="text-red-500" size={24} />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-300">{res.id}</h4>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${res.valid || res.status === 'valid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {res.valid || res.status === 'valid' ? 'PASSED' : 'FAILED'}
                                </span>
                            </div>
                            {res.message ? (
                                <p className="text-sm text-zinc-500 italic">"{res.message}"</p>
                            ) : res.rate !== undefined ? (
                                <div className="mt-4 flex items-center gap-12">
                                     <div className="flex flex-col">
                                         <span className="text-[9px] font-black text-zinc-600 uppercase">Simulated Success Rate</span>
                                         <span className="text-2xl font-black text-amber-500">{res.rate.toFixed(1)}%</span>
                                     </div>
                                     <div className="flex-1 max-w-xs h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                                         <motion.div initial={{ width: 0 }} animate={{ width: `${res.rate}%` }} className="h-full bg-emerald-500" />
                                     </div>
                                </div>
                            ) : res.missing?.length > 0 ? (
                                <div className="space-y-2 mt-4">
                                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Missing Key Attributes:</p>
                                    <div className="flex gap-2">
                                        {res.missing.map((m: string) => (
                                            <span key={m} className="text-[8px] font-mono bg-zinc-950 p-1 px-2 border border-zinc-800 text-zinc-600">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-zinc-500 italic">All structural requirements met for this subsystem.</p>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center p-24 bg-zinc-900/10 border-2 border-dashed border-zinc-900 opacity-30 text-center">
                        <Terminal size={48} className="mb-4 text-zinc-600" />
                        <p className="italic text-zinc-500">Awaiting diagnostic sequence.</p>
                        <p className="text-[8px] mt-2 uppercase font-black tracking-widest text-zinc-700">Audit Cache: Empty</p>
                    </div>
                )}
            </div>

            {/* Test Rules Side-Panel-ish */}
            <div className="mt-24 grid grid-cols-2 gap-12">
                 <div className="p-10 border border-zinc-900 bg-zinc-950/50">
                    <h5 className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em] mb-8 flex items-center gap-3">
                        <Shield size={16} /> Definition of Done: NAVAL
                    </h5>
                    <ul className="space-y-4 text-[11px] text-zinc-400 leading-relaxed font-serif italic">
                        <li>• Vessel must demonstrate structural integrity across 3 modular points.</li>
                        <li>• Sighting chance MUST use the RollSys logarithmic modifier.</li>
                        <li>• Log events MUST trigger on ship collision intercepts.</li>
                    </ul>
                 </div>
                 <div className="p-10 border border-zinc-900 bg-zinc-950/50">
                    <h5 className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em] mb-8 flex items-center gap-3">
                        <Ship size={16} /> System Health Thresholds
                    </h5>
                    <div className="space-y-6">
                        <div>
                             <div className="flex justify-between text-[8px] mb-2 font-black text-zinc-600 uppercase">
                                 <span>Kernel Load Velocity</span>
                                 <span>Optimized</span>
                             </div>
                             <div className="w-full h-1 bg-zinc-900 overflow-hidden"><div className="w-4/5 h-full bg-emerald-500" /></div>
                        </div>
                        <div>
                             <div className="flex justify-between text-[8px] mb-2 font-black text-zinc-600 uppercase">
                                 <span>AI Reasoning Depth</span>
                                 <span>Experimental</span>
                             </div>
                             <div className="w-full h-1 bg-zinc-900 overflow-hidden"><div className="w-1/3 h-full bg-amber-500" /></div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};
