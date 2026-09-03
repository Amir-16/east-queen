import { useState } from 'react'
import { CheckCircle2, ArrowRight, Calendar, Users } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { cn } from '@/lib/cn'
import { INDUSTRY_COLORS } from '@/lib/constants'

export default function CompanyCard({ company, className }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn('relative h-[440px] select-none', className)}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* 3-D flipper */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 580ms cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >

        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Gradient header + logo */}
          <div className="relative h-[170px] p-3" style={{ backgroundColor: company.color ?? '#1e3a5f' }}>
            <div className="w-full h-full bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain p-4"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className={cn(
              'absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm',
              INDUSTRY_COLORS[company.industry],
            )}>
              {company.industry}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col" style={{ height: 'calc(100% - 170px)' }}>
            <h3 className="font-inter font-bold text-navy-900 text-lg leading-snug mb-0.5">{company.name}</h3>
            <p className="text-gold-500 text-[11px] font-semibold italic mb-3">{company.tagline}</p>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-3 flex-1">{company.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {company.services.slice(0, 3).map((s) => (
                <span key={s} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-100 font-medium">
                  {s}
                </span>
              ))}
            </div>

            {/* Touch CTA */}
            <Link
              href={`/companies/${company.slug}`}
              onClick={e => e.stopPropagation()}
              className="[@media(hover:none)]:flex hidden items-center gap-1.5 text-gold-500 text-sm font-semibold mt-auto"
            >
              Explore <ArrowRight size={13} />
            </Link>

            {/* Desktop flip hint */}
            <p className="[@media(hover:none)]:hidden text-[10px] text-slate-300 text-right uppercase tracking-widest font-medium mt-auto pt-1">
              Hover to flip →
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundColor: company.color ?? '#1e3a5f' }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.25em] mb-1">
                {company.industry}
              </p>
              <h3 className="font-playfair font-bold text-white text-xl leading-tight">{company.name}</h3>
            </div>
            {company.logo && (
              <div className="w-12 h-12 shrink-0 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img src={company.logo} alt="" className="w-full h-full object-contain p-1.5" />
              </div>
            )}
          </div>

          <div className="h-px mx-6 bg-white/15" />

          {/* Services */}
          <div className="flex-1 px-6 py-4 overflow-hidden">
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-3">Services</p>
            <div className="space-y-2.5">
              {company.services.slice(0, 5).map((s) => (
                <div key={s} className="flex items-start gap-2.5">
                  <CheckCircle2 size={12} className="text-white/55 shrink-0 mt-0.5" />
                  <span className="text-white/80 text-xs leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 space-y-3">
            {(company.founded || company.team_size) && (
              <div className="flex gap-5">
                {company.founded && (
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Calendar size={11} /> Est. {company.founded}
                  </div>
                )}
                {company.team_size && (
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Users size={11} /> {company.team_size}+ people
                  </div>
                )}
              </div>
            )}
            <Link
              href={`/companies/${company.slug}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full bg-white/15 hover:bg-white/25
                         border border-white/20 text-white font-semibold text-sm px-4 py-2.5 rounded-xl
                         transition-all duration-200 group"
            >
              Explore Company
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
