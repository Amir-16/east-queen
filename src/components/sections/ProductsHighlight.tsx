import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { exportProducts, importProducts } from '@/data'

type Tab = 'export' | 'import'

const processSteps = [
  { step: 1, icon: '🔍', title: 'Sourcing',       description: 'Factory & farm direct procurement' },
  { step: 2, icon: '🔬', title: 'Inspection',     description: 'SGS / independent QC testing' },
  { step: 3, icon: '📦', title: 'Packing',        description: 'Bulk / jumbo bags / drums' },
  { step: 4, icon: '🚢', title: 'Shipping',       description: 'Vessel chartering & booking' },
  { step: 5, icon: '📋', title: 'Documentation',  description: 'Full customs & compliance' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.42, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const stepVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function ProductsHighlight() {
  const [activeTab, setActiveTab] = useState<Tab>('export')
  const products = activeTab === 'export' ? exportProducts : importProducts

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" />

      {/* Ambient glow orbs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full
                      bg-gold-500/[0.06] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full
                      bg-gold-500/[0.05] blur-[80px] pointer-events-none" />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative section-container">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader
            eyebrow="What We Trade"
            title="Export & Import Operations"
            subtitle="Premium-grade commodities traded across global markets with full logistics and documentation support."
            align="center"
            theme="light"
          />
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex items-center bg-slate-100 border border-slate-200
                          rounded-xl p-1.5 gap-1 shadow-sm">
            {(['export', 'import'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-2.5 rounded-lg text-sm font-semibold
                           transition-colors duration-200 flex items-center gap-2"
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="products-tab"
                    className="absolute inset-0 bg-gold-500 rounded-lg shadow-[0_4px_20px_rgba(226,31,47,0.35)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200
                  ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}>
                  {tab === 'export'
                    ? <TrendingUp size={14} />
                    : <TrendingDown size={14} />}
                  {tab === 'export' ? 'Export Products' : 'Import Products'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={`/${activeTab}-${product.urlSlug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl
                             border border-slate-200 bg-white
                             hover:border-gold-500/50 hover:-translate-y-1.5
                             hover:shadow-[0_20px_52px_rgba(226,31,47,0.13),0_4px_16px_rgba(0,0,0,0.06)]
                             transition-all duration-300 ease-out block"
                >
                  {/* Image */}
                  <div className="relative h-[148px] sm:h-[168px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center
                                 group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t
                                    from-slate-900/65 via-slate-900/10 to-transparent" />
                    {/* Red tint on hover */}
                    <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/8
                                    transition-colors duration-500" />

                    {/* Category badge */}
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase
                                     tracking-[0.2em] px-2.5 py-1 bg-gold-500 text-white rounded-md
                                     shadow-[0_2px_8px_rgba(226,31,47,0.5)]">
                      {product.category}
                    </span>

                    {/* Arrow CTA — slides up on hover */}
                    <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-gold-500
                                    flex items-center justify-center
                                    opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                                    transition-all duration-300 shadow-[0_2px_10px_rgba(226,31,47,0.5)]">
                      <ArrowRight size={12} className="text-white" />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-3.5 flex-1 flex flex-col">
                    <p className="text-slate-900 font-semibold text-sm leading-tight mb-1">
                      {product.name}
                    </p>
                    <p className="text-slate-400 text-[11px] leading-snug line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2.5
                                    text-[10px] font-bold uppercase tracking-wider
                                    text-gold-500/0 group-hover:text-gold-500
                                    transition-colors duration-250">
                      <span>View Details</span>
                      <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </div>

                  {/* Bottom accent line — grows on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500
                                  group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Process strip */}
        <motion.div
          className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-[0.3em]
                        text-center mb-8">
            Our Trade Process
          </p>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-px hidden md:block
                            bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-3 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-500/25
                                   group-hover:border-gold-500 group-hover:shadow-[0_0_0_4px_rgba(226,31,47,0.1)]
                                   flex items-center justify-center text-xl
                                   transition-all duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-gold-500 text-[10px] font-mono font-bold mb-1">
                      0{step.step}
                    </p>
                    <p className="text-slate-900 text-sm font-semibold mb-1">{step.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            to="/export"
            className="group inline-flex items-center gap-2 px-7 py-3.5
                       bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-xl text-sm
                       transition-all duration-200 hover:shadow-gold-glow"
          >
            View Export Products
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/import"
            className="inline-flex items-center gap-2 px-7 py-3.5
                       bg-white hover:bg-slate-50 border border-slate-200 hover:border-gold-500/40
                       text-slate-700 font-semibold rounded-xl text-sm
                       transition-all duration-200 hover:shadow-sm"
          >
            View Import Products
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
