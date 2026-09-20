import { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function formatValue(value: number, decimals: number) {
  return decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("es-ES");
}

/**
 * Counts up to `value` once it scrolls into view. Mirrors magicui.design's
 * NumberTicker, reimplemented natively (rAF + IntersectionObserver) to match
 * this project's dependency-free motion pattern (see Highlighter.tsx) instead
 * of pulling in a Next/Motion-oriented package.
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return undefined;
    }

    let frame: number;
    const tick = (start: number) => (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick(start));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Timestamp the start from inside the callback, not effect-mount
          // time: the element can sit off-screen for a while before a real
          // visitor scrolls to it, and that wait must not eat into duration.
          frame = requestAnimationFrame((now) => tick(now)(now));
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      <span aria-hidden="true" ref={ref}>
        {prefix}
        {formatValue(display, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatValue(value, decimals)}
        {suffix}
      </span>
    </span>
  );
}
