import { Link } from '@inertiajs/react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'

/**
 * Inertia-compatible pagination bar.
 * Pass the full Laravel paginator object as `meta`.
 * Optional: `perPage` (number) + `onPerPageChange` (fn) to show a per-page selector.
 */
export default function Pagination({
    meta,
    preserveState = true,
    perPage,
    onPerPageChange,
}) {
    if (!meta || meta.last_page <= 1) {
        // Still render per-page selector even on a single page
        if (!onPerPageChange) return null
        return (
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100">
                <PerPageSelect value={perPage} onChange={onPerPageChange} />
            </div>
        )
    }

    const { from, to, total, links = [], current_page, last_page } = meta

    const prevLink  = links[0]
    const nextLink  = links[links.length - 1]
    const pageLinks = links.slice(1, -1)

    const linkProps = { preserveScroll: true, preserveState }

    // Build first / last URLs by replacing the page param
    const buildUrl = (link, page) =>
        link?.url ? link.url.replace(/([?&]page=)\d+/, `$1${page}`) : null

    const firstUrl = current_page > 1  ? buildUrl(pageLinks[0], 1) : null
    const lastUrl  = current_page < last_page ? buildUrl(pageLinks[pageLinks.length - 1], last_page) : null

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50/40">
            {/* Left: info + per-page */}
            <div className="flex items-center gap-3 shrink-0">
                <p className="text-xs text-gray-400">
                    Showing{' '}
                    <span className="font-semibold text-gray-600">{from}–{to}</span>
                    {' '}of{' '}
                    <span className="font-semibold text-gray-600">{total}</span>
                    {' '}results
                </p>
                {onPerPageChange && (
                    <PerPageSelect value={perPage} onChange={onPerPageChange} />
                )}
            </div>

            {/* Right: page controls */}
            <div className="flex items-center gap-1">
                {/* First */}
                <NavBtn href={firstUrl} disabled={!firstUrl} linkProps={linkProps}>
                    <ChevronDoubleLeftIcon className="w-3.5 h-3.5" />
                </NavBtn>

                {/* Prev */}
                <NavBtn href={prevLink?.url} disabled={!prevLink?.url} linkProps={linkProps}>
                    <ChevronLeftIcon className="w-3.5 h-3.5" />
                </NavBtn>

                {/* Page numbers */}
                {pageLinks.map((link, i) => {
                    const label = link.label.replace(/&laquo;|&raquo;/g, '').trim()
                    if (label === '...') {
                        return (
                            <span key={i} className="w-8 h-8 flex items-center justify-center text-xs text-gray-300 select-none">
                                …
                            </span>
                        )
                    }
                    return link.url ? (
                        <Link
                            key={i}
                            href={link.url}
                            {...linkProps}
                            className={`w-8 h-8 flex items-center justify-center text-xs rounded-lg font-semibold transition-all ${
                                link.active
                                    ? 'bg-admin-gold text-white shadow-sm'
                                    : 'border border-gray-200 text-gray-500 hover:border-admin-gold/50 hover:text-admin-gold'
                            }`}
                        >
                            {label}
                        </Link>
                    ) : (
                        <span key={i} className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">
                            {label}
                        </span>
                    )
                })}

                {/* Next */}
                <NavBtn href={nextLink?.url} disabled={!nextLink?.url} linkProps={linkProps}>
                    <ChevronRightIcon className="w-3.5 h-3.5" />
                </NavBtn>

                {/* Last */}
                <NavBtn href={lastUrl} disabled={!lastUrl} linkProps={linkProps}>
                    <ChevronDoubleRightIcon className="w-3.5 h-3.5" />
                </NavBtn>
            </div>
        </div>
    )
}

function NavBtn({ href, disabled, linkProps, children }) {
    const base = 'w-8 h-8 flex items-center justify-center rounded-lg border transition-colors'
    if (disabled) {
        return (
            <span className={`${base} border-gray-100 text-gray-200 cursor-not-allowed`}>
                {children}
            </span>
        )
    }
    return (
        <Link href={href} {...linkProps}
            className={`${base} border-gray-200 text-gray-500 hover:border-admin-gold/50 hover:text-admin-gold hover:bg-admin-gold/5`}>
            {children}
        </Link>
    )
}

function PerPageSelect({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-500 focus:outline-none focus:ring-1 focus:ring-admin-gold/40 focus:border-admin-gold cursor-pointer"
        >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
        </select>
    )
}
