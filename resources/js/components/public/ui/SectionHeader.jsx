import { cn } from '@/lib/cn'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className,
}) {
  const center = align === 'center'
  const dark   = theme === 'dark'

  return (
    <div className={cn(center ? 'text-center' : '', className)}>
      {eyebrow && (
        <p className={`text-[11px] font-bold uppercase tracking-[0.35em] mb-3 ${dark ? 'text-gold-400' : 'text-gold-500'}`}>
          {eyebrow}
        </p>
      )}
      <div className={cn('h-[2px] w-10 bg-gold-500 rounded-full mb-5', center && 'mx-auto')} />
      <h2 className={`font-playfair font-bold text-h2 leading-tight mb-4 ${dark ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${dark ? 'text-white/50' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
