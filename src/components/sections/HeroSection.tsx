import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Phone, Anchor } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { CONTACT } from '@/lib/constants'

const SLIDE_DELAY = 5500

const slides = [
  {
    image:   '/images/ship-breaking/coastal-view.jpeg',
    tag:     'Ship Recycling',
    eyebrow: 'Sitakunda Yard · Chittagong',
    line1:   'Steel Forged',
    line2:   'at Sitakunda',
    sub:     'Bangladesh\'s leading ship recycling enterprise — safely dismantling end-of-life vessels and converting them into high-grade steel for the nation\'s construction and manufacturing sectors.',
    cta:     { label: 'Our Yard', to: '/ship-breaking' },
  },
  {
    image:   '/images/gallery/ship-breaking/yard-wide-1.jpeg',
    tag:     'Industrial Operations',
    eyebrow: 'HKC Certified · ISO Compliant',
    line1:   'Safe. Compliant.',
    line2:   'Sustainable.',
    sub:     'Over 500 vessels recycled under strict international safety and environmental standards — setting the benchmark for responsible ship breaking in South Asia.',
    cta:     { label: 'Ship Breaking', to: '/ship-breaking' },
  },
  {
    image:   '/images/shipping/tristar-prosperity.jpeg',
    tag:     'East Queen Group',
    eyebrow: 'Six Companies · Est. 1982',
    line1:   'A Diversified',
    line2:   'Industrial Group',
    sub:     'From ship recycling and LPG energy to fisheries, commodity trading, and international exports — six specialized companies built on 42 years of industrial excellence.',
    cta:     { label: 'Our Companies', to: '/companies' },
  },
  {
    image:   '/images/operations/facility-1.jpeg',
    tag:     'Global Commerce',
    eyebrow: 'Chittagong · South Asia Hub',
    line1:   'Gateway to',
    line2:   'Global Business',
    sub:     'From South Asia\'s busiest port to markets across four continents — East Queen Group bridges manufacturers, traders, and nations through decades of trusted commerce.',
    cta:     { label: 'About Us', to: '/about-east-queen' },
  },
  {
    image:   '/images/shipping/vessel-2.jpeg',
    tag:     'Green Recycling',
    eyebrow: 'Sustainable Ship Recycling',
    line1:   'Where Ships',
    line2:   'Find New Purpose',
    sub:     'Over four decades of safe, sustainable ship recycling at Sitakunda — feeding Bangladesh\'s steel industry and creating thousands of livelihoods.',
    cta:     { label: 'Ship Breaking', to: '/ship-breaking' },
  },
]

