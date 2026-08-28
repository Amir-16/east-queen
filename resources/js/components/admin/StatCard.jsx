import { Link } from '@inertiajs/react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const COLORS = {
  blue:  { border: '#2563EB', iconBg: '#EFF6FF', iconColor: '#2563EB', subtextColor: '#3B82F6' },
  gold:  { border: '#059669', iconBg: '#ECFDF5', iconColor: '#059669', subtextColor: '#10B981' },
  green: { border: '#7C3AED', iconBg: '#F5F3FF', iconColor: '#7C3AED', subtextColor: '#8B5CF6' },
  red:   { border: '#E11D48', iconBg: '#FFF1F2', iconColor: '#E11D48', subtextColor: '#F43F5E' },
}

export default function StatCard({ icon: Icon, value, label, subtext, color = 'blue', href }) {
  const c = COLORS[color] ?? COLORS.blue

  const inner = (
    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: c.border }} />

      <div className="flex items-start justify-between mb-3 sm:mb-4 pt-1">
        <p className="text-gray-400 text-[10px] font-body font-semibold uppercase tracking-widest leading-tight">
          {label}
        </p>
        {Icon && (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.iconBg }}>
            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: c.iconColor }} />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-display font-black text-2xl sm:text-[2rem] leading-none tracking-tight text-gray-900">
            {value ?? '—'}
          </p>
          {subtext && (
            <p className="text-xs font-body mt-1.5 font-semibold" style={{ color: c.subtextColor }}>
              {subtext}
            </p>
          )}
        </div>
        {href && (
          <ArrowRightIcon
            className="w-4 h-4 mb-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
            style={{ color: c.border }}
          />
        )}
      </div>
    </div>
  )

  if (href) return <Link href={href} className="block">{inner}</Link>
  return inner
}
