import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import CoreValueForm from './_CoreValueForm'

export default function EditCoreValue({ value }) {
    const { data, setData, patch, processing, errors } = useForm({
        icon_name:   value.icon_name   ?? 'Shield',
        title:       value.title       ?? '',
        tagline:     value.tagline     ?? '',
        description: value.description ?? '',
        detail:      value.detail      ?? '',
        sort_order:  value.sort_order  ?? 0,
    })

    return (
        <AdminLayout title="Edit Core Value" subtitle={`Editing: ${value.title}`}>
            <Head title="Edit Core Value — Admin" />
            <CoreValueForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); patch(`/admin/core-values/${value.id}`) }}
                isEdit={true}
            />
        </AdminLayout>
    )
}
