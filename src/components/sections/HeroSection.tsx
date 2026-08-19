import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Phone, Anchor } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { CONTACT } from '@/lib/constants'

const SLIDE_DELAY = 5500

const slides = [
  {
    image:   '/images/shipping/bbg-master-night.jpeg',
    tag:     'Flagship Operations',
    eyebrow: 'Est. 1982 · Chittagong, Bangladesh',
    line1:   'Masters of',
    line2:   'Maritime Excellence',
    sub:     'Four decades commanding the seas — East Queen Group leads Bangladesh\'s maritime industry with unmatched expertise and a proud fleet legacy.',
    cta:     { label: 'Our Portfolio', to: '/companies' },
  },
  {
    image:   '/images/shipping/harmonia-arrival.jpeg',
    tag:     'International Trade',
    eyebrow: 'Global Shipping Network',
    line1:   'Delivering Promise,',
    line2:   'Crossing Oceans',
    sub:     'From Chittagong to ports worldwide — our vessels carry Bangladesh\'s finest exports across Asia, the Middle East, and beyond.',
    cta:     { label: 'Our Exports', to: '/export' },
  },
  {
    image:   '/images/shipping/tristar-prosperity.jpeg',
    tag:     'MV Tristar Prosperity',
    eyebrow: 'Fleet Legacy · Since 1982',
    line1:   'Powering Prosperity',
    line2:   'Across the Seas',
    sub:     'A symbol of our commitment to reliability, safety, and world-class maritime operations that has sailed under the East Queen flag for decades.',
    cta:     { label: 'Ship Breaking', to: '/ship-breaking' },
  },
  {
    image:   '/images/shipping/ship-port-1.jpeg',
    tag:     'Port Excellence',
    eyebrow: 'Chittagong Port Operations',
    line1:   "Bangladesh's Gateway",
    line2:   'to Global Trade',
    sub:     'Operating at the heart of South Asia\'s busiest port — connecting manufacturers, traders, and nations through seamless logistics.',
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

const wordAnim = {
  hidden:  { opacity: 0, y: 28, skewY: 4 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerWords = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

function SlideContent({ slide, slideKey }: { slide: typeof slides[number]; slideKey: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
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

        {/* Headline line 1 */}
        <motion.h1
          className="font-playfair font-bold text-display text-white leading-[1.06] mb-1"
          variants={staggerWords}
        >
          {slide.line1.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.2em]">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Headline line 2 — last word in brand red */}
        <motion.h1
          className="font-playfair font-bold text-display leading-[1.06] mb-8"
          variants={staggerWords}
        >
          {slide.line2.split(' ').map((word, i, arr) => (
            <motion.span
              key={i}
              variants={wordAnim}
              className={`inline-block mr-[0.2em] ${i === arr.length - 1 ? 'text-gold-400' : 'text-white'}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

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

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const reduced = useReducedMotion()

  const goPrev = () => swiperRef.current?.slidePrev()
  const goNext = () => swiperRef.current?.slideNext()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Swiper image backgrounds */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: SLIDE_DELAY, disableOnInteraction: false }}
        loop
        speed={1400}
        className="!absolute inset-0 w-full h-full"
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: 'linear' }}
            >
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            </motion.div>
            {/* Layered overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Red left accent bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-0 top-[15%] bottom-[15%] w-[3px] z-10
                   bg-gradient-to-b from-transparent via-gold-500 to-transparent
                   origin-top hidden lg:block"
      />

      {/* Slide counter — top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute top-24 right-6 sm:right-10 z-20 hidden sm:flex flex-col items-end gap-1"
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

      {/* Prev / Next nav arrows */}
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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-14 md:pb-20 w-full">
        <SlideContent slide={slides[activeIndex]} slideKey={activeIndex} />

        {/* Stats + slide dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap items-center gap-4 sm:gap-8 mt-8 sm:mt-12 pt-5 sm:pt-8 border-t border-white/15"
        >
          {[
            { n: '42+',  l: 'Years' },
            { n: '6',    l: 'Companies' },
            { n: '100+', l: 'Clients' },
            { n: '500+', l: 'Employees' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono font-bold text-gold-400 text-2xl leading-none">{s.n}</p>
              <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mt-1">{s.l}</p>
            </div>
          ))}

          {/* Slide dot indicators */}
          <div className="ml-auto flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-gold-500'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/15 z-20">
        <motion.div
          key={activeIndex}
          className="h-full bg-gold-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SLIDE_DELAY / 1000, ease: 'linear' }}
        />
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1.5 text-white/50 z-10"
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
