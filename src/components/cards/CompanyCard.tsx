import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { INDUSTRY_COLORS } from '@/lib/constants'
import { fadeUp } from '@/lib/motion'
import type { Company } from '@/types'

interface CompanyCardProps {
  company: Company
  className?: string
}

export default function CompanyCard({ company, className }: CompanyCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
      className={cn(
        'group relative bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden cursor-pointer',
        'hover:shadow-hover hover:border-gold-300/50 transition-shadow duration-300',
        className,
      )}
    >
      {/* Logo area — brand gradient frame + white inset card */}
      <div className={cn('relative h-40 bg-gradient-to-br p-3', company.color)}>
        <div className="w-full h-full bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-contain p-4"
          />
        </div>
        <span
          className={cn(
            'absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm',
            INDUSTRY_COLORS[company.industry],
          )}
        >
          {company.industry}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-inter font-bold text-navy-900 text-lg mb-1 leading-snug group-hover:text-gold-600 transition-colors duration-200">
          {company.name}
        </h3>
        <p className="text-gold-600 text-xs font-medium mb-3 italic">{company.tagline}</p>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-5">{company.description}</p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {company.services.slice(0, 3).map((s) => (
            <span key={s} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-100 font-medium">
              {s}
            </span>
          ))}
        </div>

        <Link
          to="/companies"
          className="inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600 text-sm font-semibold transition-colors duration-200 group/link"
        >
          Learn More
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  )
}
