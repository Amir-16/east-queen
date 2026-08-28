import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp } from '../../../utils/animations'
import { useCountUp } from '../../../hooks/useCountUp'

const stats = [
  { id: 1, value: 500, suffix: '+', label: 'Projects Completed', icon: ClipboardDocumentCheckIcon },
  { id: 2, value: 10, suffix: '+', label: 'Years Experience', icon: CalendarDaysIcon },
  { id: 3, value: 350, suffix: '+', label: 'Happy Clients', icon: UserGroupIcon },
  { id: 4, value: 50, suffix: '+', label: 'Expert Team Members', icon: WrenchScrewdriverIcon },
]

function StatItem({ stat, inView }) {
  const count = useCountUp(stat.value, 2200, inView)
  return (
    <motion.div variants={fadeInUp} className="flex flex-col items-center text-center group">
      <div className="w-14 h-14 bg-white/10 group-hover:bg-accent/20 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
        <stat.icon className="w-7 h-7 text-accent" />
      </div>
      <div className="font-display font-black text-4xl sm:text-5xl text-white leading-none">
        {count}{stat.suffix}
      </div>
      <p className="mt-2 text-white/70 text-sm font-medium">{stat.label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="bg-gradient-primary py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="container-custom px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
