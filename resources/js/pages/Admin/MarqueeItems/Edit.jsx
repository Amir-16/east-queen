import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import MarqueeItemForm from './_MarqueeItemForm'

export default function MarqueeItemsEdit() {
    const { item } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        text:       item.text       ?? '',
        sort_order: item.sort_order ?? 0,
        is_active:  item.is_active  ?? true,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/marquee/${item.id}`)
    }

    return (
        <AdminLayout title="Edit Marquee Item" subtitle="Update scrolling ticker text">
            <Head title="Edit Marquee Item — Admin" />
            <MarqueeItemForm
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
