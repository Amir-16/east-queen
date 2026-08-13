import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import {
  Play, X, ChevronLeft, ChevronRight,
  Film, ImageIcon, Grid2x2, Maximize2,
} from 'lucide-react'
import { pageTransition } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import { galleryItems } from '@/data'
import type { GalleryItem } from '@/types'

// ─── types ──────────────────────────────────────────────────────────────────

type MediaType = 'all' | 'photos' | 'videos'
type CategoryFilter = 'all' | GalleryItem['category']

// ─── VideoThumbnail ──────────────────────────────────────────────────────────
// Lazy: only mounts the <video> element when the card is near the viewport.
// preload="metadata" + #t=2 extracts the frame at 2s without downloading the file.

function VideoThumbnail({ src }: { src: string }) {
  const sentinel = useRef<HTMLDivElement>(null)
  const inView = useInView(sentinel, { once: true, margin: '400px' })

  return (
    <div ref={sentinel} className="absolute inset-0 bg-navy-950">
      {inView && (
        <video
          src={`${src}#t=2`}
          preload="metadata"
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

// ─── VideoCard ───────────────────────────────────────────────────────────────

function VideoCard({
  item,
  idx,
  onClick,
}: {
  item: GalleryItem
  idx: number
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.5), ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer
                 shadow-card hover:shadow-hover transition-shadow duration-300 bg-navy-950"
    >
      {/* Lazy video thumbnail */}
      <VideoThumbnail src={item.src} />

      {/* Gradient overlay — always visible, deeper on hover */}
      <div className="absolute inset-0 bg-gradient-to-t
                      from-navy-950/90 via-navy-900/40 to-navy-900/10
                      group-hover:from-navy-950/95 group-hover:via-navy-900/60
                      transition-all duration-400" />

      {/* Thumbnail scale on hover */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105
                      [&>div]:!absolute [&>div]:!inset-0" />

      {/* ── Play button ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Outer pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border-2 border-white/40"
          />
          {/* Button */}
          <div className="relative w-16 h-16 rounded-full
                          bg-gold-500/80 backdrop-blur-sm border-2 border-gold-400/60
                          flex items-center justify-center
                          group-hover:bg-gold-500 group-hover:scale-110 group-hover:border-gold-400
                          transition-all duration-300 shadow-gold-glow">
            <Play size={22} fill="white" className="text-white ml-1" />
          </div>
        </div>
      </div>

      {/* ── Category badge — top-left ── */}
      <div className="absolute top-3 left-3">
        <span className="flex items-center gap-1.5 px-2.5 py-1
                         bg-gold-500 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest
                         shadow-gold-glow">
          <Film size={9} />
          {item.category}
        </span>
      </div>

      {/* ── Video badge — top-right ── */}
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1 px-2 py-1
                         bg-black/50 backdrop-blur-sm rounded-md
                         text-white/80 text-[10px] font-semibold tracking-wider">
          VIDEO
        </span>
      </div>

      {/* ── Caption — bottom ── */}
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4
                        translate-y-1 opacity-0
                        group-hover:translate-y-0 group-hover:opacity-100
                        transition-all duration-300">
          <p className="text-white/90 text-xs leading-snug line-clamp-2">{item.caption}</p>
        </div>
      )}
    </motion.div>
  )
}

// ─── ImageCircle ─────────────────────────────────────────────────────────────
// Circular thumbnail — opens lightbox on click.

function ImageCircle({
  item,
  idx,
  onClick,
}: {
  item: GalleryItem
  idx: number
  onClick: () => void
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.65 }}
      transition={{
        type: 'spring', stiffness: 280, damping: 22,
        delay: Math.min(idx * 0.025, 0.45),
      }}
      onClick={onClick}
      className="group relative flex flex-col items-center gap-2 w-full focus:outline-none"
    >
      {/* Circle */}
      <div
        className="relative w-full aspect-square rounded-full overflow-hidden
                   ring-[3px] ring-white group-hover:ring-gold-500
                   shadow-card group-hover:shadow-gold-glow
                   transition-all duration-300"
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover object-center
                     transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950/70
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Expand icon */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm
                       flex items-center justify-center border border-white/40"
          >
            <Maximize2 size={14} className="text-white" />
          </div>
        </div>
      </div>

      {/* Caption below — fades in on hover */}
      {item.caption && (
        <p
          className="text-center text-[10px] text-slate-500 leading-snug line-clamp-2
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-1 w-full"
        >
          {item.caption}
        </p>
      )}
    </motion.button>
  )
}

