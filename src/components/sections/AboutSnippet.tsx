import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CountUp from 'react-countup'

const imageGrid = [
  { src: '/images/shipping/bbg-master-night.jpeg',            alt: 'BBG Master vessel at night',       span: 'row-span-2' },
  { src: '/images/products/exports/mill-scale/mill-1.jpeg',  alt: 'Mill scale operations',             span: '' },
  { src: '/images/companies/syedpur/farm-1.jpeg',            alt: 'Syedpur farm and fisheries',        span: '' },
  { src: '/images/ship-breaking/yard-wide-1.jpeg',           alt: 'Ship-breaking yard panorama',       span: 'col-span-2' },
]

const stats = [
  { n: 42,   suffix: '+', label: 'Years',     sub: 'of industrial excellence' },
  { n: 6,    suffix: '',  label: 'Companies', sub: 'across key sectors' },
  { n: 500,  suffix: '+', label: 'People',    sub: 'in our workforce' },
  { n: 20,   suffix: '+', label: 'Countries', sub: 'in our trade network' },
]

export default function AboutSnippet() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-navy-900 overflow-hidden relative">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[640px]">

        {/* ── Left: image mosaic ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 grid-rows-[220px_220px] gap-1.5 p-1.5">
          {imageGrid.map(({ src, alt, span }, i) => (
            <motion.div
              key={src}
              className={`relative overflow-hidden group ${span}`}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover object-center
                           group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* ── Right: story text ────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-10 py-16 lg:py-20 relative">
          {/* Large watermark year */}
          <span className="absolute -right-4 bottom-8 font-playfair font-black
                           text-[140px] leading-none select-none pointer-events-none
                           text-white/[0.03] z-0">1982</span>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-[2px] w-10 bg-gold-500 rounded-full" />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair font-bold text-h2 text-white leading-tight mb-6"
            >
              Four Decades of Trusted{' '}
              <span className="text-gold-400">Industrial Leadership</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/55 text-base leading-relaxed mb-4"
            >
              Founded in 1982, East Queen Group began as a ship-breaking enterprise on
              the shores of Chittagong. Over four decades, we evolved into a diversified
              industrial conglomerate spanning six specialized companies across maritime,
              energy, fisheries, food trading, and international commerce.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-white/45 text-base leading-relaxed mb-9"
            >
              Our growth is rooted in ethical business, stringent quality standards,
              and long-term relationships with partners across Asia, the Middle East, and Europe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.34 }}
            >
              <Link
                to="/about-east-queen"
                className="group inline-flex items-center gap-2 text-gold-400
                           hover:text-gold-300 font-semibold text-sm transition-colors duration-200"
              >
                Read the Full Story
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </motion.div>

            {/* Animated counters */}
            <div ref={ref} className="grid grid-cols-2 gap-5 mt-12 pt-10 border-t border-white/10">
              {stats.map(({ n, suffix, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                >
                  <p className="font-mono font-bold text-gold-400 text-3xl leading-none mb-1">
                    {inView ? (
                      <CountUp end={n} duration={2.4} delay={0.5 + i * 0.1} separator="," />
                    ) : '0'}{suffix}
                  </p>
                  <p className="text-white font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-white/35 text-[11px] uppercase tracking-wider">{sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
