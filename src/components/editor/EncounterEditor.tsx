import React, { useState } from 'react';
import { 
    MessageSquare, 
    Plus, 
    Trash2, 
    ChevronRight, 
    Shield, 
    Coins, 
    History,
    Edit3,
    Eye,
    Ship,
    Save,
    Zap,
    Database,
    HelpCircle,
    Book
} from 'lucide-react';
import type { Encounter } from '../../data/schema';
import { useGameStore } from '../../state/gameStore';

export const EncounterEditor: React.FC = () => {
    const { manifest, setEncounter, setView, saveEncounters } = useGameStore();
    const [encounters, setEncounters] = useState<Encounter[]>(manifest.encounters as any || []);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'general' | 'logic'>('general');

    const selected = encounters.find(e => e.id === selectedId);

    const updateSelected = (updates: Partial<Encounter>) => {
        if (!selectedId) return;
        setEncounters(prev => prev.map(e => e.id === selectedId ? { ...e, ...updates } : e));
    };

    const handleSaveManifest = () => {
        saveEncounters(encounters);
        alert("Manifest Encounters Updated.");
    };

    const addEncounter = () => {
        const id = `new_incident_${Date.now()}`;
        const newEnc: Encounter = {
            id,
            title: "Untitled Historical Incident",
            location: "scanderoon",
            date: "1628-01-01",
            description: "Describe the situational crisis...",
            type: 'naval',
            stakes: { honor: 0, wealth: 0, knowledge: 0 },
            choices: [{ text: "Proceed with caution", consequence: "The voyage continues..." }]
        };
        setEncounters(prev => [...prev, newEnc]);
        setSelectedId(id);
    };

    const deleteEncounter = (id: string) => {
        setEncounters(prev => prev.filter(e => e.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const handlePreview = () => {
        if (!selected) return;
        // In a real app we'd save to disk first but here we just trigger state
        setEncounter(selected.id);
        setView('nav');
    };

    return (
        <div className="flex-1 flex overflow-hidden bg-zinc-950 font-mono">
            {/* List Sidebar */}
            <aside className="w-80 border-r border-zinc-900 flex flex-col bg-zinc-950/50">
                <header className="p-6 border-b border-zinc-900 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Incident Registry</span>
                    <button onClick={addEncounter} className="p-2 bg-zinc-900 border border-zinc-800 hover:border-gold-dark text-gold rounded-sm transition-all">
                        <Plus size={14} />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto">
                    {encounters.map(enc => (
                        <div 
                            key={enc.id} 
                            onClick={() => setSelectedId(enc.id)}
                            className={`p-6 border-b border-zinc-900 cursor-pointer transition-all group ${selectedId === enc.id ? 'bg-zinc-900 border-l-2 border-l-gold shadow-2xl' : 'hover:bg-zinc-900/30'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">{enc.type}</span>
                                <Trash2 
                                    size={12} 
                                    className="text-zinc-800 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" 
                                    onClick={(e) => { e.stopPropagation(); deleteEncounter(enc.id); }}
                                />
                            </div>
                            <h4 className={`text-[11px] font-bold uppercase tracking-widest leading-none ${selectedId === enc.id ? 'text-white' : 'text-zinc-500'}`}>{enc.title}</h4>
                            <div className="mt-3 flex gap-4 text-[8px] text-zinc-700 font-black">
                                <span className="flex items-center gap-1"><Shield size={8}/> {enc.stakes.honor}</span>
                                <span className="flex items-center gap-1"><Coins size={8}/> {enc.stakes.wealth}</span>
                                <span className="flex items-center gap-1"><History size={8}/> {enc.stakes.knowledge}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-zinc-900">
                    <button 
                        onClick={handleSaveManifest}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all rounded-sm shadow-xl"
                    >
                        <Save size={14} /> Commit Changes
                    </button>
                </div>
            </aside>

            {/* Main Form Area */}
            {selected ? (
                <main className="flex-1 overflow-y-auto p-16 bg-[#080808]">
                    <div className="max-w-4xl mx-auto">
                        <header className="flex justify-between items-end mb-16 border-b border-zinc-900 pb-12">
                            <div>
                                <input 
                                    value={selected.title}
                                    onChange={(e) => updateSelected({ title: e.target.value })}
                                    className="bg-transparent border-none text-5xl font-black italic tracking-tighter text-white uppercase focus:ring-0 w-full mb-4 p-0 outline-none"
                                    placeholder="Incident Title"
                                />
                                <div className="flex gap-8 items-center text-zinc-500">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Type:</span>
                                        <select 
                                            value={selected.type}
                                            onChange={(e) => updateSelected({ type: e.target.value as any })}
                                            className="bg-zinc-950 border border-zinc-800 text-[10px] uppercase font-bold text-zinc-300 p-2"
                                        >
                                            <option value="naval">Naval Crisis</option>
                                            <option value="alchemy">Alchemical Breakthrough</option>
                                            <option value="diplomatic">Political Intrigue</option>
                                            <option value="romance">Courteous Romance</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">ID:</span>
                                        <span className="text-[10px] font-mono font-bold text-gold">{selected.id}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-6">
                                <nav className="flex bg-zinc-950 p-1 border border-zinc-900 rounded-sm">
                                    <button 
                                        onClick={() => setActiveSection('general')}
                                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'general' ? 'bg-zinc-800 text-gold' : 'text-zinc-600 hover:text-zinc-300'}`}
                                    >
                                        General
                                    </button>
                                    <button 
                                        onClick={() => setActiveSection('logic')}
                                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'logic' ? 'bg-zinc-800 text-gold' : 'text-zinc-600 hover:text-zinc-300'}`}
                                    >
                                        Logic/FTL
                                    </button>
                                </nav>
                                <button onClick={handlePreview} className="flex items-center gap-3 px-8 py-3 bg-zinc-100 text-zinc-950 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gold transition-all shadow-xl">
                                    <Eye size={16} /> Preview Event
                                </button>
                            </div>
                        </header>

                        {activeSection === 'general' ? (
                            <div className="grid grid-cols-1 gap-12">
                                <section>
                                    <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-6 flex items-center gap-3">
                                        <MessageSquare size={14} className="text-zinc-800" /> Narrative Exposition
                                    </h5>
                                    <textarea 
                                        value={selected.description}
                                        onChange={(e) => updateSelected({ description: e.target.value })}
                                        className="w-full bg-zinc-950/50 border border-zinc-900 p-8 text-xl font-serif italic text-zinc-300 min-h-[150px] focus:border-zinc-500 transition-all outline-none leading-relaxed"
                                        placeholder="Once upon the Mediterranean..."
                                    />
                                </section>

                                <section className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4">
                                        {selected.assetId ? (
                                            <div className="flex items-center gap-2 text-[8px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-3 py-1 border border-emerald-500/30">
                                                <Shield size={10} /> Validated_Asset
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-[8px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 border border-amber-500/30">
                                                <Zap size={10} /> Specified_Lore_Only
                                            </div>
                                        )}
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-4 flex items-center gap-3">
                                        <Database size={14} className="text-zinc-800" /> Asset Layer Mapping
                                    </h5>
                                    <div className="flex gap-4">
                                        <input 
                                            value={selected.assetId || ""}
                                            onChange={(e) => updateSelected({ assetId: e.target.value })}
                                            className="flex-1 bg-zinc-950 border border-zinc-800 p-4 text-xs font-mono text-zinc-400 focus:border-gold transition-all outline-none"
                                            placeholder="Enter Generalized Asset ID (e.g. social_rumor_cascade)..."
                                        />
                                        <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all">
                                            Registry Lookup
                                        </button>
                                    </div>
                                    <p className="mt-4 text-[9px] text-zinc-600 italic tracking-widest uppercase font-black">
                                       Governance Rule: No lore-beasts. Abstract into Systemic Machinery.
                                    </p>
                                </section>

                                <section className="p-8 bg-zinc-900/10 border border-zinc-900 rounded-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4">
                                        {selected.provenance ? (
                                            <div className="flex items-center gap-2 text-[8px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/10 px-3 py-1 border border-blue-500/30">
                                                <History size={10} /> Scholarly_Tethered
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-[8px] font-black uppercase text-zinc-600 tracking-widest bg-zinc-500/5 px-3 py-1 border border-zinc-500/10">
                                                <HelpCircle size={10} /> Unprovenanced
                                            </div>
                                        )}
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-4 flex items-center gap-3">
                                        <Book size={14} className="text-zinc-800" /> Source Note Provenance
                                    </h5>
                                    <div className="flex gap-4">
                                        <input 
                                            value={selected.provenance || ""}
                                            onChange={(e) => updateSelected({ provenance: e.target.value })}
                                            className="flex-1 bg-zinc-950 border border-zinc-800 p-4 text-xs font-mono text-zinc-400 focus:border-blue-500 transition-all outline-none"
                                            placeholder="Enter Source Note ID (e.g. SPIRIT_VISION_1622)..."
                                        />
                                        <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all">
                                            Audit Links
                                        </button>
                                    </div>
                                    
                                    <div className="mt-12 grid grid-cols-2 gap-8">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-zinc-700 tracking-widest mb-3 block">Structural Type</label>
                                            <select 
                                                value={selected.type}
                                                onChange={(e) => updateSelected({ type: e.target.value as any })}
                                                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs font-mono text-zinc-400 focus:border-gold transition-all outline-none appearance-none"
                                            >
                                                <option value="naval">Naval/Tactical</option>
                                                <option value="alchemy">Alchemy/Epistemic</option>
                                                <option value="diplomatic">Diplomatic/Social</option>
                                                <option value="romance">Drama/Romance</option>
                                                <option value="scholarly">Scholarly/Audit</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-zinc-700 tracking-widest mb-3 block">Temporal Anchor</label>
                                            <input 
                                                type="date"
                                                value={selected.date}
                                                onChange={(e) => updateSelected({ date: e.target.value })}
                                                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs font-mono text-zinc-400 focus:border-gold transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="grid grid-cols-3 gap-8">
                                    {[
                                        { key: 'honor', label: 'Honor Impact', icon: <Shield size={14}/> },
                                        { key: 'wealth', label: 'Wealth Impact', icon: <Coins size={14}/> },
                                        { key: 'knowledge', label: 'Knowledge Impact', icon: <History size={14}/> }
                                    ].map(stake => (
                                        <div key={stake.key} className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                                            <div className="flex items-center gap-3 mb-4 text-zinc-500">
                                                {stake.icon}
                                                <span className="text-[9px] font-black uppercase tracking-widest">{stake.label}</span>
                                            </div>
                                            <input 
                                                type="number"
                                                value={selected.stakes[stake.key as keyof typeof selected.stakes]}
                                                onChange={(e) => updateSelected({ 
                                                    stakes: { ...selected.stakes, [stake.key]: parseInt(e.target.value) }
                                                })}
                                                className="w-full bg-zinc-950 border border-zinc-900 text-2xl font-mono text-white p-3 focus:border-gold transition-all outline-none"
                                            />
                                        </div>
                                    ))}
                                </section>

                                <section>
                                    <header className="flex justify-between items-center mb-6">
                                        <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] flex items-center gap-3">
                                            <ChevronRight size={14} className="text-zinc-800" /> Outcome Branches
                                        </h5>
                                        <button 
                                            onClick={() => updateSelected({ choices: [...selected.choices, { text: "New Choice", consequence: "Describe the outcome..." }] })}
                                            className="text-[9px] font-black uppercase text-gold hover:text-white transition-all flex items-center gap-2"
                                        >
                                            <Plus size={12} /> Add Path
                                        </button>
                                    </header>
                                    
                                    <div className="space-y-4">
                                        {selected.choices.map((choice, idx) => (
                                            <div key={idx} className="p-8 bg-zinc-900/20 border border-zinc-900 rounded-sm group relative">
                                                <button 
                                                    onClick={() => updateSelected({ choices: selected.choices.filter((_, i) => i !== idx) })}
                                                    className="absolute top-4 right-4 p-2 text-zinc-800 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                                <div className="grid grid-cols-1 gap-6">
                                                    <div>
                                                        <span className="text-[8px] font-black uppercase text-zinc-700 mb-2 block tracking-widest">Player Choice Text</span>
                                                        <input 
                                                            value={choice.text}
                                                            onChange={(e) => {
                                                                const newChoices = [...selected.choices];
                                                                newChoices[idx].text = e.target.value;
                                                                updateSelected({ choices: newChoices });
                                                            }}
                                                            className="w-full bg-zinc-950 border border-zinc-900 text-sm font-bold uppercase text-zinc-100 p-4 focus:border-zinc-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[8px] font-black uppercase text-zinc-700 mb-2 block tracking-widest">Historical Consequence</span>
                                                        <textarea 
                                                            value={choice.consequence}
                                                            onChange={(e) => {
                                                                const newChoices = [...selected.choices];
                                                                newChoices[idx].consequence = e.target.value;
                                                                updateSelected({ choices: newChoices });
                                                            }}
                                                            className="w-full bg-zinc-950 border border-zinc-900 text-xs italic text-zinc-400 p-4 focus:border-zinc-500 transition-all outline-none min-h-[80px]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-12">
                                {selected.type === 'naval' && (
                                    <section>
                                        <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-6 flex items-center gap-3">
                                            <Ship size={14} className="text-zinc-800" /> Adversary Vessel Configuration
                                        </h5>
                                        <div className="p-12 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                                            <div className="grid grid-cols-2 gap-12 mb-12">
                                                <div>
                                                    <label className="block text-[8px] font-black text-zinc-700 mb-2 uppercase tracking-widest">Enemy Hull Health</label>
                                                    <input 
                                                        type="number"
                                                        value={selected.vessel?.hull || 100}
                                                        onChange={(e) => updateSelected({ 
                                                            vessel: { ...selected.vessel!, hull: parseInt(e.target.value) }
                                                        })}
                                                        className="w-full bg-zinc-950 border border-zinc-900 text-3xl font-mono text-white p-4"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[8px] font-black text-zinc-700 mb-2 uppercase tracking-widest">Vessel Name</label>
                                                    <input 
                                                        value={selected.vessel?.name || "Unnamed Adversary"}
                                                        onChange={(e) => updateSelected({ 
                                                            vessel: { ...selected.vessel!, name: e.target.value }
                                                        })}
                                                        className="w-full bg-zinc-950 border border-zinc-900 text-xl font-bold uppercase italic text-zinc-200 p-4"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h6 className="text-[9px] font-black uppercase tracking-widest text-zinc-600 flex justify-between items-center">
                                                    Targetable Components
                                                    <button 
                                                        onClick={() => updateSelected({ 
                                                            vessel: { 
                                                                ...selected.vessel!, 
                                                                components: [...(selected.vessel?.components || []), { id: `comp_${Date.now()}`, name: "New Component", health: 100 }]
                                                            } 
                                                        })}
                                                        className="text-gold flex items-center gap-2"
                                                    >
                                                        <Plus size={10} /> Add Target
                                                    </button>
                                                </h6>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {selected.vessel?.components.map((comp, idx) => (
                                                        <div key={comp.id} className="flex items-center gap-4 bg-zinc-950 p-4 border border-zinc-900">
                                                            <input 
                                                                value={comp.name}
                                                                onChange={(e) => {
                                                                    const newComps = [...selected.vessel!.components];
                                                                    newComps[idx].name = e.target.value;
                                                                    updateSelected({ vessel: { ...selected.vessel!, components: newComps } });
                                                                }}
                                                                className="flex-1 bg-transparent border-none text-[10px] font-black uppercase text-zinc-400"
                                                            />
                                                            <input 
                                                                type="number"
                                                                value={comp.health}
                                                                onChange={(e) => {
                                                                    const newComps = [...selected.vessel!.components];
                                                                    newComps[idx].health = parseInt(e.target.value);
                                                                    updateSelected({ vessel: { ...selected.vessel!, components: newComps } });
                                                                }}
                                                                className="w-20 bg-zinc-900 border-none text-right font-mono text-gold-dark text-[10px]"
                                                            />
                                                            <button 
                                                                onClick={() => {
                                                                    const newComps = selected.vessel!.components.filter((_, i) => i !== idx);
                                                                    updateSelected({ vessel: { ...selected.vessel!, components: newComps } });
                                                                }}
                                                                className="text-zinc-800 hover:text-red-500"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                <section>
                                    <h5 className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-6 flex items-center gap-3">
                                        <Plus size={14} className="text-zinc-800" /> Simulation Metadata
                                    </h5>
                                    <div className="p-8 border border-zinc-900 opacity-50 italic text-zinc-500 text-center">
                                        "Participant management and complex scripting triggers under development (MAKER_PHASE_03)."
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </main>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-20 italic font-serif p-24 text-center">
                    <Edit3 size={64} className="mb-6" />
                    <p className="text-2xl">"The choices of the past are waiting for your quill."</p>
                    <p className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest">Registry ID_BUFFER: NULL</p>
                </div>
            )}
        </div>
    );
};
