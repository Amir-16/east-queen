import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import TimelineForm from './_TimelineForm'

export default function EditTimelineEntry() {
    const { entry } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        year:       entry.year       ?? '',
        title:      entry.title      ?? '',
        desc:       entry.desc       ?? '',
        done:       entry.done       ?? false,
        sort_order: entry.sort_order ?? 0,
    })

    return (
        <AdminLayout title="Edit Timeline Entry" subtitle={entry.title}>
            <Head title={`Edit ${entry.title} — Admin`} />
            <TimelineForm
                data={data} setData={setData} errors={errors}
                processing={processing}
                onSubmit={e => { e.preventDefault(); put(`/admin/timeline/${entry.id}`) }}
                isEdit={true}
            />
        </AdminLayout>
    )
}
