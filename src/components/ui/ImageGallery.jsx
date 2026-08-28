import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { fadeInUp } from '../../utils/animations'

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.28 },
  }),
}

export default function ImageGallery({ images = [], title = '' }) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightbox, setLightbox] = useState(false)

  const total = images.length

  const go = useCallback(
    (idx) => {
      setDirection(idx > active ? 1 : -1)
      setActive(idx)
    },
    [active],
  )

  const prev = useCallback(() => go((active - 1 + total) % total), [active, total, go])
  const next = useCallback(() => go((active + 1) % total), [active, total, go])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (!images || images.length === 0) return null

  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PhotoIcon className="w-4 h-4 text-accent" />
            <span className="font-display font-bold text-dark text-sm">Project Gallery</span>
            <span className="text-xs text-dark-300/50 font-medium">({total} photos)</span>
          </div>
          <span className="text-xs font-display font-semibold text-dark-300/50">
            {active + 1} / {total}
          </span>
        </div>

        {/* Main viewer */}
        <div className="group relative overflow-hidden rounded-2xl bg-dark shadow-card-hover cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <div className="relative h-80 sm:h-96 overflow-hidden">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.img
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={images[active]}
                alt={`${title} — photo ${active + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* Dim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent pointer-events-none" />

            {/* Expand icon */}
            <div className="absolute top-4 right-4 w-9 h-9 bg-dark/50 backdrop-blur-sm text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <ArrowsPointingOutIcon className="w-4 h-4" />
            </div>

            {/* Prev / Next (stop click propagating to lightbox open) */}
            {total > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark/50 backdrop-blur-sm text-white rounded-xl flex items-center justify-center
                    opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 hover:bg-dark/70"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark/50 backdrop-blur-sm text-white rounded-xl flex items-center justify-center
                    opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 hover:bg-dark/70"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {total > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-6 h-2 bg-accent shadow-accent'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`View photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div
            className="mt-3 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.min(total, 5)}, 1fr)` }}
          >
            {images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => go(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`relative h-16 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  i === active
                    ? 'ring-2 ring-accent ring-offset-2 shadow-md'
                    : 'opacity-55 hover:opacity-90'
                }`}
              >
                <img
                  src={img}
                  alt={`${title} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {i === active && (
                  <div className="absolute inset-0 bg-accent/15" />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-dark/96 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(false)}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-none">
              <span className="font-display font-semibold text-white/60 text-sm">
                {title} — {active + 1} / {total}
              </span>
              <button
                onClick={() => setLightbox(false)}
                className="pointer-events-auto w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Image + inline arrows (works on all screen sizes) */}
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={`lb-${active}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={images[active]}
                  alt={`${title} — photo ${active + 1}`}
                  className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Arrows — always inside the image area so they work on all screen sizes */}
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark/60 backdrop-blur-sm hover:bg-dark/80 text-white rounded-xl flex items-center justify-center transition-colors z-10"
                    aria-label="Previous"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark/60 backdrop-blur-sm hover:bg-dark/80 text-white rounded-xl flex items-center justify-center transition-colors z-10"
                    aria-label="Next"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail row — horizontally scrollable on mobile */}
            {total > 1 && (
              <div
                className="absolute bottom-4 left-0 right-0 px-4 overflow-x-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-2 justify-center min-w-max mx-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        i === active
                          ? 'ring-2 ring-accent scale-110'
                          : 'opacity-40 hover:opacity-75 hover:scale-105'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
