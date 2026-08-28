import { Link, router, usePage } from '@inertiajs/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  FolderOpenIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  ChartBarSquareIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  ClockIcon,
  CpuChipIcon,
  PhotoIcon,
  LinkIcon,
  FilmIcon,
  BuildingOffice2Icon,
  CubeIcon,
  ArrowPathIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline'

const DEEP_GREEN  = '#1A3D1A'
const LIGHT_GREEN = '#EBF4E8'
const TEXT_DARK   = '#1C2B1C'
const TEXT_MID    = '#4B6B4B'
const TEXT_LABEL  = '#8FAF8F'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Hero Slides',    href: '/admin/hero-slides',    icon: FilmIcon },
      { label: 'Companies',      href: '/admin/companies',      icon: BuildingOffice2Icon },
      { label: 'Products',       href: '/admin/products',       icon: CubeIcon },
      { label: 'Associates',     href: '/admin/associates',     icon: UserGroupIcon },
      { label: 'Process Steps',  href: '/admin/process-steps',  icon: ArrowPathIcon },
      { label: 'Marquee Items',  href: '/admin/marquee',        icon: QueueListIcon },
      { label: 'Stats',          href: '/admin/stats',          icon: ChartBarSquareIcon },
      { label: 'Timeline',       href: '/admin/timeline',       icon: ClockIcon },
      { label: 'Gallery',        href: '/admin/gallery',        icon: PhotoIcon },
    ],
  },
  {
    label: 'Inbox',
    items: [
      { label: 'Inquiries', href: '/admin/contacts', icon: ChatBubbleLeftEllipsisIcon, badge: true },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { label: 'Settings',    href: '/admin/settings', icon: Cog6ToothIcon },
      { label: 'Admin Users', href: '/admin/users',    icon: UserGroupIcon },
    ],
  },
]

function isActive(currentUrl, href) {
  const path = currentUrl.split('?')[0]
  return path === href || path.startsWith(href + '/')
}

function NavItem({ item, currentUrl, unreadCount, onNavigate }) {
  const Icon   = item.icon
  const active = isActive(currentUrl, item.href)

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
      style={active
        ? { background: DEEP_GREEN, color: '#ffffff', fontWeight: 700, boxShadow: '0 2px 12px rgba(26,61,26,0.25)' }
        : { color: TEXT_DARK, fontWeight: 500 }
      }
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = LIGHT_GREEN; e.currentTarget.style.color = DEEP_GREEN } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_DARK } }}
    >
      <Icon
        className="w-[18px] h-[18px] flex-shrink-0 transition-colors"
        style={{ color: active ? '#ffffff' : TEXT_MID }}
      />
      <span className="flex-1 truncate" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: active ? '0.01em' : '0' }}>
        {item.label}
      </span>
      {item.badge && unreadCount > 0 && (
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
          {unreadCount > 99 ? '99+' : unreadCount}
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
        // Base — always full height, fixed on mobile, static on desktop
        'fixed inset-y-0 left-0 z-40 w-64 flex flex-col flex-shrink-0',
        'transition-transform duration-300 ease-in-out',
        // Desktop: static in flow, always visible
        'lg:static lg:translate-x-0 lg:z-auto lg:transition-none',
        // Mobile: slide in/out
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      style={{ background: '#ffffff', borderRight: '1px solid #E2EBE2' }}
    >
      {/* Brand */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid #E2EBE2' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img src="/eq-logo.png" alt="East Queen Group" className="h-9 w-auto flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-sm leading-tight truncate" style={{ color: TEXT_DARK, fontFamily: 'Plus Jakarta Sans, Inter, sans-serif' }}>
              East Queen Group
            </p>
            <p className="text-xs font-medium" style={{ color: DEEP_GREEN, fontFamily: 'Inter, sans-serif' }}>
              Admin Panel
            </p>
          </div>
        </div>

        {/* Close button — mobile only */}
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          aria-label="Close sidebar"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p
              className="px-3 mb-1.5 select-none"
              style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_LABEL, fontFamily: 'Inter, sans-serif' }}
            >
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavItem
                    item={item}
                    currentUrl={url}
                    unreadCount={unreadContacts}
                    onNavigate={onClose}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 space-y-0.5 flex-shrink-0" style={{ borderTop: '1px solid #E2EBE2' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
          style={{ color: TEXT_DARK, fontFamily: 'Inter, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.background = LIGHT_GREEN; e.currentTarget.style.color = DEEP_GREEN }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_DARK }}
        >
          <GlobeAltIcon className="w-[18px] h-[18px] flex-shrink-0" style={{ color: TEXT_MID }} />
          <span className="flex-1">View Site</span>
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" style={{ color: TEXT_LABEL }} />
        </a>

        <button
          type="button"
          onClick={() => router.post('/admin/logout')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
          style={{ color: TEXT_DARK, fontFamily: 'Inter, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#DC2626' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_DARK }}
        >
          <ArrowRightOnRectangleIcon className="w-[18px] h-[18px] flex-shrink-0" style={{ color: TEXT_MID }} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
