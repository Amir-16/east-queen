import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, FormCard, ConfirmModal, Toggle, Pagination } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function GalleryIndex() {
    const { media, categories, filters } = usePage().props
    const catLabel = Object.fromEntries((categories ?? []).map(c => [c.slug, c.label]))
    const rows = media.data ?? []
    const [deleting, setDeleting] = useState(null)

    const slOffset = (media.current_page - 1) * media.per_page

    function applyFilter(patch) {
        const next = { ...filters, ...patch }
        // drop empty/undefined values so the URL stays clean
        Object.keys(next).forEach(k => (next[k] == null || next[k] === '') && delete next[k])
        router.get('/admin/gallery', { ...next, page: 1 }, {
            preserveState: true,
            preserveScroll: true,
            only: ['media', 'filters'],
        })
    }

    function handleToggle(item) {
        router.patch(`/admin/gallery/${item.id}/toggle-active`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['media'],
        })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/gallery/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    const hasFilters = filters.category || filters.type

    return (
        <AdminLayout title="Gallery Media" subtitle="Photos and videos shown on the gallery page">
            <Head title="Gallery — Admin" />

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                    {media.total} item{media.total !== 1 ? 's' : ''}
                    {hasFilters && <span className="text-gray-400"> (filtered)</span>}
                </p>
                <Link
                    href="/admin/gallery/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> Add Media
                </Link>
            </div>

            {/* ── Filter bar ── */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative">
                    <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                        value={filters.category ?? ''}
                        onChange={e => applyFilter({ category: e.target.value || null })}
                        className="pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold appearance-none"
                    >
                        <option value="">All Categories</option>
                        {(categories ?? []).map(c => (
                            <option key={c.slug} value={c.slug}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <select
                    value={filters.type ?? ''}
                    onChange={e => applyFilter({ type: e.target.value || null })}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                >
                    <option value="">All Types</option>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                </select>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={() => applyFilter({ category: null, type: null })}
                        className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* ── List ── */}
            <FormCard>
                {rows.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">
                            {hasFilters ? 'No items match these filters' : 'No media yet'}
                        </p>
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={() => applyFilter({ category: null, type: null })}
                                className="mt-2 text-sm text-admin-gold hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {rows.map((item, i) => (
                            <div key={item.id} className="flex items-center gap-3 py-2.5 px-1">
                                {/* SL */}
                                <span className="w-7 text-center text-xs font-medium text-gray-400 tabular-nums flex-shrink-0 select-none">
                                    {slOffset + i + 1}
                                </span>

                                {/* Thumbnail */}
                                {item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-14 h-10 object-cover rounded-lg shrink-0 bg-gray-100"
                                    />
                                ) : item.thumbnail_src ? (
                                    <div className="relative w-14 h-10 rounded-lg shrink-0 overflow-hidden">
                                        <img
                                            src={item.thumbnail_src}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <span className="text-white text-[10px]">▶</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-14 h-10 rounded-lg shrink-0 bg-admin-navy/10 flex items-center justify-center text-lg">
                                        🎬
                                    </div>
                                )}

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-semibold text-admin-navy uppercase tracking-wide">
                                            {catLabel[item.category] ?? item.category}
                                        </span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                            item.type === 'video'
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-blue-50 text-blue-500'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-0.5 truncate">
                                        {item.title || item.src}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Toggle checked={item.is_active} onChange={() => handleToggle(item)} />
                                    <Link
                                        href={`/admin/gallery/${item.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                        title="Edit"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(item)}
                                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Pagination meta={media} />
            </FormCard>

            <ConfirmModal
                isOpen={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                title="Delete Media"
                message={`Delete "${deleting?.title || deleting?.src}"? This cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
