import { Link } from '@inertiajs/react'
import { FormCard, Toggle, ImageField, VideoField } from '@/components/admin'

const CATEGORIES = ['fish', 'cattle', 'fruits', 'farm', 'team', 'videos']

export default function GalleryMediaForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    const isVideo = data.type === 'video'

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">

                    {/* ── Type + Category ── */}
                    <FormCard title="Media Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                                <div className="flex gap-2">
                                    {['image', 'video'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => { setData('type', t); setData('src', '') }}
                                            className={`px-4 py-2 rounded-lg border text-sm transition-all capitalize ${
                                                data.type === t
                                                    ? 'border-green-600 bg-green-50 text-green-800 font-semibold'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            {t === 'video' ? '🎬 Video' : '🖼 Image'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                                >
                                    {CATEGORIES.map(c => (
                                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Source — ImageField or VideoField */}
                            <div className="sm:col-span-2">
                                {isVideo ? (
                                    <VideoField
                                        label="Video Source *"
                                        value={data.src}
                                        onChange={v => setData('src', v)}
                                        error={errors.src}
                                    />
                                ) : (
                                    <ImageField
                                        label="Image Source *"
                                        value={data.src}
                                        onChange={v => setData('src', v)}
                                        error={errors.src}
                                    />
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="e.g. Golden Hour Feeding"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                                />
                            </div>

                            {/* Sort order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                                />
                            </div>

                            {/* Caption */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                                <input
                                    type="text"
                                    value={data.caption}
                                    onChange={e => setData('caption', e.target.value)}
                                    placeholder="Short description shown on hover"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                                />
                            </div>

                            {/* Visibility */}
                            <div className="flex items-center gap-3">
                                <Toggle checked={data.is_active} onChange={v => setData('is_active', v)} />
                                <span className="text-sm text-gray-700">Visible on site</span>
                            </div>
                        </div>
                    </FormCard>
                </div>

                {/* Preview sidebar — image only (video preview is inline in VideoField) */}
                {data.src && !isVideo && (
                    <div>
                        <FormCard title="Preview">
                            <img
                                src={data.src}
                                alt="preview"
                                className="w-full rounded-lg object-cover aspect-video"
                                onError={e => { e.currentTarget.style.opacity = '0.3' }}
                            />
                        </FormCard>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <Link href="/admin/gallery" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Gallery
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
                        : isEdit ? 'Save Changes' : 'Add Media'
                    }
                </button>
            </div>
        </form>
    )
}
