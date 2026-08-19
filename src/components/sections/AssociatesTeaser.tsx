import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe2, Building2 } from 'lucide-react'
import { associates, companies } from '@/data'
import { cn } from '@/lib/cn'

// ── Unified entity list ──────────────────────────────────────────────────────
const ownCompanies = companies.map((c) => ({
  id:       c.id,
  name:     c.name,
  logo:     c.logo,
  initials: c.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
  color:    c.color,
  href:     `/con-${c.id}`,
  isOwn:    true,
}))

const partnerList = associates.map((a) => ({
  id:       a.id,
  name:     a.name,
  logo:     a.logo,
  initials: a.initials,
  color:    a.color,
  href:     '/associates',
  isOwn:    false,
}))

// ── Logo card ────────────────────────────────────────────────────────────────
interface LogoCardProps {
  id: string
  name: string
  logo?: string
  initials: string
  color: string
  href: string
  index: number
}

const LogoCard = memo(function LogoCard({ name, logo, initials, color, href, index }: LogoCardProps) {
  const [hovered, setHovered] = useState(false)
  const reduced   = useReducedMotion()

  // Alternating up/down: even index rises from below, odd drops from above
  const initY = reduced ? 0 : index % 2 === 0 ? 64 : -64

  return (
    <motion.div
      initial={{ opacity: 0, y: initY, scale: reduced ? 1 : 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 22,
        delay: index * 0.055,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-3"
    >
      <Link
        to={href}
        className={cn(
          'relative w-full bg-white rounded-2xl border overflow-hidden',
          'flex items-center justify-center',
          'h-[110px] sm:h-[120px]',
          'transition-all duration-300 cursor-pointer',
          hovered
            ? 'border-gold-500/50 shadow-[0_8px_36px_rgba(226,31,47,0.13),0_2px_10px_rgba(0,0,0,0.07)] -translate-y-1.5'
            : 'border-slate-100 shadow-sm',
        )}
        style={{ borderColor: hovered ? undefined : '#eef0f4' }}
      >
        {/* Top accent line grows on hover */}
        <motion.div
          className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-gold-500 to-gold-400"
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Red left accent */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-500 origin-top"
          animate={{ scaleY: hovered ? 1 : 0 }}
          initial={{ scaleY: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Radial glow behind logo */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0
                         bg-[radial-gradient(ellipse_at_center,rgba(226,31,47,0.05)_0%,transparent_70%)]"
            />
          )}
        </AnimatePresence>

        {/* Logo or initials */}
        {logo ? (
          <motion.img
            src={logo}
            alt={name}
            loading="lazy"
            decoding="async"
            className="relative z-10 max-h-[72px] max-w-[80%] object-contain"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ) : (
          <motion.div
            className={cn(
              'relative z-10 w-14 h-14 rounded-xl flex items-center justify-center',
              'font-mono font-bold text-xl text-white shadow-md',
              color,
            )}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {initials}
          </motion.div>
        )}
      </Link>

      {/* Company name — fades in from same direction as card */}
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : index % 2 === 0 ? 10 : -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
          delay: index * 0.055 + 0.1,
        }}
        animate={{ color: hovered ? '#E21F2F' : '#374151' }}
        className="text-[11px] sm:text-xs font-semibold text-center leading-snug px-1"
      >
        {name}
      </motion.p>
    </motion.div>
  )
})

// ── Group label ──────────────────────────────────────────────────────────────
function GroupLabel({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <div className="flex items-center gap-3 mb-6 overflow-hidden">
      {/* Red dash */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-[2px] w-6 bg-gold-500 rounded-full origin-left shrink-0"
      />
      {/* Label text slides up */}
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.08, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.28em] shrink-0"
      >
        {label}
      </motion.span>
      {/* Expanding rule line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent origin-left"
      />
    </div>
  )
}

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

          <div className="max-w-xl">
            {/* Eyebrow — slides in from left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="flex items-center gap-3 mb-5"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-[2px] w-9 bg-gold-500 rounded-full origin-left"
              />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Our Concerns & Global Partners
              </span>
            </motion.div>

            {/* Title — words stagger up from bottom */}
            <div className="font-playfair font-bold text-h2 text-slate-900 leading-tight mb-5 overflow-hidden">
              {['Trusted Alliances &', 'Strategic Divisions'].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 28,
                      delay: 0.1 + li * 0.12,
                    }}
                    className={li === 1 ? 'text-gold-500' : ''}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Subtitle — rises from below */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.32 }}
              className="text-slate-500 text-base leading-relaxed"
            >
              Six specialized companies and a global network of trusted partners —
              driving trade across Bangladesh, the Middle East, Asia, and Europe.
            </motion.p>
          </div>

          {/* Stats + CTA — drops from above */}
          <motion.div
            initial={{ opacity: 0, y: -32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.18 }}
            className="flex flex-col gap-7 lg:items-end shrink-0"
          >
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.28 }}
                className="text-center"
              >
                <p className="font-mono font-bold text-gold-500 text-[2.2rem] leading-none">
                  {ownCompanies.length}
                </p>
                <p className="text-slate-400 text-[10px] font-semibold uppercase
                               tracking-[0.22em] mt-1.5 flex items-center gap-1.5">
                  <Building2 size={9} /> Companies
                </p>
              </motion.div>
              <div className="w-px h-10 bg-slate-200" />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.36 }}
                className="text-center"
              >
                <p className="font-mono font-bold text-gold-500 text-[2.2rem] leading-none">
                  {partnerList.length}+
                </p>
                <p className="text-slate-400 text-[10px] font-semibold uppercase
                               tracking-[0.22em] mt-1.5 flex items-center gap-1.5">
                  <Globe2 size={9} /> Partners
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.44 }}
              className="flex items-center gap-3"
            >
              <Link
                to="/companies"
                className="group inline-flex items-center gap-2 px-5 py-2.5
                           bg-white border border-slate-200 hover:border-gold-500/50
                           text-slate-600 hover:text-gold-500 rounded-xl text-sm font-semibold
                           hover:shadow-[0_4px_20px_rgba(226,31,47,0.10)]
                           transition-all duration-200"
              >
                Our Companies
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/associates"
                className="group inline-flex items-center gap-2 px-5 py-2.5
                           bg-gold-500 hover:bg-gold-600 text-white
                           rounded-xl text-sm font-semibold
                           hover:shadow-gold-glow transition-all duration-200"
              >
                All Partners
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Animated divider ────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12 origin-left"
        />

        {/* ── East Queen Group companies ───────────────────────────────────── */}
        <GroupLabel label="East Queen Group Companies" />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 mb-14">
          {ownCompanies.map((c, i) => (
            <LogoCard key={c.id} {...c} index={i} />
          ))}
        </div>

        {/* ── Business associates ──────────────────────────────────────────── */}
        <GroupLabel label="Business Associates & Partners" delay={0.1} />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {partnerList.map((p, i) => (
            <LogoCard key={p.id} {...p} index={i} />
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
