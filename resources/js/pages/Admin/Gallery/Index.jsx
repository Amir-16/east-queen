import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const CAT_EMOJI = { fish: '🐟', cattle: '🐄', fruits: '🍌', farm: '🌊', team: '👥', videos: '🎬' }

export default function GalleryIndex() {
    const { media } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/gallery/reorder', {
            order: reordered.map(m => m.id),
        }, { preserveState: true, preserveScroll: true, only: ['media'] })
    }

    function handleToggle(item) {
        router.patch(`/admin/gallery/${item.id}/toggle-active`, {}, {
            preserveState: true, preserveScroll: true, only: ['media'],
        })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/gallery/${deleting.id}`, { onSuccess: () => setDeleting(null) })
    }

    return (
        <AdminLayout title="Gallery Media" subtitle="Photos and videos shown on the gallery page — drag to reorder">
            <Head title="Gallery — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{media.length} item{media.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/gallery/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> Add Media
                </Link>
            </div>

            <FormCard>
                {media.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No media yet</p>
                    </div>
                ) : (
                    <SortableList
                        items={media}
                        onReorder={handleReorder}
                        renderItem={(item) => (
                            <div className="flex items-center gap-4 py-2.5 px-1">
                                {item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-14 h-10 object-cover rounded-lg shrink-0 bg-gray-100"
                                    />
                                ) : (
                                    <div className="w-14 h-10 rounded-lg shrink-0 bg-admin-navy/10 flex items-center justify-center text-xl">
                                        🎬
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs">{CAT_EMOJI[item.category] ?? '📷'}</span>
                                        <span className="text-xs font-semibold text-admin-navy uppercase tracking-wide">{item.category}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.type === 'video' ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-500'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-0.5 truncate">{item.title || item.src}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Toggle checked={item.is_active} onChange={() => handleToggle(item)} />
                                    <Link
                                        href={`/admin/gallery/${item.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(item)}
                                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                )}
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
