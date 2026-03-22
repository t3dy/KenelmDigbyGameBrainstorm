import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    Sparkles, 
    User, 
    Bot, 
    Maximize2, 
    History,
    Settings,
    FileSearch,
    Brain,
    Activity,
    Download,
    BookOpen
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * SCHOLAR CHAT: Agentic Intelligence Interface
 * 
 * Facilitates communication with local LLM providers using the
 * curated project corpus as context for scholarly dialogue.
 */

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const PROMPT_TEMPLATES = [
    { label: 'Alchemical Naming', prompt: 'Suggest 5 etymologically consistent names for a new alchemical reagent found in context.' },
    { label: 'Dialogue Scripting', prompt: 'Draft a dialogue for Digby regarding the failed synthesis of Mercury, tone: melancholic.' },
    { label: 'Economic Seeding', prompt: 'Predict the supply-chain instability of a Mediterranean port during a naval blockade in 1628.' },
    { label: 'Lore Synthesis', prompt: 'Review the project manifest and identify 3 potential narrative contradictions.' }
];

export const ScholarChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'assistant', content: "The laboratory's scholarship is at your disposal. How shall we interpret the current manifest?", timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { manifest, currentProjectSlug } = useGameStore();

    const handleExportTranscript = async () => {
        const transcript = `# ALMAGEST SCHOLAR TRANSCRIPT: ${new Date().toISOString()}
        
## Project: ${currentProjectSlug}
## Model: Resident Scholar (Phi-3-Mini Native)

## Dialogue Sequence:
${messages.map(m => `### [${m.role.toUpperCase()}] at ${m.timestamp.toLocaleTimeString()}\n${m.content}\n`).join('\n')}

---
Exported for external knowledge synthesis.
`;
        await (window as any).almagest.exportToDesktop({
            filename: `Scholar_Transcript_${Date.now()}.md`,
            content: transcript
        });
        alert('Chat Transcript (.md) exported to Desktop.');
    };

    const applyTemplate = (prompt: string) => {
        setInput(prompt);
    };

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Enhanced Context Retrieval:
            // 1. Project Manifest
            const manifestContext = `Project: ${currentProjectSlug}. Reagents: ${manifest.reagents.length}. Locations: ${manifest.locations.length}.`;
            
            // 2. Active Document Context (Try to read if any file is selected in CorpusBrowser)
            // For now, we'll try to read the first file in the corpus as 'Primary Source'
            let docContext = "";
            const corpusList = await (window as any).almagest.listCorpus(currentProjectSlug);
            if (corpusList && corpusList.length > 0) {
                 const firstDoc = corpusList[0];
                 docContext = await (window as any).almagest.readDocumentText({ path: firstDoc.path });
                 docContext = `\nATTACHED DOCUMENT (${firstDoc.name}):\n${docContext.slice(0, 1000)}...\n`;
            }

            const prompt = `### SYSTEM: You are the Scholar, an agentic intelligence for Almagest.
${manifestContext}
${docContext}

### USER: ${input}

### ASSISTANT:`;
            
            const provider = 'Resident Scholar (Local)';
            const response = await (window as any).almagest.queryLLM({ provider, prompt });
            
            setMessages(prev => [...prev, { 
                id: (Date.now() + 1).toString(), 
                role: 'assistant', 
                content: response.content, 
                timestamp: new Date() 
            }]);
        } catch (e) {
            setMessages(prev => [...prev, { 
                id: (Date.now() + 1).toString(), 
                role: 'assistant', 
                content: "Local LLM bridge unreachable. Please ensure provider is active.", 
                timestamp: new Date() 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Chat Control & History */}
            <div className="w-80 border-r border-zinc-900 bg-zinc-950/40 p-8 flex flex-col gap-8">
                <header>
                    <span className="text-[10px] font-black uppercase text-gold tracking-widest block mb-1">Intelligence Link</span>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Agentic Hub</h2>
                </header>

                <div className="flex-col flex gap-4 pr-2 custom-scrollbar overflow-y-auto">
                    <button className="p-4 border border-zinc-800 bg-zinc-900/50 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all flex items-center justify-between">
                         <div className="flex items-center gap-3"><History size={14} /> Session History</div>
                         <span className="text-gold">4</span>
                    </button>
                    <button className="p-4 border border-zinc-800 bg-zinc-900/50 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all flex items-center justify-between">
                         <div className="flex items-center gap-3"><Settings size={14} /> Intelligence Config</div>
                    </button>
                    <button className="p-4 border border-zinc-800 bg-zinc-900/50 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all flex items-center justify-between">
                         <div className="flex items-center gap-3"><FileSearch size={14} /> Context Scraps</div>
                         <span className="text-blue-400">JSON</span>
                    </button>
                </div>

                <div className="space-y-4">
                     <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest block mb-4 border-b border-zinc-900 pb-2">Prompt Library</span>
                     <div className="flex flex-col gap-2">
                        {PROMPT_TEMPLATES.map(tmp => (
                            <button 
                                key={tmp.label}
                                onClick={() => applyTemplate(tmp.prompt)}
                                className="p-3 bg-zinc-900/40 border border-zinc-800 text-[9px] font-bold uppercase text-zinc-500 hover:text-gold hover:border-gold/30 transition-all text-left flex items-center gap-3"
                            >
                                <BookOpen size={12} /> {tmp.label}
                            </button>
                        ))}
                     </div>
                </div>

                <div className="mt-auto p-6 bg-zinc-900/40 border border-zinc-800 rounded-lg space-y-4">
                     <div className="flex items-center gap-3">
                          <Activity size={14} className="text-gold" />
                          <span className="text-[9px] font-black uppercase text-zinc-500">Local Hardware Status</span>
                     </div>
                     <div className="space-y-2">
                          <div className="flex justify-between text-[8px] font-mono text-zinc-700"><span>VRAM LOAD</span><span>3.4GB / 8GB</span></div>
                          <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
                               <div className="w-1/3 h-full bg-gold" />
                          </div>
                     </div>
                </div>
            </div>

            {/* Right: Message Stage */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col relative overflow-hidden">
                 <header className="flex justify-between items-center mb-12 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center">
                             <Brain size={24} className="text-gold" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">The Scholar</h3>
                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.4em] italic">Provider :: LLM Bridge Alpha</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleExportTranscript}
                            className="px-6 py-3 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3 shadow-2xl"
                        >
                            <Download size={14} /> Export Transcript (.md)
                        </button>
                        <button className="p-4 border border-zinc-900 text-zinc-600 hover:text-white transition-all"><Maximize2 size={16} /></button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-12 custom-scrollbar" ref={scrollRef}>
                    <AnimatePresence initial={false}>
                        {messages.map(msg => (
                            <motion.div 
                                key={msg.id}
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-6 ${msg.role === 'user' ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 border border-zinc-800 text-zinc-300'} shadow-2xl rounded-sm`}>
                                     <div className="flex items-center gap-3 mb-3 border-b border-zinc-800/20 pb-2">
                                          {msg.role === 'user' ? <User size={12} className="text-zinc-600" /> : <Bot size={12} className="text-gold" />}
                                          <span className="text-[9px] font-black uppercase tracking-widest">{msg.role}</span>
                                          <span className="text-[8px] font-mono text-zinc-500 ml-auto">{msg.timestamp.toLocaleTimeString()}</span>
                                     </div>
                                     <p className="text-xs font-serif italic italic leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                 <div className="p-6 bg-zinc-900 border border-zinc-800 text-zinc-600 flex items-center gap-4 italic italic text-xs font-serif italic">
                                      <Sparkles size={14} className="animate-pulse text-gold" /> Writing scholarly response...
                                 </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Stage */}
                <div className="relative group">
                     <div className="absolute inset-0 bg-gold blur-xl opacity-0 group-focus-within:opacity-10 transition-opacity" />
                     <div className="bg-zinc-950 border border-zinc-900 flex items-center pr-6 overflow-hidden relative z-10 focus-within:border-gold transition-all">
                          <input 
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                              placeholder="Consult the laboratory intelligence..."
                              className="flex-1 bg-transparent p-6 text-xs font-serif italic text-white focus:outline-none"
                          />
                          <button 
                               onClick={handleSend}
                               disabled={!input.trim() || isTyping}
                               className="p-4 bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50"
                          >
                               <Send size={18} />
                          </button>
                     </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 2px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #111; }
            `}</style>
        </div>
    );
};
