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
        long_description: Array.isArray(product.long_description) ? product.long_description : [],
        specs:            (product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs)) ? product.specs : {},
        tags:             Array.isArray(product.tags)             ? product.tags             : [],
        use_cases:        Array.isArray(product.use_cases)        ? product.use_cases        : [],
        image:            product.image            ?? '',
        gallery_images:   Array.isArray(product.gallery_images)  ? product.gallery_images   : [],
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
