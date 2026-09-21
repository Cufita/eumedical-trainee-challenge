import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Cross } from "../../shared/Cross";
import type { HowItWorksStep } from "./howItWorksSteps";

interface ShowcaseLightboxProps {
  steps: HowItWorksStep[];
  active: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function ShowcaseLightbox({ steps, active, onSelect, onClose }: ShowcaseLightboxProps) {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const step = steps[active];

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onSelect((active + 1) % steps.length);
      if (event.key === "ArrowLeft") onSelect((active - 1 + steps.length) % steps.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onClose, onSelect, steps.length]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("howItWorks.expandedView", { label: step.imageLabel })}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="lightbox-backdrop absolute inset-0 bg-navy-2/85 backdrop-blur-sm"
      />

      <button
        type="button"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={t("howItWorks.closeExpanded")}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X size={20} />
      </button>

      <button
        type="button"
        onClick={() => onSelect((active - 1 + steps.length) % steps.length)}
        aria-label={t("howItWorks.previousStep")}
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => onSelect((active + 1) % steps.length)}
        aria-label={t("howItWorks.nextStep")}
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:right-6"
      >
        <ChevronRight size={22} />
      </button>

      <div className="lightbox-panel relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] bg-navy-2 shadow-[0_40px_100px_rgba(0,0,0,.5)]">
        <div className="flex shrink-0 items-center gap-2.5 px-5 py-3 text-[12px] text-[#9fb7c4]">
          <Cross variant="white" size={11} />
          <span className="tracking-[.01em]">
            app.eumedical.com<span className="text-[#5f7c8b]">/paciente</span>
          </span>
        </div>

        <div className="relative aspect-[2560/1680] w-full overflow-hidden bg-navy-2">
          {steps.map((s, index) => (
            <img
              key={s.id}
              src={s.image}
              alt={t("howItWorks.patientAreaImageAlt", { label: s.imageLabel })}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-in-out ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="shrink-0 border-t border-white/[0.06] px-6 py-5 sm:px-8 sm:py-6">
          <span className="font-display text-[13px] font-medium text-gold">{step.number}</span>
          <h3 className="mt-1 font-display text-[19px] font-medium text-white">{step.title}</h3>
          <div className="mt-2 grid max-w-[62ch]">
            {steps.map((s) => (
              <p
                key={`size-${s.id}`}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 text-[14px] leading-[1.6]"
              >
                {s.description}
              </p>
            ))}
            <p className="col-start-1 row-start-1 text-[14px] leading-[1.6] text-[#c7d8e0]">
              {step.description}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {steps.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(index)}
                aria-label={t("howItWorks.goToStep", { label: s.title })}
                aria-current={index === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
