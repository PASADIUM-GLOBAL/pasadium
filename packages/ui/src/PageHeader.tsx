import React from 'react';
import { Container } from './Container';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section style={{ padding: '80px 0', borderBottom: '1px solid var(--color-border)' }}>
      <Container>
        <p style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>{eyebrow}</p>
        <h1 style={{ margin: '10px 0' }}>{title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '720px' }}>{description}</p>
      </Container>
    </section>
  );
}
