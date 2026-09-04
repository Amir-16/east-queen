import { useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { FormCard, ImageField, Toggle } from '@/components/admin'

export default function AssociateForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    // Auto-derive initials from name
    useEffect(() => {
        if (!isEdit || !data.initials) {
            const derived = data.name
                .split(/\s+/)
                .filter(Boolean)
                .map(w => w[0].toUpperCase())
                .join('')
                .slice(0, 3)
            setData('initials', derived)
        }
    }, [data.name])

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ── Main column ── */}
                <div className="md:col-span-2 space-y-5">
                    <FormCard title="Associate Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Acme Corporation"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Initials</label>
                                <input
                                    type="text"
                                    value={data.initials}
                                    onChange={e => setData('initials', e.target.value.slice(0, 3).toUpperCase())}
                                    maxLength={3}
                                    placeholder="e.g. ACM"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                <p className="text-xs text-gray-400 mt-1">Auto-derived from name (max 3 chars)</p>
                                {errors.initials && <p className="text-red-500 text-xs mt-1">{errors.initials}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={e => setData('country', e.target.value)}
                                    placeholder="e.g. Bangladesh"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input
                                    type="url"
                                    value={data.website}
                                    onChange={e => setData('website', e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Brief description of the associate..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-y"
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color Class</label>
                                <input
                                    type="text"
                                    value={data.color}
                                    onChange={e => setData('color', e.target.value)}
                                    placeholder="e.g. bg-navy-800"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                <p className="text-xs text-gray-400 mt-1">e.g. bg-navy-800</p>
                                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                            </div>

                            <div className="sm:col-span-2 flex items-center gap-3">
                                <Toggle checked={data.is_active} onChange={v => setData('is_active', v)} />
                                <span className="text-sm text-gray-700">Active (visible on site)</span>
                            </div>
                        </div>
                    </FormCard>
                </div>

                {/* ── Right column ── */}
                <div className="space-y-5">
                    <FormCard title="Logo">
                        <ImageField
                            label="Logo"
                            value={data.logo}
                            onChange={v => setData('logo', v)}
                            error={errors.logo}
                        />
                    </FormCard>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                <Link href="/admin/associates" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Associates
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Associate'
                    }
                </button>
            </div>
        </form>
    )
}
