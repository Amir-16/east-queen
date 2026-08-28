import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import UserForm from './_UserForm'

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name:                  '',
        email:                 '',
        password:              '',
        password_confirmation: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/users')
    }

    return (
        <AdminLayout title="New Admin User" subtitle="Grant admin panel access">
            <Head title="New Admin User — Admin" />
            <UserForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEdit={false}
            />
        </AdminLayout>
    )
}
