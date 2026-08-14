import { PageHeader, Card } from "@shared/ui";
import { Container } from "@shared/ui";


const capabilities = [
  {
    title: "Trade",
    description:
      "Digital tools and services for trading, markets, analytics, and intelligence.",
  },
  {
    title: "Media",
    description:
      "Media creation, management, publishing, and social capabilities.",
  },
  {
    title: "Marketplace",
    description:
      "A digital environment for discovering and exchanging products and services.",
  },
  {
    title: "Security",
    description:
      "Security, administration, monitoring, and maintenance capabilities.",
  },
];


export default function PlatformPage() {
  return (
    <main>
      <PageHeader
        eyebrow="PLATFORM"
        title="One foundation. Specialized capabilities."
        description="Explore the major capabilities that make up the PASADIUM platform."
      />


      <section>
        <Container>
          <div className="platform-grid">
            {capabilities.map((item) => (
              <Card key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
