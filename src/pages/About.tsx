import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { ArrowRight } from 'lucide-react'
import { pageTransition, fadeLeft, staggerSlow, fadeDown, scaleIn } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import { timelineEvents } from '@/data'
import type { TimelineEvent } from '@/types'

/*
 * Entry direction per card index:
 *  0 → from TOP    1 → from RIGHT
 *  2 → from LEFT   3 → from BOTTOM
 */
const CARD_DIRS: { x: number; y: number }[] = [
  { x: 0,    y: -100 },
  { x: 100,  y: 0    },
  { x: -100, y: 0    },
  { x: 0,    y: 100  },
]

/* Reusable card content — shared by desktop & mobile */
function CardContent({ event }: { event: TimelineEvent }) {
  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-gold-500 to-gold-400" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono font-black text-gold-500 text-3xl leading-none">
            {event.year}
          </span>
          {event.milestone && (
            <span className="text-[10px] font-bold uppercase tracking-widest
                             text-gold-500 border border-gold-200 bg-gold-50
                             rounded-full px-2 py-0.5">
              Milestone
            </span>
          )}
        </div>
        <h4 className="font-playfair font-bold text-slate-900 text-lg leading-snug mb-2">
          {event.title}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed">{event.description}</p>
      </div>
    </>
  )
}

/* Desktop card — useInView drives animate so it ALWAYS fires on scroll */
function DesktopCard({
  event,
  dir,
  delay = 0,
}: {
  event: TimelineEvent
  dir: { x: number; y: number }
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: dir.x, y: dir.y }
      }
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ scale: 1.02, boxShadow: '0 18px 44px rgba(17,24,39,0.11)' }}
      className="w-full max-w-[400px] bg-white rounded-2xl border border-slate-200
                 shadow-card cursor-default overflow-hidden"
    >
      <CardContent event={event} />
    </motion.div>
  )
}

/* Mobile card — same useInView pattern */
function MobileCard({
  event,
  dir,
}: {
  event: TimelineEvent
  dir: { x: number; y: number }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: dir.x, y: dir.y }
      }
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden
                 hover:border-gold-200 hover:shadow-hover transition-colors duration-300"
    >
      <CardContent event={event} />
    </motion.div>
  )
}

const differentiators = [
  {
    title: '40+ Years Proven Track Record',
    body: 'Founded in 1982, East Queen Group has weathered decades of market cycles, political shifts, and global trade disruptions — emerging stronger each time. Our longevity is our most compelling credential.',
    img: '/images/shipping/bbg-master-night.jpeg',
  },
  {
    title: 'International Compliance & Quality',
    body: 'We comply with ISO standards, phytosanitary requirements, LWG leather certification, and all relevant international trade regulations. Our quality control processes are documented and auditable.',
    img: '/images/products/exports/mill-scale/mill-1.jpeg',
  },
  {
    title: 'Full-Service Logistics Support',
    body: 'From Letter of Credit to final delivery, we handle all documentation, third-party inspections, customs clearance, and logistics coordination — offering complete peace of mind.',
    img: '/images/products/imports/aggregate/aggregate-3.jpeg',
  },
]

const glanceStats = [
  { end: 1982, start: 1975, suffix: '',  label: 'Year Founded'        },
  { end: 40,   start: 0,    suffix: '+', label: 'Years of Excellence' },
  { end: 6,    start: 0,    suffix: '',  label: 'Group Companies'     },
  { end: 4,    start: 0,    suffix: '',  label: 'Continents Served'   },
]

const principleLinks = [
  {
    label:    'Mission, Vision & Purpose',
    sub:      'The foundation that guides every decision we make.',
    href:     '/mission-vision-purpose',
    img:      '/images/shipping/vessel-1.jpeg',
    tag:      '01',
  },
  {
    label:    'Our Core Values',
    sub:      'The principles we live by — not just talk about.',
    href:     '/our-core-values',
    img:      '/images/shipping/harmonia-arrival.jpeg',
    tag:      '02',
  },
]

