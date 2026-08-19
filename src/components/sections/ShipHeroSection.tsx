import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Volume2, VolumeX, ChevronDown, Anchor } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ease } from '@/lib/motion'

// ─── Stats ───────────────────────────────────────────────────
const STATS = [
  { n: '42+',  l: 'Years'     },
  { n: '6',    l: 'Companies' },
  { n: '500+', l: 'Employees' },
  { n: '20+',  l: 'Countries' },
]

// ─── Wave layer config (back → front) ────────────────────────
// Colors sampled from the ocean in the photo (deep Atlantic blue)
const WAVE_LAYERS = [
  { yBase: 72, amp: 10, fill: '#0e3058', opacity: 0.55, speed: 36 },
  { yBase: 60, amp: 14, fill: '#0c2a50', opacity: 0.70, speed: 24 },
  { yBase: 48, amp: 17, fill: '#091f3c', opacity: 0.85, speed: 15 },
  { yBase: 36, amp: 12, fill: '#060f20', opacity: 1.00, speed: 9  },
]

// ─── Build seamless double-tile wave path ────────────────────
// viewBox: 0 0 2880 100, tile width = 1440
function buildWavePath(yBase: number, amp: number): string {
  // 8 half-waves per tile; organic variance per segment
  const HALF = 180
  const segs: string[] = []
  for (let tile = 0; tile < 2; tile++) {
    for (let w = 0; w < 8; w++) {
      const ox  = tile * 1440 + w * HALF
      const cx  = ox + HALF / 2
      const ex  = ox + HALF
      const dir = w % 2 === 0 ? -1 : 1
      const var_ = 1 + ((w * 19 + tile * 37) % 5) * 0.05
      segs.push(`Q${cx},${yBase + dir * amp * var_} ${ex},${yBase}`)
    }
  }
  return `M0,${yBase} ${segs.join(' ')} L2880,100 L0,100 Z`
}

// ─────────────────────────────────────────────────────────────
//  Web Audio — procedural ocean sound (pink noise + LFO)
// ─────────────────────────────────────────────────────────────
function useOceanSound(sectionRef: React.RefObject<HTMLElement>) {
  const ctxRef  = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const [muted,  setMuted]  = useState(true)
  const [booted, setBooted] = useState(false)
  const inView = useInView(sectionRef as React.RefObject<Element>, { amount: 0.3 })

  const boot = useCallback(() => {
    if (ctxRef.current) return
    try {
      const ctx = new AudioContext()
      const sr  = ctx.sampleRate

      // 4-second pink noise buffer (Paul Kellet's algorithm)
      const buf = ctx.createBuffer(2, sr * 4, sr)
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch)
        let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0
        for (let i = 0; i < d.length; i++) {
          const w = Math.random() * 2 - 1
          b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759
          b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856
          b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980
          d[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362) * 0.10
          b6 = w * 0.115926
        }
      }

      const src = ctx.createBufferSource()
      src.buffer = buf; src.loop = true

      // Low-pass removes harsh highs → deep ocean "whoosh"
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'; lp.frequency.value = 680; lp.Q.value = 0.55

      // Band-pass focuses the low wave rumble
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 130; bp.Q.value = 0.38

      // High-shelf boost for subtle surf hiss
      const hs = ctx.createBiquadFilter()
      hs.type = 'highshelf'; hs.frequency.value = 3200; hs.gain.value = -8

      // Slow LFO — wave swell rhythm (~0.1 Hz = 10 s per swell)
      const lfo = ctx.createOscillator()
      lfo.type = 'sine'; lfo.frequency.value = 0.10
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.20

      // Second LFO for variation (slightly different frequency)
      const lfo2 = ctx.createOscillator()
      lfo2.type = 'sine'; lfo2.frequency.value = 0.17
      const lfoG2 = ctx.createGain(); lfoG2.gain.value = 0.10

      // Master gain (starts silent)
      const master = ctx.createGain(); master.gain.value = 0

      lfo.connect(lfoG);   lfoG.connect(master.gain)
      lfo2.connect(lfoG2); lfoG2.connect(master.gain)
      src.connect(lp); src.connect(bp)
      lp.connect(hs); hs.connect(master)
      bp.connect(master)
      master.connect(ctx.destination)

      src.start(); lfo.start(); lfo2.start()
      ctxRef.current  = ctx
      gainRef.current = master
      setBooted(true)
    } catch { /* audio blocked */ }
  }, [])

  // Auto-fade when visible + unmuted
  useEffect(() => {
    const ctx  = ctxRef.current
    const gain = gainRef.current
    if (!ctx || !gain) return
    const t = ctx.currentTime
    if (inView && !muted) {
      ctx.resume().catch(() => {})
      gain.gain.setTargetAtTime(0.52, t, 2.5)
    } else {
      gain.gain.setTargetAtTime(0, t, 1.2)
    }
  }, [inView, muted])

  useEffect(() => () => { ctxRef.current?.close() }, [])

  const toggle = useCallback(() => {
    boot()
    setMuted(prev => {
      const next = !prev
      const ctx  = ctxRef.current
      const gain = gainRef.current
      if (ctx && gain) {
        if (!next) { ctx.resume().catch(() => {}); gain.gain.setTargetAtTime(0.52, ctx.currentTime, 1.5) }
        else        { gain.gain.setTargetAtTime(0, ctx.currentTime, 0.7) }
      }
      return next
    })
  }, [boot])

  return { muted, toggle, booted }
}

