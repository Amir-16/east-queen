import { motion } from 'framer-motion'
import { Search, ShieldCheck, Hammer, BarChart3, PackageCheck } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'

const STEPS = [
  { icon: Search,       label: 'Source', description: 'Global supplier network and market intelligence' },
  { icon: ShieldCheck,  label: 'Inspect', description: 'Third-party quality verification at origin' },
  { icon: Hammer,       label: 'Process', description: 'Value-added processing and preparation' },
  { icon: BarChart3,    label: 'Trade', description: 'Documentation, financing, and customs clearance' },
  { icon: PackageCheck, label: 'Deliver', description: 'Last-mile logistics to destination' },
]

export default function ProcessStrip({ steps = STEPS }) {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-12 text-center"
        >
          <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
            How We Work
          </motion.p>
          <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
          <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">
            Our Trade Process
          </motion.h2>
        </motion.div>

        {/* Desktop — horizontal */}
        <div className="hidden md:flex items-start gap-0 relative">
          {/* Dashed connector line */}
          <svg
            className="absolute top-8 left-[10%] right-[10%] w-[80%] h-px pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <line
              x1="0" y1="0" x2="100%" y2="0"
              stroke="#e2c97e"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          </svg>

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center text-center relative z-10 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-gold-200 shadow-card flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold-500" />
                </div>
                <p className="font-mono font-bold text-gold-500 text-[10px] tracking-[0.2em] uppercase mb-1">
                  0{i + 1}
                </p>
                <p className="font-semibold text-navy-900 text-sm mb-1.5">{step.label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile — vertical */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-gold-200 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold-500" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold text-gold-500 tracking-widest uppercase mb-0.5">0{i + 1}</p>
                  <p className="font-semibold text-navy-900 text-sm">{step.label}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
