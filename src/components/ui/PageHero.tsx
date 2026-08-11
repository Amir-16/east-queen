import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { pageTransition } from '@/lib/motion'

interface Crumb { label: string; href?: string }

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  image?: string
  className?: string
}

export default function PageHero({ title, subtitle, breadcrumbs, image, className }: PageHeroProps) {
  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'relative pt-40 pb-20 bg-navy-900 overflow-hidden',
        className,
      )}
    >
      {/* Background image */}
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-navy-900" />
        </div>
      )}

      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-100 pointer-events-none" />

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 mb-6 text-sm text-white/40">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-gold-400 transition-colors duration-200">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="h-[3px] w-12 bg-gold-500 rounded-full mb-6" />

        <h1 className="font-playfair font-bold text-h1 text-white mb-4 max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/60 text-body-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </motion.section>
  )
}
