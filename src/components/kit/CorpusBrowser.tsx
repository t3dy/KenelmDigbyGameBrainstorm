import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, 
    Search, 
    RefreshCcw, 
    Download, 
    Trash2, 
    Brain,
    Eye,
    ChevronRight,
    Filter,
    Sparkles
} from 'lucide-react';
import { useGameStore } from '../../state/gameStore';

/**
 * CORPUS BROWSER: Document & Intelligence Hub
 * 
 * Allows users to manage ingested PDFs, trigger OCR/extraction,
 * and browse the 'Scholar Brain' associated with the project.
 */

export const CorpusBrowser: React.FC = () => {
    const { corpus, loadCorpus, currentProjectSlug } = useGameStore();
    const [filter, setFilter] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any | null>(null);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadCorpus();
        setIsRefreshing(false);
    };

    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);

    const handleExtractText = async () => {
        if (!selectedFile) return;
        setIsExtracting(true);
        const text = await (window as any).almagest.readDocumentText({ path: selectedFile.path });
        setExtractedText(text);
        setIsExtracting(false);
    };

    const [extractionResults, setExtractionResults] = useState<any | null>(null);

    const handleAIExtract = async () => {
        if (!extractedText) {
            alert("SCHOLAR: 'No text extracted. Trigger full extraction first.'");
            return;
        }
        setIsExtracting(true);
        const results = await (window as any).almagest.extractEntities({ text: extractedText });
        setExtractionResults(results);
        setIsExtracting(false);
    };

    const handleCommitEntities = async () => {
        if (!extractionResults) return;
        const { addEntitiesToManifest, saveManifest } = useGameStore.getState();
        addEntitiesToManifest(extractionResults);
        await saveManifest();
        alert("Manifest updated with scholarly discoveries.");
        setExtractionResults(null);
    };

    const handleIngest = async () => {
        if (!currentProjectSlug) return;
        const doc = await (window as any).almagest.selectDocument();
        if (doc) {
            setIsRefreshing(true);
            const result = await (window as any).almagest.loadPDF({
                name: doc.name,
                project: currentProjectSlug,
                path: doc.path
            });
            if (result.success) {
                await handleRefresh();
            } else {
                alert(`Ingest Failure: ${result.error}`);
            }
            setIsRefreshing(false);
        }
    };

    const handleExportContext = async () => {
        const doc = `# ALMAGEST SCHOLARLY CONTEXT: ${selectedFile.name}
        
## Project: ${currentProjectSlug}
## Metadata:
- Size: ${(selectedFile.size / 1024).toFixed(1)} KB
- Type: ${selectedFile.type || 'PDF'}
- Last Modified: ${new Date(selectedFile.lastModified).toISOString()}

## Scholarly Summary:
"This manuscript appears to cover the early alchemical experiments of the project. Metadata suggests high correlation with 'Digby's Diary' and 'Athanor Settings v2'."

## Extracted Entites:
- Entity Count: 24
- Dominant Theme: Sympathy / Alchemical Volatility

---
Exported for external LLM ingestion.
`;
        await (window as any).almagest.exportToDesktop({
            filename: `${selectedFile.name.split('.')[0]}_context.md`,
            content: doc
        });
        alert('Scholarly Context (.md) exported to Desktop.');
    };

    const filteredFiles = corpus.filter(f => 
        f.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Document List */}
            <div className="w-96 border-r border-zinc-900 bg-zinc-950/40 p-8 flex flex-col gap-8">
                <header className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-gold tracking-widest block">Project Corpus</span>
                        <button 
                            onClick={handleRefresh}
                            className={`text-zinc-500 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                        >
                            <RefreshCcw size={14} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase italic">Library</h2>
                    
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
                        <input 
                            placeholder="Filter manuscripts..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 p-3 pl-10 text-[10px] font-mono text-zinc-400 focus:outline-none focus:border-gold transition-all"
                        />
                    </div>
                </header>

                <button 
                    onClick={handleIngest}
                    disabled={isRefreshing}
                    className="p-6 border border-zinc-900 bg-zinc-900/40 text-gold hover:bg-gold hover:text-zinc-950 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                    <FileText size={18} className="group-hover:scale-110 transition-transform" /> Ingest Manuscript
                </button>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {filteredFiles.map(file => (
                        <button 
                            key={file.name}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full p-4 border text-left transition-all flex items-center justify-between group ${selectedFile?.name === file.name ? 'bg-zinc-100 border-white' : 'bg-transparent border-zinc-900 hover:border-zinc-700'}`}
                        >
                            <div className="flex items-center gap-4">
                                <FileText size={16} className={selectedFile?.name === file.name ? 'text-zinc-950' : 'text-zinc-500'} />
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-black uppercase tracking-tight truncate w-40 ${selectedFile?.name === file.name ? 'text-zinc-950' : 'text-white'}`}>{file.name}</span>
                                    <span className={`text-[8px] font-mono ${selectedFile?.name === file.name ? 'text-zinc-600' : 'text-zinc-600'}`}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            </div>
                            <ChevronRight size={14} className={selectedFile?.name === file.name ? 'text-zinc-400' : 'text-zinc-800'} />
                        </button>
                    ))}
                    {filteredFiles.length === 0 && (
                        <div className="p-8 border border-dashed border-zinc-900 text-center text-zinc-700 italic text-[10px] uppercase tracking-widest">
                             No documents in corpus.
                        </div>
                    )}
                </div>

                <button className="p-4 border border-zinc-900 bg-zinc-900/20 text-[9px] font-black uppercase text-zinc-500 hover:text-white hover:border-gold transition-all flex items-center justify-center gap-3">
                    <Download size={14} /> Ingest New Manuscript
                </button>
            </div>

            {/* Right: Document Intelligence Stage */}
            <div className="flex-1 bg-[#050507] p-16 flex flex-col gap-12 overflow-y-auto">
                 {selectedFile ? (
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                         <header className="flex justify-between items-end border-b border-zinc-900 pb-8">
                            <div>
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">{selectedFile.name}</h3>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-2 italic flex items-center gap-4">
                                    Status: Verified 
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    Last Sync: {new Date(selectedFile.lastModified).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                 <button className="p-4 border border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
                                      <Trash2 size={16} />
                                 </button>
                                 <button className="px-8 py-4 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-3 shadow-2xl">
                                      <Eye size={14} /> Open Reader
                                 </button>
                                 <AnimatePresence mode="wait">
                                     <motion.button 
                                         key="assist"
                                         whileHover={{ scale: 1.05 }}
                                         whileTap={{ scale: 0.95 }}
                                         onClick={handleAIExtract}
                                         className="flex items-center gap-2 px-6 py-2 border border-zinc-700 text-gold text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-zinc-950 transition-all"
                                     >
                                         <Sparkles size={14} /> AI Assist
                                     </motion.button>
                                 </AnimatePresence>
                                 <button 
                                    onClick={handleExportContext}
                                    className="px-6 py-3 border border-zinc-900 text-[10px] font-black uppercase text-zinc-400 hover:text-white transition-all flex items-center gap-3"
                                 >
                                      <Download size={14} /> Export Context (.md)
                                 </button>
                            </div>
                         </header>

                         <div className="grid grid-cols-2 gap-12">
                              {/* Analysis Section */}
                              <section className="space-y-6">
                                   <div className="flex items-center gap-4 border-l-2 border-gold pl-4 italic">
                                        <Brain size={18} className="text-gold" />
                                        <h4 className="text-xs font-black uppercase text-zinc-400 tracking-widest">Scholar's Analysis</h4>
                                   </div>
                                   
                                   <div className="p-8 bg-zinc-950 border border-zinc-900 space-y-6">
                                        <div className="space-y-2">
                                             <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Summary</span>
                                             <p className="text-xs font-serif italic text-zinc-400 leading-relaxed italic">
                                                This manuscript appears to cover the early alchemical experiments of the project. Metadata suggests high correlation with 'Digby's Diary' and 'Athanor Settings v2'.
                                             </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div className="p-4 bg-zinc-900/50 border border-zinc-800">
                                                  <span className="text-[8px] font-black text-gold uppercase block mb-1">Entity Count</span>
                                                  <span className="text-lg font-black text-white italic">24</span>
                                             </div>
                                             <div className="p-4 bg-zinc-900/50 border border-zinc-800">
                                                  <span className="text-[8px] font-black text-blue-400 uppercase block mb-1">Key Topics</span>
                                                  <span className="text-lg font-black text-white italic">Sympathy</span>
                                             </div>
                                        </div>
                                        <button className="w-full py-4 border border-zinc-800 text-[9px] font-black uppercase text-zinc-600 hover:text-gold hover:border-gold transition-all">
                                             Re-generate Intelligence
                                        </button>
                                   </div>
                              </section>

                              {/* Technical Metadata */}
                              <section className="space-y-6">
                                   <div className="flex items-center gap-4 border-l-2 border-zinc-800 pl-4 italic">
                                        <Filter size={18} className="text-zinc-600" />
                                        <h4 className="text-xs font-black uppercase text-zinc-400 tracking-widest">Technical Spectrum</h4>
                                   </div>
                                   
                                   <div className="p-8 bg-zinc-950 border border-zinc-900 space-y-4 font-mono text-[10px]">
                                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                                             <span className="text-zinc-600">MIME_TYPE</span>
                                             <span className="text-zinc-400">application/pdf</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                                             <span className="text-zinc-600">FILE_SIZE</span>
                                             <span className="text-zinc-400">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                                             <span className="text-zinc-600">CHECKSUM_MD5</span>
                                             <span className="text-zinc-400 uppercase">a9c3...f4b2</span>
                                        </div>
                                        <div className="flex justify-between pb-2">
                                             <span className="text-zinc-600">SEARCHABLE</span>
                                             <span className="text-gold">YES</span>
                                        </div>
                                   </div>
                              </section>
                         </div>
                         <div className="grid grid-cols-2 gap-12">
                             <div className="space-y-8 bg-zinc-900/20 border border-zinc-900 p-12">
                                 <h4 className="text-[10px] font-black uppercase text-gold tracking-widest block mb-4">Scholarly Extraction Stage</h4>
                                 
                                 <button 
                                    onClick={handleExtractText}
                                    disabled={isExtracting}
                                    className="w-full p-6 border border-gold/20 bg-gold/5 text-gold hover:bg-gold hover:text-zinc-950 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 group disabled:opacity-50 mb-8"
                                 >
                                    <Brain size={18} className={isExtracting ? 'animate-pulse' : ''} /> {isExtracting ? 'Extracting Meaning...' : 'Trigger Full Extraction'}
                                 </button>

                                 {extractedText ? (
                                     <div className="space-y-6">
                                         <p className="text-[9px] text-zinc-500 font-serif leading-loose border-l-2 border-zinc-800 pl-6 h-[400px] overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                                             {extractedText}
                                         </p>
                                         <div className="text-[8px] text-zinc-700 font-mono uppercase tracking-widest">
                                            Token Count Estimate: {Math.ceil(extractedText.length / 4)}
                                         </div>
                                     </div>
                                 ) : (
                                     <div className="py-24 text-center border border-dashed border-zinc-800 opacity-20">
                                         <Brain size={32} className="mx-auto mb-4" />
                                         <p className="text-[10px] uppercase font-black tracking-widest">Awaiting Extraction</p>
                                     </div>
                                 )}
                             </div>

                             <div className="space-y-8">
                                 <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-4">Strategic Artifacts</h4>
                                 <div className="grid grid-cols-1 gap-4">
                                     <ArtifactCard 
                                         title="AI Alchemical Synthesis" 
                                         desc="Extract reagents and procedures from manuscript text."
                                         icon={<Sparkles size={16} />} 
                                         onClick={handleAIExtract}
                                     />
                                     
                                     {extractionResults && (
                                         <div className="p-8 border-2 border-gold bg-gold/5 space-y-6">
                                             <h5 className="text-[11px] font-black uppercase text-gold">Entities Discovered</h5>
                                             <ul className="text-[10px] space-y-2 font-mono text-zinc-400">
                                                 {extractionResults.reagents?.map((r: any) => <li key={r.name}>+ Reagent: {r.name}</li>)}
                                                 {extractionResults.locations?.map((l: any) => <li key={l.name}>+ Port: {l.name}</li>)}
                                                 {extractionResults.encounters?.map((e: any) => <li key={e.title}>+ Event: {e.title}</li>)}
                                             </ul>
                                             <button 
                                                onClick={handleCommitEntities}
                                                className="w-full py-3 bg-gold text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all"
                                             >
                                                Incorporate into Manifest
                                             </button>
                                         </div>
                                     )}

                                     <ArtifactCard 
                                         title="Export Context Wrap" 
                                         desc="Generate an .md contextual briefing for external LLMs."
                                         icon={<Download size={16} />} 
                                         onClick={handleExportContext}
                                     />
                                 </div>
                             </div>
                         </div>
                     </motion.div>
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20">
                        <FileText size={64} strokeWidth={1} className="mb-6 text-zinc-800" />
                        <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-800">No Manuscript Mounted</h3>
                        <p className="max-w-[280px] text-[10px] font-serif italic mt-4 text-zinc-700">Select a primary source from the library to begin scholarly distillation.</p>
                    </div>
                 )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 2px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #111; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #gold; }
            `}</style>
        </div>
    );
};

const ArtifactCard: React.FC<{ title: string, desc: string, icon: any, onClick: () => void }> = ({ title, desc, icon, onClick }) => (
    <button 
        onClick={onClick}
        className="w-full p-8 bg-zinc-900/40 border border-zinc-900 text-left hover:border-gold transition-all group"
    >
        <div className="flex items-center gap-4 mb-3">
            <div className="p-2 border border-zinc-800 text-zinc-500 group-hover:text-gold transition-colors">
                {icon}
            </div>
            <h5 className="text-[11px] font-black uppercase tracking-widest text-white">{title}</h5>
        </div>
        <p className="text-[9px] text-zinc-600 font-serif leading-relaxed italic">{desc}</p>
    </button>
);
