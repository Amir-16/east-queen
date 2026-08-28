import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import AssociateForm from './_AssociateForm'

export default function AssociatesEdit() {
    const { associate } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        name:        associate.name        ?? '',
        initials:    associate.initials    ?? '',
        logo:        associate.logo        ?? '',
        country:     associate.country     ?? '',
        website:     associate.website     ?? '',
        description: associate.description ?? '',
        color:       associate.color       ?? 'bg-navy-800',
        sort_order:  associate.sort_order  ?? 0,
        is_active:   associate.is_active   ?? true,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/associates/${associate.id}`)
    }

    return (
        <AdminLayout title="Edit Associate" subtitle={associate.name}>
            <Head title={`Edit ${associate.name} — Admin`} />
            <AssociateForm
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
