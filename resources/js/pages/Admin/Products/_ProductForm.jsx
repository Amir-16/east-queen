import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { FormCard, ImageField, Toggle } from '@/components/admin'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

function TagInput({ items, onChange, placeholder }) {
    const [inputVal, setInputVal] = useState('')

    function addTag() {
        const val = inputVal.trim()
        if (val && !items.includes(val)) {
            onChange([...items, val])
        }
        setInputVal('')
    }

    function removeTag(tag) {
        onChange(items.filter(t => t !== tag))
    }

    return (
        <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
                {items.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-admin-navy/10 text-admin-navy text-xs font-medium px-2 py-1 rounded-full">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                            <XMarkIcon className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                    placeholder={placeholder || 'Type and press Enter or Add'}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" /> Add
                </button>
            </div>
        </div>
    )
}

export default function ProductForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    // Convert specs object to pairs for display
    const [specPairs, setSpecPairs] = useState(() => {
        if (!data.specs) return []
        if (Array.isArray(data.specs)) return data.specs
        return Object.entries(data.specs).map(([key, value]) => ({ key, value }))
    })

    function updateSpecs(pairs) {
        setSpecPairs(pairs)
        const obj = {}
        pairs.forEach(({ key, value }) => { if (key) obj[key] = value })
        setData('specs', obj)
    }

    function addSpecRow() {
        updateSpecs([...specPairs, { key: '', value: '' }])
    }

    function removeSpecRow(index) {
        updateSpecs(specPairs.filter((_, i) => i !== index))
    }

    function updateSpecRow(index, field, value) {
        const updated = specPairs.map((pair, i) => i === index ? { ...pair, [field]: value } : pair)
        updateSpecs(updated)
    }

    function addParagraph() {
        setData('long_description', [...(data.long_description || []), ''])
    }

    function updateParagraph(index, value) {
        const updated = [...(data.long_description || [])]
        updated[index] = value
        setData('long_description', updated)
    }

    function removeParagraph(index) {
        setData('long_description', (data.long_description || []).filter((_, i) => i !== index))
    }

    function addGalleryImage(url) {
        if (url) {
            setData('gallery_images', [...(data.gallery_images || []), url])
        }
    }

    function removeGalleryImage(index) {
        setData('gallery_images', (data.gallery_images || []).filter((_, i) => i !== index))
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Main column (2/3) ── */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Basic Info */}
                    <FormCard title="Basic Info">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Frozen Shrimp"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    placeholder="e.g. frozen-shrimp"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                <div className="flex gap-4 pt-2">
                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="export"
                                            checked={data.type === 'export'}
                                            onChange={() => setData('type', 'export')}
                                            className="text-admin-gold focus:ring-admin-gold/40"
                                        />
                                        <span className="text-sm text-gray-700">Export</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="import"
                                            checked={data.type === 'import'}
                                            onChange={() => setData('type', 'import')}
                                            className="text-admin-gold focus:ring-admin-gold/40"
                                        />
                                        <span className="text-sm text-gray-700">Import</span>
                                    </label>
                                </div>
                                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    placeholder="e.g. Seafood"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Detail Page Title</label>
                                <input
                                    type="text"
                                    value={data.detail_title}
                                    onChange={e => setData('detail_title', e.target.value)}
                                    placeholder="e.g. Premium Frozen Shrimp"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.detail_title && <p className="text-red-500 text-xs mt-1">{errors.detail_title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Emoji Icon</label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={e => setData('icon', e.target.value.slice(0, 4))}
                                    maxLength={4}
                                    placeholder="e.g. 🦐"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                <p className="text-xs text-gray-400 mt-1">Emoji icon e.g. ⚙️ (max 4 chars)</p>
                                {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
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

                    {/* Description */}
                    <FormCard title="Description">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (card preview)</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows={3}
                            placeholder="Brief description shown on product cards..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-y"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </FormCard>

                    {/* Long Description */}
                    <FormCard title="Long Description">
                        <div className="space-y-3">
                            {(data.long_description || []).map((para, i) => (
                                <div key={i} className="flex gap-2">
                                    <textarea
                                        value={para}
                                        onChange={e => updateParagraph(i, e.target.value)}
                                        rows={3}
                                        placeholder={`Paragraph ${i + 1}`}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-y"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeParagraph(i)}
                                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 self-start mt-1"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addParagraph}
                                className="inline-flex items-center gap-1.5 text-sm text-admin-navy hover:text-admin-gold transition-colors"
                            >
                                <PlusIcon className="w-4 h-4" /> Add Paragraph
                            </button>
                        </div>
                    </FormCard>

                    {/* Specs */}
                    <FormCard title="Specifications">
                        <div className="space-y-2">
                            {specPairs.length > 0 && (
                                <div className="space-y-2">
                                    {specPairs.map((pair, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <input
                                                type="text"
                                                value={pair.key}
                                                onChange={e => updateSpecRow(i, 'key', e.target.value)}
                                                placeholder="Key (e.g. Weight)"
                                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                            />
                                            <input
                                                type="text"
                                                value={pair.value}
                                                onChange={e => updateSpecRow(i, 'value', e.target.value)}
                                                placeholder="Value (e.g. 1kg blocks)"
                                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSpecRow(i)}
                                                className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={addSpecRow}
                                className="inline-flex items-center gap-1.5 text-sm text-admin-navy hover:text-admin-gold transition-colors"
                            >
                                <PlusIcon className="w-4 h-4" /> Add Specification
                            </button>
                        </div>
                    </FormCard>

                    {/* Tags */}
                    <FormCard title="Tags">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <TagInput
                            items={data.tags || []}
                            onChange={v => setData('tags', v)}
                            placeholder="e.g. frozen, seafood, halal"
                        />
                        {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
                    </FormCard>

                    {/* Use Cases (import only) */}
                    {data.type === 'import' && (
                        <FormCard title="Use Cases">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Use Cases</label>
                            <TagInput
                                items={data.use_cases || []}
                                onChange={v => setData('use_cases', v)}
                                placeholder="e.g. Manufacturing, Construction"
                            />
                            {errors.use_cases && <p className="text-red-500 text-xs mt-1">{errors.use_cases}</p>}
                        </FormCard>
                    )}
                </div>

                {/* ── Right column (1/3) ── */}
                <div className="space-y-5">
                    <FormCard title="Media">
                        <div className="space-y-4">
                            <ImageField
                                label="Main Image"
                                value={data.image}
                                onChange={v => setData('image', v)}
                                error={errors.image}
                            />

                            {/* Gallery Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                                {(data.gallery_images || []).length > 0 && (
                                    <div className="space-y-1.5 mb-2">
                                        {(data.gallery_images || []).map((img, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <img src={img} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0 bg-gray-100" />
                                                <span className="flex-1 text-xs text-gray-600 truncate">{img}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(i)}
                                                    className="p-0.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ImageField
                                    label="Add Gallery Image"
                                    value=""
                                    onChange={addGalleryImage}
                                />
                            </div>
                        </div>
                    </FormCard>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between pt-2">
                <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Products
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Product'
                    }
                </button>
            </div>
        </form>
    )
}
