import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, ClipboardCheck, FileText, Truck, BadgeCheck, Circle } from 'lucide-react'
import { ease, stagger, fadeUp } from '@/lib/motion'
import SectionHeader from '@/components/public/ui/SectionHeader'

const ICON_MAP = {
  MagnifyingGlassIcon:        Search,
  ClipboardDocumentCheckIcon: ClipboardCheck,
  DocumentTextIcon:           FileText,
  TruckIcon:                  Truck,
  CheckBadgeIcon:             BadgeCheck,
}

export default function ProcessStrip({ steps = [] }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern pointer-events-none opacity-60" />

      <div className="relative section-container">
        <SectionHeader
          eyebrow="How We Operate"
          title="Ship Recycling, Done Right"
          subtitle="Our five-stage process ensures every vessel is dismantled safely, sustainably, and in full compliance with international standards."
          align="center"
          className="mb-16"
        />

        {/* Desktop horizontal strip */}
        <div className="hidden lg:block relative">
          {/* Animated connector line */}
          <div className="absolute top-[2.1rem] left-[10%] right-[10%] pointer-events-none" aria-hidden>
            <svg viewBox="0 0 1000 4" preserveAspectRatio="none" className="w-full" height="4">
              <path d="M 0 2 L 1000 2" stroke="#E2E6ED" strokeWidth="2" fill="none" />
              <motion.path
                d="M 0 2 L 1000 2"
                stroke="#E21F2F"
                strokeWidth="2"
                strokeDasharray="10 6"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.8, delay: 0.4, ease: ease.smooth }}
              />
            </svg>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-5 gap-4 relative z-10"
          >
            {steps.map((step) => {
              const Icon = ICON_MAP[step.icon] ?? Circle
              const num  = String(step.step_number).padStart(2, '0')
              return (
                <motion.div
                  key={step.id}
                  variants={fadeUp}
                  className="group flex flex-col items-center text-center cursor-default"
                >
                  <div className="relative mb-6">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-white border-2 border-slate-200 group-hover:border-gold-500 group-hover:shadow-card flex items-center justify-center transition-all duration-300">
                      <Icon size={22} className="text-slate-400 group-hover:text-gold-500 transition-colors duration-300" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-[22px] h-[22px] rounded-full bg-gold-500 text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-sm">
                      {num}
                    </span>
                  </div>
                  <h3 className="font-inter font-bold text-navy-900 text-base mb-2 group-hover:text-gold-500 transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[140px]">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile vertical strip */}
        <div className="lg:hidden relative pl-12">
          <div className="absolute left-[1.65rem] top-0 bottom-0 w-px bg-slate-200 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold-500 origin-top"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, delay: 0.2, ease: ease.smooth }}
            />
          </div>

          <div className="space-y-9">
            {steps.map((step, i) => {
              const Icon = ICON_MAP[step.icon] ?? Circle
              const num  = String(step.step_number).padStart(2, '0')
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 28 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.11, duration: 0.55, ease: ease.smooth }}
                  className="flex gap-5 items-start"
                >
                  <div className="relative z-10 shrink-0 -ml-12">
                    <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <Icon size={17} className="text-gold-500" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-gold-500 text-white text-[8px] font-mono font-bold flex items-center justify-center">
                      {num}
                    </span>
                  </div>
                  <div className="pt-2.5">
                    <h3 className="font-inter font-bold text-navy-900 text-base mb-1.5">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
