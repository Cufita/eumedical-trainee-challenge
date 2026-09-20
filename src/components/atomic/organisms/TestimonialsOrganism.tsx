import { Container } from "../../shared/Container";
import { TestimonialCarousel } from "../molecules/TestimonialCarousel";

export function TestimonialsOrganism() {
  return (
    <section id="eu-testimonios" className="bg-[#f7f7f4] px-(--edge) py-24">
      <Container>
        <TestimonialCarousel />
      </Container>
    </section>
  );
}
