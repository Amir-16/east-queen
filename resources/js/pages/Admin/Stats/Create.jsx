import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import StatForm from './_StatForm'

export default function CreateStat() {
    const { data, setData, post, processing, errors } = useForm({
        label:      '',
        value:      '',
        suffix:     '+',
        icon:       '',
        sort_order: 0,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/stats')
    }

    return (
        <AdminLayout title="New Stat" subtitle="Add a key number to the homepage">
            <Head title="New Stat — Admin" />
            <StatForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEdit={false}
            />
        </AdminLayout>
    )
}
