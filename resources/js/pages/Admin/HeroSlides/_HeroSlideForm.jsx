import { Link } from '@inertiajs/react'
import { ImageField, Toggle } from '@/components/admin'

export default function HeroSlideForm({ data, setData, errors, presets, onSubmit, processing, submitLabel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">

            {/* Media Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="media_type"
                            value="image"
                            checked={data.media_type === 'image'}
                            onChange={() => setData('media_type', 'image')}
                            className="text-green-600 focus:ring-green-200"
                        />
                        <span className="text-sm text-gray-700">Image</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="media_type"
                            value="video"
                            checked={data.media_type === 'video'}
                            onChange={() => setData('media_type', 'video')}
                            className="text-green-600 focus:ring-green-200"
                        />
                        <span className="text-sm text-gray-700">Video</span>
                    </label>
                </div>
                {errors.media_type && <p className="mt-1 text-xs text-red-500">{errors.media_type}</p>}
            </div>

            {/* Slide Image (shown when media_type === 'image') */}
            {data.media_type !== 'video' && (
                <ImageField
                    label="Slide Image"
                    value={data.image_path}
                    onChange={v => setData('image_path', v)}
                    error={errors.image_path}
                />
            )}

            {/* Video URL (shown when media_type === 'video') */}
            {data.media_type === 'video' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                    <input
                        type="text"
                        value={data.video_url}
                        onChange={e => setData('video_url', e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    />
                    {errors.video_url && <p className="mt-1 text-xs text-red-500">{errors.video_url}</p>}
                </div>
            )}

            {/* Slide Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slide Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    placeholder="e.g. Welcome to East Queen Group"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Subtitle */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Company Name</label>
                <input
                    type="text"
                    value={data.subtitle}
                    onChange={e => setData('subtitle', e.target.value)}
                    placeholder="e.g. East Queen Group"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                />
                {errors.subtitle && <p className="mt-1 text-xs text-red-500">{errors.subtitle}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={3}
                    placeholder="Slide description or tagline..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 resize-y"
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            {/* CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                    <input
                        type="text"
                        value={data.cta_text}
                        onChange={e => setData('cta_text', e.target.value)}
                        placeholder="e.g. Learn More"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    />
                    {errors.cta_text && <p className="mt-1 text-xs text-red-500">{errors.cta_text}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button URL</label>
                    <input
                        type="text"
                        value={data.cta_url}
                        onChange={e => setData('cta_url', e.target.value)}
                        placeholder="e.g. /about"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    />
                    {errors.cta_url && <p className="mt-1 text-xs text-red-500">{errors.cta_url}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Label */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                    <input
                        type="text"
                        value={data.label}
                        onChange={e => setData('label', e.target.value)}
                        placeholder="e.g. Farm Panorama"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    />
                    {errors.label && <p className="mt-1 text-xs text-red-500">{errors.label}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                        placeholder="e.g. Aquaculture"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    />
                    {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                </div>

                {/* Animation Preset */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Animation Preset *</label>
                    <select
                        value={data.animation_preset}
                        onChange={e => setData('animation_preset', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    >
                        {Object.entries(presets).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    {errors.animation_preset && <p className="mt-1 text-xs text-red-500">{errors.animation_preset}</p>}
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-3 pt-6">
                    <Toggle checked={data.is_active} onChange={v => setData('is_active', v)} />
                    <span className="text-sm text-gray-700">Visible on site</span>
                </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <Link href="/admin/hero-slides" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Hero Slides
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
                        : submitLabel
                    }
                </button>
            </div>
        </form>
    )
}
