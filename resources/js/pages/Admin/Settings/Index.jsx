import { useState } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout, FormCard, ImageField } from '@/components/admin'
import {
    BuildingOfficeIcon,
    MagnifyingGlassIcon,
    ShareIcon,
    FilmIcon,
    InformationCircleIcon,
    UserCircleIcon,
    StarIcon,
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-5">
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

function AboutForm({ defaults }) {
    const { data, setData, patch, processing, errors } = useForm({
        overview_p1:     defaults.overview_p1     ?? '',
        overview_p2:     defaults.overview_p2     ?? '',
        vision_heading:  defaults.vision_heading  ?? '',
        vision_body:     defaults.vision_body     ?? '',
        mission_heading: defaults.mission_heading ?? '',
        mission_body:    defaults.mission_body    ?? '',
        spirit_tagline:  defaults.spirit_tagline  ?? '',
        glance_image:    defaults.glance_image    ?? '',
    })

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/about') }} className="space-y-5">
            <FormCard title="Company Overview" description="Shown at the top of the About page">
                <div className="space-y-4">
                    <Field label="Overview Paragraph 1" error={errors.overview_p1}>
                        <TextArea rows={4} value={data.overview_p1} onChange={(v) => setData('overview_p1', v)} placeholder="East Queen Group is one of Bangladesh's most respected…" />
                    </Field>
                    <Field label="Overview Paragraph 2" error={errors.overview_p2}>
                        <TextArea rows={3} value={data.overview_p2} onChange={(v) => setData('overview_p2', v)} placeholder="Founded by a visionary entrepreneur…" />
                    </Field>
                </div>
            </FormCard>

            <FormCard title="Vision & Mission Cards">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Vision Card Heading" error={errors.vision_heading}>
                        <TextInput value={data.vision_heading} onChange={(v) => setData('vision_heading', v)} placeholder="Leading Bangladesh's Industrial Transformation" />
                    </Field>
                    <Field label="Mission Card Heading" error={errors.mission_heading}>
                        <TextInput value={data.mission_heading} onChange={(v) => setData('mission_heading', v)} placeholder="A National & International Benchmark" />
                    </Field>
                    <Field label="Vision Card Body" error={errors.vision_body}>
                        <TextArea rows={3} value={data.vision_body} onChange={(v) => setData('vision_body', v)} placeholder="To lead Bangladesh's industrial transformation…" />
                    </Field>
                    <Field label="Mission Card Body" error={errors.mission_body}>
                        <TextArea rows={3} value={data.mission_body} onChange={(v) => setData('mission_body', v)} placeholder="To be recognized as a national and international benchmark…" />
                    </Field>
                </div>
            </FormCard>

            <FormCard title="Spirit & At-A-Glance">
                <div className="space-y-4">
                    <Field label="Spirit Tagline" hint='Shown in the dark banner ("Enterprise is our spirit.")' error={errors.spirit_tagline}>
                        <TextInput value={data.spirit_tagline} onChange={(v) => setData('spirit_tagline', v)} placeholder="Enterprise is our spirit." />
                    </Field>
                    <Field label="At-A-Glance Section Image" hint="Right-side image in the stats section">
                        <ImageField value={data.glance_image} onChange={(v) => setData('glance_image', v)} />
                    </Field>
                </div>
            </FormCard>

            <SaveBar processing={processing} />
        </form>
    )
}

function ChairmanForm({ defaults }) {
    const { data, setData, patch, processing, errors } = useForm({
        name:           defaults.name           ?? '',
        title:          defaults.title          ?? '',
        photo_url:      defaults.photo_url      ?? '',
        greeting_quote: defaults.greeting_quote ?? '',
        para_1:         defaults.para_1         ?? '',
        para_2:         defaults.para_2         ?? '',
        para_3:         defaults.para_3         ?? '',
        para_4:         defaults.para_4         ?? '',
        para_5:         defaults.para_5         ?? '',
    })

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/chairman') }} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-5">
                    <FormCard title="Identity">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Name" error={errors.name}>
                                <TextInput value={data.name} onChange={(v) => setData('name', v)} placeholder="A K M Abu Taher BSc." />
                            </Field>
                            <Field label="Title / Role" error={errors.title}>
                                <TextInput value={data.title} onChange={(v) => setData('title', v)} placeholder="Chairman, East Queen Group" />
                            </Field>
                            <div className="sm:col-span-2">
                                <Field label="Greeting Quote" hint='Shown in the pull-quote block ("Welcome to East Queen Group.")' error={errors.greeting_quote}>
                                    <TextInput value={data.greeting_quote} onChange={(v) => setData('greeting_quote', v)} placeholder="Welcome to East Queen Group." />
                                </Field>
                            </div>
                        </div>
                    </FormCard>

                    <FormCard title="Message Paragraphs">
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <Field key={n} label={`Paragraph ${n}`} error={errors[`para_${n}`]}>
                                    <TextArea rows={3} value={data[`para_${n}`]} onChange={(v) => setData(`para_${n}`, v)} placeholder={`Paragraph ${n}…`} />
                                </Field>
                            ))}
                        </div>
                    </FormCard>
                </div>

                <div>
                    <FormCard title="Portrait Photo" description="Shown sticky on desktop (3:4 ratio recommended)">
                        <ImageField value={data.photo_url} onChange={(v) => setData('photo_url', v)} />
                    </FormCard>
                </div>
            </div>
            <SaveBar processing={processing} />
        </form>
    )
}

