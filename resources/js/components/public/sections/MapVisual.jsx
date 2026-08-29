import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ease, stagger, fadeUp } from '@/lib/motion'

const PARTNERS = [
  { label: 'China',        sub: 'Steel & Mill Scale',    angle: 20,  flag: '🇨🇳' },
  { label: 'South Korea',  sub: 'Maritime Trade',         angle: 55,  flag: '🇰🇷' },
  { label: 'Japan',        sub: 'Equipment Imports',      angle: 90,  flag: '🇯🇵' },
  { label: 'Oman',         sub: 'Aggregate & Limestone',  angle: 125, flag: '🇴🇲' },
  { label: 'UAE',          sub: 'Food & Seafood',         angle: 158, flag: '🇦🇪' },
  { label: 'India',        sub: 'Commodity Trade',        angle: 202, flag: '🇮🇳' },
  { label: 'Malaysia',     sub: 'Raw Materials',          angle: 238, flag: '🇲🇾' },
  { label: 'Indonesia',    sub: 'Coal Imports',           angle: 272, flag: '🇮🇩' },
  { label: 'South Africa', sub: 'Coal & Scrap',           angle: 308, flag: '🇿🇦' },
  { label: 'Germany',      sub: 'HMS Steel Scrap',        angle: 345, flag: '🇩🇪' },
]

const STATS = [
  { value: '20+', label: 'Countries' },
  { value: '42',  label: 'Years Active' },
  { value: '6',   label: 'Business Sectors' },
  { value: '500+', label: 'Trade Partners' },
]

function polar(angle, r) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: 250 + r * Math.cos(rad), y: 250 + r * Math.sin(rad) }
}

