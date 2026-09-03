export default function MarqueeStrip({ items = [] }) {
  if (!items.length) return null

  const doubled = [...items, ...items]

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-4 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

      <div className="flex items-center group" style={{ width: 'max-content' }}>
        <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused]">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 px-8 text-slate-500 text-[12px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
              {item.text}
            </span>
          ))}
        </div>
        <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused]" aria-hidden>
          {doubled.map((item, i) => (
            <span
              key={`dup-${i}`}
              className="flex items-center gap-3 px-8 text-slate-500 text-[12px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
