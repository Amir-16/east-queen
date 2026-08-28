import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ChevronDown, Volume2, VolumeX } from 'lucide-react'
import { ease } from '@/lib/motion'

/* HKC badge */
function HKCBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 280, damping: 20 }}
      className="absolute top-24 right-6 md:right-12 z-30 flex flex-col items-center"
    >
      <div className="w-16 h-16 rounded-full border-2 border-gold-500/60 bg-navy-950/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-gold-glow">
        <span className="font-mono font-black text-gold-500 text-[11px] leading-tight">HKC</span>
        <span className="text-white/40 text-[7px] tracking-widest uppercase">Certified</span>
      </div>
    </motion.div>
  )
}

/* Film grain canvas overlay */
function FilmGrain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function draw() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const grain = Math.random() * 20
        data[i] = grain; data[i + 1] = grain; data[i + 2] = grain; data[i + 3] = 12
      }
      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-overlay opacity-40" />
}

export default function ShipHeroSection() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted((p) => !p)
    }
  }

  return (
    <section className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden bg-navy-950">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
        poster="/images/ship-breaking/coastal-view.jpeg"
      >
        <source src="/videos/ship-breaking/yard-1.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 to-transparent z-[2]" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
        }}
      />

      {/* Film grain */}
      <FilmGrain />

      {/* HKC badge */}
      <HKCBadge />

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-24 left-6 md:left-12 z-30 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-20 section-container pb-16 sm:pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: ease.smooth }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-gold-500" />
          <span className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase">
            East Queen Shipping Ltd.
          </span>
        </motion.div>

        <h1 className="font-playfair font-bold text-display text-white leading-[1.04] mb-8 overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: ease.smooth }}
            className="block"
          >
            Ship Breaking
          </motion.span>
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: ease.smooth }}
            className="block text-gradient-gold"
          >
            & Recycling
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: ease.smooth }}
          className="max-w-xl text-white/55 text-lg leading-relaxed mb-10"
        >
          Bangladesh's premier ship recycling facility — combining industrial scale with rigorous
          international safety standards. Operating in{' '}
          <span className="text-white/80">Sitakunda, Chittagong</span> since 1982.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: ease.smooth }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-white font-bold text-sm px-7 py-3.5 rounded-lg tracking-wide transition-all duration-200 hover:shadow-gold-glow group"
          >
            Get a Quote
            <ChevronDown size={14} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
