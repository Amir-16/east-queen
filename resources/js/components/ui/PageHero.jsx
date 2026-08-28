import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import { fadeInUp, fadeInDown } from '../../utils/animations'

export default function PageHero({ title, highlight, subtitle, breadcrumbs = [], image }) {
  return (
    <section className="relative min-h-[300px] sm:min-h-[360px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-primary" />
        )}
        <div className="absolute inset-0 bg-dark/70" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 container-custom section-padding py-16 sm:py-20">
        <motion.nav
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1.5 text-sm text-white/70 mb-6"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-accent transition-colors">
            <HomeIcon className="w-4 h-4" />
            Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRightIcon className="w-3.5 h-3.5 text-white/40" />
              {crumb.path ? (
                <Link href={crumb.path} className="hover:text-accent transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            {title}{' '}
            {highlight && <span className="text-accent">{highlight}</span>}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
