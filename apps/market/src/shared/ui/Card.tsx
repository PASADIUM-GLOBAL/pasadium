import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <article className={`card ${className}`}>
      {children}
    </article>
  );
}
