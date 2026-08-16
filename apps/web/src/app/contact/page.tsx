import { PageHeader } from "@pasadium/ui";
import { Container } from "@pasadium/ui";


export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="CONTACT"
        title="Connect with PASADIUM."
        description="For general inquiries, partnerships, support, and other platform-related matters."
      />


      <section>
        <Container>
          <p>
            Contact channels will be published here as PASADIUM services
            become available.
          </p>
        </Container>
      </section>
    </main>
  );
}
