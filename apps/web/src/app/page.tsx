import { Container, Button, Card } from "@shared/ui";
import { brand } from "@shared/config";

export default function Home() {
  return (
    <main>
      <section className="hero" style={{ padding: '100px 0', textAlign: 'center' }}>
        <Container>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>{brand.name} GLOBAL</p>
          <h1 style={{ margin: '20px 0' }}>Building the digital infrastructure for what comes next.</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto 40px' }}>
            {brand.description}
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Button variant="primary">Explore Platform</Button>
            <Button variant="secondary">About PASADIUM</Button>
          </div>
        </Container>
      </section>

      <section className="platform" style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>THE PLATFORM</p>
            <h2>One platform. Multiple capabilities.</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <Card>
              <h3>Trade</h3>
              <p>Digital trading tools, market intelligence, and analytics.</p>
            </Card>
            <Card>
              <h3>Media</h3>
              <p>Content creation, media management, and social capabilities.</p>
            </Card>
            <Card>
              <h3>Marketplace</h3>
              <p>A digital marketplace for products, services, and opportunities.</p>
            </Card>
            <Card>
              <h3>Security</h3>
              <p>Security, administration, and platform maintenance.</p>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
