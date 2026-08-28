import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const E = [0.22, 1, 0.36, 1]

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]
  const [dir, setDir] = useState(0) // -1 prev, 1 next

  const prev = useCallback(() => { setDir(-1); onPrev() }, [onPrev])
  const next = useCallback(() => { setDir(1);  onNext() }, [onNext])

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')     onClose()
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
  }, [onClose, prev, next])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <ZoomIn size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-tight">{item.title}</div>
            {item.caption && (
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.caption}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium tabular-nums" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {index + 1} / {items.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* ── Main image ── */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16 sm:px-24">
        {/* Prev */}
        {index > 0 && (
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-3 sm:left-5 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -60, scale: 0.96 }}
            transition={{ duration: 0.3, ease: E }}
            className="w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={item.src}
              alt={item.title}
              className="rounded-xl object-contain select-none"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        {index < items.length - 1 && (
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-3 sm:right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      <div
        className="shrink-0 py-4 px-4 overflow-x-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex gap-2 w-max mx-auto">
          {items.map((it, i) => (
            <button
              key={it.id ?? i}
              onClick={() => { setDir(i > index ? 1 : -1); i < index ? onPrev() : onNext(); }}
              className="relative shrink-0 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                width: 56, height: 42,
                opacity: i === index ? 1 : 0.4,
                border: i === index ? '2px solid #22d3ee' : '2px solid transparent',
                transform: i === index ? 'scale(1.08)' : 'scale(1)',
              }}
              onClick={() => {
                const delta = i - index
                for (let j = 0; j < Math.abs(delta); j++) {
                  if (delta > 0) onNext(); else onPrev();
                }
              }}
            >
              <img src={it.src} alt={it.title} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>

      {/* hint */}
      <div className="text-center pb-3 text-[10px] uppercase tracking-[0.18em] hidden sm:block"
        style={{ color: 'rgba(255,255,255,0.15)' }}>
        ← → Arrow keys to navigate · ESC to close
      </div>
    </motion.div>
  )
}
