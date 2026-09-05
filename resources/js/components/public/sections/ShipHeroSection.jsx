import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, Phone, ChevronDown, Waves, VolumeX } from 'lucide-react'
import { usePage } from '@inertiajs/react'

// ── Sea-sound synthesiser ──────────────────────────────────────────────────────
//
// Synthesises realistic ocean ambience using Web Audio API:
//   • Pink noise source  (Voss-McCartney algorithm — more natural than white)
//   • Wave body          — low-pass filtered, shaped by a slow LFO (~0.07 Hz)
//   • Secondary swell    — slightly faster LFO (~0.11 Hz) offset for irregularity
//   • Surf / foam hiss   — band-pass filtered, rides a third LFO (~0.09 Hz)
//   • Deep rumble        — very-low-pass (<140 Hz) for underwater body
//   • Dynamics compressor — smooths random amplitude peaks
//   • Master gain        — fades in/out over 3 s to avoid clicks
//
// The video stays permanently muted; this audio is completely separate.

function useSeaSound() {
  const acRef      = useRef(null)
  const masterRef  = useRef(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  const buildGraph = useCallback(() => {
    if (acRef.current) return acRef.current
    try {
      const ac = new AudioContext()
      const sr = ac.sampleRate

      // 10-second stereo pink-noise buffer (loops without seam)
      const len = sr * 10
      const buf = ac.createBuffer(2, len, sr)
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
        for (let i = 0; i < len; i++) {
          const w = Math.random() * 2 - 1
          // Voss-McCartney pink noise coefficients
          b0 = 0.99886 * b0 + w * 0.0555179
          b1 = 0.99332 * b1 + w * 0.0750759
          b2 = 0.96900 * b2 + w * 0.1538520
          b3 = 0.86650 * b3 + w * 0.3104856
          b4 = 0.55000 * b4 + w * 0.5329522
          b5 = -0.7616 * b5 - w * 0.0168980
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.09
          b6 = w * 0.115926
        }
      }

      const src = ac.createBufferSource()
      src.buffer = buf
      src.loop   = true

      // ── Wave body: wide low-pass + slow swell LFO ──
      const waveLP   = ac.createBiquadFilter()
      waveLP.type    = 'lowpass'
      waveLP.frequency.value = 640
      waveLP.Q.value = 0.65

      const waveGain = ac.createGain()
      waveGain.gain.value = 0.62

      const lfo1 = ac.createOscillator()
      lfo1.type  = 'sine'
      lfo1.frequency.value = 0.07         // one swell ~every 14 s
      const lg1  = ac.createGain(); lg1.gain.value = 0.28
      lfo1.connect(lg1); lg1.connect(waveGain.gain)

      // ── Secondary swell: offset phase, slightly different frequency ──
      const lfo2 = ac.createOscillator()
      lfo2.type  = 'sine'
      lfo2.frequency.value = 0.11
      const lg2  = ac.createGain(); lg2.gain.value = 0.16
      lfo2.connect(lg2); lg2.connect(waveGain.gain)

      // ── Surf / foam hiss: band-pass ──
      const surfBP = ac.createBiquadFilter()
      surfBP.type  = 'bandpass'
      surfBP.frequency.value = 1400
      surfBP.Q.value = 0.45

      const surfGain = ac.createGain()
      surfGain.gain.value = 0.28

      const lfo3 = ac.createOscillator()
      lfo3.type  = 'sine'
      lfo3.frequency.value = 0.09
      const lg3  = ac.createGain(); lg3.gain.value = 0.20
      lfo3.connect(lg3); lg3.connect(surfGain.gain)

      // ── Deep body: very low-pass rumble ──
      const deepLP   = ac.createBiquadFilter()
      deepLP.type    = 'lowpass'
      deepLP.frequency.value = 130
      deepLP.Q.value = 0.5

      const deepGain = ac.createGain()
      deepGain.gain.value = 0.22

      // ── Compressor: tames spikes from the LFO modulation ──
      const comp = ac.createDynamicsCompressor()
      comp.threshold.value = -20
      comp.knee.value      = 28
      comp.ratio.value     = 7
      comp.attack.value    = 0.004
      comp.release.value   = 0.55

      // ── Master (starts silent, fades in on user gesture) ──
      const master = ac.createGain()
      master.gain.value = 0

      // Routing
      src.connect(waveLP);  waveLP.connect(waveGain); waveGain.connect(comp)
      src.connect(surfBP);  surfBP.connect(surfGain); surfGain.connect(comp)
      src.connect(deepLP);  deepLP.connect(deepGain); deepGain.connect(comp)
      comp.connect(master)
      master.connect(ac.destination)

      src.start(); lfo1.start(); lfo2.start(); lfo3.start()

      acRef.current     = ac
      masterRef.current = master
      return ac
    } catch { return null }
  }, [])

  const toggle = useCallback(() => {
    const ac = buildGraph()
    if (!ac) return
    ac.resume().then(() => {
      const master = masterRef.current
      if (!startedRef.current) {
        startedRef.current = true
        master.gain.setTargetAtTime(0.78, ac.currentTime, 3.0)   // 3 s fade-in
        setPlaying(true)
      } else {
        setPlaying((prev) => {
          const next = !prev
          master.gain.setTargetAtTime(next ? 0.78 : 0, ac.currentTime, next ? 3.0 : 1.2)
          return next
        })
      }
    }).catch(() => {})
  }, [buildGraph])

  useEffect(() => () => { acRef.current?.close() }, [])

  return { playing, toggle }
}

