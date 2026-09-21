import type { HowItWorksStep } from "./howItWorksSteps";

interface ProcessStepsProps {
  steps: HowItWorksStep[];
  active: number;
  progress: number;
  onSelect: (index: number) => void;
  onActiveHoverStart?: () => void;
  onActiveHoverEnd?: () => void;
}

export function ProcessSteps({
  steps,
  active,
  progress,
  onSelect,
  onActiveHoverStart,
  onActiveHoverEnd,
}: ProcessStepsProps) {
  return (
    // The live list's own open/close animations can briefly dip below their
    // resting height (the closing item shrinks a hair faster than the
    // opening one grows), which reads as the whole section resizing. An
    // invisible reference copy — always "resting" with step 0 open, same
    // height as any other step open — shares this grid cell so the
    // container never shrinks past it, no matter what the live copy does
    // mid-transition. Same stacking trick as .testimonial-stage.
    <div className="relative mt-8 grid">
      <ol aria-hidden="true" className="invisible pointer-events-none [grid-area:1/1]">
        {steps.map((step, index) => (
          <StepItem key={`size-${step.id}`} step={step} steps={steps} isActive={index === 0} isDone={false} progress={1} />
        ))}
      </ol>
      <ol className="relative [grid-area:1/1]">
        <div
          aria-hidden="true"
          className="absolute left-[19px] top-5 bottom-5 w-px bg-navy/10"
        />
        {steps.map((step, index) => {
          const isActive = index === active;
          const isDone = index < active;
          return (
            <StepItem
              key={step.id}
              step={step}
              steps={steps}
              isActive={isActive}
              isDone={isDone}
              progress={progress}
              onSelect={() => onSelect(index)}
              onHoverStart={isActive ? onActiveHoverStart : undefined}
              onHoverEnd={isActive ? onActiveHoverEnd : undefined}
            />
          );
        })}
      </ol>
    </div>
  );
}

interface StepItemProps {
  step: HowItWorksStep;
  steps: HowItWorksStep[];
  isActive: boolean;
  isDone: boolean;
  progress: number;
  onSelect?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

function StepItem({ step, steps, isActive, isDone, progress, onSelect, onHoverStart, onHoverEnd }: StepItemProps) {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        aria-current={isActive}
        className="group grid w-full grid-cols-[40px_1fr] gap-4 rounded-xl py-3 text-left"
      >
        <span
          className={`relative z-10 flex h-10 w-10 items-center justify-center self-start rounded-full font-display text-[13px] font-medium transition-colors duration-400 ${
            isActive
              ? "bg-navy text-white"
              : isDone
                ? "bg-mist text-navy/60"
                : "bg-cloud text-navy/45 ring-1 ring-navy/10 group-hover:text-navy/70"
          }`}
        >
          {step.number}
        </span>
        <div>
          <h3
            className={`font-display text-[15.5px] font-medium transition-colors duration-400 ${
              isActive ? "text-navy" : "text-navy/75 group-hover:text-navy"
            }`}
          >
            {step.title}
          </h3>
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="mt-2 grid max-w-[46ch]">
                {steps.map((s) => (
                  <p
                    key={`size-${s.id}`}
                    aria-hidden="true"
                    className="invisible col-start-1 row-start-1 text-[13.5px] leading-[1.6]"
                  >
                    {s.description}
                  </p>
                ))}
                <p className="col-start-1 row-start-1 text-[13.5px] leading-[1.6] text-navy/75">
                  {step.description}
                </p>
              </div>
              <div className="mt-3.5 mb-1 h-[3px] w-full overflow-hidden rounded-full bg-navy/10">
                <span
                  style={{ transform: `scaleX(${isActive ? progress : 0})` }}
                  className="block h-full w-full origin-left rounded-full bg-gold"
                />
              </div>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}
