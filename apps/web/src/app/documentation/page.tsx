import { PageHeader } from "ui";
import { Container } from "ui";

export default function DocsPage() {
  return (
    <main>
      <PageHeader 
        eyebrow="DOCUMENTATION" 
        title="PASADIUM documentation." 
        description="Documentation for platform capabilities, products, services, and developer resources." 
      />
      <section style={{ padding: '60px 0' }}>
        <Container>
          <h2>Documentation is coming together.</h2>
          <p>Public documentation will provide information about PASADIUM products.</p>
        </Container>
      </section>
    </main>
  );
}
