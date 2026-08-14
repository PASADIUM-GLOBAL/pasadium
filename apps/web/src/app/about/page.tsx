import { PageHeader } from "ui";
import { Container } from "ui";

export default function AboutPage() {
  return (
    <main>
      <PageHeader 
        eyebrow="ABOUT PASADIUM" 
        title="Building connected digital experiences." 
        description="PASADIUM is a global digital platform bringing together technology, intelligence, media, commerce, and digital services." 
      />
      <section style={{ padding: '60px 0' }}>
        <Container>
          <h2>Our approach</h2>
          <p>PASADIUM is designed as a connected platform rather than a collection of unrelated products.</p>
        </Container>
      </section>
    </main>
  );
}
