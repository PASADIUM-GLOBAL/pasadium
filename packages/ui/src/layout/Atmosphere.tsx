import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_COLORS } from '@pasadium/config';

export const Atmosphere = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" style={{ backgroundColor: BRAND_COLORS.background.base }}>
      {/* 1. Deep Nebula Glows (Cyan & Violet) */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-20" 
        style={{ backgroundColor: BRAND_COLORS.accent.cyan }} 
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-20" 
        style={{ backgroundColor: BRAND_COLORS.accent.violet }} 
      />
      <div 
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10" 
        style={{ backgroundColor: BRAND_COLORS.accent.blue }} 
      />

      {/* 2. Professional Starry Field */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 1px)', 
          backgroundSize: '48px 48px' 
        }} 
      />

      {/* 3. The SOVEREIGN WATERMARK (Your Logo) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
          src="/pasadium-logo.png" 
          alt="Sovereign Watermark" 
          className="w-[70%] max-w-5xl select-none"
          style={{ filter: 'blur(1px) contrast(1.1)' }}
        />
      </div>

      {/* 4. Scanning Line (Subtle "Active" feel) */}
      <motion.div 
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.1)]"
      />
    </div>
  );
};
