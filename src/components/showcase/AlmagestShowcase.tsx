import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    Ship, 
    Beaker, 
    PenTool, 
    Zap, 
    ArrowRight, 
    Layers,
    Monitor
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

export const AlmagestShowcase: React.FC = () => {
    const { setView } = useGameStore();
    const { scrollYProgress } = useScroll();
    
    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const sections = [
        {
            id: 'engine',
            title: 'The Alchemical Engine',
            subtitle: 'Phase 6: Synthesis & Discovery',
            icon: <Beaker size={48} />,
            description: "A deterministic discovery engine based on the 'Great Work' of the 17th century. We've built an ontology of refined materials (Vitriol, Antimony) that players must combine through historical recipes to proceed.",
            tags: ['React-Zustand', 'Motion Synthesis', 'Recipe Ontology'],
            image: "https://images.unsplash.com/photo-1532187875605-1ef6ca237bba?auto=format",
            colors: "from-amber-900/20 to-zinc-950"
        },
        {
            id: 'mediterranean',
            title: 'The Mediterranean Stage',
            subtitle: 'Phase 4 & 5: Trade & Pursuit',
            icon: <Ship size={48} />,
            description: "A living economy where price multipliers are resolved at build-time. We've implemented vector-based pathfinding for the Venetian Pursuer, creating a persistent tactical threat during your Levantine voyage.",
            tags: ['Vector Pathfinding', 'Dynamic Economy', 'SVG Geo-Mapping'],
            image: "https://images.unsplash.com/photo-1548123304-204b77467610?auto=format",
            colors: "from-teal-900/20 to-zinc-950"
        },
        {
            id: 'archives',
            title: 'The Philological Codex',
            subtitle: 'Phase 7: Manuscript Resolution',
            icon: <PenTool size={48} />,
            description: "Where the fragments of Digby's soul are unified. Our manuscript comparison system allows for the resolution of conflicting variants (Oxford vs. Paris) to uncover 'Alchemical Truth' in the manifest.",
            tags: ['Textual Criticism', 'Structural Logic', 'Historical Research'],
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format",
            colors: "from-zinc-100/10 to-zinc-950"
        }
    ];

    return (
        <div className="flex-1 bg-zinc-950 text-zinc-100 overflow-x-hidden relative font-sans">
            {/* Parallax Map Background */}
            <motion.div 
                style={{ y: backgroundY }}
                className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-repeat opacity-[0.03] z-0 pointer-events-none"
            />

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center relative z-10 px-12 text-center overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_60%)] from-amber-500/10"
                />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="inline-block px-4 py-1 border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-8 rounded-full bg-amber-500/5">
                        KDSC / Production Gallery
                    </span>
                    <h1 className="text-8xl lg:text-[10rem] font-serif italic italic tracking-tighter leading-none mb-4 text-white">
                         ALMAGEST
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-400 text-sm lg:text-lg font-light leading-relaxed mb-12 italic">
                        "The soul of Kenelm Digby, manifested through structural alchemical logic and historical cinematography."
                    </p>
                    
                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => setView('intro')}
                            className="group px-8 py-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 transition-all flex items-center gap-3 rounded-sm shadow-xl"
                        >
                            Return to Command <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll into the Archives</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
                </div>
            </section>

            {/* Showcase Grid */}
            <section className="relative z-10 py-32 px-12 lg:px-24 max-w-7xl mx-auto">
                {sections.map((section, i) => (
                    <motion.div 
                        key={section.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className={`mb-48 grid grid-cols-12 gap-12 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        <div className={`col-span-12 lg:col-span-6 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                             <div className={`aspect-[4/5] bg-gradient-to-br ${section.colors} border border-zinc-800 p-1 relative overflow-hidden group rounded-sm`}>
                                 <img 
                                    src={section.image} 
                                    alt={section.title} 
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                                 <div className="absolute bottom-12 left-12 right-12">
                                     <div className="flex gap-2 mb-4 flex-wrap">
                                         {section.tags.map(tag => (
                                             <span key={tag} className="px-3 py-1 bg-zinc-950/80 border border-zinc-800 text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                                                 {tag}
                                             </span>
                                         ))}
                                     </div>
                                     <h3 className="text-4xl font-serif italic text-white mb-2">{section.title}</h3>
                                     <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">{section.subtitle}</p>
                                 </div>
                             </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-8">
                             <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-2xl rounded-sm">
                                 {section.icon}
                             </div>
                             <div>
                                 <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 mb-4 block">Structural Feature / 0{i+1}</h4>
                                 <h3 className="text-5xl font-black italic italic tracking-tighter text-zinc-100 mb-8 leading-none">
                                     {section.title.toUpperCase()}
                                 </h3>
                                 <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10 italic">
                                     "{section.description}"
                                 </p>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-8 border-t border-zinc-900 pt-10">
                                 <div className="flex items-center gap-4 group cursor-pointer hover:bg-zinc-900/40 p-3 transition-all rounded-sm">
                                     <Zap size={20} className="text-amber-500" />
                                     <div>
                                         <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Performance</p>
                                         <p className="text-xs font-bold text-zinc-400">Low-latency Logic</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4 group cursor-pointer hover:bg-zinc-900/40 p-3 transition-all rounded-sm">
                                     <Layers size={20} className="text-amber-500" />
                                     <div>
                                         <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Reliability</p>
                                         <p className="text-xs font-bold text-zinc-400">Deterministic Engine</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Production Stats Footer */}
            <footer className="relative z-10 bg-zinc-950 border-t border-zinc-900 py-24 px-12">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 opacity-40">
                    <div className="flex gap-16">
                        <div className="text-center">
                            <h4 className="text-4xl font-mono font-black text-zinc-100 mb-2">20</h4>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Simulated Scenes</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-mono font-black text-zinc-100 mb-2">350+</h4>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Manifest Entries</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-mono font-black text-zinc-100 mb-2">Phase 7</h4>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Active Structural Build</p>
                        </div>
                    </div>

                    <div className="text-right flex flex-col items-center lg:items-end">
                        <div className="flex items-center gap-4 mb-4">
                            <Monitor size={24} className="text-amber-500" />
                            <h3 className="text-2xl font-serif italic text-white tracking-widest uppercase">Almagest KDSC</h3>
                        </div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">© 2026 Almagest Design Collective. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
