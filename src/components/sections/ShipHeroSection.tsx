import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ease } from '@/lib/motion'

// ── Deterministic star positions (golden-ratio distribution, no re-render jitter)
const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.381) % 56,
  size: i % 5 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7,
  delay: (i * 0.37) % 6,
  duration: 2.5 + (i % 5) * 0.6,
  opacity: i % 4 === 0 ? 0.9 : i % 3 === 0 ? 0.7 : 0.5,
}))

// ── Smoke particles rising from funnel
const SMOKE = [
  { id: 0, cx: 568, delay: 0,    driftX: 6  },
  { id: 1, cx: 572, delay: 1.4,  driftX: 14 },
  { id: 2, cx: 564, delay: 2.8,  driftX: 3  },
  { id: 3, cx: 570, delay: 4.2,  driftX: 10 },
]

// ── Wave layer configurations (back → front)
const WAVE_LAYERS = [
  { yOffset: 0,  fill: '#0a2240', opacity: 0.55, speed: 30 },
  { yOffset: 10, fill: '#0d2a50', opacity: 0.70, speed: 21 },
  { yOffset: 22, fill: '#0a1e3a', opacity: 0.85, speed: 14 },
  { yOffset: 34, fill: '#071628', opacity: 1.00, speed: 9  },
]

// ── Container colours for the cargo deck
const CONTAINER_COLORS = [
  ['#1a5276', '#1F618D'],
  ['#7B241C', '#922B21'],
  ['#1A6B3C', '#1E8449'],
  ['#5E2D91', '#7D3CC8'],
]

// ── Stat pills shown in the text column
const STATS = [
  { n: '42+',  l: 'Years'     },
  { n: '6',    l: 'Companies' },
  { n: '500+', l: 'Employees' },
  { n: '20+',  l: 'Countries' },
]

// ─────────────────────────────────────────────────────────────
// Crane SVG sub-element
// ─────────────────────────────────────────────────────────────
function Crane({ x, deckY }: { x: number; deckY: number }) {
  return (
    <g>
      <line x1={x}    y1={deckY}      x2={x}      y2={deckY - 55} stroke="#1e2848" strokeWidth={3} strokeLinecap="round"/>
      <line x1={x}    y1={deckY - 55} x2={x + 48} y2={deckY - 38} stroke="#1e2848" strokeWidth={2} strokeLinecap="round"/>
      <line x1={x}    y1={deckY - 55} x2={x + 48} y2={deckY - 55} stroke="#1e2848" strokeWidth={1.5}/>
      <line x1={x+38} y1={deckY - 43} x2={x + 38} y2={deckY - 20} stroke="#141e35" strokeWidth={1} strokeDasharray="3,3"/>
    </g>
  )
}

