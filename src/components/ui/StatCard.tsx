import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { cn } from '@/lib/cn'
import type { StatItem } from '@/types'

interface StatCardProps extends StatItem {
  theme?: 'dark' | 'light' | 'amber'
  className?: string
}

export default function StatCard({ value, suffix, label, theme = 'dark', className }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const numColor =
    theme === 'amber' ? 'text-gold-500' :
    theme === 'dark'  ? 'text-white'    :
    'text-navy-900'

  const labelColor =
    theme === 'amber' ? 'text-navy-900/55' :
    theme === 'dark'  ? 'text-white/45'    :
    'text-slate-500'

  return (
    <div ref={ref} className={cn('flex flex-col items-center text-center', className)}>
      <div className="flex items-end gap-1 mb-2">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={cn('font-mono font-bold text-stat leading-none', numColor)}
        >
          {isInView
            ? <CountUp
                end={value}
                duration={2.2}
                easingFn={(t, b, c, d) => { t /= d; t--; return c * (t * t * t + 1) + b }}
              />
            : '0'}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.6 }}
          className={cn('font-mono font-bold text-h2 leading-none mb-1', numColor)}
        >
          {suffix}
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn('text-[11px] uppercase tracking-[0.2em] font-semibold', labelColor)}
      >
        {label}
      </motion.p>
    </div>
  )
}
