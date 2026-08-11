import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { STATS } from '@/lib/constants'

export default function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background image with dark overlay */}
      <img
        src="/images/shipping/vessel-2.jpeg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/90 to-navy-950/80" />
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-4">
            <div className="h-[2px] w-10 bg-gold-500 rounded-full" />
          </div>
          <p className="text-gold-400 text-[11px] font-semibold uppercase tracking-[0.35em] mb-3">
            By the Numbers
          </p>
          <h2 className="font-playfair font-bold text-white text-h2">
            Strength in Every Figure
          </h2>
        </motion.div>

        {/* Stats */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="flex flex-col items-center py-10 px-6 text-center"
            >
              <p className="font-mono font-black text-[52px] sm:text-[62px] leading-none text-white mb-2">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    delay={0.3 + i * 0.1}
                    separator=","
                  />
                ) : '0'}
                <span className="text-gold-400">{stat.suffix}</span>
              </p>
              <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
