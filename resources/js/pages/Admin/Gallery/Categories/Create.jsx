import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import GalleryCategoryForm from './_GalleryCategoryForm'

export default function CreateGalleryCategory() {
    const { data, setData, post, processing, errors } = useForm({
        slug: '', label: '', sort_order: 0, is_active: true,
    })

    return (
        <AdminLayout title="Add Category" subtitle="Create a new gallery category">
            <Head title="Add Category — Admin" />
            <GalleryCategoryForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); post('/admin/gallery-categories') }}
                isEdit={false}
            />
        </AdminLayout>
    )
}
