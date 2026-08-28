import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const SLIDES = [
  {
    image: '/images/hero/slide-01.jpg',
    label: 'International Trading',
    line1: 'Connecting Markets,',
    line2: 'Building Futures',
    href: '/export',
  },
  {
    image: '/images/ship-breaking/coastal-view.jpeg',
    label: 'Ship Breaking',
    line1: 'Steel from the Sea,',
    line2: 'Strength for Industry',
    href: '/ship-breaking',
  },
  {
    image: '/images/hero/slide-03.jpg',
    label: 'Export Excellence',
    line1: 'Bangladesh\'s Finest,',
    line2: 'Delivered Worldwide',
    href: '/export',
  },
  {
    image: '/images/products/imports/aggregate/aggregate-golden-1.jpeg',
    label: 'Import Logistics',
    line1: 'Quality Imports,',
    line2: 'Powering Growth',
    href: '/import',
  },
  {
    image: '/images/companies/syedpur/farm-1.jpeg',
    label: 'Agribusiness',
    line1: 'From Land to Table,',
    line2: 'Sustainably Grown',
    href: '/con-syedpur-fisheries',
  },
  {
    image: '/images/hero/slide-06.jpg',
    label: 'Energy Solutions',
    line1: 'Reliable Energy,',
    line2: 'Across Bangladesh',
    href: '/con-bay-gas',
  },
]

function SlideContent({ slide, active }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 flex items-center z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-4 flex items-center gap-2"
          >
            <span className="w-6 h-px bg-gold-500" />
            {slide.label}
          </motion.p>

          <h2 className="font-playfair font-bold text-display text-white leading-[1.05] mb-8">
            {slide.line1.split(' ').map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {slide.line2.split(' ').map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block mr-[0.22em] text-gradient-gold"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-gold-glow group"
            >
              Explore
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 glass-dark hover:bg-white/10 text-white/70 hover:text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function HeroSection({ slides = SLIDES }) {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const DELAY = 5000

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / DELAY, 1))
    }, 50)
    return () => clearInterval(tick)
  }, [activeIndex])

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-navy-950">
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard]}
        effect="fade"
        speed={900}
        autoplay={{ delay: DELAY, disableOnInteraction: false }}
        keyboard={{ enabled: true }}
        loop
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative h-full">
            <img
              src={slide.image}
              alt={slide.label}
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/50 to-navy-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />
            <SlideContent slide={slide} active={activeIndex === i} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-30 hidden md:flex items-center gap-2">
        <span className="font-mono font-bold text-gold-400 text-sm">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-white/30 text-sm">/</span>
        <span className="font-mono text-white/40 text-sm">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideTo(i)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 h-1.5 bg-gold-500' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
        <motion.div
          className="h-full bg-gold-500"
          style={{ scaleX: progress, transformOrigin: 'left' }}
        />
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} className="text-white/30" />
      </motion.div>
    </section>
  )
}
