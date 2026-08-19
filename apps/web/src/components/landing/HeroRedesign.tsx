import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

export const HeroRedesign = () => {
  return (
    <div className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Dynamic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md">
          <Shield size={14} style={{ color: BRAND_COLORS.accent.cyan }} />
          <span className="text-[11px] font-bold tracking-[0.2em] text-white/70 uppercase">
            Platform_V1.0_Identity_Verified
          </span>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
          Sovereign <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600">
            Intelligence.
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-lg text-white/40 font-light leading-relaxed mb-12">
          Orchestrating the convergence of global capital, media, and commerce through 
          one coherent digital operating surface.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-sm hover:bg-cyan-400 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center gap-3 active:scale-95">
            Initialize Workstation <ArrowRight size={18} />
          </button>
          <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white/80 hover:bg-white/10 transition-all">
            Technical Specification
          </button>
        </div>
      </motion.div>
    </div>
  );
};
