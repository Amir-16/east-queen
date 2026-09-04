import { Link } from '@inertiajs/react'
import { FormCard, Toggle } from '@/components/admin'

export default function MarqueeItemForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormCard title="Marquee Item">
                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text *</label>
                        <input
                            type="text"
                            value={data.text}
                            onChange={e => setData('text', e.target.value)}
                            maxLength={200}
                            placeholder="e.g. Trusted Globally · Excellence in Trade ·"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        <p className="text-xs text-gray-400 mt-1">{data.text.length}/200 characters</p>
                        {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text}</p>}
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

                    <div className="flex items-center gap-3">
                        <Toggle checked={data.is_active} onChange={v => setData('is_active', v)} />
                        <span className="text-sm text-gray-700">Active (visible on site)</span>
                    </div>
                </div>
            </FormCard>

            {/* ── Footer ── */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                <Link href="/admin/marquee" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Marquee Items
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Item'
                    }
                </button>
            </div>
        </form>
    )
}
