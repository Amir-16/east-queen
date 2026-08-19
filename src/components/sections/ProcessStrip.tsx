import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ShieldCheck, Ship, BarChart3, PackageCheck } from 'lucide-react'
import { ease, stagger, fadeUp } from '@/lib/motion'
import SectionHeader from '@/components/ui/SectionHeader'

const steps = [
  {
    icon: Globe,
    step: '01',
    title: 'Source',
    description: 'Identify commodity opportunities across 20+ global markets.',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: 'Inspect',
    description: 'Pre-shipment quality control, certification, and compliance checks.',
  },
  {
    icon: Ship,
    step: '03',
    title: 'Ship',
    description: 'Vessel chartering, freight booking, and full logistics coordination.',
  },
  {
    icon: BarChart3,
    step: '04',
    title: 'Trade',
    description: 'Transparent pricing, trade documentation, and customs clearance.',
  },
  {
    icon: PackageCheck,
    step: '05',
    title: 'Deliver',
    description: 'Last-mile delivery to ports, yards, and industrial facilities.',
  },
]

export default function ProcessStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-dots-pattern pointer-events-none opacity-60" />

      <div className="relative section-container">
        <SectionHeader
          eyebrow="How We Operate"
          title="Trade Done Right — Every Time"
          subtitle="Our five-stage process guarantees quality, compliance, and on-time delivery across every shipment."
          align="center"
          className="mb-16"
        />

        {/* ── Desktop horizontal strip ── */}
        <div className="hidden lg:block relative">

          {/* SVG dashed connector — sits behind the icon nodes */}
          <div className="absolute top-[2.1rem] left-[10%] right-[10%] pointer-events-none" aria-hidden>
            <svg viewBox="0 0 1000 4" preserveAspectRatio="none" className="w-full" height="4">
              {/* Static grey base track */}
              <path d="M 0 2 L 1000 2" stroke="#E2E6ED" strokeWidth="2" fill="none" />
              {/* Animated brand-red dashed fill — draws left → right on scroll */}
              <motion.path
                d="M 0 2 L 1000 2"
                stroke="#E21F2F"
                strokeWidth="2"
                strokeDasharray="10 6"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.8, delay: 0.4, ease: ease.slow }}
              />
            </svg>
          </div>

          {/* Step nodes */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-5 gap-4 relative z-10"
          >
            {steps.map(({ icon: Icon, step, title, description }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="group flex flex-col items-center text-center cursor-default"
              >
                {/* Icon node */}
                <div className="relative mb-6">
                  <div
                    className="w-[4.5rem] h-[4.5rem] rounded-full bg-white border-2 border-slate-200
                               group-hover:border-gold-500 group-hover:shadow-card
                               flex items-center justify-center transition-all duration-300"
                  >
                    <Icon
                      size={22}
                      className="text-slate-400 group-hover:text-gold-500 transition-colors duration-300"
                    />
                  </div>
                  {/* Step badge */}
                  <span
                    className="absolute -top-1 -right-1 w-[22px] h-[22px] rounded-full
                               bg-gold-500 text-white text-[9px] font-mono font-bold
                               flex items-center justify-center shadow-sm"
                  >
                    {step}
                  </span>
                </div>

                <h3 className="font-inter font-bold text-navy-900 text-base mb-2 group-hover:text-gold-500 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[140px]">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Mobile vertical strip ── */}
        <div className="lg:hidden relative pl-12">

          {/* Vertical track */}
          <div className="absolute left-[1.65rem] top-0 bottom-0 w-px bg-slate-200 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold-500 origin-top"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, delay: 0.2, ease: ease.slow }}
            />
          </div>

          <div className="space-y-9">
            {steps.map(({ icon: Icon, step, title, description }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.11, duration: 0.55, ease: ease.smooth }}
                className="flex gap-5 items-start"
              >
                {/* Node */}
                <div className="relative z-10 shrink-0 -ml-12">
                  <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                    <Icon size={17} className="text-gold-500" />
                  </div>
                  <span
                    className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full
                               bg-gold-500 text-white text-[8px] font-mono font-bold
                               flex items-center justify-center"
                  >
                    {step}
                  </span>
                </div>

                <div className="pt-2.5">
                  <h3 className="font-inter font-bold text-navy-900 text-base mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
