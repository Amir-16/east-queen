import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { cn } from '@/lib/cn'

const themes = {
  dark:  'bg-navy-900 border-navy-800 text-white',
  light: 'bg-white border-slate-200 text-navy-900',
  amber: 'bg-amber-500 border-amber-400 text-navy-950',
}

export default function StatCard({ value, suffix = '', label, theme = 'dark', className }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className={cn('border rounded-2xl p-6 text-center', themes[theme], className)}>
      <p className="font-mono font-black text-stat leading-none mb-2">
        {inView ? (
          <CountUp end={value} suffix={suffix} duration={2.2} useEasing />
        ) : (
          <span>0{suffix}</span>
        )}
      </p>
      <p className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
        {label}
      </p>
    </div>
  )
}
