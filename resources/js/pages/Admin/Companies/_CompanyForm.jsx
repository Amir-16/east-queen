import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { FormCard, ImageField, Toggle } from '@/components/admin'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

const INDUSTRY_OPTIONS = [
    { value: 'trading',      label: 'Trading' },
    { value: 'shipping',     label: 'Shipping' },
    { value: 'energy',       label: 'Energy' },
    { value: 'fisheries',    label: 'Fisheries' },
    { value: 'food',         label: 'Food' },
    { value: 'construction', label: 'Construction' },
    { value: 'other',        label: 'Other' },
]

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

export default function CompanyForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Ariko International Ltd."
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
                                    placeholder="e.g. ariko-international"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                <p className="text-xs text-gray-400 mt-1">URL identifier e.g. ariko-international</p>
                                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                <select
                                    value={data.industry}
                                    onChange={e => setData('industry', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                >
                                    <option value="">— Select industry —</option>
                                    {INDUSTRY_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                                <input
                                    type="text"
                                    value={data.tagline}
                                    onChange={e => setData('tagline', e.target.value)}
                                    placeholder="Short company tagline"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Founded</label>
                                <input
                                    type="number"
                                    min={1900}
                                    max={2100}
                                    value={data.founded}
                                    onChange={e => setData('founded', e.target.value)}
                                    placeholder="e.g. 2005"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.founded && <p className="text-red-500 text-xs mt-1">{errors.founded}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.team_size}
                                    onChange={e => setData('team_size', e.target.value)}
                                    placeholder="e.g. 50"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.team_size && <p className="text-red-500 text-xs mt-1">{errors.team_size}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input
                                    type="url"
                                    value={data.website}
                                    onChange={e => setData('website', e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
                            </div>

                            <div className="sm:col-span-2 flex items-center gap-3">
                                <Toggle checked={data.is_active} onChange={v => setData('is_active', v)} />
                                <span className="text-sm text-gray-700">Active (visible on site)</span>
                            </div>
                        </div>
                    </FormCard>

                    {/* Description */}
                    <FormCard title="Description">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                                placeholder="Brief description shown on company cards..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-y"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
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

                    {/* Services */}
                    <FormCard title="Services">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                        <TagInput
                            items={data.services || []}
                            onChange={v => setData('services', v)}
                            placeholder="e.g. International Logistics"
                        />
                        {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
                    </FormCard>

                    {/* Export/Import Items */}
                    <FormCard title="Trade Items">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Export Items</label>
                                <TagInput
                                    items={data.export_items || []}
                                    onChange={v => setData('export_items', v)}
                                    placeholder="e.g. Frozen Fish"
                                />
                                {errors.export_items && <p className="text-red-500 text-xs mt-1">{errors.export_items}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Import Items</label>
                                <TagInput
                                    items={data.import_items || []}
                                    onChange={v => setData('import_items', v)}
                                    placeholder="e.g. Machinery"
                                />
                                {errors.import_items && <p className="text-red-500 text-xs mt-1">{errors.import_items}</p>}
                            </div>
                        </div>
                    </FormCard>
                </div>

                {/* ── Right column (1/3) ── */}
                <div className="space-y-5">

                    {/* Media */}
                    <FormCard title="Media">
                        <div className="space-y-4">
                            <ImageField
                                label="Logo"
                                value={data.logo}
                                onChange={v => setData('logo', v)}
                                error={errors.logo}
                            />
                            <ImageField
                                label="Cover Image"
                                value={data.cover_image}
                                onChange={v => setData('cover_image', v)}
                                error={errors.cover_image}
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">PDF Profile URL</label>
                                <input
                                    type="text"
                                    value={data.pdf_url}
                                    onChange={e => setData('pdf_url', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                {errors.pdf_url && <p className="text-red-500 text-xs mt-1">{errors.pdf_url}</p>}
                            </div>
                        </div>
                    </FormCard>

                    {/* Color & Order */}
                    <FormCard title="Color & Order">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                <input
                                    type="text"
                                    value={data.color}
                                    onChange={e => setData('color', e.target.value)}
                                    placeholder="e.g. from-navy-900 to-navy-700"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                />
                                <p className="text-xs text-gray-400 mt-1">Tailwind gradient e.g. from-navy-900 to-navy-700</p>
                                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
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
                        </div>
                    </FormCard>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between pt-2">
                <Link href="/admin/companies" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Companies
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Add Company'
                    }
                </button>
            </div>
        </form>
    )
}
