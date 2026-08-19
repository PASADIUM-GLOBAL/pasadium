export const BRAND_COLORS = {
  background: {
    base: '#020408',
    elevated: '#050810',
    surface: '#0A0C12',
    glass: 'rgba(10, 12, 18, 0.72)',
    hover: '#101521',
  },
  accent: {
    cyan: '#00D9FF',
    blue: '#1677FF',
    violet: '#6B35FF',
    magenta: '#C52CFF',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    muted: '#475569',
    inverse: '#020408',
  },
  border: {
    subtle: 'rgba(255,255,255,0.06)',
    normal: 'rgba(255,255,255,0.10)',
    strong: 'rgba(255,255,255,0.16)',
  },
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
    operational: '#00D9FF',
  },
} as const;
