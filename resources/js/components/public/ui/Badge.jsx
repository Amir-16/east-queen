import { cn } from '@/lib/cn'

const variants = {
  gold:   'bg-gold-100 text-gold-700 border border-gold-200',
  teal:   'bg-teal-100 text-teal-700 border border-teal-200',
  navy:   'bg-navy-100 text-navy-700 border border-navy-200',
  custom: '',
}

export default function Badge({ variant = 'gold', className, children }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
