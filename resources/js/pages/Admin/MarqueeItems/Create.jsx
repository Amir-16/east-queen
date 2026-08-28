import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import MarqueeItemForm from './_MarqueeItemForm'

export default function MarqueeItemsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        text: '',
        sort_order: 0,
        is_active: true,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/marquee')
    }

    return (
        <AdminLayout title="New Marquee Item" subtitle="Add scrolling ticker text">
            <Head title="New Marquee Item — Admin" />
            <MarqueeItemForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    )
}
