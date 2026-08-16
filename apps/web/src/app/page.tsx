import { Container, Button, Card } from "@pasadium/ui";
import { brand } from "@pasadium/config";
import { PasadiumLogo } from "@pasadium/ui";

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-main)', color: 'var(--color-text-primary)', minHeight: '100vh' }}>
      <section className="hero" style={{ padding: '120px 0', textAlign: 'center' }}>
        <Container>
          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
            <PasadiumLogo size="large" />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 20px 0', letterSpacing: '-1px' }}>
            PASADIUM GLOBAL
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.4' }}>
            Intelligence. Infrastructure. Execution.
            <br />
            A unified digital operating environment for building, securing, operating and scaling intelligent systems.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Button variant="primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>Explore Platform</Button>
            <Button variant="secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>Enter PASADIUM</Button>
          </div>
        </Container>
      </section>

      <section className="platform" style={{ padding: '100px 0', backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>One platform. Multiple operating environments.</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>One identity. One security boundary.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <Card>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Trade</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Digital tools and services for trading, markets, analytics, and intelligence.</p>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Media</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Content creation, media management, and social capabilities.</p>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Marketplace l</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>A digital marketplace for products, services, and opportunities.</p>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Security</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Security, administration, and platform maintenance.</p>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
