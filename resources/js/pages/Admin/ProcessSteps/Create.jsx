import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import ProcessStepForm from './_ProcessStepForm'

export default function ProcessStepsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        step_number: 1,
        title: '',
        description: '',
        icon: '',
        sort_order: 0,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/process-steps')
    }

    return (
        <AdminLayout title="New Process Step" subtitle="Add a step to your process workflow">
            <Head title="New Process Step — Admin" />
            <ProcessStepForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    )
}
