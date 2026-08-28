import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import TimelineForm from './_TimelineForm'

export default function CreateTimelineEntry() {
    const { data, setData, post, processing, errors } = useForm({
        year: '', title: '', desc: '', done: false, sort_order: 0,
    })

    return (
        <AdminLayout title="New Timeline Entry" subtitle="Add a milestone to the roadmap">
            <Head title="New Timeline Entry — Admin" />
            <TimelineForm
                data={data} setData={setData} errors={errors}
                processing={processing} onSubmit={e => { e.preventDefault(); post('/admin/timeline') }}
                isEdit={false}
            />
        </AdminLayout>
    )
}
