import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { pageTransition, stagger, fadeUp } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import { importProducts, importProcessSteps } from '@/data'

export default function Import() {
  const [activeProduct, setActiveProduct] = useState(importProducts[0])

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Import Products"
        subtitle="High-quality raw materials and industrial goods sourced from global markets and delivered to Bangladesh."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Import' }]}
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="What We Import"
            title="Our Import Products"
            subtitle="Six strategic commodity categories imported from verified international suppliers with full quality assurance."
            className="mb-12"
          />

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {/* Tab sidebar */}
            <div className="space-y-2">
              {importProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProduct(p)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                    activeProduct.id === p.id
                      ? 'bg-teal-500 text-white shadow-card'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                  }`}
                >
                  <span className="text-xl shrink-0">{p.icon}</span>
                  <span className="text-sm font-medium leading-tight">{p.name}</span>
                  {activeProduct.id === p.id && (
                    <ArrowRight size={13} className="ml-auto text-white/70 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Product detail */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-white border border-slate-100 rounded-2xl shadow-card overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-8">
                    <div className="flex items-start gap-4">
                      <span className="text-5xl">{activeProduct.icon}</span>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold uppercase tracking-wider mb-2">
                          {activeProduct.category}
                        </span>
                        <h2 className="font-playfair font-bold text-white text-h3">{activeProduct.name}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-slate-600 leading-relaxed mb-8">{activeProduct.description}</p>

                    {activeProduct.specs && (
                      <div className="mb-8">
                        <h4 className="font-semibold text-navy-900 text-sm uppercase tracking-wider mb-4">Key Specifications</h4>
                        <div className="border border-slate-100 rounded-xl overflow-hidden">
                          {Object.entries(activeProduct.specs).map(([key, val], i) => (
                            <div key={key} className={`grid grid-cols-2 px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                              <span className="text-slate-500 font-medium">{key}</span>
                              <span className="text-navy-900 font-semibold">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeProduct.tags && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {activeProduct.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to={`/contact?subject=import&product=${activeProduct.id}`}
                      className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all duration-200 text-sm"
                    >
                      Send Import Inquiry
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="section-padding bg-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern invert opacity-10" />
        <div className="relative section-container">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Import Process"
            subtitle="From requirement analysis to customs delivery — every step managed by our expert team."
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
            {importProcessSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUp} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl">
                  {step.icon}
                </div>
                <div>
                  <p className="font-mono font-bold text-white/50 text-sm mb-1">Step 0{step.step}</p>
                  <p className="font-semibold text-white text-sm mb-1.5">{step.title}</p>
                  <p className="text-white/55 text-xs leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
