import { useRef } from 'react'
import { Link } from '@inertiajs/react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, TrendingUp, TrendingDown, Globe,
  Search, ShieldCheck, Package, Ship, FileText,
} from 'lucide-react'
const ease = [0.25, 0.1, 0.25, 1]

const fromLeft = (i) => ({
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.52, ease } },
})
const fromRight = (i) => ({
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.52, ease } },
})
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const STEPS = [
  {
    n: '01', icon: Search,      title: 'Sourcing',
    sub:    'Direct from Origin',
    detail: 'Factory & farm direct procurement across Bangladesh, Oman, Indonesia, and beyond.',
  },
  {
    n: '02', icon: ShieldCheck, title: 'Inspection',
    sub:    'SGS / Bureau Veritas',
    detail: 'Independent third-party QC testing, sampling, and certification before loading.',
  },
  {
    n: '03', icon: Package,     title: 'Packing',
    sub:    'Bulk · Jumbo · Drums',
    detail: 'Flexible packing formats tailored to commodity type, port, and buyer requirements.',
  },
  {
    n: '04', icon: Ship,        title: 'Shipping',
    sub:    'Vessel Chartering',
    detail: 'Full freight management — vessel booking, draft survey, BL issuance, and tracking.',
  },
  {
    n: '05', icon: FileText,    title: 'Documentation',
    sub:    'Full Compliance',
    detail: 'L/C, customs clearance, phytosanitary certificates, and all trade documentation.',
  },
]

