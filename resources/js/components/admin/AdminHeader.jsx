import { useEffect, useRef, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
  BellIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

const BORDER = '#E8DDD2'
const RED     = '#D41C2C'

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
      className="flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10"
      style={{ background: '#FFFFFF', borderBottom: `1px solid ${BORDER}`, height: '72px' }}
    >
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-xl transition-colors"
          style={{ color: '#A89F96' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,28,44,0.07)'; e.currentTarget.style.color = RED }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#A89F96' }}
          aria-label="Open navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1
            className="font-bold text-[15px] md:text-base leading-tight truncate"
            style={{ color: '#1A1208', fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '-0.01em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] mt-0.5 truncate hidden sm:block" style={{ color: '#A89F96' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">

        {/* Bell */}
        <Link
          href="/admin/contacts"
          className="relative p-2 rounded-xl transition-colors"
          style={{ color: '#A89F96' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,28,44,0.07)'; e.currentTarget.style.color = RED }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#A89F96' }}
        >
          <BellIcon className="w-5 h-5" />
          {unreadContacts > 0 && (
            <span
              className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 px-0.5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ background: RED, lineHeight: 1 }}
            >
              {unreadContacts > 9 ? '9+' : unreadContacts}
            </span>
          )}
        </Link>

        {/* Divider */}
        <div className="w-px h-5 mx-1" style={{ background: BORDER }} />

        {/* User dropdown */}
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors"
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,28,44,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0"
              style={{ background: RED, color: '#fff' }}
            >
              {initials}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-[12px] font-semibold truncate max-w-[120px]" style={{ color: '#1A1208' }}>
                {adminUser?.name ?? 'Administrator'}
              </p>
              <p className="text-[10px]" style={{ color: '#A89F96' }}>Admin</p>
            </div>
            <ChevronDownIcon
              className={`hidden sm:block w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              style={{ color: '#A89F96' }}
            />
          </button>

          {open && (
            <div
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border py-2 z-50"
              style={{ borderColor: BORDER, boxShadow: '0 8px 32px rgba(26,18,8,0.12), 0 2px 8px rgba(26,18,8,0.06)' }}
            >
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <p className="text-[12px] font-semibold truncate" style={{ color: '#1A1208' }}>
                  {adminUser?.name}
                </p>
                <p className="text-[11px] truncate mt-0.5" style={{ color: '#A89F96' }}>
                  {adminUser?.email}
                </p>
              </div>

              <div className="py-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors"
                  style={{ color: '#3D3530' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FAF7F2'; e.currentTarget.style.color = '#1A1208' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3D3530' }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#A89F96' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Website
                </a>

                <button
                  type="button"
                  onClick={() => { setOpen(false); router.post('/admin/logout') }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors"
                  style={{ color: '#DC2626' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 flex-shrink-0" />
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
