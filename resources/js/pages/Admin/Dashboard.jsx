import { Head, Link, usePage } from '@inertiajs/react'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import {
  ArrowRightIcon,
  ChatBubbleLeftEllipsisIcon,
  FolderOpenIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  BanknotesIcon,
  ClockIcon,
  CpuChipIcon,
  PhotoIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import AdminLayout  from '@/components/admin/AdminLayout'
import FormCard     from '@/components/admin/FormCard'
import InquiryChart from '@/components/admin/InquiryChart'
import StatCard     from '@/components/admin/StatCard'
import StatusBadge  from '@/components/admin/StatusBadge'

/* ── Content section tiles ─────────────────────────────────────────────── */
const CONTENT_SECTIONS = [
  { label: 'Projects',     href: '/admin/projects',     icon: FolderOpenIcon,     bg: '#ECFDF5', color: '#059669', desc: 'Portfolio entries'    },
  { label: 'Statistics',   href: '/admin/stats',        icon: ChartBarSquareIcon, bg: '#EFF6FF', color: '#2563EB', desc: 'Key metrics ticker'   },
  { label: 'Financials',   href: '/admin/financials',   icon: BanknotesIcon,      bg: '#FFFBEB', color: '#D97706', desc: 'Financial data'        },
  { label: 'Timeline',     href: '/admin/timeline',     icon: ClockIcon,          bg: '#F5F3FF', color: '#7C3AED', desc: 'Company milestones'   },
  { label: 'Technologies', href: '/admin/technologies', icon: CpuChipIcon,        bg: '#ECFEFF', color: '#0891B2', desc: 'Tech & agri stack'    },
  { label: 'Gallery',      href: '/admin/gallery',      icon: PhotoIcon,          bg: '#FFF1F2', color: '#E11D48', desc: 'Media & photos'       },
  { label: 'Partnership',  href: '/admin/pillars',      icon: LinkIcon,           bg: '#EEF2FF', color: '#4F46E5', desc: 'Pillars & values'     },
  { label: 'Team',         href: '/admin/team',         icon: UserGroupIcon,      bg: '#F0FDFA', color: '#0D9488', desc: 'Team members'         },
]

/* ── Quick actions ─────────────────────────────────────────────────────── */
const QUICK_ACTIONS = [
  { label: 'Add Project',  href: '/admin/projects/create', icon: FolderOpenIcon,     bg: '#ECFDF5', color: '#059669', border: '#6EE7B7' },
  { label: 'Add Stat',     href: '/admin/stats/create',    icon: ChartBarSquareIcon, bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  { label: 'Add Member',   href: '/admin/team/create',     icon: UserGroupIcon,      bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
]

/* ── Sub-components ────────────────────────────────────────────────────── */
function ContentTile({ section }) {
  const Icon = section.icon
  return (
    <Link
      href={section.href}
      className="group flex items-center gap-3.5 p-4 bg-white rounded-xl border border-gray-100 shadow-card
                 hover:shadow-card-hover hover:border-gray-200 transition-all duration-200"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ background: section.bg }}
      >
        <Icon className="w-5 h-5" style={{ color: section.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800 font-body">{section.label}</p>
        <p className="text-xs text-gray-400 font-body truncate">{section.desc}</p>
      </div>
      <ArrowRightIcon
        className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
      />
    </Link>
  )
}

function ContactRow({ contact }) {
  let timeAgo = ''
  try { timeAgo = formatDistanceToNow(parseISO(contact.created_at), { addSuffix: true }) }
  catch { timeAgo = contact.created_at }

  return (
    <Link
      href={`/admin/contacts/${contact.id}`}
      className="flex items-start justify-between gap-3 py-3 group hover:bg-gray-50 -mx-4 px-4 rounded-xl transition-colors"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-body font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors truncate">
          {contact.name}
        </p>
        {contact.service && (
          <p className="text-xs font-body text-gray-400 truncate">{contact.service}</p>
        )}
        <p className="text-xs font-body text-gray-400 mt-0.5">{timeAgo}</p>
      </div>
      <StatusBadge status={contact.status} />
    </Link>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const { stats, chartData, recentContacts, adminUser, unreadContacts = 0 } = usePage().props
  const today     = format(new Date(), 'EEEE, d MMMM yyyy')
  const firstName = adminUser?.name?.split(' ')[0] ?? 'Admin'

  return (
    <AdminLayout title="Dashboard" subtitle={today}>
      <Head title="Dashboard — Admin" />

      {/* ── Welcome banner ─────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-4 sm:p-6 mb-5 md:mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A3D1A 0%, #265926 55%, #1A4A1A 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/[0.06] pointer-events-none" />
        <div className="absolute right-24 -bottom-14 w-36 h-36 rounded-full bg-white/[0.04] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-white/50 text-[10px] font-body font-bold uppercase tracking-[0.15em] mb-1">
              East Queen Group &mdash; Admin Panel
            </p>
            <h2 className="font-display font-black text-lg sm:text-xl text-white leading-tight">
              Welcome back, {firstName}
            </h2>
            <p className="text-white/55 text-xs sm:text-sm font-body mt-1">{today}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {unreadContacts > 0 && (
              <Link
                href="/admin/contacts"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/25 bg-white/10
                           hover:bg-white/18 transition-colors text-white text-xs sm:text-sm font-body font-semibold"
              >
                <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
                {unreadContacts} new {unreadContacts === 1 ? 'inquiry' : 'inquiries'}
              </Link>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-white/20 bg-white/8
                         hover:bg-white/15 transition-colors text-white/70 hover:text-white text-xs sm:text-sm font-body"
            >
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              View Site
            </a>
          </div>
        </div>
      </div>

      {/* ── KPI cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
        <StatCard
          icon={FolderOpenIcon}
          label="Active Projects"
          value={stats?.projects}
          subtext="in portfolio"
          color="gold"
          href="/admin/projects"
        />
        <StatCard
          icon={ChartBarSquareIcon}
          label="Stats Ticker"
          value={stats?.stats}
          subtext="live metrics"
          color="blue"
          href="/admin/stats"
        />
        <StatCard
          icon={UserGroupIcon}
          label="Team Members"
          value={stats?.teamContacts}
          subtext="currently active"
          color="green"
          href="/admin/team"
        />
        <StatCard
          icon={ChatBubbleLeftEllipsisIcon}
          label="Inquiries"
          value={stats?.totalContacts}
          subtext={stats?.newContacts > 0 ? `${stats.newContacts} unread` : 'all read'}
          color={stats?.newContacts > 0 ? 'red' : 'blue'}
          href="/admin/contacts"
        />
      </div>

      {/* ── Content manager overview ────────────────────────────────────── */}
      <div className="mb-5 md:mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-gray-800 text-sm tracking-tight">Content Manager</h3>
          <span className="text-[11px] text-gray-400 font-body font-medium">{CONTENT_SECTIONS.length} sections</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {CONTENT_SECTIONS.map((s) => <ContentTile key={s.href} section={s} />)}
        </div>
      </div>

      {/* ── Chart + Recent inquiries ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
        <div className="lg:col-span-2">
          <FormCard
            title="Inquiry Trend"
            description="Incoming inquiries over the last 30 days"
          >
            <InquiryChart data={chartData ?? []} />
          </FormCard>
        </div>

        <FormCard
          title="Recent Inquiries"
          headerAction={
            <Link
              href="/admin/contacts"
              className="inline-flex items-center gap-1 text-xs font-body font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              View All <ArrowRightIcon className="w-3 h-3" />
            </Link>
          }
        >
          {!recentContacts?.length ? (
            <p className="text-sm font-body text-gray-400 py-8 text-center">No inquiries yet.</p>
          ) : (
            <div className="divide-y divide-gray-50 -my-2">
              {recentContacts.map((c) => <ContactRow key={c.id} contact={c} />)}
            </div>
          )}
        </FormCard>
      </div>

      {/* ── Quick actions ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-gray-800 text-sm tracking-tight">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl border-2 border-dashed
                           transition-all duration-200 hover:border-solid"
                style={{ borderColor: action.border, background: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = action.bg }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                  style={{ background: action.bg }}
                >
                  <PlusIcon className="w-4 h-4" style={{ color: action.color }} />
                </div>
                <span className="text-xs font-body font-bold" style={{ color: action.color }}>
                  {action.label}
                </span>
              </Link>
            )
          })}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl border-2 border-dashed
                       border-gray-200 hover:border-solid hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs font-body font-bold text-gray-500">View Site</span>
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}
