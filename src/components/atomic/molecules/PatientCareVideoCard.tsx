import { useEffect, useRef } from "react";
import type { PatientCareSlide as PatientCareSlideData } from "./patientCareSlides";

// How much of the next card peeks out below the front one, per layer back.
const PEEK_PX = 26;
const MAX_PEEK_LAYERS = 2;
// Cards waiting behind start slightly smaller and grow to full size as the
// scroll brings them up to the front.
const SCALE_STEP = 0.055;
// Exiting cards must clear well past the tallest card size before they're
// considered gone — see PatientCareOrganism's card box sizing.
const EXIT_DISTANCE_PX = 1200;

interface PatientCareVideoCardProps {
  slide: PatientCareSlideData;
  /**
   * 0 = this card is the active/front card. Positive = it already had its
   * turn and is leaving (slides straight up, fully opaque, until it clears
   * the frame). Negative = it hasn't arrived yet and sits stacked behind
   * the front card — fully opaque, just offset down enough that only a
   * thin sliver of it peeks out below the front card's bottom edge.
   */
  local: number;
}

export function PatientCareVideoCard({ slide, local }: PatientCareVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const exiting = Math.max(local, 0);
  const back = Math.max(-local, 0);

  // No opacity change at all: the front card fully covers whatever sits
  // behind it, so cards behind never look transparent/ghosted — only the
  // small peek sliver below the front card's edge is ever visible of them.
  const cappedBack = Math.min(back, MAX_PEEK_LAYERS);
  const translateY = exiting > 0 ? -exiting * EXIT_DISTANCE_PX : cappedBack * PEEK_PX;
  const scale = exiting > 0 ? 1 : 1 - cappedBack * SCALE_STEP;
  const zIndex = Math.round((local + 3) * 10);
  const active = Math.abs(local) < 0.05;
  const shouldPlay = local < 1 && local > -2.3;

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (shouldPlay) {
      node.play().catch(() => {});
    } else {
      node.pause();
    }
  }, [shouldPlay]);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[20px] bg-[#f7f7f4]"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "bottom center",
        zIndex,
        pointerEvents: active ? "auto" : "none",
      }}
      aria-hidden={active ? undefined : true}
    >
      {/* Aspect ratio matches the cropped footage (1154×578) exactly so
          object-cover never has to trim the frame, and object-position
          keeps the on-screen UI mockup centered either way. */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center"
        src={slide.video}
        poster={slide.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
    </div>
  );
}
