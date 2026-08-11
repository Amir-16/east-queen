import { motion } from 'framer-motion'
import { fadeUp, stagger, fadeLeft, fadeRight } from '@/lib/motion'
import { Anchor, Shield, Recycle, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '40+',    label: 'Years of Experience'       },
  { value: '500+',   label: 'Vessels Recycled'          },
  { value: '100%',   label: 'International Compliance'  },
  { value: '1,000+', label: 'MT Scrap Processed / Year' },
]

const capabilities = [
  {
    icon: Anchor,
    title: 'Ocean-Going Vessel Recycling',
    description: 'Safe and systematic dismantling of bulk carriers, tankers, container ships, and offshore vessels — from 500 DWT to 50,000+ DWT.',
  },
  {
    icon: Shield,
    title: 'Safe & Compliant Operations',
    description: 'Full compliance with Hong Kong Convention, Bangladesh Ship Recycling Rules 2011, and ILO safety standards. PPE-equipped workforce with trained safety officers on-site.',
  },
  {
    icon: Recycle,
    title: 'Green Recycling',
    description: 'Environmentally responsible dismantling — asbestos removal, oil sludge management, and hazardous material handling following Basel Convention guidelines.',
  },
  {
    icon: Award,
    title: 'Quality Steel Output',
    description: 'Scrap steel sorted and graded for direct supply to re-rolling mills and steel manufacturers across Bangladesh — minimizing waste, maximizing value.',
  },
]

const processSteps = [
  { step: 1, title: 'Vessel Acquisition',     description: 'Purchase of end-of-life vessels from international owners through transparent tender processes.' },
  { step: 2, title: 'Pre-Demolition Survey',  description: 'Comprehensive pre-demolition inspection and hazardous material inventory per HKC standards.' },
  { step: 3, title: 'Beaching & Positioning', description: 'High-tide beaching at designated yard with certified crew and heavy equipment standby.' },
  { step: 4, title: 'Systematic Dismantling', description: 'Cutting team works from superstructure down — gas-cut steel plates, pipes, and equipment recovered.' },
  { step: 5, title: 'Scrap Sorting & Dispatch', description: 'Steel scrap graded (HMS 1&2, LDT), weighed, and dispatched to Bangladesh re-rolling mills.' },
]

const galleryImages = [
  '/images/ship-breaking/scrap-urban-1.jpeg',
  '/images/ship-breaking/scrap-urban-2.jpeg',
  '/images/ship-breaking/coastal-view.jpeg',
  '/images/shipping/bbg-master-night.jpeg',
  '/images/shipping/harmonia-arrival.jpeg',
  '/images/products/imports/steel-scrap/scrap-1.jpeg',
]

export default function ShipBreaking() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white"
    >
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/ship-breaking/coastal-view.jpeg"
            alt="Ship breaking yard at Sitakunda, Chittagong"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />
        </div>

        <div className="relative section-container w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-widest uppercase mb-5"
            >
              <Anchor size={15} />
              East Queen Shipping Ltd.
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-playfair font-bold text-display text-white leading-tight mb-5"
            >
              Ship Breaking<br />
              <span className="text-gradient-gold">& Recycling</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-white/65 text-lg leading-relaxed">
              Bangladesh's premier ship recycling facility — combining industrial scale with rigorous
              international safety and environmental standards. Operating in Sitakunda, Chittagong since 1982.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="section-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-mono text-4xl font-bold text-gold-500 mb-1">{s.value}</p>
                <p className="text-slate-500 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 text-center">
            <div className="h-[3px] w-10 bg-gold-500 rounded-full mx-auto mb-4" />
            <h2 className="font-playfair font-bold text-h2 text-slate-900">Our Capabilities</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-gold-200
                           p-8 rounded-2xl hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-100
                                group-hover:bg-gold-500 group-hover:border-gold-500
                                flex items-center justify-center mb-5 transition-all duration-300">
                  <cap.icon size={22} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">{cap.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 text-center">
            <div className="h-[3px] w-10 bg-gold-500 rounded-full mx-auto mb-4" />
            <h2 className="font-playfair font-bold text-h2 text-slate-900">Recycling Process</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px
                            bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-transparent" />

            <div className="space-y-8">
              {processSteps.map((p, i) => (
                <motion.div
                  key={p.step}
                  variants={fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-6 pl-0 md:pl-6"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-500 text-white text-sm font-bold font-mono
                                  flex items-center justify-center shrink-0 shadow-gold-glow z-10">
                    {p.step}
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm-card">
                    <h3 className="font-bold text-slate-900 text-base mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center">
            <div className="h-[3px] w-10 bg-gold-500 rounded-full mx-auto mb-4" />
            <h2 className="font-playfair font-bold text-h2 text-slate-900">Yard Gallery</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="aspect-[4/3] overflow-hidden rounded-xl shadow-sm-card"
              >
                <img
                  src={src}
                  alt={`Ship breaking operations ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative section-container text-center"
        >
          <h2 className="font-playfair font-bold text-h1 text-white mb-4">
            Have a vessel to recycle?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
            Contact our maritime team for competitive quotes and full compliance documentation support.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400
                       text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wide
                       transition-all duration-200 hover:shadow-gold-glow"
          >
            Get a Quote <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  )
}
