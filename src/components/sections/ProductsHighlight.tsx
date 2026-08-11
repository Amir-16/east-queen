import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { exportProducts, importProducts } from '@/data'

type Tab = 'export' | 'import'

const exportProcessSteps = [
  { step: 1, icon: '🔍', title: 'Sourcing',        description: 'Factory & farm direct procurement' },
  { step: 2, icon: '🔬', title: 'Inspection',      description: 'SGS / independent QC testing' },
  { step: 3, icon: '📦', title: 'Packing',         description: 'Bulk / jumbo bags / drums' },
  { step: 4, icon: '🚢', title: 'Shipping',        description: 'Vessel chartering & booking' },
  { step: 5, icon: '📋', title: 'Documentation',   description: 'Full customs & compliance' },
]

export default function ProductsHighlight() {
  const [activeTab, setActiveTab] = useState<Tab>('export')

  const products = activeTab === 'export' ? exportProducts : importProducts

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative section-container">
        <div className="text-center mb-12">
          <SectionHeader
            eyebrow="What We Trade"
            title="Export & Import Operations"
            subtitle="Premium-grade commodities traded across global markets with full logistics and documentation support."
            align="center"
            theme="dark"
          />
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-white/6 border border-white/10 rounded-xl p-1.5 gap-1">
            {(['export', 'import'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="products-tab"
                    className="absolute inset-0 bg-gold-500 rounded-lg"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                  {tab === 'export' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {tab === 'export' ? 'Export Products' : 'Import Products'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product image cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <Link
                  to={`/${activeTab}/${product.urlSlug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-white/8
                             hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1
                             hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] block"
                >
                  {/* Image */}
                  <div className="relative h-[140px] sm:h-[160px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center
                                 group-hover:scale-108 transition-transform duration-600 ease-out"
                      style={{ transition: 'transform 0.6s ease-out' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5
                                       bg-gold-500/90 text-white rounded-md">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="bg-white/5 group-hover:bg-white/8 p-3 transition-colors duration-200">
                    <p className="text-white font-semibold text-sm leading-tight mb-1">{product.name}</p>
                    <p className="text-white/40 text-[11px] leading-snug line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-gold-400/0 group-hover:text-gold-400
                                    text-[10px] font-bold uppercase tracking-wider transition-colors duration-200">
                      <span>View Details</span>
                      <ExternalLink size={9} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Process strip */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-8">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.3em] text-center mb-8">
            Our Trade Process
          </p>
          <div className="relative">
            <div className="absolute top-6 left-[10%] right-[10%] h-px
                             bg-gradient-to-r from-transparent via-gold-500/30 to-transparent hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
              {exportProcessSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="flex flex-col items-center text-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-full bg-navy-900 border-2 border-gold-500/40
                                   flex items-center justify-center text-2xl shadow-gold">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-gold-400 text-[10px] font-mono font-bold mb-1">0{step.step}</p>
                    <p className="text-white text-sm font-semibold mb-1">{step.title}</p>
                    <p className="text-white/35 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/export"
            className="group inline-flex items-center gap-2 px-7 py-3.5
                       bg-gold-500 hover:bg-gold-600 text-white
                       font-bold rounded-xl transition-all duration-200 text-sm hover:shadow-gold-glow"
          >
            View Export Products <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/import"
            className="inline-flex items-center gap-2 px-7 py-3.5
                       bg-white/8 hover:bg-white/12 border border-white/15 text-white
                       font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            View Import Products
          </Link>
        </div>
      </div>
    </section>
  )
}
