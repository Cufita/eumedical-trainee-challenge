import { Link } from 'react-router-dom'

export function StatCard({
  value,
  label,
  linkLabel,
  linkTo,
}: {
  value: string
  label: string
  linkLabel: string
  linkTo: string
}) {
  return (
    <div className="bg-white rounded-[18px] p-5.5 border border-mist">
      <b className="block font-display text-[1.7rem] text-navy">{value}</b>
      <span className="font-label text-[0.88rem] text-slate">{label}</span>
      <Link to={linkTo} className="block mt-2 text-sm text-sage-deep underline underline-offset-[3px]">
        {linkLabel}
      </Link>
    </div>
  )
}
