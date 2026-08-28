import { useMemo, useState } from 'react'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const PAGE_SIZE = 10

export default function DataTable({
  columns      = [],
  data         = [],
  searchKeys   = [],
  emptyMessage = 'No results found.',
  loading      = false,
}) {
  const [search,  setSearch]  = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page,    setPage]    = useState(1)

  const filtered = useMemo(() => {
    let rows = data
    if (search.trim() && searchKeys.length) {
      const q = search.toLowerCase()
      rows = rows.filter((row) =>
        searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q))
      )
    }
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey] ?? ''
        const bv = b[sortKey] ?? ''
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: 'base' })
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return rows
  }, [data, search, searchKeys, sortKey, sortDir])

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageRows    = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  // Page numbers to show (up to 5 around current)
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, 4, 5]
    if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }, [currentPage, totalPages])

  return (
    <div className="bg-white rounded-2xl border border-light-200 shadow-card overflow-hidden">
      {/* Toolbar */}
      {searchKeys.length > 0 && (
        <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-light-200 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-300 pointer-events-none" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-3 py-2 text-sm font-body border border-light-200 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                         placeholder-dark-300 text-dark transition-colors"
            />
          </div>
          <span className="text-xs font-body text-dark-300 whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-light-200">
          <thead className="bg-light-100">
            <tr>
              {/* SL column */}
              <th scope="col" className="px-4 py-3 text-center text-xs font-semibold font-body uppercase tracking-wider text-dark-300 w-12">
                SL
              </th>
              {columns.map((col) => (
                <th
                  key={col.key ?? col.label}
                  scope="col"
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`
                    px-5 py-3 text-left text-xs font-semibold font-body uppercase tracking-wider text-dark-300
                    ${col.sortable ? 'cursor-pointer select-none hover:text-dark transition-colors' : ''}
                  `}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      sortKey === col.key ? (
                        sortDir === 'asc'
                          ? <ChevronUpIcon className="w-3.5 h-3.5 text-primary" />
                          : <ChevronDownIcon className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <ChevronUpDownIcon className="w-3.5 h-3.5 opacity-40" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-light-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-14 text-center">
                  <svg className="w-6 h-6 animate-spin text-primary mx-auto" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                </td>
              </tr>
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-14 text-center text-sm font-body text-dark-300">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className="hover:bg-light-100/60 transition-colors duration-150"
                >
                  {/* SL cell */}
                  <td className="px-4 py-3.5 text-xs font-medium text-dark-300 text-center tabular-nums whitespace-nowrap">
                    {(currentPage - 1) * PAGE_SIZE + i + 1}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key ?? col.label}
                      className="px-5 py-3.5 text-sm font-body text-dark-400 whitespace-nowrap"
                    >
                      {col.render ? col.render(row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 sm:px-5 border-t border-light-200 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-body text-dark-300">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-body rounded-lg border border-light-200 text-dark-400
                         hover:bg-light-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            {/* Page number buttons — hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-1">
              {pageNumbers.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`
                    w-8 h-8 text-xs font-body rounded-lg transition-colors
                    ${p === currentPage
                      ? 'bg-primary text-white font-semibold'
                      : 'text-dark-400 hover:bg-light-100 border border-light-200'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-body rounded-lg border border-light-200 text-dark-400
                         hover:bg-light-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
