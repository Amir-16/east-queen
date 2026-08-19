/**
 * ShipHeroSection
 * ─ Real Odyssey-of-the-Seas photo as full-bleed background
 * ─ Ship + scene gently float (y-bob + subtle sway)
 * ─ Animated SVG wave layers overlaid on the photo's ocean
 * ─ SVG feTurbulence filter for organic water surface texture
 * ─ Web Audio ocean sound — runs from first click until manually stopped
 * ─ Respects prefers-reduced-motion throughout
 */
import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Volume2, VolumeX, ChevronDown } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ease } from '@/lib/motion'

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { n: '42+',  l: 'Years'     },
  { n: '6',    l: 'Companies' },
  { n: '500+', l: 'Employees' },
  { n: '20+',  l: 'Countries' },
]

// ─── Wave layers (back → front)
// White semi-transparent fills so waves are clearly visible on ANY background.
// Opacity increases towards the front for a depth/parallax feel.
const WAVES = [
  { yBase: 74, amp: 11, fill: 'rgba(255,255,255,0.07)', speed: 38 },
  { yBase: 62, amp: 15, fill: 'rgba(255,255,255,0.12)', speed: 26 },
  { yBase: 50, amp: 18, fill: 'rgba(255,255,255,0.19)', speed: 16 },
  { yBase: 36, amp: 13, fill: 'rgba(255,255,255,0.28)', speed: 9  },
]

// ─── Build a seamless double-tile SVG wave path (viewBox 0 0 2880 100) ───────
function wavePath(yBase: number, amp: number): string {
  const segs: string[] = []
  for (let tile = 0; tile < 2; tile++) {
    for (let i = 0; i < 8; i++) {
      const ox  = tile * 1440 + i * 180
      const cx  = ox + 90
      const ex  = ox + 180
      const dir = i % 2 === 0 ? -1 : 1
      // slight variance per segment for organic look
      const v   = 1 + ((i * 23 + tile * 41) % 5) * 0.04
      segs.push(`Q${cx},${yBase + dir * amp * v} ${ex},${yBase}`)
    }
  }
  return `M0,${yBase} ${segs.join(' ')} L2880,100 L0,100 Z`
}

// ─────────────────────────────────────────────────────────────────────────────
// useOceanSound
// Audio graph: pink noise → lowpass → [swell gain] → compressor → [master] → out
//              bandpass ↗
//   LFO → lfoGain → swellGain.gain  (amplitude modulation ~9 s per swell)
//   master gain is ONLY touched by toggle — never by the LFO
//
// Sound is OFF on mount (playing = false). First button click builds the graph
// inside a user-gesture handler and starts audio. Subsequent clicks fade the
// master gain up/down. No autoplay, no gesture-listener race conditions.
// ─────────────────────────────────────────────────────────────────────────────
function useOceanSound() {
  const ctxRef     = useRef<AudioContext | null>(null)
  const masterRef  = useRef<GainNode    | null>(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  // ── Build the full audio graph (idempotent) ────────────────────────────────
  const buildGraph = useCallback((): AudioContext | null => {
    if (ctxRef.current) return ctxRef.current
    try {
      const ctx = new AudioContext()
      const sr  = ctx.sampleRate

      // Pink noise (Paul Kellet) — 4-second looping buffer
      const buf = ctx.createBuffer(2, sr * 4, sr)
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch)
        let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
        for (let i = 0; i < d.length; i++) {
          const w = Math.random() * 2 - 1
          b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759
          b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856
          b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980
          d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.18
          b6=w*0.115926
        }
      }
      const src = ctx.createBufferSource()
      src.buffer = buf; src.loop = true

      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'; lp.frequency.value = 800; lp.Q.value = 0.5

      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 160; bp.Q.value = 0.4

      // Swell gain stays at 0.75; LFO adds ±0.25 → oscillates 0.50–1.00
      const swellGain = ctx.createGain()
      swellGain.gain.value = 0.75

      const lfo = ctx.createOscillator()
      lfo.type = 'sine'; lfo.frequency.value = 0.11
      const lfoAmp = ctx.createGain()
      lfoAmp.gain.value = 0.25
      lfo.connect(lfoAmp); lfoAmp.connect(swellGain.gain)

      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -18
      comp.knee.value = 30
      comp.ratio.value = 8
      comp.attack.value = 0.01
      comp.release.value = 0.3

      const master = ctx.createGain()
      master.gain.value = 0  // silent until user activates

      src.connect(lp); src.connect(bp)
      lp.connect(swellGain); bp.connect(swellGain)
      swellGain.connect(comp)
      comp.connect(master)
      master.connect(ctx.destination)

      src.start(); lfo.start()

      ctxRef.current   = ctx
      masterRef.current = master
      return ctx
    } catch {
      return null
    }
  }, [])

  // ── Toggle: first click starts audio; subsequent clicks mute/unmute ────────
  const toggle = useCallback(() => {
    const ctx = buildGraph()
    if (!ctx) return

    ctx.resume().then(() => {
      const master = masterRef.current!
      if (!startedRef.current) {
        // First activation — always fade in
        startedRef.current = true
        master.gain.setTargetAtTime(0.9, ctx.currentTime, 1.5)
        setPlaying(true)
      } else {
        setPlaying(prev => {
          const next = !prev
          master.gain.setTargetAtTime(next ? 0.9 : 0, ctx.currentTime, next ? 1.5 : 0.6)
          return next
        })
      }
    }).catch(() => {})
  }, [buildGraph])

  useEffect(() => () => { ctxRef.current?.close() }, [])

  return { playing, toggle }
}

