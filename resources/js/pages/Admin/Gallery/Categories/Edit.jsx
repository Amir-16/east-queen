import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import GalleryCategoryForm from './_GalleryCategoryForm'

export default function EditGalleryCategory() {
    const { category } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        slug:       category.slug,
        label:      category.label      ?? '',
        sort_order: category.sort_order ?? 0,
        is_active:  category.is_active  ?? true,
    })

    return (
        <AdminLayout title="Edit Category" subtitle={category.label}>
            <Head title="Edit Category — Admin" />
            <GalleryCategoryForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); put(`/admin/gallery-categories/${category.id}`) }}
                isEdit={true}
            />
        </AdminLayout>
    )
}
