import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown, Globe } from 'lucide-react'
import { exportProducts, importProducts } from '@/data'

// ─── Variants ────────────────────────────────────────────────────────────────
const ease = [0.25, 0.1, 0.25, 1] as const

const fromLeft = (i: number) => ({
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.52, ease } },
})
const fromRight = (i: number) => ({
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.52, ease } },
})
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

// ─── Process steps ────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Sourcing',       sub: 'Factory & farm direct'       },
  { n: '02', title: 'Inspection',     sub: 'SGS / independent QC'        },
  { n: '03', title: 'Packing',        sub: 'Bulk / jumbo bags / drums'   },
  { n: '04', title: 'Shipping',       sub: 'Vessel chartering & booking' },
  { n: '05', title: 'Documentation',  sub: 'Full customs & compliance'   },
]

// ─── Product card ─────────────────────────────────────────────────────────────
type Product = typeof exportProducts[number]

function ProductCard({ product, index, dir }: { product: Product; index: number; dir: 'left' | 'right' }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const vars   = dir === 'left' ? fromLeft(index) : fromRight(index)

  return (
    <motion.div
      ref={ref}
      variants={vars}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="mb-3"
    >
      <Link
        to={`/${product.type}-${product.urlSlug}`}
        className="group flex items-center gap-4 p-3.5 rounded-xl
                   border border-slate-200 bg-white
                   hover:border-gold-500/50 hover:shadow-[0_8px_32px_rgba(226,31,47,0.10)]
                   hover:-translate-y-0.5
                   transition-all duration-300 ease-out"
      >
        {/* Thumbnail */}
        <div className="relative w-[68px] h-[60px] shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center
                       group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {/* Red tint on hover */}
          <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10
                          transition-colors duration-300" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-slate-900 font-semibold text-sm leading-tight mb-0.5 truncate">
            {product.name}
          </p>
          <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em]
                           text-gold-500 mb-1.5">
            {product.category}
          </span>
          <p className="text-slate-400 text-[11px] leading-snug line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="shrink-0 w-7 h-7 rounded-full border border-slate-200
                        group-hover:bg-gold-500 group-hover:border-gold-500
                        flex items-center justify-center
                        transition-all duration-250">
          <ArrowRight size={12} className="text-slate-400 group-hover:text-white
                                           group-hover:translate-x-0.5
                                           transition-all duration-250" />
        </div>

        {/* Bottom red accent — grows on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500
                        group-hover:w-full transition-all duration-400 ease-out rounded-b-xl" />
      </Link>
    </motion.div>
  )
}

// ─── Column header ────────────────────────────────────────────────────────────
function TrackHeader({
  icon: Icon, label, count, dir,
}: {
  icon: typeof TrendingUp; label: string; count: number; dir: 'left' | 'right'
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const vars   = dir === 'left' ? fromLeft(0) : fromRight(0)

  return (
    <motion.div
      ref={ref}
      variants={vars}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex items-center justify-between mb-6 pb-5 border-b border-slate-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center
                        shadow-[0_4px_14px_rgba(226,31,47,0.35)]">
          <Icon size={16} className="text-white" />
        </div>
        <div>
          <p className="text-slate-900 font-bold text-base">{label}</p>
          <p className="text-slate-400 text-[11px]">{count} commodities</p>
        </div>
      </div>
      <span className="text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest">
        {dir === 'left' ? '← Outbound' : 'Inbound →'}
      </span>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProductsHighlight() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const headerView  = useInView(headerRef,  { once: true, margin: '-50px' })
  const processView = useInView(processRef, { once: true, margin: '-50px' })

  return (
    <section className="relative bg-slate-50 overflow-hidden">

      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full
                      bg-gold-500/[0.06] blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full
                      bg-gold-500/[0.04] blur-[80px] pointer-events-none" />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[2px] w-6 bg-gold-500 rounded-full" />
            <Globe size={12} className="text-gold-500" />
            <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.3em]">
              What We Trade
            </span>
            <Globe size={12} className="text-gold-500" />
            <div className="h-[2px] w-6 bg-gold-500 rounded-full" />
          </div>
          <h2 className="font-playfair font-bold text-navy-900 leading-tight mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}>
            Export &amp; Import{' '}
            <span className="text-gold-500">Operations</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-[540px] mx-auto leading-relaxed">
            Premium-grade commodities traded across global markets with
            full logistics and documentation support.
          </p>
        </motion.div>

        {/* ── Two-track layout ───────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 mb-20">

          {/* LEFT — Export (slide from left) */}
          <div className="relative pb-10 lg:pb-0 lg:pr-10">
            <TrackHeader
              icon={TrendingUp}
              label="Export Products"
              count={exportProducts.length}
              dir="left"
            />
            {exportProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} dir="left" />
            ))}
            <motion.div
              variants={fromLeft(exportProducts.length)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5"
            >
              <Link
                to="/export"
                className="group inline-flex items-center gap-2
                           text-gold-500 hover:text-gold-600
                           text-sm font-bold transition-colors duration-200"
              >
                View all export products
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          {/* DIVIDER — vertical red gradient line */}
          <div className="hidden lg:block">
            <div className="h-full w-px mx-auto
                            bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          </div>
          {/* Mobile horizontal rule */}
          <div className="lg:hidden h-px bg-slate-200 mb-10" />

          {/* RIGHT — Import (slide from right) */}
          <div className="lg:pl-10">
            <TrackHeader
              icon={TrendingDown}
              label="Import Products"
              count={importProducts.length}
              dir="right"
            />
            {importProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} dir="right" />
            ))}
            <motion.div
              variants={fromRight(importProducts.length)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5 flex justify-end"
            >
              <Link
                to="/import"
                className="group inline-flex items-center gap-2
                           text-slate-500 hover:text-gold-500
                           text-sm font-semibold transition-colors duration-200"
              >
                View all import products
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Process strip ──────────────────────────────────────────────── */}
        <motion.div
          ref={processRef}
          variants={fadeUp}
          initial="hidden"
          animate={processView ? 'visible' : 'hidden'}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-[0.3em] text-center">
              Our Trade Process
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 relative">
            {/* Animated connector line */}
            <div className="absolute top-[2.55rem] left-[10%] right-[10%] h-px
                            bg-slate-100 hidden lg:block" />
            {processView && (
              <motion.div
                className="absolute top-[2.55rem] left-[10%] h-px hidden lg:block
                           bg-gradient-to-r from-gold-500/60 to-gold-500/20 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ right: '10%' }}
              />
            )}

            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                animate={processView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.45, ease }}
                className="flex flex-col items-center text-center px-4 py-8
                           border-r border-slate-100 last:border-r-0
                           group cursor-default
                           hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="relative mb-4 z-10">
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-slate-200
                                  group-hover:border-gold-500
                                  group-hover:shadow-[0_0_0_4px_rgba(226,31,47,0.08)]
                                  flex items-center justify-center
                                  shadow-sm transition-all duration-300">
                    <span className="font-mono font-bold text-gold-500 text-[11px]">{step.n}</span>
                  </div>
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-1
                              group-hover:text-gold-500 transition-colors duration-200">
                  {step.title}
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">{step.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA row ────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Link
            to="/export"
            className="group inline-flex items-center gap-2 px-7 py-3.5
                       bg-gold-500 hover:bg-gold-600 text-white font-bold
                       rounded-xl text-sm shadow-[0_4px_20px_rgba(226,31,47,0.35)]
                       hover:shadow-[0_6px_28px_rgba(226,31,47,0.50)]
                       transition-all duration-200"
          >
            View Export Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/import"
            className="inline-flex items-center gap-2 px-7 py-3.5
                       bg-white hover:bg-slate-50 border border-slate-200
                       hover:border-gold-500/40 text-slate-700 font-semibold
                       rounded-xl text-sm transition-all duration-200 hover:shadow-sm"
          >
            View Import Products
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
