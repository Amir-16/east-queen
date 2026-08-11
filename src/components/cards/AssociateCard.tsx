import { motion } from 'framer-motion'
import { scaleIn } from '@/lib/motion'
import { cn } from '@/lib/cn'
import type { Associate } from '@/types'

interface AssociateCardProps {
  associate: Associate
}

export default function AssociateCard({ associate }: AssociateCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-xl border border-slate-100 shadow-card p-6 flex flex-col items-center gap-3 hover:shadow-hover hover:border-gold-300/40 transition-all duration-300 cursor-pointer"
    >
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center text-white font-mono font-bold text-xl transition-all duration-300',
        associate.color,
        'group-hover:scale-110',
      )}>
        {associate.initials}
      </div>
      <div className="text-center">
        <p className="font-semibold text-navy-900 text-sm leading-tight group-hover:text-gold-600 transition-colors duration-200">
          {associate.name}
        </p>
        {associate.country && (
          <p className="text-slate-500 text-xs mt-0.5">{associate.country}</p>
        )}
      </div>
    </motion.div>
  )
}
