import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function ProcessStepsIndex() {
    const { steps } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/process-steps/reorder', {
            order: reordered.map(s => s.id),
        }, { preserveState: true, preserveScroll: true, only: ['steps'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/process-steps/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    return (
        <AdminLayout title="Process Steps" subtitle="Recycling / service process steps — drag to reorder">
            <Head title="Process Steps — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{steps.length} step{steps.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/process-steps/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Step
                </Link>
            </div>

            <FormCard>
                {steps.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No process steps yet</p>
                        <p className="text-sm">Add steps to describe your workflow.</p>
                    </div>
                ) : (
                    <SortableList
                        items={steps}
                        onReorder={handleReorder}
                        renderItem={(step) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {/* Step number badge */}
                                <div className="w-10 h-10 rounded-full bg-admin-gold flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-bold text-white">{step.step_number}</span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-admin-navy">{step.title}</p>
                                    {step.description && (
                                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">{step.description}</p>
                                    )}
                                    {step.icon && (
                                        <p className="text-xs text-gray-400 mt-0.5">{step.icon}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <Link
                                        href={`/admin/process-steps/${step.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(step)}
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
                title="Delete Process Step"
                message={`Delete step "${deleting?.title}"? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
