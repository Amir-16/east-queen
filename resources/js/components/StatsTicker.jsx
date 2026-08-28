import { STATS } from '../data/siteConfig'

const ICON_EMOJI = {
  land: '🌾', pond: '🐟', fish: '📦', solar: '☀️', aerate: '⚙️', mill: '🏭',
  map: '🌾', beaker: '🐟', 'archive-box': '📦', sun: '☀️', 'cog-6-tooth': '⚙️',
  'building-office-2': '🏭',
}

const CONFIG_ITEMS = STATS.map(s => ({
  label: `${s.value}${s.suffix} ${s.label}`,
  icon: ICON_EMOJI[s.icon] ?? '•',
}))

export default function StatsTicker({ items }) {
  const source = items?.length
    ? items.map(s => ({ label: `${s.value}${s.suffix} ${s.label}`, icon: ICON_EMOJI[s.icon] ?? '•' }))
    : CONFIG_ITEMS

  const track = [...source, ...source]

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: 'linear-gradient(90deg, #060d18 0%, #0a1628 50%, #060d18 100%)',
        borderTop:    '1px solid rgba(34,211,238,0.15)',
        borderBottom: '1px solid rgba(34,211,238,0.15)',
        boxShadow: '0 0 32px rgba(34,211,238,0.04) inset',
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, #060d18 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, #060d18 0%, transparent 100%)' }}
      />

      <div
        className="flex whitespace-nowrap py-3 animate-marquee"
        style={{ willChange: 'transform' }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 cursor-default"
              style={{
                color: '#ffffff',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(34,211,238,0.12)',
                letterSpacing: '0.055em',
              }}
            >
              <span className="text-[12px] leading-none">{item.icon}</span>
              {item.label}
            </span>
            <span
              className="shrink-0"
              style={{ color: 'rgba(34,211,238,0.25)', fontSize: 6, lineHeight: 1 }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
