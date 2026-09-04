import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import DifferentiatorForm from './_DifferentiatorForm'

export default function CreateDifferentiator() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', body: '', image: '', chip_color: 'bg-gold-500', sort_order: 0,
    })

    return (
        <AdminLayout title="New Differentiator" subtitle="Add a card to the 'What Sets Us Apart' section">
            <Head title="New Differentiator — Admin" />
            <DifferentiatorForm
                data={data} setData={setData} errors={errors}
                processing={processing} onSubmit={e => { e.preventDefault(); post('/admin/differentiators') }}
                isEdit={false}
            />
        </AdminLayout>
    )
}
