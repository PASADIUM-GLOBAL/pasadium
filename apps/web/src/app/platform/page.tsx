import { PageHeader, Card } from "ui";
import { Container } from "ui";

const capabilities = [
  { title: "Trade", description: "Digital tools and services for trading, markets, analytics, and intelligence." },
  { title: "Media", description: "Media creation, management, publishing, and social capabilities." },
  { title: "Marketplace", description: "A digital environment for discovering and exchanging products and services." },
  { title: "Security", description: "Security, administration, monitoring, and maintenance capabilities." },
];

export default function PlatformPage() {
  return (
    <main>
      <PageHeader 
        eyebrow="PLATFORM" 
        title="One foundation. Specialized capabilities." 
        description="Explore the major capabilities that make up the PASADIUM platform." 
      />
      <section style={{ padding: '60px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {capabilities.map(cap => (
              <Card key={cap.title}>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
