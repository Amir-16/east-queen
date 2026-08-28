import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/components/admin'
import CompanyForm from './_CompanyForm'

export default function CompaniesEdit() {
    const { company } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        name:             company.name             ?? '',
        slug:             company.slug             ?? '',
        tagline:          company.tagline          ?? '',
        industry:         company.industry         ?? '',
        founded:          company.founded          ?? '',
        team_size:        company.team_size        ?? '',
        website:          company.website          ?? '',
        is_active:        company.is_active        ?? true,
        description:      company.description      ?? '',
        long_description: company.long_description ?? [],
        services:         company.services         ?? [],
        export_items:     company.export_items     ?? [],
        import_items:     company.import_items     ?? [],
        logo:             company.logo             ?? '',
        cover_image:      company.cover_image      ?? '',
        gallery_images:   company.gallery_images   ?? [],
        pdf_url:          company.pdf_url          ?? '',
        color:            company.color            ?? '',
        sort_order:       company.sort_order       ?? 0,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/admin/companies/${company.id}`)
    }

    return (
        <AdminLayout title="Edit Company" subtitle={company.name}>
            <Head title={`Edit ${company.name} — Admin`} />
            <CompanyForm
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
