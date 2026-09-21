import { Container } from "../atoms/Container";
import { TestimonialCarousel } from "../molecules/TestimonialCarousel";

export function TestimonialsOrganism() {
  return (
    <section id="eu-testimonios" className="bg-cloud px-(--edge) py-24">
      <Container>
        <TestimonialCarousel />
      </Container>
    </section>
  );
}
