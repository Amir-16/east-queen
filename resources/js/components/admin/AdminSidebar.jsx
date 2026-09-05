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
  ArrowTopRightOnSquareIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

const NAV = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard',       href: '/admin/dashboard',      icon: HomeIcon },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'Hero Slides',     href: '/admin/hero-slides',    icon: FilmIcon },
      { label: 'Companies',       href: '/admin/companies',      icon: BuildingOffice2Icon },
      { label: 'Products',        href: '/admin/products',       icon: CubeIcon },
      { label: 'Associates',      href: '/admin/associates',     icon: UserGroupIcon },
      { label: 'Process Steps',   href: '/admin/process-steps',  icon: ArrowPathIcon },
      { label: 'Marquee Items',   href: '/admin/marquee',        icon: QueueListIcon },
      { label: 'Stats',           href: '/admin/stats',          icon: ChartBarSquareIcon },
      { label: 'Timeline',        href: '/admin/timeline',       icon: ClockIcon },
      { label: 'Differentiators', href: '/admin/differentiators',icon: SparklesIcon },
      { label: 'Core Values',     href: '/admin/core-values',    icon: StarIcon },
      { label: 'Gallery Categories', href: '/admin/gallery-categories', icon: TagIcon   },
      { label: 'Gallery',            href: '/admin/gallery',            icon: PhotoIcon },
    ],
  },
  {
    group: 'Inbox',
    items: [
      { label: 'Inquiries',       href: '/admin/contacts',       icon: ChatBubbleLeftEllipsisIcon, badge: true },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings',        href: '/admin/settings',       icon: Cog6ToothIcon },
      { label: 'Admin Users',     href: '/admin/users',          icon: UserGroupIcon },
    ],
  },
]

/* ── Brand colours ──────────────────────────────── */
const RED          = '#D41C2C'
const CREAM_BG     = '#FAF7F2'
const BORDER_COLOR = '#E8DDD2'
const IDLE_TEXT    = '#3D3530'
const IDLE_ICON    = '#A89F96'
const HOVER_BG     = 'rgba(212,28,44,0.07)'

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
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 select-none"
      style={active
        ? {
            background: RED,
            color: '#fff',
            fontWeight: 600,
            boxShadow: '0 2px 10px rgba(212,28,44,0.28)',
          }
        : { color: IDLE_TEXT }
      }
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = HOVER_BG
          e.currentTarget.style.color      = RED
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color      = IDLE_TEXT
        }
      }}
    >
      <Icon
        className="w-4 h-4 flex-shrink-0 transition-colors"
        style={{ color: active ? '#fff' : IDLE_ICON }}
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

/* Logo mark — just the flag + Q circle, cropped from the full SVG */
function LogoMark({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="40 4 195 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <line x1="70" y1="8"   x2="70"  y2="155" stroke="#1B5E20" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="70" cy="8" r="7" fill="#1B5E20" />
      <path
        d="M70,30 L224,40 C230,55 232,68 224,80 C232,92 230,105 224,120 L70,130 Z"
        fill="white" stroke="#1B5E20" strokeWidth="3.5" strokeLinejoin="round"
      />
      <line x1="58" y1="80" x2="82" y2="80" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round" />
      <circle cx="152" cy="80" r="40" fill="#E21F2F" />
      <rect x="175" y="101" width="24" height="13" rx="2" fill="white" transform="rotate(-25 175 101)" />
    </svg>
  )
}

export default function AdminSidebar({ open = false, onClose }) {
  const { url, props: { unreadContacts = 0 } } = usePage()

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-[248px] flex flex-col flex-shrink-0',
        'transition-transform duration-300 ease-in-out',
        'lg:static lg:translate-x-0 lg:z-auto lg:transition-none',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      style={{ background: CREAM_BG, borderRight: `1px solid ${BORDER_COLOR}` }}
    >
      {/* ── Brand ── */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ borderBottom: `1px solid ${BORDER_COLOR}`, height: '72px' }}
      >
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 min-w-0" onClick={onClose}>
          <LogoMark size={40} />
          <div className="min-w-0">
            <p
              className="font-black text-[15px] leading-none tracking-tight truncate"
              style={{ color: '#1A1208', fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              East Queen
            </p>
            <p
              className="text-[9px] font-bold tracking-[0.20em] uppercase mt-0.5"
              style={{ color: RED }}
            >
              Admin Panel
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: IDLE_ICON }}
          onMouseEnter={e => { e.currentTarget.style.background = HOVER_BG; e.currentTarget.style.color = RED }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = IDLE_ICON }}
          aria-label="Close sidebar"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-2.5 py-4 space-y-5 overflow-y-auto scrollbar-none">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <p
              className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-[0.20em] select-none"
              style={{ color: '#C4B8AC' }}
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

      {/* ── Footer actions ── */}
      <div
        className="px-2.5 py-3 flex-shrink-0 space-y-0.5"
        style={{ borderTop: `1px solid ${BORDER_COLOR}` }}
      >
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150"
          style={{ color: IDLE_TEXT }}
          onMouseEnter={e => { e.currentTarget.style.background = HOVER_BG; e.currentTarget.style.color = RED }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = IDLE_TEXT }}
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4 flex-shrink-0" style={{ color: IDLE_ICON }} />
          <span>View Website</span>
        </a>

        <button
          type="button"
          onClick={() => router.post('/admin/logout')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150"
          style={{ color: IDLE_TEXT }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#DC2626' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = IDLE_TEXT }}
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4 flex-shrink-0" style={{ color: IDLE_ICON }} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
