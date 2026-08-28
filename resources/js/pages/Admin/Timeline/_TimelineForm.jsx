import { Link } from '@inertiajs/react'
import { FormCard, Toggle } from '@/components/admin'

export default function TimelineForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormCard title="Timeline Entry">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                        <input
                            type="text"
                            value={data.year}
                            onChange={e => setData('year', e.target.value)}
                            placeholder="e.g. 2025"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="e.g. RB-RAS Rollout"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea
                            value={data.desc}
                            onChange={e => setData('desc', e.target.value)}
                            rows={3}
                            placeholder="Brief description of this milestone"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.desc && <p className="text-red-500 text-xs mt-1">{errors.desc}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                        <Toggle
                            checked={data.done}
                            onChange={v => setData('done', v)}
                        />
                        <span className="text-sm text-gray-700">Mark as completed</span>
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
                </div>
            </FormCard>

            <div className="flex items-center justify-between pt-2">
                <Link href="/admin/timeline" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Timeline
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Entry'
                    }
                </button>
            </div>
        </form>
    )
}