// ── Visual FX ─────────────────────────────────────────────────────────────────

function FilmGrain() {
  const canvasRef = useRef(null)
  const rafRef    = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width  = Math.round(canvas.offsetWidth  / 2)
      canvas.height = Math.round(canvas.offsetHeight / 2)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    let last = 0
    const INTERVAL = 1000 / 12
    const tick = (ts) => {
      if (ts - last >= INTERVAL) {
        last = ts
        const { width: W, height: H } = canvas
        const img = ctx.createImageData(W, H)
        const d   = img.data
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0
          d[i] = d[i + 1] = d[i + 2] = v
          d[i + 3] = 14
        }
        ctx.putImageData(img, 0, 0)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
      style={{ mixBlendMode: 'soft-light', imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}

const MOTES = Array.from({ length: 18 }, (_, i) => ({
  id: i, x: (i * 137.508) % 100, y: (i * 53.1) % 100,
  size: 1.2 + (i % 3) * 0.8, dur: 14 + (i % 7) * 2.5, delay: (i * 0.7) % 10,
  dx: (i % 2 === 0 ? 1 : -1) * (5 + (i % 5) * 2.5), dy: -(7 + (i % 6) * 3.5),
}))

function DustMotes() {
  return (
    <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden" aria-hidden="true">
      {MOTES.map((m) => (
        <motion.div key={m.id} className="absolute rounded-full bg-amber-100"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size, opacity: 0 }}
          animate={{ x: [0, m.dx, m.dx * 0.5, 0], y: [0, m.dy, m.dy * 1.5, m.dy * 0.7], opacity: [0, 0.18, 0.10, 0] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const SPARKS = Array.from({ length: 12 }, (_, i) => ({
  id: i, x: 38 + (i * 43.7) % 40, size: 1 + (i % 3) * 0.7,
  dur: 1.1 + (i % 5) * 0.3, delay: (i * 0.6) % 5,
  drift: (i % 2 === 0 ? 1 : -1) * (3 + (i % 4) * 2.5),
}))

function Sparks() {
  return (
    <div className="absolute inset-0 z-[7] pointer-events-none overflow-hidden" aria-hidden="true">
      {SPARKS.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full"
          style={{ left: `${s.x}%`, bottom: '28%', width: s.size, height: s.size,
            background: 'radial-gradient(circle, #fff 0%, #fbbf24 50%, transparent 100%)' }}
          animate={{ y: [0, -(70 + s.id * 10), -(120 + s.id * 7)],
            x: [0, s.drift, s.drift * 1.3], opacity: [0, 1, 0], scale: [0.4, 1, 0.2] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ── Animation variants ─────────────────────────────────────────────────────────

const EASE_OUT    = [0.16, 1, 0.3, 1]
const EASE_SPRING = { type: 'spring', stiffness: 260, damping: 22 }

const cont = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}
const eyebrowAnim = {
  hidden:  { opacity: 0, letterSpacing: '0.55em', y: 10 },
  visible: { opacity: 1, letterSpacing: '0.28em', y: 0,
    transition: { duration: 1.0, ease: EASE_OUT } },
}
const wCont = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
}
const wAnim = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(10px)', scale: 0.94 },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  scale: 1,
    transition: { duration: 0.75, ease: EASE_OUT } },
}
const taglineAnim = {
  hidden:  { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.85, ease: EASE_OUT } },
}
const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
}
const ctaAnim = {
  hidden:  { opacity: 0, y: 16, scale: 0.93 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: EASE_SPRING },
}

// ── Animated headline ──────────────────────────────────────────────────────────

function AnimatedHeadline({ headline, accentWord }) {
  const words       = (headline || '').trim().split(/\s+/)
  const accentClean = (accentWord || '').trim().toLowerCase().replace(/[^a-z]/g, '')

  return (
    <motion.h1
      className="font-playfair font-bold leading-[1.08] tracking-tight mb-4"
      style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
      variants={wCont}
    >
      {words.map((word, i) => {
        const isAccent = accentClean && word.toLowerCase().replace(/[^a-z]/g, '') === accentClean
        return (
          <motion.span
            key={i}
            variants={wAnim}
            className={`inline-block mr-[0.15em] ${isAccent ? 'text-gold-400' : 'text-white'}`}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}

// ── Media background ───────────────────────────────────────────────────────────

function MediaBackground({ mediaType, videoUrl, videoPoster, imageUrl, videoRef }) {
  if (mediaType === 'image' && imageUrl) {
    return (
      <motion.div
        className="absolute inset-0 w-full h-full z-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter:          'brightness(1.12) contrast(1.10) saturate(1.28)',
          transformOrigin: 'center center',
        }}
        initial={{ scale: 1.04 }}
        animate={{ scale: [1.04, 1.08, 1.04] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    )
  }

  return (
    // Video stays permanently muted — sea sound is synthesised separately
    <motion.video
      ref={videoRef}
      src={videoUrl || '/videos/ship-breaking/ship-hero.mp4'}
      poster={videoPoster || '/images/gallery/ship-breaking/yard-wide-1.jpeg'}
      autoPlay muted loop playsInline preload="metadata"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{
        filter:          'brightness(1.12) contrast(1.10) saturate(1.30)',
        transformOrigin: 'center center',
      }}
      initial={{ scale: 1.04 }}
      animate={{ scale: [1.04, 1.08, 1.04] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function ShipHeroSection({ shipHero = {} }) {
  const videoRef             = useRef(null)
  const { playing, toggle }  = useSeaSound()
  const [progress, setProgress] = useState(0)
  const { company } = usePage().props

  const mediaType   = shipHero.media_type      || 'video'
  const videoUrl    = shipHero.video_url       || '/videos/ship-breaking/ship-hero.mp4'
  const videoPoster = shipHero.video_poster    || '/images/gallery/ship-breaking/yard-wide-1.jpeg'
  const imageUrl    = shipHero.image_url       || ''
  const eyebrow     = shipHero.eyebrow         || 'East Queen Group · Est. 1982 · Chittagong, Bangladesh'
  const headline    = shipHero.headline        || 'GATEWAY TO GLOBAL BUSINESS'
  const accentWord  = shipHero.headline_accent || 'BUSINESS'
  const tagline     = shipHero.tagline         || 'Your Partner for Global Business & Sourcing'
  const body        = shipHero.body            || ''
  const cta1Text    = shipHero.cta1_text       || 'Explore Our Companies'
  const cta1Url     = shipHero.cta1_url        || '/companies'
  const badgeText   = shipHero.badge_text      || 'Trusted Globally · Est. 1982'

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
    }
    video.addEventListener('timeupdate', onTime)
    return () => video.removeEventListener('timeupdate', onTime)
  }, [])

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label={headline}
    >
      <MediaBackground
        mediaType={mediaType}
        videoUrl={videoUrl}
        videoPoster={videoPoster}
        imageUrl={imageUrl}
        videoRef={videoRef}
      />

      {/* Bottom fade — text legibility */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(4,10,24,.90) 0%, rgba(4,10,24,.55) 22%, transparent 52%)' }} />
      {/* Top fade — nav legibility */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(4,10,24,.48) 0%, transparent 20%)' }} />
      {/* Left column fade — text area only */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(4,10,24,.88) 0%, rgba(4,10,24,.60) 30%, rgba(4,10,24,.20) 55%, transparent 72%)' }} />
      {/* Edge vignette */}
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 50%, rgba(0,0,0,.28) 100%)' }} />
      {/* Fine scan lines */}
      <div className="absolute inset-0 z-[4] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px)', backgroundSize: '100% 4px' }} />

      <FilmGrain />
      <DustMotes />
      <Sparks />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-28 pb-32">
        <motion.div
          className="w-full sm:w-[82%] md:w-[66%] lg:w-[55%] xl:w-[48%]"
          variants={cont}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={eyebrowAnim} className="flex items-center gap-3 mb-5 overflow-hidden">
            <motion.span
              className="h-[2px] bg-gold-400 rounded-full shrink-0"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT }}
            />
            <span className="text-gold-400 text-[10px] font-semibold uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <AnimatedHeadline headline={headline} accentWord={accentWord} />

          {/* Divider */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-gold-500/60 via-gold-400/30 to-transparent mb-5"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE_OUT }}
          />

          {/* Tagline */}
          {tagline && (
            <motion.p
              variants={taglineAnim}
              className="text-white/70 text-sm sm:text-[15px] font-medium uppercase tracking-[0.16em] mb-5 max-w-[460px]"
            >
              {tagline}
            </motion.p>
          )}

          {/* Body */}
          {body && (
            <motion.p
              variants={item}
              className="text-white/65 text-sm sm:text-base leading-relaxed mb-8 max-w-[460px]"
            >
              {body}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div variants={ctaAnim} className="flex flex-wrap gap-3">
            <Link
              href={cta1Url}
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-lg text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_24px_rgba(245,197,24,0.35)]"
            >
              {cta1Text}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            {company?.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/8 hover:bg-white/15 border border-white/20 hover:border-gold-500/50 text-white/80 hover:text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-200 backdrop-blur-sm"
              >
                <Phone size={14} />
                Call Us
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Sea-sound toggle */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, duration: 0.5, ease: EASE_OUT }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="absolute z-20 bottom-12 right-6 sm:right-10 flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer select-none text-[10px] font-semibold tracking-wider uppercase"
        style={{
          borderColor: playing ? 'rgba(56,189,248,0.45)' : 'rgba(255,255,255,0.15)',
          background:  playing ? 'rgba(56,189,248,0.08)' : 'rgba(0,0,0,0.28)',
          color:       playing ? '#38bdf8' : 'rgba(255,255,255,0.55)',
        }}
        aria-label={playing ? 'Mute sea sound' : 'Play sea sound'}
      >
        {playing ? (
          <>
            <motion.div
              animate={{ y: [0, -2, 0, -1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Waves size={12} />
            </motion.div>
            <span className="hidden sm:inline">Sea Sound</span>
            <span className="hidden sm:flex items-end gap-[2px] h-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-current"
                  animate={{ height: ['2px', '10px', '5px', '8px', '2px'] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
                />
              ))}
            </span>
          </>
        ) : (
          <>
            <VolumeX size={12} />
            <span className="hidden sm:inline">Sea Sound</span>
          </>
        )}
      </motion.button>

      {/* Trusted badge */}
      {badgeText && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.6, ease: EASE_OUT }}
          className="absolute z-20 bottom-12 left-6 sm:left-10 flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border border-white/[0.12] bg-black/25 text-[10px] font-semibold text-white/55 tracking-wider uppercase select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          {badgeText}
        </motion.div>
      )}

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/30"
        aria-hidden="true"
      >
        <span className="text-[8px] uppercase tracking-[0.45em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={13} />
        </motion.div>
      </motion.div>

      {/* Playback progress bar */}
      {mediaType === 'video' && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/[0.08] z-20" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 transition-[width] duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </section>
  )
}
