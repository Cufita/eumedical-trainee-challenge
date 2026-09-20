import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "../../shared/Container";
import { SectionEyebrow } from "../atoms/SectionEyebrow";
import { ProcessSteps } from "../molecules/ProcessSteps";
import { PatientAppShowcase } from "../molecules/PatientAppShowcase";
import { ShowcaseLightbox } from "../molecules/ShowcaseLightbox";
import { howItWorksSteps } from "../molecules/howItWorksSteps";

const STEP_DURATION = 5200;

export function HowItWorksOrganism() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const stepStartRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    stepStartRef.current = performance.now();
    pausedAtRef.current = null;
    setProgress(0);
    setActive(index);
  }, []);

  // Shift the running step's clock forward by however long it was paused,
  // so resuming continues the bar from where it froze instead of jumping.
  useEffect(() => {
    if (paused) {
      pausedAtRef.current = performance.now();
      return;
    }
    if (pausedAtRef.current !== null) {
      stepStartRef.current += performance.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }
  }, [paused]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }
    if (paused) return;

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - stepStartRef.current;
      const next = Math.min(elapsed / STEP_DURATION, 1);
      setProgress(next);
      if (next >= 1) {
        stepStartRef.current = now;
        setActive((current) => (current + 1) % howItWorksSteps.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused]);

  return (
    <section id="eu-como" className="bg-[#f7f7f4] px-(--edge) py-20 md:py-24">
      <Container className="grid gap-10 md:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <PatientAppShowcase
          steps={howItWorksSteps}
          active={active}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onExpand={() => {
            setPaused(true);
            setLightboxOpen(true);
          }}
        />
        <div>
          <SectionEyebrow>Cómo funciona</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.7rem,3.1vw,2.375rem)] leading-[1.14]">
            De la primera llamada a la resolución
          </h2>
          <ProcessSteps
            steps={howItWorksSteps}
            active={active}
            progress={progress}
            onSelect={goTo}
            onActiveHoverStart={() => setPaused(true)}
            onActiveHoverEnd={() => setPaused(false)}
          />
        </div>
      </Container>

      {lightboxOpen && (
        <ShowcaseLightbox
          steps={howItWorksSteps}
          active={active}
          onSelect={goTo}
          onClose={() => {
            setLightboxOpen(false);
            setPaused(false);
          }}
        />
      )}
    </section>
  );
}
