import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import DifferentiatorForm from './_DifferentiatorForm'

export default function EditDifferentiator({ item }) {
    const { data, setData, patch, processing, errors } = useForm({
        title:      item.title      ?? '',
        body:       item.body       ?? '',
        image:      item.image      ?? '',
        chip_color: item.chip_color ?? 'bg-gold-500',
        sort_order: item.sort_order ?? 0,
    })

    return (
        <AdminLayout title="Edit Differentiator" subtitle={`Editing: ${item.title}`}>
            <Head title={`Edit Differentiator — Admin`} />
            <DifferentiatorForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); patch(`/admin/differentiators/${item.id}`) }}
                isEdit={true}
            />
        </AdminLayout>
    )
}
