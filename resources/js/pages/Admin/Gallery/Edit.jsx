import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import GalleryMediaForm from './_GalleryMediaForm'

export default function EditGalleryMedia() {
    const { media, categories } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        category:      media.category      ?? 'operations',
        type:          media.type          ?? 'image',
        src:           media.src           ?? '',
        thumbnail_src: media.thumbnail_src ?? '',
        title:         media.title         ?? '',
        caption:       media.caption       ?? '',
        sort_order:    media.sort_order    ?? 0,
        is_active:     media.is_active     ?? true,
    })

    return (
        <AdminLayout title="Edit Media" subtitle={media.title || media.src}>
            <Head title="Edit Media — Admin" />
            <GalleryMediaForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); put(`/admin/gallery/${media.id}`) }}
                isEdit={true}
                categories={categories}
            />
        </AdminLayout>
    )
}