// ─────────────────────────────────────────────────────────────
//  Animated ocean wave overlay
// ─────────────────────────────────────────────────────────────
function OceanWaves({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* SVG filter definition — organic water-surface distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="sh-ocean" x="0%" y="0%" width="100%" height="100%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.014 0.05"
                          numOctaves="3" seed="4" result="noise">
              <animate attributeName="baseFrequency"
                values="0.014 0.05;0.019 0.056;0.014 0.05"
                dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise"
                               scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Wave tiles — each 200% wide, translating -50% for infinite loop */}
      <div
        className="absolute inset-0"
        style={{ filter: 'url(#sh-ocean)' }}
      >
        {WAVE_LAYERS.map((layer, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 h-full"
            style={{ width: '200%', opacity: layer.opacity, willChange: 'transform' }}
            animate={reduced ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: layer.speed, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 2880 100" preserveAspectRatio="none" className="w-full h-full">
              <path d={buildWavePath(layer.yBase, layer.amp)} fill={layer.fill} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Foam / whitecap crest on the leading wave */}
      {!reduced && (
        <motion.div
          className="absolute left-0 h-[3px]"
          style={{ bottom: '62%', width: '200%', willChange: 'transform' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 2880 4" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={`M0,2 ${Array.from({ length: 48 }, (_, k) => {
                const x = k * 60
                return `Q${x+15},0 ${x+30},2 Q${x+45},4 ${x+60},2`
              }).join(' ')}`}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.5}
              fill="none"
            />
          </svg>
        </motion.div>
      )}

      {/* Water-surface shimmer */}
      {!reduced && (
        <motion.div
          className="absolute top-[4px] left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.12) 25%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.12) 75%,transparent 100%)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Spray / mist particles at waterline
// ─────────────────────────────────────────────────────────────
const SPRAY = Array.from({ length: 14 }, (_, i) => ({
  id: i, x: 5 + (i * 137.5) % 90, delay: (i * 0.43) % 4, dur: 2.8 + (i % 4) * 0.6, size: 2 + (i % 3),
}))

function SprayParticles({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null
  return (
    <div className="absolute left-0 right-0 pointer-events-none overflow-hidden" style={{ bottom: '30%', height: 60 }}>
      {SPRAY.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ left: `${p.x}%`, bottom: 0, width: p.size, height: p.size }}
          animate={{ y: [-0, -30, -60], opacity: [0, 0.4, 0], x: [0, (p.id % 2 === 0 ? 8 : -8)] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Text animation variants
// ─────────────────────────────────────────────────────────────
const txtContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const txtItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.smooth } },
}
const wordBox = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.55 } },
}
const wordAnim = {
  hidden:  { opacity: 0, y: 40, skewY: 5  },
  visible: { opacity: 1, y: 0,  skewY: 0, transition: { duration: 0.55, ease: ease.smooth } },
}

// ─────────────────────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────────────────────
export default function ShipHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced    = useReducedMotion()
  const { muted, toggle, booted } = useOceanSound(sectionRef)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="Hero — East Queen Group"
    >

      {/* ══════════════════════════════════════════
          SHIP IMAGE — full-bleed background, gently floating
          ══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={reduced ? undefined : {
          y:     [0, -14, 0, -8, 0],
          scale: [1, 1.006, 1, 1.003, 1],
        }}
        transition={{
          y:     { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/hero/odyssey-hero.jpeg"
          alt="East Queen Group — maritime excellence"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '65% 55%' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/shipping/tristar-prosperity.jpeg' }}
        />
      </motion.div>

      {/* ── Sky atmosphere overlay (subtle depth without killing the blues) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5,12,28,0.30) 0%, rgba(5,12,28,0.05) 35%, rgba(5,12,28,0.08) 60%, rgba(5,12,28,0.88) 100%)',
        }}
      />

      {/* ── Left gradient — text readability zone ── */}
      <div
        className="absolute inset-y-0 left-0 z-[2] pointer-events-none w-full"
        style={{
          background: 'linear-gradient(100deg, rgba(4,10,24,0.95) 0%, rgba(4,10,24,0.85) 28%, rgba(4,10,24,0.55) 50%, rgba(4,10,24,0.15) 68%, transparent 82%)',
        }}
      />

      {/* ── Sun glare (top-right, from where the real sky is) ── */}
      <div
        className="absolute top-0 right-0 z-[2] pointer-events-none"
        style={{
          width: '45%', height: '40%',
          background: 'radial-gradient(ellipse at 80% 10%, rgba(180,218,255,0.12) 0%, transparent 65%)',
        }}
      />

      {/* ══════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-[38vh]">
        <motion.div
          className="w-full lg:w-[52%] xl:w-[46%]"
          variants={txtContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={txtItem} className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-gold-500 rounded-full flex-shrink-0" />
            <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">
              Est. 1982 · Chittagong, Bangladesh
            </span>
          </motion.div>

          {/* Headline line 1 */}
          <motion.h1
            className="font-playfair font-bold text-display text-white leading-[1.06] mb-1"
            variants={wordBox}
          >
            {['Where', 'Ships'].map((w, i) => (
              <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.22em]">{w}</motion.span>
            ))}
          </motion.h1>

          {/* Headline line 2 — last word in brand red */}
          <motion.h1
            className="font-playfair font-bold text-display leading-[1.06] mb-8"
            variants={wordBox}
          >
            {['Meet', 'the', 'World'].map((w, i, arr) => (
              <motion.span
                key={i}
                variants={wordAnim}
                className={`inline-block mr-[0.22em] ${i === arr.length - 1 ? 'text-gold-500' : 'text-white'}`}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            variants={txtItem}
            className="text-white/70 text-base sm:text-lg leading-relaxed mb-9 max-w-[460px]"
          >
            Four decades of maritime excellence — ship breaking, LPG energy,
            fisheries, and international commodity trade from the shores of Chittagong.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={txtItem} className="flex flex-wrap gap-3 mb-10">
            <Link
              to="/companies"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5
                         bg-gold-500 hover:bg-gold-400 text-white font-bold
                         rounded-lg text-sm tracking-wide transition-all duration-200
                         hover:shadow-gold-glow"
            >
              Our Portfolio
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
            variants={txtItem}
            className="flex flex-wrap gap-6 pt-6 border-t border-white/12"
          >
            {STATS.map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center">
                <span className="font-mono font-bold text-gold-400 text-[1.6rem] leading-none">{n}</span>
                <span className="text-white/50 text-[10px] uppercase tracking-[0.22em] mt-1">{l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          ANIMATED WATER SECTION — bottom 36 vh
          Overlays the photo's ocean with moving waves
          ══════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5]"
        style={{ height: '36vh', minHeight: 180 }}
        aria-hidden="true"
      >
        {/* Deep water fill beneath all waves */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg,transparent 0%,#040e1e 55%)' }}
        />

        <OceanWaves reduced={reduced} />
        <SprayParticles reduced={reduced} />

        {/* Horizon transition — photo ocean meets animated ocean */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 80,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(10,25,55,0.35) 50%, rgba(8,20,45,0.7) 100%)',
          }}
        />
      </div>

      {/* ── Anchor badge (brand touch) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5, ease: ease.snappy }}
        className="absolute z-20 hidden lg:flex items-center justify-center"
        style={{ right: '4%', bottom: 'calc(36vh + 32px)' }}
      >
        <motion.div
          animate={reduced ? undefined : { rotate: [0, 8, 0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md
                     border border-white/15 flex items-center justify-center"
        >
          <Anchor size={20} className="text-gold-400" />
        </motion.div>
      </motion.div>

      {/* ── Sound toggle ── */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="absolute z-30 flex items-center gap-2.5
                   px-3.5 py-2 rounded-full backdrop-blur-sm
                   border border-white/15 bg-black/25 hover:bg-black/40
                   text-white/75 hover:text-white text-[11px] font-medium
                   transition-colors duration-200 cursor-pointer"
        style={{ right: 20, bottom: 'calc(36vh + 20px)' }}
        aria-label={muted ? 'Play ocean sound' : 'Mute ocean sound'}
      >
        {muted ? (
          <>
            <VolumeX size={12} className="flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">
              {booted ? 'Sound off' : 'Ocean sound'}
            </span>
          </>
        ) : (
          <>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Volume2 size={12} className="text-gold-400 flex-shrink-0" />
            </motion.span>
            <span className="hidden sm:inline text-gold-300 whitespace-nowrap">Sound on</span>
          </>
        )}
      </motion.button>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-1.5 text-white/40"
        style={{ bottom: 'calc(36vh + 20px)' }}
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
