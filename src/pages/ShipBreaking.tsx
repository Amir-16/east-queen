import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import CountUp from 'react-countup'
import {
  Anchor,
  Shield,
  Recycle,
  Award,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Waves,
} from 'lucide-react'
import { stagger, fadeUp, fadeLeft, fadeRight, ease } from '@/lib/motion'

/* ─── data ──────────────────────────────────────────────────────────────── */

const stats = [
  { value: 40,   suffix: '+',   label: 'Years Experience',     decimals: 0 },
  { value: 500,  suffix: '+',   label: 'Vessels Recycled',     decimals: 0 },
  { value: 100,  suffix: '%',   label: 'HKC Compliance',       decimals: 0 },
  { value: 1000, suffix: '+ MT',label: 'Scrap / Year',         decimals: 0 },
]

const capabilities = [
  {
    icon: Anchor,
    title: 'Ocean-Going Vessel Recycling',
    description:
      'Safe, systematic dismantling of bulk carriers, tankers, container ships, and offshore vessels — 500 DWT to 50,000+ DWT.',
    tag: 'Core Service',
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    description:
      'Full compliance with the Hong Kong Convention, Bangladesh Ship Recycling Rules 2011, and ILO standards. Trained safety officers on-site.',
    tag: 'Certified',
  },
  {
    icon: Recycle,
    title: 'Green Recycling',
    description:
      'Asbestos removal, oil sludge management, and hazardous material handling — all following Basel Convention guidelines.',
    tag: 'Eco Standard',
  },
  {
    icon: Award,
    title: 'Quality Steel Output',
    description:
      'HMS 1&2 scrap sorted, graded, and supplied to re-rolling mills and steel manufacturers across Bangladesh.',
    tag: 'Grade A Output',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Vessel Acquisition',
    description:
      'Purchase of end-of-life vessels from international owners through transparent tender processes.',
  },
  {
    step: '02',
    title: 'Pre-Demolition Survey',
    description:
      'Comprehensive hazardous material inventory and pre-demolition inspection per HKC standards.',
  },
  {
    step: '03',
    title: 'Beaching & Positioning',
    description:
      'High-tide beaching at our designated yard with certified crew and heavy equipment on standby.',
  },
  {
    step: '04',
    title: 'Systematic Dismantling',
    description:
      'Gas-cut steel plates, pipes, and equipment recovered working top-to-bottom from the superstructure.',
  },
  {
    step: '05',
    title: 'Scrap Sorting & Dispatch',
    description:
      'Steel graded, weighed, and dispatched to Bangladesh re-rolling mills — zero waste, maximum value.',
  },
]

const certifications = [
  'Hong Kong International Convention (HKC)',
  'Bangladesh Ship Recycling Rules 2011',
  'ILO Safety & Health Standards',
  'Basel Convention — Hazardous Waste',
  'DNVGL Ship Recycling Compliance',
]

const galleryImages = [
  { src: '/images/ship-breaking/scrap-urban-1.jpeg',         aspect: 'tall'  },
  { src: '/images/ship-breaking/scrap-urban-2.jpeg',         aspect: 'wide'  },
  { src: '/images/ship-breaking/coastal-view.jpeg',          aspect: 'wide'  },
  { src: '/images/shipping/bbg-master-night.jpeg',           aspect: 'tall'  },
  { src: '/images/shipping/harmonia-arrival.jpeg',           aspect: 'wide'  },
  { src: '/images/products/imports/steel-scrap/scrap-1.jpeg',aspect: 'wide'  },
]

/* ─── sub-components ──────────────────────────────────────────────────── */

