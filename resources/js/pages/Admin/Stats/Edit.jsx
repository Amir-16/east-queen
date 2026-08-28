import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import StatForm from './_StatForm'

export default function EditStat() {
    const { stat } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        label:      stat.label      ?? '',
        value:      stat.value      ?? '',
        suffix:     stat.suffix     ?? '+',
        icon:       stat.icon       ?? '',
        sort_order: stat.sort_order ?? 0,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/stats/${stat.id}`)
    }

    return (
        <AdminLayout title="Edit Stat" subtitle={stat.label}>
            <Head title={`Edit ${stat.label} — Admin`} />
            <StatForm
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
