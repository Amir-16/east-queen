import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { format, parseISO } from 'date-fns'
import { AdminLayout, FormCard, ConfirmModal } from '@/components/admin'
import { PlusIcon, PencilSquareIcon, TrashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function UsersIndex() {
    const { users, adminUser } = usePage().props
    const [deleting, setDeleting] = useState(null)

    function handleDelete() {
        if (!deleting) return
        router.delete(`/admin/users/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        })
    }

    return (
        <AdminLayout title="Admin Users" subtitle="Users with access to this admin panel">
            <Head title="Admin Users — Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{users.length} admin user{users.length !== 1 ? 's' : ''}</p>
                <Link
                    href="/admin/users/create"
                    className="inline-flex items-center gap-1.5 bg-admin-gold text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-admin-gold/90 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Admin User
                </Link>
            </div>

            <FormCard>
                <div className="divide-y divide-gray-100">
                    {users.map((u, i) => {
                        const isSelf = u.id === adminUser?.id
                        return (
                            <div key={u.id} className="flex items-center gap-4 py-4 px-1">
                                {/* SL */}
                                <span className="w-7 text-center text-xs font-medium text-gray-400 tabular-nums flex-shrink-0 select-none">
                                    {i + 1}
                                </span>

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-admin-navy flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                    {u.name?.charAt(0).toUpperCase()}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-900 truncate">{u.name}</p>
                                        {isSelf && (
                                            <span className="text-xs bg-admin-gold/20 text-admin-gold px-2 py-0.5 rounded-full font-medium">You</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                                </div>

                                {/* Admin badge */}
                                <div className="hidden sm:flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium">
                                    <ShieldCheckIcon className="w-3.5 h-3.5" />
                                    Admin
                                </div>

                                {/* Joined date */}
                                <p className="hidden md:block text-xs text-gray-400 whitespace-nowrap">
                                    Since {format(parseISO(u.created_at), 'd MMM yyyy')}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <Link
                                        href={`/admin/users/${u.id}/edit`}
                                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-admin-navy transition-colors"
                                        title="Edit"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => !isSelf && setDeleting(u)}
                                        disabled={isSelf}
                                        title={isSelf ? 'Cannot delete your own account' : 'Delete'}
                                        className={`p-1.5 rounded transition-colors ${
                                            isSelf
                                                ? 'text-gray-200 cursor-not-allowed'
                                                : 'hover:bg-red-50 text-gray-400 hover:text-red-500'
                                        }`}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </FormCard>

            <ConfirmModal
                isOpen={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                title="Remove Admin User"
                message={`Remove "${deleting?.name}" (${deleting?.email}) from admin access? They will no longer be able to log in.`}
                confirmLabel="Remove User"
            />
        </AdminLayout>
    )
}
