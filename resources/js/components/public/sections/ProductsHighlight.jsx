import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
import { exportProducts } from '@/data/exports'
import { importProducts } from '@/data/imports'

const STEPS = [
  { n: '01', label: 'Inquiry' },
  { n: '02', label: 'Inspection' },
  { n: '03', label: 'Contract' },
  { n: '04', label: 'Logistics' },
  { n: '05', label: 'Delivery' },
]

export default function ProductsHighlight({
  exports: exportsData = exportProducts,
  imports: importsData = importProducts,
}) {
  const [activeExport, setActiveExport] = useState(0)
  const [activeImport, setActiveImport] = useState(0)

  return (
    <section className="section-padding bg-white">
      <div className="section-container space-y-20">

        {/* ── Exports ── */}
        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-10 flex items-end justify-between flex-wrap gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Exports</motion.p>
              <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
              <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">What We Export</motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/export" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-semibold text-sm transition-colors">
                All Export Products <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar tabs */}
            <div className="space-y-1.5">
              {exportsData.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveExport(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeExport === i ? 'bg-navy-900 text-white shadow-card' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <span className="text-sm font-medium leading-tight">{p.name}</span>
                  {activeExport === i && <ArrowRight size={12} className="ml-auto text-gold-400 shrink-0" />}
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExport}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-100 rounded-2xl shadow-card overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-7">
                    <span className="text-4xl mb-3 block">{exportsData[activeExport].icon}</span>
                    <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">{exportsData[activeExport].category}</span>
                    <h3 className="font-playfair font-bold text-white text-xl mt-1">{exportsData[activeExport].name}</h3>
                  </div>
                  <div className="p-7">
                    <p className="text-slate-600 leading-relaxed mb-6">{exportsData[activeExport].description}</p>
                    {exportsData[activeExport].specs && (
                      <div className="mb-6 border border-slate-100 rounded-xl overflow-hidden">
                        {Object.entries(exportsData[activeExport].specs).map(([k, v], i) => (
                          <div key={k} className={`grid grid-cols-2 px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                            <span className="text-slate-500">{k}</span>
                            <span className="text-navy-900 font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/contact-us`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-sm transition-all duration-200"
                    >
                      Export Inquiry <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Imports ── */}
        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-10 flex items-end justify-between flex-wrap gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Imports</motion.p>
              <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
              <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">What We Import</motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/import" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-semibold text-sm transition-colors">
                All Import Products <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              {importsData.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveImport(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeImport === i ? 'bg-teal-500 text-white shadow-card' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <span className="text-sm font-medium leading-tight">{p.name}</span>
                  {activeImport === i && <ArrowRight size={12} className="ml-auto text-white/70 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImport}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-100 rounded-2xl shadow-card overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-7">
                    <span className="text-4xl mb-3 block">{importsData[activeImport].icon}</span>
                    <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{importsData[activeImport].category}</span>
                    <h3 className="font-playfair font-bold text-white text-xl mt-1">{importsData[activeImport].name}</h3>
                  </div>
                  <div className="p-7">
                    <p className="text-slate-600 leading-relaxed mb-6">{importsData[activeImport].description}</p>
                    {importsData[activeImport].specs && (
                      <div className="mb-6 border border-slate-100 rounded-xl overflow-hidden">
                        {Object.entries(importsData[activeImport].specs).map(([k, v], i) => (
                          <div key={k} className={`grid grid-cols-2 px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                            <span className="text-slate-500">{k}</span>
                            <span className="text-navy-900 font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/contact-us`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl text-sm transition-all duration-200"
                    >
                      Import Inquiry <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Process steps ── */}
        <div className="bg-navy-900 rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="relative">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <motion.p variants={fadeUp} className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">How It Works</motion.p>
              <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h3 text-white">Our Trade Process</motion.h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mb-3">
                    <span className="font-mono font-bold text-gold-400 text-sm">{step.n}</span>
                  </div>
                  <p className="text-white text-sm font-semibold">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
