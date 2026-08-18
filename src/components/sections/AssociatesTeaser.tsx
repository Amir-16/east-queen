import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe2, Building2, MapPin } from 'lucide-react'
import { associates } from '@/data'
import { cn } from '@/lib/cn'
import type { Associate } from '@/types'

const PARTNER_COUNT = associates.length
const COUNTRY_COUNT = [...new Set(associates.map((a) => a.country).filter(Boolean))].length

// ── Single associate card ────────────────────────────────────────────────────
const AssociateCard = memo(function AssociateCard({
  associate,
  index,
}: {
  associate: Associate
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative bg-white rounded-2xl border overflow-hidden cursor-default select-none',
        'transition-all duration-300',
        hovered
          ? 'border-gold-500/50 shadow-[0_12px_48px_rgba(226,31,47,0.11),0_4px_16px_rgba(0,0,0,0.07)] -translate-y-1.5'
          : 'border-slate-150 shadow-sm hover:shadow-card',
      )}
      style={{ borderColor: hovered ? undefined : '#eef0f4' }}
    >
      {/* Red left accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-500 origin-top z-10"
        animate={{ scaleY: hovered ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Top red line (grows from left on hover) */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold-500 to-gold-400"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* ── Logo area ── */}
      <div className="relative flex items-center justify-center h-36 px-8 py-6
                       bg-white border-b border-slate-100/80">

        {/* Subtle radial glow behind logo on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0
                         bg-[radial-gradient(ellipse_at_center,rgba(226,31,47,0.05)_0%,transparent_70%)]"
            />
          )}
        </AnimatePresence>

        {associate.logo ? (
          <motion.img
            src={associate.logo}
            alt={associate.name}
            loading="lazy"
            decoding="async"
            className="relative z-10 max-h-20 w-full object-contain"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ) : (
          /* Fallback: colored initials badge */
          <motion.div
            className={cn(
              'relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center',
              'font-mono font-bold text-2xl text-white shadow-md',
              associate.color,
            )}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {associate.initials}
          </motion.div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="px-5 py-4 flex flex-col gap-1.5">
        <motion.p
          animate={{ color: hovered ? '#E21F2F' : '#111827' }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-[13px] leading-snug"
        >
          {associate.name}
        </motion.p>

        {associate.country && (
          <span className="inline-flex items-center gap-1.5 text-slate-400 text-[11px]">
            <MapPin size={9} className="text-gold-500 shrink-0" />
            {associate.country}
          </span>
        )}
      </div>
    </motion.div>
  )
})

// ── Section ──────────────────────────────────────────────────────────────────
export default function AssociatesTeaser() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">

      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" />

      {/* Top red rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative section-container">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">

          {/* Left: title block */}
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-[2px] w-9 bg-gold-500 rounded-full" />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Business Associates
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-playfair font-bold text-h2 text-slate-900 leading-tight mb-5"
            >
              Trusted Partners<br />
              <span className="text-gold-500">Across the Globe</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-slate-500 text-base leading-relaxed"
            >
              Our network spans Bangladesh, the Middle East, Asia, and Europe —
              built on decades of trust and mutual growth.
            </motion.p>
          </div>

          {/* Right: stats + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-col gap-7 lg:items-end shrink-0"
          >
            {/* Counters */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="font-mono font-bold text-gold-500 text-[2.2rem] leading-none">
                  {PARTNER_COUNT}
                </p>
                <p className="text-slate-400 text-[10px] font-semibold uppercase
                               tracking-[0.22em] mt-1.5 flex items-center gap-1.5">
                  <Building2 size={9} />
                  Associates
                </p>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div className="text-center">
                <p className="font-mono font-bold text-gold-500 text-[2.2rem] leading-none">
                  {COUNTRY_COUNT}+
                </p>
                <p className="text-slate-400 text-[10px] font-semibold uppercase
                               tracking-[0.22em] mt-1.5 flex items-center gap-1.5">
                  <Globe2 size={9} />
                  Countries
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/associates"
              className="group inline-flex items-center gap-2.5 px-6 py-3
                         bg-white border border-slate-200 hover:border-gold-500/50
                         text-slate-600 hover:text-gold-500 rounded-xl text-sm font-semibold
                         hover:shadow-[0_4px_20px_rgba(226,31,47,0.10)]
                         transition-all duration-200"
            >
              View All Partners
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-14 origin-left"
        />

        {/* ── Card grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {associates.map((associate, i) => (
            <AssociateCard key={associate.id} associate={associate} index={i} />
          ))}
        </div>

        {/* ── Footer tagline ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-slate-300 text-[10px] uppercase tracking-[0.32em] mt-14"
        >
          East Queen Group · Global Trade Network · Est. 1982
        </motion.p>

      </div>
    </section>
  )
}
