import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const SLIDE_DELAY = 5000

const SLIDES = [
  {
    image: '/images/operations/facility-1.jpeg',
    label: 'Gateway to Global Business',
    line1: 'East Queen',
    line2: 'Group',
    href:  '/about-east-queen',
  },
  {
    image: '/images/operations/facility-2.jpeg',
    label: 'Ship Recycling · Est. 1982',
    line1: "Bangladesh's",
    line2: 'Industrial Pioneer',
    href:  '/companies',
  },
  {
    image: '/images/operations/facility-3.jpeg',
    label: 'Sitakunda Yard · Chittagong',
    line1: 'Steel Forged',
    line2: 'at Sitakunda',
    href:  '/ship-breaking',
  },
  {
    image: '/images/operations/facility-4.jpeg',
    label: 'HKC Certified · ISO Compliant',
    line1: 'Safe.',
    line2: 'Sustainable.',
    href:  '/ship-breaking',
  },
  {
    image: '/images/operations/facility-5.jpeg',
    label: 'Six Companies · 500+ Employees',
    line1: '42 Years of',
    line2: 'Excellence',
    href:  '/companies',
  },
  {
    image: '/images/operations/facility-6.jpeg',
    label: 'International Commerce',
    line1: 'Built on',
    line2: 'Industry',
    href:  '/about-east-queen',
  },
  {
    image: '/images/ship-breaking/coastal-view.jpeg',
    label: 'Sitakunda Ship Breaking Yard',
    line1: 'Where Ships',
    line2: 'Find New Purpose',
    href:  '/ship-breaking',
  },
  {
    image: '/images/ship-breaking/yard-wide-1.jpeg',
    label: '150+ Vessels Recycled',
    line1: 'Pioneers of',
    line2: 'Ship Recycling',
    href:  '/ship-breaking',
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}
const wordAnim = {
  hidden:  { opacity: 0, y: 32, skewY: 3 },
  visible: { opacity: 1, y: 0,  skewY: 0, transition: { duration: 0.52, ease: [0.25, 0.1, 0.25, 1] } },
}
const staggerL1 = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const staggerL2 = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } } }

function SlideContent({ slide, slideKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {/* Label */}
        <motion.div variants={fadeUp} className="mb-4">
          <span className="inline-flex items-center gap-2 text-white/55 text-[10px] font-semibold uppercase tracking-[0.28em]">
            <span className="w-4 h-[1px] bg-gold-500 shrink-0" />
            {slide.label}
          </span>
        </motion.div>

        {/* Headline */}
        <h2
          className="font-playfair font-bold leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)' }}
        >
          <motion.span className="block text-white" variants={staggerL1}>
            {slide.line1.split(' ').map((word, i) => (
              <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.18em]">
                {word}
              </motion.span>
            ))}
          </motion.span>
          <motion.span className="block" variants={staggerL2}>
            {slide.line2.split(' ').map((word, i, arr) => (
              <motion.span
                key={i}
                variants={wordAnim}
                className={`inline-block mr-[0.18em] ${i === arr.length - 1 ? 'text-gold-400' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h2>

        {/* Minimal text CTA */}
        <motion.div variants={fadeUp}>
          <Link
            href={slide.href}
            className="group inline-flex items-center gap-2.5 text-white/70 hover:text-gold-400 text-sm font-semibold tracking-wide transition-colors duration-200"
          >
            Explore
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function HeroSection({ slides = SLIDES }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused,    setIsPaused]    = useState(false)
  const swiperRef = useRef(null)

  const goPrev = () => swiperRef.current?.slidePrev()
  const goNext = () => swiperRef.current?.slideNext()

  return (
    <section
      role="region"
      aria-label="East Queen Group — operations gallery"
      className="relative min-h-screen flex flex-col overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: SLIDE_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        loop
        speed={1200}
        className="!absolute inset-0 w-full h-full"
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 kenburns">
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide counter — animated, top-right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-24 right-6 sm:right-10 z-20 hidden sm:flex flex-col items-end gap-1"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="font-mono font-bold text-white text-2xl leading-none tabular-nums"
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <div className="h-px w-6 bg-white/30 my-1" />
        <span className="font-mono text-white/35 text-xs tabular-nums">
          {String(slides.length).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Prev / Next — bottom-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-24 right-6 sm:right-10 z-20 flex items-center gap-2"
      >
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/8 hover:bg-gold-500 hover:border-gold-500 transition-all duration-200 group"
        >
          <ChevronLeft size={16} className="text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/8 hover:bg-gold-500 hover:border-gold-500 transition-all duration-200 group"
        >
          <ChevronRight size={16} className="text-white group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>

      {/* Main content — anchored bottom-left */}
      <div className="relative z-10 flex flex-col flex-1 justify-end max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-20">
        <div aria-live="polite" aria-atomic="true">
          <SlideContent slide={slides[activeIndex]} slideKey={activeIndex} />
        </div>

        {/* Dot indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center gap-2 mt-8"
          role="tablist"
          aria-label="Slide navigation"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-[3px] bg-gold-500'
                  : 'w-[3px] h-[3px] bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* CSS-driven progress bar — resets via key change */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 z-20" aria-hidden="true">
        <div
          key={activeIndex}
          className="progress-fill"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        />
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 z-10"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
