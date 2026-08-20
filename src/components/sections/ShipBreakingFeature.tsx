import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Anchor, ArrowRight, Shield, Recycle } from 'lucide-react'
import { ease, stagger, fadeUp } from '@/lib/motion'

const highlights = [
  { icon: Anchor,  stat: '40+',         unit: 'Years',           detail: 'Maritime Experience'        },
  { icon: Shield,  stat: 'HKC',         unit: 'Certified',       detail: 'International Compliance'   },
  { icon: Recycle, stat: '150+',        unit: 'Vessels',         detail: 'Safely Recycled'            },
]

export default function ShipBreakingFeature() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[560px] flex items-center">

      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="/images/ship-breaking/coastal-view.jpeg"
          alt="Ship breaking yard at Sitakunda, Chittagong"
          className="w-full h-[115%] object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Layered dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/96 via-navy-950/82 to-navy-950/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/55 to-transparent" />

      <div className="relative section-container section-padding w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left — text ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: ease.smooth }}
              className="flex items-center gap-3 mb-6"
            >
              <Anchor size={15} className="text-gold-500/65" />
              <span className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase">
                East Queen Shipping Ltd.
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: ease.smooth }}
              className="font-playfair font-bold text-h1 text-white leading-tight mb-6"
            >
              Bangladesh's Premier{' '}
              <span className="text-gradient-gold">Ship Recycling</span>{' '}
              Facility
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.65, ease: ease.smooth }}
              className="text-white/50 text-base leading-relaxed mb-10 max-w-md"
            >
              Operating in Sitakunda, Chittagong since 1982 — transforming end-of-life
              vessels into high-grade steel with full compliance to the Hong Kong Convention
              and international environmental standards.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.55, ease: ease.smooth }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/ship-breaking"
                className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400
                           text-white font-bold text-sm px-7 py-3.5 rounded-lg tracking-wide
                           transition-all duration-200 hover:shadow-gold-glow group"
              >
                Explore Ship Breaking
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/con-east-queen-shipping"
                className="inline-flex items-center gap-2.5 glass-dark hover:bg-white/[0.1]
                           text-white/65 hover:text-white font-semibold px-7 py-3.5 rounded-lg text-sm
                           transition-all duration-200"
              >
                About the Company
              </Link>
            </motion.div>
          </div>

          {/* ── Right — stat cards ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid gap-4"
          >
            {highlights.map(({ icon: Icon, stat, unit, detail }) => (
              <motion.div
                key={detail}
                variants={fadeUp}
                className="flex items-center gap-5 glass-dark rounded-2xl px-6 py-5
                           hover:bg-white/[0.1] transition-colors duration-200 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/12 border border-gold-500/20
                                flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-gold-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-xl leading-none mb-0.5">
                    {stat} <span className="text-gold-500">{unit}</span>
                  </p>
                  <p className="text-white/40 text-xs tracking-wide">{detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
