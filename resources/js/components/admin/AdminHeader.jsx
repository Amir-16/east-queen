import { useEffect, useRef, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
  BellIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

export default function AdminHeader({ title = '', subtitle = '', onMenuToggle }) {
  const { props: { adminUser, unreadContacts = 0 } } = usePage()
  const [open, setOpen] = useState(false)
  const dropdownRef     = useRef(null)

  const initials = adminUser?.name
    ? adminUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD'

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-light-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-lg text-dark-300 hover:bg-light-100 hover:text-dark transition-colors flex-shrink-0"
          aria-label="Open navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        {/* Page title */}
        <div className="min-w-0">
          <h1 className="font-display font-bold text-dark text-base md:text-lg leading-tight truncate">{title}</h1>
          {subtitle && (
            <p className="text-dark-300 font-body text-xs mt-0.5 truncate hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* View Site link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body text-dark-300
                     border border-light-200 hover:border-primary hover:text-primary transition-colors duration-200"
        >
          <GlobeAltIcon className="w-4 h-4" />
          View Site
        </a>

        {/* Notification bell → inbox */}
        <Link
          href="/admin/contacts"
          className="relative p-2 rounded-lg text-dark-300 hover:bg-light-100 hover:text-primary transition-colors duration-200"
        >
          <BellIcon className="w-5 h-5" />
          {unreadContacts > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold font-body flex items-center justify-center">
              {unreadContacts > 9 ? '9+' : unreadContacts}
            </span>
          )}
        </Link>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 pl-3 border-l border-light-200 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-admin flex items-center justify-center text-admin-gold font-display font-bold text-xs shadow-admin flex-shrink-0">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="font-body font-semibold text-dark text-xs leading-tight">
                {adminUser?.name ?? 'Administrator'}
              </p>
              <p className="font-body text-dark-300 text-[11px]">Admin</p>
            </div>
            <ChevronDownIcon
              className={`hidden md:block w-3.5 h-3.5 text-dark-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-admin-lg border border-light-200 py-1 z-50 animate-fade-in">
              <div className="px-3 py-2.5 border-b border-light-200">
                <p className="text-xs font-semibold text-dark font-body truncate">{adminUser?.name}</p>
                <p className="text-[11px] text-dark-300 font-body truncate mt-0.5">{adminUser?.email}</p>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm font-body text-dark-400 hover:bg-light-100 hover:text-primary transition-colors"
              >
                <GlobeAltIcon className="w-4 h-4" />
                View Site
              </a>
              <button
                type="button"
                onClick={() => { setOpen(false); router.post('/admin/logout') }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-body text-red-500 hover:bg-red-50 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
