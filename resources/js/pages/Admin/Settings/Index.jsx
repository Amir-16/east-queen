import { useState } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout, FormCard, ImageField } from '@/components/admin'
import {
    BuildingOfficeIcon,
    MagnifyingGlassIcon,
    ShareIcon,
    FilmIcon,
} from '@heroicons/react/24/outline'

// ── Primitives ───────────────────────────────────────────────────────────────

function Field({ label, hint, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

function TextInput({ value, onChange, placeholder, mono = false }) {
    return (
        <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold ${mono ? 'font-mono' : ''}`}
        />
    )
}

function TextArea({ value, onChange, rows = 3, placeholder, maxLen }) {
    const len = (value ?? '').length
    return (
        <div>
            <textarea
                rows={rows}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-none ${maxLen && len > maxLen ? 'border-red-400' : 'border-gray-300 focus:border-admin-gold'}`}
            />
            {maxLen && (
                <p className={`text-xs mt-1 text-right ${len > maxLen ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                    {len} / {maxLen}
                </p>
            )}
        </div>
    )
}

function SaveBar({ processing }) {
    return (
        <div className="flex justify-end pt-2">
            <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
            >
                {processing
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                    : 'Save Changes'
                }
            </button>
        </div>
    )
}

// ── Tab forms ────────────────────────────────────────────────────────────────

function CompanyForm({ defaults }) {
    const { data, setData, patch, processing, errors } = useForm({
        name:        defaults.name        ?? '',
        short_name:  defaults.short_name  ?? '',
        group:       defaults.group       ?? '',
        tagline:     defaults.tagline     ?? '',
        description: defaults.description ?? '',
        founded:     defaults.founded     ?? '',
        acreage:     defaults.acreage     ?? '',
        ponds:       defaults.ponds       ?? '',
        capacity:    defaults.capacity    ?? '',
        phone1:      defaults.phone1      ?? '',
        phone2:      defaults.phone2      ?? '',
        email:       defaults.email       ?? '',
        location:    defaults.location    ?? '',
        website:     defaults.website     ?? '',
    })

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/company') }} className="space-y-5">
            <FormCard title="Identity">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Field label="Company Full Name" error={errors.name}>
                            <TextInput value={data.name} onChange={(v) => setData('name', v)} placeholder="Syedpur Fisheries & Farms" />
                        </Field>
                    </div>
                    <Field label="Short Name">
                        <TextInput value={data.short_name} onChange={(v) => setData('short_name', v)} placeholder="East Queen Group" />
                    </Field>
                    <Field label="Parent Group">
                        <TextInput value={data.group} onChange={(v) => setData('group', v)} placeholder="East Queen Group" />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Tagline">
                            <TextInput value={data.tagline} onChange={(v) => setData('tagline', v)} placeholder="Precision Aquaculture & Agribusiness" />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Short Description" hint="Shown in footer and meta tags">
                            <TextArea rows={3} value={data.description} onChange={(v) => setData('description', v)} placeholder="One-paragraph overview…" />
                        </Field>
                    </div>
                </div>
            </FormCard>

            <FormCard title="Farm Stats">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Field label="Year Founded">
                        <TextInput value={data.founded} onChange={(v) => setData('founded', v)} placeholder="2010" />
                    </Field>
                    <Field label="Acreage">
                        <TextInput value={data.acreage} onChange={(v) => setData('acreage', v)} placeholder="65" />
                    </Field>
                    <Field label="Active Ponds">
                        <TextInput value={data.ponds} onChange={(v) => setData('ponds', v)} placeholder="38" />
                    </Field>
                    <Field label="Annual Capacity">
                        <TextInput value={data.capacity} onChange={(v) => setData('capacity', v)} placeholder="800 MT" />
                    </Field>
                </div>
            </FormCard>

            <FormCard title="Contact Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Primary Phone">
                        <TextInput value={data.phone1} onChange={(v) => setData('phone1', v)} placeholder="+8801713042261" mono />
                    </Field>
                    <Field label="Secondary Phone">
                        <TextInput value={data.phone2} onChange={(v) => setData('phone2', v)} placeholder="+8801713118999" mono />
                    </Field>
                    <Field label="Email Address">
                        <TextInput value={data.email} onChange={(v) => setData('email', v)} placeholder="info@syedpurfisheries.com" />
                    </Field>
                    <Field label="Location">
                        <TextInput value={data.location} onChange={(v) => setData('location', v)} placeholder="Syedpur, Sitakundu, Chattogram" />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Group Website">
                            <TextInput value={data.website} onChange={(v) => setData('website', v)} placeholder="https://eastqueengroup.com" mono />
                        </Field>
                    </div>
                </div>
            </FormCard>

            <SaveBar processing={processing} />
        </form>
    )
}

function SeoForm({ defaults }) {
    const { data, setData, patch, processing } = useForm({
        meta_title:       defaults.meta_title       ?? '',
        meta_description: defaults.meta_description ?? '',
        keywords:         defaults.keywords         ?? '',
        og_image:         defaults.og_image         ?? '',
        canonical_url:    defaults.canonical_url    ?? '',
    })

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/seo') }} className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                    <FormCard title="Search Engine Settings">
                        <div className="space-y-4">
                            <Field label="Meta Title" hint="Shown in browser tab and Google results">
                                <TextInput value={data.meta_title} onChange={(v) => setData('meta_title', v)} placeholder="Syedpur Fisheries & Farms | East Queen Group" />
                            </Field>
                            <Field label="Meta Description" hint="160 characters recommended">
                                <TextArea rows={3} value={data.meta_description} onChange={(v) => setData('meta_description', v)} placeholder="Bangladesh's most advanced precision aquaculture…" maxLen={160} />
                            </Field>
                            <Field label="Keywords" hint="Comma-separated">
                                <TextArea rows={2} value={data.keywords} onChange={(v) => setData('keywords', v)} placeholder="fisheries, aquaculture, RB-RAS, Bangladesh…" />
                            </Field>
                            <Field label="Canonical URL">
                                <TextInput value={data.canonical_url} onChange={(v) => setData('canonical_url', v)} placeholder="https://eastqueengroup.com" mono />
                            </Field>
                        </div>
                    </FormCard>
                </div>
                <div>
                    <FormCard title="Open Graph Image" description="Used when shared on social media (1200×630px)">
                        <ImageField value={data.og_image} onChange={(v) => setData('og_image', v)} />
                    </FormCard>
                </div>
            </div>
            <SaveBar processing={processing} />
        </form>
    )
}

function SocialForm({ defaults }) {
    const { data, setData, patch, processing } = useForm({
        facebook:  defaults.facebook  ?? '',
        instagram: defaults.instagram ?? '',
        linkedin:  defaults.linkedin  ?? '',
        youtube:   defaults.youtube   ?? '',
    })

    const SOCIALS = [
        { key: 'facebook',  label: 'Facebook',  placeholder: 'https://facebook.com/sffagro' },
        { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/sffagro' },
        { key: 'linkedin',  label: 'LinkedIn',  placeholder: 'https://linkedin.com/company/sff-agro' },
        { key: 'youtube',   label: 'YouTube',   placeholder: 'https://youtube.com/@sffagro' },
    ]

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/social') }} className="space-y-5">
            <FormCard title="Social Media Links" description="Leave blank to hide the icon from the footer">
                <div className="space-y-4">
                    {SOCIALS.map(({ key, label, placeholder }) => (
                        <Field key={key} label={label}>
                            <TextInput value={data[key]} onChange={(v) => setData(key, v)} placeholder={placeholder} mono />
                        </Field>
                    ))}
                </div>
            </FormCard>
            <SaveBar processing={processing} />
        </form>
    )
}

function ShipHeroForm({ defaults }) {
    const { data, setData, patch, processing, errors } = useForm({
        media_type:     defaults.media_type     ?? 'video',
        video_url:      defaults.video_url      ?? '',
        video_poster:   defaults.video_poster   ?? '',
        image_url:      defaults.image_url      ?? '',
        eyebrow:        defaults.eyebrow        ?? '',
        headline:       defaults.headline       ?? '',
        headline_accent: defaults.headline_accent ?? '',
        tagline:        defaults.tagline        ?? '',
        body:           defaults.body           ?? '',
        cta1_text:      defaults.cta1_text      ?? '',
        cta1_url:       defaults.cta1_url       ?? '',
        badge_text:     defaults.badge_text     ?? '',
    })

    const isVideo = data.media_type === 'video'

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/ship_hero') }} className="space-y-5">

            <FormCard title="Background Media">
                <div className="space-y-4">
                    <Field label="Media Type">
                        <div className="flex gap-4 mt-1">
                            {['video', 'image'].map((type) => (
                                <label key={type} className="inline-flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="media_type"
                                        value={type}
                                        checked={data.media_type === type}
                                        onChange={() => setData('media_type', type)}
                                        className="text-admin-gold focus:ring-admin-gold/30"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </Field>

                    {isVideo ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Video URL" hint="Path relative to /public (e.g. /videos/ops.mp4)" error={errors.video_url}>
                                <TextInput value={data.video_url} onChange={(v) => setData('video_url', v)} placeholder="/videos/operations/ops-2.mp4" mono />
                            </Field>
                            <Field label="Video Poster Image" hint="Shown while video loads" error={errors.video_poster}>
                                <ImageField value={data.video_poster} onChange={(v) => setData('video_poster', v)} error={errors.video_poster} />
                            </Field>
                        </div>
                    ) : (
                        <Field label="Background Image" error={errors.image_url}>
                            <ImageField value={data.image_url} onChange={(v) => setData('image_url', v)} error={errors.image_url} />
                        </Field>
                    )}
                </div>
            </FormCard>

            <FormCard title="Text Content">
                <div className="space-y-4">
                    <Field label="Eyebrow Text" hint="Small uppercase line above the headline" error={errors.eyebrow}>
                        <TextInput value={data.eyebrow} onChange={(v) => setData('eyebrow', v)} placeholder="East Queen Group · Est. 1982 · Chittagong, Bangladesh" />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            <Field label="Headline" hint="Full headline text" error={errors.headline}>
                                <TextInput value={data.headline} onChange={(v) => setData('headline', v)} placeholder="Global Export Import & Sourcing Solutions" />
                            </Field>
                        </div>
                        <Field label="Accent Word" hint="Word highlighted in gold" error={errors.headline_accent}>
                            <TextInput value={data.headline_accent} onChange={(v) => setData('headline_accent', v)} placeholder="Solutions" />
                        </Field>
                    </div>
                    <Field label="Tagline" hint="Uppercase sub-headline below the main headline" error={errors.tagline}>
                        <TextInput value={data.tagline} onChange={(v) => setData('tagline', v)} placeholder="Your Partner for Global Business & Sourcing" />
                    </Field>
                    <Field label="Body Text" error={errors.body}>
                        <TextArea rows={4} value={data.body} onChange={(v) => setData('body', v)} placeholder="From Chittagong to markets across four continents…" />
                    </Field>
                </div>
            </FormCard>

            <FormCard title="Call-to-Action & Badge">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Primary Button Text" error={errors.cta1_text}>
                        <TextInput value={data.cta1_text} onChange={(v) => setData('cta1_text', v)} placeholder="Explore Our Services" />
                    </Field>
                    <Field label="Primary Button URL" error={errors.cta1_url}>
                        <TextInput value={data.cta1_url} onChange={(v) => setData('cta1_url', v)} placeholder="/export" mono />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Badge Text" hint="Small pill shown bottom-left" error={errors.badge_text}>
                            <TextInput value={data.badge_text} onChange={(v) => setData('badge_text', v)} placeholder="Trusted Globally · Est. 1982" />
                        </Field>
                    </div>
                </div>
            </FormCard>

            <SaveBar processing={processing} />
        </form>
    )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'company',   label: 'Company',      icon: BuildingOfficeIcon },
    { id: 'seo',       label: 'SEO',          icon: MagnifyingGlassIcon },
    { id: 'social',    label: 'Social',       icon: ShareIcon },
    { id: 'ship_hero', label: 'Hero Section', icon: FilmIcon },
]

export default function SettingsIndex() {
    const { settings } = usePage().props
    const [tab, setTab] = useState('company')

    return (
        <AdminLayout title="Site Settings" subtitle="Changes take effect immediately on the public site">
            <Head title="Settings — Admin" />

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex gap-1 overflow-x-auto">
                    {TABS.map(({ id, label, icon: Icon }) => {
                        const active = tab === id
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setTab(id)}
                                className={[
                                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                                    active
                                        ? 'border-admin-gold text-admin-gold'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                ].join(' ')}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </button>
                        )
                    })}
                </nav>
            </div>

            {tab === 'company'   && <CompanyForm   defaults={settings.company   ?? {}} />}
            {tab === 'seo'       && <SeoForm       defaults={settings.seo       ?? {}} />}
            {tab === 'social'    && <SocialForm    defaults={settings.social    ?? {}} />}
            {tab === 'ship_hero' && <ShipHeroForm  defaults={settings.ship_hero ?? {}} />}
        </AdminLayout>
    )
}
