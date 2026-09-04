import { Link } from '@inertiajs/react'
import { FormCard, IconPickerField } from '@/components/admin'
import HeroIcon from '@/components/ui/HeroIcon'

export default function StatForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ── Main fields ── */}
                <div className="md:col-span-2 space-y-5">
                    <FormCard title="Stat Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                                <input
                                    type="text"
                                    value={data.label}
                                    onChange={(e) => setData('label', e.target.value)}
                                    placeholder="e.g. Projects Completed"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.label && <p className="text-red-500 text-xs mt-1">{errors.label}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    placeholder="e.g. 500"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                                <input
                                    type="text"
                                    value={data.suffix}
                                    onChange={(e) => setData('suffix', e.target.value)}
                                    placeholder="e.g. + or %"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <IconPickerField
                                    value={data.icon}
                                    onChange={(v) => setData('icon', v)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                            </div>
                        </div>
                    </FormCard>
                </div>

                {/* ── Preview ── */}
                <div>
                    <FormCard title="Preview">
                        <div className="flex flex-col items-center justify-center py-6 rounded-xl bg-admin-navy text-white gap-2">
                            {data.icon && (
                                <div className="w-12 h-12 rounded-xl bg-admin-gold/20 flex items-center justify-center mb-1">
                                    <HeroIcon name={data.icon} className="w-6 h-6 text-admin-gold" />
                                </div>
                            )}
                            <p className="text-4xl font-bold text-admin-gold leading-none">
                                {data.value || '0'}<span className="text-2xl">{data.suffix}</span>
                            </p>
                            <p className="text-sm text-white/70 text-center">{data.label || 'Stat label'}</p>
                        </div>
                    </FormCard>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                <Link href="/admin/stats" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Stats
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Stat'
                    }
                </button>
            </div>
        </form>
    )
}
