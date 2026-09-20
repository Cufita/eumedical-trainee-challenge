import type { PatientCareSlide as PatientCareSlideData } from "./patientCareSlides";

interface PatientCareAltSlideProps {
  slide: PatientCareSlideData;
  index: number;
  reverse: boolean;
}

export function PatientCareAltSlide({ slide, index, reverse }: PatientCareAltSlideProps) {
  return (
    <div
      className={`flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full overflow-hidden rounded-[28px] bg-white lg:w-[60%]">
        <video
          className="aspect-[1154/578] w-full object-cover object-center"
          src={slide.video}
          poster={slide.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      </div>
      <div className="w-full text-center lg:w-[40%] lg:text-left">
        <span className="font-display text-[13px] tracking-[.08em] text-sage-deep">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.15] text-navy">{slide.title}</h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-[15.5px] leading-[1.62] text-[#4a5f6b] lg:mx-0">
          {slide.description}
        </p>
      </div>
    </div>
  );
}
