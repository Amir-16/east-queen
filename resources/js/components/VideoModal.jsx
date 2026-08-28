import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Play, Pause, Volume2, VolumeX,
  Maximize2, Minimize2, ChevronLeft, ChevronRight,
} from 'lucide-react'

const E = [0.22, 1, 0.36, 1]

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

export default function VideoModal({ src, title, onClose, onPrev, onNext }) {
  const vidRef   = useRef(null)
  const wrapRef  = useRef(null)
  const seekRef  = useRef(null)
  const hideRef  = useRef(null)

  const [playing,  setPlaying]  = useState(false)
  const [muted,    setMuted]    = useState(false)
  const [volume,   setVolume]   = useState(1)
  const [current,  setCurrent]  = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [showCtrl, setShowCtrl] = useState(true)
  const [fsMode,   setFsMode]   = useState(false)
  const [ready,    setReady]    = useState(false)
  const [seeking,  setSeeking]  = useState(false)

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* Auto-hide controls */
  const nudgeControls = useCallback(() => {
    setShowCtrl(true)
    clearTimeout(hideRef.current)
    hideRef.current = setTimeout(() => setShowCtrl(false), 3200)
  }, [])

  useEffect(() => {
    nudgeControls()
    return () => clearTimeout(hideRef.current)
  }, [nudgeControls])

  /* Keyboard shortcuts — read DOM directly to avoid stale closures */
  useEffect(() => {
    const fn = (e) => {
      const v = vidRef.current
      if (!v) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        v.paused ? v.play().catch(() => {}) : v.pause()
      }
      if (e.key === 'ArrowRight' || e.key === 'l')
        v.currentTime = Math.min(v.duration || 0, v.currentTime + 5)
      if (e.key === 'ArrowLeft' || e.key === 'j')
        v.currentTime = Math.max(0, v.currentTime - 5)
      if (e.key === 'm' || e.key === 'M') {
        v.muted = !v.muted; setMuted(v.muted)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        v.volume = Math.min(1, v.volume + 0.1); setVolume(v.volume)
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        v.volume = Math.max(0, v.volume - 0.1); setVolume(v.volume)
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  /* Fullscreen change tracking */
  useEffect(() => {
    const fn = () => setFsMode(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', fn)
    return () => document.removeEventListener('fullscreenchange', fn)
  }, [])

  /* Reset + autoplay when src changes */
  useEffect(() => {
    setReady(false); setCurrent(0); setDuration(0); setBuffered(0)
    const v = vidRef.current
    if (!v) return
    v.volume = volume
    v.muted  = false
    setMuted(false)
    v.play().then(() => setPlaying(true)).catch(() => {})
  }, [src]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    const v = vidRef.current
    if (!v) return
    v.paused ? v.play().catch(() => {}) : v.pause()
  }, [])

  const toggleMute = useCallback((e) => {
    e?.stopPropagation()
    const v = vidRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const toggleFs = useCallback(async (e) => {
    e?.stopPropagation()
    if (!document.fullscreenElement) {
      await wrapRef.current?.requestFullscreen().catch(() => {})
    } else {
      await document.exitFullscreen().catch(() => {})
    }
  }, [])

  /* Seek bar: click to jump */
  const handleSeekClick = useCallback((e) => {
    e.stopPropagation()
    const v = vidRef.current
    if (!v || !v.duration) return
    const rect = seekRef.current.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }, [])

  const pct      = duration ? (current / duration) * 100 : 0
  const bufPct   = duration ? (buffered / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        ref={wrapRef}
        initial={{ scale: 0.86, opacity: 0, y: 32 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.38, ease: E }}
        className="relative w-full"
        style={{ maxWidth: 1040, padding: '0 20px' }}
        onClick={e => e.stopPropagation()}
        onMouseMove={nudgeControls}
        onTouchStart={nudgeControls}
      >

        {/* ── Video container ── */}
        <div
          className="relative rounded-2xl overflow-hidden bg-black"
          style={{
            aspectRatio: '16/9',
            boxShadow: '0 48px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)',
            cursor: 'pointer',
          }}
          onClick={toggle}
        >
          <video
            ref={vidRef}
            src={src}
            playsInline
            preload="auto"
            className="w-full h-full object-contain"
            onLoadedMetadata={e => { setDuration(e.target.duration); setReady(true) }}
            onTimeUpdate={e => {
              setCurrent(e.target.currentTime)
              const b = e.target.buffered
              if (b.length) setBuffered(b.end(b.length - 1))
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); onNext?.() }}
          />

          {/* Loading spinner */}
          <AnimatePresence>
            {!ready && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ background: 'rgba(0,0,0,0.55)' }}
              >
                <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Big play/pause flash on click */}
          <AnimatePresence>
            {!playing && ready && (
              <motion.div
                key="paused"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                exit={{    scale: 1.3, opacity: 0 }}
                transition={{ duration: 0.25, ease: E }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 84, height: 84,
                    background: 'rgba(0,0,0,0.55)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <Play size={34} fill="white" color="white" style={{ marginLeft: 4 }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Controls overlay ── */}
          <motion.div
            animate={{ opacity: showCtrl ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-between"
            style={{
              background: showCtrl
                ? 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 28%, transparent 55%, rgba(0,0,0,0.88) 100%)'
                : 'transparent',
              pointerEvents: showCtrl ? 'auto' : 'none',
            }}
          >
            {/* Top bar: title + close */}
            <div className="flex items-start justify-between px-5 pt-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: '#22d3ee' }}>
                  Now Playing
                </p>
                <p className="text-white font-bold text-sm leading-snug max-w-[480px] truncate">
                  {title}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onClose() }}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all shrink-0 ml-4"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <X size={16} />
              </button>
            </div>

            {/* Bottom controls */}
            <div className="px-4 pb-4" onClick={e => e.stopPropagation()}>

              {/* Seek bar */}
              <div
                ref={seekRef}
                className="relative h-1 rounded-full mb-4 cursor-pointer group/seek"
                style={{ background: 'rgba(255,255,255,0.18)' }}
                onClick={handleSeekClick}
              >
                {/* Buffered track */}
                <div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${bufPct}%`, background: 'rgba(255,255,255,0.28)', transition: 'width 0.4s linear' }} />
                {/* Play progress */}
                <div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${pct}%`, background: 'linear-gradient(to right,#22d3ee,#06b6d4)', transition: seeking ? 'none' : 'width 0.25s linear' }} />
                {/* Hover: grow bar height */}
                <div className="absolute inset-x-0 -top-1 -bottom-1 group-hover/seek:opacity-100 opacity-0" />
                {/* Thumb */}
                <div
                  className="absolute top-1/2 w-4 h-4 rounded-full -translate-y-1/2 -translate-x-1/2 scale-0 group-hover/seek:scale-100 transition-transform duration-150"
                  style={{ left: `${pct}%`, background: '#fff', boxShadow: '0 0 10px rgba(34,211,238,0.7)' }}
                />
              </div>

              {/* Control row */}
              <div className="flex items-center gap-2 sm:gap-3">

                {/* Prev */}
                {onPrev && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onPrev() }}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {/* Play / Pause */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggle() }}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all"
                  style={{ background: 'rgba(34,211,238,0.18)', border: '1.5px solid rgba(34,211,238,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,211,238,0.32)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(34,211,238,0.18)'}
                >
                  {playing
                    ? <Pause size={17} fill="white" color="white" />
                    : <Play  size={17} fill="white" color="white" style={{ marginLeft: 2 }} />
                  }
                </button>

                {/* Next */}
                {onNext && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onNext() }}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                {/* Mute */}
                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                  style={{ color: muted ? '#22d3ee' : 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = muted ? '#22d3ee' : 'rgba(255,255,255,0.65)'}
                >
                  {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                {/* Volume slider */}
                <input
                  type="range" min={0} max={1} step={0.05}
                  value={muted ? 0 : volume}
                  onClick={e => e.stopPropagation()}
                  onChange={e => {
                    const v = vidRef.current
                    if (!v) return
                    const val = parseFloat(e.target.value)
                    v.volume = val; v.muted = val === 0
                    setVolume(val); setMuted(val === 0)
                  }}
                  className="w-16 sm:w-20 h-1 rounded-full appearance-none cursor-pointer hidden sm:block"
                  style={{ accentColor: '#22d3ee', background: `linear-gradient(to right,#22d3ee ${(muted?0:volume)*100}%,rgba(255,255,255,0.2) ${(muted?0:volume)*100}%)` }}
                />

                {/* Time */}
                <span className="text-[11px] font-mono tabular-nums" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {fmt(current)}
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}> / </span>
                  {fmt(duration)}
                </span>

                <div className="flex-1" />

                {/* Keyboard hint */}
                <span className="text-[9px] tracking-widest hidden lg:block" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  SPACE · ←5s→ · M · ESC
                </span>

                {/* Fullscreen */}
                <button
                  onClick={toggleFs}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                >
                  {fsMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ESC hint below player */}
        <motion.p
          animate={{ opacity: showCtrl ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-3 text-[10px] uppercase tracking-[0.2em]"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          Press ESC to close · Click video to pause
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
