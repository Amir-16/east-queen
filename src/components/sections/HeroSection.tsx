import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { CONTACT } from '@/lib/constants'

const slides = [
  {
    image:   '/images/hero/slides/service-1.png',
    eyebrow: 'Est. 1982 · Chittagong, Bangladesh',
    line1:   'Empowering Trade,',
    line2:   'Connecting the World',
    sub:     'A diversified industrial conglomerate spanning ship breaking, LPG energy, fisheries, and international commodity trade.',
    cta:     { label: 'Our Portfolio', to: '/companies' },
  },
  {
    image:   '/images/hero/slides/service-4.png',
    eyebrow: 'International Export',
    line1:   "Bangladesh's Finest,",
    line2:   'Shipped Worldwide',
    sub:     'Mill scale, PET flakes, leather goods, jute products and fresh produce — exported to 20+ countries across Asia and the Middle East.',
    cta:     { label: 'Our Exports', to: '/export' },
  },
  {
    image:   '/images/hero/slides/service-7.png',
    eyebrow: 'Maritime Excellence',
    line1:   'Where Ships',
    line2:   'Find New Purpose',
    sub:     "Over four decades of safe, sustainable ship recycling at Sitakunda, Chittagong — feeding Bangladesh's steel industry.",
    cta:     { label: 'Ship Breaking', to: '/ship-breaking' },
  },
  {
    image:   '/images/hero/slides/service-10.png',
    eyebrow: 'Six Companies. One Vision.',
    line1:   'Strength in',
    line2:   'Every Operation',
    sub:     'Six specialized companies, 500+ professionals, and a single commitment — delivering on time, every time.',
    cta:     { label: 'About Us', to: '/about-east-queen' },
  },
]

const wordAnim = {
  hidden:  { opacity: 0, y: 28, skewY: 4 },
  visible: { opacity: 1, y: 0,  skewY: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
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
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
          <div className="h-[2px] w-8 bg-gold-500" />
          <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">
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

        {/* Headline line 2 — last word in red */}
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
        <motion.p variants={fadeUp} className="text-white/75 text-lg leading-relaxed mb-10 max-w-[520px]">
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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Swiper image backgrounds */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
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
              transition={{ duration: 6.5, ease: 'linear' }}
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
            {/* Layered overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <SlideContent slide={slides[activeIndex]} slideKey={activeIndex} />

        {/* Stats + slide dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/15"
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

          {/* Slide pagination dots */}
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

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
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
