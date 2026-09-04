import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const INDUSTRY_COLORS = {
    trading:      'bg-blue-100 text-blue-700',
    shipping:     'bg-cyan-100 text-cyan-700',
    energy:       'bg-yellow-100 text-yellow-700',
    fisheries:    'bg-teal-100 text-teal-700',
    food:         'bg-green-100 text-green-700',
    construction: 'bg-orange-100 text-orange-700',
    other:        'bg-gray-100 text-gray-600',
}

export default function CompaniesIndex() {
    const { companies } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleReorder(reordered) {
        router.post('/admin/companies/reorder', {
            order: reordered.map(c => c.id),
        }, { preserveState: true, preserveScroll: true, only: ['companies'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/companies/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    function handleToggleActive(company) {
        router.patch(`/admin/companies/${company.id}/toggle-active`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['companies'],
        })
    }

    return (
        <AdminLayout title="Companies" subtitle="Group subsidiary companies — drag to reorder">
            <Head title="Companies — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{companies.length} compan{companies.length !== 1 ? 'ies' : 'y'}</p>
                <Link
                    href="/admin/companies/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Company
                </Link>
            </div>

            <FormCard>
                {companies.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No companies yet</p>
                        <p className="text-sm">Add group subsidiary companies.</p>
                    </div>
                ) : (
                    <SortableList
                        items={companies}
                        onReorder={handleReorder}
                        renderItem={(company) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {/* Logo */}
                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {company.logo
                                        ? <img src={company.logo} alt={company.name} className="w-9 h-9 object-contain" />
                                        : <span className="text-xs font-bold text-gray-500">
                                            {company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                                          </span>
                                    }
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-semibold text-admin-navy truncate">{company.name}</p>
                                        {company.industry && (
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${INDUSTRY_COLORS[company.industry] || INDUSTRY_COLORS.other}`}>
                                                {company.industry}
                                            </span>
                                        )}
                                    </div>
                                    {company.tagline && (
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{company.tagline}</p>
                                    )}
                                </div>

                                {/* Sort order */}
                                <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">#{company.sort_order}</span>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Toggle checked={company.is_active} onChange={() => handleToggleActive(company)} />
                                    <Link
                                        href={`/admin/companies/${company.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(company)}
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
                title="Delete Company"
                message={`Delete "${deleting?.name}"? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
