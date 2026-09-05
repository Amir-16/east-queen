import { Link } from '@inertiajs/react'
import { FormCard, Toggle } from '@/components/admin'

function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function GalleryCategoryForm({
    data, setData, errors, processing, onSubmit, isEdit = false,
}) {
    const handleLabelChange = (value) => {
        setData('label', value)
        if (!isEdit) setData('slug', slugify(value))
    }

    return (
        <form onSubmit={onSubmit} className="max-w-lg space-y-6">
            <FormCard title="Category Details">
                <div className="space-y-4">

                    {/* Label */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Label <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.label}
                            onChange={e => handleLabelChange(e.target.value)}
                            placeholder="e.g. Operations"
                            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                                errors.label
                                    ? 'border-red-300 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                            }`}
                        />
                        {errors.label && <p className="mt-1 text-xs text-red-600">{errors.label}</p>}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug <span className="text-red-500">*</span>
                        </label>
                        {isEdit ? (
                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                                <code className="text-sm text-gray-600">{data.slug}</code>
                                <span className="ml-auto text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
                                    immutable
                                </span>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                    placeholder="e.g. operations"
                                    className={`w-full border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 ${
                                        errors.slug
                                            ? 'border-red-300 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                                    }`}
                                />
                                <p className="mt-1 text-xs text-gray-400">
                                    Auto-filled from label. Used internally — cannot be changed after creation.
                                </p>
                                {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                            </>
                        )}
                    </div>

                    {/* Sort order */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                        <input
                            type="number"
                            min={0}
                            value={data.sort_order}
                            onChange={e => setData('sort_order', e.target.value)}
                            className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                        />
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-3 pt-1">
                        <Toggle checked={data.is_active} onChange={v => setData('is_active', v)} />
                        <span className="text-sm text-gray-700">Visible on site</span>
                    </div>
                </div>
            </FormCard>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <Link href="/admin/gallery-categories" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Categories
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-lg disabled:opacity-60 transition-colors"
                    style={{ background: processing ? '#6BAF3A99' : '#1A3D1A' }}
                    onMouseEnter={e => { if (!processing) e.currentTarget.style.background = '#2E6B2E' }}
                    onMouseLeave={e => { if (!processing) e.currentTarget.style.background = '#1A3D1A' }}
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Create Category'
                    }
                </button>
            </div>
        </form>
    )
}
