import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Award, Handshake, Lightbulb } from 'lucide-react'
import { pageTransition, stagger, fadeUp } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'

const VALUES = [
  {
    icon:  Shield,
    color: 'bg-gold-500/15 text-gold-500',
    label: 'Integrity',
    tagline: 'We do the right thing, always.',
    desc:  "Transparency and honesty are non-negotiable. From our supplier relationships to our environmental reporting, we hold ourselves accountable to the highest ethical standards — even when no one is watching.",
    points: ['Transparent pricing and contracts', 'Honest environmental reporting', 'Regulatory compliance without shortcuts', 'Fair labour practices'],
  },
  {
    icon:  Award,
    color: 'bg-teal-500/15 text-teal-400',
    label: 'Quality',
    tagline: 'Excellence at every step.',
    desc:  "We don't cut corners. Whether it's the steel recovered from a decommissioned vessel, the vegetables we pack for export, or the documentation we prepare for a trade deal — quality is embedded in every step.",
    points: ['SGS / Bureau Veritas inspection', 'ISO-aligned facility management', 'Phytosanitary export certification', 'Rigorous product sampling protocols'],
  },
  {
    icon:  Handshake,
    color: 'bg-blue-500/15 text-blue-400',
    label: 'Partnership',
    tagline: 'Long-term relationships over short-term gains.',
    desc:  "We view every client, supplier, and employee as a partner. Our oldest international trade relationships span more than a decade — built on mutual respect, shared risk, and consistent delivery.",
    points: ['Dedicated account management', 'Flexible payment terms for partners', 'Co-development of custom solutions', 'Joint due-diligence site visits'],
  },
  {
    icon:  Lightbulb,
    color: 'bg-amber-500/15 text-amber-400',
    label: 'Innovation',
    tagline: 'Continuously improving every process.',
    desc:  "We are not afraid to adopt new technology or methods — from gas-cutting innovations on the ship-breaking yard to digital documentation of agricultural exports. Progress is part of our culture.",
    points: ['Ongoing staff skills development', 'Technology investment in safety', 'Continuous process improvement cycles', 'R&D partnerships with academia'],
  },
]

function ValueCard({ value, index }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = value.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-card transition-all duration-300 cursor-pointer group"
      onClick={() => setExpanded((p) => !p)}
    >
      <div className="p-7">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${value.color}`}>
          <Icon size={20} />
        </div>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="font-playfair font-bold text-2xl text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">{value.label}</h3>
        <p className="text-slate-500 text-sm italic">{value.tagline}</p>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 border-t border-slate-100 pt-5">
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{value.desc}</p>
              <ul className="space-y-2">
                {value.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-7 pb-4 flex items-center gap-1.5 text-[11px] text-gold-500 font-semibold">
        {expanded ? 'Show less ↑' : 'Read more ↓'}
      </div>
    </motion.div>
  )
}

export default function CoreValues() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Our Core Values"
        subtitle="Four fundamental principles that shape our decisions, relationships, and results."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Core Values' }]}
        image="/images/ship-breaking/workers-2.jpeg"
      />

      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Principles</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900 max-w-lg mx-auto">
              The Values We Live By
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-sm mt-4 max-w-md mx-auto">
              Click each card to explore what these values mean in practice.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => <ValueCard key={v.label} value={v} index={i} />)}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
