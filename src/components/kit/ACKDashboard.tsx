import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Compass, 
    Network, 
    Book, 
    Settings, 
    Zap, 
    ChevronRight, 
    CheckCircle2, 
    Clock, 
    AlertTriangle, 
    FileText,
    Database,
    Home,
    Play,
    FolderPlus,
    PenTool,
    ArrowRight,
    Trash2,
    Sparkles,
    Download
} from 'lucide-react';
import { KIT_REGISTRY, TOUR_STEPS, DEEP_DIVES } from '../../data/kitRegistry';
import type { ProjectStatus, DocTrust } from '../../data/kitRegistry';
import { useGameStore } from '../../state/gameStore';
import { ProjectWizard } from './ProjectWizard';
import { ProjectWorkspace } from './ProjectWorkspace';
import { DemoSurface } from './DemoSurface';
import { TourModal } from './TourModal';

export const ACKDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<'home' | 'tour' | 'systems' | 'data' | 'library' | 'status' | 'staging' | 'authoring'>('home');
    const [tourIndex, setTourIndex] = useState(0);
    const [showTour, setShowTour] = useState(false);
    const [showWizard, setShowWizard] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const { setView, manifest, loadProjectManifest, currentProjectSlug } = useGameStore();

    const handleAIProjectBrief = () => {
        alert(`Scholar is synthesizing a strategic brief for ${currentProjectSlug || 'Active Project'}... "The transition from mercury to gold is not merely chemical, it is a geopolitical necessity."`);
    };

    const handleExportBundle = async () => {
        const bundle = `# ALMAGEST PROJECT BUNDLE: ${currentProjectSlug}
        
## Status Report
- Reagents: ${manifest?.reagents?.length || 0}
- Locations: ${manifest?.locations?.length || 0}
- Encounters: ${manifest?.encounters?.length || 0}
- Integrity: NOMINAL

## Scholar's Note
"The construction kit has reached structural maturity. All makers are aligned."

---
Exported for external project management.
`;
        await (window as any).almagest.exportToDesktop({
            filename: `Project_Bundle_${currentProjectSlug}.md`,
            content: bundle
        });
        alert('Project Bundle (.md) exported to Desktop.');
    };

    const fetchProjects = async () => {
        setIsLoadingProjects(true);
        const list = await (window as any).almagest.listProjects();
        setProjects(list);
        setIsLoadingProjects(false);
    };

    React.useEffect(() => {
        if (activeView === 'status') {
            fetchProjects();
        }
    }, [activeView]);

    const getStatusIcon = (status: ProjectStatus) => {
        switch (status) {
            case 'Working': return <CheckCircle2 size={14} className="text-green-500" />;
            case 'Partial': return <Clock size={14} className="text-amber-500" />;
            case 'Stub': return <AlertTriangle size={14} className="text-zinc-500" />;
            case 'Planned': return <Zap size={14} className="text-zinc-700" />;
            default: return <AlertTriangle size={14} className="text-zinc-500" />;
        }
    };

    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case 'Working': return 'border-green-500/20 text-green-500 bg-green-500/5';
            case 'Partial': return 'border-amber-500/20 text-amber-500 bg-amber-500/5';
            case 'Stub': return 'border-zinc-500/20 text-zinc-500 bg-zinc-500/5';
            case 'Planned': return 'border-zinc-700/20 text-zinc-700 bg-zinc-700/5';
            default: return 'border-zinc-500/20 text-zinc-500 bg-zinc-500/5';
        }
    };

    const getTrustColor = (trust?: DocTrust) => {
        switch (trust) {
            case 'Primary': return 'text-amber-400 border-amber-400/20 bg-amber-400/5';
            case 'Aspirational': return 'text-blue-400 border-blue-400/20 bg-blue-400/5';
            case 'Stale': return 'text-red-400 border-red-400/20 bg-red-400/5';
            default: return 'text-zinc-500 border-zinc-500/20 bg-zinc-500/5';
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-zinc-950 text-zinc-100 font-sans">
            <div className="flex h-full overflow-hidden">
                <nav className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col p-6 gap-8">
                    <div className="flex flex-col mb-4">
                        <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.4em] mb-1 italic">Control Room</span>
                        <h3 className="text-xl font-bold italic tracking-tighter text-zinc-100 flex items-center gap-3">
                            ALMAGEST.ACK
                        </h3>
                    </div>

                    <div className="flex flex-col gap-1">
                        <NavButton active={activeView === 'home'} onClick={() => setActiveView('home')} icon={<Home size={18} />} label="Dashboard" />
                        <NavButton active={activeView === 'tour'} onClick={() => setActiveView('tour')} icon={<Compass size={18} />} label="Guided Tour" />
                        <NavButton active={activeView === 'systems'} onClick={() => setActiveView('systems')} icon={<Network size={18} />} label="System Map" />
                        <NavButton active={activeView === 'data'} onClick={() => setActiveView('data')} icon={<Database size={18} />} label="Manifest Explorer" />
                        <NavButton active={activeView === 'authoring'} onClick={() => setActiveView('authoring')} icon={<PenTool size={18} />} label="Project Authoring" />
                        <NavButton active={activeView === 'staging'} onClick={() => setActiveView('staging')} icon={<Zap size={18} />} label="Staging Ground" />
                        <NavButton active={activeView === 'library'} onClick={() => setActiveView('library')} icon={<Book size={18} />} label="Deep Dives" />
                        <NavButton active={activeView === 'status'} onClick={() => setActiveView('status')} icon={<Settings size={18} />} label="Project Pulse" />
                        <div className="h-px bg-zinc-800 my-2" />
                        <NavButton active={false} onClick={() => setShowWizard(true)} icon={<FolderPlus size={18} />} label="New Project" />
                    </div>

                    <div className="mt-auto">
                        <button onClick={() => setView('nav')} className="w-full py-4 bg-amber-600 text-zinc-950 font-black text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3">
                            <Play size={16} /> Open Simulation
                        </button>
                    </div>
                </nav>

                <main className="flex-1 flex flex-col overflow-y-auto bg-zinc-950 p-12">
                   <div className="flex justify-between items-center mb-12 border-b border-zinc-900 pb-8">
                        <div className="flex items-center gap-4">
                             <div className="text-[10px] font-black uppercase text-gold tracking-[0.4em] bg-gold/5 px-4 py-2 border border-gold/10">Project: {currentProjectSlug || 'UNSET'}</div>
                        </div>
                        <div className="flex gap-4">
                             <button 
                                onClick={handleAIProjectBrief}
                                className="flex items-center gap-2 px-6 py-2 border border-zinc-700 text-gold text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-zinc-950 transition-all"
                             >
                                <Sparkles size={14} /> AI Project Brief
                             </button>
                             <button 
                                onClick={handleExportBundle}
                                className="flex items-center gap-2 px-6 py-2 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl"
                             >
                                <Download size={14} /> Export Bundle (.md)
                             </button>
                        </div>
                   </div>
                   <AnimatePresence mode="wait">
                        {activeView === 'home' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-6xl w-full mx-auto">
                                <header className="mb-16 text-center lg:text-left">
                                    <h1 className="text-6xl font-serif italic mb-6">Welcome to the Workshop.</h1>
                                    <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                                        The Almagest Construction Kit is an integration shell for a collection of autonomous makers, 
                                        governance scripts, and scholarship-led manifests. Here, lore is transformed into machinery.
                                    </p>
                                </header>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {KIT_REGISTRY.slice(0, 6).map(node => (
                                        <Card key={node.id} node={node} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeView === 'tour' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
                                <div className="mb-12">
                                    <span className="text-amber-500 font-mono text-sm uppercase tracking-[0.3em] font-black">Step {tourIndex + 1} of {TOUR_STEPS.length}</span>
                                    <h2 className="text-5xl font-serif italic mt-4">{TOUR_STEPS[tourIndex].title}</h2>
                                </div>
                                <p className="text-2xl text-zinc-300 leading-relaxed mb-16 italic">"{TOUR_STEPS[tourIndex].content}"</p>
                                <div className="flex gap-6">
                                    <button disabled={tourIndex === 0} onClick={() => setTourIndex(prev => prev - 1)} className="px-10 py-4 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-500 disabled:opacity-20 transition-all">Prev</button>
                                    <button onClick={() => tourIndex < TOUR_STEPS.length - 1 ? setTourIndex(prev => prev + 1) : setActiveView('home')} className="px-10 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-amber-500 transition-colors">
                                        {tourIndex < TOUR_STEPS.length - 1 ? 'Next' : 'Finish Tour'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeView === 'systems' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {KIT_REGISTRY.map(node => (
                                    <MiniCard key={node.id} node={node} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
                                ))}
                            </motion.div>
                        )}

                        {activeView === 'library' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl w-full mx-auto">
                                <header className="mb-12 border-b border-zinc-800 pb-8 flex justify-between items-end">
                                    <div>
                                        <h2 className="text-4xl font-serif italic mb-2">The Deep Dive Library</h2>
                                        <p className="text-zinc-500 text-sm">20 systematic manuals for scholarly game construction.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-[10px] uppercase font-bold">
                                            <FileText size={12} /> Primary Truth
                                        </div>
                                    </div>
                                </header>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {DEEP_DIVES.map(doc => (
                                        <div key={doc.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm hover:border-amber-500/50 transition-all group">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${getTrustColor(doc.trust)}`}>
                                                    {doc.trust}
                                                </span>
                                                <span className="text-[10px] font-mono text-zinc-600">Relevance: {doc.relevance}/10</span>
                                            </div>
                                            <h4 className="text-xl font-bold italic mb-2">{doc.name}</h4>
                                            <p className="text-sm text-zinc-500 mb-6">{doc.description}</p>
                                            <div className="flex items-center gap-2 text-[10px] font-mono font-black text-zinc-700 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                                                <FileText size={14} /> {doc.path}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeView === 'data' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl w-full mx-auto">
                                <header className="mb-12 border-b border-zinc-800 pb-8">
                                    <h2 className="text-4xl font-serif italic mb-2">Manifest Explorer</h2>
                                    <p className="text-zinc-500 text-sm">Live inspection of the Digby 1628 data contract.</p>
                                </header>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2">Locations ({manifest?.locations?.length || 0})</h3>
                                        <div className="flex flex-col gap-2">
                                            {manifest?.locations?.map(loc => (
                                                <div key={loc.id} className="p-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 transition-all flex items-center justify-between">
                                                    <span className="text-sm font-bold truncate">{loc.name}</span>
                                                    <span className="text-[9px] font-mono text-zinc-600 uppercase italic">{(loc as any).port_config?.type || 'Standard'}</span>
                                                </div>
                                            ))}
                                            {!manifest?.locations?.length && <p className="text-[10px] text-zinc-700 italic">No locations defined.</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2">Encounters ({manifest?.encounters?.length || 0})</h3>
                                        <div className="flex flex-col gap-2">
                                            {manifest?.encounters?.slice(0, 8).map(enc => (
                                                <div key={enc.id} className="p-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 transition-all flex flex-col">
                                                    <span className="text-sm font-bold truncate">{enc.id.replace(/_/g, ' ')}</span>
                                                    <span className="text-[9px] font-mono text-amber-500/50 uppercase italic">{(enc as any).provenance || 'Unprovenanced'}</span>
                                                </div>
                                            ))}
                                            {!manifest?.encounters?.length && <p className="text-[10px] text-zinc-700 italic">No encounters defined.</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2">Reagents ({manifest?.reagents?.length || 0})</h3>
                                        <div className="flex flex-col gap-2">
                                            {manifest?.reagents?.map(re => (
                                                <div key={re.id} className="p-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 transition-all flex items-center gap-3">
                                                   <div className="w-4 h-4 rounded-full" style={{ backgroundColor: (manifest as any).assets?.[(re as any).iconId || '']?.color || '#555' }} />
                                                    <span className="text-sm font-bold truncate">{re.name}</span>
                                                </div>
                                            ))}
                                            {!manifest?.reagents?.length && <p className="text-[10px] text-zinc-700 italic">No reagents defined.</p>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeView === 'staging' && <DemoSurface />}
                        {activeView === 'authoring' && <ProjectWorkspace />}

                        {activeView === 'status' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto space-y-12 pb-24">
                                <header className="flex justify-between items-end border-b border-zinc-900 pb-8">
                                    <div>
                                        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">Project Pulse</h2>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Registry_Status: Active</p>
                                    </div>
                                    <button onClick={fetchProjects} className="p-3 border border-zinc-900 text-zinc-500 hover:text-white transition-all"><Clock size={16} /></button>
                                </header>

                                <div className="grid grid-cols-1 gap-4">
                                    {isLoadingProjects ? (
                                        <div className="p-12 text-center text-zinc-700 italic animate-pulse lowercase tracking-[0.5em]">Scanning Filesystem...</div>
                                    ) : projects.length === 0 ? (
                                        <div className="p-12 border border-dashed border-zinc-900 text-center text-zinc-700 italic uppercase tracking-widest text-xs">
                                            No isolated projects detected in /projects/
                                        </div>
                                    ) : (
                                        projects.map(p => (
                                            <div key={p.slug} className="group p-8 bg-zinc-950 border border-zinc-900 hover:border-gold transition-all flex items-center justify-between shadow-2xl relative overflow-hidden">
                                                <div className="flex gap-8 items-center relative z-10 w-full">
                                                    <div className="w-1 h-20 bg-gold/50 group-hover:bg-gold transition-colors" />
                                                    <div className="flex-1 flex flex-col gap-4">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-xl font-black uppercase text-white tracking-tighter italic">{p.name}</h3>
                                                                <div className="flex gap-4 mt-2">
                                                                    <span className="text-[9px] font-mono text-zinc-600">ID: {p.slug}</span>
                                                                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Last Sync: {new Date(p.lastModified).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                {(p.makers || []).map((m: string) => (
                                                                    <span key={m} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[8px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-gold group-hover:border-gold/30 transition-all">
                                                                        {m.replace(/_/g, ' ')}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex gap-8 border-t border-zinc-900 pt-4 mt-2">
                                                            <div className="flex items-center gap-2">
                                                                <Database size={10} className="text-zinc-700" />
                                                                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">{p.reagentCount} Reagents</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Compass size={10} className="text-zinc-700" />
                                                                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">{p.portCount} Fleet Ports</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Book size={10} className="text-zinc-700" />
                                                                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">Corpus Active</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="ml-12 relative z-10 flex gap-4">
                                                    <button 
                                                        onClick={async () => {
                                                            if (confirm(`Irrecoverably delete project "${p.name}"?`)) {
                                                                await (window as any).almagest.deleteProject(p.slug);
                                                                fetchProjects();
                                                            }
                                                        }}
                                                        className="p-4 border border-zinc-800 text-zinc-700 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center justify-center shrink-0"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={async () => {
                                                            await loadProjectManifest(p.slug);
                                                            setActiveView('authoring');
                                                        }}
                                                        className="px-6 py-4 border border-zinc-800 text-[10px] font-black uppercase text-zinc-500 group-hover:bg-zinc-100 group-hover:text-zinc-950 transition-all flex items-center gap-3 whitespace-nowrap"
                                                    >
                                                        Load Lab <ArrowRight size={14} />
                                                    </button>
                                                </div>

                                                <span className="absolute -right-4 -bottom-4 text-7xl font-black uppercase italic text-zinc-900 opacity-5 shadow-inner pointer-events-none select-none">
                                                    {p.slug}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                        {showTour && <TourModal onClose={() => setShowTour(false)} />}
               </AnimatePresence>
                </main>
            </div>
            {/* Project Wizard Overlay */}
            <AnimatePresence>
                {showWizard && <ProjectWizard onClose={() => setShowWizard(false)} />}
            </AnimatePresence>
        </div>
    );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: any, label: string }> = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all ${active ? 'bg-zinc-800 text-amber-500 border border-zinc-700/50 shadow-inner' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'}`}>
        {icon} <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
);

const Card: React.FC<{ node: any, getStatusIcon: any, getStatusColor: any }> = ({ node, getStatusIcon, getStatusColor }) => (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-8 hover:border-zinc-700 transition-all group flex flex-col justify-between h-full">
        <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest mb-6 ${getStatusColor(node.status)}`}>
                {getStatusIcon(node.status)} {node.status}
            </div>
            <h4 className="text-xl font-bold mb-3 italic tracking-tight">{node.name}</h4>
            <p className="text-sm text-zinc-500 leading-relaxed mb-8">{node.description}</p>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono font-black text-zinc-600 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
            <span>{node.type}</span> <ChevronRight size={16} />
        </div>
    </div>
);

const MiniCard: React.FC<{ node: any, getStatusIcon: any, getStatusColor: any }> = ({ node, getStatusIcon, getStatusColor }) => (
    <div className="bg-zinc-900 border border-zinc-800/50 p-4 rounded-sm hover:bg-zinc-800 transition-colors flex items-center justify-between gap-4">
        <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{node.type}</span>
            <span className="text-xs font-bold text-white truncate max-w-[120px]">{node.name}</span>
        </div>
        <div className={`p-1 rounded-full border ${getStatusColor(node.status)}`}>
            {getStatusIcon(node.status)}
        </div>
    </div>
);
