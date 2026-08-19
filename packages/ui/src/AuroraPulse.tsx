'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AuroraPulseProps {
  opacity?: number;
  color?: string;
  intensity?: number;
}

export const AuroraPulse = ({ opacity = 0.1, color = '#00D9FF', intensity = 1 }: AuroraPulseProps) => {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 1.5, opacity],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        transform: `scale(${intensity})`
      }}
    />
  );
};
