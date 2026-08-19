import React from 'react';
import { Sparkles, Settings2, Wand2 } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

export const NarrativeComposer = () => {
  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1" style={{ color: BRAND_COLORS.accent.cyan }}>
            <Sparkles size={16} />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Creative_Core</span>
          </div}
          <h2 className="text-3xl font-bold tracking-tight text-white">Narrative_Seed</h2>
        </div}
        <button className="p-3 rounded-2xl border transition-all text-white/40 hover:text-white" 
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: BRAND_COLORS.border.normal }}>
          <Settings2 size={16} />
        </button>
      </header>

      <div className="flex-1 relative mb-8 group">
        <textarea
          placeholder="Input script parameters or creative brief..."
          className="w-full h-full bg-black/40 border rounded-3xl p-6 text-sm text-slate-300 placeholder:text-white/10 resize-none focus:outline-none transition-all font-sans leading-relaxed shadow-inner"
          style={{ borderColor: BRAND_COLORS.border.normal }}
        />
        <div className="absolute bottom-6 right-6 text-[9px] font-mono text-white/20 uppercase tracking-widest group-focus-within:text-cyan-500/40 transition-colors">
          Tokens: 1,402 / 8,000
        </div}
      </div>

      <div className="space-y-4">
        <button className="w-full py-5 rounded-2xl font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl" 
                style={{ backgroundColor: BRAND_COLORS.text.primary, color: BRAND_COLORS.text.inverse }}>
          <Wand2 size={16} /> GENERATE_STORYBOARD
        </button>
        <p className="text-[9px] text-white/20 text-center font-mono uppercase tracking-[0.2em]">
          MediaVerse_v2_Active // Compute_Priority: High
        </p>
      </div>
    </div>
  );
};