export default function About() {
  const statsRef    = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="About East Queen Group"
        subtitle="Four decades of industrial excellence, ethical trade, and sustainable growth in Bangladesh and beyond."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        image="/images/shipping/tristar-prosperity.jpeg"
      />

      {/* ── Chairman's Message ──────────────────────────────────────────── */}
      <section id="chairman_message" className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />
        <div className="section-container relative">
          <div className="grid lg:grid-cols-[320px_1fr] gap-12 xl:gap-20 items-start">

            {/* Portrait — slides in from left */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:sticky lg:top-28"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-deep border border-gold-500/15">
                <img
                  src="/images/team/chairman.jpeg"
                  alt="A K M Abu Taher BSc. – Chairman, East Queen Group"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-500" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t
                                from-navy-900 via-navy-900/80 to-transparent px-6 pt-12 pb-5">
                  <p className="font-playfair font-bold text-white text-lg leading-snug">
                    A K M ABU TAHER BSc.
                  </p>
                  <p className="text-gold-500 text-sm font-semibold tracking-wide mt-1">
                    Chairman, East Queen Group
                  </p>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <img
                  src="/images/team/chairman-signature.png"
                  alt="Chairman's signature"
                  className="h-14 object-contain opacity-80 mix-blend-multiply"
                />
              </div>
            </motion.div>

            {/* Message — every element falls from above */}
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeDown} className="flex items-center gap-3 mb-4">
                <div className="gold-rule" />
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                  Chairman's Message
                </span>
              </motion.div>

              <motion.h2
                variants={fadeDown}
                className="font-playfair font-bold text-h2 text-slate-900 mb-8"
              >
                A Word From Our Chairman
              </motion.h2>

              <motion.div variants={fadeDown} className="relative mb-8">
                <span className="absolute -top-6 -left-2 text-[7rem] leading-none text-gold-500/10
                                 font-playfair font-bold select-none pointer-events-none">
                  "
                </span>
                <p className="font-playfair italic text-slate-700 text-xl leading-relaxed
                              pl-5 border-l-4 border-gold-500 relative">
                  Dear Friends & Partners,
                </p>
              </motion.div>

              {[
                'As Chairman, it gives me great pleasure to witness how far we have come in our journey — from humble beginnings to a diversified conglomerate with strong foundations in global trading, steel recycling, infrastructure development, energy, and more.',
                'Our mission has always been to deliver quality, reliability, and integrity across every sector we operate in. Through ARIKO International, we export mill scale, zinc ash, and PET flakes, while importing heavy melting scrap and aggregates to meet the needs of our growing industrial base.',
                'Our long-standing business relations across Asia, the Middle East, Europe, and North America reflect our global outlook and trustworthy reputation. Our success is driven by the trust of our partners, the hard work of our people, and our unwavering values — honesty, innovation, and sustainability.',
                'This website is more than a business portal — it is a gateway to our values, our capabilities, and our vision. I invite you to explore our services, connect with our team, and join us as we continue building a legacy of strength and excellence through East Queen Group.',
                'Thank you for your continued support and confidence in our group.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeDown}
                  className="text-slate-600 leading-loose mb-5 last:mb-0"
                >
                  {para}
                </motion.p>
              ))}

              <motion.div variants={fadeDown} className="mt-10 pt-7 border-t border-slate-200">
                <p className="text-slate-500 text-sm mb-1">Warm regards,</p>
                <p className="font-playfair font-bold text-slate-900 text-xl leading-tight">
                  A K M ABU TAHER BSc.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="gold-rule" style={{ width: '1.5rem' }} />
                  <p className="text-gold-500 text-sm font-semibold tracking-wide">
                    Chairman, East Queen Group
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── At A Glance ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-light-grid pointer-events-none opacity-60" />
        <div className="section-container relative">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — text from above */}
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeDown} className="flex items-center gap-3 mb-5">
                <div className="gold-rule" />
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                  Who We Are
                </span>
              </motion.div>

              <motion.h2
                variants={fadeDown}
                className="font-playfair font-bold text-h1 text-slate-900 leading-tight mb-6"
              >
                A Legacy Built on<br />
                <span className="text-gradient-gold">Trust & Trade</span>
              </motion.h2>

              <motion.p variants={fadeDown} className="text-slate-600 text-lg leading-relaxed">
                East Queen Group is one of Bangladesh's leading diversified conglomerates,
                spanning ship-breaking, international commodity trading, energy distribution,
                agri-business, and more. Since 1982, we have connected Bangladesh's industrial
                strength with global demand across four continents.
              </motion.p>

              {/* Stat cards — from above */}
              <div ref={statsRef} className="grid grid-cols-2 gap-4 mt-10">
                {glanceStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    variants={fadeDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="p-5 bg-slate-50 rounded-xl border border-slate-100
                               hover:border-gold-200 hover:shadow-sm-card transition-all duration-300"
                  >
                    <p className="font-mono font-black text-3xl text-slate-900 leading-none mb-1">
                      {statsInView ? (
                        <CountUp
                          start={s.start}
                          end={s.end}
                          duration={2.2}
                          delay={0.2 + i * 0.1}
                          separator=","
                        />
                      ) : String(s.start)}
                      <span className="text-gold-500">{s.suffix}</span>
                    </p>
                    <p className="text-slate-500 text-sm">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — image */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-hover">
                <img
                  src="/images/shipping/tristar-prosperity.jpeg"
                  alt="East Queen Group operations"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.45 }}
                  viewport={{ once: true }}
                  className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-hover"
                >
                  <p className="font-mono font-black text-gold-500 text-2xl leading-none">1982</p>
                  <p className="text-slate-700 text-xs font-semibold mt-1">Founded in Chittagong</p>
                  <p className="text-slate-400 text-[10px]">Bangladesh</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65, duration: 0.4, type: 'spring', stiffness: 300 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4 bg-gold-500 rounded-xl px-4 py-3 shadow-gold-glow"
                >
                  <p className="font-mono font-black text-white text-2xl leading-none">40+</p>
                  <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mt-0.5">
                    Years
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Explore Our Principles ───────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12"
          >
            <motion.div variants={fadeDown} className="flex items-center gap-3 mb-4">
              <div className="gold-rule" />
              <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                Our Principles
              </span>
            </motion.div>
            <motion.h2
              variants={fadeDown}
              className="font-playfair font-bold text-h2 text-slate-900"
            >
              What We Believe In
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {principleLinks.map(({ label, sub, href, img, tag }, i) => (
              <motion.div
                key={href}
                variants={fadeDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link
                  to={href}
                  className="group relative flex h-72 rounded-2xl overflow-hidden shadow-card
                             hover:shadow-hover transition-shadow duration-300 block"
                >
                  {/* Background image */}
                  <img
                    src={img}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover
                               transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t
                                 from-navy-950/95 via-navy-900/60 to-navy-900/20
                                 group-hover:from-navy-950 transition-all duration-500" />

                  {/* Top-left tag */}
                  <div className="absolute top-5 left-5 bg-gold-500 rounded-lg px-3 py-1.5 shadow-gold-glow">
                    <span className="font-mono font-black text-white text-xs">{tag}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <div className="h-[2px] w-8 bg-gold-500 rounded-full mb-4
                                    group-hover:w-14 transition-all duration-500" />
                    <h3 className="font-playfair font-bold text-white text-xl leading-snug mb-2">
                      {label}
                    </h3>
                    <p className="text-white/60 text-sm mb-5">{sub}</p>
                    <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold
                                    translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <span>Explore</span>
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Journey ─────────────────────────────────────────────────── */}
      <section id="timeline" className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[3px]
                        bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="section-container relative">
          <SectionHeader
            eyebrow="Our Journey"
            title="Four Decades of Growth"
            subtitle="From a single ship-breaking yard to a six-company conglomerate — every chapter built on the last."
            align="center"
            className="mb-14"
          />

          {/* ── Desktop alternating timeline ── */}
          <div className="relative hidden lg:block">
            {/* Center spine */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ originY: 0 }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]
                         bg-gradient-to-b from-gold-500/0 via-gold-500 to-gold-500/10"
            />

            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0
              const dir    = CARD_DIRS[i] ?? { x: 0, y: 0 }
              return (
                <div
                  key={event.year}
                  className="relative grid grid-cols-2 items-center mb-10 last:mb-0"
                >
                  {/* LEFT column */}
                  <div className="pr-12 flex justify-end">
                    {isLeft
                      ? <DesktopCard event={event} dir={dir} />
                      : (
                        <motion.div
                          initial={{ opacity: 0, x: -32 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="flex flex-col items-end gap-1 text-right"
                        >
                          <span className="font-mono font-black text-slate-200 text-5xl leading-none select-none">
                            {event.year}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            {event.title}
                          </span>
                        </motion.div>
                      )
                    }
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 340, damping: 22 }}
                      className="relative flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.6 }}
                        className="absolute w-5 h-5 rounded-full bg-gold-400 pointer-events-none"
                      />
                      <div className="relative w-4 h-4 rounded-full bg-gold-500 border-[3px] border-white shadow-gold-glow" />
                    </motion.div>
                  </div>

                  {/* RIGHT column */}
                  <div className="pl-12 flex justify-start">
                    {!isLeft
                      ? <DesktopCard event={event} dir={dir} />
                      : (
                        <motion.div
                          initial={{ opacity: 0, x: 32 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="flex flex-col items-start gap-1"
                        >
                          <span className="font-mono font-black text-slate-200 text-5xl leading-none select-none">
                            {event.year}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            {event.title}
                          </span>
                        </motion.div>
                      )
                    }
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Mobile stacked timeline ── */}
          <div className="lg:hidden relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ originY: 0 }}
              className="absolute left-5 top-0 bottom-0 w-[2px]
                         bg-gradient-to-b from-gold-500/0 via-gold-500 to-gold-500/0"
            />

            <div className="space-y-5 pl-14">
              {timelineEvents.map((event, i) => {
                const dir = CARD_DIRS[i] ?? { x: 0, y: 0 }
                return (
                  <div key={event.year} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[38px] top-5 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                        className="relative flex items-center justify-center"
                      >
                        <motion.span
                          animate={{ scale: [1, 2.0, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.6 }}
                          className="absolute w-4 h-4 rounded-full bg-gold-400"
                        />
                        <div className="w-3 h-3 rounded-full bg-gold-500 border-2 border-slate-50 shadow-gold-glow" />
                      </motion.div>
                    </div>
                    <MobileCard event={event} dir={dir} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            subtitle="Three pillars of excellence that define every engagement with East Queen Group."
            align="center"
            className="mb-14"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                variants={fadeDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative rounded-2xl overflow-hidden h-[420px] cursor-default"
              >
                <img
                  src={d.img}
                  alt={d.title}
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t
                               from-navy-950/95 via-navy-900/50 to-navy-900/10
                               group-hover:from-navy-950 transition-all duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="font-mono font-black text-gold-400 text-xs tracking-widest mb-3">
                    0{i + 1}
                  </span>
                  <div className="h-[2px] w-8 bg-gold-500 rounded-full mb-4
                                  group-hover:w-16 transition-all duration-500" />
                  <h3 className="font-playfair font-bold text-white text-xl leading-snug mb-3">
                    {d.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed
                                translate-y-4 opacity-0
                                group-hover:translate-y-0 group-hover:opacity-100
                                transition-all duration-500 delay-100">
                    {d.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
