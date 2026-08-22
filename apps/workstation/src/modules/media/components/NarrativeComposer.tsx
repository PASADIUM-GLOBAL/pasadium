import React, { useState } from 'react';
import { useMedia } from '../hooks/useMedia';
import { Sparkles, Wand2, Loader2, CheckCircle2 } from 'lucide-react';

export const NarrativeComposer = () => {
  const [prompt, setPrompt] = useState('');
  const { dispatchMedia, isDispatching, activeJob } = useMedia();

  const handleGenerate = async () => {
    if (!prompt || isDispatching) return;
    await dispatchMedia(prompt);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Creative_Core</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Narrative_Seed</h2>
        </div>
      </header>

      <div className="flex-1 relative mb-8 group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isDispatching}
          placeholder="Input script parameters or creative brief..."
          className="w-full h-full bg-black/40 border border-white/10 rounded-3xl p-6 text-sm text-slate-300 placeholder:text-white/10 resize-none focus:border-cyan-500/40 outline-none transition-all font-sans leading-relaxed disabled:opacity-50"
        />
        <div className="absolute bottom-6 right-6 text-[9px] font-mono text-white/20 uppercase tracking-widest">
          {prompt.length} / 8,000 CHARS
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleGenerate}
          disabled={isDispatching || !prompt}
          className={`w-full py-5 rounded-2xl font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
            isDispatching ? 'bg-white/5 text-white/20' : 'bg-white text-black hover:bg-cyan-400 shadow-xl'
          }`}
        >
          {isDispatching ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              INITIALIZING_PIPELINE...
            </>
          ) : activeJob?.status === 'COMPLETED' ? (
            <>
              <CheckCircle2 size={16} className="text-green-500" />
              STORYBOARD_READY
            </>
          ) : (
            <>
              <Wand2 size={16} />
              GENERATE_STORYBOARD
            </>
          )}
        </button>
        <p className="text-[9px] text-white/20 text-center font-mono uppercase tracking-[0.2em]">
          {isDispatching ? "Allocating_GPU_Resources..." : "MediaVerse_v2_Active"}
        </p>
      </div>
    </div>
  );
};
