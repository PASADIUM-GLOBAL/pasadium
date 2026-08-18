import React from 'react';
import { PublicNav } from '../components/shared/PublicNav';
import { Hero } from '../components/landing/Hero';
import { EcosystemGrid } from '../components/landing/EcosystemGrid';
import { Footer } from '../components/shared/Footer';
import { AuroraPulse } from '@pasadium/ui';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <AuroraPulse opacity={0.15} color="#6B35FF" />
      
      <PublicNav />

      <main>
        <Hero />
        <EcosystemGrid />
      </main>

      <Footer />
    </div>
  );
}
