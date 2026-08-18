import React, { useState } from 'react';
import { Sparkles, Wand2, FileText } from 'lucide-react';
import { BrandOS } from '@pasadium/bridge';

export const NarrativeComposer = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      // Dispatch to the MediaVerse background pipeline
      await BrandOS.media.dispatch({
        prompt,
        objective: 'Brand Awareness',
        audience: 'General',
        tone: 'Technical',
        platforms: ['YouTube', 'Instagram']
      });
      alert(`Job Dispatched: Production pipeline initialized.`);
    } catch (e) {
      console.error(e);
      alert("Failed to initialize pipeline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="text-cyan-400" size={18} />
          <h3 className="text-sm font-bold tracking-tight uppercase">Narrative_Composer</h3>
        </div>
        <span className="text-[9px] font-mono text-cyan-500/50 px-2 py-1 border border-cyan-500/10 rounded">AI_ASSIST_ACTIVE</span>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter script seed or story brief..."
        className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/80 resize-none focus:border-cyan-500/50 outline-none transition-all font-sans leading-relaxed"
      />

      <div className="mt-6 space-y-3">
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-cyan-500 text-black rounded-lg font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all shadow-[0,0,20px,rgba(6,182,212,0.2)] disabled:opacity-50"
        >
          {loading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Wand2 size={14} />}
          {loading ? 'DISPATCHING...' : 'GENERATE_STORYBOARD'}
        </button>
        <p className="text-[10px] text-white/30 text-center font-mono">
          Estimated Production Time: 4.2 Minutes
        </p>
      </div>
    </div>
  );
};
