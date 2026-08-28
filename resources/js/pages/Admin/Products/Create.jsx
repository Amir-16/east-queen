import { useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import ProductForm from './_ProductForm'

export default function ProductsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name:             '',
        slug:             '',
        type:             'export',
        category:         '',
        detail_title:     '',
        icon:             '',
        sort_order:       0,
        is_active:        true,
        description:      '',
        long_description: [],
        specs:            {},
        tags:             [],
        use_cases:        [],
        image:            '',
        gallery_images:   [],
    })

    // Auto-derive slug from name
    useEffect(() => {
        const slug = data.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        setData('slug', slug)
    }, [data.name])

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/products')
    }

    return (
        <AdminLayout title="New Product" subtitle="Add an export or import product">
            <Head title="New Product — Admin" />
            <ProductForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    )
}
