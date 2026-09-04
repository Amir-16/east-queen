import { Link } from '@inertiajs/react'
import { FormCard } from '@/components/admin'
import ImageField from '@/components/admin/ImageField'

const CHIP_COLORS = [
    { value: 'bg-gold-500',  label: 'Gold'  },
    { value: 'bg-teal-500',  label: 'Teal'  },
    { value: 'bg-navy-700',  label: 'Navy'  },
    { value: 'bg-red-600',   label: 'Red'   },
]

export default function DifferentiatorForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormCard title="Differentiator">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="e.g. 40+ Years Proven Track Record"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Body *</label>
                        <textarea
                            value={data.body}
                            onChange={e => setData('body', e.target.value)}
                            rows={4}
                            placeholder="Descriptive paragraph shown on hover…"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-none"
                        />
                        {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chip Colour</label>
                            <select
                                value={data.chip_color}
                                onChange={e => setData('chip_color', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                            >
                                {CHIP_COLORS.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
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
                </div>
            </FormCard>

            <FormCard title="Background Image" description="Shown as the card's full-bleed background">
                <ImageField value={data.image} onChange={v => setData('image', v)} error={errors.image} />
            </FormCard>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                <Link href="/admin/differentiators" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Differentiators
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Differentiator'
                    }
                </button>
            </div>
        </form>
    )
}
