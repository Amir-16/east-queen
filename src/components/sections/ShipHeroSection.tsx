/**
 * ShipHeroSection
 * ─ Real Odyssey-of-the-Seas photo as full-bleed background
 * ─ Ship + scene gently float (y-bob + subtle sway)
 * ─ Canvas-based realistic ocean — superimposed sine waves approximate
 *   a JONSWAP spectrum (swell + wind sea + chop) without a physics engine
 * ─ Web Audio ocean sound
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

// ─── Ocean layer definitions (back → front) ───────────────────────────────────
// Each layer is a sum of three sine components (swell / wind sea / chop).
// Colors are dark-navy ocean hues — no white fills → looks like real water.
const OCEAN_LAYERS = [
  {
    baseY: 0.82, r: 2,  g: 7,  b: 24, alpha: 1.00, foam: false,
    comps: [
      { amp: 0.018, freq: 1.1, speed: 0.19, phase: 0.0 },
      { amp: 0.008, freq: 3.2, speed: 0.52, phase: 1.8 },
      { amp: 0.004, freq: 7.0, speed: 1.15, phase: 0.5 },
    ],
  },
  {
    baseY: 0.70, r: 4,  g: 15, b: 48, alpha: 0.97, foam: false,
    comps: [
      { amp: 0.024, freq: 0.9, speed: 0.16, phase: 0.7 },
      { amp: 0.011, freq: 2.9, speed: 0.66, phase: 2.4 },
      { amp: 0.005, freq: 6.6, speed: 1.32, phase: 0.3 },
    ],
  },
  {
    baseY: 0.56, r: 6,  g: 27, b: 72, alpha: 0.93, foam: false,
    comps: [
      { amp: 0.030, freq: 1.2, speed: 0.25, phase: 1.5 },
      { amp: 0.014, freq: 2.6, speed: 0.78, phase: 3.1 },
      { amp: 0.007, freq: 7.4, speed: 1.62, phase: 1.6 },
    ],
  },
  // Surface layer — fastest, most varied, has foam
  {
    baseY: 0.42, r: 9,  g: 43, b: 96, alpha: 0.88, foam: true,
    comps: [
      { amp: 0.046, freq: 1.0, speed: 0.30, phase: 2.2 },
      { amp: 0.020, freq: 2.4, speed: 0.92, phase: 0.6 },
      { amp: 0.010, freq: 7.9, speed: 1.95, phase: 2.8 },
    ],
  },
] as const

type OceanLayer = typeof OCEAN_LAYERS[number]

// ─────────────────────────────────────────────────────────────────────────────
// OceanWaves — requestAnimationFrame canvas, smooth mid-point Bézier curves
// ─────────────────────────────────────────────────────────────────────────────
function OceanWaves({ reduced }: { reduced: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const timeRef   = useRef(0)
  const lastTsRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })!
    let W = 0, H = 0, dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width  = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Sample the composite wave height at a given x position and time
    const sampleY = (
      layer: OceanLayer,
      x: number,
      t: number,
    ): number => {
      let y = layer.baseY * H
      for (const c of layer.comps) {
        y += Math.sin((x / W) * c.freq * Math.PI * 2 + t * c.speed + c.phase) * c.amp * H
      }
      return y
    }

    const drawLayer = (layer: OceanLayer, t: number) => {
      // ~4 px per sample gives a smooth curve at any viewport width
      const N  = Math.max(Math.ceil(W / 4), 100)
      const ys = new Float32Array(N + 1)
      for (let i = 0; i <= N; i++) ys[i] = sampleY(layer, (i / N) * W, t)

      // Find the minimum Y (wave crest) for the gradient top anchor
      let minY = ys[0]
      for (let i = 1; i <= N; i++) if (ys[i] < minY) minY = ys[i]

      const { r, g, b, alpha } = layer
      const grad = ctx.createLinearGradient(0, minY, 0, H)
      // Lighter at the wave crest (catches light), darker in the trough
      grad.addColorStop(0,    `rgba(${Math.min(r+20,255)},${Math.min(g+32,255)},${Math.min(b+55,255)},${(alpha * 0.78).toFixed(2)})`)
      grad.addColorStop(0.30, `rgba(${r},${g},${b},${alpha})`)
      grad.addColorStop(1,    `rgba(${Math.max(r-1,0)},${Math.max(g-4,0)},${Math.max(b-10,0)},${alpha})`)

      // ── Wave fill (mid-point quadratic Bézier — smooth through all samples) ──
      ctx.beginPath()
      ctx.moveTo(0, ys[0])
      for (let i = 1; i < N; i++) {
        const xp = ((i - 1) / N) * W
        const xc = (i       / N) * W
        ctx.quadraticCurveTo(xp, ys[i - 1], (xp + xc) / 2, (ys[i - 1] + ys[i]) / 2)
      }
      // Final segment ends exactly at the last sample
      ctx.quadraticCurveTo(((N - 1) / N) * W, ys[N - 1], W, ys[N])
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      // ── Foam / whitecap line on the foremost layer only ─────────────────────
      if (layer.foam) {
        ctx.beginPath()
        ctx.moveTo(0, ys[0])
        for (let i = 1; i < N; i++) {
          const xp = ((i - 1) / N) * W
          const xc = (i       / N) * W
          ctx.quadraticCurveTo(xp, ys[i - 1], (xp + xc) / 2, (ys[i - 1] + ys[i]) / 2)
        }
        ctx.quadraticCurveTo(((N - 1) / N) * W, ys[N - 1], W, ys[N])

        // Double-stroke: soft glow + sharp edge
        ctx.strokeStyle = 'rgba(185, 215, 255, 0.20)'
        ctx.lineWidth   = 5
        ctx.stroke()
        ctx.strokeStyle = 'rgba(220, 238, 255, 0.50)'
        ctx.lineWidth   = 1.5
        ctx.stroke()
      }
    }

    // Reduced-motion: render a single static frame and stop
    if (reduced) {
      for (const layer of OCEAN_LAYERS) drawLayer(layer, 0)
      return () => ro.disconnect()
    }

    const tick = (ts: number) => {
      const dt = lastTsRef.current
        ? Math.min((ts - lastTsRef.current) / 1000, 0.05)
        : 0
      lastTsRef.current  = ts
      timeRef.current   += dt

      ctx.clearRect(0, 0, W, H)
      for (const layer of OCEAN_LAYERS) drawLayer(layer, timeRef.current)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// useOceanSound
// Audio graph: pink noise → lowpass → [swell gain] → compressor → [master] → out
//              bandpass ↗
//   LFO → lfoGain → swellGain.gain  (amplitude modulation ~9 s per swell)
//   master gain is ONLY touched by toggle — never by the LFO
// ─────────────────────────────────────────────────────────────────────────────
function useOceanSound() {
  const ctxRef     = useRef<AudioContext | null>(null)
  const masterRef  = useRef<GainNode    | null>(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

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

      const swellGain = ctx.createGain()
      swellGain.gain.value = 0.75

      const lfo = ctx.createOscillator()
      lfo.type = 'sine'; lfo.frequency.value = 0.11
      const lfoAmp = ctx.createGain()
      lfoAmp.gain.value = 0.25
      lfo.connect(lfoAmp); lfoAmp.connect(swellGain.gain)

      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -18; comp.knee.value = 30
      comp.ratio.value = 8; comp.attack.value = 0.01; comp.release.value = 0.3

      const master = ctx.createGain()
      master.gain.value = 0

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

  const toggle = useCallback(() => {
    const ctx = buildGraph()
    if (!ctx) return
    ctx.resume().then(() => {
      const master = masterRef.current!
      if (!startedRef.current) {
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
         style={{ bottom: '34%', height: 60 }}>
      {SPRAY.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, bottom: 0, width: p.size, height: p.size, background: 'rgba(200,225,255,0.22)' }}
          animate={{ y: [0, -35, -60], opacity: [0, 0.45, 0], x: [0, p.drift] }}
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
  const reduced             = useReducedMotion()
  const { playing, toggle } = useOceanSound()

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="East Queen Group hero"
    >

      {/* ── Ship image — full-bleed, gently floating ───────────────────────── */}
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

      {/* ── Overlays ─────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: 'linear-gradient(180deg, rgba(5,14,30,0.28) 0%, rgba(5,14,30,0.04) 30%, rgba(5,14,30,0.12) 62%, rgba(4,12,26,0.92) 100%)' }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
           style={{ background: 'linear-gradient(105deg, rgba(4,10,24,0.94) 0%, rgba(4,10,24,0.84) 26%, rgba(4,10,24,0.50) 48%, rgba(4,10,24,0.12) 64%, transparent 80%)' }} />
      <div className="absolute top-0 right-0 z-[2] pointer-events-none"
           style={{ width:'42%', height:'38%', background:'radial-gradient(ellipse at 85% 8%, rgba(190,225,255,0.10) 0%, transparent 65%)' }} />

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-[37vh]">
        <motion.div
          className="w-full lg:w-[52%] xl:w-[46%]"
          variants={txtCont}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={txtItem} className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-gold-500 rounded-full flex-shrink-0" />
            <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">
              Est. 1982 · Chittagong, Bangladesh
            </span>
          </motion.div>

          <motion.h1
            className="font-playfair font-bold text-display text-white leading-[1.06] mb-1"
            variants={wrdCont}
          >
            {['Where','Ships'].map((w,i) => (
              <motion.span key={i} variants={wrdAnim} className="inline-block mr-[0.22em]">{w}</motion.span>
            ))}
          </motion.h1>

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

          <motion.p variants={txtItem}
            className="text-white/68 text-base sm:text-lg leading-relaxed mb-9 max-w-[460px]">
            Four decades of maritime excellence — ship breaking, LPG energy,
            fisheries, and international commodity trade from the shores of Chittagong.
          </motion.p>

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
          REALISTIC OCEAN — canvas-based wave simulation
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5]"
        style={{ height: '36vh', minHeight: 180 }}
        aria-hidden="true"
      >
        {/* Deep water base — blends photo ocean into canvas waves */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3,10,28,0.6) 30%, #02071a 70%)' }} />

        <OceanWaves reduced={reduced} />
        <SprayParticles reduced={reduced} />

        {/* Soft horizon blend — photo waterline → canvas ocean */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none"
             style={{ height: 100, background: 'linear-gradient(to bottom, transparent 0%, rgba(3,9,26,0.45) 55%, rgba(2,7,22,0.78) 100%)' }} />
      </div>

      {/* ── Sound toggle ─────────────────────────────────────────────────────── */}
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
            <motion.div animate={{ scale:[1,1.25,1] }} transition={{ duration:1.1, repeat:Infinity }}>
              <Volume2 size={13} />
            </motion.div>
            <span className="hidden sm:inline">Sound On</span>
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

      {/* ── Scroll cue ───────────────────────────────────────────────────────── */}
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
