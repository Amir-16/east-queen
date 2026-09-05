import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const SLIDE_DELAY = 6000        // ms — must match progress bar duration below
const EASE_OUT    = [0.16, 1, 0.3, 1]

// ── Animation variants ─────────────────────────────────────────────────────────

// Per-slide content fades out instantly, new content enters fresh
const slideWrap = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

// Category label — clip-path wipe left to right
const labelAnim = {
  hidden:  { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.65, ease: EASE_OUT } },
}

// Title words — blur + rise, staggered
const wCont = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
}
const wAnim = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.60, ease: EASE_OUT } },
}

// Subtitle — letter-spacing shrink + rise
const subAnim = {
  hidden:  { opacity: 0, letterSpacing: '0.42em', y: 6 },
  visible: { opacity: 1, letterSpacing: '0.14em', y: 0,
    transition: { duration: 0.75, ease: EASE_OUT, delay: 0.32 } },
}

// Description — simple fade + slide
const descAnim = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.60, ease: EASE_OUT, delay: 0.48 } },
}

// CTA — spring pop
const ctaAnim = {
  hidden:  { opacity: 0, scale: 0.90, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22, delay: 0.60 } },
}

// ── Slide content ──────────────────────────────────────────────────────────────

function SlideContent({ slide, slideKey }) {
  const words = (slide.title || '').trim().split(/\s+/)

  return (
    <AnimatePresence mode="wait">
      <motion.div key={slideKey} {...slideWrap}>

        {/* Category label */}
        <motion.div
          variants={labelAnim} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 mb-4"
        >
          <span className="w-4 h-[1.5px] bg-gold-400 shrink-0" />
          <span className="text-gold-400 text-[9px] font-bold uppercase tracking-[0.38em]">
            {slide.label}
          </span>
        </motion.div>

        {/* Title — medium, word-by-word blur reveal */}
        <motion.h2
          className="font-playfair font-bold leading-[1.10] mb-3 text-white"
          style={{ fontSize: 'clamp(1.65rem, 3vw, 2.7rem)' }}
          variants={wCont} initial="hidden" animate="visible"
        >
          {words.map((word, i) => (
            <motion.span key={`${slideKey}-w-${i}`} variants={wAnim}
              className="inline-block mr-[0.13em]">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtitle — company / division name in gold */}
        <motion.p
          variants={subAnim} initial="hidden" animate="visible"
          className="text-gold-400 font-semibold uppercase mb-4"
          style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}
        >
          {slide.subtitle}
        </motion.p>

        {/* Description */}
        {slide.description && (
          <motion.p
            variants={descAnim} initial="hidden" animate="visible"
            className="text-white/50 text-[13px] leading-relaxed mb-7 max-w-[340px]"
          >
            {slide.description}
          </motion.p>
        )}

        {/* CTA */}
        <motion.div variants={ctaAnim} initial="hidden" animate="visible">
          <Link
            href={slide.cta_url}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-lg text-[13px] tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,197,24,0.28)]"
          >
            {slide.cta_text || 'Explore'}
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HeroSection({ slides = [] }) {
  if (!slides.length) return null

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused,    setIsPaused]    = useState(false)
  const swiperRef = useRef(null)

  const goPrev    = () => swiperRef.current?.slidePrev()
  const goNext    = () => swiperRef.current?.slideNext()
  const goToSlide = (i) => swiperRef.current?.slideToLoop(i)

  return (
    <section
      role="region"
      aria-label="East Queen Group — operations gallery"
      className="relative min-h-screen flex flex-col overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* ── Background image slider ── */}
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
            <div className="absolute inset-0 kenburns">
              <img
                src={slide.image_path}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/*
        Gradient strategy: left column is dark (text lives here).
        Center and right stay open so the image reads clearly,
        creating an editorial "image + text" split without extra DOM elements.
      */}
      {/* Left panel darkener */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(4,10,24,0.93) 0%, rgba(4,10,24,0.78) 32%, rgba(4,10,24,0.30) 55%, transparent 70%)' }} />
      {/* Bottom bar — dots + controls area */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(4,10,24,0.82) 0%, rgba(4,10,24,0.30) 16%, transparent 36%)' }} />
      {/* Top fade — nav legibility */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(4,10,24,0.52) 0%, transparent 22%)' }} />
      {/* Subtle corner vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 95% 88% at 50% 50%, transparent 46%, rgba(0,0,0,0.20) 100%)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-end lg:items-center max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-24 pb-10">
        <div className="w-full flex items-end lg:items-center justify-between gap-6">

          {/* Left: slide text */}
          <div className="flex-1 max-w-lg">
            <div aria-live="polite" aria-atomic="true">
              <SlideContent slide={slides[activeIndex]} slideKey={activeIndex} />
            </div>

            {/* Controls row: dots + counter + arrows */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3 mt-8"
            >
              {/* Dot indicators */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide navigation">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goToSlide(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-5 h-[3px] bg-gold-400'
                        : 'w-[4px] h-[4px] bg-white/28 hover:bg-white/55'
                    }`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="flex items-center gap-1 text-[10px] font-mono tabular-nums text-white/28 ml-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.22 }}
                    className="inline-block"
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span className="opacity-40">/</span>
                <span>{String(slides.length).padStart(2, '0')}</span>
              </div>

              {/* Prev / Next arrows */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/18 bg-white/5 hover:bg-gold-500 hover:border-gold-500 transition-all duration-200 group"
                >
                  <ChevronLeft size={14} className="text-white/60 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/18 bg-white/5 hover:bg-gold-500 hover:border-gold-500 transition-all duration-200 group"
                >
                  <ChevronRight size={14} className="text-white/60 group-hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/28"
        aria-hidden="true"
      >
        <span className="text-[8px] uppercase tracking-[0.42em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={13} />
        </motion.div>
      </motion.div>

      {/* Gold progress bar — duration synced to SLIDE_DELAY */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/[0.07] z-20" aria-hidden="true">
        <div
          key={activeIndex}
          className="progress-fill"
          style={{
            animationDuration: `${SLIDE_DELAY / 1000}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
            backgroundColor: '#d4a017',
          }}
        />
      </div>

    </section>
  )
}
