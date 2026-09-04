import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import CoreValueForm from './_CoreValueForm'

export default function CreateCoreValue() {
    const { data, setData, post, processing, errors } = useForm({
        icon_name: 'Shield', title: '', tagline: '', description: '', detail: '', sort_order: 0,
    })

    return (
        <AdminLayout title="New Core Value" subtitle="Add a value to the Core Values page">
            <Head title="New Core Value — Admin" />
            <CoreValueForm
                data={data} setData={setData} errors={errors}
                processing={processing} onSubmit={e => { e.preventDefault(); post('/admin/core-values') }}
                isEdit={false}
            />
        </AdminLayout>
    )
}
