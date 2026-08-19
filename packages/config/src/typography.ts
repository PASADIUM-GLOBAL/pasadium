export const TYPOGRAPHY = {
  families: {
    display: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, SFMono-Regular, Menlo, monospace',
    body: 'Inter, system-ui, sans-serif',
  },
  scales: {
    display: {
      xl: 'clamp(4rem, 10vw, 8rem)',
      lg: 'clamp(3rem, 8vw, 6rem)',
    },
    heading: {
      h1: 'clamp(2rem, 5vw, 3rem)',
      h2: 'clamp(1.5rem, 4vw, 2.25rem)',
      h3: '1.25rem',
      h4: '1rem',
    },
    body: {
      large: '1.125rem',
      normal: '1rem',
      small: '0.875rem',
      xs: '0.75rem',
    },
    telemetry: {
      mono: '0.6875rem',
      meta: '0.625rem',
    },
  },
  weights: {
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
    light: '300',
  },
} as const;
