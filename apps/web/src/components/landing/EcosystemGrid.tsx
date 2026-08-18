'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clapperboard, ShoppingBag, ShieldCheck } from 'lucide-react';

export const EcosystemGrid = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Trade Card */}
        <BentoCard 
          span="md:col-span-8" 
          title="Trade_Cockpit" 
          desc="High-density market intelligence and execution terminal for Cross-Asset liquidity."
          icon={<TrendingUp className="text-cyan-400" />}
          gradient="from-cyan-500/20 to-transparent"
        />

        {/* Security Card */}
        <BentoCard 
          span="md:col-span-4" 
          title="Security_Facade" 
          desc="Real-time system integrity and sentinel cell monitoring."
          icon={<ShieldCheck className="text-green-400" />}
          gradient="from-green-500/10 to-transparent"
        />

        {/* Media Card */}
        <BentoCard 
          span="md:col-span-4" 
          title="Media_Studio" 
          desc="Omnichannel AI production pipeline from idea to global reach."
          icon={<Clapperboard className="text-violet-400" />}
          gradient="from-violet-500/10 to-transparent"
        />

        {/* Market Card */}
        <BentoCard 
          span="md:col-span-8" 
          title="Market_Hub" 
          desc="Hybrid procurement bridge connecting Alibaba sourcing to Shopify storefronts."
          icon={<ShoppingBag className="text-blue-400" />}
          gradient="from-blue-500/20 to-transparent"
        />

      </div>
    </section>
  );
};

const BentoCard = ({ span, title, desc, icon, gradient }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`${span} group relative p-8 bg-[#050505] border border-white/5 rounded-3xl overflow-hidden`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold tracking-tight mb-2 uppercase font-mono">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed font-light">{desc}</p>
    </div>
    <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all">
       <div className="text-[10px] font-mono text-cyan-400 tracking-[0.2em]">ENTER_ENV →</div>
    </div>
  </motion.div>
);
