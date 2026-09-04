import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import GalleryMediaForm from './_GalleryMediaForm'

export default function CreateGalleryMedia() {
    const { categories } = usePage().props

    const { data, setData, post, processing, errors } = useForm({
        category:      categories[0]?.slug ?? '',
        type:          'image',
        src:           '',
        thumbnail_src: '',
        title:         '',
        caption:       '',
        sort_order:    0,
        is_active:     true,
    })

    return (
        <AdminLayout title="Add Media" subtitle="Upload a photo or video to the gallery">
            <Head title="Add Media — Admin" />
            <GalleryMediaForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); post('/admin/gallery') }}
                isEdit={false}
                categories={categories}
            />
        </AdminLayout>
    )
}