function MissionVisionForm({ defaults }) {
    const { data, setData, patch, processing, errors } = useForm({
        m_heading:    defaults.m_heading    ?? '',
        m_body:       defaults.m_body       ?? '',
        m_detail:     defaults.m_detail     ?? '',
        m_image:      defaults.m_image      ?? '',
        v_heading:    defaults.v_heading    ?? '',
        v_body:       defaults.v_body       ?? '',
        v_detail:     defaults.v_detail     ?? '',
        v_image:      defaults.v_image      ?? '',
        p_heading:    defaults.p_heading    ?? '',
        p_body:       defaults.p_body       ?? '',
        p_detail:     defaults.p_detail     ?? '',
        p_image:      defaults.p_image      ?? '',
        bottom_quote: defaults.bottom_quote ?? '',
    })

    const pillars = [
        { prefix: 'm', label: 'Mission', num: '01' },
        { prefix: 'v', label: 'Vision',  num: '02' },
        { prefix: 'p', label: 'Purpose', num: '03' },
    ]

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch('/admin/settings/mission_vision') }} className="space-y-5">
            {pillars.map(({ prefix, label, num }) => (
                <FormCard key={prefix} title={`${num} · ${label}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-4">
                            <Field label="Heading" error={errors[`${prefix}_heading`]}>
                                <TextInput value={data[`${prefix}_heading`]} onChange={(v) => setData(`${prefix}_heading`, v)} placeholder={`${label} heading…`} />
                            </Field>
                            <Field label="Body" error={errors[`${prefix}_body`]}>
                                <TextArea rows={3} value={data[`${prefix}_body`]} onChange={(v) => setData(`${prefix}_body`, v)} placeholder={`${label} body paragraph…`} />
                            </Field>
                            <Field label="Detail" hint="Expanded paragraph shown below the body" error={errors[`${prefix}_detail`]}>
                                <TextArea rows={3} value={data[`${prefix}_detail`]} onChange={(v) => setData(`${prefix}_detail`, v)} placeholder={`${label} detail…`} />
                            </Field>
                        </div>
                        <div>
                            <Field label="Image">
                                <ImageField value={data[`${prefix}_image`]} onChange={(v) => setData(`${prefix}_image`, v)} />
                            </Field>
                        </div>
                    </div>
                </FormCard>
            ))}

            <FormCard title="Bottom Quote" description="Displayed in the dark closing banner">
                <Field label="Quote Text" error={errors.bottom_quote}>
                    <TextArea rows={3} value={data.bottom_quote} onChange={(v) => setData('bottom_quote', v)} placeholder="These are not aspirational statements…" />
                </Field>
            </FormCard>

            <SaveBar processing={processing} />
        </form>
    )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'company',        label: 'Company',          icon: BuildingOfficeIcon },
    { id: 'seo',            label: 'SEO',              icon: MagnifyingGlassIcon },
    { id: 'social',         label: 'Social',           icon: ShareIcon },
    { id: 'ship_hero',      label: 'Hero Section',     icon: FilmIcon },
    { id: 'about',          label: 'About Page',       icon: InformationCircleIcon },
    { id: 'chairman',       label: 'Chairman',         icon: UserCircleIcon },
    { id: 'mission_vision', label: 'Mission & Vision', icon: StarIcon },
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

            {tab === 'company'        && <CompanyForm       defaults={settings.company        ?? {}} />}
            {tab === 'seo'            && <SeoForm           defaults={settings.seo            ?? {}} />}
            {tab === 'social'         && <SocialForm        defaults={settings.social         ?? {}} />}
            {tab === 'ship_hero'      && <ShipHeroForm      defaults={settings.ship_hero      ?? {}} />}
            {tab === 'about'          && <AboutForm         defaults={settings.about          ?? {}} />}
            {tab === 'chairman'       && <ChairmanForm      defaults={settings.chairman       ?? {}} />}
            {tab === 'mission_vision' && <MissionVisionForm defaults={settings.mission_vision ?? {}} />}
        </AdminLayout>
    )
}
