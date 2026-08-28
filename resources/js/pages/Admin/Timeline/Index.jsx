import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function TimelineIndex() {
    const { entries } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/timeline/reorder', {
            order: reordered.map(e => e.id),
        }, { preserveState: true, preserveScroll: true, only: ['entries'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/timeline/${deleting.id}`, { onSuccess: () => setDeleting(null) })
    }

    return (
        <AdminLayout title="Timeline" subtitle="Roadmap milestones shown on the homepage — drag to reorder">
            <Head title="Timeline — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{entries.length} entr{entries.length !== 1 ? 'ies' : 'y'}</p>
                <Link
                    href="/admin/timeline/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> New Entry
                </Link>
            </div>

            <FormCard>
                {entries.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No timeline entries yet</p>
                    </div>
                ) : (
                    <SortableList
                        items={entries}
                        onReorder={handleReorder}
                        renderItem={(entry) => (
                            <div className="flex items-start gap-4 py-3 px-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                    entry.done ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {entry.done
                                        ? <CheckCircleIcon className="w-5 h-5" />
                                        : <span className="text-xs font-bold">{entry.year}</span>
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-admin-gold">{entry.year}</span>
                                        {entry.done && (
                                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Done</span>
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-admin-navy mt-0.5">{entry.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{entry.desc}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Link
                                        href={`/admin/timeline/${entry.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(entry)}
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
                title="Delete Timeline Entry"
                message={`Delete "${deleting?.title}"? This cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
