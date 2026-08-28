import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard } from '@/components/admin'
import HeroIcon from '@/components/ui/HeroIcon'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function StatsIndex() {
    const { stats } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/stats/reorder', {
            order: reordered.map((s) => s.id),
        }, { preserveState: true, preserveScroll: true, only: ['stats'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/stats/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    return (
        <AdminLayout title="Stats" subtitle="Numbers shown on the homepage — drag to reorder">
            <Head title="Stats — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{stats.length} stat{stats.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/stats/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Stat
                </Link>
            </div>

            <FormCard>
                {stats.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No stats yet</p>
                        <p className="text-sm">Add key numbers to display on your homepage.</p>
                    </div>
                ) : (
                    <SortableList
                        items={stats}
                        onReorder={handleReorder}
                        renderItem={(stat) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-admin-navy flex items-center justify-center flex-shrink-0 text-admin-gold">
                                    {stat.icon
                                        ? <HeroIcon name={stat.icon} className="w-5 h-5" />
                                        : <span className="text-sm font-bold">#</span>
                                    }
                                </div>

                                {/* Value display */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-2xl font-bold text-admin-navy leading-none">
                                        {stat.value.toLocaleString()}<span className="text-admin-gold ml-0.5">{stat.suffix}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <Link
                                        href={`/admin/stats/${stat.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(stat)}
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
                title="Delete Stat"
                message={`Delete "${deleting?.label}"? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
