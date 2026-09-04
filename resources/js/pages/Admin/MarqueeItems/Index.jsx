import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function MarqueeItemsIndex() {
    const { items } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/marquee/reorder', {
            order: reordered.map(i => i.id),
        }, { preserveState: true, preserveScroll: true, only: ['items'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/marquee/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    function handleToggleActive(item) {
        router.patch(`/admin/marquee/${item.id}/toggle-active`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['items'],
        })
    }

    return (
        <AdminLayout title="Marquee Items" subtitle="Scrolling ticker text — drag to reorder">
            <Head title="Marquee Items — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/marquee/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Item
                </Link>
            </div>

            <FormCard>
                {items.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No marquee items yet</p>
                        <p className="text-sm">Add scrolling ticker text for the homepage.</p>
                    </div>
                ) : (
                    <SortableList
                        items={items}
                        onReorder={handleReorder}
                        renderItem={(item) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {/* Text content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-admin-navy truncate">{item.text}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Toggle checked={item.is_active} onChange={() => handleToggleActive(item)} />
                                    <Link
                                        href={`/admin/marquee/${item.id}/edit`}
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
                title="Delete Marquee Item"
                message={`Delete this marquee item? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
