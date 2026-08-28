import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'

const TILES = [
  { src: '/images/ship-breaking/yard-wide-1.jpeg',   alt: 'Yard overview',       colSpan: 'col-span-2', rowSpan: 'row-span-2' },
  { src: '/images/shipping/tristar-prosperity.jpeg', alt: 'Vessel at sea',        colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/ship-breaking/scrap-yard-1.jpeg',  alt: 'Scrap yard',           colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/products/exports/mill-scale/mill-1.jpeg', alt: 'Mill scale', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/products/exports/jute/jute-1.jpeg',alt: 'Jute products',        colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/ship-breaking/coastal-view.jpeg',  alt: 'Coastal view',         colSpan: 'col-span-2', rowSpan: 'row-span-1' },
  { src: '/images/companies/syedpur/farm-1.jpeg',    alt: 'Fishery farm',         colSpan: 'col-span-1', rowSpan: 'row-span-2' },
  { src: '/images/products/exports/pet-flakes/bales-1.jpeg', alt: 'PET flakes', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/products/imports/aggregate/gabbro-1.jpeg', alt: 'Aggregate', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/products/exports/leather/leather-2.jpeg',  alt: 'Leather',   colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { src: '/images/products/imports/coal/hold-aerial-1.jpeg', alt: 'Coal',      colSpan: 'col-span-1', rowSpan: 'row-span-1' },
]

export default function GalleryMosaic({ tiles = TILES }) {
  const [lb, setLb] = useState({ open: false, index: 0, dir: 0 })

  const openLb = (i) => setLb({ open: true, index: i, dir: 0 })
  const closeLb = () => setLb((p) => ({ ...p, open: false }))
  const nav = (d) => setLb((p) => ({ open: true, dir: d, index: (p.index + d + tiles.length) % tiles.length }))

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-10 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
              Operations Gallery
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">
              In the Field
            </motion.h2>
          </div>
          <motion.a variants={fadeUp} href="/gallery" className="text-gold-500 hover:text-gold-600 font-semibold text-sm flex items-center gap-1 transition-colors">
            Full Gallery →
          </motion.a>
        </motion.div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '200px' }}
        >
          {tiles.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: (i % 5) * 0.07, duration: 0.45 }}
              onClick={() => openLb(i)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-card hover:shadow-hover transition-shadow duration-300 ${tile.colSpan} ${tile.rowSpan}`}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ZoomIn size={16} className="text-white" />
                </div>
              </div>
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
            <button onClick={(e) => { e.stopPropagation(); nav(-1) }}
              className="absolute left-4 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <ChevronLeft size={22} />
            </button>

            <motion.img
              key={lb.index}
              src={tiles[lb.index].src}
              alt={tiles[lb.index].alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[80vh] w-full object-contain rounded-2xl select-none"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />

            <button onClick={(e) => { e.stopPropagation(); nav(1) }}
              className="absolute right-4 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <ChevronRight size={22} />
            </button>

            <button onClick={closeLb}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-black/60 border-2 border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500/60 transition-colors">
              <X size={22} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm">
              {lb.index + 1} / {tiles.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
