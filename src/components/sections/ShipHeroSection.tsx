/**
 * ShipHeroSection
 * Visual stack (bottom → top):
 *   video (Ken Burns) → vignette gradients → radial edge vignette
 *   → scan lines → film grain canvas → dust motes → spark particles
 *   → content → UI chrome
 *
 * Audio: Web Audio industrial wind synthesiser (user-toggled)
 *   Brown noise → lowpass + bandpass → windGain
 *   LFO₁ (0.07 Hz) → slow gusts  |  LFO₂ (0.38 Hz) → turbulence
 *   windGain → compressor → masterGain → output
 */
import { useRef, useEffect, useState, useCallback } from 'react'
import { useReducedMotion, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, ChevronDown, Wind, VolumeX } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ease } from '@/lib/motion'

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { n: '42+',  l: 'Years'            },
  { n: '150+', l: 'Vessels Recycled' },
  { n: '500+', l: 'Employees'        },
  { n: '20+',  l: 'Countries'        },
]

// ─── Film grain — canvas-based, 15 fps ───────────────────────────────────────
function FilmGrain({ reduced }: { reduced: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      // Low-res grain then CSS-scaled = performant + convincing
      canvas.width  = Math.round(canvas.offsetWidth  / 2)
      canvas.height = Math.round(canvas.offsetHeight / 2)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let last = 0
    const INTERVAL = 1000 / 15   // cap at 15 fps

    const tick = (ts: number) => {
      if (ts - last >= INTERVAL) {
        last = ts
        const { width: W, height: H } = canvas
        const img = ctx.createImageData(W, H)
        const d   = img.data
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0
          d[i] = d[i + 1] = d[i + 2] = v
          d[i + 3] = 22    // very low alpha — subtle grit
        }
        ctx.putImageData(img, 0, 0)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [reduced])

  if (reduced) return null
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
      style={{ mixBlendMode: 'overlay', imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}

// ─── Dust motes — slow-drifting industrial atmosphere ────────────────────────
const MOTES = Array.from({ length: 22 }, (_, i) => ({
  id:    i,
  x:     (i * 137.508) % 100,           // golden-angle spread
  y:     (i * 53.1)    % 100,
  size:  1.5 + (i % 4) * 0.9,
  dur:   12 + (i % 7) * 2.5,
  delay: (i * 0.6)     % 8,
  dx:    (i % 2 === 0 ? 1 : -1) * (6 + (i % 5) * 3),
  dy:    -(8 + (i % 6) * 4),
}))

function DustMotes({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null
  return (
    <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden" aria-hidden="true">
      {MOTES.map(m => (
        <motion.div
          key={m.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size, opacity: 0 }}
          animate={{ x: [0, m.dx, m.dx * 0.5, 0], y: [0, m.dy, m.dy * 1.6, m.dy * 0.8], opacity: [0, 0.22, 0.14, 0] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Sparks — rising bright flecks like yard cutting sparks ──────────────────
const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  id:    i,
  x:     35 + (i * 43.7) % 45,          // clustered right-centre (where yard action is)
  size:  1 + (i % 3) * 0.8,
  dur:   1.0 + (i % 5) * 0.35,
  delay: (i * 0.55) % 5,
  drift: (i % 2 === 0 ? 1 : -1) * (4 + (i % 4) * 3),
}))

function Sparks({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null
  return (
    <div className="absolute inset-0 z-[7] pointer-events-none overflow-hidden" aria-hidden="true">
      {SPARKS.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left:       `${s.x}%`,
            bottom:     '25%',
            width:       s.size,
            height:      s.size,
            background: 'radial-gradient(circle, #fff 0%, #f5c518 55%, transparent 100%)',
          }}
          animate={{
            y:       [0, -(80 + s.id * 12), -(130 + s.id * 8)],
            x:       [0, s.drift, s.drift * 1.4],
            opacity: [0, 0.9, 0],
            scale:   [0.5, 1, 0.3],
          }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ─── Industrial wind — Web Audio synthesiser ─────────────────────────────────
function useWindSound() {
  const ctxRef     = useRef<AudioContext | null>(null)
  const masterRef  = useRef<GainNode    | null>(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  const buildGraph = useCallback((): AudioContext | null => {
    if (ctxRef.current) return ctxRef.current
    try {
      const ctx = new AudioContext()
      const sr  = ctx.sampleRate

      // Brown noise (deeper / windier than pink noise)
      const buf = ctx.createBuffer(2, sr * 6, sr)
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch)
        let last = 0
        for (let i = 0; i < d.length; i++) {
          const white = Math.random() * 2 - 1
          d[i] = (last + 0.02 * white) / 1.02
          last  = d[i]
          d[i] *= 3.8
        }
      }
      const src = ctx.createBufferSource()
      src.buffer = buf; src.loop = true

      // Lowpass — removes high hiss, keeps low wind rumble
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'; lp.frequency.value = 720; lp.Q.value = 0.4

      // Bandpass — adds the howling mid-frequency "wind through steel" character
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 340; bp.Q.value = 0.55

      const windGain = ctx.createGain()
      windGain.gain.value = 0.65

      // LFO₁ — slow gusts (~14 s period)
      const lfo1 = ctx.createOscillator(); lfo1.type = 'sine'; lfo1.frequency.value = 0.07
      const lg1  = ctx.createGain();       lg1.gain.value = 0.38
      lfo1.connect(lg1); lg1.connect(windGain.gain)

      // LFO₂ — faster turbulence (~2.6 s period)
      const lfo2 = ctx.createOscillator(); lfo2.type = 'sine'; lfo2.frequency.value = 0.38
      const lg2  = ctx.createGain();       lg2.gain.value = 0.14
      lfo2.connect(lg2); lg2.connect(windGain.gain)

      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -20; comp.knee.value = 28
      comp.ratio.value = 7;       comp.attack.value = 0.02; comp.release.value = 0.4

      const master = ctx.createGain(); master.gain.value = 0

      src.connect(lp); src.connect(bp)
      lp.connect(windGain); bp.connect(windGain)
      windGain.connect(comp); comp.connect(master)
      master.connect(ctx.destination)

      src.start(); lfo1.start(); lfo2.start()

      ctxRef.current  = ctx
      masterRef.current = master
      return ctx
    } catch { return null }
  }, [])

  const toggle = useCallback(() => {
    const ctx = buildGraph()
    if (!ctx) return
    ctx.resume().then(() => {
      const master = masterRef.current!
      if (!startedRef.current) {
        startedRef.current = true
        master.gain.setTargetAtTime(0.85, ctx.currentTime, 1.8)
        setPlaying(true)
      } else {
        setPlaying(prev => {
          const next = !prev
          master.gain.setTargetAtTime(next ? 0.85 : 0, ctx.currentTime, next ? 1.8 : 0.8)
          return next
        })
      }
    }).catch(() => {})
  }, [buildGraph])

  useEffect(() => () => { ctxRef.current?.close() }, [])

  return { playing, toggle }
}

// ─── Framer motion variants ───────────────────────────────────────────────────
const cont  = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }
const item  = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.smooth } } }
const wCont = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }
const wAnim = { hidden: { opacity: 0, y: 44, skewY: 4 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: ease.smooth } } }

// ─── Main component ───────────────────────────────────────────────────────────
export default function ShipHeroSection() {
  const reduced             = useReducedMotion()
  const { playing, toggle } = useWindSound()

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="East Queen Group — Global Export Import and Sourcing Solutions"
    >

      {/* ════════════════════════════════════════════════════════
          LAYER 0 — Video (Ken Burns slow zoom)
          filter: boost brightness/contrast/saturation to counteract
          WhatsApp compression; sepia(0.06) adds warm industrial tone
          ════════════════════════════════════════════════════════ */}
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
          filter:          'brightness(1.12) contrast(1.18) saturate(1.30) sepia(0.06)',
          transform:       'scale(1.08)',
          transformOrigin: 'center center',
        }}
        animate={reduced ? undefined : { scale: [1.08, 1.14, 1.08] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════════════════
          LAYER 1 — Top / bottom depth vignette
          ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,rgba(4,10,24,.45) 0%,transparent 20%,transparent 58%,rgba(4,10,24,.92) 100%)' }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER 2 — Left reading panel (fades to transparent right)
          ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(100deg,rgba(4,10,24,.90) 0%,rgba(4,10,24,.78) 26%,rgba(4,10,24,.44) 50%,rgba(4,10,24,.10) 66%,transparent 80%)' }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER 3 — Radial edge vignette (cinematic oval darkening)
          ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%,transparent 40%,rgba(0,0,0,.55) 100%)' }}
      />

      {/* ════════════════════════════════════════════════════════
          LAYER 4 — Horizontal scan lines (ultra-subtle CRT texture)
          ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          backgroundImage:  'repeating-linear-gradient(to bottom,transparent 0px,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)',
          backgroundSize:   '100% 4px',
        }}
        aria-hidden="true"
      />

      {/* LAYER 5 — Film grain canvas */}
      <FilmGrain reduced={reduced} />

      {/* LAYER 6 — Dust motes */}
      <DustMotes reduced={reduced} />

      {/* LAYER 7 — Rising sparks */}
      <Sparks reduced={reduced} />

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════════════ */}
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
              East Queen Group · Est. 1982 · Chittagong, Bangladesh
            </span>
          </motion.div>

          {/* Main headline — split at natural break so each line stays readable */}
          <motion.h1
            className="font-playfair font-bold leading-[1.06] mb-3"
            style={{ fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)' }}
            variants={wCont}
          >
            {/* Line 1 */}
            <span className="block">
              {['Global', 'Export', 'Import'].map((w, i) => (
                <motion.span key={i} variants={wAnim} className="inline-block mr-[0.18em] text-white">
                  {w}
                </motion.span>
              ))}
            </span>
            {/* Line 2 — last word accented in gold */}
            <span className="block">
              {['&', 'Sourcing', 'Solutions'].map((w, i, arr) => (
                <motion.span
                  key={i}
                  variants={wAnim}
                  className={`inline-block mr-[0.18em] ${i === arr.length - 1 ? 'text-gold-500' : 'text-white'}`}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Partner tagline */}
          <motion.p
            variants={item}
            className="text-white/60 text-sm sm:text-base font-semibold uppercase
                       tracking-[0.18em] mb-6 max-w-[480px]"
          >
            Your Partner for Global Business &amp; Sourcing
          </motion.p>

          {/* Body */}
          <motion.p
            variants={item}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-9 max-w-[490px]"
          >
            From Chittagong to markets across four continents — East Queen Group
            delivers end-to-end export, import, and sourcing solutions across
            commodities, materials, and industrial goods since 1982.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            <Link
              to="/export"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5
                         bg-gold-500 hover:bg-gold-400 text-white font-bold
                         rounded-lg text-sm tracking-wide transition-all duration-200
                         hover:shadow-gold-glow"
            >
              Explore Our Services
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

      {/* ── Wind sound toggle ─────────────────────────────────────────────────── */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        className="absolute z-20 bottom-10 right-6 sm:right-10
                   flex items-center gap-2.5 px-4 py-2.5 rounded-full
                   backdrop-blur-md border transition-colors duration-200 cursor-pointer select-none
                   text-[11px] font-semibold tracking-wide"
        style={{
          borderColor: playing ? 'rgba(245,193,50,0.5)' : 'rgba(255,255,255,0.18)',
          background:  playing ? 'rgba(245,193,50,0.12)' : 'rgba(0,0,0,0.35)',
          color:       playing ? '#f5c932'                : 'rgba(255,255,255,0.72)',
        }}
        aria-label={playing ? 'Mute wind sound' : 'Play wind sound'}
      >
        {playing ? (
          <>
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Wind size={13} />
            </motion.div>
            <span className="hidden sm:inline">Wind On</span>
            {/* Equaliser bars */}
            <span className="hidden sm:flex items-end gap-[2px] h-3">
              {[1, 2, 3].map(i => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-current"
                  animate={{ height: ['4px', '10px', '4px'] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          </>
        ) : (
          <>
            <VolumeX size={13} />
            <span className="hidden sm:inline">Wind Sound</span>
          </>
        )}
      </motion.button>

      {/* ── HKC badge ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="absolute z-20 bottom-10 left-6 sm:left-10
                   flex items-center gap-2.5 px-4 py-2.5 rounded-full
                   backdrop-blur-md border border-white/14 bg-black/30
                   text-[11px] font-semibold text-white/65 tracking-wide select-none"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        Trusted Globally · Est. 1982
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-1.5 text-white/38"
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
