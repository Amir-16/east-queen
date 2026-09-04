import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function AssociatesIndex() {
    const { associates } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/associates/reorder', {
            order: reordered.map(a => a.id),
        }, { preserveState: true, preserveScroll: true, only: ['associates'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/associates/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    function handleToggleActive(associate) {
        router.patch(`/admin/associates/${associate.id}/toggle-active`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['associates'],
        })
    }

    return (
        <AdminLayout title="Associates" subtitle="Business associates and partners — drag to reorder">
            <Head title="Associates — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{associates.length} associate{associates.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/associates/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Associate
                </Link>
            </div>

            <FormCard>
                {associates.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No associates yet</p>
                        <p className="text-sm">Add business associates and partners.</p>
                    </div>
                ) : (
                    <SortableList
                        items={associates}
                        onReorder={handleReorder}
                        renderItem={(associate) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {/* Initials avatar */}
                                <div className="w-10 h-10 rounded-full bg-admin-navy flex items-center justify-center flex-shrink-0">
                                    {associate.logo
                                        ? <img src={associate.logo} alt={associate.name} className="w-10 h-10 rounded-full object-cover" />
                                        : <span className="text-xs font-bold text-white">{associate.initials || '?'}</span>
                                    }
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-admin-navy truncate">{associate.name}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        {associate.country && (
                                            <span className="text-xs text-gray-500">{associate.country}</span>
                                        )}
                                        {associate.website && (
                                            <a
                                                href={associate.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:underline truncate max-w-[200px]"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {associate.website.replace(/^https?:\/\//, '')}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Toggle checked={associate.is_active} onChange={() => handleToggleActive(associate)} />
                                    <Link
                                        href={`/admin/associates/${associate.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(associate)}
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
                title="Delete Associate"
                message={`Delete "${deleting?.name}"? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
