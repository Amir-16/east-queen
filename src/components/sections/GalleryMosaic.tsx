import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Images } from 'lucide-react'

const tiles = [
  { src: '/images/gallery/ship-breaking/bbg-master.jpeg',      alt: 'BBG Master',        style: 'col-span-2 row-span-2' },
  { src: '/images/gallery/mill-scale/mill-1.jpeg',             alt: 'Mill Scale',         style: '' },
  { src: '/images/gallery/jute/jute-1.jpeg',                   alt: 'Jute',               style: '' },
  { src: '/images/gallery/coal/hold-aerial.jpeg',              alt: 'Coal hold aerial',   style: 'row-span-2' },
  { src: '/images/gallery/aggregate/gabbro-1.jpeg',            alt: 'Gabbro aggregate',   style: '' },
  { src: '/images/gallery/pet-flakes/bales-outdoor.jpeg',      alt: 'PET Flakes',         style: '' },
  { src: '/images/gallery/ship-breaking/yard-wide-1.jpeg',     alt: 'Yard panorama',      style: 'col-span-2' },
  { src: '/images/gallery/fisheries/farm-1.jpeg',              alt: 'Syedpur Farm',       style: '' },
  { src: '/images/gallery/leather/wallet-1.jpeg',              alt: 'Leather goods',      style: '' },
  { src: '/images/products/exports/frozen-fish/frozen-1.jpeg', alt: 'Frozen fish',        style: '' },
  { src: '/images/products/exports/vegetables/produce-1.jpeg', alt: 'Fresh produce',      style: '' },
  { src: '/images/shipping/tristar-prosperity.jpeg',           alt: 'Tristar vessel',     style: 'col-span-2' },
]

export default function GalleryMosaic() {
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
            to="/gallery"
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
          {tiles.map(({ src, alt, style }, i) => (
            <motion.div
              key={src}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${style}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           group-hover:scale-108 transition-transform duration-600 ease-out"
                style={{ transition: 'transform 0.6s ease-out' }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50
                               transition-colors duration-400" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100
                               transition-opacity duration-300">
                <span className="text-white text-xs font-medium">{alt}</span>
              </div>

              {/* Red corner accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-[3px] bg-gold-500
                               group-hover:w-full transition-all duration-400 ease-out" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
