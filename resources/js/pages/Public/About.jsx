import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight, ease } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import ChairmanMessage from '@/components/public/sections/ChairmanMessage'
import { timelineEvents } from '@/data/timeline'

const AT_A_GLANCE = [
  { value: '42+', label: 'Years of Operation' },
  { value: '6',   label: 'Group Companies'    },
  { value: '500+',label: 'People Employed'    },
  { value: '20+', label: 'Countries Reached'  },
]

const PRINCIPLES = [
  { title: 'Mission & Vision', desc: 'Our strategic direction and long-term purpose.',     href: '/mission-vision'  },
  { title: 'Core Values',      desc: 'The principles that guide every decision we make.',   href: '/core-values'     },
]

const SETS_APART = [
  'Four decades of uninterrupted operations in Bangladesh',
  'Vertically integrated supply chain across six industries',
  'Full HKC-compliant ship recycling facility',
  'Phytosanitary-certified agricultural exports',
  'SGS-inspected commodity import documentation',
  'Strong relationships with verified international buyers',
]

export default function About({ chairman, timeline = timelineEvents }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="About East Queen Group"
        subtitle="Four decades of industrial excellence — from a single ship-breaking yard to a diversified conglomerate serving global markets."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        image="/images/ship-breaking/yard-wide-1.jpeg"
      />

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <p className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Our Story</p>
              <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
              <h2 className="font-playfair font-bold text-h2 text-navy-900 mb-6">
                Built on the Shores of Chittagong
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                East Queen Group was founded in 1982 by a visionary entrepreneur who saw the potential in Bangladesh's strategic maritime location. Starting with ship-breaking operations on the Chittagong coast, the Group has steadily expanded into a six-company conglomerate spanning maritime, trading, energy, fisheries, construction materials, and food sectors.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Today, East Queen Group operates across Bangladesh and serves international markets in Asia, the Middle East, and Europe — guided by the same values of integrity, quality, and community that defined the company's earliest days.
              </p>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <div className="grid grid-cols-2 gap-4">
                {AT_A_GLANCE.map((s) => (
                  <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                    <p className="font-mono font-black text-3xl text-gold-500 mb-1">{s.value}</p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <ChairmanMessage chairman={chairman} />

      {/* Explore Our Principles */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Foundation</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">Explore Our Principles</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={p.href}
                  className="group flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-7 hover:border-gold-300 hover:shadow-card transition-all duration-300"
                >
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">{p.title}</h3>
                    <p className="text-slate-500 text-sm">{p.desc}</p>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-gold-500 shrink-0 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">History</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">Our Journey</motion.h2>
          </motion.div>

          {/* Desktop alternating timeline */}
          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-12">
              {timeline.map((event, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div key={event.year} className="relative grid grid-cols-2 gap-0">
                    {isLeft ? (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="pr-12 text-right"
                        >
                          <p className="font-mono font-black text-2xl text-gold-500 mb-2">{event.year}</p>
                          <h3 className="font-playfair font-bold text-xl text-navy-900 mb-3">{event.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{event.description}</p>
                        </motion.div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <motion.div
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="pl-12"
                        >
                          <p className="font-mono font-black text-2xl text-gold-500 mb-2">{event.year}</p>
                          <h3 className="font-playfair font-bold text-xl text-navy-900 mb-3">{event.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{event.description}</p>
                        </motion.div>
                      </>
                    )}
                    {/* Center dot */}
                    <div className="absolute left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-white shadow-sm" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile stacked */}
          <div className="lg:hidden relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="absolute -left-8 top-2 w-4 h-4 rounded-full bg-gold-500 border-4 border-white shadow-sm" />
                  <p className="font-mono font-black text-xl text-gold-500 mb-1">{event.year}</p>
                  <h3 className="font-playfair font-bold text-lg text-navy-900 mb-2">{event.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-padding bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Differentiators</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-white">What Sets Us Apart</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {SETS_APART.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl p-4"
              >
                <CheckCircle size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