// ─────────────────────────────────────────────────────────────
// Animated wave layer
// ─────────────────────────────────────────────────────────────
function WaveLayer({
  yOffset, fill, opacity, speed, reduced, height,
}: {
  yOffset: number; fill: string; opacity: number
  speed: number; reduced: boolean | null; height: number
}) {
  // Single tile wave path (viewBox 0 0 1440 100)
  const d = [
    `M0,${yOffset + 16}`,
    `Q120,${yOffset} 240,${yOffset + 20}`,
    `Q360,${yOffset + 38} 480,${yOffset + 18}`,
    `Q600,${yOffset + 2} 720,${yOffset + 22}`,
    `Q840,${yOffset + 40} 960,${yOffset + 18}`,
    `Q1080,${yOffset} 1200,${yOffset + 20}`,
    `Q1320,${yOffset + 36} 1440,${yOffset + 16}`,
    `L1440,100 L0,100 Z`,
  ].join(' ')

  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden"
      style={{ height, opacity }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-full"
        style={{ width: '200%' }}
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {/* Tile 1 */}
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full"
          style={{ width: '50%' }}
        >
          <path d={d} fill={fill} />
        </svg>
        {/* Tile 2 — identical, for seamless loop */}
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full"
          style={{ width: '50%', left: '50%' }}
        >
          <path d={d} fill={fill} />
        </svg>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Ship SVG
// ─────────────────────────────────────────────────────────────
function ShipSVG({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.div
      className="relative w-full select-none"
      animate={
        reduced
          ? undefined
          : {
              y: [0, -10, 0, -6, 0],
              rotate: [0, 0.5, 0, -0.5, 0],
            }
      }
      transition={{
        y:      { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg
        viewBox="0 0 820 260"
        className="w-full max-w-[700px] mx-auto lg:mx-0"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))' }}
      >
        {/* ── HULL (above waterline) ── */}
        <path
          d="M 38,188 L 84,140 L 722,140 L 748,188 Q 393,214 38,188 Z"
          fill="#141b35"
        />
        {/* Hull highlight (top edge rim) */}
        <path
          d="M 84,140 L 722,140"
          stroke="#1e2848"
          strokeWidth={2}
          fill="none"
        />

        {/* ── HULL (below waterline — darker) ── */}
        <path
          d="M 38,188 Q 393,206 748,188 L 748,206 Q 393,224 38,206 Z"
          fill="#0e1428"
        />

        {/* ── WATERLINE STRIPE (brand red) ── */}
        <path
          d="M 44,197 Q 393,213 742,197"
          stroke="#E21F2F"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />

        {/* ── FORECASTLE (raised bow deck) ── */}
        <path
          d="M 84,140 L 84,112 L 202,112 L 202,140 Z"
          fill="#1a2240"
        />
        <path d="M 84,112 L 202,112" stroke="#242e54" strokeWidth={1.5} />
        {/* Mooring bollards */}
        <rect x={108} y={123} width={12} height={9} rx={2} fill="#212844" />
        <rect x={130} y={123} width={12} height={9} rx={2} fill="#212844" />
        {/* Anchor hawse pipe */}
        <circle cx={90} cy={130} r={5} fill="#0f1528" stroke="#1e2848" strokeWidth={1.5} />

        {/* ── MAIN DECK ── */}
        <rect x={202} y={132} width={340} height={8} rx={0} fill="#141e38" />

        {/* ── CARGO HATCHES ── */}
        {[208, 289, 370, 451].map((x, i) => (
          <g key={i}>
            <rect x={x}    y={132} width={68} height={8}  rx={1} fill="#1c2646" />
            <line x1={x+10} y1={132} x2={x+10} y2={140} stroke="#232e56" strokeWidth={1} />
            <line x1={x+24} y1={132} x2={x+24} y2={140} stroke="#232e56" strokeWidth={1} />
            <line x1={x+52} y1={132} x2={x+52} y2={140} stroke="#232e56" strokeWidth={1} />
          </g>
        ))}

        {/* ── CONTAINERS — bottom row ── */}
        {CONTAINER_COLORS.map(([dark], i) => {
          const x = 212 + i * 80
          return (
            <g key={i}>
              <rect x={x} y={112} width={66} height={20} rx={2} fill={dark} />
              <rect x={x} y={112} width={66} height={4}  rx={2} fill={`${dark}88`} />
              <line x1={x+22} y1={112} x2={x+22} y2={132} stroke={`${dark}66`} strokeWidth={1} />
              <line x1={x+44} y1={112} x2={x+44} y2={132} stroke={`${dark}66`} strokeWidth={1} />
            </g>
          )
        })}

        {/* ── CONTAINERS — top row (offset/shorter) ── */}
        {CONTAINER_COLORS.map(([, light], i) => {
          const x = 222 + i * 80
          return (
            <g key={i}>
              <rect x={x} y={93} width={56} height={19} rx={2} fill={light} />
              <line x1={x+19} y1={93} x2={x+19} y2={112} stroke={`${light}55`} strokeWidth={1} />
              <line x1={x+38} y1={93} x2={x+38} y2={112} stroke={`${light}55`} strokeWidth={1} />
            </g>
          )
        })}

        {/* ── CRANES ── */}
        <Crane x={252} deckY={132} />
        <Crane x={420} deckY={132} />

        {/* ── SUPERSTRUCTURE (aft / rear section) ── */}
        <rect x={553} y={55}  width={181} height={85} rx={3} fill="#1a2040" />
        {/* Horizontal deck dividers */}
        <line x1={553} y1={88}  x2={734} y2={88}  stroke="#222a4a" strokeWidth={1} />
        <line x1={553} y1={108} x2={734} y2={108} stroke="#222a4a" strokeWidth={1} />
        {/* Lower deck windows */}
        {[562, 580, 598, 616, 634, 652, 670, 688, 706].map(x => (
          <rect key={x} x={x} y={111} width={10} height={7} rx={1} fill="#2a9fd6" opacity={0.7} />
        ))}
        {/* Mid deck windows */}
        {[562, 580, 598, 616, 634, 652, 670, 688, 706].map(x => (
          <rect key={x} x={x} y={92} width={10} height={7} rx={1} fill="#2a9fd6" opacity={0.8} />
        ))}
        {/* Upper deck windows */}
        {[562, 580, 598, 616, 634, 652, 670, 688, 706].map(x => (
          <rect key={x} x={x} y={60} width={10} height={8} rx={1} fill="#2a9fd6" opacity={0.65} />
        ))}

        {/* ── NAVIGATION BRIDGE ── */}
        <rect x={616} y={35} width={118} height={30} rx={2} fill="#1e2545" />
        {/* Full-width panoramic bridge windows */}
        {[624, 642, 660, 678, 696, 714].map(x => (
          <rect key={x} x={x} y={41} width={12} height={12} rx={1} fill="#7ed6f7" opacity={0.88} />
        ))}
        {/* Window glow (animated) */}
        <motion.rect
          x={616} y={35} width={118} height={30}
          fill="#6ec6f0"
          opacity={0}
          animate={{ opacity: [0, 0.06, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── FUNNEL ── */}
        <rect x={572} y={14} width={32} height={50} rx={4} fill="#141c38" />
        {/* Brand red top ring */}
        <rect x={572} y={14} width={32} height={10} rx={4} fill="#E21F2F" />
        {/* Funnel depth shadow */}
        <rect x={572} y={24} width={9}  height={40} rx={0} fill="#0a1020" opacity={0.45} />

        {/* ── RADAR MAST ── */}
        <line x1={694} y1={35} x2={694} y2={4}  stroke="#252e54" strokeWidth={2} />
        <line x1={678} y1={10} x2={710} y2={10} stroke="#252e54" strokeWidth={1.5} />
        <line x1={685} y1={15} x2={703} y2={15} stroke="#252e54" strokeWidth={1.5} />
        <ellipse cx={694} cy={4} rx={9} ry={3.5} fill="#1e2848" stroke="#2a3460" strokeWidth={1} />

        {/* ── SMOKE (animated) ── */}
        {SMOKE.map(({ id, cx, delay, driftX }) => (
          <motion.circle
            key={id}
            cx={cx}
            cy={14}
            r={4}
            fill="#7a8fa8"
            initial={{ cy: 14, r: 4, opacity: 0 }}
            animate={{
              cy:      [14, -8,  -34],
              r:       [4,  10,  18 ],
              opacity: [0,  0.28, 0 ],
              cx:      [cx, cx + driftX * 0.5, cx + driftX],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* ── NAVIGATION LIGHTS ── */}
        {/* Port (red) */}
        <motion.circle
          cx={84} cy={120} r={3.5} fill="#E21F2F"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Masthead (white) */}
        <motion.circle
          cx={694} cy={4} r={2.5} fill="#ffffff"
          animate={{ opacity: [0.9, 0.4, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Stern (white) */}
        <motion.circle
          cx={748} cy={128} r={2} fill="#ffffffcc"
          animate={{ opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── BOW WAVE FOAM ── */}
        <path
          d="M 38,195 Q 58,185 80,194 Q 58,202 38,195 Z"
          fill="#cee8f8"
          opacity={0.18}
        />

        {/* ── HULL WATER REFLECTION ── */}
        <path
          d="M 55,206 Q 393,222 730,206 L 715,240 Q 393,256 68,240 Z"
          fill="#0a1525"
          opacity={0.3}
        />
      </svg>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Text content animations
// ─────────────────────────────────────────────────────────────
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.smooth } },
}

const wordVariants = {
  hidden:  { opacity: 0, y: 32, skewY: 3  },
  visible: { opacity: 1, y: 0,  skewY: 0, transition: { duration: 0.55, ease: ease.smooth } },
}

const wordContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
export default function ShipHeroSection() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060b16 0%, #0a1322 35%, #0c1b30 65%, #0a1e36 100%)',
      }}
    >
      {/* ── STARS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {!reduced && STARS.map(({ id, x, y, size, delay, duration, opacity }) => (
          <motion.div
            key={id}
            className="absolute rounded-full bg-white"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, opacity, opacity * 0.4, opacity] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── HORIZON GLOW ── */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          bottom: '36%',
          left: 0,
          right: 0,
          height: '160px',
          background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(14,45,80,0.55) 0%, transparent 100%)',
        }}
      />

      {/* ── MOON GLOW (top-right) ── */}
      <div
        className="absolute top-[6%] right-[8%] z-0 pointer-events-none"
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,220,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[7%] right-[9%] z-0 pointer-events-none rounded-full"
        style={{
          width: 28,
          height: 28,
          background: 'radial-gradient(circle, rgba(220,235,255,0.5) 0%, rgba(180,210,255,0.2) 60%, transparent 100%)',
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-end lg:items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-0">
        <div className="w-full flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0">

          {/* Left column — text */}
          <motion.div
            className="lg:w-[46%] lg:pr-8 pb-12 lg:pb-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-gold-500 rounded-full" />
              <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Est. 1982 · Chittagong, Bangladesh
              </span>
            </motion.div>

            {/* Headline line 1 */}
            <motion.h1
              className="font-playfair font-bold text-display text-white leading-[1.06] mb-1"
              variants={wordContainerVariants}
            >
              {'Where Ships'.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.2em]">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Headline line 2 — last word in brand red */}
            <motion.h1
              className="font-playfair font-bold text-display leading-[1.06] mb-8"
              variants={wordContainerVariants}
            >
              {['Meet', 'the', 'World'].map((word, i, arr) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`inline-block mr-[0.2em] ${i === arr.length - 1 ? 'text-gold-500' : 'text-white'}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-[480px]"
            >
              Four decades of maritime excellence — ship breaking, LPG energy,
              fisheries, and international commodity trade from the shores of Chittagong.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                to="/companies"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5
                           bg-gold-500 hover:bg-gold-400 text-white
                           font-bold rounded-lg text-sm tracking-wide
                           transition-all duration-200 hover:shadow-gold-glow"
              >
                Our Portfolio
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-7 py-3.5
                           bg-white/8 hover:bg-white/15 border border-white/20
                           hover:border-gold-500/50 text-white font-semibold
                           rounded-lg text-sm tracking-wide transition-all duration-200"
              >
                <Phone size={14} />
                Call Us
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-6 border-t border-white/10"
            >
              {STATS.map(({ n, l }) => (
                <div key={l} className="text-center">
                  <p className="font-mono font-bold text-gold-400 text-2xl leading-none">{n}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mt-1">{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — ship (desktop: aligned to water; mobile: below text) */}
          <motion.div
            className="lg:w-[54%] flex items-end justify-center lg:justify-end"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: ease.smooth }}
          >
            <ShipSVG reduced={reduced} />
          </motion.div>
        </div>
      </div>

      {/* ── WATER / WAVE SECTION ── */}
      <div className="relative w-full z-10" style={{ height: '36vh', minHeight: 180 }}>
        {WAVE_LAYERS.map((layer, i) => (
          <WaveLayer key={i} {...layer} reduced={reduced} height={36 * 1.4 + i * 8} />
        ))}

        {/* Deep water fill below all waves */}
        <div
          className="absolute inset-0 bottom-0"
          style={{ background: '#04111e', zIndex: -1 }}
        />

        {/* Subtle water surface shimmer */}
        {!reduced && (
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: 24,
              height: 2,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* ── SCROLL CUE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-[37vh] left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-1.5 text-white/40"
      >
        <span className="text-[9px] uppercase tracking-[0.35em]">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
