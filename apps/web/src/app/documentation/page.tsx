import { PageHeader } from "@shared/ui";
import { Container } from "@shared/ui";


export default function DocumentationPage() {
  return (
    <main>
      <PageHeader
        eyebrow="DOCUMENTATION"
        title="PASADIUM documentation."
        description="Documentation for platform capabilities, products, services, and developer resources."
      />


      <section>
        <Container>
          <h2>Documentation is coming together.</h2>


          <p>
            Public documentation will provide information about PASADIUM
            products, supported capabilities, and developer resources.
          </p>
        </Container>
      </section>
    </main>
  );
}
