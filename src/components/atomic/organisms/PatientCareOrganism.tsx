import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../../shared/Container";
import { SectionEyebrow } from "../atoms/SectionEyebrow";
import { PatientCareCaption } from "../molecules/PatientCareCaption";
import { PatientCareVideoCard } from "../molecules/PatientCareVideoCard";
import { patientCareSlideAssets, type PatientCareSlide } from "../molecules/patientCareSlides";

// How much extra scroll (px) each slide transition consumes once pinned.
// Kept generous so a single scroll gesture only nudges the animation a
// little, giving the text time to sit fully legible before it starts
// fading for the next slide.
const SLIDE_SCROLL_DISTANCE = 1400;

export function PatientCareOrganism() {
  const { t } = useTranslation();
  const patientCareSlides: PatientCareSlide[] = useMemo(
    () =>
      patientCareSlideAssets.map((asset) => ({
        ...asset,
        title: t(`patientCare.slides.${asset.id}.title`),
        description: t(`patientCare.slides.${asset.id}.description`),
      })),
    [t],
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Continuous scroll-scrub: the section pins while the user scrolls through
  // an extended-height wrapper, and progress tracks scroll distance 1:1.
  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let ticking = false;
    let inView = false;

    const measure = () => {
      ticking = false;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped * (patientCareSlides.length - 1));
    };

    const onScroll = () => {
      if (!inView || ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) measure();
      },
      { threshold: 0 },
    );
    observer.observe(wrapper);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, patientCareSlides.length]);

  const wrapperHeight = reducedMotion
    ? undefined
    : `calc(100vh + ${(patientCareSlides.length - 1) * SLIDE_SCROLL_DISTANCE}px)`;

  return (
    <section id="eu-cuidado-pacientes" className="bg-navy px-(--edge) py-20 text-white md:py-24">
      <Container>
        <div className="mx-auto max-w-[40em] text-center">
          <SectionEyebrow light>{t("patientCare.eyebrow")}</SectionEyebrow>
          <h2 className="mx-auto mt-3 max-w-[18em] text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.14] text-white">
            {t("patientCare.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-[1.62] text-[#c4d5df]">
            {t("patientCare.description")}
          </p>
        </div>
      </Container>

      {/* Desktop: pinned, scroll-scrubbed card stack, centered in the
          section. The video stays clean (no text overlay) — the caption
          sits beside it in its own column and crossfades to match whichever
          card is currently in front. Text lives to the left instead of
          below the video: that keeps it clear of the peeking "next" card,
          which sticks out below the front card's bottom edge as it waits
          its turn, and puts the freed-up width to use. The sticky box is a
          full viewport tall so the (smaller) content is truly centered in
          the middle of the screen — by the time it's pinned, the heading
          above has already scrolled away, and exiting cards get the full
          viewport height of travel room before the overflow clips them,
          instead of hitting a shorter box's edge. */}
      {!reducedMotion && (
        <div ref={wrapperRef} className="relative mt-10 hidden lg:block" style={{ height: wrapperHeight }}>
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            <Container className="flex w-full items-center gap-10 lg:gap-12">
              <div className="relative grid min-h-[220px] w-full max-w-[300px] flex-none">
                {patientCareSlides.map((slide, index) => (
                  <PatientCareCaption key={slide.id} slide={slide} index={index} local={progress - index} />
                ))}
              </div>
              {/* Fixed-size stack box: cards are absolutely positioned
                  inside it so a peeking "next" card is truly clipped to a
                  thin sliver at the bottom edge, never a transparent
                  ghost. */}
              <div className="relative aspect-[1154/578] w-full max-w-[820px] flex-1">
                {patientCareSlides.map((slide, index) => (
                  <PatientCareVideoCard key={slide.id} slide={slide} local={progress - index} />
                ))}
              </div>
            </Container>
          </div>
        </div>
      )}

      <div className={`mt-14 flex flex-col gap-16 ${reducedMotion ? "" : "lg:hidden"}`}>
        {patientCareSlides.map((slide, index) => (
          <MobilePatientCareSlide key={slide.id} slide={slide} index={index} />
        ))}
      </div>
    </section>
  );
}

function MobilePatientCareSlide({
  slide,
  index,
}: {
  slide: PatientCareSlide;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="patient-care-fade" data-visible={visible}>
      <div className="relative aspect-[1154/578] w-full">
        <PatientCareVideoCard slide={slide} local={0} />
      </div>
      <div className="mt-6 text-center">
        <span className="font-display text-[34px] leading-none tracking-[.02em] text-amber">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2.5 text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.15] text-white">{slide.title}</h3>
        <p className="mx-auto mt-2 max-w-[46ch] text-[15px] leading-[1.5] text-[#c4d5df]">{slide.description}</p>
      </div>
    </div>
  );
}
