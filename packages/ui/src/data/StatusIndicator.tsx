import React from 'react';

interface StatusIndicatorProps {
  label: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'critical';
}

const STATUS_COLORS = {
  operational: '#22c55e',
  degraded: '#eab308',
  maintenance: '#3b82f6',
  critical: '#ef4444',
};

export function StatusIndicator({ label, status }: StatusIndicatorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
      <div style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        backgroundColor: STATUS_COLORS[status],
        boxShadow: `0 0 8px ${STATUS_COLORS[status]}`
      }} />
      <span style={{ color: 'var(--color-text-primary)' }}>{label}</span>
      <span style={{ color: 'var(--color-text-secondary)', marginLeft: '8px' }}>{status}</span>
    </div>
  );
}
