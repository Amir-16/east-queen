import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { scaleIn } from '@/lib/motion'
import { cn } from '@/lib/cn'

// Accepts "example.com" or "https://example.com/" and returns a safe http(s) URL + display host.
function parseWebsite(raw) {
  if (!raw) return null
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    if (!/^https?:$/.test(url.protocol)) return null
    return { href: url.href, host: url.hostname.replace(/^www\./, '') }
  } catch {
    return null
  }
}

export default function AssociateCard({ associate }) {
  const [imgError, setImgError] = useState(false)
  const reduceMotion = useReducedMotion()
  const site = parseWebsite(associate.website)
  const showLogo = associate.logo && !imgError

  const Tag = site ? motion.a : motion.div
  const linkProps = site
    ? {
        href: site.href,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${associate.name} — visit website (opens in a new tab)`,
      }
    : {}

  return (
    <Tag
      {...linkProps}
      variants={scaleIn}
      whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        'group relative block overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-card',
        'p-5 flex flex-col items-center gap-3 transition-[box-shadow,border-color] duration-300',
        'hover:shadow-hover hover:border-gold-300/50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
        site ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      {/* Logo */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-110">
        {showLogo ? (
          <img
            src={associate.logo}
            alt={`${associate.name} logo`}
            className="w-full h-full object-contain p-1"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-mono font-bold text-sm"
            style={{ backgroundColor: associate.color ?? '#1e3a5f' }}
          >
            {associate.initials}
          </div>
        )}
      </div>

      {/* Name (+ country) */}
      <div className="text-center">
        <p className="text-slate-700 group-hover:text-navy-900 font-semibold text-xs leading-snug transition-colors duration-200">
          {associate.name}
        </p>
        {associate.country && <p className="text-slate-500 text-[11px] mt-0.5">{associate.country}</p>}
      </div>

      {/* Hover / focus reveal: website link */}
      {site && (
        <span
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 px-3 py-2.5',
            'bg-gold-500 text-white text-[11px] font-semibold tracking-wide',
            'translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0',
            'transition-transform duration-300 ease-out motion-reduce:transition-none'
          )}
        >
          <span className="truncate">{site.host}</span>
          <ArrowUpRight
            size={13}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      )}
    </Tag>
  )
}
