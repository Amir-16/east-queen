import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, ChevronRight, Package } from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import { exportProducts, exportProcessSteps } from '@/data/exports'

const STEP_ICONS = ['🔍', '📋', '📦', '🚢', '✅']

export default function Export({ products = exportProducts, processSteps = exportProcessSteps }) {
  const [activeId, setActiveId] = useState(products[0]?.id)
  const active = products.find((p) => p.id === activeId) || products[0]

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Export Products"
        subtitle="From Bangladesh's industrial heartland to global markets — quality-certified commodities, reliably delivered."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Export' }]}
        image="/images/products/mill-scale.jpeg"
      />

      {/* Products section */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">What We Export</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">Our Export Portfolio</motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar tabs */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-2"
            >
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setActiveId(product.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    activeId === product.id
                      ? 'bg-navy-900 border-navy-900 text-white shadow-card'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-navy-300 hover:text-navy-900'
                  }`}
                >
                  <ChevronRight size={14} className={activeId === product.id ? 'text-gold-400' : 'text-slate-300'} />
                  {product.name}
                </button>
              ))}
            </motion.div>

            {/* Detail panel */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card"
                  >
                    {active.image && (
                      <div className="h-52 overflow-hidden">
                        <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-7 lg:p-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-gold-500 text-[11px] font-bold uppercase tracking-widest mb-1.5">Export Product</p>
                          <h3 className="font-playfair font-bold text-2xl text-navy-900">{active.name}</h3>
                        </div>
                        {active.hsCode && (
                          <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs rounded-lg font-mono shrink-0">HS {active.hsCode}</span>
                        )}
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{active.description || active.desc}</p>

                      {active.specs && Object.keys(active.specs).length > 0 && (
                        <div className="mb-6">
                          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Specifications</p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {Object.entries(active.specs).map(([k, v]) => (
                              <div key={k} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5">
                                <span className="text-slate-500 text-xs">{k}</span>
                                <span className="text-navy-900 text-xs font-semibold">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {active.markets?.length > 0 && (
                        <div className="mb-6">
                          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Target Markets</p>
                          <div className="flex flex-wrap gap-2">
                            {active.markets.map((m) => (
                              <span key={m} className="px-3 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 text-xs rounded-lg font-medium">{m}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-xl text-sm font-bold transition-colors"
                      >
                        Request a Quote <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="section-padding bg-navy-900">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Our Process</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-white">How We Export</motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-3">{STEP_ICONS[i] || '📦'}</div>
                <div className="font-mono font-black text-gold-500 text-xs mb-2">STEP {i + 1}</div>
                <h4 className="font-semibold text-white text-sm mb-2">{step.title}</h4>
                <p className="text-white/45 text-xs leading-relaxed">{step.description || step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
