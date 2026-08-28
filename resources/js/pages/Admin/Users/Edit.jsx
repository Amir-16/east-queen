import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import UserForm from './_UserForm'

export default function EditUser() {
    const { user } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        name:                  user.name  ?? '',
        email:                 user.email ?? '',
        password:              '',
        password_confirmation: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/users/${user.id}`)
    }

    return (
        <AdminLayout title="Edit Admin User" subtitle={user.name}>
            <Head title={`Edit ${user.name} — Admin`} />
            <UserForm
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