// ─── VideoModal ──────────────────────────────────────────────────────────────

function VideoModal({
  videos,
  index,
  onClose,
  onNavigate,
}: {
  videos: GalleryItem[]
  index: number
  onClose: () => void
  onNavigate: (i: number) => void
}) {
  const current = videos[index]
  const videoRef = useRef<HTMLVideoElement>(null)

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight' && index < videos.length - 1) onNavigate(index + 1)
    if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1)
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
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[300] flex flex-col bg-black/97 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4
                      bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gold-500 rounded-lg
                           text-white text-[10px] font-bold uppercase tracking-widest">
            <Film size={9} /> Video
          </span>
          <span className="text-white/50 text-sm font-mono">
            {index + 1} <span className="text-white/25">/</span> {videos.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20
                     flex items-center justify-center text-white/80 hover:text-white
                     transition-colors duration-200"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Video + nav ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-2 min-h-0">
        {/* Prev */}
        <button
          onClick={e => { e.stopPropagation(); onNavigate(index - 1) }}
          disabled={index === 0}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
                     disabled:opacity-20 disabled:cursor-not-allowed
                     flex items-center justify-center text-white
                     transition-colors duration-200 mr-4"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Player */}
        <motion.div
          key={current.src}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
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
            className="w-full rounded-2xl bg-black shadow-deep"
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          />

          {/* Caption under player */}
          {current.caption && (
            <div className="mt-4 flex items-start gap-3">
              <div className="w-[3px] h-full min-h-[1.2rem] bg-gold-500 rounded-full flex-shrink-0 self-stretch" />
              <p className="text-white/60 text-sm leading-relaxed">{current.caption}</p>
            </div>
          )}
        </motion.div>

        {/* Next */}
        <button
          onClick={e => { e.stopPropagation(); onNavigate(index + 1) }}
          disabled={index === videos.length - 1}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
                     disabled:opacity-20 disabled:cursor-not-allowed
                     flex items-center justify-center text-white
                     transition-colors duration-200 ml-4"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Thumbnail strip ── */}
      {videos.length > 1 && (
        <div className="flex-shrink-0 pb-4 px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin justify-center">
            {videos.map((v, i) => (
              <button
                key={v.id}
                onClick={e => { e.stopPropagation(); onNavigate(i) }}
                className={`relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden
                            transition-all duration-200
                            ${i === index
                              ? 'ring-2 ring-gold-500 ring-offset-1 ring-offset-black opacity-100'
                              : 'opacity-40 hover:opacity-70'
                            }`}
              >
                <video
                  src={`${v.src}#t=2`}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {i === index && (
                  <div className="absolute inset-0 bg-gold-500/20" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Gallery page ─────────────────────────────────────────────────────────────

const MEDIA_TYPES: { label: string; value: MediaType; icon: React.ElementType }[] = [
  { label: 'All',    value: 'all',    icon: Grid2x2   },
  { label: 'Photos', value: 'photos', icon: ImageIcon  },
  { label: 'Videos', value: 'videos', icon: Film       },
]

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: 'All Categories', value: 'all'        },
  { label: 'Operations',     value: 'operations' },
  { label: 'Facilities',     value: 'facilities' },
  { label: 'Products',       value: 'products'   },
]

export default function Gallery() {
  const [mediaType, setMediaType] = useState<MediaType>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [imageIndex, setImageIndex] = useState(-1)
  const [videoIndex, setVideoIndex] = useState(-1)

  const allImages = galleryItems.filter(i => i.type !== 'video')
  const allVideos = galleryItems.filter(i => i.type === 'video')

  const filteredImages = mediaType === 'videos' ? [] : allImages.filter(
    i => category === 'all' || i.category === category,
  )
  const filteredVideos = mediaType === 'photos' ? [] : allVideos.filter(
    i => category === 'all' || i.category === category,
  )

  const showVideos = filteredVideos.length > 0
  const showImages = filteredImages.length > 0

  const handleMediaType = (t: MediaType) => {
    setMediaType(t)
    setImageIndex(-1)
    setVideoIndex(-1)
  }
  const handleCategory = (c: CategoryFilter) => {
    setCategory(c)
    setImageIndex(-1)
    setVideoIndex(-1)
  }

  const imageSlides = filteredImages.map(i => ({
    src: i.src, alt: i.alt, description: i.caption,
  }))

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Our Gallery"
        subtitle={`${allImages.length} photos · ${allVideos.length} videos — a visual journey through our operations, facilities, and people.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        image="/images/shipping/tristar-prosperity.jpeg"
      />

      <section className="section-padding bg-white">
        <div className="section-container">

          {/* ── Stats bar ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-6 mb-10"
          >
            {[
              { icon: ImageIcon, value: allImages.length, label: 'Photos',     color: 'text-slate-700' },
              { icon: Film,      value: allVideos.length, label: 'Videos',     color: 'text-gold-500'  },
              { icon: Grid2x2,   value: 4,                label: 'Categories', color: 'text-slate-400' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={16} className={color} />
                <span className="font-mono font-black text-slate-900 text-xl leading-none">{value}</span>
                <span className="text-slate-400 text-sm">{label}</span>
                <span className="text-slate-200 text-sm last:hidden">·</span>
              </div>
            ))}
          </motion.div>

          {/* ── Filter row 1: Media type ── */}
          <div className="flex items-center gap-2 mb-3">
            {MEDIA_TYPES.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleMediaType(value)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                            transition-colors duration-200 ${
                              mediaType === value
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200'
                            }`}
              >
                {mediaType === value && (
                  <motion.span
                    layoutId="media-type-pill"
                    className="absolute inset-0 bg-navy-900 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <Icon size={13} />
                  {label}
                  <span className="font-mono text-[10px] opacity-60">
                    ({value === 'all' ? galleryItems.length : value === 'photos' ? allImages.length : allVideos.length})
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* ── Filter row 2: Category ── */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleCategory(value)}
                className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide
                            transition-colors duration-200 ${
                              category === value
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200'
                            }`}
              >
                {category === value && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 bg-gold-500 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>

          {/* ── Content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mediaType}-${category}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* ── Videos section ── */}
              {showVideos && (
                <div className="mb-14">
                  {/* Section label */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Film size={16} className="text-gold-500" />
                      <h2 className="font-playfair font-bold text-slate-900 text-lg">Videos</h2>
                      <span className="font-mono text-xs text-slate-400 font-semibold">
                        ({filteredVideos.length})
                      </span>
                    </div>
                    <div className="flex-1 h-[1px] bg-slate-100" />
                  </div>

                  {/* 3-col responsive video grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {filteredVideos.map((item, idx) => (
                        <VideoCard
                          key={item.id}
                          item={item}
                          idx={idx}
                          onClick={() => setVideoIndex(idx)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* ── Images section — circular grid ── */}
              {showImages && (
                <div>
                  {/* Section label */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} className="text-slate-500" />
                      <h2 className="font-playfair font-bold text-slate-900 text-lg">Photos</h2>
                      <span className="font-mono text-xs text-slate-400 font-semibold">
                        ({filteredImages.length})
                      </span>
                    </div>
                    <div className="flex-1 h-[1px] bg-slate-100" />
                  </div>

                  {/* Circle grid — responsive columns */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 sm:gap-6">
                    <AnimatePresence>
                      {filteredImages.map((item, idx) => (
                        <ImageCircle
                          key={item.id}
                          item={item}
                          idx={idx}
                          onClick={() => setImageIndex(idx)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* ── Empty state ── */}
              {!showVideos && !showImages && (
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

      {/* ── Image lightbox ── */}
      <Lightbox
        open={imageIndex >= 0}
        index={imageIndex}
        close={() => setImageIndex(-1)}
        slides={imageSlides}
        plugins={[Zoom, Captions]}
        styles={{ container: { backgroundColor: 'rgba(6, 5, 20, 0.97)' } }}
      />

      {/* ── Video modal ── */}
      <AnimatePresence>
        {videoIndex >= 0 && (
          <VideoModal
            videos={filteredVideos}
            index={videoIndex}
            onClose={() => setVideoIndex(-1)}
            onNavigate={setVideoIndex}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
