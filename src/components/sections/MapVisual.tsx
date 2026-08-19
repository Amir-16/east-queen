import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ease, stagger, fadeUp } from '@/lib/motion'

/* Trading partner coordinates on a 500×500 SVG canvas */
const partners: { label: string; sub: string; angle: number }[] = [
  { label: 'China',        sub: 'Steel & Mill Scale',     angle: 28  },
  { label: 'South Korea',  sub: 'Maritime Trade',          angle: 58  },
  { label: 'Japan',        sub: 'Equipment Imports',       angle: 90  },
  { label: 'Oman',         sub: 'Aggregate & Limestone',   angle: 128 },
  { label: 'UAE',          sub: 'Food & Seafood Exports',  angle: 160 },
  { label: 'India',        sub: 'Commodity Trade',         angle: 202 },
  { label: 'Malaysia',     sub: 'Raw Materials',           angle: 238 },
  { label: 'Indonesia',    sub: 'Coal Imports',            angle: 270 },
  { label: 'South Africa', sub: 'Coal & Scrap',            angle: 305 },
  { label: 'Germany',      sub: 'HMS Steel Scrap',         angle: 340 },
]

function polar(angle: number, r: number): { x: number; y: number } {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: 250 + r * Math.cos(rad), y: 250 + r * Math.sin(rad) }
}

export default function MapVisual() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: ease.smooth }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[2px] w-10 bg-gold-500 rounded-full" />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Global Reach
              </span>
            </div>

            <h2 className="font-playfair font-bold text-h1 text-white leading-tight mb-6">
              Trading Across{' '}
              <span className="text-gradient-gold">20+ Countries</span>
            </h2>

            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              From coal imports in South Africa to seafood exports to the Middle East, East Queen
              Group operates an integrated trade network spanning Asia, the Middle East, and Europe.
            </p>

            {/* Partner chips */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2"
            >
              {partners.map(({ label, sub }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="group px-3 py-2 rounded-xl border border-white/10
                             hover:border-gold-500/35 transition-colors duration-200 cursor-default"
                >
                  <p className="text-white/70 text-xs font-semibold group-hover:text-gold-400 transition-colors duration-200">
                    {label}
                  </p>
                  <p className="text-white/30 text-[10px] leading-tight mt-0.5">{sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — radial hub SVG ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: ease.smooth }}
            className="flex justify-center"
            aria-hidden
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full max-w-[420px]"
            >
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E21F2F" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#E21F2F" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ambient glow */}
              <circle cx="250" cy="250" r="230" fill="url(#mapGlow)" />

              {/* Orbit rings */}
              {[90, 155, 205].map((r) => (
                <circle
                  key={r}
                  cx="250"
                  cy="250"
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />
              ))}

              {/* Animated spoke lines from Bangladesh → each partner */}
              {partners.map(({ label, angle }, i) => {
                const end = polar(angle, 190)
                return (
                  <motion.path
                    key={label}
                    d={`M 250 250 L ${end.x} ${end.y}`}
                    stroke="#E21F2F"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="4 5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.75, ease: ease.smooth }}
                  />
                )
              })}

              {/* Partner dots */}
              {partners.map(({ label, angle }, i) => {
                const pos = polar(angle, 195)
                return (
                  <g key={label}>
                    {/* Static dot */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={4}
                      fill="#E21F2F"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.65 + i * 0.07, duration: 0.35 }}
                    />
                    {/* Pulse ring */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={4}
                      fill="none"
                      stroke="#E21F2F"
                      strokeWidth="1.5"
                      initial={{ opacity: 0 }}
                      animate={inView ? {
                        r: [4, 13],
                        opacity: [0.6, 0],
                      } : { opacity: 0 }}
                      transition={{
                        delay: 1.4 + (i * 0.22) % 2,
                        duration: 1.4,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: 'easeOut',
                      }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                  </g>
                )
              })}

              {/* ── Bangladesh hub — center ── */}
              {/* Outer glow rings */}
              <circle cx="250" cy="250" r="58"  fill="rgba(226,31,47,0.06)" stroke="#E21F2F" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="250" cy="250" r="38"  fill="rgba(226,31,47,0.10)" stroke="#E21F2F" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Core dot */}
              <circle cx="250" cy="250" r="22"  fill="#E21F2F" />
              {/* BD label */}
              <text
                x="250" y="247"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="9"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="1"
              >BD</text>
              <text
                x="250" y="278"
                textAnchor="middle"
                fill="rgba(255,255,255,0.28)"
                fontSize="6.5"
                fontFamily="Inter, sans-serif"
                letterSpacing="2"
              >BANGLADESH</text>

              {/* Pulsing hub animation */}
              <motion.circle
                cx="250"
                cy="250"
                r={22}
                fill="none"
                stroke="#E21F2F"
                strokeWidth="2"
                animate={inView ? { r: [22, 48], opacity: [0.5, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeOut', delay: 1 }}
              />
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
