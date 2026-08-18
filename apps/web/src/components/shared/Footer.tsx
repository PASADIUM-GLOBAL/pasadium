import React from 'react';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-[#000000]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={24} className="text-white" />
            <span className="text-white font-bold tracking-tighter text-2xl">PASADIUM</span>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">
            The sovereign digital ecosystem for global operations. Orchestrating the convergence of 
            capital, attention, and commerce through the Polymath Intelligence Substrate.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Ecosystem</h4>
          <ul className="space-y-4">
            <li><Link href="/platform" className="text-sm text-white/40 hover:text-white transition-colors">Capabilities</Link></li>
            <li><Link href="/documentation" className="text-sm text-white/40 hover:text-white transition-colors">Technical Docs</Link></li>
            <li><Link href="/security" className="text-sm text-white/40 hover:text-white transition-colors">System Integrity</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-sm text-white/40 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-sm text-white/40 hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/legal" className="text-sm text-white/40 hover:text-white transition-colors">Legal</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          © {new Date().getFullYear()} PASADIUM SYSTEM. ALL RIGHTS RESERVED.
        </span>
        <div className="flex items-center gap-6">
           <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Sovereign_Digital_Organism_v1.0</span>
        </div>
      </div>
    </footer>
  );
};
