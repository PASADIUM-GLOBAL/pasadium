import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, className = '', variant = 'primary' }: ButtonProps) {
  const btnClass = `button button-${variant} ${className}`;
  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
}
