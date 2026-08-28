import { Link } from '@inertiajs/react'
import { FormCard } from '@/components/admin'

export default function ProcessStepForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Main column ── */}
                <div className="lg:col-span-2 space-y-5">
                    <FormCard title="Step Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Step Number *</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={data.step_number}
                                    onChange={e => setData('step_number', e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.step_number && <p className="text-red-500 text-xs mt-1">{errors.step_number}</p>}
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

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="e.g. Initial Consultation"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={e => setData('icon', e.target.value)}
                                    placeholder="e.g. TruckIcon"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                <p className="text-xs text-gray-400 mt-1">Heroicons name e.g. TruckIcon</p>
                                {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    placeholder="Describe this process step..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-y"
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>
                    </FormCard>
                </div>

                {/* ── Preview ── */}
                <div>
                    <FormCard title="Preview">
                        <div className="flex flex-col items-center justify-center py-6 rounded-xl bg-admin-navy text-white gap-2">
                            <div className="w-10 h-10 rounded-full bg-admin-gold flex items-center justify-center text-white font-bold text-lg">
                                {data.step_number || '?'}
                            </div>
                            <p className="text-sm font-semibold text-white text-center">{data.title || 'Step Title'}</p>
                            {data.icon && <p className="text-xs text-white/60">{data.icon}</p>}
                        </div>
                    </FormCard>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between pt-2">
                <Link href="/admin/process-steps" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Process Steps
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Step'
                    }
                </button>
            </div>
        </form>
    )
}
