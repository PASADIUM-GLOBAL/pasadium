import { PageHeader } from "ui";
import { Container } from "ui";

export default function SecurityPage() {
  return (
    <main>
      <PageHeader 
        eyebrow="SECURITY" 
        title="Security is part of the platform foundation." 
        description="PASADIUM is designed with security, reliability, access control, monitoring, and maintenance as core platform concerns." 
      />
      <section style={{ padding: '60px 0' }}>
        <Container>
          <h2>Security principles</h2>
          <p>Access is controlled according to identity, authorization, and operational requirements.</p>
        </Container>
      </section>
    </main>
  );
}
