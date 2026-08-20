import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, ChevronDown } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ease } from '@/lib/motion'

const STATS = [
  { n: '42+',  l: 'Years'           },
  { n: '500+', l: 'Vessels Recycled' },
  { n: '500+', l: 'Employees'       },
  { n: '20+',  l: 'Countries'       },
]

const txtCont = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }
const txtItem = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.smooth } } }
const wrdCont = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } } }
const wrdAnim = { hidden: { opacity: 0, y: 38, skewY: 5 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.55, ease: ease.smooth } } }

export default function ShipHeroSection() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="East Queen Group — Bangladesh's premier ship recycling enterprise"
    >

      {/* ── Video background ──────────────────────────────────────────────────── */}
      <video
        src="/videos/operations/ops-2.mp4"
        poster="/images/operations/facility-1.jpeg"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      {/* ── Overlays ──────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: 'linear-gradient(180deg,rgba(5,14,30,.32) 0%,rgba(5,14,30,.06) 28%,rgba(5,14,30,.18) 60%,rgba(4,12,26,.95) 100%)' }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
           style={{ background: 'linear-gradient(105deg,rgba(4,10,24,.96) 0%,rgba(4,10,24,.88) 24%,rgba(4,10,24,.54) 46%,rgba(4,10,24,.16) 62%,transparent 78%)' }} />

      {/* ── Main content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-28">
        <motion.div
          className="w-full lg:w-[54%] xl:w-[48%]"
          variants={txtCont}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={txtItem} className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-gold-500 rounded-full shrink-0" />
            <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">
              Est. 1982 · Sitakunda, Chittagong
            </span>
          </motion.div>

          {/* Headline — two lines, last word in gold */}
          <motion.h1
            className="font-playfair font-bold text-display text-white leading-[1.06] mb-1"
            variants={wrdCont}
          >
            {["Bangladesh's", 'Premier'].map((w, i) => (
              <motion.span key={i} variants={wrdAnim} className="inline-block mr-[0.22em]">{w}</motion.span>
            ))}
          </motion.h1>

          <motion.h1
            className="font-playfair font-bold text-display leading-[1.06] mb-8"
            variants={wrdCont}
          >
            {['Ship', 'Recycling', 'Group'].map((w, i, arr) => (
              <motion.span
                key={i}
                variants={wrdAnim}
                className={`inline-block mr-[0.22em] ${i === arr.length - 1 ? 'text-gold-500' : 'text-white'}`}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={txtItem}
            className="text-white/68 text-base sm:text-lg leading-relaxed mb-9 max-w-[490px]"
          >
            Four decades of safe, sustainable ship breaking at Sitakunda —
            converting end-of-life vessels into high-grade steel that powers
            Bangladesh's construction and manufacturing industries.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={txtItem} className="flex flex-wrap gap-3 mb-10">
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
          <motion.div variants={txtItem} className="flex flex-wrap gap-6 pt-6 border-t border-white/12">
            {STATS.map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center">
                <span className="font-mono font-bold text-gold-400 text-[1.65rem] leading-none">{n}</span>
                <span className="text-white/48 text-[10px] uppercase tracking-[0.22em] mt-1">{l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Compliance badge — bottom right ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute z-20 bottom-8 right-6 sm:right-10
                   flex items-center gap-2.5 px-4 py-2.5 rounded-full
                   backdrop-blur-md border border-white/18 bg-black/30
                   text-[11px] font-semibold text-white/72 tracking-wide select-none"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        HKC Certified · ISO Compliant
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-1.5 text-white/38"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.38em]">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
