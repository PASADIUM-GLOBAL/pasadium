import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { PublicNav } from '../../components/shared/PublicNav';
import { Footer } from '../../components/shared/Footer';
import { AuroraPulse } from '@pasadium/ui';

export const DOCS_STRUCTURE = {
  'STRATUM_0': 'PASADIUM_IDENTITY',
  'STRATUM_1': 'EXPERIENCE_WEB_SHELL',
  'STRATUM_2': 'BRANDOS_SERVICE_FABRIC',
  'STRATUM_3': 'PRODUCT_MICRO_APPS',
  'STRATUM_4': 'COMMERCE_MARKET_FABRIC',
  'STRATUM_5': 'MEDIA_CREATOR_FABRIC',
  'STRATUM_6': 'CUSTOMER_BUSINESS_SERVICES',
  'STRATUM_7': 'ADMINISTRATION_TRUST_SUPPORT',
  'STRATUM_8': 'POLYMATH_OBSERVATORY',
  'STRATUM_9': 'INFRASTRUCTURE_CONTROL'
};

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-cyan-500/30">
      <AuroraPulse opacity={0.1} color="#6B35FF" />
      <PublicNav />

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <BookOpen className="text-cyan-400" size={32} />
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Technical_Documentation</h1>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Sovereign_Architecture_v1.0</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(DOCS_STRUCTURE).map(([stratum, title]) => (
            <div 
              key={stratum}
              className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono text-white/30 w-20">{stratum}</span>
                <span className="text-lg font-medium tracking-tight group-hover:text-cyan-400 transition-colors">{title}</span>
              </div>
              <ChevronRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
