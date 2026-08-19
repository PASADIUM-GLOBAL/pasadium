import React from 'react';
import { Cpu, Activity, Zap, Shield } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

interface StatusMetric {
  label: string;
  value: string;
  status: 'nominal' | 'degraded' | 'critical';
  icon: React.ReactNode;
}

const METRICS: StatusMetric[] = [
  { label: 'UHI', value: '98.7%', status: 'nominal', icon: <Cpu size={10}/> },
  { label: 'LATENCY', value: '42ms', status: 'nominal', icon: <Zap size={10}/> },
  { label: 'SYNC', value: '100%', status: 'nominal', icon: <Activity size={10}/> },
  { label: 'SEC', value: 'ACTIVE', status: 'nominal', icon: <Shield size={10}/> },
];

export const SystemStatus = () => {
  return (
    <div className="flex items-center gap-6 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        System_Nominal
      </div>
      <div className="h-3 w-[1px] bg-white/10" />
      <div className="flex items-center gap-4">
        {METRICS.map(metric => (
          <div key={metric.label} className="flex items-center gap-1.5">
            <span style={{ color: BRAND_COLORS.border.normal }}>{metric.icon}</span>
            <span className="text-[10px] font-mono text-white/40 uppercase">{metric.label}:</span>
            <span className="text-[10px] font-mono font-bold text-white/80">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
