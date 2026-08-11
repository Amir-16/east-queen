import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, fadeLeft, goldLineVariants, stagger } from '@/lib/motion'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className,
}: SectionHeaderProps) {
  const isDark = theme === 'dark'
  const isCenter = align === 'center'

  return (
    <motion.div
      className={cn(isCenter ? 'text-center' : 'text-left', className)}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {eyebrow && (
        <motion.p
          variants={fadeLeft}
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.25em] mb-3',
            isDark ? 'text-gold-400' : 'text-gold-500',
          )}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div
        variants={fadeLeft}
        className={cn('flex mb-4', isCenter ? 'justify-center' : 'justify-start')}
      >
        <motion.div
          variants={goldLineVariants}
          className="h-[3px] w-12 bg-gold-500 rounded-full"
        />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className={cn(
          'font-playfair font-bold text-h2 leading-tight',
          isDark ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-4 text-body-lg leading-relaxed max-w-2xl',
            isCenter && 'mx-auto',
            isDark ? 'text-white/60' : 'text-slate-600',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
