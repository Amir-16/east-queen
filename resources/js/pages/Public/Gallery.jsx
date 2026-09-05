import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react'
import {
  motion, AnimatePresence, useInView, useReducedMotion,
  useScroll, useTransform, useSpring,
} from 'framer-motion'
import {
  Play, X, ChevronLeft, ChevronRight, ChevronDown,
  Film, ImageIcon, Grid2x2, ZoomIn, Layers,
} from 'lucide-react'
import { pageTransition, ease } from '@/lib/motion'
import PageHead from '@/components/public/ui/PageHead'
import PageHero from '@/components/public/ui/PageHero'

const INITIAL_VIDEO_COUNT = 6

function encodeVideoSrc(src) {
  return src.split('/').map(seg => encodeURIComponent(seg)).join('/')
}

const MEDIA_TABS = [
  { label: 'All',    value: 'all',    icon: Grid2x2  },
  { label: 'Photos', value: 'photos', icon: ImageIcon },
  { label: 'Videos', value: 'videos', icon: Film      },
]

/* ── lightbox slide variants ── */
const slideVariants = {
  enter: (d) => ({
    x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.87, filter: 'blur(8px)',
  }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit:   (d) => ({
    x: d > 0 ? '-35%' : '35%', opacity: 0, scale: 0.93, filter: 'blur(4px)',
  }),
}

/* ── ScrollProgress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[500] origin-left
                 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
    />
  )
}

/* ── AnimatedCounter ── */
function AnimatedCounter({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || value === 0) { setCount(value); return }
    const duration = 900
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setCount(Math.floor(eased * value))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return <span ref={ref} className="font-mono font-black text-slate-900 text-xl leading-none tabular-nums">{count}</span>
}

/* ── VideoThumbnail ── */
function VideoThumbnail({ src }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '400px' })
  const [ready, setReady] = useState(false)
  const encoded = encodeVideoSrc(src)

  return (
    <div ref={ref} className="absolute inset-0 bg-zinc-900">
      <div className={`absolute inset-0 bg-zinc-800 animate-pulse transition-opacity duration-300
                       ${ready ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
      {inView && (
        <video
          src={`${encoded}#t=2`}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={() => setReady(true)}
          className={`w-full h-full object-cover transition-opacity duration-500
                      ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}

/* ── ImageCard ── */
const ImageCard = memo(function ImageCard({ item, idx, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const isEager = idx < 4
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-24px' })

  return (
    <div ref={ref} className="break-inside-avoid mb-3">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: Math.min(idx * 0.045, 0.38), duration: 0.55, ease: ease.smooth }}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.2, ease: ease.smooth } }}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          className="group relative overflow-hidden rounded-2xl cursor-pointer
                     shadow-card hover:shadow-hover transition-shadow duration-300"
        >
          {/* skeleton */}
          <div className={`absolute inset-0 bg-slate-100 animate-pulse transition-opacity duration-500
                           ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

          <img
            src={item.src}
            alt={item.title ?? ''}
            loading={isEager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={isEager ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            className={`w-full object-cover transition-all duration-700 group-hover:scale-108
                        ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* caption */}
          <div className="absolute inset-x-0 bottom-0 p-3.5 translate-y-3 opacity-0
                          group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white/90 text-[11px] leading-snug line-clamp-2">{item.caption}</p>
          </div>

          {/* zoom icon */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full
                          bg-black/40 backdrop-blur-sm border border-white/25
                          flex items-center justify-center text-white
                          opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                          transition-all duration-250">
            <ZoomIn size={13} strokeWidth={2} />
          </div>

          {/* index badge */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            <span className="px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-sm
                             border border-white/15 text-white/65 text-[10px] font-mono font-bold">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          {/* corner L-bracket accent */}
          <div className="absolute top-0 left-0 w-7 h-[2px] bg-gold-500
                          scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-350" />
          <div className="absolute top-0 left-0 w-[2px] h-7 bg-gold-500
                          scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-350" />
        </motion.div>
      </motion.div>
    </div>
  )
})

/* ── VideoCard ── */
const VideoCard = memo(function VideoCard({ item, idx, onClick, categoryMeta }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.91 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: Math.min(idx * 0.065, 0.45), duration: 0.55, ease: ease.smooth }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.018, transition: { duration: 0.22 } }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer
                   shadow-[0_4px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.65)]
                   transition-shadow duration-300 bg-zinc-900"
      >
        <VideoThumbnail src={item.src} />

        <div className="absolute inset-0 bg-gradient-to-t
                        from-black/90 via-black/28 to-black/5
                        group-hover:from-black/95 group-hover:via-black/50
                        transition-all duration-350" />

        {/* play button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border-2 border-white/35"
            />
            <div className="relative w-16 h-16 rounded-full
                           bg-gold-500/85 backdrop-blur-sm border-2 border-gold-400/50
                           flex items-center justify-center
                           group-hover:bg-gold-500 group-hover:scale-110
                           transition-all duration-250 shadow-gold-glow">
              <Play size={22} fill="white" className="text-white ml-1" />
            </div>
          </div>
        </div>

        {/* category badge */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gold-500 rounded-lg
                           text-white text-[10px] font-bold uppercase tracking-widest shadow-gold-glow">
            <Film size={9} />
            {categoryMeta[item.category]?.label ?? item.category}
          </span>
        </div>

        {/* caption */}
        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0
                          group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white/85 text-xs leading-snug line-clamp-2">{item.caption}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
})

/* ── SectionHeader ── */
function SectionHeader({ eyebrow, title, count, dark }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, ease: ease.smooth }}
      className="flex items-center gap-4 mb-10"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.4, ease: ease.smooth }}
          className="w-1 h-9 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"
        />
        <div>
          <p className={`text-gold-500 text-[10px] font-bold tracking-[0.28em] uppercase leading-none mb-0.5
                         ${dark ? 'text-gold-400/70' : ''}`}>
            {eyebrow}
          </p>
          <h2 className={`font-playfair font-bold text-2xl leading-tight
                           ${dark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h2>
        </div>
        {count != null && (
          <span className={`font-mono text-sm ${dark ? 'text-white/30' : 'text-slate-400'}`}>
            ({count})
          </span>
        )}
      </div>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.6, ease: ease.smooth }}
        className={`flex-1 h-px ${dark
          ? 'bg-gradient-to-r from-gold-500/30 via-white/8 to-transparent'
          : 'bg-gradient-to-r from-gold-300/70 via-slate-200 to-transparent'}`}
      />
    </motion.div>
  )
}

/* ── ImageLightbox ── */
function ImageLightbox({ images, index, dir, onNav, onJump, onClose, categoryMeta }) {
  const touchStart = useRef(null)

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onNav, onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const img = images[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex flex-col bg-black/97 backdrop-blur-2xl"
      onClick={onClose}
      onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchStart.current === null) return
        const dx = e.changedTouches[0].clientX - touchStart.current
        if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1)
        touchStart.current = null
      }}
    >
      {/* top-left meta */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="absolute top-5 left-5 z-20 flex items-center gap-2.5 pointer-events-none select-none"
      >
        <span className="px-2.5 py-1 bg-gold-500/15 border border-gold-500/30 rounded-full
                         text-gold-400 text-[10px] font-semibold uppercase tracking-widest">
          {categoryMeta[img.category]?.label ?? img.category}
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="font-mono text-sm">
          <span className="text-white/75 font-bold">{index + 1}</span>
          <span className="text-white/30"> / {images.length}</span>
        </span>
      </motion.div>

      {/* close */}
      <motion.div
        className="absolute top-4 right-4 z-20 flex items-center gap-3"
        onClick={e => e.stopPropagation()}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden sm:block text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase select-none"
        >
          esc
        </motion.span>
        <motion.button
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.18 }}
          whileHover={{ scale: 1.12, rotate: 90, transition: { type: 'spring', stiffness: 500, damping: 18 } }}
          whileTap={{ scale: 0.85 }}
          onClick={onClose}
          aria-label="Close (Escape)"
          className="w-[52px] h-[52px] rounded-full bg-white/8 border-2 border-white/20 backdrop-blur-md
                     flex items-center justify-center text-white
                     hover:bg-gold-500 hover:border-gold-500/60
                     transition-colors duration-200 shadow-2xl"
        >
          <X size={22} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      {/* image area */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden px-16 md:px-24 relative"
        onClick={e => e.stopPropagation()}
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1, x: -4, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNav(-1)}
          className="absolute left-3 md:left-5 z-20 w-12 h-12 rounded-full
                     border border-white/20 bg-white/6 backdrop-blur-sm
                     flex items-center justify-center text-white/65
                     hover:text-white hover:border-white/40 hover:bg-white/12 transition-colors"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </motion.button>

        <div className="relative w-full max-w-5xl flex items-center justify-center">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={index}
              src={img.src}
              alt={img.title ?? ''}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.32, 0, 0.24, 1] }}
              className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl select-none"
              draggable={false}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute -bottom-8 left-0 right-0 text-center
                         text-white/40 text-xs pointer-events-none"
            >
              {img.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1, x: 4, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNav(1)}
          className="absolute right-3 md:right-5 z-20 w-12 h-12 rounded-full
                     border border-white/20 bg-white/6 backdrop-blur-sm
                     flex items-center justify-center text-white/65
                     hover:text-white hover:border-white/40 hover:bg-white/12 transition-colors"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </motion.button>
      </div>

      {/* thumbnail strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="shrink-0 px-6 py-5 flex gap-2 justify-center overflow-x-auto"
        onClick={e => e.stopPropagation()}
      >
        {images.map((im, i) => (
          <motion.button
            key={im.id}
            onClick={() => i !== index && onJump(i)}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View photo ${i + 1}`}
            className={[
              'shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200',
              i === index
                ? 'border-gold-400 opacity-100 scale-110'
                : 'border-transparent opacity-30 hover:opacity-60',
            ].join(' ')}
          >
            <img
              src={im.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── VideoModal ── */
function VideoModal({ videos, index, onClose, onNavigate }) {
  const current  = videos[index]
  const videoRef = useRef(null)
  const touchStart = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight' && index < videos.length - 1) onNavigate(index + 1)
    if (e.key === 'ArrowLeft'  && index > 0)                 onNavigate(index - 1)
    if (e.key === ' ') {
      e.preventDefault()
      const v = videoRef.current
      if (v) v.paused ? v.play() : v.pause()
    }
  }, [index, videos.length, onClose, onNavigate])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex flex-col bg-black/98 backdrop-blur-xl"
      onClick={onClose}
      onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchStart.current === null) return
        const dx = e.changedTouches[0].clientX - touchStart.current
        if (Math.abs(dx) > 50) {
          if (dx < 0 && index < videos.length - 1) onNavigate(index + 1)
          if (dx > 0 && index > 0)                 onNavigate(index - 1)
        }
        touchStart.current = null
      }}
    >
      {/* top-left meta */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="absolute top-5 left-5 z-20 flex items-center gap-2.5 pointer-events-none select-none"
      >
        <span className="flex items-center gap-1.5 px-3 py-1 bg-gold-500 rounded-lg
                         text-white text-[10px] font-bold uppercase tracking-widest">
          <Film size={9} /> Video
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="font-mono text-sm">
          <span className="text-white/75 font-bold">{index + 1}</span>
          <span className="text-white/30"> / {videos.length}</span>
        </span>
      </motion.div>

      {/* close */}
      <motion.div
        className="absolute top-4 right-4 z-20 flex items-center gap-3"
        onClick={e => e.stopPropagation()}
      >
        <motion.button
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.18 }}
          whileHover={{ scale: 1.12, rotate: 90, transition: { type: 'spring', stiffness: 500, damping: 18 } }}
          whileTap={{ scale: 0.85 }}
          onClick={onClose}
          aria-label="Close (Escape)"
          className="w-[52px] h-[52px] rounded-full bg-white/8 border-2 border-white/20 backdrop-blur-md
                     flex items-center justify-center text-white
                     hover:bg-gold-500 hover:border-gold-500/60
                     transition-colors duration-200"
        >
          <X size={22} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-4 py-2 min-h-0">
        <motion.button
          whileHover={{ scale: 1.1, x: -4, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.88 }}
          onClick={e => { e.stopPropagation(); if (index > 0) onNavigate(index - 1) }}
          className={`flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/6
                     flex items-center justify-center text-white/65
                     hover:text-white hover:bg-white/12 transition-colors mr-4
                     ${index === 0 ? 'opacity-25 pointer-events-none' : ''}`}
        >
          <ChevronLeft size={22} />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            initial={{ scale: 0.88, opacity: 0, filter: 'blur(6px)' }}
            animate={{ scale: 1,    opacity: 1, filter: 'blur(0px)' }}
            exit={{    scale: 0.9,  opacity: 0, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative w-full max-w-5xl"
            onClick={e => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              key={current.src}
              src={current.src}
              controls
              autoPlay
              playsInline
              className="w-full rounded-2xl bg-black shadow-2xl"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            />
            {current.caption && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-4 flex items-start gap-3"
              >
                <div className="w-0.5 self-stretch bg-gold-500 rounded-full flex-shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">{current.caption}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, x: 4, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.88 }}
          onClick={e => { e.stopPropagation(); if (index < videos.length - 1) onNavigate(index + 1) }}
          className={`flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/6
                     flex items-center justify-center text-white/65
                     hover:text-white hover:bg-white/12 transition-colors ml-4
                     ${index === videos.length - 1 ? 'opacity-25 pointer-events-none' : ''}`}
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>

      {videos.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex-shrink-0 pb-5 px-6 flex gap-2 overflow-x-auto justify-center"
        >
          {videos.map((v, i) => (
            <motion.button
              key={v.id}
              onClick={e => { e.stopPropagation(); onNavigate(i) }}
              whileHover={{ scale: 1.1, y: -3 }}
              className={[
                'relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200',
                i === index
                  ? 'border-gold-400 opacity-100'
                  : 'border-transparent opacity-30 hover:opacity-60',
              ].join(' ')}
            >
              <video src={`${encodeVideoSrc(v.src)}#t=2`} preload="metadata" muted playsInline
                className="w-full h-full object-cover" />
              {i === index && <div className="absolute inset-0 bg-gold-500/20" />}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

/* ── Gallery page ── */
export default function Gallery({ gallery = [], categories = [] }) {
  const [mediaType,      setMediaType]      = useState('all')
  const [activeCat,      setActiveCat]      = useState('all')
  const [lb,             setLb]             = useState({ open: false, index: 0, dir: 0 })
  const [videoIdx,       setVideoIdx]       = useState(-1)
  const [expandedGroups, setExpandedGroups] = useState({})

  const categoryMeta = useMemo(
    () => Object.fromEntries(categories.map(c => [c.slug, { label: c.label }])),
    [categories],
  )
  const allCats = useMemo(() => categories.map(c => c.slug), [categories])
  const catTabs = useMemo(() => [
    { label: 'All', value: 'all' },
    ...categories.map(c => ({ label: c.label, value: c.slug })),
  ], [categories])

  const allImages = useMemo(() => {
    const seen = new Set()
    return gallery.filter(i => {
      if (i.type === 'video') return false
      if (seen.has(i.src)) return false
      seen.add(i.src)
      return true
    })
  }, [gallery])

  const allVideos = useMemo(() => {
    const seen = new Set()
    return gallery.filter(i => {
      if (i.type !== 'video') return false
      if (seen.has(i.src)) return false
      seen.add(i.src)
      return true
    })
  }, [gallery])

  const filteredImages = useMemo(() =>
    mediaType === 'videos'
      ? []
      : activeCat === 'all'
        ? allImages
        : allImages.filter(i => i.category === activeCat),
    [mediaType, activeCat, allImages],
  )

  const filteredVideos = useMemo(() =>
    mediaType === 'photos'
      ? []
      : activeCat === 'all'
        ? allVideos
        : allVideos.filter(i => i.category === activeCat),
    [mediaType, activeCat, allVideos],
  )

  const imageGroups = useMemo(() => {
    const cats = activeCat === 'all' ? allCats : [activeCat]
    return cats
      .map(cat => ({ cat, items: filteredImages.filter(i => i.category === cat) }))
      .filter(g => g.items.length > 0)
  }, [filteredImages, activeCat, allCats])

  const videoGroups = useMemo(() => {
    const cats = activeCat === 'all' ? allCats : [activeCat]
    return cats
      .map(cat => ({ cat, items: filteredVideos.filter(i => i.category === cat) }))
      .filter(g => g.items.length > 0)
  }, [filteredVideos, activeCat, allCats])

  const openLb  = useCallback((i) => setLb({ open: true, index: i, dir: 0 }), [])
  const closeLb = useCallback(() => setLb(s => ({ ...s, open: false })), [])
  const navLb   = useCallback((d) => {
    setLb(s => ({
      open:  true,
      dir:   d,
      index: (s.index + d + filteredImages.length) % filteredImages.length,
    }))
  }, [filteredImages.length])
  const jumpLb  = useCallback((i) => {
    setLb(s => ({ open: true, index: i, dir: i > s.index ? 1 : -1 }))
  }, [])

  const reset = useCallback(() => {
    setLb(s => ({ ...s, open: false }))
    setVideoIdx(-1)
  }, [])

  const noContent = imageGroups.length === 0 && videoGroups.length === 0

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHead title="Gallery" />
      <ScrollProgress />

      <PageHero
        title="Our Gallery"
        subtitle={`${allImages.length} photos · ${allVideos.length} videos — a visual journey through our operations, facilities, and people.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        image="/images/shipping/tristar-prosperity.jpeg"
      />

      {/* ── IMAGES section ── */}
      <section className="section-padding bg-white">
        <div className="section-container">

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="flex flex-wrap items-center gap-6 mb-10"
          >
            {[
              { icon: ImageIcon, val: allImages.length,   label: 'Photos',     cls: 'text-slate-600' },
              { icon: Film,      val: allVideos.length,   label: 'Videos',     cls: 'text-gold-500'  },
              { icon: Layers,    val: categories.length,  label: 'Categories', cls: 'text-slate-400' },
            ].map(({ icon: Icon, val, label, cls }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={15} className={cls} />
                <AnimatedCounter value={val} />
                <span className="text-slate-400 text-sm">{label}</span>
                <span className="text-slate-200 last:hidden">·</span>
              </div>
            ))}
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.38 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 sm:mb-12"
          >
            {/* Media type tabs */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
              {MEDIA_TABS.map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => { setMediaType(value); reset() }}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg
                              text-sm font-semibold transition-colors duration-200
                              ${mediaType === value ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {mediaType === value && (
                    <motion.span
                      layoutId="media-pill"
                      className="absolute inset-0 bg-stone-800 rounded-lg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Icon size={13} />
                    {label}
                    <span className="font-mono text-[10px] opacity-55">
                      ({value === 'photos'
                        ? allImages.length
                        : value === 'videos'
                          ? allVideos.length
                          : gallery.length})
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-slate-200" />

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {catTabs.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => { setActiveCat(value); reset() }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide
                              transition-colors duration-200
                              ${activeCat === value
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                >
                  {activeCat === value && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 bg-gold-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mediaType}-${activeCat}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {imageGroups.length > 0 && (
                <div className="mb-6">
                  <SectionHeader
                    eyebrow="Visual Archive"
                    title="Photos"
                    count={filteredImages.length}
                  />

                  <div className="space-y-12">
                    {imageGroups.map(({ cat, items }, gi) => (
                      <ImageCategoryGroup
                        key={cat}
                        cat={cat}
                        items={items}
                        gi={gi}
                        categoryMeta={categoryMeta}
                        filteredImages={filteredImages}
                        openLb={openLb}
                      />
                    ))}
                  </div>
                </div>
              )}

              {noContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24"
                >
                  <Grid2x2 size={48} className="text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg font-medium">No items found</p>
                  <p className="text-slate-300 text-sm mt-1">Try a different filter combination</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── VIDEOS section ── */}
      <AnimatePresence>
        {videoGroups.length > 0 && mediaType !== 'photos' && (
          <motion.section
            key={`videos-${mediaType}-${activeCat}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="section-padding relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F0F0F 0%, #141414 50%, #111111 100%)' }}
          >
            {/* subtle dot-grid texture */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                   backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                   backgroundSize: '28px 28px',
                 }} />

            {/* top gold line */}
            <div className="absolute top-0 left-0 right-0 h-px
                            bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

            {/* bottom gold line */}
            <div className="absolute bottom-0 left-0 right-0 h-px
                            bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="relative section-container">
              <SectionHeader
                eyebrow="Live Footage"
                title="Videos"
                count={filteredVideos.length}
                dark
              />

              <div className="space-y-12">
                {videoGroups.map(({ cat, items }, gi) => (
                  <div key={cat}>
                    <CategoryRowHeader
                      cat={cat}
                      label={categoryMeta[cat]?.label ?? cat}
                      count={items.length}
                      delay={gi * 0.06}
                      dark
                    />

                    {(() => {
                      const isExpanded = !!expandedGroups[cat]
                      const visible    = isExpanded ? items : items.slice(0, INITIAL_VIDEO_COUNT)
                      const remaining  = items.length - INITIAL_VIDEO_COUNT
                      return (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {visible.map((item, idx) => {
                              const globalIdx = filteredVideos.indexOf(item)
                              return (
                                <VideoCard
                                  key={item.id}
                                  item={item}
                                  idx={idx}
                                  onClick={() => setVideoIdx(globalIdx)}
                                  categoryMeta={categoryMeta}
                                />
                              )
                            })}
                          </div>
                          {remaining > 0 && !isExpanded && (
                            <ShowMoreButton
                              count={remaining}
                              onShow={() => setExpandedGroups(p => ({ ...p, [cat]: true }))}
                            />
                          )}
                        </>
                      )
                    })()}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lb.open && (
          <ImageLightbox
            images={filteredImages}
            index={lb.index}
            dir={lb.dir}
            onNav={navLb}
            onJump={jumpLb}
            onClose={closeLb}
            categoryMeta={categoryMeta}
          />
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoIdx >= 0 && (
          <VideoModal
            videos={filteredVideos}
            index={videoIdx}
            onClose={() => setVideoIdx(-1)}
            onNavigate={setVideoIdx}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── small extracted helpers ── */
function ImageCategoryGroup({ cat, items, gi, categoryMeta, filteredImages, openLb }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: gi * 0.06, duration: 0.4 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
        <span className="text-slate-700 font-semibold text-sm">
          {categoryMeta[cat]?.label ?? cat}
        </span>
        <span className="font-mono text-xs text-slate-400">({items.length})</span>
        <div className="flex-1 h-px bg-slate-100" />
      </motion.div>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
        {items.map((item, idx) => {
          const globalIdx = filteredImages.indexOf(item)
          return (
            <ImageCard
              key={item.id}
              item={item}
              idx={idx}
              onClick={() => openLb(globalIdx)}
            />
          )
        })}
      </div>
    </div>
  )
}

function CategoryRowHeader({ cat, label, count, delay, dark }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.38 }}
      className="flex items-center gap-3 mb-5"
    >
      <Film size={13} className="text-gold-500 shrink-0" />
      <span className={`font-semibold text-sm ${dark ? 'text-white/55' : 'text-slate-700'}`}>{label}</span>
      <span className={`font-mono text-xs ${dark ? 'text-white/25' : 'text-slate-400'}`}>({count})</span>
      <div className={`flex-1 h-px ${dark ? 'bg-white/10' : 'bg-slate-100'}`} />
    </motion.div>
  )
}

function ShowMoreButton({ count, onShow }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.12 }}
      className="flex justify-center mt-6"
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -3, boxShadow: '0 10px 30px rgba(226,31,47,0.22)' }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        onClick={onShow}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full
                   border border-gold-500/40 bg-gold-500/10 text-gold-400
                   text-sm font-semibold hover:bg-gold-500/18 transition-colors"
      >
        <ChevronDown size={15} strokeWidth={2.5} />
        Show {count} more
      </motion.button>
    </motion.div>
  )
}
