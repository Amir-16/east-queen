import { useReducedMotion, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, ChevronDown } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ease } from '@/lib/motion'

const STATS = [
  { n: '42+',  l: 'Years'            },
  { n: '500+', l: 'Vessels Recycled' },
  { n: '500+', l: 'Employees'        },
  { n: '20+',  l: 'Countries'        },
]

const cont  = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }
const item  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.smooth } } }
const wCont = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }
const wAnim = { hidden: { opacity: 0, y: 40, skewY: 4 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.58, ease: ease.smooth } } }

export default function ShipHeroSection() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="East Queen Group — Bangladesh's premier ship recycling enterprise"
    >

      {/* ── Video background ──────────────────────────────────────────────────── */}
      {/* CSS filter boosts perceived sharpness + saturation of compressed video.  */}
      {/* Scale(1.06) eliminates letterbox edges during subtle drift animation.    */}
      <motion.video
        src="/videos/operations/ops-2.mp4"
        poster="/images/operations/facility-1.jpeg"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter:    'brightness(1.10) contrast(1.12) saturate(1.25)',
          transform: 'scale(1.06)',
        }}
        animate={reduced ? undefined : {
          scale: [1.06, 1.10, 1.06],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* ── Overlay layer 1 — top/bottom depth vignette ───────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,rgba(4,12,26,.40) 0%,transparent 22%,transparent 62%,rgba(4,12,26,.88) 100%)' }}
      />

      {/* ── Overlay layer 2 — left reading panel (lets video breathe right side) ─ */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(100deg,rgba(4,10,24,.88) 0%,rgba(4,10,24,.75) 28%,rgba(4,10,24,.42) 50%,rgba(4,10,24,.12) 66%,transparent 80%)' }}
      />

      {/* ── Main content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full
                      px-4 sm:px-6 lg:px-8 pt-24 pb-28">
        <motion.div
          className="w-full lg:w-[56%] xl:w-[50%]"
          variants={cont}
          initial="hidden"
          animate="visible"
        >

          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-8 bg-gold-500 rounded-full shrink-0" />
            <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">
              Ship Recycling & Industrial Group · Est. 1982
            </span>
          </motion.div>

          {/* ── Brand name headline — clean two-word layout ── */}
          <motion.h1
            className="font-playfair font-bold leading-[1.04] mb-3"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            variants={wCont}
          >
            {/* Line 1 */}
            <span className="block">
              {['East', 'Queen'].map((w, i) => (
                <motion.span key={i} variants={wAnim} className="inline-block mr-[0.18em] text-white">
                  {w}
                </motion.span>
              ))}
            </span>
            {/* Line 2 — brand name + descriptor in gold */}
            <span className="block">
              {['Group'].map((w, i) => (
                <motion.span key={i} variants={wAnim} className="inline-block mr-[0.18em] text-gold-500">
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Descriptor — replaces the old 5-word cramped sub-headline */}
          <motion.p
            variants={item}
            className="text-white/60 text-sm sm:text-base font-semibold uppercase
                       tracking-[0.18em] mb-6 max-w-[420px]"
          >
            Bangladesh's Premier Ship Recycling Enterprise
          </motion.p>

          {/* Body */}
          <motion.p
            variants={item}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-9 max-w-[490px]"
          >
            Four decades of safe, sustainable ship breaking at Sitakunda —
            converting end-of-life vessels into high-grade steel that powers
            Bangladesh's construction and manufacturing industries.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            <Link
              to="/ship-breaking"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5
                         bg-gold-500 hover:bg-gold-400 text-white font-bold
                         rounded-lg text-sm tracking-wide transition-all duration-200
                         hover:shadow-gold-glow"
            >
              Our Recycling Yard
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-7 py-3.5
                         bg-white/10 hover:bg-white/18 border border-white/25
                         hover:border-gold-500/60 text-white font-semibold
                         rounded-lg text-sm tracking-wide transition-all duration-200"
            >
              <Phone size={14} />
              Call Us
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 border-t border-white/15"
          >
            {STATS.map(({ n, l }, i) => (
              <div key={l} className="flex items-center gap-5 sm:gap-6">
                <div className="text-center">
                  <span className="block font-mono font-black text-gold-400 text-2xl leading-none">{n}</span>
                  <span className="block text-white/50 text-[9px] uppercase tracking-[0.22em] mt-1">{l}</span>
                </div>
                {i < STATS.length - 1 && (
                  <div className="hidden sm:block h-7 w-px bg-white/12" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── HKC compliance badge ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute z-20 bottom-10 right-6 sm:right-10
                   flex items-center gap-2.5 px-4 py-2.5 rounded-full
                   backdrop-blur-md border border-white/18 bg-black/35
                   text-[11px] font-semibold text-white/78 tracking-wide select-none"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        HKC Certified · ISO Compliant
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-1.5 text-white/45"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.38em]">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
