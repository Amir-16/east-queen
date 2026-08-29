import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { fadeLeft, fadeRight, stagger, fadeUp } from '@/lib/motion'

const STATS = [
  { value: '40+', label: 'Years Experience' },
  { value: 'HKC', label: 'Certified' },
  { value: '150+', label: 'Vessels Recycled' },
]

export default function ShipBreakingFeature() {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Parallax background */}
      <div className="absolute inset-0">
        <img
          src="/images/ship-breaking/coastal-view.jpeg"
          alt="Ship breaking operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
      </div>

      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
              East Queen Shipping
            </p>
            <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <h2 className="font-playfair font-bold text-h2 text-white leading-tight mb-6">
              Bangladesh's Premier Ship Recycling Facility
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Operating from Sitakunda, Chittagong since 1982 — we transform end-of-life vessels into high-grade steel with full HKC compliance and zero-waste commitment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ship-breaking"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-gold-glow group"
              >
                Explore Division <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/companies/east-queen-shipping"
                className="inline-flex items-center gap-2 glass-dark hover:bg-white/[0.1] text-white/70 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200"
              >
                About the Company
              </Link>
            </div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-3 gap-4"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeRight}
                className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-5 text-center backdrop-blur-sm"
              >
                <p className="font-mono font-black text-3xl text-gold-500 leading-none mb-2">{s.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
