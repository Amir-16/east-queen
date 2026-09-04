import { Link, router, usePage } from '@inertiajs/react'
import {
  HomeIcon,
  FilmIcon,
  BuildingOffice2Icon,
  CubeIcon,
  UserGroupIcon,
  ArrowPathIcon,
  QueueListIcon,
  ChartBarSquareIcon,
  ClockIcon,
  PhotoIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/outline'

const NAV = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard',     href: '/admin/dashboard',     icon: HomeIcon },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'Hero Slides',   href: '/admin/hero-slides',   icon: FilmIcon },
      { label: 'Companies',     href: '/admin/companies',     icon: BuildingOffice2Icon },
      { label: 'Products',      href: '/admin/products',      icon: CubeIcon },
      { label: 'Associates',    href: '/admin/associates',    icon: UserGroupIcon },
      { label: 'Process Steps', href: '/admin/process-steps', icon: ArrowPathIcon },
      { label: 'Marquee Items', href: '/admin/marquee',       icon: QueueListIcon },
      { label: 'Stats',          href: '/admin/stats',          icon: ChartBarSquareIcon },
      { label: 'Timeline',       href: '/admin/timeline',       icon: ClockIcon },
      { label: 'Differentiators',href: '/admin/differentiators',icon: SparklesIcon },
      { label: 'Core Values',    href: '/admin/core-values',    icon: StarIcon },
      { label: 'Gallery',        href: '/admin/gallery',        icon: PhotoIcon },
    ],
  },
  {
    group: 'Inbox',
    items: [
      { label: 'Inquiries',     href: '/admin/contacts',      icon: ChatBubbleLeftEllipsisIcon, badge: true },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings',      href: '/admin/settings',      icon: Cog6ToothIcon },
      { label: 'Admin Users',   href: '/admin/users',         icon: UserGroupIcon },
    ],
  },
]

function isActive(url, href) {
  const path = url.split('?')[0]
  return path === href || path.startsWith(href + '/')
}

function NavItem({ item, url, unread, onClose }) {
  const Icon   = item.icon
  const active = isActive(url, item.href)

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 select-none"
      style={active
        ? { background: 'linear-gradient(135deg, #C9A44C 0%, #E8C06B 100%)', color: '#0B1628', fontWeight: 600, boxShadow: '0 2px 10px rgba(201,164,76,0.30)' }
        : { color: 'rgba(255,255,255,0.55)' }
      }
      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent' } }}
    >
      <Icon
        className="w-[17px] h-[17px] flex-shrink-0 transition-colors"
        style={{ color: active ? '#0B1628' : 'rgba(255,255,255,0.35)' }}
      />
      <span className="flex-1 truncate tracking-[0.01em]">{item.label}</span>
      {item.badge && unread > 0 && (
        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
          {unread > 99 ? '99+' : unread}
        </span>
      )}
    </Link>
  )
}

export default function AdminSidebar({ open = false, onClose }) {
  const { url, props: { unreadContacts = 0 } } = usePage()

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-[242px] flex flex-col flex-shrink-0',
        'transition-transform duration-300 ease-in-out',
        'lg:static lg:translate-x-0 lg:z-auto lg:transition-none',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      style={{ background: 'linear-gradient(180deg, #0B1628 0%, #0E1D36 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* ── Brand ── */}
      <div
        className="flex items-center justify-between gap-3 px-5 h-16 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Gold monogram */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C9A44C 0%, #A07830 100%)', boxShadow: '0 2px 12px rgba(201,164,76,0.35)' }}
          >
            <span className="font-black text-[11px] text-navy-950" style={{ fontFamily: 'Inter, sans-serif', color: '#0B1628' }}>
              EQ
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[13px] text-white leading-tight tracking-tight truncate" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              East Queen Group
            </p>
            <p className="text-[10px] font-medium tracking-[0.12em] uppercase" style={{ color: 'rgba(201,164,76,0.65)' }}>
              Admin Panel
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors flex-shrink-0"
          aria-label="Close sidebar"
        >
          <XMarkIcon className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto scrollbar-none">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <p
              className="px-3.5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] select-none"
              style={{ color: 'rgba(201,164,76,0.45)' }}
            >
              {group}
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item.href}>
                  <NavItem item={item} url={url} unread={unreadContacts} onClose={onClose} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom actions ── */}
      <div className="px-3 py-4 flex-shrink-0 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.07] transition-all duration-150"
        >
          <svg className="w-[17px] h-[17px] flex-shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>View Website</span>
        </a>

        <button
          type="button"
          onClick={() => router.post('/admin/logout')}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <ArrowRightOnRectangleIcon className="w-[17px] h-[17px] flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
