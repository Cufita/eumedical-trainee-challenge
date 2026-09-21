import type { PatientCareSlide as PatientCareSlideData } from "./patientCareSlides";

interface PatientCareCaptionProps {
  slide: PatientCareSlideData;
  index: number;
  /** Same signed distance as PatientCareVideoCard's `local` for the
   * matching card — kept in sync so the caption swaps right as its card
   * becomes the front one. */
  local: number;
}

export function PatientCareCaption({ slide, index, local }: PatientCareCaptionProps) {
  const distance = Math.min(Math.abs(local), 1);
  const opacity = Math.max(0, 1 - distance * 2.6);
  const translateY = -local * 18;
  const active = Math.abs(local) < 0.05;

  return (
    <div
      className="[grid-area:1/1]"
      style={{ opacity, transform: `translateY(${translateY}px)`, pointerEvents: active ? "auto" : "none" }}
      aria-hidden={active ? undefined : true}
    >
      <span className="font-display text-[40px] leading-none tracking-[.02em] text-amber">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] text-white">{slide.title}</h3>
      <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-[#c4d5df]">{slide.description}</p>
    </div>
  );
}
