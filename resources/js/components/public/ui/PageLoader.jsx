import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { router } from '@inertiajs/react'

// ── Geometry ────────────────────────────────────────────────────────────────
const CX = 80
const CY = 80
const R1 = 64   // outer ring radius
const R2 = 48   // middle ring radius
const R3 = 33   // inner ring radius

const circ = (r) => +(2 * Math.PI * r).toFixed(2)
const C1 = circ(R1)   // ≈ 402.12
const C2 = circ(R2)   // ≈ 301.59
const C3 = circ(R3)   // ≈ 207.35

// Arc lengths: comet head is 72 / 52 / 42 % of the ring
const arc1 = `${(C1 * 0.72).toFixed(1)} ${(C1 * 0.28).toFixed(1)}`
const arc2 = `${(C2 * 0.52).toFixed(1)} ${(C2 * 0.48).toFixed(1)}`
const arc3 = `${(C3 * 0.42).toFixed(1)} ${(C3 * 0.58).toFixed(1)}`

// Leading-dot positions: 3-o'clock (start of stroke-dasharray) before rotation
const DOT1 = { cx: CX + R1, cy: CY }   // (144, 80)
const DOT2 = { cx: CX + R2, cy: CY }   // (128, 80)
const DOT3 = { cx: CX + R3, cy: CY }   // (113, 80)

// ── Spring ease shared by entry / exit ──────────────────────────────────────
const SPRING = { type: 'spring', stiffness: 220, damping: 22 }

export default function PageLoader() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const offStart  = router.on('start',  () => setLoading(true))
    const offFinish = router.on('finish', () => setLoading(false))
    return () => { offStart(); offFinish() }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ backgroundColor: 'rgba(253,252,248,0.97)', backdropFilter: 'blur(14px)' }}
        >
          {/* ── Spinner container — spring pop-in ─────────────────────────── */}
          <motion.div
            initial={{ scale: 0.62, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{    scale: 0.84, opacity: 0 }}
            transition={SPRING}
            className="relative"
            style={{ width: 160, height: 160 }}
          >
            {/* Ambient radial halo behind rings */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(226,31,47,0.08) 0%, rgba(77,72,144,0.04) 55%, transparent 80%)',
              }}
            />

            {/* ── SVG spinner ───────────────────────────────────────────────── */}
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="absolute inset-0"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Glow filters — separate ids to avoid global collision */}
                <filter id="pl-gr" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="pl-gp" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="pl-gi" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Faint track guides */}
              <circle cx={CX} cy={CY} r={R1} fill="none" stroke="rgba(226,31,47,0.13)"   strokeWidth="1.5" />
              <circle cx={CX} cy={CY} r={R2} fill="none" stroke="rgba(123,117,196,0.13)" strokeWidth="1.5" />
              <circle cx={CX} cy={CY} r={R3} fill="none" stroke="rgba(247,97,105,0.10)"  strokeWidth="1"   />

              {/* ── Outer arc + comet dot — CW 1.4 s ──────────────────────── */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <circle
                  cx={CX} cy={CY} r={R1}
                  fill="none" stroke="#E21F2F"
                  strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={arc1}
                />
                <circle {...DOT1} r={5.5} fill="#E21F2F" filter="url(#pl-gr)" />
                {/* secondary soft halo dot */}
                <circle {...DOT1} r={9}   fill="rgba(226,31,47,0.15)" />
              </motion.g>

              {/* ── Middle arc + comet dot — CCW 1.9 s ────────────────────── */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <circle
                  cx={CX} cy={CY} r={R2}
                  fill="none" stroke="#7B75C4"
                  strokeWidth="2" strokeLinecap="round"
                  strokeDasharray={arc2}
                />
                <circle {...DOT2} r={4} fill="#7B75C4" filter="url(#pl-gp)" />
                <circle {...DOT2} r={7} fill="rgba(123,117,196,0.18)" />
              </motion.g>

              {/* ── Inner arc + comet dot — CW 2.6 s ──────────────────────── */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <circle
                  cx={CX} cy={CY} r={R3}
                  fill="none" stroke="#F76169"
                  strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray={arc3}
                />
                <circle {...DOT3} r={3} fill="#F76169" filter="url(#pl-gi)" />
                <circle {...DOT3} r={5.5} fill="rgba(247,97,105,0.2)" />
              </motion.g>
            </svg>

            {/* ── Logo — centered breathe + red drop-shadow glow ────────────── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.img
                src="/images/brand/logo.svg"
                alt=""
                animate={{ scale: [1, 1.1, 1], opacity: [0.82, 1, 0.82] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 42,
                  height: 42,
                  objectFit: 'contain',
                  filter:
                    'drop-shadow(0 2px 8px rgba(226,31,47,0.25)) drop-shadow(0 1px 3px rgba(0,0,0,0.12))',
                }}
              />
            </div>
          </motion.div>

          {/* ── Brand text + staggered dot trail ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: 6  }}
            transition={{ ...SPRING, delay: 0.15 }}
            className="mt-8 flex flex-col items-center gap-2.5"
          >
            {/* Shimmer brand name */}
            <motion.p
              animate={{ opacity: [0.3, 0.65, 0.3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: 9,
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'rgba(22,20,62,0.45)',
              }}
            >
              East Queen Group
            </motion.p>

            {/* Staggered wave dots */}
            <div className="flex items-center gap-[5px]">
              {[
                '#E21F2F',
                'rgba(226,31,47,0.6)',
                '#7B75C4',
                'rgba(123,117,196,0.5)',
              ].map((color, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.12, 1, 0.12], scale: [0.55, 1.15, 0.55] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.19,
                  }}
                  style={{
                    display: 'block',
                    width: i % 2 === 0 ? 5 : 4,
                    height: i % 2 === 0 ? 5 : 4,
                    borderRadius: '50%',
                    backgroundColor: color,
                    boxShadow: i === 0 ? '0 0 6px rgba(226,31,47,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
