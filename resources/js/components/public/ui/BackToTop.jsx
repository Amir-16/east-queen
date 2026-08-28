import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  const update = useCallback(() => {
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    setShow(scrollY > 300)
    setAtBottom(maxScroll > 0 && scrollY >= maxScroll - 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [update])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-20 right-5 z-50 flex flex-col gap-2"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center shadow-lg transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </motion.button>
          {!atBottom && (
            <motion.button
              onClick={scrollToBottom}
              whileHover={{ scale: 1.1, y: 2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center shadow-lg transition-colors duration-200"
              aria-label="Scroll to bottom"
            >
              <ArrowDown size={16} strokeWidth={2.5} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
