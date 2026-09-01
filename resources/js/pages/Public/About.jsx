import { useRef } from 'react'
import { Link } from '@inertiajs/react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { ArrowRight, Eye, Target, Flame } from 'lucide-react'
import { pageTransition, fadeLeft, scaleIn } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import SectionHeader from '@/components/public/ui/SectionHeader'
import { timelineEvents } from '@/data/timeline'

const EASE = [0.22, 1, 0.36, 1]

/* ── Timeline card ───────────────────────────────────────────────────────── */
function CardContent({ event }) {
  return (
    <>
      <div className="h-1.5 w-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono font-black text-gold-500 text-3xl leading-none">
            {event.year}
          </span>
          {event.milestone && (
            <span className="text-[10px] font-bold uppercase tracking-widest
                             text-gold-500 border border-gold-200 bg-gold-50
                             rounded-full px-2.5 py-1">
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

function DesktopCard({ event, side, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const xInit  = side === 'left' ? -80 : 80
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInit }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: xInit }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 48px rgba(13,11,30,0.13)' }}
      className="w-full max-w-[400px] bg-white rounded-[28px] border border-slate-200
                 shadow-card cursor-default overflow-hidden"
    >
      <CardContent event={event} />
    </motion.div>
  )
}

function MobileCard({ event }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE }}
      className="bg-white rounded-[24px] border border-slate-200 shadow-card overflow-hidden
                 hover:border-gold-200 hover:shadow-hover transition-colors duration-300"
    >
      <CardContent event={event} />
    </motion.div>
  )
}

/* ── Page-level data ─────────────────────────────────────────────────────── */
const glanceStats = [
  { end: 1982, start: 1974, suffix: '',  label: 'Year Founded',        color: 'red'  },
  { end: 42,   start: 0,    suffix: '+', label: 'Years of Excellence', color: 'red'  },
  { end: 6,    start: 0,    suffix: '',  label: 'Group Companies',     color: 'teal' },
  { end: 4,    start: 0,    suffix: '',  label: 'Continents Served',   color: 'teal' },
]

const differentiators = [
  {
    title: '40+ Years Proven Track Record',
    body:  'Founded in 1982, East Queen Group has weathered decades of market cycles, political shifts, and global trade disruptions — emerging stronger each time. Our longevity is our most compelling credential.',
    img:   '/images/shipping/bbg-master-night.jpeg',
    chip:  'bg-gold-500',
  },
  {
    title: 'International Compliance & Quality',
    body:  'We comply with HKC standards, phytosanitary requirements, SGS inspections, and all relevant international trade regulations. Our quality control processes are documented and auditable.',
    img:   '/images/products/exports/mill-scale/mill-1.jpeg',
    chip:  'bg-teal-500',
  },
  {
    title: 'Full-Service Logistics Support',
    body:  'From Letter of Credit to final delivery, we handle all documentation, third-party inspections, customs clearance, and logistics coordination — offering complete peace of mind.',
    img:   '/images/products/imports/aggregate/aggregate-3.jpeg',
    chip:  'bg-navy-700',
  },
]

const principleLinks = [
  {
    label: 'Mission & Vision',
    sub:   'The strategic direction and long-term purpose that guides us.',
    href:  '/mission-vision-purpose',
    img:   '/images/shipping/vessel-1.jpeg',
    tag:   '01',
  },
  {
    label: 'Our Core Values',
    sub:   'The principles we live by — not just talk about.',
    href:  '/our-core-values',
    img:   '/images/shipping/harmonia-arrival.jpeg',
    tag:   '02',
  },
]

