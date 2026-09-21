import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, HeartHandshake, Headset, Star, Video, type LucideIcon } from "lucide-react";
import { ArrowIcon } from "../atoms/ArrowIcon";
import { Cross } from "../atoms/Cross";

type Direction = 1 | -1;

interface TestimonialData {
  id: string;
  name: string;
  photo: string;
  quote: string;
  source: string;
  rating: number;
  tag: string;
  icon: LucideIcon;
}

// Verbatim reviews published on eumedical.es's own testimonial slider
// (no reviewer names or per-review ratings are shown there — only the
// aggregate 4.9/5 already covered in TrustMetricsOrganism — so `name` here is
// an illustrative first name, not the real reviewer's; the small photo next
// to each is a placeholder headshot too). Quote/source/tag copy lives in
// src/i18n/locales under testimonials.items.<id> — kept verbatim in es.ts.
const testimonialAssets: Array<{
  id: string;
  name: string;
  photo: string;
  rating: number;
  icon: LucideIcon;
}> = [
  { id: "lucia", name: "Lucía Fernández", photo: "/testimonials/reviewer-patient.jpg", rating: 5, icon: Video },
  { id: "martin", name: "Martín Rodríguez", photo: "/testimonials/reviewer-travel.jpg", rating: 5, icon: Globe },
  { id: "sofia", name: "Sofía Herrera", photo: "/testimonials/reviewer-family.jpg", rating: 5, icon: HeartHandshake },
  { id: "valentina", name: "Valentina Duarte", photo: "/testimonials/reviewer-operations.jpg", rating: 5, icon: Headset },
];

const TRANSITION_MS = 640;
const AUTOPLAY_MS = 6000;

export function TestimonialCarousel() {
  const { t } = useTranslation();
  const testimonials: TestimonialData[] = useMemo(
    () =>
      testimonialAssets.map((asset) => ({
        ...asset,
        quote: t(`testimonials.items.${asset.id}.quote`),
        source: t(`testimonials.items.${asset.id}.source`),
        tag: t(`testimonials.items.${asset.id}.tag`),
      })),
    [t],
  );
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<{ index: number; direction: Direction } | null>(
    null,
  );
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const autoplayRef = useRef<number | undefined>(undefined);
  const cycleStartRef = useRef(0);
  const remainingRef = useRef(AUTOPLAY_MS);
  const total = testimonials.length;
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const goTo = (nextIndex: number, direction: Direction) => {
    if (nextIndex === index) return;
    window.clearTimeout(timeoutRef.current);
    setOutgoing({ index, direction });
    setIndex(nextIndex);
    timeoutRef.current = window.setTimeout(() => setOutgoing(null), TRANSITION_MS);
  };

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  // New slide: start a fresh full-length autoplay cycle (unless paused).
  useEffect(() => {
    remainingRef.current = AUTOPLAY_MS;
    if (isPaused || prefersReducedMotion) return;
    cycleStartRef.current = Date.now();
    autoplayRef.current = window.setTimeout(() => {
      goTo((index + 1) % total, 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(autoplayRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Pause/resume: freeze or continue the current cycle from where it left
  // off, instead of restarting it, so the dot fill and the timer stay synced.
  useEffect(() => {
    if (prefersReducedMotion) return;
    window.clearTimeout(autoplayRef.current);
    if (isPaused) {
      remainingRef.current = Math.max(AUTOPLAY_MS - (Date.now() - cycleStartRef.current), 0);
      return;
    }
    cycleStartRef.current = Date.now();
    autoplayRef.current = window.setTimeout(() => {
      goTo((index + 1) % total, 1);
    }, remainingRef.current);
    return () => window.clearTimeout(autoplayRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, prefersReducedMotion]);

  const current = testimonials[index];
  const enterFrom: Direction = outgoing ? outgoing.direction : 1;

  return (
    <div
      role="group"
      aria-roledescription={t("testimonials.ariaRoleDescription")}
      aria-label={t("testimonials.ariaLabel")}
      className="mx-auto max-w-[720px]"
      onFocus={(event) => {
        // Only pause for keyboard focus, not a mouse click landing on the
        // arrow buttons — a click shouldn't stall autoplay until the user
        // clicks elsewhere.
        if (event.target.matches(":focus-visible")) {
          setIsPaused(true);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="testimonial-stage">
        {testimonials.map((data) => (
          <div
            key={`size-${data.id}`}
            aria-hidden="true"
            className="testimonial-pane invisible pointer-events-none"
          >
            <TestimonialCard data={data} />
          </div>
        ))}
        {outgoing && (
          <div
            key={`out-${outgoing.index}`}
            aria-hidden="true"
            className={`testimonial-pane ${
              outgoing.direction === 1
                ? "testimonial-pane--exit-left"
                : "testimonial-pane--exit-right"
            }`}
          >
            <TestimonialCard data={testimonials[outgoing.index]} />
          </div>
        )}
        <div
          key={`in-${index}`}
          aria-live="polite"
          className={`testimonial-pane ${
            enterFrom === 1 ? "testimonial-pane--enter-right" : "testimonial-pane--enter-left"
          }`}
        >
          <TestimonialCard data={current} />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label={t("testimonials.previous")}
          onClick={() => goTo((index - 1 + total) % total, -1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-white"
        >
          <ArrowIcon direction="left" />
        </button>
        <div
          className="flex gap-2"
          aria-label={t("testimonials.paginationAriaLabel", { current: index + 1, total: testimonials.length })}
        >
          {testimonials.map((data, item) => (
            <button
              key={data.id}
              type="button"
              aria-label={t("testimonials.showTestimonial", { number: item + 1 })}
              aria-current={item === index}
              onClick={() => goTo(item, item > index ? 1 : -1)}
              className={`relative h-2 overflow-hidden rounded-full bg-navy/20 transition-[width] duration-300 ${
                item === index ? "w-7" : "w-2 hover:bg-navy/35"
              }`}
            >
              {item === index && (
                <span
                  key={`fill-${index}`}
                  aria-hidden="true"
                  className="testimonial-dot-fill"
                  style={{
                    animationDuration: `${AUTOPLAY_MS}ms`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={t("testimonials.next")}
          onClick={() => goTo((index + 1) % total, 1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-white"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ data }: { data: TestimonialData }) {
  const { t } = useTranslation();
  const Icon = data.icon;
  return (
    <div className="flex flex-col items-center text-center">
      <Cross />
      <blockquote className="mt-6 max-w-[58ch] font-display text-lg font-medium leading-[1.5] text-navy md:text-xl">
        {data.quote}
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={data.photo}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-11 shrink-0 rounded-full border border-navy/10 object-cover"
        />
        <div className="text-left">
          <p className="font-display text-sm font-medium text-navy">{data.name}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <div
              className="flex gap-0.5 text-gold"
              role="img"
              aria-label={t("trustMetrics.ratingAriaLabel", { rating: data.rating })}
            >
              {Array.from({ length: data.rating }).map((_, item) => (
                <Star key={item} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-xs text-navy/80">{data.source}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-navy">
        <Icon size={14} className="text-sage-deep" aria-hidden="true" />
        {data.tag}
      </div>
    </div>
  );
}
