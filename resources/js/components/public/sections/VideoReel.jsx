import { Link } from '@inertiajs/react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'

const reels = [
  {
    video:  '/videos/ship-breaking/yard-1.mp4',
    label:  'Ship Breaking',
    sub:    'Sitakunda Yard',
    poster: '/images/gallery/ship-breaking/yard-wide-1.jpeg',
  },
  {
    video:  '/videos/shipping/vessel-1.mp4',
    label:  'Maritime Ops',
    sub:    'Vessel Operations',
    poster: '/images/shipping/bbg-master-night.jpeg',
  },
  {
    video:  '/videos/operations/ops-1.mp4',
    label:  'Port & Yard',
    sub:    'Chittagong Operations',
    poster: '/images/gallery/coal/hold-aerial.jpeg',
  },
  {
    video:  '/videos/fisheries/fisheries-1.mp4',
    label:  'Fisheries',
    sub:    'Syedpur Farms',
    poster: '/images/companies/syedpur/pond-1.jpeg',
  },
]

export default function VideoReel() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-black relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-4 sm:px-8 lg:px-12 pt-12 pb-6 max-w-[1600px] mx-auto"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-8 bg-gold-500" />
            <span className="text-gold-500 text-[10px] font-semibold uppercase tracking-[0.3em]">
              Live Operations
            </span>
          </div>
          <h2 className="font-playfair font-bold text-white text-2xl sm:text-3xl">
            Our Operations in Action
          </h2>
        </div>
        <Link
          href="/gallery"
          className="hidden sm:inline-flex items-center gap-2 text-white/50 hover:text-gold-400
                     text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          Full Gallery <ArrowRight size={12} />
        </Link>
      </motion.div>

      {/* Video strip */}
      <div className="flex h-[200px] sm:h-[280px] md:h-[340px] lg:h-[400px] gap-0.5">
        {reels.map(({ video, label, sub, poster }, i) => (
          <motion.div
            key={video}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative flex-1 overflow-hidden group cursor-pointer"
          >
            {/* Video */}
            <video
              src={video}
              poster={poster}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover object-center
                         scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
                             group-hover:from-black/70 transition-all duration-500" />

            {/* Play icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-10 h-10 rounded-full border border-white/30 bg-white/10
                            flex items-center justify-center opacity-0 group-hover:opacity-100
                            scale-75 group-hover:scale-100 transition-all duration-400">
              <Play size={14} fill="white" className="text-white ml-0.5" />
            </div>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold text-sm leading-tight">{label}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{sub}</p>
            </div>

            {/* Gold accent on first item */}
            {i === 0 && (
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gold-500" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
