import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const PublicNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-cyan-400 transition-colors">
            <Shield size={18} className="text-black" />
          </div>
          <span className="text-white font-bold tracking-tighter text-xl">PASADIUM</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/platform" className="text-sm text-white/50 hover:text-white transition-colors font-mono uppercase tracking-widest">Platform</Link>
          <Link href="/documentation" className="text-sm text-white/50 hover:text-white transition-colors font-mono uppercase tracking-widest">Documentation</Link>
          <Link href="/security" className="text-sm text-white/50 hover:text-white transition-colors font-mono uppercase tracking-widest">Security</Link>
        </div>

        <Link 
          href="/login" 
          className="px-5 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all"
        >
          Enter_Workstation
        </Link>
      </div>
    </nav>
  );
};
