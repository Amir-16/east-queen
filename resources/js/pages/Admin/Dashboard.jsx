import { Head, Link, usePage } from '@inertiajs/react'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
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
  ArrowTopRightOnSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import AdminLayout  from '@/components/admin/AdminLayout'
import FormCard     from '@/components/admin/FormCard'
import InquiryChart from '@/components/admin/InquiryChart'
import StatCard     from '@/components/admin/StatCard'
import StatusBadge  from '@/components/admin/StatusBadge'

const SECTIONS = [
  { label: 'Hero Slides',   href: '/admin/hero-slides',   icon: FilmIcon,                  color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Companies',     href: '/admin/companies',     icon: BuildingOffice2Icon,        color: '#0284C7', bg: '#F0F9FF' },
  { label: 'Products',      href: '/admin/products',      icon: CubeIcon,                  color: '#0D9488', bg: '#F0FDFA' },
  { label: 'Associates',    href: '/admin/associates',    icon: UserGroupIcon,             color: '#C9A44C', bg: '#FDF8EE' },
  { label: 'Process Steps', href: '/admin/process-steps', icon: ArrowPathIcon,             color: '#E11D48', bg: '#FFF1F2' },
  { label: 'Marquee Items', href: '/admin/marquee',       icon: QueueListIcon,             color: '#0B1628', bg: '#EEF2FF' },
  { label: 'Stats',         href: '/admin/stats',         icon: ChartBarSquareIcon,        color: '#059669', bg: '#ECFDF5' },
  { label: 'Timeline',      href: '/admin/timeline',      icon: ClockIcon,                 color: '#D97706', bg: '#FFFBEB' },
  { label: 'Gallery',       href: '/admin/gallery',       icon: PhotoIcon,                 color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Inquiries',     href: '/admin/contacts',      icon: ChatBubbleLeftEllipsisIcon, color: '#E11D48', bg: '#FFF1F2' },
  { label: 'Settings',      href: '/admin/settings',      icon: Cog6ToothIcon,             color: '#64748B', bg: '#F8FAFC' },
  { label: 'Admin Users',   href: '/admin/users',         icon: UserGroupIcon,             color: '#0B1628', bg: '#EEF2FF' },
]

function SectionTile({ s }) {
  const Icon = s.icon
  return (
    <Link
      href={s.href}
      className="group flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 hover:-translate-y-px"
      style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + '40'; e.currentTarget.style.boxShadow = `0 4px 16px ${s.color}15` }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-150 group-hover:scale-105" style={{ background: s.bg }}>
        <Icon className="w-4.5 h-4.5" style={{ color: s.color }} />
      </div>
      <span className="text-[13px] font-semibold text-slate-700 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
        {s.label}
      </span>
    </Link>
  )
}

function ContactRow({ c }) {
  let ago = ''
  try { ago = formatDistanceToNow(parseISO(c.created_at), { addSuffix: true }) } catch { ago = c.created_at }

  return (
    <Link
      href={`/admin/contacts/${c.id}`}
      className="flex items-center justify-between gap-3 py-3 px-1 rounded-xl hover:bg-slate-50 -mx-1 transition-colors group"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
          {c.name}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
          {c.service ? `${c.service} · ` : ''}{ago}
        </p>
      </div>
      <StatusBadge status={c.status} />
    </Link>
  )
}

export default function Dashboard() {
  const { stats, chartData, recentContacts, adminUser, unreadContacts = 0 } = usePage().props
  const today     = format(new Date(), 'EEEE, d MMMM yyyy')
  const firstName = adminUser?.name?.split(' ')[0] ?? 'Admin'

  return (
    <AdminLayout title="Dashboard" subtitle={today}>
      <Head title="Dashboard" />

      {/* ── Welcome banner ─────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 sm:p-6 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B1628 0%, #162845 55%, #0E1D36 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,164,76,0.12) 0%, transparent 70%)' }} />
        <div className="absolute right-20 -bottom-12 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,164,76,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: 'rgba(201,164,76,0.60)', fontFamily: 'Inter, sans-serif' }}>
              East Queen Group · Admin Panel
            </p>
            <h2 className="font-bold text-xl text-white leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Welcome back, {firstName}
            </h2>
            <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif' }}>
              {today}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {unreadContacts > 0 && (
              <Link
                href="/admin/contacts"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150"
                style={{ background: 'rgba(201,164,76,0.15)', color: '#C9A44C', border: '1px solid rgba(201,164,76,0.25)', fontFamily: 'Inter, sans-serif' }}
              >
                <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
                {unreadContacts} new {unreadContacts === 1 ? 'inquiry' : 'inquiries'}
              </Link>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.10)', fontFamily: 'Inter, sans-serif' }}
            >
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              View Site
            </a>
          </div>
        </div>
      </div>

      {/* ── KPI stat cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard icon={BuildingOffice2Icon} label="Companies"   value={stats?.companies}     subtext="group companies"   color="navy"  href="/admin/companies" />
        <StatCard icon={ChartBarSquareIcon}  label="Stats"       value={stats?.stats}         subtext="live metrics"      color="gold"  href="/admin/stats" />
        <StatCard icon={UserGroupIcon}       label="Associates"  value={stats?.associates}    subtext="active partners"   color="teal"  href="/admin/associates" />
        <StatCard icon={ChatBubbleLeftEllipsisIcon} label="Inquiries" value={stats?.totalContacts}
          subtext={stats?.newContacts > 0 ? `${stats.newContacts} unread` : 'all read'}
          color={stats?.newContacts > 0 ? 'rose' : 'sky'}
          href="/admin/contacts"
        />
      </div>

      {/* ── Chart + Recent inquiries ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <FormCard title="Inquiry Trend" description="Incoming inquiries — last 30 days">
            <InquiryChart data={chartData ?? []} />
          </FormCard>
        </div>

        <FormCard
          title="Recent Inquiries"
          headerAction={
            <Link
              href="/admin/contacts"
              className="text-[11px] font-semibold transition-colors"
              style={{ color: '#C9A44C', fontFamily: 'Inter, sans-serif' }}
            >
              View all →
            </Link>
          }
        >
          {!recentContacts?.length ? (
            <p className="text-[13px] text-slate-400 py-8 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              No inquiries yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentContacts.map((c) => <ContactRow key={c.id} c={c} />)}
            </div>
          )}
        </FormCard>
      </div>

      {/* ── Content manager grid ────────────────────────────────────────────── */}
      <FormCard
        title="Content Manager"
        description={`${SECTIONS.length} manageable sections`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {SECTIONS.map((s) => <SectionTile key={s.href} s={s} />)}
        </div>
      </FormCard>
    </AdminLayout>
  )
}
