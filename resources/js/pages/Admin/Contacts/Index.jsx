import { useRef, useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { format, parseISO } from 'date-fns'
import { AdminLayout, StatusBadge, ConfirmModal, Pagination } from '@/components/admin'
import {
    EnvelopeIcon, ArrowDownTrayIcon, FunnelIcon, EyeIcon,
    ChevronUpDownIcon, XMarkIcon, InboxStackIcon, BellAlertIcon,
    EyeSlashIcon, CheckCircleIcon, PhoneIcon,
} from '@heroicons/react/24/outline'

const STATUS_TABS = [
    {
        id:       'all',
        label:    'All',
        subtitle: 'Total inquiries',
        icon:     InboxStackIcon,
        badge:    'text-gray-500 bg-gray-100 ring-gray-200',
    },
    {
        id:       'new',
        label:    'New',
        subtitle: 'Needs attention',
        icon:     BellAlertIcon,
        badge:    'text-red-600 bg-red-50 ring-red-200',
        accent:   'text-red-600',
    },
    {
        id:       'read',
        label:    'Read',
        subtitle: 'Viewed, no reply',
        icon:     EyeSlashIcon,
        badge:    'text-amber-600 bg-amber-50 ring-amber-200',
        accent:   'text-amber-600',
    },
    {
        id:       'replied',
        label:    'Replied',
        subtitle: 'Response sent',
        icon:     CheckCircleIcon,
        badge:    'text-green-600 bg-green-50 ring-green-200',
        accent:   'text-green-600',
    },
]

export default function ContactsIndex() {
    const { contacts, counts, services, filters } = usePage().props
    const rows = contacts.data ?? []

    const [selected,    setSelected]    = useState([])
    const [bulkStatus,  setBulkStatus]  = useState(null)
    const [searchInput, setSearchInput] = useState(filters.search ?? '')
    const [sortKey,     setSortKey]     = useState('created_at')
    const [sortDir,     setSortDir]     = useState('desc')
    const searchTimer = useRef(null)

    // ── Filter / navigation ───────────────────────────────────────────────────
    function applyFilter(patch) {
        router.get('/admin/contacts', { ...filters, ...patch, page: 1 }, {
            preserveState:  true,
            preserveScroll: true,
            only: ['contacts', 'counts', 'filters'],
        })
    }

    function handleSearchChange(e) {
        const val = e.target.value
        setSearchInput(val)
        clearTimeout(searchTimer.current)
        searchTimer.current = setTimeout(() => applyFilter({ search: val }), 400)
    }

    function clearSearch() {
        setSearchInput('')
        applyFilter({ search: '' })
    }

    function handlePerPageChange(value) {
        applyFilter({ per_page: value })
    }

    // ── Client-side sort (within current page) ────────────────────────────────
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

    // ── Selection ─────────────────────────────────────────────────────────────
    const allSelected = displayed.length > 0 && selected.length === displayed.length
    const toggleAll   = () => setSelected(allSelected ? [] : displayed.map((c) => c.id))
    const toggleOne   = (id) =>
        setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

    // ── Bulk action ───────────────────────────────────────────────────────────
    function handleBulkConfirm() {
        if (!bulkStatus || selected.length === 0) return
        router.post('/admin/contacts/bulk-status', { ids: selected, status: bulkStatus }, {
            onSuccess: () => { setSelected([]); setBulkStatus(null) },
        })
    }

    // ── Export ────────────────────────────────────────────────────────────────
    function handleExport() {
        const params = new URLSearchParams()
        if (filters.status  !== 'all') params.set('status',  filters.status)
        if (filters.service !== 'all') params.set('service', filters.service)
        if (filters.search)            params.set('search',  filters.search)
        window.location.href = `/admin/contacts/export?${params.toString()}`
    }

    // ── Sortable column header ────────────────────────────────────────────────
    function SortTh({ label, col, className = '' }) {
        const active = sortKey === col
        return (
            <th
                onClick={() => toggleSort(col)}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none whitespace-nowrap transition-colors ${
                    active ? 'text-admin-gold' : 'text-gray-400 hover:text-gray-600'
                } ${className}`}
            >
                <span className="inline-flex items-center gap-1">
                    {label}
                    <ChevronUpDownIcon className={`w-3.5 h-3.5 transition-opacity ${active ? 'opacity-100' : 'opacity-30'}`} />
                </span>
            </th>
        )
    }

    const slOffset = (contacts.current_page - 1) * contacts.per_page

    return (
        <AdminLayout title="Inquiries" subtitle="Manage contact form submissions">
            <Head title="Inquiries — Admin" />

            {/* ── Status cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {STATUS_TABS.map((tab) => {
                    const Icon     = tab.icon
                    const isActive = filters.status === tab.id
                    const count    = counts[tab.id] ?? counts.all

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => applyFilter({ status: tab.id })}
                            className={[
                                'group relative flex flex-col gap-3 rounded-xl p-4 border text-left transition-all duration-200',
                                isActive
                                    ? 'border-admin-gold bg-admin-gold/5 shadow-sm ring-1 ring-admin-gold/20'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
                            ].join(' ')}
                        >
                            <div className="flex items-start justify-between">
                                <div className={`p-2 rounded-lg transition-colors ${
                                    isActive ? 'bg-admin-gold/10' : 'bg-gray-100 group-hover:bg-gray-200'
                                }`}>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-admin-gold' : (tab.accent ?? 'text-gray-500')}`} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${tab.badge}`}>
                                    {tab.label}
                                </span>
                            </div>
                            <div>
                                <p className={`text-3xl font-bold tabular-nums leading-none ${
                                    isActive ? 'text-admin-gold' : 'text-gray-900'
                                }`}>
                                    {count}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{tab.subtitle}</p>
                            </div>
                            {isActive && (
                                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-admin-gold rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* ── Toolbar ──────────────────────────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                        placeholder="Search name, email or service…"
                        className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-admin-gold/30 focus:border-admin-gold transition-colors"
                    />
                    {searchInput && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-300 hover:text-gray-500 transition-colors"
                        >
                            <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Service filter */}
                {services.length > 0 && (
                    <div className="relative">
                        <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <select
                            value={filters.service}
                            onChange={(e) => applyFilter({ service: e.target.value })}
                            className="pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-admin-gold/30 focus:border-admin-gold appearance-none transition-colors"
                        >
                            <option value="all">All Services</option>
                            {services.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Export */}
                <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors sm:ml-auto"
                >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                    <span className="sm:hidden">Export</span>
                </button>
            </div>

            {/* ── Bulk action bar ───────────────────────────────────────────── */}
            {selected.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-3 bg-admin-navy/5 border border-admin-navy/20 rounded-lg px-3 py-2">
                    <span className="w-5 h-5 rounded-full bg-admin-navy text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {selected.length}
                    </span>
                    <span className="text-xs font-medium text-admin-navy">
                        {selected.length} selected
                    </span>
                    <div className="flex items-center gap-1.5 ml-1">
                        <button
                            type="button"
                            onClick={() => setBulkStatus('read')}
                            className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors font-medium"
                        >
                            Mark Read
                        </button>
                        <button
                            type="button"
                            onClick={() => setBulkStatus('replied')}
                            className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                        >
                            Mark Replied
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSelected([])}
                        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded"
                    >
                        <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* ── Table ────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {displayed.length === 0 ? (
                    <div className="text-center py-20 px-6">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <EnvelopeIcon className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="font-semibold text-gray-500">No inquiries found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {filters.search || filters.status !== 'all' || filters.service !== 'all'
                                ? 'Try adjusting your filters or search query.'
                                : 'Contact form submissions will appear here.'}
                        </p>
                        {(filters.search || filters.status !== 'all' || filters.service !== 'all') && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchInput('')
                                    router.get('/admin/contacts', {}, { preserveState: false })
                                }}
                                className="mt-4 text-xs text-admin-gold hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="w-10 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={toggleAll}
                                            className="rounded border-gray-300 text-admin-gold focus:ring-admin-gold/40 cursor-pointer"
                                        />
                                    </th>
                                    <th className="w-12 px-3 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                        #
                                    </th>
                                    <SortTh label="Contact"  col="name" />
                                    <SortTh label="Service"  col="service" className="hidden sm:table-cell" />
                                    <SortTh label="Status"   col="status" />
                                    <SortTh label="Received" col="created_at" className="hidden md:table-cell" />
                                    <th className="px-4 py-3 w-14" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {displayed.map((c, i) => (
                                    <tr
                                        key={c.id}
                                        onClick={() => router.visit(`/admin/contacts/${c.id}`)}
                                        className={[
                                            'group cursor-pointer transition-colors',
                                            c.status === 'new'
                                                ? 'bg-red-50/30 hover:bg-red-50/60'
                                                : 'hover:bg-gray-50/70',
                                        ].join(' ')}
                                    >
                                        {/* Checkbox */}
                                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(c.id)}
                                                onChange={() => toggleOne(c.id)}
                                                className="rounded border-gray-300 text-admin-gold focus:ring-admin-gold/40 cursor-pointer"
                                            />
                                        </td>

                                        {/* SL */}
                                        <td className="px-3 py-3.5 text-center">
                                            <span className="text-xs font-medium text-gray-400 tabular-nums">
                                                {slOffset + i + 1}
                                            </span>
                                        </td>

                                        {/* Contact */}
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                                                    c.status === 'new'
                                                        ? 'bg-red-100 text-red-600'
                                                        : 'bg-admin-navy/10 text-admin-navy'
                                                }`}>
                                                    {c.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className={`text-sm truncate ${
                                                            c.status === 'new'
                                                                ? 'font-bold text-gray-900'
                                                                : 'font-medium text-gray-700'
                                                        }`}>
                                                            {c.name}
                                                        </p>
                                                        {c.status === 'new' && (
                                                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 truncate">{c.email}</p>
                                                    {c.phone && (
                                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                            <PhoneIcon className="w-3 h-3 flex-shrink-0" />
                                                            {c.phone}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Service */}
                                        <td className="hidden sm:table-cell px-4 py-3.5">
                                            {c.service
                                                ? <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{c.service}</span>
                                                : <span className="text-gray-300 text-sm">—</span>
                                            }
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3.5">
                                            <StatusBadge status={c.status} />
                                        </td>

                                        {/* Received */}
                                        <td className="hidden md:table-cell px-4 py-3.5">
                                            <p className="text-xs font-medium text-gray-600 whitespace-nowrap">
                                                {format(parseISO(c.created_at), 'd MMM yyyy')}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {format(parseISO(c.created_at), 'hh:mm a')}
                                            </p>
                                        </td>

                                        {/* Action */}
                                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                                            <Link
                                                href={`/admin/contacts/${c.id}`}
                                                className="p-1.5 rounded-lg text-gray-300 hover:text-admin-navy hover:bg-gray-100 transition-colors inline-flex opacity-0 group-hover:opacity-100"
                                                title="View inquiry"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ── Pagination ── */}
                <Pagination
                    meta={contacts}
                    preserveState={false}
                    perPage={filters.per_page}
                    onPerPageChange={handlePerPageChange}
                />
            </div>

            {/* ── Bulk confirm modal ── */}
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
