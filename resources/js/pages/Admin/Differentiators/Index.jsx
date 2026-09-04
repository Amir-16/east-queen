import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function DifferentiatorsIndex() {
    const { items } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/differentiators/reorder', {
            order: reordered.map(d => d.id),
        }, { preserveState: true, preserveScroll: true, only: ['items'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/differentiators/${deleting.id}`, { onSuccess: () => setDeleting(null) })
    }

    return (
        <AdminLayout title="Differentiators" subtitle="'What Sets Us Apart' cards on the About page — drag to reorder">
            <Head title="Differentiators — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/differentiators/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> New Differentiator
                </Link>
            </div>

            <FormCard>
                {items.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No differentiators yet</p>
                        <p className="text-sm">Add cards to showcase what sets East Queen Group apart.</p>
                    </div>
                ) : (
                    <SortableList
                        items={items}
                        onReorder={handleReorder}
                        renderItem={(item) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-14 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.chip_color}`}
                                        />
                                        <p className="text-sm font-semibold text-admin-navy truncate">{item.title}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.body}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Link
                                        href={`/admin/differentiators/${item.id}/edit`}
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
                title="Delete Differentiator"
                message={`Delete "${deleting?.title}"? This cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
