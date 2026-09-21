import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  page,
  pageSize,
  totalItems,
  itemLabel,
  onPageChange,
}: {
  page: number
  pageSize: number
  totalItems: number
  itemLabel: string
  onPageChange: (page: number) => void
}) {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize))
  const rangeStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-5 px-1">
      <p className="text-sm text-slate">
        {rangeStart}-{rangeEnd} de {totalItems} {itemLabel}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Página anterior"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-navy disabled:opacity-30 hover:bg-mist"
        >
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={`w-8.5 h-8.5 rounded-full font-label text-sm flex items-center justify-center ${
              p === page ? 'bg-navy text-white' : 'text-navy hover:bg-mist'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          aria-label="Página siguiente"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-navy disabled:opacity-30 hover:bg-mist"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
