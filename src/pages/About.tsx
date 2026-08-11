import { motion } from 'framer-motion'
import { Shield, Target, Handshake, Lightbulb, CheckCircle2 } from 'lucide-react'
import { pageTransition, fadeUp, fadeLeft, fadeRight, stagger } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import { timelineEvents } from '@/data'

const values = [
  { icon: Shield,    title: 'Integrity',   desc: 'Ethical practices and transparent dealings in every transaction.' },
  { icon: Target,    title: 'Quality',     desc: 'Strict adherence to international standards across all operations.' },
  { icon: Handshake, title: 'Partnership', desc: 'Long-term relationships built on trust and mutual success.' },
  { icon: Lightbulb, title: 'Innovation',  desc: 'Continuously improving processes to meet evolving market needs.' },
]

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

export default function About() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="About East Queen Group"
        subtitle="Four decades of industrial excellence, ethical trade, and sustainable growth in Bangladesh and beyond."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        image="/images/shipping/tristar-prosperity.jpeg"
      />

      {/* ── Mission / Vision / Values ─────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="Our Foundation"
            title="Mission, Vision & Values"
            subtitle="The principles that have guided East Queen Group for over four decades."
            align="center"
            className="mb-14"
          />

          {/* Mission / Vision / Purpose cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              { label: 'Mission', text: "Delivering industrial excellence through ethical, reliable trade and service that creates lasting value for clients, employees, and communities." },
              { label: 'Vision',  text: "To be the most trusted diversified conglomerate in South Asian markets, setting standards in quality, compliance, and international partnership." },
              { label: 'Purpose', text: "To connect Bangladesh's industrial strength with global demand — driving economic growth while upholding the highest standards of integrity." },
            ].map(({ label, text }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-navy-900 rounded-2xl text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-500" />
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30
                                flex items-center justify-center mx-auto mb-5">
                  <div className="w-2 h-2 rounded-full bg-gold-500" />
                </div>
                <h3 className="font-playfair font-bold text-white text-xl mb-3">{label}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Values grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group p-6 bg-slate-50 hover:bg-gold-500 border border-slate-200
                           hover:border-gold-500 rounded-xl transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-gold-400
                                border border-slate-200 group-hover:border-gold-400
                                flex items-center justify-center mx-auto mb-4
                                transition-all duration-300 shadow-sm-card">
                  <Icon size={20} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-white text-base mb-2 transition-colors duration-300">
                  {title}
                </h4>
                <p className="text-slate-500 group-hover:text-white/75 text-sm transition-colors duration-300">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section id="timeline" className="section-padding bg-slate-50">
        <div className="section-container">
          <SectionHeader
            eyebrow="Our Journey"
            title="A Timeline of Growth"
            subtitle="From a single ship-breaking yard to a six-company conglomerate over four decades."
            align="center"
            className="mb-16"
          />

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px
                         bg-gradient-to-b from-gold-500/80 via-gold-500/40 to-transparent"
            />

            <div className="space-y-10">
              {timelineEvents.map((event, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={event.year}
                    variants={isLeft ? fadeLeft : fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="relative grid grid-cols-2 gap-8"
                  >
                    <div className={`${isLeft ? 'pr-8 text-right' : 'col-start-2 pl-8 text-left'}`}>
                      <div className={`p-5 bg-white rounded-xl shadow-sm-card border ${
                        event.milestone ? 'border-gold-200' : 'border-slate-100'
                      }`}>
                        <span className={`inline-block font-mono font-bold text-xl mb-2 ${
                          event.milestone ? 'text-gold-500' : 'text-navy-700'
                        }`}>
                          {event.year}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base mb-2">{event.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{event.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                        viewport={{ once: true }}
                        className={`w-4 h-4 rounded-full border-2 ${
                          event.milestone
                            ? 'bg-gold-500 border-gold-500 shadow-gold-glow'
                            : 'bg-white border-gold-400'
                        }`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            align="center"
            className="mb-16"
          />

          <div className="space-y-16">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={18} className="text-gold-500" />
                    <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                      Differentiator 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-h3 text-slate-900 mb-4">{d.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{d.body}</p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-card aspect-video">
                  <img src={d.img} alt={d.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
