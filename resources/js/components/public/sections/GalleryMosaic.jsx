import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Images, X, ChevronLeft, ChevronRight } from 'lucide-react'

const GRID_SPANS = [
  'col-span-2 row-span-2',
  '',
  '',
  'row-span-2',
  '',
  '',
  'col-span-2',
  '',
  '',
  'col-span-2',
]

export default function GalleryMosaic({ gallery = [] }) {
  const [lb, setLb] = useState({ open: false, index: 0 })

  const openLb  = (i) => setLb({ open: true, index: i })
  const closeLb = () => setLb((p) => ({ ...p, open: false }))
  const nav     = (d) => setLb((p) => ({ open: true, index: (p.index + d + gallery.length) % gallery.length }))

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-gold-500 rounded-full" />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Photo Gallery
              </span>
            </div>
            <h2 className="font-playfair font-bold text-h2 text-navy-900 leading-tight">
              A Glimpse Into Our World
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 px-5 py-2.5
                       border border-slate-200 hover:border-gold-400 rounded-lg
                       text-slate-600 hover:text-gold-500 text-sm font-semibold
                       transition-all duration-200 shrink-0 self-start sm:self-auto"
          >
            <Images size={14} />
            View Full Gallery
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Mosaic grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] gap-2 sm:gap-3"
        >
          {gallery.map((item, i) => (
            <motion.div
              key={item.id ?? i}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${GRID_SPANS[i] ?? ''}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => openLb(i)}
            >
              <img
                src={item.src}
                alt={item.title ?? ''}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium">{item.title}</span>
              </div>

              {/* Red top accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-[3px] bg-gold-500 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={closeLb}
          >
            <button
              onClick={(e) => { e.stopPropagation(); nav(-1) }}
              className="absolute left-4 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.img
              key={lb.index}
              src={gallery[lb.index]?.src}
              alt={gallery[lb.index]?.title ?? ''}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[80vh] w-full object-contain rounded-2xl select-none"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nav(1) }}
              className="absolute right-4 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            <button
              onClick={closeLb}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-black/60 border-2 border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500/60 transition-colors"
            >
              <X size={22} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm">
              {lb.index + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
