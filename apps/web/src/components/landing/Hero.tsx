'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">System_Status: Nominal</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Sovereign Digital <br /> Operations.
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed mb-10 font-light">
          A unified ecosystem for high-frequency trading, AI-driven media orchestration, and global commerce. Built on the 
          <span className="text-cyan-400 font-mono text-sm ml-1 uppercase">Polymath_Intelligence_Substrate</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/login"
            className="group px-8 py-4 bg-white text-black rounded-full font-bold text-sm flex items-center gap-2 hover:bg-cyan-400 transition-all"
          >
            Launch Workstation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/documentation"
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-sm hover:bg-white/10 transition-all uppercase tracking-widest"
          >
            View Documentation
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
