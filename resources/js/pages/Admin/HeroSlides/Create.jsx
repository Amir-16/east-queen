import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/components/admin/AdminLayout'
import FormCard from '@/components/admin/FormCard'
import HeroSlideForm from './_HeroSlideForm'

export default function Create({ presets }) {
    const { data, setData, post, processing, errors } = useForm({
        image_path:       '',
        media_type:       'image',
        video_url:        '',
        title:            '',
        subtitle:         '',
        description:      '',
        cta_text:         '',
        cta_url:          '',
        label:            '',
        category:         '',
        animation_preset: 'zoom_out',
        is_active:        true,
    })

    return (
        <AdminLayout title="Add Hero Slide">
            <Head title="Add Hero Slide — Admin" />
            <FormCard title="New Slide">
                <HeroSlideForm
                    data={data} setData={setData} errors={errors}
                    presets={presets}
                    onSubmit={(e) => { e.preventDefault(); post('/admin/hero-slides') }}
                    processing={processing}
                    submitLabel="Create Slide"
                />
            </FormCard>
        </AdminLayout>
    )
}
