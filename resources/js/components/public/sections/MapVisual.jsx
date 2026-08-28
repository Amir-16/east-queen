import { motion } from 'framer-motion'
import { stagger, fadeLeft, fadeRight, fadeUp } from '@/lib/motion'

const PARTNERS = [
  { name: 'China',        x: 73.5, y: 30,   flag: '🇨🇳' },
  { name: 'Japan',        x: 80,   y: 27,   flag: '🇯🇵' },
  { name: 'South Korea',  x: 78,   y: 25,   flag: '🇰🇷' },
  { name: 'India',        x: 63,   y: 38,   flag: '🇮🇳' },
  { name: 'UAE',          x: 53,   y: 40,   flag: '🇦🇪' },
  { name: 'Saudi Arabia', x: 50,   y: 43,   flag: '🇸🇦' },
  { name: 'Malaysia',     x: 73,   y: 48,   flag: '🇲🇾' },
  { name: 'Indonesia',    x: 76,   y: 53,   flag: '🇮🇩' },
  { name: 'Australia',    x: 82,   y: 65,   flag: '🇦🇺' },
  { name: 'Germany',      x: 35,   y: 20,   flag: '🇩🇪' },
]

const HUB = { x: 65, y: 38 }

export default function MapVisual() {
  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
            Global Reach
          </motion.p>
          <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
          <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-white">
            Trading Across the World
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            East Queen Group's trade network spans Asia, the Middle East, Europe, and Australia.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Partner chips */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 lg:flex-col lg:gap-3"
          >
            {PARTNERS.slice(0, 5).map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-2.5 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5"
              >
                <span className="text-lg">{p.flag}</span>
                <span className="text-white/70 text-sm font-semibold">{p.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* SVG Hub Diagram */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-square max-w-xs mx-auto w-full"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Radial lines */}
              {PARTNERS.map((p) => (
                <line
                  key={p.name}
                  x1={50} y1={50}
                  x2={p.x} y2={p.y}
                  stroke="#e2c97e"
                  strokeWidth="0.3"
                  strokeDasharray="1 1.5"
                  opacity="0.4"
                />
              ))}
              {/* Outer ring */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(226,201,126,0.1)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(226,201,126,0.15)" strokeWidth="0.5" />
              {/* Partner dots */}
              {PARTNERS.map((p) => (
                <g key={p.name}>
                  <circle cx={p.x} cy={p.y} r="1.2" fill="#e2c97e" opacity="0.7" />
                  <circle cx={p.x} cy={p.y} r="2.5" fill="#e2c97e" opacity="0.15" />
                </g>
              ))}
              {/* Hub */}
              <circle cx="50" cy="50" r="5" fill="#e2c97e" opacity="0.9" />
              <circle cx="50" cy="50" r="9" fill="#e2c97e" opacity="0.2" />
              <text x="50" y="52" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="serif" fontWeight="bold">EQ</text>
            </svg>
          </motion.div>

          {/* Right partner chips */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 lg:flex-col lg:gap-3"
          >
            {PARTNERS.slice(5).map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-2.5 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5"
              >
                <span className="text-lg">{p.flag}</span>
                <span className="text-white/70 text-sm font-semibold">{p.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
