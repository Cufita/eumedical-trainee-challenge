import type { MouseEventHandler } from "react";
import { Maximize2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Cross } from "../../shared/Cross";
import type { HowItWorksStep } from "./howItWorksSteps";

interface PatientAppShowcaseProps {
  steps: HowItWorksStep[];
  active: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onExpand?: () => void;
}

export function PatientAppShowcase({
  steps,
  active,
  onMouseEnter,
  onMouseLeave,
  onExpand,
}: PatientAppShowcaseProps) {
  const { t } = useTranslation();

  return (
    <div className="relative md:h-full">
      <div
        aria-hidden="true"
        className="absolute -inset-x-6 -inset-y-8 -z-10 bg-[radial-gradient(46%_60%_at_18%_12%,rgba(231,159,26,.16),transparent),radial-gradient(50%_65%_at_88%_92%,rgba(121,177,156,.22),transparent)] blur-2xl"
      />
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="overflow-hidden rounded-[28px] shadow-[0_30px_60px_-24px_rgba(21,53,73,.45)] ring-1 ring-navy/[0.06] md:flex md:h-full md:flex-col"
      >
        <div className="flex shrink-0 items-center gap-2.5 bg-navy-2 px-5 py-3 text-[12px] text-[#9fb7c4]">
          <Cross variant="white" size={11} />
          <span className="truncate tracking-[.01em]">
            app.eumedical.com<span className="text-[#5f7c8b]">/paciente</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onExpand}
          aria-label={t("howItWorks.viewLarge", { label: steps[active].imageLabel })}
          className="group/expand relative aspect-[12/5] w-full cursor-zoom-in overflow-hidden bg-navy-2 md:aspect-auto md:min-h-0 md:flex-1"
        >
          {steps.map((step, index) => (
            <img
              key={step.id}
              src={step.image}
              alt={t("howItWorks.patientAreaImageAlt", { label: step.imageLabel })}
              className={`showcase-frame absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-700 ease-in-out ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy-2/70 text-white opacity-80 backdrop-blur-sm transition-all duration-300 group-hover/expand:scale-110 group-hover/expand:opacity-100"
          >
            <Maximize2 size={15} strokeWidth={2.2} />
          </span>
        </button>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.06] bg-navy-2 px-5 py-2.5">
          <span className="text-[11px] uppercase tracking-[.14em] text-[#9fb7c4]">
            {steps[active].imageLabel}
          </span>
          <span className="font-display text-[11px] tracking-[.08em] text-[#9fb7c4]">
            {String(active + 1).padStart(2, "0")}
            <span className="text-[#5f7c8b]"> / {String(steps.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
