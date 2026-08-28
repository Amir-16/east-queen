import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import AssociateForm from './_AssociateForm'

export default function AssociatesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', initials: '', logo: '', country: '', website: '',
        description: '', color: 'bg-navy-800', sort_order: 0, is_active: true,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/associates')
    }

    return (
        <AdminLayout title="New Associate" subtitle="Add a business associate or partner">
            <Head title="New Associate — Admin" />
            <AssociateForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    )
}
