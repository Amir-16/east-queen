import { Link } from '@inertiajs/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

/**
 * Inertia-compatible pagination bar.
 * Pass the full Laravel paginator object (contacts, projects, etc.) as `meta`.
 */
export default function Pagination({ meta, preserveState = true }) {
    if (!meta || meta.last_page <= 1) return null

    const { from, to, total, links = [] } = meta

    const prevLink = links[0]
    const nextLink = links[links.length - 1]
    const pageLinks = links.slice(1, -1)

    const linkProps = { preserveScroll: true, preserveState }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50/60">
            <p className="text-xs text-gray-400 shrink-0">
                Showing <span className="font-medium text-gray-600">{from}–{to}</span> of{' '}
                <span className="font-medium text-gray-600">{total}</span>
            </p>

            <div className="flex items-center gap-1 flex-wrap justify-center">
                {/* Previous */}
                {prevLink?.url ? (
                    <Link
                        href={prevLink.url}
                        {...linkProps}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeftIcon className="w-3 h-3" /> Prev
                    </Link>
                ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed">
                        <ChevronLeftIcon className="w-3 h-3" /> Prev
                    </span>
                )}

                {/* Page numbers */}
                {pageLinks.map((link, i) => {
                    // Laravel outputs "&laquo; Previous" / "&raquo; Next" and "..." for ellipsis
                    const label = link.label.replace(/&laquo;|&raquo;/g, '').trim()
                    if (label === '...') {
                        return (
                            <span key={i} className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">
                                …
                            </span>
                        )
                    }
                    return link.url ? (
                        <Link
                            key={i}
                            href={link.url}
                            {...linkProps}
                            className={`w-8 h-8 flex items-center justify-center text-xs rounded-lg transition-colors font-medium ${
                                link.active
                                    ? 'bg-admin-navy text-white shadow-sm'
                                    : 'border border-gray-200 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {label}
                        </Link>
                    ) : (
                        <span
                            key={i}
                            className="w-8 h-8 flex items-center justify-center text-xs text-gray-300"
                        >
                            {label}
                        </span>
                    )
                })}

                {/* Next */}
                {nextLink?.url ? (
                    <Link
                        href={nextLink.url}
                        {...linkProps}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Next <ChevronRightIcon className="w-3 h-3" />
                    </Link>
                ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed">
                        Next <ChevronRightIcon className="w-3 h-3" />
                    </span>
                )}
            </div>
        </div>
    )
}
