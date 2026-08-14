import { PageHeader } from "ui";
import { Container } from "ui";

export default function ContactPage() {
  return (
    <main>
      <PageHeader 
        eyebrow="CONTACT" 
        title="Connect with PASADIUM." 
        description="For general inquiries, partnerships, support, and other platform-related matters." 
      />
      <section style={{ padding: '60px 0' }}>
        <Container>
          <p>Contact channels will be published here as PASADIUM services become available.</p>
        </Container>
      </section>
    </main>
  );
}
