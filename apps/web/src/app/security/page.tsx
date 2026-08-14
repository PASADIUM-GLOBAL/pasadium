import { PageHeader } from "@shared/ui";
import { Container } from "@shared/ui";


export default function SecurityPage() {
  return (
    <main>
      <PageHeader
        eyebrow="SECURITY"
        title="Security is part of the platform foundation."
        description="PASADIUM is designed with security, reliability, access control, monitoring, and maintenance as core platform concerns."
      />


      <section>
        <Container>
          <h2>Security principles</h2>


          <p>
            Access is controlled according to identity, authorization,
            and operational requirements. Platform services are designed
            to minimize unnecessary exposure and maintain clear boundaries
            between public applications and internal systems.
          </p>
        </Container>
      </section>
    </main>
  );
}
