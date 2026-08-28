import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-navy-900 hover:bg-navy-800 text-white',
  gold:    'bg-gold-500 hover:bg-gold-400 text-navy-950',
  outline: 'border border-slate-200 text-slate-700 hover:border-gold-300 hover:text-gold-500 bg-transparent',
  ghost:   'text-slate-600 hover:text-navy-900 hover:bg-slate-100 bg-transparent',
}

const sizes = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-sm rounded-xl',
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