export default function MapVisual() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#07101f' }}
    >
      {/* Background textures */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none" />
      <div
        className="absolute -top-48 right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(226,31,47,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative section-container">
        {/* ── Two-column hero layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">

          {/* Left: copy + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: ease.smooth }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: '#F59E0B' }}>
                Global Reach
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-playfair font-bold text-white leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
            >
              Trading Across{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                20+ Countries
              </span>
            </h2>

            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-md">
              From coal imports in South Africa to seafood exports to the Middle East,
              East Queen Group operates an integrated trade network spanning Asia, the Middle East,
              and Europe.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-5">
              {STATS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border p-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <p
                    className="font-playfair font-bold text-2xl mb-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {value}
                  </p>
                  <p className="text-white/35 text-[10px] uppercase tracking-widest">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: SVG hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: ease.smooth }}
            className="flex justify-center lg:justify-end"
            aria-hidden
          >
            <svg viewBox="0 0 500 500" className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]">
              <defs>
                <radialGradient id="mgHubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
                  <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="mgCyanField" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.09" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>
                <filter id="mgGlow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient fields */}
              <circle cx="250" cy="250" r="240" fill="url(#mgCyanField)" />
              <circle cx="250" cy="250" r="170" fill="url(#mgHubGlow)" />

              {/* Rotating orbit rings */}
              <motion.circle
                cx="250" cy="250" r="208"
                fill="none" stroke="rgba(6,182,212,0.14)" strokeWidth="1" strokeDasharray="2 9"
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              <motion.circle
                cx="250" cy="250" r="158"
                fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5 7"
                animate={{ rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              <motion.circle
                cx="250" cy="250" r="98"
                fill="none" stroke="rgba(251,191,36,0.10)" strokeWidth="1" strokeDasharray="3 6"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />

              {/* Spoke lines (static, low-opacity white) */}
              {PARTNERS.map(({ label, angle }, i) => {
                const end = polar(angle, 198)
                return (
                  <motion.path
                    key={`spoke-${label}`}
                    d={`M 250 250 L ${end.x} ${end.y}`}
                    stroke="rgba(255,255,255,0.09)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.7, ease: ease.smooth }}
                  />
                )
              })}

              {/* Traveling amber particles along spokes */}
              {PARTNERS.map(({ label, angle }, i) => {
                const end = polar(angle, 198)
                return (
                  <motion.circle
                    key={`travel-${label}`}
                    r={2.8}
                    fill="#FCD34D"
                    filter="url(#mgGlow)"
                    initial={{ cx: 250, cy: 250, opacity: 0 }}
                    animate={inView ? {
                      cx: [250, end.x, end.x],
                      cy: [250, end.y, end.y],
                      opacity: [0, 1, 0],
                    } : {}}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatDelay: 2.2 + (i % 4) * 0.4,
                      delay: 1.2 + i * 0.32,
                      ease: 'easeIn',
                      times: [0, 0.75, 1],
                    }}
                  />
                )
              })}

              {/* Partner node dots */}
              {PARTNERS.map(({ label, angle }, i) => {
                const pos = polar(angle, 203)
                return (
                  <g key={`node-${label}`}>
                    {/* Soft cyan halo */}
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={8}
                      fill="rgba(6,182,212,0.10)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.75 + i * 0.07, type: 'spring', stiffness: 200 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                    {/* White dot */}
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={4}
                      fill="white" fillOpacity={0.88}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.75 + i * 0.07, type: 'spring', stiffness: 250 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                    {/* Cyan pulse ring */}
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={4}
                      fill="none" stroke="#22d3ee" strokeWidth="1.5"
                      initial={{ opacity: 0 }}
                      animate={inView ? { r: [4, 14], opacity: [0.55, 0] } : {}}
                      transition={{
                        delay: 2 + (i * 0.28) % 2.8,
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 2.8,
                        ease: 'easeOut',
                      }}
                    />
                  </g>
                )
              })}

              {/* Bangladesh hub — center */}
              {/* Outermost soft ring */}
              <circle cx="250" cy="250" r="70" fill="rgba(226,31,47,0.05)" stroke="rgba(226,31,47,0.10)" strokeWidth="1" />
              {/* Middle ring */}
              <circle cx="250" cy="250" r="48" fill="rgba(226,31,47,0.10)" stroke="rgba(226,31,47,0.25)" strokeWidth="1.5" />
              {/* Inner ring */}
              <circle cx="250" cy="250" r="32" fill="rgba(226,31,47,0.18)" stroke="rgba(226,31,47,0.45)" strokeWidth="1.5" />
              {/* Core */}
              <circle cx="250" cy="250" r="22" fill="#E21F2F" />
              {/* BD label */}
              <text x="250" y="247" textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="8.5" fontWeight="800" fontFamily="monospace" letterSpacing="1.5">
                BD
              </text>
              <text x="250" y="280" textAnchor="middle"
                fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="sans-serif" letterSpacing="3">
                BANGLADESH
              </text>

              {/* Hub pulse animation */}
              <motion.circle
                cx="250" cy="250" r={22}
                fill="none" stroke="#E21F2F" strokeWidth="2"
                animate={inView ? { r: [22, 55], opacity: [0.65, 0] } : {}}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, ease: 'easeOut', delay: 1.5 }}
              />
              {/* Second pulse — offset */}
              <motion.circle
                cx="250" cy="250" r={22}
                fill="none" stroke="#f59e0b" strokeWidth="1.5"
                animate={inView ? { r: [22, 42], opacity: [0.4, 0] } : {}}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeOut', delay: 2.2 }}
              />
            </svg>
          </motion.div>
        </div>

        {/* ── Country chips — full-width flex row ── */}
        <div
          className="pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-wrap gap-2.5"
          >
            {PARTNERS.map(({ label, sub, flag }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.18 } }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:border-amber-400/30 hover:bg-amber-400/[0.06] cursor-default transition-colors duration-200"
              >
                <span className="text-xl leading-none shrink-0">{flag}</span>
                <div>
                  <p className="text-white/80 text-sm font-semibold leading-none">{label}</p>
                  <p className="text-white/30 text-[10px] mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