function ProductCard({ product, index, dir }) {
  const ref    = useRef(null)
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
        href={`/${product.type}-${product.slug}`}
        className="group relative flex items-center gap-4 p-3.5 rounded-xl
                   border border-slate-200 bg-white
                   hover:border-gold-500/50 hover:shadow-[0_8px_32px_rgba(226,31,47,0.10)]
                   hover:-translate-y-0.5 transition-all duration-300 ease-out overflow-hidden"
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
          <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-300" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-slate-900 font-semibold text-sm leading-tight mb-0.5 truncate">
            {product.name}
          </p>
          <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-500 mb-1.5">
            {product.category}
          </span>
          <p className="text-slate-400 text-[11px] leading-snug line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="shrink-0 w-7 h-7 rounded-full border border-slate-200
                        group-hover:bg-gold-500 group-hover:border-gold-500
                        flex items-center justify-center transition-all duration-200">
          <ArrowRight
            size={12}
            className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200"
          />
        </div>

        {/* Bottom red accent — grows on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500
                        group-hover:w-full transition-all duration-500 ease-out rounded-b-xl" />
      </Link>
    </motion.div>
  )
}

function TrackHeader({ icon: Icon, label, count, dir }) {
  const ref    = useRef(null)
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

export default function ProductsHighlight({
  exports: exportsData = [],
  imports: importsData = [],
}) {
  const headerRef   = useRef(null)
  const processRef  = useRef(null)
  const headerView  = useInView(headerRef,  { once: true, margin: '-50px' })
  const processView = useInView(processRef, { once: true, margin: '-50px' })

  return (
    <section className="relative bg-slate-50 overflow-hidden">

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full
                      bg-gold-500/[0.06] blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full
                      bg-gold-500/[0.04] blur-[80px] pointer-events-none" />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* Header */}
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
          <h2
            className="font-playfair font-bold text-navy-900 leading-tight mb-4"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            Export &amp; Import{' '}
            <span className="text-gold-500">Operations</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-[540px] mx-auto leading-relaxed">
            Premium-grade commodities traded across global markets with
            full logistics and documentation support.
          </p>
        </motion.div>

        {/* Two-track layout */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 mb-20">

          {/* LEFT — Exports */}
          <div className="relative pb-10 lg:pb-0 lg:pr-10">
            <TrackHeader icon={TrendingUp} label="Export Products" count={exportsData.length} dir="left" />
            {exportsData.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} dir="left" />
            ))}
            <motion.div
              variants={fromLeft(exportsData.length)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5"
            >
              <Link
                href="/export"
                className="group inline-flex items-center gap-2
                           text-gold-500 hover:text-gold-600
                           text-sm font-bold transition-colors duration-200"
              >
                View all export products
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block">
            <div className="h-full w-px mx-auto
                            bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          </div>
          <div className="lg:hidden h-px bg-slate-200 mb-10" />

          {/* RIGHT — Imports */}
          <div className="lg:pl-10">
            <TrackHeader icon={TrendingDown} label="Import Products" count={importsData.length} dir="right" />
            {importsData.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} dir="right" />
            ))}
            <motion.div
              variants={fromRight(importsData.length)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5 flex justify-end"
            >
              <Link
                href="/import"
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

        {/* Process section */}
        <div ref={processRef}>

          {/* Section label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={processView ? 'visible' : 'hidden'}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-slate-200" />
            <div className="flex items-center gap-2.5 px-5 py-2 rounded-full
                            border border-slate-200 bg-white shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Our Trade Process
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            </div>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-slate-200" />
          </motion.div>

          {/* Desktop: horizontal card row */}
          <div className="hidden lg:block relative">
            <div className="absolute top-[3.6rem] left-[8%] right-[8%] h-px bg-slate-200" />
            {processView && (
              <motion.div
                className="absolute top-[3.6rem] left-[8%] h-px bg-gold-500/50 origin-left"
                style={{ right: '8%' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {STEPS.map(({ n, icon: Icon, title, sub, detail }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 32 }}
                  animate={processView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.52, ease }}
                  className="group flex flex-col items-center text-center cursor-default"
                >
                  <div className="relative mb-6">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl
                                    bg-white border-2 border-slate-200
                                    group-hover:border-gold-500
                                    group-hover:shadow-[0_0_0_5px_rgba(226,31,47,0.08),0_8px_24px_rgba(226,31,47,0.14)]
                                    flex items-center justify-center
                                    shadow-sm transition-all duration-300 ease-out">
                      <Icon size={24} className="text-slate-400 group-hover:text-gold-500 transition-colors duration-300" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full
                                     bg-gold-500 text-white text-[9px] font-mono font-bold
                                     flex items-center justify-center
                                     shadow-[0_2px_8px_rgba(226,31,47,0.4)]
                                     group-hover:scale-110 transition-transform duration-200">
                      {n}
                    </span>
                  </div>

                  <p className="text-slate-900 font-bold text-sm mb-1 group-hover:text-gold-500 transition-colors duration-200">
                    {title}
                  </p>
                  <p className="text-gold-500/70 text-[10px] font-semibold uppercase tracking-[0.16em] mb-2">
                    {sub}
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed max-w-[140px]
                                opacity-0 group-hover:opacity-100
                                translate-y-1 group-hover:translate-y-0
                                transition-all duration-300 ease-out">
                    {detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden relative pl-10">
            <div className="absolute left-[1.4rem] top-0 bottom-0 w-px bg-slate-200" />
            {processView && (
              <motion.div
                className="absolute left-[1.4rem] top-0 w-px bg-gold-500/50 origin-top"
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}

            <div className="space-y-6">
              {STEPS.map(({ n, icon: Icon, title, sub, detail }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: 24 }}
                  animate={processView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.48, ease }}
                  className="flex gap-5 items-start group cursor-default"
                >
                  <div className="relative z-10 -ml-10 shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-white border-2 border-slate-200
                                    group-hover:border-gold-500 shadow-sm
                                    group-hover:shadow-[0_0_0_4px_rgba(226,31,47,0.08)]
                                    flex items-center justify-center transition-all duration-300">
                      <Icon size={18} className="text-slate-400 group-hover:text-gold-500 transition-colors duration-200" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full
                                     bg-gold-500 text-white text-[8px] font-mono font-bold
                                     flex items-center justify-center">
                      {n}
                    </span>
                  </div>

                  <div className="pt-2 pb-2">
                    <p className="text-slate-900 font-bold text-sm mb-0.5 group-hover:text-gold-500 transition-colors duration-200">
                      {title}
                    </p>
                    <p className="text-gold-500/70 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                      {sub}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">{detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Link
            href="/export"
            className="group inline-flex items-center gap-2 px-7 py-3.5
                       bg-gold-500 hover:bg-gold-600 text-white font-bold
                       rounded-xl text-sm
                       shadow-[0_4px_20px_rgba(226,31,47,0.35)]
                       hover:shadow-[0_6px_28px_rgba(226,31,47,0.50)]
                       transition-all duration-200"
          >
            View Export Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/import"
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
