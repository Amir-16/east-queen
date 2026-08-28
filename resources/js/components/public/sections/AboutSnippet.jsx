import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { fadeLeft, fadeRight, stagger, fadeUp } from '@/lib/motion'

const COUNTERS = [
  { value: 42,  suffix: '+', label: 'Years Established' },
  { value: 6,   suffix: '',  label: 'Companies in Group' },
  { value: 500, suffix: '+', label: 'People Employed' },
  { value: 20,  suffix: '+', label: 'Countries Reached' },
]

const MOSAIC = [
  { src: '/images/ship-breaking/yard-wide-1.jpeg',  alt: 'Yard operations', span: 'row-span-2' },
  { src: '/images/shipping/harmonia-arrival.jpeg',   alt: 'Vessel arrival',  span: '' },
  { src: '/images/products/exports/jute/jute-1.jpeg', alt: 'Jute export',   span: '' },
]

export default function AboutSnippet() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Mosaic images */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 gap-3 auto-rows-[180px]"
          >
            {MOSAIC.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl shadow-card group ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              </div>
            ))}
          </motion.div>

          {/* Right — Text + counters */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
              Our Story
            </p>
            <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <h2 className="font-playfair font-bold text-h2 text-white leading-tight mb-6">
              Four Decades of Building Bangladesh
            </h2>
            <p className="text-white/50 leading-relaxed mb-6">
              Founded in 1982 on the shores of Chittagong, East Queen Group has grown from a single ship-breaking operation into a diversified conglomerate spanning maritime, trading, energy, fisheries, and food sectors.
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              Today, six companies under one roof serve local and international markets — bound by shared values of integrity, quality, and the belief that business should build communities.
            </p>

            {/* Counters */}
            <div ref={ref} className="grid grid-cols-2 gap-4">
              {COUNTERS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.05] border border-white/10 rounded-xl p-4"
                >
                  <p className="font-mono font-black text-3xl text-gold-500 leading-none mb-1">
                    {inView ? <CountUp end={c.value} suffix={c.suffix} duration={2.2} /> : `0${c.suffix}`}
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{c.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
