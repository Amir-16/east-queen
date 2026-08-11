import { cn } from '@/lib/cn'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'gold' | 'teal' | 'navy' | 'custom'
}

export default function Badge({ children, className, variant = 'gold' }: BadgeProps) {
  const variants = {
    gold: 'bg-gold-100 text-gold-700 border border-gold-300/50',
    teal: 'bg-teal-100 text-teal-600 border border-teal-300/50',
    navy: 'bg-navy-900 text-white border border-navy-700',
    custom: '',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
