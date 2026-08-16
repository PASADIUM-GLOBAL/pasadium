import React from 'react';

interface MetricProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function Metric({ label, value, change, trend }: MetricProps) {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'var(--color-bg-elevated)', 
      borderRadius: '8px', 
      border: '1px solid var(--color-border)' 
    }}>
      <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{value}</div>
      {change && (
        <div style={{ 
          fontSize: '0.8rem', 
          color: trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : 'var(--color-text-secondary)',
          marginTop: '4px'
        }}>
          {change}
        </div>
      )}
    </div>
  );
}
