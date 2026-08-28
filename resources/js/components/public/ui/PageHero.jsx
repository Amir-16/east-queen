import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'
import { pageTransition, stagger, fadeUp } from '@/lib/motion'

export default function PageHero({ title, subtitle, breadcrumbs = [], image, className = '' }) {
  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className={`relative min-h-[45vh] flex items-end pb-12 sm:pb-16 overflow-hidden ${className}`}
    >
      {/* Background */}
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" aria-hidden className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/70 to-navy-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 to-transparent" />
        </div>
      )}
      {!image && <div className="absolute inset-0 bg-navy-900" />}

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-white/50 text-sm mb-5">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-gold-400">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <ChevronRight size={12} />}
                </span>
              ))}
            </motion.nav>
          )}

          <motion.h1
            variants={fadeUp}
            className="font-playfair font-bold text-display text-white leading-tight mb-4"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
