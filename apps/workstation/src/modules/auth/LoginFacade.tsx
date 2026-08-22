'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldLock, ArrowRight, Fingerprint } from 'lucide-react';
import { AuroraPulse } from '@pasadium/ui';
import { useAuth } from '../../context/AuthContext';

export const LoginFacade = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, bridge } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    
    try {
      const response = await bridge.auth.login({ username, password });
      
      // Response is { data: { token, user } }
      const { token } = response;
      
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <AuroraPulse opacity={0.2} color="#00D9FF" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 bg-[#050505] border border-white/5 rounded-3xl z-10 backdrop-blur-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <ShieldLock size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Identity_Boundary</h2>
          <p className="text-sm text-white/30 font-mono mt-2 tracking-widest">PASADIUM // SOVEREIGN_ACCESS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-white/20 ml-2 uppercase">Subject_Identifier</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all font-mono text-sm"
              placeholder="USERNAME"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-white/20 ml-2 uppercase">Authority_Secret</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all font-mono text-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full mt-6 py-4 bg-white text-black rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all active:scale-[0.98]"
          >
            {loading ? 'VERIFYING...' : (
              <>INITIALIZE_SESSION <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
           <div className="flex items-center gap-2 text-[9px] font-mono">
             <Fingerprint size={12} /> MFA_ENFORCED
           </div>
           <span className="text-[9px] font-mono uppercase tracking-widest">v1.0.4_AURORA</span>
        </div>
      </motion.div>
    </div>
  );
};
