import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Button({ children, onClick, className = '', variant = 'primary', disabled = false, style }: ButtonProps) {
  const btnClass = `button button-${variant} ${className}`;
  return (
    <button onClick={onClick} className={btnClass} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
