import { PageHeader } from "@shared/ui";
import { Container } from "@shared/ui";


export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="ABOUT PASADIUM"
        title="Building connected digital experiences."
        description="PASADIUM is a global digital platform bringing together technology, intelligence, media, commerce, and digital services."
      />


      <section>
        <Container>
          <h2>Our approach</h2>


          <p>
            PASADIUM is designed as a connected platform rather than a
            collection of unrelated products. Specialized services can
            operate independently while sharing a common foundation.
          </p>
        </Container>
      </section>
    </main>
  );
}
