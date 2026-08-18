import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe2, Users, Building2 } from 'lucide-react'
import { associates } from '@/data'
import { cn } from '@/lib/cn'
import type { Associate } from '@/types'

const PARTNER_COUNT = associates.length
const COUNTRY_COUNT = [...new Set(associates.map((a) => a.country).filter(Boolean))].length

// ── Globe wireframe SVG decoration ──────────────────────────────────────────
function GlobeDecor() {
  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-16 -right-16 w-[420px] h-[420px]
                 opacity-[0.055] pointer-events-none select-none"
      aria-hidden
    >
      <circle cx="260" cy="260" r="240" stroke="white" strokeWidth="1.2" />
      <ellipse cx="260" cy="260" rx="240" ry="72" stroke="white" strokeWidth="0.9" />
      <ellipse cx="260" cy="260" rx="240" ry="144" stroke="white" strokeWidth="0.9" />
      <line x1="20" y1="260" x2="500" y2="260" stroke="white" strokeWidth="0.9" />
      <ellipse cx="260" cy="260" rx="82" ry="240" stroke="white" strokeWidth="0.9" />
      <ellipse cx="260" cy="260" rx="164" ry="240" stroke="white" strokeWidth="0.9" />
      <line x1="260" y1="20" x2="260" y2="500" stroke="white" strokeWidth="0.9" />
    </svg>
  )
}

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
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 26,
        delay: index * 0.08,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative rounded-2xl border overflow-hidden cursor-default select-none',
        'bg-white/[0.04] border-white/[0.09]',
        'transition-colors duration-300',
        hovered && 'bg-white/[0.08] border-gold-500/35',
      )}
    >
      {/* Red left accent — slides in on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-500 origin-top"
        animate={{ scaleY: hovered ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Bottom shimmer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 h-[1px]
                       bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Corner glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl
                       bg-[radial-gradient(ellipse_at_top,rgba(226,31,47,0.06)_0%,transparent_70%)]
                       pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="px-5 py-7 flex flex-col items-center gap-3.5 text-center">

        {/* Avatar */}
        <motion.div
          className={cn(
            'w-[60px] h-[60px] rounded-2xl flex items-center justify-center shrink-0',
            'font-mono font-bold text-xl text-white',
            'shadow-[0_6px_20px_rgba(0,0,0,0.4)]',
            associate.color,
          )}
          animate={{
            scale: hovered ? 1.12 : 1,
            rotate: hovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
        >
          {associate.initials}
        </motion.div>

        {/* Name */}
        <motion.p
          animate={{ color: hovered ? '#F76169' : '#ffffff' }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-sm leading-tight"
        >
          {associate.name}
        </motion.p>

        {/* Country pill */}
        {associate.country && (
          <span className="inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full
                           bg-white/[0.07] border border-white/[0.12]
                           text-white/40 text-[9px] font-mono uppercase tracking-[0.18em]">
            <Globe2 size={7} className="shrink-0" />
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
    <section className="relative bg-navy-950 section-padding overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2
                      w-[700px] h-[280px] rounded-full
                      bg-gold-500/[0.05] blur-[90px] pointer-events-none" />

      {/* Globe wireframe */}
      <GlobeDecor />

      {/* Top red accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative section-container">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">

          {/* Left: text */}
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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
              className="font-playfair font-bold text-h2 text-white leading-tight mb-5"
            >
              Trusted Partners<br />
              <span className="text-gold-400">Across the Globe</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-white/45 text-base leading-relaxed"
            >
              Our network spans Bangladesh, the Middle East, Asia, and Europe —
              built on decades of trust and mutual growth.
            </motion.p>
          </div>

          {/* Right: stats + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-col gap-7 lg:items-end shrink-0"
          >
            {/* Stats row */}
            <div className="flex items-center gap-8">
              <div>
                <p className="font-mono font-bold text-gold-400 text-[2.4rem] leading-none">
                  {PARTNER_COUNT}
                </p>
                <p className="text-white/35 text-[10px] font-semibold uppercase tracking-[0.22em] mt-2
                               flex items-center gap-1.5">
                  <Building2 size={10} />
                  Associates
                </p>
              </div>

              <div className="w-px h-12 bg-white/10" />

              <div>
                <p className="font-mono font-bold text-gold-400 text-[2.4rem] leading-none">
                  {COUNTRY_COUNT}+
                </p>
                <p className="text-white/35 text-[10px] font-semibold uppercase tracking-[0.22em] mt-2
                               flex items-center gap-1.5">
                  <Globe2 size={10} />
                  Countries
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/associates"
              className="group inline-flex items-center gap-2.5 px-6 py-3
                         border border-white/15 hover:border-gold-500/50
                         text-white/65 hover:text-gold-400
                         rounded-xl text-sm font-semibold
                         hover:bg-white/[0.04]
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
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-14 origin-left"
        />

        {/* ── Cards ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {associates.map((associate, i) => (
            <AssociateCard key={associate.id} associate={associate} index={i} />
          ))}
        </div>

        {/* ── Bottom tagline ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/20 text-xs uppercase tracking-[0.3em] mt-14"
        >
          East Queen Group · Global Trade Network · Est. 1982
        </motion.p>

      </div>
    </section>
  )
}
