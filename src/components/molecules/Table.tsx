import type { ReactNode } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  renderMobileCard,
  emptyMessage = 'No hay resultados.',
}: {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  // Below md, rows render through this instead of the table — table rows
  // squeeze onto a phone screen far worse than columns ever stack.
  renderMobileCard?: (row: T) => ReactNode
  emptyMessage?: string
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (rows.length === 0) {
    return (
      <div className="text-center py-14 px-5 border-[1.5px] border-dashed border-sage-pale rounded-[20px] text-slate">
        {emptyMessage}
      </div>
    )
  }

  if (renderMobileCard && !isDesktop) {
    return (
      <div className="grid gap-3">
        {rows.map((row) => (
          <div key={rowKey(row)}>{renderMobileCard(row)}</div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-white border border-mist rounded-2xl">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-mist">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`font-label text-xs uppercase text-slate tracking-wide px-5 py-4 ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-mist last:border-0">
              {columns.map((col) => (
                <td key={col.key} className={`px-5 py-4 align-middle ${col.className ?? ''}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
