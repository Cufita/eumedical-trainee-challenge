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
    <ol className="relative mt-8">
      <div
        aria-hidden="true"
        className="absolute left-[19px] top-5 bottom-5 w-px bg-navy/10"
      />
      {steps.map((step, index) => {
        const isActive = index === active;
        const isDone = index < active;
        return (
          <li key={step.title} className="relative">
            <button
              type="button"
              onClick={() => onSelect(index)}
              onMouseEnter={isActive ? onActiveHoverStart : undefined}
              onMouseLeave={isActive ? onActiveHoverEnd : undefined}
              aria-current={isActive}
              className="group grid w-full grid-cols-[40px_1fr] gap-4 rounded-xl py-3 text-left"
            >
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center self-start rounded-full font-display text-[13px] font-medium transition-colors duration-400 ${
                  isActive
                    ? "bg-navy text-white"
                    : isDone
                      ? "bg-mist text-navy/60"
                      : "bg-[#f7f7f4] text-[#9aa9b2] ring-1 ring-navy/10 group-hover:text-navy/70"
                }`}
              >
                {step.number}
              </span>
              <div>
                <h3
                  className={`font-display text-[15.5px] font-medium transition-colors duration-400 ${
                    isActive ? "text-navy" : "text-[#5c7788] group-hover:text-navy"
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
                          key={`size-${s.title}`}
                          aria-hidden="true"
                          className="invisible col-start-1 row-start-1 text-[13.5px] leading-[1.6]"
                        >
                          {s.description}
                        </p>
                      ))}
                      <p className="col-start-1 row-start-1 text-[13.5px] leading-[1.6] text-[#4d738c]">
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
      })}
    </ol>
  );
}