/** Word-by-word spring-drop animation */
function WordDrop({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      className={className}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 60, rotateX: -40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.8 },
            },
          }}
          className="inline-block mr-[0.22em] last:mr-0"
          style={{ transformOrigin: 'top center' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}

/** Single stat with countup */
function StatItem({ value, suffix, label, decimals, inView }: typeof stats[0] & { inView: boolean }) {
  return (
    <div className="text-center group">
      <p className="font-mono text-stat font-bold text-gold-500 mb-1 leading-none tabular-nums">
        {inView ? (
          <CountUp end={value} suffix={suffix} decimals={decimals} duration={2.2} useEasing />
        ) : (
          <span>0{suffix}</span>
        )}
      </p>
      <p className="text-slate-500 text-xs tracking-widest uppercase">{label}</p>
    </div>
  )
}

/* ─── main page ──────────────────────────────────────────────────────────── */

export default function ShipBreaking() {
  const heroRef       = useRef<HTMLElement>(null)
  const statsRef      = useRef<HTMLElement>(null)
  const processRef    = useRef<HTMLElement>(null)

  const statsInView   = useInView(statsRef,   { once: true, margin: '-80px' })
  const processInView = useInView(processRef, { once: true, margin: '-100px' })

  /* hero parallax */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY   = useTransform(heroScroll, [0, 1], ['0%', '28%'])
  const heroTextY  = useTransform(heroScroll, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white overflow-x-hidden"
    >

      {/* ══════════════════════════════════════════════════════════════════
          HERO — cinematic full-viewport dark hero
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img
            src="/images/ship-breaking/coastal-view.jpeg"
            alt="Ship breaking yard at Sitakunda, Chittagong"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Layered dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-transparent" />

        {/* Animated noise texture */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '200px 200px',
          }}
        />

        {/* Glowing red accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />

        {/* Content */}
        <motion.div
          className="relative section-container pb-20 lg:pb-28"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: ease.smooth }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase">
              East Queen Shipping Ltd.
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="font-playfair font-bold text-display text-white leading-[1.04] mb-8">
            <span className="block overflow-hidden">
              <WordDrop text="Ship Breaking" className="block" delay={0.2} />
            </span>
            <span className="block overflow-hidden">
              <WordDrop
                text="& Recycling"
                delay={0.42}
                className="block text-gradient-gold"
              />
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: ease.smooth }}
            className="max-w-xl text-white/55 text-lg leading-relaxed mb-10"
          >
            Bangladesh's premier ship recycling facility — combining industrial scale
            with rigorous international safety standards. Operating in{' '}
            <span className="text-white/80">Sitakunda, Chittagong</span> since 1982.
          </motion.p>

          {/* Location pill + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: ease.smooth }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400
                         text-white font-bold text-sm px-7 py-3.5 rounded-lg tracking-wide
                         transition-all duration-200 hover:shadow-gold-glow group"
            >
              Get a Quote
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="inline-flex items-center gap-2 text-white/40 text-sm">
              <MapPin size={14} className="text-gold-500/70" />
              Sitakunda, Chittagong, Bangladesh
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="relative bg-slate-50 border-y border-slate-200">
        <div className="section-container py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-slate-200">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.55, ease: ease.smooth }}
                className="md:px-8 first:pl-0 last:pr-0"
              >
                <StatItem {...s} inView={statsInView} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          INTRO — two-column brand statement
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                About the Division
              </p>
              <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
              <h2 className="font-playfair font-bold text-h1 text-slate-900 leading-tight mb-6">
                Where Steel Meets the Sea — and Returns to Industry
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                East Queen Shipping's ship-breaking division has been transforming end-of-life vessels
                into high-grade steel since 1982. Our yard at Sitakunda operates under the strictest
                international environmental and safety protocols.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Every vessel dismantled generates recoverable steel that feeds Bangladesh's thriving
                re-rolling industry — creating a circular economy from ocean to furnace.
              </p>
            </motion.div>

            {/* Right — image with floating badge */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-card">
                <img
                  src="/images/ship-breaking/scrap-urban-1.jpeg"
                  alt="Ship dismantling operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: ease.snappy }}
                className="absolute -bottom-6 -left-6 bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-hover"
              >
                <p className="font-mono text-3xl font-bold text-gold-500 leading-none">40+</p>
                <p className="text-slate-500 text-xs mt-1 tracking-wide">Years in operation</p>
              </motion.div>

              {/* Corner accent */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold-500/40 rounded-tr-lg" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CAPABILITIES — dark glass cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />

        <div className="relative section-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            >
              What We Do
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <motion.h2
              variants={fadeUp}
              className="font-playfair font-bold text-h1 text-slate-900 max-w-xl"
            >
              Full-Cycle Ship Recycling Capabilities
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: ease.smooth } }}
                className="group bg-white hover:bg-white border border-slate-200 hover:border-gold-200
                           rounded-2xl p-7 hover:shadow-card transition-all duration-300 cursor-default"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-100
                                group-hover:bg-gold-500 group-hover:border-gold-500
                                flex items-center justify-center transition-all duration-300"
                  >
                    <cap.icon
                      size={20}
                      className="text-gold-500 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-500 border border-gold-200 rounded-full px-2.5 py-1 bg-gold-50">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">
                  {cap.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROCESS — numbered vertical timeline (dark)
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={processRef} className="section-padding bg-white relative overflow-hidden">
        {/* Large decorative "05" number */}
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-playfair font-bold text-[18vw] text-slate-100 leading-none pr-8">
            05
          </span>
        </div>

        <div className="relative section-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            >
              The Process
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <motion.h2
              variants={fadeUp}
              className="font-playfair font-bold text-h1 text-slate-900 max-w-xl"
            >
              From Ocean Arrival to Steel Output
            </motion.h2>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative max-w-2xl">
            {/* Animated left track */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />
            <motion.div
              className="absolute left-6 top-0 w-px bg-gradient-to-b from-gold-500 via-gold-500/60 to-transparent origin-top"
              initial={{ scaleY: 0 }}
              animate={processInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.8, ease: ease.slow, delay: 0.3 }}
              style={{ height: '100%' }}
            />

            <div className="space-y-6">
              {processSteps.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, x: -40 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.5, duration: 0.55, ease: ease.smooth }}
                  className="flex items-start gap-8 pl-0"
                >
                  {/* Step circle */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-12 h-12 rounded-full bg-white border-2 border-gold-200
                                  flex items-center justify-center shadow-sm-card"
                    >
                      <span className="font-mono text-xs font-bold text-gold-500">{p.step}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5
                               hover:border-gold-200 hover:bg-white hover:shadow-sm-card
                               transition-all duration-300 cursor-default group"
                  >
                    <h3 className="font-bold text-slate-900 text-base mb-2">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GALLERY — cinematic asymmetric grid
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-slate-50 relative">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />

        <div className="relative section-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Yard Gallery
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h1 text-slate-900">
              Inside the Sitakunda Yard
            </motion.h2>
          </motion.div>

          {/* 3-column asymmetric masonry */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: ease.smooth }}
                whileHover="hover"
                className={[
                  'group relative overflow-hidden rounded-xl shadow-card cursor-pointer',
                  /* tall images span 2 rows on desktop */
                  i === 0 || i === 3 ? 'lg:row-span-2' : '',
                  i === 0 || i === 3 ? 'aspect-[3/4] lg:aspect-auto' : 'aspect-[4/3]',
                ].join(' ')}
              >
                <motion.img
                  src={img.src}
                  alt={`Ship breaking operations ${i + 1}`}
                  className="w-full h-full object-cover"
                  variants={{
                    hover: { scale: 1.06, transition: { duration: 0.7, ease: ease.smooth } },
                  }}
                />
                {/* overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"
                  variants={{
                    hover: { opacity: 1 },
                  }}
                  initial={{ opacity: 0.4 }}
                  transition={{ duration: 0.4 }}
                />
                {/* bottom label */}
                <motion.p
                  className="absolute bottom-4 left-4 text-white/80 text-xs font-semibold tracking-widest uppercase"
                  initial={{ opacity: 0, y: 8 }}
                  variants={{
                    hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                >
                  Sitakunda Yard
                </motion.p>

                {/* red corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-transparent border-r-gold-500/0 group-hover:border-r-gold-500/50 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — heading */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                Compliance & Standards
              </p>
              <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
              <h2 className="font-playfair font-bold text-h1 text-slate-900 mb-6">
                Operating to the World's Highest Standards
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Every phase of our recycling process adheres to the international regulatory
                framework governing ship dismantling — protecting workers, communities, and the
                marine environment.
              </p>
            </motion.div>

            {/* Right — cert list */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-3"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  variants={fadeRight}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4
                             hover:border-gold-200 hover:bg-gold-50 transition-all duration-300"
                >
                  <CheckCircle2 size={18} className="text-gold-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{cert}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — dramatic dark red closing section
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-navy-900 section-padding">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

        {/* Large anchor watermark */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden>
          <Anchor size={260} className="text-white/[0.025]" strokeWidth={0.8} />
        </div>

        {/* Top red line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative section-container"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <Waves size={16} className="text-gold-500/60" />
              <span className="text-gold-500/60 text-xs tracking-widest uppercase font-semibold">
                Ready to Proceed?
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-playfair font-bold text-h1 text-white mb-6 leading-tight"
            >
              Have a vessel to recycle?
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/45 text-lg leading-relaxed mb-10">
              Contact our maritime team for competitive quotes, compliance documentation
              support, and full logistics coordination from any port of origin.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400
                           text-white font-bold px-8 py-4 rounded-lg text-sm tracking-wide
                           transition-all duration-200 hover:shadow-gold-glow group"
              >
                Get a Quote
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/con-east-queen-shipping"
                className="inline-flex items-center gap-2.5 glass-dark hover:bg-white/[0.1]
                           text-white/70 hover:text-white font-semibold px-8 py-4 rounded-lg text-sm
                           transition-all duration-200"
              >
                About East Queen Shipping
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </motion.div>
  )
}
