import React from 'react';
import { motion } from 'framer-motion';
import { NarrativeComposer } from './components/NarrativeComposer';
import { AssetFabricator } from './components/AssetFabricator';
import { OmnichannelMatrix } from './components/OmnichannelMatrix';
import { BRAND_COLORS } from '@pasadium/config';

export const MediaModule = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="h-full w-full grid grid-cols-12 gap-8 p-2"
    >
      {/* 1. THE SEED: Narrative Composer */}
      <div className="col-span-4 rounded-[40px] p-8 shadow-2xl relative overflow-hidden border" 
           style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: BRAND_COLORS.border.subtle }}>
        <div className="absolute top-0 left-0 w-full h-1 opacity-20" 
             style={{ backgroundColor: `linear-gradient(to right, transparent, ${BRAND_COLORS.accent.cyan}, transparent)` }} />
        <NarrativeComposer />
      </div>

      {/* 2. THE FORGE: Asset Fabricator */}
      <div className="col-span-5 rounded-[40px] p-8 relative overflow-hidden group border" 
           style={{ backgroundColor: 'rgba(255,255,255,0.01)', borderColor: BRAND_COLORS.border.subtle }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 blur-[120px] pointer-events-none transition-all duration-1000 opacity-20 group-hover:opacity-30" 
             style={{ backgroundColor: BRAND_COLORS.accent.violet }} />
        <AssetFabricator />
      </div>

      {/* 3. THE REACH: Omnichannel Matrix */}
      <div className="col-span-3 flex flex-col gap-8">
        <div className="flex-1 rounded-[32px] p-8 relative overflow-hidden border" 
             style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: BRAND_COLORS.border.subtle }}>
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ background: `linear-gradient(to bottom, ${BRAND_COLORS.accent.blue}, transparent)` }} />
           <OmnichannelMatrix />
        </div>
      </div>
    </motion.div>
  );
};