// Variant definitions — kept outside the component to avoid recreating on every render
const wordAnim = {
  hidden:  { opacity: 0, y: 28, skewY: 4 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerLine1 = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// Line 2 starts after line 1's first words have settled
const staggerLine2 = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

// ─── Slide content ────────────────────────────────────────────────────────────

function SlideContent({ slide, slideKey }: { slide: typeof slides[number]; slideKey: number }) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        // When reduced motion is preferred, use a plain cross-fade instead of
        // the word-stagger system; plain values don't propagate variant strings
        // to children, so word/stagger variants silently become no-ops.
        initial={reduced ? { opacity: 0 } : 'hidden'}
        animate={reduced ? { opacity: 1 } : 'visible'}
        exit={{ opacity: 0, y: reduced ? 0 : -8, transition: { duration: 0.25 } }}
        transition={reduced ? { duration: 0.35 } : undefined}
        className="max-w-3xl"
      >
        {/* Tag badge */}
        <motion.div variants={fadeUp} className="mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                           border border-gold-500/60 bg-gold-500/15 backdrop-blur-sm
                           text-gold-400 text-[10px] font-bold uppercase tracking-[0.25em]">
            <Anchor size={9} />
            {slide.tag}
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
          <div className="h-[2px] w-8 bg-gold-500" />
          <span className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.28em]">
            {slide.eyebrow}
          </span>
        </motion.div>

        {/* Single <h1> with two block lines — one heading per landmark, semantically correct */}
        <h1 className="font-playfair font-bold text-display leading-[1.06] mb-8">
          {/* Line 1 */}
          <motion.span className="block text-white mb-1" variants={staggerLine1}>
            {slide.line1.split(' ').map((word, i) => (
              <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.2em]">
                {word}
              </motion.span>
            ))}
          </motion.span>

          {/* Line 2 — last word in brand red */}
          <motion.span className="block" variants={staggerLine2}>
            {slide.line2.split(' ').map((word, i, arr) => (
              <motion.span
                key={i}
                variants={wordAnim}
                className={`inline-block mr-[0.2em] ${i === arr.length - 1 ? 'text-gold-400' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="text-white/75 text-base sm:text-lg leading-relaxed mb-7 sm:mb-10 max-w-[520px]">
          {slide.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <Link
            to={slide.cta.to}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5
                       bg-gold-500 hover:bg-gold-400 text-white
                       font-bold rounded-lg text-sm tracking-wide
                       transition-all duration-200 hover:shadow-gold-glow"
          >
            {slide.cta.label}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 px-7 py-3.5
                       bg-white/10 hover:bg-white/18 border border-white/30
                       hover:border-gold-400/60 text-white font-semibold
                       rounded-lg text-sm tracking-wide transition-all duration-200"
          >
            <Phone size={14} />
            Call Us
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused,    setIsPaused]    = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)
  const reduced   = useReducedMotion()

  const goPrev = () => swiperRef.current?.slidePrev()
  const goNext = () => swiperRef.current?.slideNext()

  return (
    <section
      role="region"
      aria-label="East Queen Group — maritime leadership highlights"
      className="relative min-h-screen flex items-center overflow-hidden"
      // Track hover at the section level so the progress bar can pause
      // in sync with Swiper's own pauseOnMouseEnter behaviour
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* ── Background image slider ─────────────────────────────────────── */}
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: SLIDE_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        loop
        speed={1400}
        className="!absolute inset-0 w-full h-full"
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full overflow-hidden">
            {/* .kenburns animation is driven by .swiper-slide-active in CSS so it
                restarts cleanly each time this slide becomes active */}
            <div className="absolute inset-0 kenburns">
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Left accent bar ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-0 top-[15%] bottom-[15%] w-[3px] z-10
                   bg-gradient-to-b from-transparent via-gold-500 to-transparent
                   origin-top hidden lg:block"
      />

      {/* ── Slide counter (top-right) ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute top-24 right-6 sm:right-10 z-20 hidden sm:flex flex-col items-end gap-1"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            className="font-mono font-bold text-white text-3xl leading-none tabular-nums"
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <div className="h-[1px] w-8 bg-white/30 my-1" />
        <span className="font-mono text-white/40 text-sm tabular-nums">
          {String(slides.length).padStart(2, '0')}
        </span>
      </motion.div>

      {/* ── Prev / Next arrows (bottom-right) ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-24 right-6 sm:right-10 z-20 flex items-center gap-2"
      >
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="w-10 h-10 flex items-center justify-center rounded-full
                     border border-white/30 bg-white/10 hover:bg-gold-500
                     hover:border-gold-500 transition-all duration-200 group"
        >
          <ChevronLeft size={18} className="text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="w-10 h-10 flex items-center justify-center rounded-full
                     border border-white/30 bg-white/10 hover:bg-gold-500
                     hover:border-gold-500 transition-all duration-200 group"
        >
          <ChevronRight size={18} className="text-white group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-14 md:pb-20 w-full">

        {/* aria-live wraps only the changing content so screen readers
            announce slide changes without re-reading static UI */}
        <div aria-live="polite" aria-atomic="true">
          <SlideContent slide={slides[activeIndex]} slideKey={activeIndex} />
        </div>

        {/* Stats + slide dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap items-center gap-6 sm:gap-10 mt-8 sm:mt-12"
        >
          {/* Glass pill anchors the stats against any slide background */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 px-5 py-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
          {[
            { n: '42+',  l: 'Years'     },
            { n: '6',    l: 'Companies' },
            { n: '500+', l: 'Employees' },
            { n: '20+',  l: 'Countries' },
          ].map((s, i, arr) => (
            <div key={s.l} className="flex items-center gap-4 sm:gap-6">
              <div className="text-center">
                <p className="font-mono font-black text-white text-2xl leading-none tracking-tight">{s.n}</p>
                <p className="text-gold-500 text-[9px] font-bold uppercase tracking-[0.22em] mt-1">{s.l}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="h-6 w-px bg-white/15 hidden sm:block" />
              )}
            </div>
          ))}
          </div>

          {/* Slide dot indicators */}
          <div className="ml-auto flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-gold-500'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Progress bar — CSS animation so animation-play-state works ─── */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/15 z-20" aria-hidden="true">
        <div
          key={activeIndex}
          className="progress-fill"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        />
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1.5 text-white/50 z-10"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
