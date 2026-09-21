import { useRef, type PointerEvent, type ReactNode } from "react";
import { Plane, type LucideIcon } from "lucide-react";
import { Cross } from "../atoms/Cross";
import { PlaneAscendIcon } from "../atoms/PlaneAscendIcon";

export type ServiceMotion =
  | "fly"
  | "rec"
  | "pulse-trace"
  | "speed"
  | "check"
  | "thump"
  | "scan"
  | "glow-ring"
  | "radar"
  | "equalizer";

function IconOverlay({ motion }: { motion: ServiceMotion }): ReactNode {
  switch (motion) {
    case "fly":
      return (
        <span className="service-icon-fly-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      );
    case "rec":
      return <span className="service-icon-rec-dot" aria-hidden="true" />;
    case "pulse-trace":
      return (
        <svg className="service-icon-trace" viewBox="0 0 56 20" aria-hidden="true">
          <path
            d="M0 10H14L20 2L26 18L32 4L38 10H56"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "speed":
      return (
        <span className="service-icon-speed-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      );
    case "equalizer":
      return (
        <span className="service-icon-eq" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      );
    default:
      return null;
  }
}

/**
 * Bento-grid service tile. Every tile lifts and catches a cursor-tracked
 * spotlight (magicui's Magic Card) on hover or keyboard focus. Most icons
 * play their own small "act" on top of that — a plane trailing lines, a
 * check being drawn on the clipboard's paper — but a `motion` is optional:
 * a couple of tiles intentionally keep only the shared lift/spotlight with
 * no bespoke icon gesture. The description is always visible either way.
 */
export function ServiceTile({
  icon: Icon,
  title,
  description,
  motion,
  featured = false,
  tinted = false,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  motion?: ServiceMotion;
  featured?: boolean;
  tinted?: boolean;
  className?: string;
}) {
  const tileRef = useRef<HTMLLIElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLLIElement>) {
    const tile = tileRef.current;
    if (!tile) return;
    const rect = tile.getBoundingClientRect();
    tile.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    tile.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  const iconSize = featured ? 28 : 20;

  return (
    <li
      ref={tileRef}
      tabIndex={0}
      onPointerMove={handlePointerMove}
      className={`service-tile group relative flex min-h-[168px] flex-col justify-between overflow-hidden rounded-[20px] border p-6 transition-transform duration-200 motion-reduce:transition-none hover:-translate-y-1 focus-visible:-translate-y-1 ${
        featured
          ? "is-navy border-navy bg-navy text-white shadow-[0_14px_34px_rgba(21,35,41,.28)] p-7 md:p-9 lg:p-10"
          : `border-navy/8 shadow-[0_10px_26px_rgba(30,72,101,.08)] ${tinted ? "bg-cloud" : "bg-white"}`
      } ${className}`}
    >
      {featured && (
        <Plane
          aria-hidden="true"
          strokeWidth={0.75}
          className="service-tile-watermark pointer-events-none absolute -right-6 top-4 size-24 text-white/[0.08] sm:-right-8 sm:top-3 sm:size-36 lg:-right-16 lg:top-8 lg:size-[280px] xl:size-[340px]"
        />
      )}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`service-tile-icon ${motion ? `motion-${motion}` : ""} relative flex items-center justify-center rounded-full ${
            featured
              ? "size-16 bg-white/10 text-amber"
              : "size-11 bg-sage-pale/40 text-sage-deep"
          }`}
        >
          <span className="relative inline-flex">
            {motion === "fly" ? (
              <PlaneAscendIcon size={iconSize} strokeWidth={2.2} className="relative z-10" />
            ) : (
              <Icon size={iconSize} strokeWidth={2.2} aria-hidden="true" className="relative z-10" />
            )}
            {motion === "check" && (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="service-icon-check pointer-events-none absolute inset-0 size-full"
              >
                <path
                  d="M8 14l3 3 6-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {motion && motion !== "check" && <IconOverlay motion={motion} />}
        </span>
        <Cross size={featured ? 16 : 13} variant={featured ? "gold" : "sage"} />
      </div>
      <div className="relative z-10">
        <h3
          className={`font-display font-medium ${
            featured
              ? "mt-8 text-[30px] leading-[1.08] text-white md:text-[36px]"
              : "mt-5 text-[17px] text-navy"
          }`}
        >
          {title}
        </h3>
        <p
          className={`leading-[1.6] ${
            featured
              ? "mt-3 max-w-[26em] text-[16px] leading-[1.55] text-white/80"
              : "mt-2 text-[13.5px] text-navy/80"
          }`}
        >
          {description}
        </p>
      </div>
    </li>
  );
}
