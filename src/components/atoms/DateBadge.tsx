export function DateBadge({ day, month }: { day: string; month: string }) {
  return (
    <div className="w-13 h-13 rounded-xl bg-mist flex flex-col items-center justify-center flex-none">
      <span className="font-display font-semibold text-lg text-navy leading-none">{day}</span>
      <span className="font-label text-[0.65rem] uppercase text-sage-deep leading-none mt-1">{month}</span>
    </div>
  )
}
