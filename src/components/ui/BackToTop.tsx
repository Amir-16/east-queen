import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function ScrollNav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [atBottom,  setAtBottom]  = useState(false)

  useEffect(() => {
    const update = () => {
      const y    = window.scrollY
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 400)
      setAtBottom(y >= maxY - 80)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const toTop    = () => window.scrollTo({ top: 0,                                        behavior: 'smooth' })
  const toBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight,    behavior: 'smooth' })

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          key="scroll-nav"
          initial={{ opacity: 0, x: 64, scale: 0.8 }}
          animate={{ opacity: 1, x: 0,  scale: 1   }}
          exit={{    opacity: 0, x: 64, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          className="fixed bottom-8 right-5 z-50 flex flex-col items-center gap-2"
        >

          {/* ── Up arrow ── */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.06, type: 'spring', stiffness: 400, damping: 26 }}
            whileHover={{
              scale: 1.15,
              y: -4,
              boxShadow: '0 8px 24px rgba(245,158,11,0.45)',
              transition: { type: 'spring', stiffness: 500, damping: 18 },
            }}
            whileTap={{ scale: 0.88 }}
            onClick={toTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full bg-amber-500 text-white shadow-md shadow-amber-400/40
                       flex items-center justify-center hover:bg-amber-400 transition-colors duration-200"
          >
            <ChevronUp className="w-[18px] h-[18px]" strokeWidth={3} />
          </motion.button>

          {/* Connector dot */}
          <AnimatePresence>
            {!atBottom && (
              <motion.span
                key="dot"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{    opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.25 }}
                className="w-px h-4 bg-amber-300/60 rounded-full"
              />
            )}
          </AnimatePresence>

          {/* ── Down arrow (hidden at bottom of page) ── */}
          <AnimatePresence>
            {!atBottom && (
              <motion.button
                key="down-btn"
                initial={{ opacity: 0, y: -18, scale: 0.7 }}
                animate={{ opacity: 1,  y: 0,  scale: 1   }}
                exit={{    opacity: 0,  y: 12, scale: 0.7 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 26 }}
                whileHover={{
                  scale: 1.15,
                  y: 4,
                  boxShadow: '0 8px 24px rgba(245,158,11,0.45)',
                  transition: { type: 'spring', stiffness: 500, damping: 18 },
                }}
                whileTap={{ scale: 0.88 }}
                onClick={toBottom}
                aria-label="Scroll to bottom"
                className="w-11 h-11 rounded-full bg-amber-500 text-white shadow-md shadow-amber-400/40
                           flex items-center justify-center hover:bg-amber-400 transition-colors duration-200"
              >
                {/* Subtle bounce hint on the icon */}
                <motion.span
                  animate={{ y: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="flex"
                >
                  <ChevronDown className="w-[18px] h-[18px]" strokeWidth={3} />
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
