import { useEffect, useRef, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
  BellIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

export default function AdminHeader({ title = '', subtitle = '', onMenuToggle }) {
  const { props: { adminUser, unreadContacts = 0 } } = usePage()
  const [open, setOpen] = useState(false)
  const ref             = useRef(null)

  const initials = adminUser?.name
    ? adminUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD'

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <header
      className="h-16 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10"
      style={{ background: '#fff', borderBottom: '1px solid #E9EEF4' }}
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Open navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1
            className="font-bold text-slate-800 text-[15px] md:text-base leading-tight truncate"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '-0.01em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-400 text-[11px] mt-0.5 truncate hidden sm:block" style={{ fontFamily: 'Inter, sans-serif' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">

        {/* Bell */}
        <Link
          href="/admin/contacts"
          className="relative p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <BellIcon className="w-5 h-5" />
          {unreadContacts > 0 && (
            <span
              className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 px-0.5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ background: '#EF4444', lineHeight: 1 }}
            >
              {unreadContacts > 9 ? '9+' : unreadContacts}
            </span>
          )}
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1" />

        {/* User dropdown */}
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition-colors"
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0B1628 0%, #1a2f50 100%)', color: '#C9A44C' }}
            >
              {initials}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-[12px] font-semibold text-slate-700 truncate max-w-[120px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {adminUser?.name ?? 'Administrator'}
              </p>
              <p className="text-[10px] text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>Admin</p>
            </div>
            <ChevronDownIcon
              className={`hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <div
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border py-2 z-50"
              style={{ borderColor: '#E9EEF4', boxShadow: '0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid #E9EEF4' }}>
                <p className="text-[12px] font-semibold text-slate-800 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {adminUser?.name}
                </p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {adminUser?.email}
                </p>
              </div>

              <div className="py-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Website
                </a>

                <button
                  type="button"
                  onClick={() => { setOpen(false); router.post('/admin/logout') }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
