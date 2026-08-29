import { Link } from '@inertiajs/react'

const THEMES = {
  navy:   { accent: '#0B1628', light: '#EEF2FF', text: '#3B5BDB' },
  gold:   { accent: '#C9A44C', light: '#FDF8EE', text: '#A07830' },
  teal:   { accent: '#0D9488', light: '#F0FDFA', text: '#0D9488' },
  rose:   { accent: '#E11D48', light: '#FFF1F2', text: '#E11D48' },
  violet: { accent: '#7C3AED', light: '#F5F3FF', text: '#7C3AED' },
  sky:    { accent: '#0284C7', light: '#F0F9FF', text: '#0284C7' },
  // legacy aliases
  blue:   { accent: '#0284C7', light: '#F0F9FF', text: '#0284C7' },
  green:  { accent: '#0D9488', light: '#F0FDFA', text: '#0D9488' },
  red:    { accent: '#E11D48', light: '#FFF1F2', text: '#E11D48' },
}

export default function StatCard({ icon: Icon, value, label, subtext, color = 'navy', href }) {
  const t = THEMES[color] ?? THEMES.navy

  const inner = (
    <div
      className="relative bg-white rounded-2xl overflow-hidden group transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: t.accent }} />

      <div className="p-5 pt-6">
        <div className="flex items-start justify-between mb-4">
          {/* Icon bubble */}
          {Icon && (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: t.light }}
            >
              <Icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
          )}
          {/* Subtle arrow on hover */}
          {href && (
            <svg
              className="w-4 h-4 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
              style={{ color: t.accent }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </div>

        <p
          className="font-black text-3xl text-slate-900 leading-none mb-1.5 tabular-nums"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
        >
          {value ?? '—'}
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
          {label}
        </p>
        {subtext && (
          <p className="text-xs font-medium mt-1.5" style={{ color: t.text }}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  )

  if (href) return <Link href={href} className="block">{inner}</Link>
  return inner
}
