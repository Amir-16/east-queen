import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const ICON_PREVIEW = {
    Shield: '🛡️', Target: '🎯', Handshake: '🤝', Lightbulb: '💡',
    Star: '⭐', Heart: '❤️', CheckCircle: '✅', Globe: '🌐',
    Zap: '⚡', Award: '🏆', Users: '👥', TrendingUp: '📈',
}

export default function CoreValuesIndex() {
    const { values } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/core-values/reorder', {
            order: reordered.map(v => v.id),
        }, { preserveState: true, preserveScroll: true, only: ['values'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/core-values/${deleting.id}`, { onSuccess: () => setDeleting(null) })
    }

    return (
        <AdminLayout title="Core Values" subtitle="Company principles shown on the Core Values page — drag to reorder">
            <Head title="Core Values — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{values.length} value{values.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/core-values/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> New Core Value
                </Link>
            </div>

            <FormCard>
                {values.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No core values yet</p>
                        <p className="text-sm">Add principles that define East Queen Group.</p>
                    </div>
                ) : (
                    <SortableList
                        items={values}
                        onReorder={handleReorder}
                        renderItem={(val) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center text-lg shrink-0">
                                    {ICON_PREVIEW[val.icon_name] ?? '✦'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-admin-navy">{val.title}</p>
                                    <p className="text-xs text-gold-500 italic">"{val.tagline}"</p>
                                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{val.description}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Link
                                        href={`/admin/core-values/${val.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(val)}
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
                title="Delete Core Value"
                message={`Delete "${deleting?.title}"? This cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
