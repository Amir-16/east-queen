import { useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import CompanyForm from './_CompanyForm'

export default function CompaniesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name:             '',
        slug:             '',
        tagline:          '',
        industry:         '',
        founded:          '',
        team_size:        '',
        website:          '',
        is_active:        true,
        description:      '',
        long_description: [],
        services:         [],
        export_items:     [],
        import_items:     [],
        logo:             '',
        cover_image:      '',
        gallery_images:   [],
        pdf_url:          '',
        color:            '',
        sort_order:       0,
    })

    // Auto-derive slug from name
    useEffect(() => {
        const slug = data.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        setData('slug', slug)
    }, [data.name])

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/companies')
    }

    return (
        <AdminLayout title="New Company" subtitle="Add a group subsidiary company">
            <Head title="New Company — Admin" />
            <CompanyForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    )
}
