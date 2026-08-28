import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import ProductForm from './_ProductForm'

export default function ProductsEdit() {
    const { product } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        name:             product.name             ?? '',
        slug:             product.slug             ?? '',
        type:             product.type             ?? 'export',
        category:         product.category         ?? '',
        detail_title:     product.detail_title     ?? '',
        icon:             product.icon             ?? '',
        sort_order:       product.sort_order       ?? 0,
        is_active:        product.is_active        ?? true,
        description:      product.description      ?? '',
        long_description: product.long_description ?? [],
        specs:            product.specs            ?? {},
        tags:             product.tags             ?? [],
        use_cases:        product.use_cases        ?? [],
        image:            product.image            ?? '',
        gallery_images:   product.gallery_images   ?? [],
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/products/${product.id}`)
    }

    return (
        <AdminLayout title="Edit Product" subtitle={product.name}>
            <Head title={`Edit ${product.name} — Admin`} />
            <ProductForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEdit={true}
            />
        </AdminLayout>
    )
}
