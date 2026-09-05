import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function GalleryCategoriesIndex() {
    const { categories } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/gallery-categories/reorder', {
            order: reordered.map(c => c.id),
        }, { preserveState: true, preserveScroll: true, only: ['categories'] })
    }

    function handleToggle(item) {
        router.patch(`/admin/gallery-categories/${item.id}/toggle-active`, {}, {
            preserveState: true, preserveScroll: true, only: ['categories'],
        })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/gallery-categories/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    return (
        <AdminLayout
            title="Gallery Categories"
            subtitle="Manage the categories used to organise gallery media — drag to reorder"
        >
            <Head title="Gallery Categories — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                    {categories.length} {categories.length === 1 ? 'category' : 'categories'}
                </p>
                <Link
                    href="/admin/gallery-categories/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> Add Category
                </Link>
            </div>

            <FormCard>
                {categories.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No categories yet</p>
                        <p className="text-sm">Add a category to start organising your gallery.</p>
                    </div>
                ) : (
                    <SortableList
                        items={categories}
                        onReorder={handleReorder}
                        renderItem={(item) => (
                            <div className="flex items-center gap-4 py-2.5 px-1">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="font-semibold text-sm text-gray-800">{item.label}</span>
                                        <code className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[11px] rounded font-mono">
                                            {item.slug}
                                        </code>
                                        {item.media_count > 0 && (
                                            <span className="text-[11px] text-gray-400">
                                                {item.media_count} {item.media_count === 1 ? 'item' : 'items'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Toggle checked={item.is_active} onChange={() => handleToggle(item)} />
                                    <Link
                                        href={`/admin/gallery-categories/${item.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(item)}
                                        disabled={item.media_count > 0}
                                        title={item.media_count > 0 ? 'Reassign media items before deleting' : 'Delete category'}
                                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
                title="Delete Category"
                message={`Delete "${deleting?.label}"? This cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
