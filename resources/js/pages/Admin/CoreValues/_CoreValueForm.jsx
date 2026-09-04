import { Link } from '@inertiajs/react'
import { FormCard } from '@/components/admin'

const ICON_OPTIONS = [
    'Shield', 'Target', 'Handshake', 'Lightbulb',
    'Star', 'Heart', 'CheckCircle', 'Globe',
    'Zap', 'Award', 'Users', 'TrendingUp',
]

export default function CoreValueForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormCard title="Core Value">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon *</label>
                        <select
                            value={data.icon_name}
                            onChange={e => setData('icon_name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        >
                            {ICON_OPTIONS.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                            ))}
                        </select>
                        {errors.icon_name && <p className="text-red-500 text-xs mt-1">{errors.icon_name}</p>}
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="e.g. Integrity"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tagline *</label>
                        <input
                            type="text"
                            value={data.tagline}
                            onChange={e => setData('tagline', e.target.value)}
                            placeholder="e.g. We say what we mean."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows={3}
                            placeholder="Shown by default on the card…"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-none"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Detail <span className="text-gray-400 font-normal">(shown on hover)</span>
                        </label>
                        <textarea
                            value={data.detail}
                            onChange={e => setData('detail', e.target.value)}
                            rows={3}
                            placeholder="Expanded text revealed when hovering the card…"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-none"
                        />
                        {errors.detail && <p className="text-red-500 text-xs mt-1">{errors.detail}</p>}
                    </div>
                </div>
            </FormCard>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                <Link href="/admin/core-values" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Core Values
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Core Value'
                    }
                </button>
            </div>
        </form>
    )
}
