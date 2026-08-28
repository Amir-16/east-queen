import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import ProcessStepForm from './_ProcessStepForm'

export default function ProcessStepsEdit() {
    const { step } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        step_number:  step.step_number  ?? 1,
        title:        step.title        ?? '',
        description:  step.description  ?? '',
        icon:         step.icon         ?? '',
        sort_order:   step.sort_order   ?? 0,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/process-steps/${step.id}`)
    }

    return (
        <AdminLayout title="Edit Process Step" subtitle={step.title}>
            <Head title={`Edit ${step.title} — Admin`} />
            <ProcessStepForm
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
