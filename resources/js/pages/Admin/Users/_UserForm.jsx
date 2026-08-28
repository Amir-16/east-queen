import { Link } from '@inertiajs/react'
import { FormCard } from '@/components/admin'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function UserForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    const [showPwd, setShowPwd] = useState(false)

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-lg">
            <FormCard title={isEdit ? 'Edit Admin User' : 'New Admin User'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Ahmed Hassan"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@jonith-bogdad.com"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password {isEdit && <span className="text-gray-400 font-normal">(leave blank to keep current)</span>}
                        </label>
                        <div className="relative">
                            <input
                                type={showPwd ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder={isEdit ? '••••••••' : 'Min. 8 characters'}
                                className="w-full border border-gray-300 rounded-lg px-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPwd ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type={showPwd ? 'text' : 'password'}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Repeat password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                    </div>

                    <div className="pt-1 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-700">
                        <strong>Note:</strong> This user will have full admin access to all content, settings, and contacts.
                    </div>
                </div>
            </FormCard>

            <div className="flex items-center justify-between">
                <Link href="/admin/users" className="text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Users
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 bg-admin-navy text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                >
                    {processing
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        : isEdit ? 'Save Changes' : 'Create Admin User'
                    }
                </button>
            </div>
        </form>
    )
}
