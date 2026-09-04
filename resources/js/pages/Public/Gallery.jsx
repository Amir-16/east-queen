import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import {
  Play, X, ChevronLeft, ChevronRight, ChevronDown,
  Film, ImageIcon, Grid2x2, ZoomIn, Layers,
} from 'lucide-react'
import { pageTransition, ease } from '@/lib/motion'
import PageHead from '@/components/public/ui/PageHead'
import PageHero from '@/components/public/ui/PageHero'

/* ── constants ── */
const CATEGORY_META = {
  operations: { label: 'Operations'  },
  products:   { label: 'Products'    },
  facilities: { label: 'Facilities'  },
}

const ALL_CATS = ['operations', 'products', 'facilities']

const INITIAL_VIDEO_COUNT = 6

function encodeVideoSrc(src) {
  return src.split('/').map(seg => encodeURIComponent(seg)).join('/')
}

const MEDIA_TABS = [
  { label: 'All',    value: 'all',    icon: Grid2x2  },
  { label: 'Photos', value: 'photos', icon: ImageIcon },
  { label: 'Videos', value: 'videos', icon: Film      },
]

const CAT_TABS = [
  { label: 'All',        value: 'all'        },
  { label: 'Operations', value: 'operations' },
  { label: 'Products',   value: 'products'   },
  { label: 'Facilities', value: 'facilities' },
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

/* ── VideoThumbnail ── */
function VideoThumbnail({ src }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '400px' })
  const [ready, setReady] = useState(false)
  const encoded = encodeVideoSrc(src)

  return (
    <div ref={ref} className="absolute inset-0 bg-navy-950">
      <div className={`absolute inset-0 bg-navy-800 animate-pulse transition-opacity duration-300
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
const ImageCard = memo(function ImageCard({ item, idx, floatDelay, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const reduced = useReducedMotion()
  const isEager = idx < 4

  return (
    <div className="break-inside-avoid mb-3">
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ delay: Math.min(idx * 0.055, 0.45), duration: 0.52, ease: ease.smooth }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 3.2 + floatDelay, ease: 'easeInOut', delay: floatDelay }}
          whileHover={{ scale: 1.025, y: -6, transition: { duration: 0.22, ease: ease.smooth } }}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          className="group relative overflow-hidden rounded-2xl cursor-pointer
                     shadow-card hover:shadow-hover transition-shadow duration-300"
        >
          <div className={`absolute inset-0 bg-slate-100 animate-pulse transition-opacity duration-500
                           ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

          <img
            src={item.src}
            alt={item.title ?? ''}
            loading={isEager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={isEager ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            className={`w-full object-cover transition-all duration-700 group-hover:scale-110
                        ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

          <div className="absolute inset-x-0 bottom-0 p-3.5
                          translate-y-3 opacity-0
                          group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-300">
            <p className="text-white/90 text-[11px] leading-snug line-clamp-2">{item.caption}</p>
          </div>

          <div className="absolute top-3 right-3 w-8 h-8 rounded-full
                          bg-black/35 backdrop-blur-sm border border-white/20
                          flex items-center justify-center text-white
                          opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                          transition-all duration-300">
            <ZoomIn size={13} strokeWidth={2} />
          </div>

          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm
                             border border-white/15 text-white/60 text-[10px] font-mono font-bold">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="absolute top-0 right-0 w-0 h-0
                          border-t-[36px] border-r-[36px]
                          border-t-transparent border-r-transparent
                          group-hover:border-r-gold-500/50
                          transition-all duration-500" />
        </motion.div>
      </motion.div>
    </div>
  )
})

/* ── VideoCard ── */
const VideoCard = memo(function VideoCard({ item, idx, floatDelay, onClick }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(idx * 0.06, 0.48), duration: 0.55, ease: ease.smooth }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4 + floatDelay, ease: 'easeInOut', delay: floatDelay }}
        whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.24 } }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer
                   shadow-card hover:shadow-hover transition-shadow duration-300 bg-navy-950"
      >
        <VideoThumbnail src={item.src} />

        <div className="absolute inset-0 bg-gradient-to-t
                        from-black/90 via-black/30 to-black/5
                        group-hover:from-black/95 group-hover:via-black/50
                        transition-all duration-400" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.55, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border-2 border-white/40"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="relative w-16 h-16 rounded-full
                         bg-gold-500/80 backdrop-blur-sm border-2 border-gold-400/60
                         flex items-center justify-center
                         group-hover:bg-gold-500 group-hover:scale-110
                         transition-all duration-300 shadow-gold-glow"
            >
              <Play size={22} fill="white" className="text-white ml-1" />
            </motion.div>
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gold-500 rounded-lg
                           text-white text-[10px] font-bold uppercase tracking-widest shadow-gold-glow">
            <Film size={9} />
            {CATEGORY_META[item.category]?.label ?? item.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-black/55 backdrop-blur-sm rounded-md
                           text-white/75 text-[10px] font-semibold tracking-wider">VIDEO</span>
        </div>

        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4
                          translate-y-2 opacity-0
                          group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-300">
            <p className="text-white/85 text-xs leading-snug line-clamp-2">{item.caption}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
})

/* ── ImageLightbox ── */
function ImageLightbox({ images, index, dir, onNav, onJump, onClose }) {
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
      className="fixed inset-0 z-[200] flex flex-col bg-black/96 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="absolute top-5 left-5 z-20 flex items-center gap-2.5 pointer-events-none select-none"
      >
        <span className="px-2.5 py-1 bg-gold-500/15 border border-gold-500/30 rounded-full
                         text-gold-400 text-[10px] font-semibold uppercase tracking-widest">
          {CATEGORY_META[img.category]?.label ?? img.category}
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="font-mono text-sm">
          <span className="text-white/75 font-bold">{index + 1}</span>
          <span className="text-white/30"> / {images.length}</span>
        </span>
      </motion.div>

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
          className="w-[52px] h-[52px] rounded-full
                     bg-black/60 border-2 border-white/20 backdrop-blur-md
                     flex items-center justify-center text-white
                     hover:bg-gold-500 hover:border-gold-500/60
                     transition-colors duration-200 shadow-2xl shadow-black/50"
        >
          <X size={22} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <div className="flex-1 flex items-center justify-center overflow-hidden px-16 md:px-24 relative"
           onClick={e => e.stopPropagation()}>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1, x: -4, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNav(-1)}
          className="absolute left-3 md:left-5 z-20 w-12 h-12 rounded-full
                     border border-white/20 bg-white/5 backdrop-blur-sm
                     flex items-center justify-center text-white/65
                     hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors"
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
              transition={{ duration: 0.4, ease: [0.32, 0, 0.24, 1] }}
              className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl select-none"
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
                         text-white/45 text-xs pointer-events-none"
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
                     border border-white/20 bg-white/5 backdrop-blur-sm
                     flex items-center justify-center text-white/65
                     hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </motion.button>
      </div>

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
                : 'border-transparent opacity-30 hover:opacity-65',
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')     onClose()
    if (e.key === 'ArrowRight' && index < videos.length - 1) onNavigate(index + 1)
    if (e.key === 'ArrowLeft'  && index > 0)                  onNavigate(index - 1)
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
      className="fixed inset-0 z-[300] flex flex-col bg-black/97 backdrop-blur-xl"
      onClick={onClose}
    >
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
          className="w-[52px] h-[52px] rounded-full
                     bg-black/60 border-2 border-white/20 backdrop-blur-md
                     flex items-center justify-center text-white
                     hover:bg-gold-500 hover:border-gold-500/60
                     transition-colors duration-200 shadow-2xl shadow-black/50"
        >
          <X size={22} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-4 py-2 min-h-0">
        <motion.button
          whileHover={{ scale: 1.1, x: -4, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.88 }}
          onClick={e => { e.stopPropagation(); if (index > 0) onNavigate(index - 1) }}
          className={`flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/5
                     flex items-center justify-center text-white/65
                     hover:text-white hover:bg-white/10 transition-colors mr-4
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
          className={`flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/5
                     flex items-center justify-center text-white/65
                     hover:text-white hover:bg-white/10 transition-colors ml-4
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
                  : 'border-transparent opacity-30 hover:opacity-65',
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
export default function Gallery({ gallery = [] }) {
  const [mediaType,  setMediaType]  = useState('all')
  const [activeCat,  setActiveCat]  = useState('all')
  const [lb,         setLb]         = useState({ open: false, index: 0, dir: 0 })
  const [videoIdx,   setVideoIdx]   = useState(-1)
  const [expandedGroups, setExpandedGroups] = useState({})

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
    const cats = activeCat === 'all' ? ALL_CATS : [activeCat]
    return cats
      .map(cat => ({ cat, items: filteredImages.filter(i => i.category === cat) }))
      .filter(g => g.items.length > 0)
  }, [filteredImages, activeCat])

  const videoGroups = useMemo(() => {
    const cats = activeCat === 'all' ? ALL_CATS : [activeCat]
    return cats
      .map(cat => ({ cat, items: filteredVideos.filter(i => i.category === cat) }))
      .filter(g => g.items.length > 0)
  }, [filteredVideos, activeCat])

  const openLb = useCallback((i) => setLb({ open: true, index: i, dir: 0 }), [])
  const closeLb = useCallback(() => setLb(s => ({ ...s, open: false })), [])
  const navLb   = useCallback((d) => {
    setLb(s => ({
      open:  true,
      dir:   d,
      index: (s.index + d + filteredImages.length) % filteredImages.length,
    }))
  }, [filteredImages.length])

  const jumpLb = useCallback((i) => {
    setLb(s => ({ open: true, index: i, dir: i > s.index ? 1 : -1 }))
  }, [])

  const reset = useCallback(() => { setLb(s => ({ ...s, open: false })); setVideoIdx(-1) }, [])

  const noContent = imageGroups.length === 0 && videoGroups.length === 0

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHead title="Gallery" />
      <PageHero
        title="Our Gallery"
        subtitle={`${allImages.length} photos · ${allVideos.length} videos — a visual journey through our operations, facilities, and people.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        image="/images/shipping/tristar-prosperity.jpeg"
      />

      {/* IMAGES section */}
      <section className="section-padding bg-white">
        <div className="section-container">

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="flex flex-wrap items-center gap-6 mb-10"
          >
            {[
              { Icon: ImageIcon, val: allImages.length, lbl: 'Photos',     cls: 'text-slate-700' },
              { Icon: Film,      val: allVideos.length, lbl: 'Videos',     cls: 'text-gold-500'  },
              { Icon: Layers,    val: 3,                lbl: 'Categories', cls: 'text-slate-400' },
            ].map(({ Icon, val, lbl, cls }) => (
              <div key={lbl} className="flex items-center gap-2.5">
                <Icon size={15} className={cls} />
                <span className="font-mono font-black text-slate-900 text-xl leading-none">{val}</span>
                <span className="text-slate-400 text-sm">{lbl}</span>
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
                      className="absolute inset-0 bg-navy-900 rounded-lg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Icon size={13} />
                    {label}
                    <span className="font-mono text-[10px] opacity-55">
                      ({value === 'photos' ? allImages.length : value === 'videos' ? allVideos.length : gallery.length})
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-slate-200" />

            <div className="flex flex-wrap gap-1.5">
              {CAT_TABS.map(({ label, value }) => (
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {imageGroups.length > 0 && (
                <div className="mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42 }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-9 bg-gradient-to-b from-gold-500 to-gold-300 rounded-full" />
                      <div>
                        <p className="text-gold-500 text-[10px] font-bold tracking-[0.28em] uppercase leading-none mb-0.5">
                          Visual Archive
                        </p>
                        <h2 className="font-playfair font-bold text-2xl text-slate-900 leading-tight">Photos</h2>
                      </div>
                      <span className="font-mono text-sm text-slate-400">({filteredImages.length})</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold-300/60 via-slate-200 to-transparent" />
                  </motion.div>

                  <div className="space-y-12">
                    {imageGroups.map(({ cat, items }, gi) => (
                      <div key={cat}>
                        <motion.div
                          initial={{ opacity: 0, x: -18 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: gi * 0.08, duration: 0.4 }}
                          className="flex items-center gap-3 mb-5"
                        >
                          <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                          <span className="text-slate-700 font-semibold text-sm">
                            {CATEGORY_META[cat]?.label ?? cat}
                          </span>
                          <span className="font-mono text-xs text-slate-400">({items.length})</span>
                          <div className="flex-1 h-px bg-slate-100" />
                        </motion.div>

                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                          {items.map((item, idx) => {
                            const globalIdx = filteredImages.indexOf(item)
                            const floatDelay = (globalIdx * 0.38) % 3.5
                            return (
                              <ImageCard
                                key={item.id}
                                item={item}
                                idx={idx}
                                floatDelay={floatDelay}
                                onClick={() => openLb(globalIdx)}
                              />
                            )
                          })}
                        </div>
                      </div>
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

      {/* VIDEOS section */}
      <AnimatePresence>
        {videoGroups.length > 0 && mediaType !== 'photos' && (
          <motion.section
            key={`videos-${mediaType}-${activeCat}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-navy-950 section-padding relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

            <div className="relative section-container">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42 }}
                className="flex items-center gap-4 mb-12"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-9 bg-gradient-to-b from-gold-500 to-gold-300 rounded-full" />
                  <div>
                    <p className="text-gold-500/65 text-[10px] font-bold tracking-[0.28em] uppercase leading-none mb-0.5">
                      Live Footage
                    </p>
                    <h2 className="font-playfair font-bold text-2xl text-white leading-tight">Videos</h2>
                  </div>
                  <span className="font-mono text-sm text-white/30">({filteredVideos.length})</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 via-white/10 to-transparent" />
              </motion.div>

              <div className="space-y-12">
                {videoGroups.map(({ cat, items }, gi) => (
                  <div key={cat}>
                    <motion.div
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08, duration: 0.4 }}
                      className="flex items-center gap-3 mb-5"
                    >
                      <Film size={13} className="text-gold-500 shrink-0" />
                      <span className="text-white/55 font-semibold text-sm">
                        {CATEGORY_META[cat]?.label ?? cat}
                      </span>
                      <span className="font-mono text-xs text-white/25">({items.length})</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </motion.div>

                    {(() => {
                      const isExpanded = !!expandedGroups[cat]
                      const visible = isExpanded ? items : items.slice(0, INITIAL_VIDEO_COUNT)
                      const remaining = items.length - INITIAL_VIDEO_COUNT
                      return (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {visible.map((item, idx) => {
                              const globalIdx = filteredVideos.indexOf(item)
                              const floatDelay = (idx * 0.45) % 3
                              return (
                                <VideoCard
                                  key={item.id}
                                  item={item}
                                  idx={idx}
                                  floatDelay={floatDelay}
                                  onClick={() => setVideoIdx(globalIdx)}
                                />
                              )
                            })}
                          </div>
                          {remaining > 0 && !isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.15 }}
                              className="flex justify-center mt-6"
                            >
                              <motion.button
                                whileHover={{ scale: 1.04, y: -2, boxShadow: '0 8px 24px rgba(245,158,11,0.25)' }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                                onClick={() => setExpandedGroups(p => ({ ...p, [cat]: true }))}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full
                                           border border-gold-500/40 bg-gold-500/10 text-gold-400
                                           text-sm font-semibold hover:bg-gold-500/20 transition-colors"
                              >
                                <motion.span
                                  animate={{ y: [0, 2, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                                  className="flex"
                                >
                                  <ChevronDown size={15} strokeWidth={2.5} />
                                </motion.span>
                                Show {remaining} more
                              </motion.button>
                            </motion.div>
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
