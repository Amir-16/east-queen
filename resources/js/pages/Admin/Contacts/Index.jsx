import { useRef, useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { format, parseISO } from 'date-fns'
import { AdminLayout, StatusBadge, ConfirmModal, Pagination } from '@/components/admin'
import {
    EnvelopeIcon, ArrowDownTrayIcon, FunnelIcon,
    EyeIcon, ChevronUpDownIcon,
} from '@heroicons/react/24/outline'

const STATUS_TABS = [
    { id: 'all',     label: 'All' },
    { id: 'new',     label: 'New',     color: 'text-red-600 bg-red-50 ring-red-200' },
    { id: 'read',    label: 'Read',    color: 'text-amber-600 bg-amber-50 ring-amber-200' },
    { id: 'replied', label: 'Replied', color: 'text-green-600 bg-green-50 ring-green-200' },
]

export default function ContactsIndex() {
    const { contacts, counts, services, filters } = usePage().props

    // contacts is now a Laravel paginator: { data, current_page, per_page, total, ... }
    const rows = contacts.data ?? []

    const [selected,   setSelected]   = useState([])
    const [bulkStatus, setBulkStatus] = useState(null)
    const [searchInput, setSearchInput] = useState(filters.search ?? '')
    const [sortKey,    setSortKey]    = useState('created_at')
    const [sortDir,    setSortDir]    = useState('desc')
    const searchTimer = useRef(null)

    // ── Helpers ─────────────────────────────────────────────────────────────
    function applyFilter(patch) {
        router.get('/admin/contacts', { ...filters, ...patch, page: 1 }, {
            preserveState: true,
            preserveScroll: true,
            only: ['contacts', 'counts', 'filters'],
        })
    }

    function handleSearchChange(e) {
        const val = e.target.value
        setSearchInput(val)
        clearTimeout(searchTimer.current)
        searchTimer.current = setTimeout(() => {
            applyFilter({ search: val })
        }, 400)
    }

    // ── Client-side sort (within current page) ───────────────────────────────
    function toggleSort(key) {
        setSortKey(key)
        setSortDir((d) => (sortKey === key ? (d === 'asc' ? 'desc' : 'asc') : 'asc'))
    }

    const displayed = [...rows].sort((a, b) => {
        const av = a[sortKey] ?? ''
        const bv = b[sortKey] ?? ''
        const cmp = av < bv ? -1 : av > bv ? 1 : 0
        return sortDir === 'asc' ? cmp : -cmp
    })

    // ── Selection ────────────────────────────────────────────────────────────
    const allSelected = displayed.length > 0 && selected.length === displayed.length
    const toggleAll  = () => setSelected(allSelected ? [] : displayed.map((c) => c.id))
    const toggleOne  = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

    // ── Bulk action ──────────────────────────────────────────────────────────
    function handleBulkConfirm() {
        if (!bulkStatus || selected.length === 0) return
        router.post('/admin/contacts/bulk-status', { ids: selected, status: bulkStatus }, {
            onSuccess: () => { setSelected([]); setBulkStatus(null) },
        })
    }

    // ── Export ───────────────────────────────────────────────────────────────
    function handleExport() {
        const params = new URLSearchParams()
        if (filters.status  !== 'all') params.set('status',  filters.status)
        if (filters.service !== 'all') params.set('service', filters.service)
        if (filters.search)            params.set('search',  filters.search)
        window.location.href = `/admin/contacts/export?${params.toString()}`
    }

    // ── Sortable column header ────────────────────────────────────────────────
    function SortTh({ label, col, className = '' }) {
        return (
            <th
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-gray-700 whitespace-nowrap ${className}`}
                onClick={() => toggleSort(col)}
            >
                <span className="inline-flex items-center gap-1">
                    {label}
                    <ChevronUpDownIcon className={`w-3.5 h-3.5 transition-opacity ${sortKey === col ? 'opacity-100 text-admin-gold' : 'opacity-30'}`} />
                </span>
            </th>
        )
    }

    // SL offset from the current page
    const slOffset = (contacts.current_page - 1) * contacts.per_page

    return (
        <AdminLayout title="Inquiries" subtitle="Manage contact form submissions">
            <Head title="Inquiries — Admin" />

            {/* ── Summary cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => applyFilter({ status: tab.id })}
                        className={[
                            'flex flex-col items-start gap-1 rounded-xl p-4 border transition-all text-left',
                            filters.status === tab.id
                                ? 'border-admin-gold bg-admin-gold/5 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-gray-300',
                        ].join(' ')}
                    >
                        <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ring-1 ${tab.color || 'text-gray-500 bg-gray-100 ring-gray-200'}`}>
                            {tab.label}
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                            {counts[tab.id] ?? counts.all}
                        </span>
                    </button>
                ))}
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
                {/* Search (server-side, debounced) */}
                <div className="relative flex-1 min-w-[180px]">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                        placeholder="Search name, email or service…"
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                    />
                </div>

                {/* Service filter */}
                {services.length > 0 && (
                    <div className="relative">
                        <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={filters.service}
                            onChange={(e) => applyFilter({ service: e.target.value })}
                            className="pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold appearance-none"
                        >
                            <option value="all">All Services</option>
                            {services.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Export */}
                <button type="button" onClick={handleExport}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors sm:ml-auto">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                    <span className="sm:hidden">Export</span>
                </button>
            </div>

            {/* Bulk actions — separate row so it doesn't collapse the search */}
            {selected.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-3 bg-admin-navy/5 border border-admin-navy/20 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-admin-navy">{selected.length} selected</span>
                    <button type="button" onClick={() => setBulkStatus('read')}
                        className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors">
                        Mark Read
                    </button>
                    <button type="button" onClick={() => setBulkStatus('replied')}
                        className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                        Mark Replied
                    </button>
                    <button type="button" onClick={() => setSelected([])} className="text-xs text-gray-400 hover:text-gray-600 ml-auto">✕</button>
                </div>
            )}

            {/* ── Table ── */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {displayed.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <EnvelopeIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No inquiries found</p>
                        <p className="text-sm mt-1">Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="w-10 px-4 py-3">
                                        <input type="checkbox" checked={allSelected} onChange={toggleAll}
                                            className="rounded border-gray-300 text-admin-gold focus:ring-admin-gold/40 cursor-pointer" />
                                    </th>
                                    {/* SL column */}
                                    <th className="w-12 px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        SL
                                    </th>
                                    <SortTh label="Contact"  col="name" />
                                    <SortTh label="Service"  col="service" className="hidden sm:table-cell" />
                                    <SortTh label="Status"   col="status" />
                                    <SortTh label="Received" col="created_at" className="hidden md:table-cell" />
                                    <th className="px-4 py-3 w-16" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {displayed.map((c, i) => (
                                    <tr
                                        key={c.id}
                                        onClick={() => router.visit(`/admin/contacts/${c.id}`)}
                                        className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${c.status === 'new' ? 'bg-red-50/30' : ''}`}
                                    >
                                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                            <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleOne(c.id)}
                                                className="rounded border-gray-300 text-admin-gold focus:ring-admin-gold/40 cursor-pointer" />
                                        </td>
                                        {/* SL cell */}
                                        <td className="px-3 py-3 text-center text-xs font-medium text-gray-400 tabular-nums whitespace-nowrap">
                                            {slOffset + i + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-admin-navy/10 flex items-center justify-center text-admin-navy font-semibold text-sm flex-shrink-0">
                                                    {c.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`text-sm truncate ${c.status === 'new' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                        {c.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">{c.email}</p>
                                                </div>
                                                {c.status === 'new' && (
                                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="hidden sm:table-cell px-4 py-3">
                                            {c.service
                                                ? <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.service}</span>
                                                : <span className="text-gray-300 text-sm">—</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={c.status} />
                                        </td>
                                        <td className="hidden md:table-cell px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                                            {format(parseISO(c.created_at), 'd MMM yyyy')}
                                            <br />
                                            <span className="text-gray-300">{format(parseISO(c.created_at), 'HH:mm')}</span>
                                        </td>
                                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                            <Link href={`/admin/contacts/${c.id}`}
                                                className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors inline-flex"
                                                title="View">
                                                <EyeIcon className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <Pagination meta={contacts} preserveState={false} />
            </div>

            {/* Bulk confirm modal */}
            <ConfirmModal
                isOpen={!!bulkStatus}
                onClose={() => setBulkStatus(null)}
                onConfirm={handleBulkConfirm}
                title={bulkStatus === 'replied' ? 'Mark as Replied' : 'Mark as Read'}
                message={`Mark ${selected.length} contact${selected.length !== 1 ? 's' : ''} as ${bulkStatus}?`}
                confirmLabel={bulkStatus === 'replied' ? 'Mark Replied' : 'Mark Read'}
            />
        </AdminLayout>
    )
}
