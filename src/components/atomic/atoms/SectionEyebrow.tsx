export function SectionEyebrow({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.2em] ${light ? "text-[#c4d5df]" : "text-[#45677d]"}`}
    >
      {children}
    </p>
  );
}