// ─────────────────────────────────────────────────────────────────────────────
// OceanWaves — animated SVG layers + turbulence filter + foam + shimmer
// ─────────────────────────────────────────────────────────────────────────────
function OceanWaves({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* Hidden SVG filter — organic water-surface turbulence */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="ocean-fx" x="0%" y="0%" width="100%" height="100%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.013 0.048"
                          numOctaves="3" seed="6" result="noise">
              <animate attributeName="baseFrequency"
                values="0.013 0.048;0.019 0.055;0.013 0.048"
                dur="9s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise"
                               scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Wave layers with turbulence filter */}
      <div className="absolute inset-0" style={{ filter: 'url(#ocean-fx)' }}>
        {WAVES.map((w, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 h-full"
            style={{ width: '200%', willChange: 'transform' }}
            animate={reduced ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: w.speed, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 2880 100" preserveAspectRatio="none" className="w-full h-full">
              <path d={wavePath(w.yBase, w.amp)} fill={w.fill} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Foam / whitecap strip — moves faster than deepest wave */}
      {!reduced && (
        <motion.div
          className="absolute left-0 bottom-[60%]"
          style={{ width: '200%', height: 3, willChange: 'transform' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 2880 4" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={`M0,2 ${Array.from({ length: 48 }, (_, k) => {
                const x = k * 60
                return `Q${x+15},0 ${x+30},2 Q${x+45},4 ${x+60},2`
              }).join(' ')}`}
              stroke="rgba(255,255,255,0.65)" strokeWidth="2" fill="none"
            />
          </svg>
        </motion.div>
      )}

      {/* Sunlight shimmer on water surface */}
      {!reduced && (
        <motion.div
          className="absolute top-[3px] left-0 right-0 pointer-events-none"
          style={{ height: 2, background: 'linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.35) 30%,rgba(255,255,255,0.60) 50%,rgba(255,255,255,0.35) 70%,transparent 95%)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Spray / mist particles rising at the waterline
// ─────────────────────────────────────────────────────────────────────────────
const SPRAY = Array.from({ length: 18 }, (_, i) => ({
  id: i, x: (i * 137.5) % 95,
  delay: (i * 0.38) % 4.5,
  dur:   2.5 + (i % 5) * 0.5,
  size:  1.5 + (i % 3) * 1.2,
  drift: i % 2 === 0 ? 7 : -7,
}))

function SprayParticles({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null
  return (
    <div className="absolute left-0 right-0 overflow-hidden pointer-events-none"
         style={{ bottom: '28%', height: 70 }}>
      {SPRAY.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, bottom: 0, width: p.size, height: p.size, background: 'rgba(255,255,255,0.28)' }}
          animate={{ y: [0, -40, -70], opacity: [0, 0.5, 0], x: [0, p.drift] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Text entrance variants
// ─────────────────────────────────────────────────────────────────────────────
const txtCont  = { hidden:{}, visible:{ transition:{ staggerChildren:0.09, delayChildren:0.35 } } }
const txtItem  = { hidden:{ opacity:0, y:28 }, visible:{ opacity:1, y:0, transition:{ duration:0.65, ease:ease.smooth } } }
const wrdCont  = { hidden:{}, visible:{ transition:{ staggerChildren:0.07, delayChildren:0.5  } } }
const wrdAnim  = { hidden:{ opacity:0, y:38, skewY:5 }, visible:{ opacity:1, y:0, skewY:0, transition:{ duration:0.55, ease:ease.smooth } } }

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ShipHeroSection() {
  const reduced            = useReducedMotion()
  const { playing, toggle } = useOceanSound()

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="East Queen Group hero"
    >

      {/* ══════════════════════════════════════════════════════════
          SHIP IMAGE — full-bleed, gently floating
          The entire scene (ship + ocean + sky) bobs together,
          giving a convincing "sitting on the ocean" feel.
          ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform' }}
        animate={reduced ? undefined : {
          y:     [0, -12, 0, -7, 0],
          scale: [1, 1.005, 1, 1.003, 1],
          rotate:[0,  0.25, 0, -0.25, 0],
        }}
        transition={{
          y:      { duration: 6,   repeat: Infinity, ease: 'easeInOut' },
          scale:  { duration: 9,   repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 8.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <img
          src="/images/hero/odyssey-hero.png"
          alt="Odyssey of the Seas — East Queen Group maritime excellence"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '60% 52%' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* ── Overlays ─────────────────────────────────────────────── */}

      {/* Sky depth — preserves blue sky, adds subtle vignette at top */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: 'linear-gradient(180deg, rgba(5,14,30,0.28) 0%, rgba(5,14,30,0.04) 30%, rgba(5,14,30,0.12) 62%, rgba(4,12,26,0.92) 100%)' }} />

      {/* Left readability band — strong enough for white text over bright blue */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
           style={{ background: 'linear-gradient(105deg, rgba(4,10,24,0.94) 0%, rgba(4,10,24,0.84) 26%, rgba(4,10,24,0.50) 48%, rgba(4,10,24,0.12) 64%, transparent 80%)' }} />

      {/* Subtle sun glare top-right (matches the Odyssey photo's bright sky) */}
      <div className="absolute top-0 right-0 z-[2] pointer-events-none"
           style={{ width:'42%', height:'38%', background:'radial-gradient(ellipse at 85% 8%, rgba(190,225,255,0.10) 0%, transparent 65%)' }} />

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-[37vh]">
        <motion.div
          className="w-full lg:w-[52%] xl:w-[46%]"
          variants={txtCont}
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

          {/* H1 line 1 */}
          <motion.h1
            className="font-playfair font-bold text-display text-white leading-[1.06] mb-1"
            variants={wrdCont}
          >
            {['Where','Ships'].map((w,i) => (
              <motion.span key={i} variants={wrdAnim} className="inline-block mr-[0.22em]">{w}</motion.span>
            ))}
          </motion.h1>

          {/* H1 line 2 — last word in brand red */}
          <motion.h1
            className="font-playfair font-bold text-display leading-[1.06] mb-8"
            variants={wrdCont}
          >
            {['Meet','the','World'].map((w,i,arr) => (
              <motion.span key={i} variants={wrdAnim}
                className={`inline-block mr-[0.22em] ${i===arr.length-1?'text-gold-500':'text-white'}`}>
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p variants={txtItem}
            className="text-white/68 text-base sm:text-lg leading-relaxed mb-9 max-w-[460px]">
            Four decades of maritime excellence — ship breaking, LPG energy,
            fisheries, and international commodity trade from the shores of Chittagong.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={txtItem} className="flex flex-wrap gap-3 mb-10">
            <Link to="/companies"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5
                         bg-gold-500 hover:bg-gold-400 text-white font-bold
                         rounded-lg text-sm tracking-wide transition-all duration-200
                         hover:shadow-gold-glow">
              Our Portfolio
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a href={`tel:${CONTACT.phones[0].replace(/\s/g,'')}`}
              className="inline-flex items-center gap-2 px-7 py-3.5
                         bg-white/10 hover:bg-white/18 border border-white/25
                         hover:border-gold-500/60 text-white font-semibold
                         rounded-lg text-sm tracking-wide transition-all duration-200">
              <Phone size={14} />
              Call Us
            </a>
          </motion.div>

          {/* Stats */}
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

      {/* ══════════════════════════════════════════════════════════
          ANIMATED OCEAN — bottom 36 vh
          Overlays the photo's real ocean with moving SVG waves.
          The turbulence filter makes every wave edge look organic.
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5]"
        style={{ height: '36vh', minHeight: 180 }}
        aria-hidden="true"
      >
        {/* Deep water fill */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(180deg, transparent 0%, #050f22 50%)' }} />

        <OceanWaves reduced={reduced} />
        <SprayParticles reduced={reduced} />

        {/* Horizon blend — photo ocean → animated ocean */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none"
             style={{ height: 90, background: 'linear-gradient(to bottom, transparent 0%, rgba(8,22,50,0.4) 55%, rgba(6,16,40,0.72) 100%)' }} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SOUND TOGGLE
          ══════════════════════════════════════════════════════════ */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        className="absolute z-30 flex items-center gap-2.5
                   px-4 py-2.5 rounded-full backdrop-blur-md
                   border bg-black/30 hover:bg-black/45
                   text-[11px] font-semibold tracking-wide
                   transition-colors duration-200 cursor-pointer select-none"
        style={{
          right:        20,
          bottom:       'calc(36vh + 18px)',
          borderColor:  playing ? 'rgba(226,31,47,0.5)' : 'rgba(255,255,255,0.18)',
          color:        playing ? '#F76169'              : 'rgba(255,255,255,0.72)',
        }}
        aria-label={playing ? 'Mute ocean sound' : 'Play ocean sound'}
      >
        {playing ? (
          <>
            {/* Pulsing speaker when active */}
            <motion.div animate={{ scale:[1,1.25,1] }} transition={{ duration:1.1, repeat:Infinity }}>
              <Volume2 size={13} />
            </motion.div>
            <span className="hidden sm:inline">Sound On</span>
            {/* Live audio bars */}
            <span className="hidden sm:flex items-end gap-[2px] h-3">
              {[1,2,3].map(i => (
                <motion.span key={i}
                  className="w-[2px] rounded-full bg-current"
                  animate={{ height:['4px','10px','4px'] }}
                  transition={{ duration:0.6, repeat:Infinity, delay:i*0.12 }}
                />
              ))}
            </span>
          </>
        ) : (
          <>
            <VolumeX size={13} />
            <span className="hidden sm:inline">Ocean Sound</span>
          </>
        )}
      </motion.button>

      {/* ── Scroll cue ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-1.5 text-white/38"
        style={{ bottom: 'calc(36vh + 18px)' }}
      >
        <span className="text-[9px] uppercase tracking-[0.38em]">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y:[0,5,0] }}
          transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
