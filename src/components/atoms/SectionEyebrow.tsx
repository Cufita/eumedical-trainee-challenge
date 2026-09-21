export function SectionEyebrow({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.2em] ${light ? "text-white/80" : "text-navy/80"}`}
    >
      {children}
    </p>
  );
}
