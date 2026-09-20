import { Cross } from "../../shared/Cross";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`flex items-center gap-2 font-display text-[1.15rem] font-medium ${
        light ? "text-white" : "text-navy"
      }`}
    >
      <Cross variant={light ? "white" : "gold"} size={20} />
      eumedical
    </span>
  );
}
