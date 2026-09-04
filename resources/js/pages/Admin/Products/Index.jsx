import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AdminLayout, SortableList, ConfirmModal, FormCard, Toggle } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function ProductsIndex() {
    const { products } = usePage().props
    const [deleting, setDeleting] = useState(null)
    const [filter, setFilter] = useState('all')

    const filtered = filter === 'all'
        ? products
        : products.filter(p => p.type === filter)

    function handleReorder(reordered) {
        router.post('/admin/products/reorder', {
            order: reordered.map(p => p.id),
        }, { preserveState: true, preserveScroll: true, only: ['products'] })
    }

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/products/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    function handleToggleActive(product) {
        router.patch(`/admin/products/${product.id}/toggle-active`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
        })
    }

    const filterTabs = [
        { key: 'all',    label: 'All',     count: products.length },
        { key: 'export', label: 'Exports', count: products.filter(p => p.type === 'export').length },
        { key: 'import', label: 'Imports', count: products.filter(p => p.type === 'import').length },
    ]

    return (
        <AdminLayout title="Products" subtitle="Export and import product catalog — drag to reorder">
            <Head title="Products — Admin" />

            <div className="flex items-center justify-between mb-4">
                {/* Filter tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {filterTabs.map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setFilter(tab.key)}
                            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                                filter === tab.key
                                    ? 'bg-white text-admin-navy shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                filter === tab.key ? 'bg-admin-navy text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <Link
                    href="/admin/products/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Product
                </Link>
            </div>

            <FormCard>
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium mb-1">No products yet</p>
                        <p className="text-sm">Add export or import products.</p>
                    </div>
                ) : (
                    <SortableList
                        items={filtered}
                        onReorder={handleReorder}
                        renderItem={(product) => (
                            <div className="flex items-center gap-4 py-3 px-1">
                                {/* Product image or icon */}
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {product.image
                                        ? <img src={product.image} alt={product.name} className="w-10 h-10 object-cover" />
                                        : <span className="text-xl">{product.icon || '📦'}</span>
                                    }
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-semibold text-admin-navy truncate">{product.name}</p>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                            product.type === 'export'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {product.type === 'export' ? 'Export' : 'Import'}
                                        </span>
                                        {product.category && (
                                            <span className="text-xs text-gray-500">{product.category}</span>
                                        )}
                                    </div>
                                    {product.description && (
                                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">{product.description}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Toggle checked={product.is_active} onChange={() => handleToggleActive(product)} />
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleting(product)}
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
                title="Delete Product"
                message={`Delete "${deleting?.name}"? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </AdminLayout>
    )
}
