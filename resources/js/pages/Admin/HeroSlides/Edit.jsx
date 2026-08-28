import { Head, useForm, usePage } from '@inertiajs/react'
import AdminLayout from '@/components/admin/AdminLayout'
import FormCard from '@/components/admin/FormCard'
import HeroSlideForm from './_HeroSlideForm'

export default function Edit({ presets }) {
    const { slide } = usePage().props

    const { data, setData, patch, processing, errors } = useForm({
        image_path:       slide.image_path       ?? '',
        media_type:       slide.media_type       ?? 'image',
        video_url:        slide.video_url        ?? '',
        title:            slide.title            ?? '',
        subtitle:         slide.subtitle         ?? '',
        description:      slide.description      ?? '',
        cta_text:         slide.cta_text         ?? '',
        cta_url:          slide.cta_url          ?? '',
        label:            slide.label            ?? '',
        category:         slide.category         ?? '',
        animation_preset: slide.animation_preset ?? 'zoom_out',
        is_active:        slide.is_active        ?? true,
        sort_order:       slide.sort_order        ?? 0,
    })

    return (
        <AdminLayout title="Edit Hero Slide" subtitle={slide.label}>
            <Head title="Edit Hero Slide — Admin" />
            <FormCard title="Edit Slide">
                <HeroSlideForm
                    data={data} setData={setData} errors={errors}
                    presets={presets}
                    onSubmit={(e) => { e.preventDefault(); patch(`/admin/hero-slides/${slide.id}`) }}
                    processing={processing}
                    submitLabel="Save Changes"
                />
            </FormCard>
        </AdminLayout>
    )
}
