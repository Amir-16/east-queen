import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const ANIMATION_ICONS = {
    zoom_out:    '🔍↙',
    zoom_in:     '🔍↗',
    pan_right:   '→',
    pan_left:    '←',
    pan_up:      '↑',
    pan_down:    '↓',
    diagonal_lr: '↘',
    diagonal_rl: '↙',
}

export default function HeroSlidesIndex() {
    const { slides, presets = {} } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/hero-slides/reorder', {
            order: reordered.map(s => s.id),
        }, { preserveState: true, preserveScroll: true, only: ['slides'] })
    }

    function handleToggle(item) {
        router.patch(`/admin/hero-slides/${item.id}/toggle-active`, {}, {
            preserveState: true, preserveScroll: true, only: ['slides'],
        })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/hero-slides/${deleting.id}`, { onSuccess: () => setDeleting(null) })
    }

    return (
        <AdminLayout title="Hero Slides" subtitle="Full-screen slides shown on the homepage — drag to reorder">
            <Head title="Hero Slides — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{slides.length} slide{slides.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/hero-slides/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> Add Slide
                </Link>
            </div>

            <FormCard>
                {slides.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No hero slides yet</p>
                        <p className="text-sm">Add your first slide to get started.</p>
                    </div>
                ) : (
                    <SortableList
                        items={slides}
                        onReorder={handleReorder}
                        renderItem={(item) => (
                            <div className="flex items-center gap-4 py-2.5 px-1">
                                <img
                                    src={item.image_path}
                                    alt={item.label}
                                    className="w-16 h-12 object-cover rounded-lg shrink-0 bg-gray-100"
                                    onError={e => { e.currentTarget.src = '/images/placeholder.png'; e.currentTarget.onerror = null }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-semibold text-gray-800 truncate">{item.label}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">
                                            {presets[item.animation_preset] ?? item.animation_preset}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Toggle checked={item.is_active} onChange={() => handleToggle(item)} />
                                    <Link
                                        href={`/admin/hero-slides/${item.id}/edit`}
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
                title="Delete Slide"
                message={`Delete "${deleting?.label}"? This cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
