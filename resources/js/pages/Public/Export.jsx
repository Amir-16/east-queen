import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
import { Search, ClipboardCheck, FileText, Truck, BadgeCheck, Circle } from 'lucide-react'
import PageHero from '@/components/public/ui/PageHero'
import SectionHeader from '@/components/public/ui/SectionHeader'

const ICON_MAP = {
  MagnifyingGlassIcon:        Search,
  ClipboardDocumentCheckIcon: ClipboardCheck,
  DocumentTextIcon:           FileText,
  TruckIcon:                  Truck,
  CheckBadgeIcon:             BadgeCheck,
}

export default function Export({ products = [], processSteps = [] }) {
  const [activeId, setActiveId] = useState(products[0]?.id)
  const active = products.find((p) => p.id === activeId) ?? products[0]

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <Head title="Export Products | East Queen Group" />
      <PageHero
        title="Export Products"
        subtitle="Premium Bangladeshi goods exported to global markets — from industrial commodities to fresh agricultural produce."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Export' }]}
        image="/images/products/mill-scale.jpeg"
      />

      {/* Products section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="What We Export"
            title="Our Export Products"
            subtitle="Six core product categories exported with full documentation, third-party inspection, and logistics support."
            className="mb-12"
          />

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {/* Tab sidebar */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 group ${
                    activeId === p.id
                      ? 'bg-navy-900 text-white shadow-card'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                  }`}
                >
                  <span className="text-xl shrink-0">{p.icon}</span>
                  <span className="text-sm font-medium leading-tight">{p.name}</span>
                  {activeId === p.id && (
                    <ArrowRight size={13} className="ml-auto text-gold-400 shrink-0" />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Detail panel */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="bg-white border border-slate-100 rounded-2xl shadow-card overflow-hidden"
                  >
                    {/* Dark header */}
                    <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-8">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">{active.icon}</span>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                            {active.category}
                          </span>
                          <h2 className="font-playfair font-bold text-white text-h3">{active.name}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-slate-600 leading-relaxed mb-8">{active.description || active.desc}</p>

                      {/* Specs table */}
                      {active.specs && Object.keys(active.specs).length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-semibold text-navy-900 text-sm uppercase tracking-wider mb-4">Key Specifications</h4>
                          <div className="border border-slate-100 rounded-xl overflow-hidden">
                            {Object.entries(active.specs).map(([key, val], i) => (
                              <div key={key} className={`grid grid-cols-2 px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                <span className="text-slate-500 font-medium">{key}</span>
                                <span className="text-navy-900 font-semibold">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {active.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {active.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full border border-gold-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href="/contact-us"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all duration-200 text-sm hover:shadow-gold-glow"
                      >
                        Send Export Inquiry
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="section-padding bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="relative section-container">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Export Process"
            subtitle="From your first inquiry to delivery at the destination port — we handle every step."
            align="center"
            theme="dark"
            className="mb-14"
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {processSteps.map((step) => {
              const Icon = ICON_MAP[step.icon] ?? Circle
              return (
                <motion.div key={step.id} variants={fadeUp} className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                    <Icon size={24} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="font-mono font-bold text-gold-500 text-sm mb-1">
                      Step {String(step.step_number).padStart(2, '0')}
                    </p>
                    <p className="font-semibold text-white text-sm mb-1.5">{step.title}</p>
                    <p className="text-white/45 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
