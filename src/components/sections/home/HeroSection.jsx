import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { COMPANY } from '../../../utils/constants'
import { fadeInUp, staggerContainer } from '../../../utils/animations'

const SLIDE_INTERVAL = 5000

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=85',
    label: 'Sports Facilities',
    objectPosition: 'center center',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=85',
    label: 'Flooring & Turf',
    objectPosition: 'center 25%',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920&q=85',
    label: 'Swimming Pool Works',
    objectPosition: 'center 40%',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
    label: 'Civil & Construction',
    objectPosition: 'center center',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85',
    label: 'Carpentry Works',
    objectPosition: 'center center',
  },
]

const BADGES = ['Sports Facilities', 'Flooring Systems', 'Civil Works', 'Fencing Solutions']

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index) => setCurrent(index), [])

  // Preload all slide images for smooth transitions
  useEffect(() => {
    SLIDES.forEach(({ image }) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % SLIDES.length),
      SLIDE_INTERVAL,
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden h-screen"
      style={{ minHeight: '580px' }}
      aria-label="Hero slideshow"
    >
      {/* ── Background Slideshow ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence mode="sync">
          <motion.div
            key={SLIDES[current].id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeInOut' },
              scale: { duration: 4, ease: 'easeOut' },
            }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[current].image}
              alt={SLIDES[current].label}
              className="w-full h-full object-cover"
              style={{ objectPosition: SLIDES[current].objectPosition }}
              fetchPriority={current === 0 ? 'high' : 'auto'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Layered gradient — left-heavy so text stays readable at any width */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/92 via-dark/55 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />
      </div>

      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 right-8 xl:right-24 w-64 xl:w-96 h-64 xl:h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/3 w-72 xl:w-[28rem] h-72 xl:h-[28rem] bg-primary/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Active slide label — top-right badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35 }}
          className="absolute top-20 sm:top-24 right-4 sm:right-8 hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/85 text-xs font-display font-semibold px-3 py-1.5 rounded-full z-20"
          aria-live="polite"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
          {SLIDES[current].label}
        </motion.div>
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full container-custom px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 sm:pb-32 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 xl:gap-12">
        {/* Text block */}
        <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-[680px]">
          <motion.div
            variants={staggerContainer(0.15, 0.3)}
            initial="hidden"
            animate="visible"
          >
            {/* Establishment badge */}
            <motion.div variants={fadeInUp} className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 backdrop-blur-sm text-accent text-xs sm:text-sm font-display font-semibold px-4 py-1.5 rounded-full">
                <CheckBadgeIcon className="w-4 h-4 flex-shrink-0" />
                Dubai, UAE — Est. 2014
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-display font-black text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-7xl text-white tracking-tight"
            >
              Building{' '}
              <span className="text-accent">Excellence</span>
              <br />
              Across the UAE
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-lg"
            >
              Professional supply, installation, and maintenance of sports facilities,
              flooring systems, fencing solutions, and civil works — delivering quality
              that lasts.
            </motion.p>

            {/* Service category pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mt-4 sm:mt-5">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mt-7 sm:mt-9">
              <Link to="/contact" className="btn-primary">
                Get a Free Quote
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-outline">
                Our Services
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 sm:gap-10 mt-8 sm:mt-10 pt-6 border-t border-white/15"
            >
              {[
                { value: '500+', label: 'Projects Done' },
                { value: '10+', label: 'Years Experience' },
                { value: '350+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-black text-2xl sm:text-3xl text-accent">{stat.value}</div>
                  <div className="text-white/60 text-xs font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Contact card — flex row member on xl+, stays inside the max-w-7xl container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
          className="hidden xl:flex flex-col gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 min-w-[220px] flex-shrink-0"
        >
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Reach Us Now</p>
          <a
            href={`tel:${COMPANY.mobile}`}
            className="flex items-center gap-3 text-white font-display font-bold text-base hover:text-accent transition-colors"
          >
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            {COMPANY.mobile}
          </a>
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-green-400 font-semibold text-sm hover:text-green-300 transition-colors"
          >
            <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* ── Bottom slide controls ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20" aria-label="Slide navigation">
        {/* Per-slide progress bars */}
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex gap-1.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.label}`}
                className="flex-1 h-0.5 bg-white/25 rounded-full overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
              >
                {i === current && (
                  <motion.div
                    key={`bar-${current}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute inset-0 bg-accent rounded-full"
                  />
                )}
                {i < current && (
                  <div className="absolute inset-0 bg-white/50 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators + slide counter */}
        <div className="flex items-center justify-center gap-2.5 pb-5">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                i === current
                  ? 'w-5 h-1.5 bg-accent'
                  : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/65'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
