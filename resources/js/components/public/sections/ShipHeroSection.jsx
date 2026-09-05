import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, Phone, ChevronDown, Volume2, VolumeX } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { ease } from '@/lib/motion'

// ── Visual FX ────────────────────────────────────────────────────────────────

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
    const INTERVAL = 1000 / 15
    const tick = (ts) => {
      if (ts - last >= INTERVAL) {
        last = ts
        const { width: W, height: H } = canvas
        const img = ctx.createImageData(W, H)
        const d   = img.data
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0
          d[i] = d[i + 1] = d[i + 2] = v
          d[i + 3] = 22
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
      style={{ mixBlendMode: 'overlay', imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}

const MOTES = Array.from({ length: 22 }, (_, i) => ({
  id: i, x: (i * 137.508) % 100, y: (i * 53.1) % 100,
  size: 1.5 + (i % 4) * 0.9, dur: 12 + (i % 7) * 2.5, delay: (i * 0.6) % 8,
  dx: (i % 2 === 0 ? 1 : -1) * (6 + (i % 5) * 3), dy: -(8 + (i % 6) * 4),
}))

function DustMotes() {
  return (
    <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden" aria-hidden="true">
      {MOTES.map((m) => (
        <motion.div key={m.id} className="absolute rounded-full bg-white"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size, opacity: 0 }}
          animate={{ x: [0, m.dx, m.dx * 0.5, 0], y: [0, m.dy, m.dy * 1.6, m.dy * 0.8], opacity: [0, 0.22, 0.14, 0] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  id: i, x: 35 + (i * 43.7) % 45, size: 1 + (i % 3) * 0.8,
  dur: 1.0 + (i % 5) * 0.35, delay: (i * 0.55) % 5,
  drift: (i % 2 === 0 ? 1 : -1) * (4 + (i % 4) * 3),
}))

function Sparks() {
  return (
    <div className="absolute inset-0 z-[7] pointer-events-none overflow-hidden" aria-hidden="true">
      {SPARKS.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full"
          style={{ left: `${s.x}%`, bottom: '25%', width: s.size, height: s.size, background: 'radial-gradient(circle, #fff 0%, #f5c518 55%, transparent 100%)' }}
          animate={{ y: [0, -(80 + s.id * 12), -(130 + s.id * 8)], x: [0, s.drift, s.drift * 1.4], opacity: [0, 0.9, 0], scale: [0.5, 1, 0.3] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ── Motion variants ───────────────────────────────────────────────────────────

const cont  = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }
const item  = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.smooth } } }
const wCont = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }
const wAnim = { hidden: { opacity: 0, y: 44, skewY: 4 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: ease.smooth } } }

// ── Headline — word-by-word stagger, accent word in gold ─────────────────────

function AnimatedHeadline({ headline, accentWord }) {
  const words       = (headline || '').trim().split(/\s+/)
  const accentClean = (accentWord || '').trim().toLowerCase().replace(/[^a-z]/g, '')

  return (
    <motion.h1
      className="font-playfair font-bold leading-[1.06] mb-3"
      style={{ fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)' }}
      variants={wCont}
    >
      {words.map((word, i) => {
        const isAccent = accentClean && word.toLowerCase().replace(/[^a-z]/g, '') === accentClean
        return (
          <motion.span
            key={i}
            variants={wAnim}
            className={`inline-block mr-[0.18em] ${isAccent ? 'text-gold-500' : 'text-white'}`}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}

// ── Media background — video or image with Ken Burns ─────────────────────────

function MediaBackground({ mediaType, videoUrl, videoPoster, imageUrl, videoRef }) {
  if (mediaType === 'image' && imageUrl) {
    return (
      <motion.div
        className="absolute inset-0 w-full h-full z-0 bg-center bg-cover"
        style={{
          backgroundImage:  `url(${imageUrl})`,
          filter:           'brightness(1.05) contrast(1.22) saturate(1.20) sepia(0.08)',
          transform:        'scale(1.08)',
          transformOrigin:  'center center',
        }}
        animate={{ scale: [1.08, 1.14, 1.08] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    )
  }

  return (
    <motion.video
      ref={videoRef}
      src={videoUrl || '/videos/ship-breaking/ship-hero.mp4'}
      poster={videoPoster || '/images/gallery/ship-breaking/yard-wide-1.jpeg'}
      autoPlay muted loop playsInline preload="metadata"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{
        filter:          'brightness(1.05) contrast(1.22) saturate(1.20) sepia(0.08)',
        transform:       'scale(1.08)',
        transformOrigin: 'center center',
      }}
      animate={{ scale: [1.08, 1.14, 1.08] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ShipHeroSection({ shipHero = {} }) {
  const videoRef   = useRef(null)
  const [muted,    setMuted]    = useState(true)
  const [progress, setProgress] = useState(0)
  const { company } = usePage().props

  const mediaType   = shipHero.media_type     || 'video'
  const videoUrl    = shipHero.video_url      || '/videos/ship-breaking/ship-hero.mp4'
  const videoPoster = shipHero.video_poster   || '/images/gallery/ship-breaking/yard-wide-1.jpeg'
  const imageUrl    = shipHero.image_url      || ''
  const eyebrow     = shipHero.eyebrow        || 'East Queen Group · Est. 1982 · Chittagong, Bangladesh'
  const headline    = shipHero.headline       || 'GATEWAY TO GLOBAL BUSINESS'
  const accentWord  = shipHero.headline_accent || 'BUSINESS'
  const tagline     = shipHero.tagline        || 'Your Partner for Global Business & Sourcing'
  const body        = shipHero.body           || ''
  const cta1Text    = shipHero.cta1_text      || 'Explore Our Services'
  const cta1Url     = shipHero.cta1_url       || '/export'
  const badgeText   = shipHero.badge_text     || 'Trusted Globally · Est. 1982'

  // Track video playback progress for the bottom progress bar
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
    }
    video.addEventListener('timeupdate', onTime)
    return () => video.removeEventListener('timeupdate', onTime)
  }, [])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

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

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,rgba(4,10,24,.55) 0%,transparent 18%,transparent 52%,rgba(4,10,24,.96) 100%)' }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(105deg,rgba(4,10,24,.95) 0%,rgba(4,10,24,.82) 28%,rgba(4,10,24,.48) 52%,rgba(4,10,24,.12) 68%,transparent 82%)' }} />
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%,transparent 38%,rgba(0,0,0,.60) 100%)' }} />
      {/* Cinematic scan lines */}
      <div className="absolute inset-0 z-[4] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom,transparent 0px,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)', backgroundSize: '100% 4px' }} />

      <FilmGrain />
      <DustMotes />
      <Sparks />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-28">
        <motion.div className="w-full lg:w-[56%] xl:w-[50%]" variants={cont} initial="hidden" animate="visible">

          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-8 bg-gold-500 rounded-full shrink-0" />
            <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.28em]">{eyebrow}</span>
          </motion.div>

          {/* Headline */}
          <AnimatedHeadline headline={headline} accentWord={accentWord} />

          {/* Tagline */}
          {tagline && (
            <motion.p variants={item} className="text-white/60 text-sm sm:text-base font-semibold uppercase tracking-[0.18em] mb-6 max-w-[480px]">
              {tagline}
            </motion.p>
          )}

          {/* Body */}
          {body && (
            <motion.p variants={item} className="text-white/80 text-base sm:text-lg leading-relaxed mb-9 max-w-[490px]">
              {body}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            <Link
              href={cta1Url}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-lg text-sm tracking-wide transition-all duration-200 hover:shadow-gold-glow"
            >
              {cta1Text}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            {company?.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-gold-500/60 text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-200"
              >
                <Phone size={14} />
                Call Us
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Mute / unmute video audio */}
      {mediaType === 'video' && (
        <motion.button
          onClick={toggleMute}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }}
          className="absolute z-20 bottom-10 right-6 sm:right-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-colors duration-200 cursor-pointer select-none text-[11px] font-semibold tracking-wide"
          style={{
            borderColor: !muted ? 'rgba(245,197,24,0.5)' : 'rgba(255,255,255,0.18)',
            background:  !muted ? 'rgba(245,197,24,0.10)' : 'rgba(0,0,0,0.35)',
            color:       !muted ? '#f5c518' : 'rgba(255,255,255,0.72)',
          }}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {!muted ? (
            <>
              <Volume2 size={13} />
              <span className="hidden sm:inline">Sound On</span>
              <span className="hidden sm:flex items-end gap-[2px] h-3">
                {[1, 2, 3].map((i) => (
                  <motion.span key={i} className="w-[2px] rounded-full bg-current"
                    animate={{ height: ['3px', '10px', '5px', '10px', '3px'] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }} />
                ))}
              </span>
            </>
          ) : (
            <>
              <VolumeX size={13} />
              <span className="hidden sm:inline">Sound Off</span>
            </>
          )}
        </motion.button>
      )}

      {/* Trusted badge */}
      {badgeText && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="absolute z-20 bottom-10 left-6 sm:left-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/[0.14] bg-black/30 text-[11px] font-semibold text-white/65 tracking-wide select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          {badgeText}
        </motion.div>
      )}

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/40"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.38em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>

      {/* Cinematic video progress bar */}
      {mediaType === 'video' && (
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-20" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </section>
  )
}
