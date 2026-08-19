import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Globe, Shield, Zap, LayoutGrid } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

export interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
}

export const CommandPalette = ({ isOpen, onClose, items }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      />

      {/* Palette Surface */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-[#0A0C12] border rounded-2xl shadow-2xl overflow-hidden"
        style={{ borderColor: BRAND_COLORS.border.normal }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-5 border-b" style={{ borderColor: BRAND_COLORS.border.subtle }}>
          <Search size={20} className="text-white/30" />
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search platform commands..." 
            className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/20 font-light"
          />
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
            <Command size={10} /> K
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[400px] overflow-y-auto p-3 custom-scrollbar">
          {filteredItems.length > 0 ? (
            <div className="space-y-1">
              {filteredItems.map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => { item.action(); onClose(); }}
                  className="w-full flex items-center gap-4 p-3 rounded-xl transition-all group hover:bg-white/5"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-all"
                       style={{ color: BRAND_COLORS.accent.cyan }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{item.label}</div>
                    <div className="text-xs text-white/40 font-light">{item.description}</div>
                  </div>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all text-white/20" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-white/20 font-light">No matching commands found in this stratum.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/40 border-t flex justify-between items-center" style={{ borderColor: BRAND_COLORS.border.subtle }}>
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">PASADIUM // OS_KERNEL_V2</span>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-white/20">ESC to close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