const CHAIRMAN_PARAS = [
  'As Chairman, it gives me great pleasure to witness how far we have come in our journey — from humble beginnings on the shores of Chittagong to a diversified conglomerate with strong foundations in ship recycling, international commodity trading, energy, fisheries, and more.',
  'At East Queen Group, our mission is clear: to deliver quality, reliability, and integrity across every sector we operate in. Through companies like Ariko International, we have established a significant presence in the export of mill scale, zinc ash, PET flakes, and fresh agricultural produce, as well as the import of aggregate, coal, steel scrap, and industrial raw materials.',
  'Our long-standing business relationships across Asia, the Middle East, and Europe reflect our global outlook and trustworthy reputation. Our success is driven by the trust of our partners, the hard work of our people, and our unwavering values — honesty, innovation, and sustainability.',
  'As industries evolve, we remain committed to adapting through modern logistics and environmentally conscious practices that ensure long-term growth. This is more than a business — it is a legacy we are proud to grow.',
  'I invite you to explore our companies, connect with our team, and partner with us as we continue building a story of strength and excellence through East Queen Group.',
]

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function About({ chairman, timeline = timelineEvents }) {
  const statsRef    = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="About East Queen Group"
        subtitle="Four decades of industrial excellence, ethical trade, and sustainable growth — proudly rooted in Chittagong since 1982."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        image="/images/shipping/tristar-prosperity.jpeg"
      />

      {/* ── Company Overview ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-light-grid pointer-events-none opacity-40" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                        bg-gold-500/[0.04] pointer-events-none" />

        <div className="section-container relative">

          {/* Eyebrow + title */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-3xl mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="gold-rule" />
              <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                Established 1982 · Chittagong, Bangladesh
              </span>
            </div>
            <h2 className="font-playfair font-bold text-h1 text-slate-900 leading-tight">
              One of Bangladesh's Leading &<br />
              <span className="text-gradient-gold">Most Trusted Conglomerates</span>
            </h2>
          </motion.div>

          {/* Body paragraphs */}
          <div className="max-w-3xl mb-10 sm:mb-16 space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -56 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-slate-600 text-lg leading-relaxed"
            >
              East Queen Group is one of Bangladesh's most respected industrial conglomerates, proudly rooted in Chittagong since 1982. With over four decades of experience, we have established ourselves as pioneers in multiple sectors — including ship recycling, international trade, energy, fisheries, construction materials, and food industries.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -56 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="text-slate-600 leading-relaxed"
            >
              Founded by a visionary entrepreneur, East Queen Group has grown through resilience, integrity, and strategic foresight. Today we are known not only for being one of Bangladesh's most established ship recyclers but also for our dynamic expansion into new industries and global markets.
            </motion.p>
          </div>

          {/* Vision + Mission cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">

            {/* Vision — clean white editorial, slides from left */}
            <motion.div
              initial={{ opacity: 0, x: -110 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: EASE }}
              whileHover={{ y: -10, boxShadow: '0 24px 64px rgba(13,11,30,0.13)' }}
              className="group relative bg-white rounded-[32px] overflow-hidden
                         border border-slate-200 shadow-card cursor-default
                         transition-[border-color] duration-300 hover:border-slate-300"
            >
              {/* Left gold accent — slides down from top on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-500
                              scale-y-0 group-hover:scale-y-100 origin-top
                              transition-transform duration-500 ease-out" />

              <div className="relative p-8 pt-9">
                {/* Icon — navy square */}
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-6
                               group-hover:bg-gold-500 transition-colors duration-300">
                  <Eye size={20} className="text-white" />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-2">
                  Our Vision
                </p>
                {/* Accent rule — grows on hover */}
                <div className="h-[2px] w-6 bg-gold-500 rounded-full mb-6
                                group-hover:w-14 transition-all duration-500 ease-out" />

                <h3 className="font-playfair font-bold text-slate-900 text-[1.35rem] leading-snug mb-5">
                  Leading Bangladesh's<br />Industrial Transformation
                </h3>
                <p className="text-slate-500 leading-relaxed text-[0.9rem]">
                  To lead Bangladesh's industrial transformation by delivering excellence, fostering innovation, and building global partnerships that create value for generations.
                </p>
              </div>
            </motion.div>

            {/* Mission — clean white editorial, slides from right */}
            <motion.div
              initial={{ opacity: 0, x: 110 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
              whileHover={{ y: -10, boxShadow: '0 24px 64px rgba(13,11,30,0.13)' }}
              className="group relative bg-white rounded-[32px] overflow-hidden
                         border border-slate-200 shadow-card cursor-default
                         transition-[border-color] duration-300 hover:border-slate-300"
            >
              {/* Left gold accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-500
                              scale-y-0 group-hover:scale-y-100 origin-top
                              transition-transform duration-500 ease-out" />

              <div className="relative p-8 pt-9">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-6
                               group-hover:bg-gold-500 transition-colors duration-300">
                  <Target size={20} className="text-white" />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-2">
                  Our Mission
                </p>
                <div className="h-[2px] w-6 bg-gold-500 rounded-full mb-6
                                group-hover:w-14 transition-all duration-500 ease-out" />

                <h3 className="font-playfair font-bold text-slate-900 text-[1.35rem] leading-snug mb-5">
                  A National &<br />International Benchmark
                </h3>
                <p className="text-slate-500 leading-relaxed text-[0.9rem]">
                  To be recognized as a national and international benchmark in exporting, importing, manufacturing, and infrastructure development — through consistent performance, transparency, and customer satisfaction.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Our Spirit — dark card, slides from left */}
          <motion.div
            initial={{ opacity: 0, x: -110 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
            className="relative bg-navy-950 rounded-[32px] overflow-hidden shadow-deep
                       group cursor-default border border-white/[0.06]"
          >
            {/* Single brand-red top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-500" />

            {/* Subtle radial glow on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_10%_50%,rgba(226,31,47,0.08),transparent)]
                            opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center gap-8 p-8 md:p-12">
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10
                               flex items-center justify-center
                               group-hover:bg-gold-500/10 group-hover:border-gold-500/20
                               transition-all duration-400">
                  <Flame size={28} className="text-gold-400" />
                </div>
              </div>

              {/* Text */}
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">
                  Our Spirit
                </p>
                <p className="font-playfair font-bold text-white text-3xl md:text-[2.5rem] leading-tight">
                  Enterprise is our spirit.
                </p>
              </div>

              {/* Decorative right-side monogram */}
              <span className="hidden md:block ml-auto font-playfair font-black text-[5rem]
                               leading-none text-white/[0.04] select-none shrink-0">
                EQ
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Chairman's Message ───────────────────────────────────────────────── */}
      <section id="chairman_message" className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />
        <div className="section-container relative">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 xl:gap-20 items-start">

            {/* Portrait */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:sticky lg:top-28"
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-deep"
                   style={{ boxShadow: '0 0 0 2px rgba(226,31,47,0.18), 0 24px 64px rgba(13,11,30,0.35)' }}>
                <img
                  src="/images/team/chairman.jpeg"
                  alt="Chairman of East Queen Group"
                  className="w-full aspect-[3/4] object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                {/* Dual-tone top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5
                                bg-gradient-to-r from-teal-500 via-gold-500 to-gold-600" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t
                                from-navy-950 via-navy-950/80 to-transparent px-6 pt-14 pb-6">
                  <p className="font-playfair font-bold text-white text-lg leading-snug">
                    A K M Abu Taher BSc.
                  </p>
                  <p className="text-gold-400 text-sm font-semibold tracking-wide mt-1">
                    Chairman, East Queen Group
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Message column */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="gold-rule" />
                  <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                    Chairman's Message
                  </span>
                </div>

                <h2 className="font-playfair font-bold text-h2 text-slate-900 mb-8">
                  A Word From Our Chairman
                </h2>

                <div className="relative mb-8">
                  <span className="absolute -top-6 -left-2 text-[7rem] leading-none text-gold-500/10
                                   font-playfair font-bold select-none pointer-events-none">
                    "
                  </span>
                  <p className="font-playfair italic text-slate-700 text-xl leading-relaxed
                                pl-5 border-l-[3px] border-gold-500 relative">
                    Welcome to East Queen Group.
                  </p>
                </div>
              </motion.div>

              <div className="space-y-5">
                {CHAIRMAN_PARAS.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 56 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                    transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
                    className="text-slate-600 leading-loose"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE }}
                className="mt-10 pt-7 border-t border-slate-200"
              >
                <p className="text-slate-500 text-sm mb-1">Warm regards,</p>
                <p className="font-playfair font-bold text-slate-900 text-xl leading-tight">
                  A K M Abu Taher BSc.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="gold-rule" style={{ width: '1.5rem' }} />
                  <p className="text-gold-500 text-sm font-semibold tracking-wide">
                    Chairman, East Queen Group
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── At A Glance ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-light-grid pointer-events-none opacity-60" />
        <div className="section-container relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="gold-rule" />
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                  Who We Are
                </span>
              </div>
              <h2 className="font-playfair font-bold text-h1 text-slate-900 leading-tight mb-6">
                A Legacy Built on<br />
                <span className="text-gradient-gold">Trust &amp; Trade</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                East Queen Group is one of Bangladesh's leading diversified conglomerates, spanning ship-breaking, international commodity trading, energy distribution, agri-business, and more. Since 1982, we have connected Bangladesh's industrial strength with global demand across four continents.
              </p>

              {/* Stat cards — alternating red / teal tints */}
              <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10">
                {glanceStats.map((s, i) => {
                  const isRed = s.color === 'red'
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                      className={[
                        'p-5 rounded-[24px] border transition-all duration-300 hover:shadow-card',
                        isRed
                          ? 'bg-gradient-to-br from-gold-50 to-white border-gold-100/80 hover:border-gold-300'
                          : 'bg-gradient-to-br from-teal-50/70 to-white border-teal-100/80 hover:border-teal-300',
                      ].join(' ')}
                    >
                      <p className={[
                        'font-mono font-black text-3xl leading-none mb-1',
                        isRed ? 'text-gold-500' : 'text-teal-600',
                      ].join(' ')}>
                        {statsInView
                          ? <CountUp start={s.start} end={s.end} duration={2.2} delay={0.2 + i * 0.1} separator="," />
                          : String(s.start)
                        }
                        <span className={isRed ? 'text-gold-400' : 'text-teal-400'}>{s.suffix}</span>
                      </p>
                      <p className="text-slate-500 text-sm">{s.label}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Right — image with styled floating badges */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-hover">
                <img
                  src="/images/shipping/tristar-prosperity.jpeg"
                  alt="East Queen Group operations"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />

                {/* "Founded" badge — teal */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.45 }}
                  viewport={{ once: true }}
                  className="absolute bottom-4 left-4 bg-white rounded-[20px] p-4 shadow-hover
                             border border-teal-100"
                >
                  <p className="font-mono font-black text-teal-600 text-2xl leading-none">1982</p>
                  <p className="text-slate-700 text-xs font-semibold mt-1">Founded in Chittagong</p>
                  <p className="text-slate-400 text-[10px]">Bangladesh</p>
                </motion.div>

                {/* "42+ Years" badge — brand red */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65, duration: 0.4, type: 'spring', stiffness: 300 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4 bg-gradient-to-br from-gold-500 to-gold-600
                             rounded-[20px] px-4 py-3 shadow-gold-glow"
                >
                  <p className="font-mono font-black text-white text-2xl leading-none">42+</p>
                  <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mt-0.5">
                    Years
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Explore Our Principles ───────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-rule" />
              <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                Our Principles
              </span>
            </div>
            <h2 className="font-playfair font-bold text-h2 text-slate-900">
              What We Believe In
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {principleLinks.map(({ label, sub, href, img, tag }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
              >
                <Link
                  href={href}
                  className="group relative flex h-72 rounded-[32px] overflow-hidden shadow-card
                             hover:shadow-hover transition-shadow duration-300 block"
                >
                  <img
                    src={img}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover
                               transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t
                                 from-navy-950/95 via-navy-900/55 to-navy-900/15
                                 group-hover:from-navy-950 transition-all duration-500" />
                  {/* Number tag */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center justify-center w-9 h-9
                                     bg-gold-500 rounded-full shadow-gold-glow
                                     font-mono font-black text-white text-xs">
                      {tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <div className="h-[2px] w-8 bg-gold-500 rounded-full mb-4
                                    group-hover:w-14 transition-all duration-500" />
                    <h3 className="font-playfair font-bold text-white text-xl leading-snug mb-2">{label}</h3>
                    <p className="text-white/60 text-sm mb-5">{sub}</p>
                    <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold
                                    translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <span>Explore</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Journey (Timeline) ───────────────────────────────────────────── */}
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

          {/* Desktop alternating timeline */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ originY: 0 }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]
                         bg-gradient-to-b from-gold-500/0 via-gold-500 to-gold-500/10"
            />

            {timeline.map((event, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={event.year}
                  className="relative grid grid-cols-2 items-center mb-10 last:mb-0"
                >
                  <div className="pr-12 flex justify-end">
                    {isLeft
                      ? <DesktopCard event={event} side="left" />
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

                  <div className="pl-12 flex justify-start">
                    {!isLeft
                      ? <DesktopCard event={event} side="right" />
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

          {/* Mobile stacked timeline */}
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
              {timeline.map((event, i) => (
                <div key={event.year} className="relative">
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
                  <MobileCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ───────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            subtitle="Three pillars of excellence that define every engagement with East Queen Group."
            align="center"
            className="mb-14"
          />

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{
                  opacity: 0,
                  x: i === 0 ? -60 : i === 2 ? 60 : 0,
                  y: i === 1 ? 50 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
                className="group relative rounded-[32px] overflow-hidden h-[420px] cursor-default"
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
                  {/* Colored number chip */}
                  <span className={[
                    'inline-flex items-center justify-center w-9 h-9 rounded-full mb-4',
                    'font-mono font-black text-white text-xs shadow-lg',
                    d.chip,
                  ].join(' ')}>
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
