import React from 'react';

export function PasadiumLogo({ size = 'medium', color = 'primary' }: { size?: 'small' | 'medium' | 'large', color?: 'primary' | 'white' }) {
  const dimensions = {
    small: '24px',
    medium: '48px',
    large: '80px'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg 
        width={dimensions[size]} 
        height={dimensions[size]} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20 30C40 20 60 50 80 30M20 50C40 40 60 70 80 50M20 70C40 60 60 90 80 70" 
          stroke={color === 'primary' ? 'url(#grad)' : 'white'} 
          strokeWidth="8" 
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="50%" stopColor="#0070f3" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ 
        fontWeight: 'bold', 
        letterSpacing: '2px', 
        fontSize: size === 'large' ? '1.5rem' : '1rem',
        color: 'var(--color-text-primary)' 
      }}>
        PASADIUM
      </span>
    </div>
  );
}
