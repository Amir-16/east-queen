import { ArrowRight, Calendar, Users } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { cn } from '@/lib/cn'
import { INDUSTRY_COLORS } from '@/lib/constants'

export default function CompanyCard({ company, className }) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-200',
        className,
      )}
    >
      {/* Logo / header */}
      <div className="relative h-[170px] p-3 shrink-0" style={{ backgroundColor: company.color ?? '#1e3a5f' }}>
        <div className="w-full h-full bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-contain p-4"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Industry badge */}
        <span className={cn(
          'absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm',
          INDUSTRY_COLORS[company.industry],
        )}>
          {company.industry}
        </span>

        {/* Hover overlay — arrow appears */}
        <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/0 group-hover:border-white/40">
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-inter font-bold text-navy-900 text-lg leading-snug mb-0.5 group-hover:text-gold-600 transition-colors duration-200">
          {company.name}
        </h3>
        <p className="text-gold-500 text-[11px] font-semibold italic mb-3">{company.tagline}</p>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {company.description}
        </p>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {company.services.slice(0, 3).map((s) => (
            <span key={s} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-100 font-medium">
              {s}
            </span>
          ))}
        </div>

        {/* Footer meta + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex gap-4">
            {company.founded && (
              <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Calendar size={11} /> Est. {company.founded}
              </div>
            )}
            {company.team_size && (
              <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Users size={11} /> {company.team_size}+
              </div>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-gold-500 group-hover:text-gold-600 text-[12px] font-semibold transition-colors duration-200">
            Explore
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </Link>
  )
}
